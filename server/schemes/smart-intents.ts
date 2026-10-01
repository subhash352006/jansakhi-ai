import { SupportedLanguage, FollowUpChoice } from '../../shared/types.js';

export interface SmartIntentResult {
  isBroadIntent: boolean;
  category?: 'schemes' | 'documents' | 'education' | 'jobs' | 'finance';
  question: string;
  choices: FollowUpChoice[];
}

export function detectBroadIntent(prompt: string, lang: SupportedLanguage): SmartIntentResult | null {
  const p = prompt.toLowerCase();

  // 1. Broad Scheme Intent
  if (
    p.includes('government scheme') || 
    p.includes('a scheme') ||
    p.includes('any scheme') ||
    p.includes('ప్రభుత్వ పథకం') ||
    p.includes('పథకాల గురించి') ||
    p.includes('सरकारी योजना') ||
    p.includes('किसी योजना') ||
    p.includes('அரசு திட்டம்') ||
    p.includes('ಯೋಜನೆ ಬಗ್ಗೆ') ||
    p.includes('സർക്കാർ പദ്ധതി') ||
    p.includes('সরকারি প্রকল্প') ||
    p.includes('सरकारी योजना')
  ) {
    const questions: Record<SupportedLanguage, string> = {
      te: "ఖచ్చితంగా అక్కయ్య! మీరు ఏ రకమైన ప్రభుత్వ పథకం లేదా సహాయం గురించి తెలుసుకోవాలనుకుంటున్నారు?",
      hi: "ज़रूर बहन! आप किस प्रकार की सरकारी योजना या सहायता के बारे में जानना चाहती हैं?",
      ta: "நிச்சயமாக சகோதரி! நீங்கள் எந்த வகையான அரசுத் திட்டத்தைப் பற்றி அறிய விரும்புகிறீர்கள்?",
      kn: "ಖಂಡಿತ ಸಹೋದರಿ! ನೀವು ಯಾವ ರೀತಿಯ ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಬಗ್ಗೆ ತಿಳಿಯಲು ಬಯಸುತ್ತೀರಿ?",
      ml: "തീർച്ചയായും സഹോദരി! ഏതുതരം സർക്കാർ പദ്ധതിയെക്കുറിച്ചാണ് അറിയേണ്ടത്?",
      bn: "অবশ্যই দিদি! আপনি কোন ধরনের সরকারি প্রকল্প সম্পর্কে জানতে চান?",
      mr: "नक्कीच ताई! तुम्हाला कोणत्या प्रकारच्या सरकारी योजनेबद्दल माहिती हवी आहे?",
      en: "Sure sister! What kind of government assistance are you looking for today?",
    };

    const choices: Record<SupportedLanguage, FollowUpChoice[]> = {
      te: [
        { label: "🍳 ఉచిత గ్యాస్ కనెక్షన్ (ఉజ్జ్వల 2.0)", prompt: "నాకు ఉచిత గ్యాస్ కనెక్షన్ ఉజ్జ్వల యోజన గురించి చెప్పండి" },
        { label: "📄 రేషన్ కార్డు / ఆహార భద్రత", prompt: "నాకు కొత్త రేషన్ కార్డు ఎలా పొందాలో చెప్పండి" },
        { label: "👩 డ్వాక్రా మహిళల స్వయం ఉపాధి (లక్షాధికారి దీదీ)", prompt: "మహిళా స్వయం సహాయక సంఘం రుణాలు లఖపతి దీదీ గురించి చెప్పండి" },
        { label: "🧵 ఉచిత టైలరింగ్ & నైపుణ్య శిక్షణ", prompt: "ఉచిత టైలరింగ్ మరియు నైపుణ్య శిక్షణ ఎలా పొందాలో చెప్పండి" },
      ],
      hi: [
        { label: "🍳 मुफ्त गैस कनेक्शन (उज्ज्वला 2.0)", prompt: "मुझे मुफ्त गैस कनेक्शन उज्ज्वला योजना के बारे में बताएं" },
        { label: "📄 राशन कार्ड एवं खाद्य सुरक्षा", prompt: "नया राशन कार्ड कैसे बनवाएं?" },
        { label: "👩 लखपति दीदी एवं महिला समूह ऋण", prompt: "लखपति दीदी और महिला स्वयं सहायता समूह के बारे में बताएं" },
        { label: "🧵 मुफ्त सिलाई प्रशिक्षण (PMKVY)", prompt: "मुफ्त सिलाई और कौशल प्रशिक्षण कैसे प्राप्त करें?" },
      ],
      en: [
        { label: "🍳 Free Gas Connection (PM Ujjwala)", prompt: "Tell me about PM Ujjwala free gas connection" },
        { label: "📄 Ration Card & Certificates", prompt: "How do I get a new Ration Card?" },
        { label: "👩 Lakhpati Didi & Women SHG", prompt: "Tell me about Lakhpati Didi and women self-help groups" },
        { label: "🧵 Free Skill & Tailoring Training", prompt: "How to get free skill and tailoring training?" },
      ],
      ta: [
        { label: "🍳 இலவச எரிவாயு இணைப்பு (உஜ்வாலா)", prompt: "உஜ்வாலா இலவச எரிவாயு திட்டம் பற்றி கூறவும்" },
        { label: "📄 புதிய குடும்ப அட்டை (ரேஷன் கார்டு)", prompt: "ரேஷன் கார்டு பெறுவது எப்படி?" },
        { label: "👩 மகளிர் சுயஉதவிக் குழுக்கள்", prompt: "மகளிர் சுயஉதவிக் குழுக்கள் பற்றி கூறவும்" },
      ],
      kn: [
        { label: "🍳 ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ (ಉಜ್ವಲ)", prompt: "ಉಜ್ವಲ ಉಚಿತ ಗ್ಯಾಸ್ ಯೋಜನೆಯ ವಿವರ ತಿಳಿಸಿ" },
        { label: "📄 ಹೊಸ ಪಡಿತರ ಚೀಟಿ", prompt: "ಹೊಸ ರೇಷನ್ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?" },
        { label: "👩 ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘಗಳು", prompt: "ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘಗಳ ಸಾಲದ ಬಗ್ಗೆ ತಿಳಿಸಿ" },
      ],
      ml: [
        { label: "🍳 സൗജന്യ ഗ്യാസ് കണക്ഷൻ (ഉജ്ജ്വല)", prompt: "സൗജന്യ ഗ്യാസ് കണക്ഷൻ ഉജ്ജ്വല പദ്ധതിയെക്കുറിച്ച് പറയൂ" },
        { label: "📄 പുതിയ റേഷൻ കാർഡ്", prompt: "റേഷൻ കാർഡ് എങ്ങനെ ലഭിക്കും?" },
      ],
      bn: [
        { label: "🍳 বিনামূল্যে গ্যাস সংযোগ (উজ্জ্বলা)", prompt: "বিনামূল্যে গ্যাস সংযোগ উজ্জ্বলা যোজনা সম্পর্কে জানান" },
        { label: "📄 নতুন রেশন কার্ড", prompt: "নতুন রেশন কার্ড কীভাবে পাব?" },
      ],
      mr: [
        { label: "🍳 मोफत गॅस कनेक्शन (उज्ज्वला)", prompt: "मोफत गॅस कनेक्शन उज्ज्वला योजनेबद्दल सांगा" },
        { label: "📄 नवीन रेशन कार्ड", prompt: "नवीन रेशन कार्ड कसे मिळवावे?" },
      ],
    };

    return {
      isBroadIntent: true,
      category: 'schemes',
      question: questions[lang] || questions.en,
      choices: choices[lang] || choices.en,
    };
  }

  // 2. Broad Documents Intent
  if (
    p.includes('getting a certificate') ||
    p.includes('need a document') ||
    p.includes('సర్టిఫికేట్') ||
    p.includes('పత్రం తీసుకోవడంలో') ||
    p.includes('प्रमाणपत्र चाहिए') ||
    p.includes('कागजात') ||
    p.includes('சான்றிதழ் வேண்டும்') ||
    p.includes('ದಾಖಲೆ ಬೇಕು')
  ) {
    const questions: Record<SupportedLanguage, string> = {
      te: "తప్పకుండా అక్కయ్య! మీకు ఏ అధికారిక పత్రం లేదా సర్టిఫికేట్ అవసరం?",
      hi: "ज़रूर बहन! आपको कौन सा सरकारी प्रमाणपत्र या दस्तावेज़ बनवाना है?",
      en: "Sure sister! Which official certificate or document do you need help with?",
      ta: "எந்த சான்றிதழ் உங்களுக்கு தேவை?",
      kn: "ನಿಮಗೆ ಯಾವ ಪ್ರಮಾಣಪತ್ರ ಅಥವಾ ದಾಖಲೆ ಬೇಕು?",
      ml: "ഏത് രേഖയാണ് നിങ്ങൾക്ക് വേണ്ടത്?",
      bn: "আপনার কোন ধরনের শংসাপত্র বা নথি দরকার?",
      mr: "तुम्हाला कोणते प्रमाणपत्र किंवा कागदपत्र हवे आहे?",
    };

    const choices: Record<SupportedLanguage, FollowUpChoice[]> = {
      te: [
        { label: "📄 కొత్త రేషన్ కార్డు (NFSA)", prompt: "కొత్త రేషన్ కార్డు ఎలా దరఖాస్తు చేయాలి?" },
        { label: "📜 ఆదాయ ధృవీకరణ పత్రం (Income Certificate)", prompt: "ఆదాయ సర్టిఫికేట్ ఎలా పొందాలి?" },
        { label: "🆔 ఆధార్ చిరునామా / మొబైల్ నవీకరణ", prompt: "ఆధార్ కార్డులో వివరాలు ఎలా సరిదిద్దుకోవాలి?" },
      ],
      hi: [
        { label: "📄 नया राशन कार्ड (खाद्य सुरक्षा)", prompt: "नया राशन कार्ड कैसे बनवाएं?" },
        { label: "📜 आय प्रमाणपत्र (Income Certificate)", prompt: "आय प्रमाण पत्र कैसे प्राप्त करें?" },
        { label: "🆔 आधार कार्ड सुधार", prompt: "आधार कार्ड में नाम या पता कैसे बदलें?" },
      ],
      en: [
        { label: "📄 New Ration Card (NFSA)", prompt: "How do I apply for a new Ration Card?" },
        { label: "📜 Income Certificate", prompt: "How do I get an Income Certificate?" },
        { label: "🆔 Aadhaar Address/Mobile Update", prompt: "How do I update details in my Aadhaar card?" },
      ],
      ta: [
        { label: "📄 புதிய குடும்ப அட்டை", prompt: "புதிய ரேஷன் கார்டு பெறுவது எப்படி?" },
        { label: "📜 வருமான சான்றிதழ்", prompt: "வருமான சான்றிதழ் எப்படி பெறுவது?" },
      ],
      kn: [
        { label: "📄 ಹೊಸ ರೇಷನ್ ಕಾರ್ಡ್", prompt: "ಹೊಸ ಪಡಿತರ ಚೀಟಿ ಪಡೆಯುವುದು ಹೇಗೆ?" },
        { label: "📜 ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ", prompt: "ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯುವುದು ಹೇಗೆ?" },
      ],
      ml: [
        { label: "📄 പുതിയ റേഷൻ കാർഡ്", prompt: "റേഷൻ കാർഡ് എങ്ങനെ ലഭിക്കും?" },
      ],
      bn: [
        { label: "📄 নতুন রেশন কার্ড", prompt: "নতুন রেশন কার্ড কীভাবে পাব?" },
      ],
      mr: [
        { label: "📄 नवीन रेशन कार्ड", prompt: "नवीन रेशन कार्ड कसे मिळवावे?" },
      ],
    };

    return {
      isBroadIntent: true,
      category: 'documents',
      question: questions[lang] || questions.en,
      choices: choices[lang] || choices.en,
    };
  }

  // 3. Broad Skills & Education Intent
  if (
    p.includes('learn a skill') ||
    p.includes('learn something') ||
    p.includes('నైపుణ్యం నేర్చుకోవాలనుకుంటున్నాను') ||
    p.includes('हुनर सीखना') ||
    p.includes('सिलाई सीखना') ||
    p.includes('திறன் பயிற்சி') ||
    p.includes('ಕೌಶಲ್ಯ ಕಲಿಯಲು')
  ) {
    const questions: Record<SupportedLanguage, string> = {
      te: "మంచి ఆలోచన అక్కయ్య! మీరు ఏ ఉచిత శిక్షణ పొందాలనుకుంటున్నారు?",
      hi: "बहुत अच्छा निर्णय बहन! आप कौन सा मुफ्त प्रशिक्षण लेना चाहती हैं?",
      en: "Wonderful! Which free certified training would you like to explore?",
      ta: "எந்த இலவச பயிற்சியை கற்க விரும்புகிறீர்கள்?",
      kn: "ನೀವು ಯಾವ ಉಚಿತ ತರಬೇತಿಯನ್ನು ಕಲಿಯಲು ಬಯಸುತ್ತೀರಿ?",
      ml: "ഏത് പരിശീലനമാണ് ആവശ്യമുള്ളത്?",
      bn: "আপনি কোন প্রশিক্ষণ নিতে চান?",
      mr: "तुम्हाला कोणते प्रशिक्षण घ्यायचे आहे?",
    };

    const choices: Record<SupportedLanguage, FollowUpChoice[]> = {
      te: [
        { label: "🧵 ఉచిత టైలరింగ్ & కుట్టుమిషన్ శిక్షణ", prompt: "ఉచిత టైలరింగ్ శిక్షణ వివరాలు చెప్పండి" },
        { label: "📱 ఉచిత డిజిటల్ మొబైల్ సాక్షరత (PMGDISHA)", prompt: "మహిళలకు ఉచిత డిజిటల్ మొబైల్ శిక్షణ ఎలా లభిస్తుంది?" },
      ],
      hi: [
        { label: "🧵 मुफ्त सिलाई एवं टेलरिंग कोर्स (PMKVY)", prompt: "मुफ्त सिलाई प्रशिक्षण की जानकारी दें" },
        { label: "📱 मोबाइल और डिजिटल साक्षरता (PMGDISHA)", prompt: "डिजिटल साक्षरता प्रशिक्षण कैसे मिलेगा?" },
      ],
      en: [
        { label: "🧵 Free Tailoring & Sewing Course (PMKVY)", prompt: "Tell me about free tailoring and sewing course" },
        { label: "📱 Digital Literacy & Smartphone (PMGDISHA)", prompt: "Tell me about free digital literacy training" },
      ],
      ta: [{ label: "🧵 இலவச தையல் பயிற்சி", prompt: "இலவச தையல் பயிற்சி பற்றி கூறவும்" }],
      kn: [{ label: "🧵 ಉಚಿತ ಹೊಲಿಗೆ ತರಬೇತಿ", prompt: "ಉಚಿತ ಹೊಲಿಗೆ ತರಬೇತಿ ವಿವರ ತಿಳಿಸಿ" }],
      ml: [{ label: "🧵 സൗജന്യ തയ്യൽ പരിശീലനം", prompt: "സൗജന്യ തയ്യൽ പരിശീലനം" }],
      bn: [{ label: "🧵 বিনামূল্যে সেলাই প্রশিক্ষণ", prompt: "বিনামূল্যে সেলাই প্রশিক্ষণ" }],
      mr: [{ label: "🧵 मोफत शिलाई प्रशिक्षण", prompt: "मोफत शिलाई प्रशिक्षण" }],
    };

    return {
      isBroadIntent: true,
      category: 'education',
      question: questions[lang] || questions.en,
      choices: choices[lang] || choices.en,
    };
  }

  // 4. Broad Financial Support Intent
  if (
    p.includes('financial support') ||
    p.includes('support i may be eligible') ||
    p.includes('ఆర్థిక సహాయం') ||
    p.includes('డబ్బు సహాయం') ||
    p.includes('आर्थिक सहायता') ||
    p.includes('நிதி உதவி') ||
    p.includes('ಹಣಕಾಸಿನ ನೆರವು')
  ) {
    const questions: Record<SupportedLanguage, string> = {
      te: "తప్పకుండా అక్కయ్య! మీరు ఏ రకమైన ఆర్థిక సదుపాయం కోసం చూస్తున్నారు?",
      hi: "ज़रूर बहन! आपको किस प्रकार की वित्तीय सहायता या सुविधा चाहिए?",
      en: "Sure sister! What kind of financial support or facility do you need?",
      ta: "எந்த வகையான நிதி உதவி உங்களுக்கு தேவை?",
      kn: "ನಿಮಗೆ ಯಾವ ರೀತಿಯ ಆರ್ಥಿಕ ನೆರವು ಬೇಕು?",
      ml: "ഏതുതരം സാമ്പത്തിക സഹായമാണ് വേണ്ടത്?",
      bn: "আপনার কোন ধরনের আর্থিক সহায়তা প্রয়োজন?",
      mr: "तुम्हाला कोणत्या प्रकारची आर्थिक मदत हवी आहे?",
    };

    const choices: Record<SupportedLanguage, FollowUpChoice[]> = {
      te: [
        { label: "🏦 జీరో బ్యాలెన్స్ జన్ ధన్ బ్యాంక్ ఖాతా", prompt: "జీరో బ్యాలెన్స్ జన్ ధన్ బ్యాంక్ ఖాతా ఎలా తెరవాలి?" },
        { label: "💰 మహిళల వ్యాపార ముద్రా రుణం (₹50,000 వరకు)", prompt: "మహిళలకు ముద్రా బిజినెస్ లోన్ ఎలా లభిస్తుంది?" },
        { label: "👩 డ్వాక్రా సంఘం తక్కువ వడ్డీ రుణాలు", prompt: "మహిళా స్వయం సహాయక సంఘం రుణాలు గురించి చెప్పండి" },
      ],
      hi: [
        { label: "🏦 जीरो बैलेंस जन धन बैंक खाता", prompt: "जीरो बैलेंस जन धन बैंक खाता कैसे खोलें?" },
        { label: "💰 महिलाओं के लिए मुद्रा ऋण (₹50,000 तक)", prompt: "महिलाओं के लिए मुद्रा लोन कैसे मिलता है?" },
        { label: "👩 स्वयं सहायता समूह (SHG) ऋण", prompt: "महिला स्वयं सहायता समूह से कम ब्याज का ऋण कैसे लें?" },
      ],
      en: [
        { label: "🏦 Zero-Balance Jan Dhan Bank Account", prompt: "How to open a zero-balance Jan Dhan bank account?" },
        { label: "💰 PM Mudra Micro-Business Loan (Up to ₹50k)", prompt: "How do women get PM Mudra business loan?" },
        { label: "👩 Women SHG Low-Interest Loan", prompt: "Tell me about women self-help group loans" },
      ],
      ta: [{ label: "🏦 ஜன் தன் வங்கி கணக்கு", prompt: "ஜன் தன் வங்கி கணக்கு தொடங்குவது எப்படி?" }],
      kn: [{ label: "🏦 ಜನ ಧನ ಶೂನ್ಯ ಬ್ಯಾಲೆನ್ಸ್ ಖಾತೆ", prompt: "ಜನ ಧನ ಬ್ಯಾಂಕ್ ಖಾತೆ ತೆರೆಯುವುದು ಹೇಗೆ?" }],
      ml: [{ label: "🏦 ജൻ ധൻ ബാങ്ക് അക്കൗണ്ട്", prompt: "ജൻ ധൻ ബാങ്ക് അക്കൗണ്ട് എടുക്കുന്നത് എങ്ങനെ?" }],
      bn: [{ label: "🏦 জন ধন ব্যাংক অ্যাকাউন্ট", prompt: "জন ধন ব্যাংক অ্যাকাউন্ট কীভাবে খুলব?" }],
      mr: [{ label: "🏦 जन धन बँक खाते", prompt: "जन धन बँक खाते कसे उघडावे?" }],
    };

    return {
      isBroadIntent: true,
      category: 'finance',
      question: questions[lang] || questions.en,
      choices: choices[lang] || choices.en,
    };
  }

  return null;
}
