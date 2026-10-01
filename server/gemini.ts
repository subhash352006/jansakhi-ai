import { GoogleGenAI } from '@google/genai';
import { SupportedLanguage, ExplainSimplyResult, StructuredGuidance, FollowUpChoice } from '../shared/types.js';
import { pmUjjwalaScheme } from './schemes/pm-ujjwala.js';
import { SERVICES_CATALOG, findMatchingService, getStructuredGuidance } from './schemes/services-catalog.js';
import { detectBroadIntent } from './schemes/smart-intents.js';

const SYSTEM_INSTRUCTION = `
You are JanSakhi AI, a patient and respectful government-service guide for first-time citizens in India.
Help first-time users understand essential government services and schemes without assuming English or digital knowledge.

Strict Guidelines:
1. Always respond in the user's selected language (use native script: Telugu, Hindi, Tamil, Kannada, Malayalam, Bengali, Marathi, or English).
2. Use simple everyday language. Avoid bureaucratic or technical jargon.
3. Keep sentences short and clear. Use numbered points where appropriate.
4. For any government service inquiry, structure your advice into these 7 clear parts:
   1. What this service is
   2. Who may be eligible
   3. What documents are required
   4. Step-by-step application instructions
   5. Where and how to apply (distributor, CSC, MeeSeva, bank)
   6. Official verified source / helpline (never invent links)
   7. What the user should do next
5. Never invent government information. Never fabricate eligibility criteria, benefits, documents, deadlines, fees, or application procedures.
6. Never request Aadhaar numbers, OTPs, passwords, bank details, or unnecessary sensitive information.
7. Never claim that an application has been submitted.
8. When information is uncertain or varies by state, clearly instruct the user to verify it through the official government source or helpline.
9. Your purpose is to explain, simplify and guide.
`;

const LANGUAGE_NAMES: Record<SupportedLanguage, string> = {
  en: 'English',
  hi: 'Hindi (हिन्दी)',
  te: 'Telugu (తెలుగు)',
  ta: 'Tamil (தமிழ்)',
  kn: 'Kannada (ಕನ್ನಡ)',
  ml: 'Malayalam (മലയാളം)',
  bn: 'Bengali (বাংলা)',
  mr: 'Marathi (मराठी)',
};

// Check if live API key is available
const apiKey = process.env.GEMINI_API_KEY?.trim() || '';
const isMockMode = process.env.MOCK_AI === 'true' || !apiKey || apiKey === 'your_gemini_api_key_here';

let genAIClient: GoogleGenAI | null = null;
if (!isMockMode) {
  try {
    genAIClient = new GoogleGenAI({ apiKey });
  } catch (err) {
    console.warn('[JanSakhi AI] Failed to initialize Google GenAI SDK, falling back to mock mode:', err);
  }
}

export interface AskJanSakhiResult {
  reply: string;
  readAloudText: string;
  suggestedFollowUps: string[];
  structuredGuidance?: StructuredGuidance;
  followUpQuestion?: {
    question: string;
    choices: FollowUpChoice[];
  };
}

