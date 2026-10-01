import { SupportedLanguage, FollowUpChoice } from '../../../shared/types';

export interface ClientSmartIntentResult {
  isBroadIntent: boolean;
  category: 'schemes' | 'documents' | 'education' | 'jobs' | 'finance';
  question: string;
  choices: FollowUpChoice[];
}

export function detectClientBroadIntent(prompt: string, lang: SupportedLanguage): ClientSmartIntentResult | null {
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
        { label: "📄 Ration Card & Certificates", prompt: "How do I apply for a new Ration Card?" },
        { label: "👩 Lakhpati Didi & Women SHG", prompt: "Tell me about Lakhpati Didi and women self-help groups" },
        { label: "🧵 Free Skill & Tailoring Training", prompt: "How to get free skill and tailoring training?" },
      ],
      ta: [
        { label: "🍳 இலவச எரிவாயு இணைப்பு (உஜ்வாலா)", prompt: "உஜ்வாலா இலவச எரிவாயு திட்டம் பற்றி கூறவும்" },
        { label: "📄 புதிய குடும்ப அட்டை (ரேஷன் கார்டு)", prompt: "ரேஷன் கார்டு பெறுவது எப்படி?" },
      ],
      kn: [
        { label: "🍳 ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ (ಉಜ್ವಲ)", prompt: "ಉಜ್ವಲ ಉಚಿತ ಗ್ಯಾಸ್ ಯೋಜನೆಯ ವಿವರ ತಿಳಿಸಿ" },
        { label: "📄 ಹೊಸ ಪಡಿತರ ಚೀಟಿ", prompt: "ಹೊಸ ರೇಷನ್ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?" },
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
    p.includes('कागजात')
  ) {
    const questions: Record<SupportedLanguage, string> = {
      te: "తప్పకుండా అక్కయ్య! మీకు ఏ అధికారిక పత్రం లేదా సర్టిఫికేట్ అవసరం?",
      hi: "ज़रूर बहन! आपको कौन सा सरकारी प्रमाणपत्र या दस्तावेज़ बनवाना है?",
      en: "Sure sister! Which official certificate or document do you need help with?",
      ta: "எந்த சான்றிதழ் உங்களுக்கு தேவை?",
      kn: "ನಿಮಗೆ ಯಾವ ಪ್ರಮಾಣಪತ್ರ ಬೇಕು?",
      ml: "ഏത് രേഖയാണ് നിങ്ങൾക്ക് വേണ്ടത്?",
      bn: "আপনার কোন ধরনের শংসাপত্র দরকার?",
      mr: "तुम्हाला कोणते प्रमाणपत्र हवे आहे?",
    };

    const choices: Record<SupportedLanguage, FollowUpChoice[]> = {
      te: [
        { label: "📄 కొత్త రేషన్ కార్డు (NFSA)", prompt: "కొత్త రేషన్ కార్డు ఎలా దరఖాస్తు చేయాలి?" },
        { label: "📜 ఆదాయ ధృవీకరణ పత్రం (Income Certificate)", prompt: "ఆదాయ సర్టిఫికేట్ ఎలా పొందాలి?" },
      ],
      hi: [
        { label: "📄 नया राशन कार्ड (खाद्य सुरक्षा)", prompt: "नया राशन कार्ड कैसे बनवाएं?" },
        { label: "📜 आय प्रमाणपत्र (Income Certificate)", prompt: "आय प्रमाण पत्र कैसे प्राप्त करें?" },
      ],
      en: [
        { label: "📄 New Ration Card (NFSA)", prompt: "How do I apply for a new Ration Card?" },
        { label: "📜 Income Certificate", prompt: "How do I get an Income Certificate?" },
      ],
      ta: [{ label: "📄 புதிய குடும்ப அட்டை", prompt: "புதிய ரேஷன் கார்டு பெறுவது எப்படி?" }],
      kn: [{ label: "📄 ಹೊಸ ರೇಷನ್ ಕಾರ್ಡ್", prompt: "ಹೊಸ ಪಡಿತರ ಚೀಟಿ ಪಡೆಯುವುದು ಹೇಗೆ?" }],
      ml: [{ label: "📄 പുതിയ റേഷൻ കാർഡ്", prompt: "റേഷൻ കാർഡ് എങ്ങനെ ലഭിക്കും?" }],
      bn: [{ label: "📄 নতুন রেশন কার্ড", prompt: "নতুন রেশন কার্ড কীভাবে পাব?" }],
      mr: [{ label: "📄 नवीन रेशन कार्ड", prompt: "नवीन रेशन कार्ड कसे मिळवावे?" }],
    };

    return {
      isBroadIntent: true,
      category: 'documents',
      question: questions[lang] || questions.en,
      choices: choices[lang] || choices.en,
    };
  }

  return null;
}