export async function askJanSakhiAI(
  userPrompt: string,
  language: SupportedLanguage
): Promise<AskJanSakhiResult> {
  const langName = LANGUAGE_NAMES[language] || 'Telugu';

  // 1. SMART FOLLOW-UP CHECK: Check if the user is asking a broad question
  const broadIntent = detectBroadIntent(userPrompt, language);

  // 2. SPECIFIC SERVICE MATCHING: Check if user inquiry targets a known catalog service
  const matchedService = findMatchingService(userPrompt);
  const structuredGuidance = matchedService ? getStructuredGuidance(matchedService, language) : undefined;

  // 3. LIVE GEMINI 2.5 FLASH INVOCATION
  if (!isMockMode && genAIClient) {
    try {
      let promptContext = `Selected Language: ${langName}\nUser Question: "${userPrompt}"\n\n`;
      if (structuredGuidance) {
        promptContext += `Verified Factsheet to ground your answer:\nService: ${structuredGuidance.serviceName}\nWhat it is: ${structuredGuidance.whatItIs}\nEligibility: ${structuredGuidance.whoIsEligible.join(', ')}\nDocuments: ${structuredGuidance.documentsRequired.join(', ')}\nSteps: ${structuredGuidance.steps.join(' -> ')}\nWhere to apply: ${structuredGuidance.whereToApply}\nOfficial Source: ${structuredGuidance.officialSource.name} (${structuredGuidance.officialSource.url})\nHelpline: ${structuredGuidance.officialSource.helpline || 'N/A'}\nNext Step: ${structuredGuidance.nextStep}\n\n`;
      }

      promptContext += `Please respond naturally in ${langName}. Structure the response into the 7 clear parts using simple everyday words and numbered steps.`;

      const response = await genAIClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [
          {
            role: 'user',
            parts: [{ text: promptContext }],
          },
        ],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
          maxOutputTokens: 800,
        },
      });

      const text = response.text || '';
      return {
        reply: text,
        readAloudText: text.replace(/[*#_`]/g, '').trim(),
        suggestedFollowUps: broadIntent ? broadIntent.choices.map((c) => c.label) : getFollowUpsForLanguage(language),
        structuredGuidance,
        followUpQuestion: broadIntent ? {
          question: broadIntent.question,
          choices: broadIntent.choices,
        } : undefined,
      };
    } catch (err: any) {
      console.error('[JanSakhi AI] Gemini Live API call error, using resilient fallback:', err?.message || err);
      // Fall through to resilient fallback
    }
  }

  // 4. RESILIENT GROUNDED FALLBACK (Works 100% offline & without API key)
  if (structuredGuidance) {
    const formattedReply = buildFormatted7PartResponse(structuredGuidance, language);
    return {
      reply: formattedReply,
      readAloudText: formattedReply.replace(/[*#_`]/g, '').trim(),
      suggestedFollowUps: broadIntent ? broadIntent.choices.map((c) => c.label) : getFollowUpsForLanguage(language),
      structuredGuidance,
      followUpQuestion: broadIntent ? {
        question: broadIntent.question,
        choices: broadIntent.choices,
      } : undefined,
    };
  }

  // General fallback response giving real actionable guidance instead of repeating greeting
  const generalReplies: Record<SupportedLanguage, string> = {
    te: "నమస్తే అక్కయ్య! ప్రభుత్వ పథకాలకు దరఖాస్తు చేసుకోవడానికి ముందుగా మీ అర్హతలను పరిశీలించండి. రేషన్ కార్డు, ఆధార్ కార్డు, బ్యాంక్ ఖాతా వివరాలు సిద్ధం చేసుకోండి. సమీపంలోని మీసేవ, గ్రామ లేదా వార్డు సచివాలయం లేదా అధికారిక పోర్టల్ ద్వారా దరఖాస్తు చేసుకోవచ్చు.",
    hi: "नमस्ते बहन! किसी भी सरकारी योजना में आवेदन करने के लिए पहले अपनी पात्रता जांचें। राशन कार्ड, आधार कार्ड और बैंक पासबुक जैसे ज़रूरी दस्तावेज़ तैयार रखें। नजदीकी सीएससी केंद्र, जन सेवा केंद्र या आधिकारिक पोर्टल से आवेदन करें।",
    en: "Hello sister! To apply for a government scheme, first check your eligibility. Keep your basic documents ready, including your Ration Card, Aadhaar card, and bank passbook. You can apply at your nearest CSC center, MeeSeva center, or the verified official government portal.",
    ta: "வணக்கம் சகோதரி! அரசு திட்டங்களுக்கு விண்ணப்பிக்க முதலில் உங்கள் தகுதியை சரிபார்க்கவும். ரேஷன் அட்டை, ஆதார் அட்டை மற்றும் வங்கி கணக்கு புத்தகத்தை தயார் செய்து, அருகிலுள்ள இ-சேவை மையம் அல்லது அதிகாரப்பூர்வ இணையதளம் மூலம் விண்ணப்பிக்கவும்.",
    kn: "ನಮಸ್ಕಾರ ಸಹೋದರಿ! ಸರ್ಕಾರಿ ಯೋಜನೆಗೆ ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಮೊದಲು ನಿಮ್ಮ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ. ರೇಷನ್ ಕಾರ್ಡ್, ಆಧಾರ್ ಕಾರ್ಡ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್ ಬುಕ್ ಸಿದ್ಧವಾಗಿಟ್ಟುಕೊಂಡು ಹತ್ತಿರದ ಗ್ರಾಮ ಒನ್ ಅಥವಾ ಸೇವಾ ಸಿಂಧು ಕೇಂದ್ರದ ಮೂಲಕ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ.",
    ml: "നമസ്കാരം സഹോദരി! സർക്കാർ പദ്ധതികൾക്ക് അപേക്ഷിക്കുന്നതിന് മുമ്പ് നിങ്ങളുടെ യോഗ്യത പരിശോധിക്കുക. റേഷൻ കാർഡ്, ആധാർ, ബാങ്ക് പാസ്ബുക്ക് എന്നിവ തയ്യാറാക്കി അക്ഷയ കേന്ദ്രം വഴിയോ ഔദ്യോഗിക പോർട്ടൽ വഴിയോ അപേക്ഷിക്കുക.",
    bn: "নমস্কার বোন! যেকোনো সরকারি প্রকল্পে আবেদন করার আগে নিজের যোগ্যতা যাচাই করুন। রেশন কার্ড, আধার কার্ড ও ব্যাংক পাসবই প্রস্তুত রেখে নিকটবর্তী বাংলা সহায়তা কেন্দ্র বা অফিশিয়াল পোর্টাল থেকে আবেদন করুন।",
    mr: "नमस्ते ताई! कोणत्याही सरकारी योजनेसाठी अर्ज करण्यापूर्वी तुमची पात्रता तपासा. रेशन कार्ड, आधार कार्ड आणि बँक पासबुक तयार ठेवा आणि जवळच्या आपले सरकार सेवा केंद्रातून किंवा अधिकृत पोर्टलवरून अर्ज करा.",
  };

  const defaultText = generalReplies[language] || generalReplies.en;

  return {
    reply: defaultText,
    readAloudText: defaultText,
    suggestedFollowUps: broadIntent ? broadIntent.choices.map((c) => c.label) : getFollowUpsForLanguage(language),
    followUpQuestion: broadIntent ? {
      question: broadIntent.question,
      choices: broadIntent.choices,
    } : undefined,
  };
}

function buildFormatted7PartResponse(guidance: StructuredGuidance, lang: SupportedLanguage): string {
  const headings: Record<SupportedLanguage, {
    what: string;
    who: string;
    docs: string;
    steps: string;
    where: string;
    official: string;
    next: string;
  }> = {
    te: {
      what: "1. ఈ పథకం / సేవ ఏమిటి?",
      who: "2. ఎవరు అర్హులు?",
      docs: "3. కావలసిన పత్రాలు:",
      steps: "4. దరఖాస్తు దశలవారీ విధానం:",
      where: "5. ఎక్కడ దరఖాస్తు చేయాలి?",
      official: "6. అధికారిక మూలం & హెల్ప్‌లైన్:",
      next: "7. మీ తదుపరి అడుగు:",
    },
    hi: {
      what: "1. यह सेवा / योजना क्या है?",
      who: "2. कौन पात्र है?",
      docs: "3. आवश्यक दस्तावेज़:",
      steps: "4. चरण-दर-चरण आवेदन प्रक्रिया:",
      where: "5. कहाँ आवेदन करें?",
      official: "6. आधिकारिक स्रोत एवं हेल्पलाइन:",
      next: "7. आपका अगला कदम:",
    },
    en: {
      what: "1. What this service/resource is:",
      who: "2. Who may be eligible:",
      docs: "3. What documents are required:",
      steps: "4. Step-by-step instructions:",
      where: "5. Where and how to apply:",
      official: "6. Official verified source:",
      next: "7. What you should do next:",
    },
    ta: {
      what: "1. இந்த திட்டம் என்றால் என்ன?",
      who: "2. யார் தகுதியானவர்கள்?",
      docs: "3. தேவையான ஆவணங்கள்:",
      steps: "4. விண்ணப்பிக்கும் முறைகள்:",
      where: "5. எங்கு விண்ணப்பிக்க வேண்டும்?",
      official: "6. அதிகாரப்பூர்வ ஆதாரம்:",
      next: "7. உங்கள் அடுத்த படி:",
    },
    kn: {
      what: "1. ಈ ಯೋಜನೆ ಏನು?",
      who: "2. ಯಾರು ಅರ್ಹರು?",
      docs: "3. ಅಗತ್ಯವಿರುವ ದಾಖಲೆಗಳು:",
      steps: "4. ಹಂತ-ಹಂತದ ಅರ್ಜಿ ವಿಧಾನ:",
      where: "5. ಎಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಕು?",
      official: "6. ಅಧಿಕೃತ ಮೂಲ:",
      next: "7. ನಿಮ್ಮ ಮುಂದಿನ ಹೆಜ್ಜೆ:",
    },
    ml: {
      what: "1. എന്താണ് ഈ പദ്ധതി?",
      who: "2. ആർക്കാണ് അർഹത?",
      docs: "3. ആവശ്യമായ രേഖകൾ:",
      steps: "4. അപേക്ഷിക്കേണ്ട ഘട്ടങ്ങൾ:",
      where: "5. എവിടെ അപേക്ഷിക്കണം?",
      official: "6. ഔദ്യോഗിക ഉറവിടം:",
      next: "7. അടുത്ത നടപടി:",
    },
    bn: {
      what: "১. এই যোজনা বা সেবা কী?",
      who: "২. কারা যোগ্য?",
      docs: "৩. প্রয়োজনীয় নথিপত্র:",
      steps: "৪. ধাপে ধাপে আবেদনের নিয়ম:",
      where: "৫. কোথায় আবেদন করবেন?",
      official: "৬. অফিসিয়াল উৎস:",
      next: "৭. আপনার পরবর্তী পদক্ষেপ:",
    },
    mr: {
      what: "१. ही योजना काय आहे?",
      who: "२. कोण पात्र आहे?",
      docs: "३. आवश्यक कागदपत्रे:",
      steps: "४. टप्प्याटप्प्याने अर्ज प्रक्रिया:",
      where: "५. कुठे अर्ज करावा?",
      official: "६. अधिकृत स्रोत:",
      next: "७. तुमचे पुढील पाऊल:",
    },
  };

  const h = headings[lang] || headings.en;

  return `✨ **${guidance.serviceName}**

**${h.what}**
${guidance.whatItIs}

**${h.who}**
${guidance.whoIsEligible.map((item) => `• ${item}`).join('\n')}

**${h.docs}**
${guidance.documentsRequired.map((item) => `• ${item}`).join('\n')}

**${h.steps}**
${guidance.steps.map((step) => `• ${step}`).join('\n')}

**${h.where}**
${guidance.whereToApply}

**${h.official}**
🌐 ${guidance.officialSource.name} (${guidance.officialSource.url})
${guidance.officialSource.helpline ? `📞 ${guidance.officialSource.helpline}` : ''}

**${h.next}**
👉 ${guidance.nextStep}`;
}

export async function explainSimplyAI(
  complexText: string,
  language: SupportedLanguage
): Promise<ExplainSimplyResult> {
  const langName = LANGUAGE_NAMES[language] || 'Telugu';

  if (!isMockMode && genAIClient) {
    try {
      const prompt = `You are JanSakhi AI. A first-time citizen with little digital or bureaucratic knowledge needs this government text simplified.
Target Language: ${langName}
Complex Government Text to simplify:
"""
${complexText}
"""

Instructions:
Break this text down into exactly these 4 sections in ${langName}:
1. What does this mean? (Simple 1-2 sentence explanation in everyday words)
2. What do I need to do? (1-3 short bullet steps)
3. What information/documents may I need? (Short bullet list)
4. What should I do next? (Clear next immediate step)

Provide output in JSON format with keys:
"meaning": string,
"actions": array of strings,
"documents": array of strings,
"nextStep": string
`;

      const response = await genAIClient.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: [{ role: 'user', parts: [{ text: prompt }] }],
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.2,
          responseMimeType: 'application/json',
        },
      });

      const parsed = JSON.parse(response.text || '{}');
      return {
        meaning: parsed.meaning || 'This is official government guidance simplified for you.',
        actions: Array.isArray(parsed.actions) ? parsed.actions : ['Visit nearest LPG agency with documents'],
        documents: Array.isArray(parsed.documents) ? parsed.documents : ['Ration Card', 'Identity Proof (Aadhaar or Voter ID)'],
        nextStep: parsed.nextStep || 'Contact your local Gram Panchayat or LPG distributor.',
        disclaimer: 'This explanation simplifies the text for understanding. For official verification, refer to pmuy.gov.in.',
      };
    } catch (err: any) {
      console.error('[JanSakhi AI] Explain Simply Gemini call error, using resilient fallback:', err?.message || err);
    }
  }

  // Resilient Mock Simplification in target language
  return getMockExplainSimply(language, complexText);
}

function getFollowUpsForLanguage(lang: SupportedLanguage): string[] {
  const followUps: Record<SupportedLanguage, string[]> = {
    en: ['Am I eligible?', 'What documents do I need?', 'How do I apply at the center?'],
    hi: ['क्या मैं पात्र हूँ?', 'मुझे कौन से दस्तावेज़ चाहिए?', 'केंद्र पर कैसे आवेदन करें?'],
    te: ['నాకు అర్హత ఉందా?', 'నాకు ఏ పత్రాలు కావాలి?', 'కేంద్రంలో ఎలా దరఖాస్తు చేయాలి?'],
    ta: ['எனக்கு தகுதி உள்ளதா?', 'எனக்கு என்ன ஆவணங்கள் தேவை?', 'விண்ணப்பிப்பது எப்படி?'],
    kn: ['ನಾನು ಅರ್ಹಳೇ?', 'ನನಗೆ ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?', 'ಅರ್ಜಿ ಸಲ್ಲಿಸುವುದು ಹೇಗೆ?'],
    ml: ['എനിക്ക് അർഹതയുണ്ടോ?', 'എന്തൊക്കെ രേഖകൾ വേണം?', 'എങ്ങനെ അപേക്ഷിക്കാം?'],
    bn: ['আমি কি যোগ্য?', 'আমার কি কি কাগজ লাগবে?', 'আবেদন কিভাবে করব?'],
    mr: ['मी पात्र आहे का?', 'मला कोणती कागदपत्रे लागतील?', 'अर्ज कसा करावा?'],
  };
  return followUps[lang] || followUps.en;
}

function getMockExplainSimply(lang: SupportedLanguage, text: string): ExplainSimplyResult {
  const simplified: Record<SupportedLanguage, ExplainSimplyResult> = {
    en: {
      meaning: "This government notice states that under Ujjwala 2.0, eligible women can get a free LPG gas connection without paying any security deposit.",
      actions: [
        "Confirm no one in your household has an LPG connection",
        "Keep photocopies of your ration card, ID proof, and bank passbook ready",
        "Submit the paper form at your nearest LPG distributor",
      ],
      documents: ["Ration Card", "Aadhaar or Voter ID", "Bank Passbook copy", "1 Passport photo"],
      nextStep: "Visit your nearest Indane, Bharatgas, or HP Gas distributor. You do not need to pay any application fee.",
      disclaimer: "JanSakhi AI simplifies text for easy understanding. Always verify rules at pmuy.gov.in.",
    },
    hi: {
      meaning: "इस सरकारी सूचना का मतलब है कि उज्ज्वला 2.0 के तहत गरीब परिवार की महिला को बिना किसी सिक्योरिटी डिपॉजिट के नया गैस कनेक्शन, भरा हुआ सिलेंडर और चूल्हा बिल्कुल मुफ्त मिलेगा।",
      actions: [
        "जांचें कि आपके घर में पहले से कोई गैस कनेक्शन न हो",
        "अपने राशन कार्ड, आधार कार्ड और बैंक पासबुक की फोटोकॉपी कराएं",
        "नज़दीकी गैस एजेंसी पर जाकर फॉर्म जमा करें",
      ],
      documents: ["राशन कार्ड", "आधार या वोटर कार्ड", "बैंक पासबुक प्रति", "1 पासपोर्ट फोटो"],
      nextStep: "अपनी नजदीकी गैस एजेंसी पर जाएं। फॉर्म जमा करने के लिए कोई सरकारी फीस नहीं लगती।",
      disclaimer: "जनसखी एआई सरकारी जानकारी को सरल बनाती है। कृपया आधिकारिक पोर्टल pmuy.gov.in से सत्यापन करें।",
    },
    te: {
      meaning: "ఈ ప్రభుత్వ నోటీసు ప్రకారం, ఉజ్జ్వల 2.0 పథకం ద్వారా అర్హులైన పేద మహిళలకు ఎలాంటి డిపాజిట్ లేకుండా ఉచిత గ్యాస్ కనెక్షన్, మొదటి సిలిండర్ మరియు స్టవ్ ఉచితంగా లభిస్తాయి.",
      actions: [
        "మీ ఇంట్లో ఇంతకుముందు ఎవరి పేరిటా గ్యాస్ కనెక్షన్ లేదని నిర్ధారించుకోండి",
        "రేషన్ కార్డు, ఆధార్ కార్డు, బ్యాంక్ పాస్‌బుక్ జిరాక్స్ కాపీలు సిద్ధం చేసుకోండి",
        "దగ్గరలోని గ్యాస్ ఏజెన్సీలో దరఖాస్తు ఫారమ్ సమర్పించండి",
      ],
      documents: ["రేషన్ కార్డు", "ఆధార్ లేదా ఓటర్ ఐడీ", "బ్యాంక్ పాస్‌బుక్ జిరాక్స్", "1 పాస్‌పోర్ట్ సైజు ఫోటో"],
      nextStep: "మీ దగ్గరలోని గ్యాస్ ఏజెన్సీ (ఇండేన్, భారత్ లేదా హెచ్‌పి)ని సంప్రదించండి. దీనికి ఎలాంటి రుసుము చెల్లించనవసరం లేదు.",
      disclaimer: "జనసఖి AI అధికారిక సమాచారాన్ని సులభతరం చేస్తుంది. దయచేసి pmuy.gov.in ద్వారా ధృవీకరించుకోండి.",
    },
    ta: {
      meaning: "உஜ்வாலா 2.0 திட்டத்தின் கீழ் தகுதியான பெண்களுக்கு வைப்புத்தொகை இல்லாமல் இலவச எரிவாயு இணைப்பு மற்றும் அடுப்பு வழங்கப்படும் என்பதை இந்த அறிவிப்பு விளக்குகிறது.",
      actions: [
        "வீட்டில் ஏற்கனவே எரிவாயு இணைப்பு இல்லை என்பதை உறுதி செய்யவும்",
        "ரேஷன் கார்டு, ஆதார் மற்றும் வங்கி புத்தக நகல்களை தயார் செய்யவும்",
        "எரிவாயு ஏஜென்சியில் விண்ணப்பத்தை சமர்ப்பிக்கவும்",
      ],
      documents: ["குடும்ப அட்டை", "ஆதார் அட்டை", "வங்கி கணக்கு புத்தகம்", "புகைப்படம்"],
      nextStep: "அருகிலுள்ள எரிவாயு ஏஜென்சியை அணுகவும். இதற்கு கட்டணம் ஏதும் இல்லை.",
      disclaimer: "அதிகாரப்பூர்வ தகவல்களுக்கு pmuy.gov.in தளத்தை பார்வையிடவும்.",
    },
    kn: {
      meaning: "ಉಜ್ವಲ 2.0 ಯೋಜನೆಯಡಿ ಅರ್ಹ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಮತ್ತು ಒಲೆ ನೀಡಲಾಗುವುದು ಎಂದು ಈ ಆದೇಶ ತಿಳಿಸುತ್ತದೆ.",
      actions: [
        "ಮನೆಯಲ್ಲಿ ಮೊದಲೇ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಇಲ್ಲದಿರುವುದನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ",
        "ರೇಷನ್ ಕಾರ್ಡ್, ಆಧಾರ್ ಮತ್ತು ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್ ಜೆರಾಕ್ಸ್ ಸಿದ್ಧಪಡಿಸಿ",
        "ಹತ್ತಿರದ ಗ್ಯಾಸ್ ಏಜೆನ್ಸಿಯಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ",
      ],
      documents: ["ಪಡಿತರ ಚೀಟಿ", "ಆಧಾರ್ ಕಾರ್ಡ್", "ಬ್ಯಾಂಕ್ ಪಾಸ್‌ಬುಕ್", "ಫೋಟೋ"],
      nextStep: "ಹತ್ತಿರದ ಗ್ಯಾಸ್ ಏಜೆನ್ಸಿಗೆ ಭೇಟಿ ನೀಡಿ. ಯಾವುದೇ ಶುಲ್ಕ ನೀಡಬೇಕಾಗಿಲ್ಲ.",
      disclaimer: "ಅಧಿಕೃತ ಪರಿಶೀಲನೆಗೆ pmuy.gov.in ನೋಡಿ.",
    },
    ml: {
      meaning: "ഉജ്ജ്വല 2.0 വഴി അർഹരായ സ്ത്രീകൾക്ക് സൗജന്യ ഗ്യാസ് കണക്ഷൻ നൽകുന്നതിനെക്കുറിച്ചുള്ള അറിയിപ്പാണിത്.",
      actions: ["വീട്ടിൽ മുൻപ് കണക്ഷൻ ഇല്ലെന്ന് ഉറപ്പാക്കുക", "രേഖകൾ തയ്യാറാക്കുക", "ഏജൻസിയിൽ അപേക്ഷിക്കുക"],
      documents: ["റേഷൻ കാർഡ്", "ആധാർ", "ബാങ്ക് പാസ്സ്ബുക്ക്"],
      nextStep: "അടുത്തുള്ള ഗ്യാസ് ഏജൻസി സന്ദർശിക്കുക.",
      disclaimer: "വിവരങ്ങൾക്കായി pmuy.gov.in സന്ദർശിക്കുക.",
    },
    bn: {
      meaning: "এই সরকারি বিজ্ঞপ্তির অর্থ হল উজ্জ্বলা ২.০ যোজনার অধীনে দরিদ্র পরিবারের মহিলারা বিনামূল্যে গ্যাস সংযোগ ও ওভেন পাবেন।",
      actions: ["পরিবারে আগে গ্যাস নেই তা নিশ্চিত করুন", "কাগজপত্রের জেরক্স নিন", "গ্যাস ডিস্ট্রিবিউটর অফিসে জমা দিন"],
      documents: ["রেশন কার্ড", "আধার কার্ড", "ব্যাংক পাসবই"],
      nextStep: "নিকটবর্তী গ্যাস ডিস্ট্রিবিউটর অফিসে যান। কোনো ফি লাগবে না।",
      disclaimer: "অফিসিয়াল যাচাইয়ের জন্য pmuy.gov.in দেখুন।",
    },
    mr: {
      meaning: "या सरकारी सूचनेनुसार, उज्ज्वला २.० अंतर्गत पात्र महिलांना मोफत गॅस कनेक्शन आणि शेगडी विनाशुल्क दिली जाईल.",
      actions: ["घरात आधी गॅस कनेक्शन नसल्याची खात्री करा", "कागदपत्रांच्या झेरॉक्स प्रती तयार करा", "गॅस एजन्सीवर अर्ज सबमिट करा"],
      documents: ["रेशन कार्ड", "आधार कार्ड", "बँक पासबुक"],
      nextStep: "जवळच्या गॅस एजन्सीला भेट द्या. कोणतेही शुल्क देऊ नका.",
      disclaimer: "अधिकृत माहितीसाठी pmuy.gov.in तपासा.",
    },
  };

  return simplified[lang] || simplified.en;
}
