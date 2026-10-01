import { SupportedLanguage } from '../../../shared/types';

export interface UIStrings {
  appName: string;
  tagline: string;
  heroPrompt: string;
  schemeTitle: string;
  tapToSpeak: string;
  listening: string;
  processing: string;
  speaking: string;
  typePlaceholder: string;
  sendButton: string;
  voiceUnavailableNotice: string;
  readAloud: string;
  stopAudio: string;
  quickActionsTitle: string;
  quickActionHelpMeApply: string;
  quickActionAmIEligible: string;
  quickActionWhatDoINeed: string;
  quickActionHowDoIApply: string;
  quickActionExplainSimply: string;
  officialSourceLabel: string;
  officialSourceButton: string;
  tollFreeCall: string;
  disclaimer: string;
  trustSafetyNote: string;
  guidedJourneyTitle: string;
  steps: {
    understand: string;
    check: string;
    prepare: string;
    apply: string;
    nextStep: string;
  };
  journeyControls: {
    next: string;
    back: string;
    startAgain: string;
    finish: string;
  };
  explainSimplyHeader: string;
  explainSimplySubtitle: string;
  explainSimplyPlaceholder: string;
  explainButton: string;
  sampleNoticeButton: string;
  sampleNoticeText: string;
  sections: {
    meaning: string;
    actions: string;
    documents: string;
    nextStep: string;
  };
  // 1. Home Screen Categories
  homeCategoryTitle: string;
  homeCategorySubtitle: string;
  categories: {
    schemes: { title: string; subtitle: string; samplePrompt: string };
    documents: { title: string; subtitle: string; samplePrompt: string };
    education: { title: string; subtitle: string; samplePrompt: string };
    jobs: { title: string; subtitle: string; samplePrompt: string };
    finance: { title: string; subtitle: string; samplePrompt: string };
    askJanSakhi: { title: string; subtitle: string; samplePrompt: string };
  };
  // 2. Guided Prompts ("What do you need help with?")
  guidedPromptsHeading: string;
  guidedPrompts: Array<{ label: string; prompt: string }>;
  // 3. Voice Input Confirmation
  voiceConfirm: {
    didYouSay: string;
    confirmButton: string;
    retryButton: string;
    editPlaceholder: string;
    cancelButton: string;
  };
  // 4. Structured Step-by-Step Guide
  guideHeadings: {
    badge: string;
    whatItIs: string;
    whoIsEligible: string;
    documentsRequired: string;
    stepByStep: string;
    whereToApply: string;
    officialSource: string;
    nextStep: string;
    applyHere: string;
  };
  // 5. Demo Scenarios
  demoScenariosTitle: string;
  demoBadge: string;
  demoScenarios: Array<{
    id: string;
    title: string;
    description: string;
    prompt: string;
  }>;
  fontNormal: string;
  fontLarge: string;
  fontExtraLarge: string;
  errors: {
    generic: string;
    emptyInput: string;
    micDenied: string;
    noSpeech: string;
    network: string;
    notSupported: string;
  };
}

export const UI_LOCALES: Record<SupportedLanguage, UIStrings> = {
  // ==========================================
  // TELUGU (తెలుగు)
  // ==========================================
  te: {
    appName: "జనసఖి AI",
    tagline: "మీ స్వరం. మీ భాష. మీ అధికారం.",
    heroPrompt: "మాట్లాడండి లేదా టైప్ చేయండి. నేను మీకు దశలవారీగా మార్గనిర్దేశం చేస్తాను.",
    schemeTitle: "ప్రధాన మంత్రి ఉజ్జ్వల యోజన (ఉచిత గ్యాస్ కనెక్షన్)",
    tapToSpeak: "మాట్లాడటానికి తాకండి",
    listening: "వింటున్నాను... చెప్పండి...",
    processing: "సమాధానం సిద్ధం చేస్తున్నాను...",
    speaking: "జనసఖి మాట్లాడుతోంది...",
    typePlaceholder: "ఇక్కడ ప్రశ్న అడగండి...",
    sendButton: "పంపండి",
    voiceUnavailableNotice: "మీ బ్రౌజర్‌లో వాయిస్ సదుపాయం లేదు. దయచేసి క్రింద టైప్ చేయండి.",
    readAloud: "వినండి",
    stopAudio: "ఆపండి",
    quickActionsTitle: "త్వరిత మార్గాలు",
    quickActionHelpMeApply: "నాకు దరఖాస్తు చేయడంలో సహాయం చేయండి",
    quickActionAmIEligible: "నాకు అర్హత ఉందా?",
    quickActionWhatDoINeed: "నాకు ఏ పత్రాలు కావాలి?",
    quickActionHowDoIApply: "ఎలా దరఖాస్తు చేయాలి?",
    quickActionExplainSimply: "సరళంగా వివరించు",
    officialSourceLabel: "అధికారిక ప్రభుత్వ మూలం",
    officialSourceButton: "అధికారిక ప్రభుత్వ మూలానికి వెళ్ళండి (pmuy.gov.in)",
    tollFreeCall: "టోల్-ఫ్రీ హెల్ప్‌లైన్: 1800-266-6696",
    disclaimer: "జనసఖి AI అనేది ఒక స్వతంత్ర సహాయక మార్గదర్శి, అధికారిక ప్రభుత్వ వెబ్‌సైట్ కాదు. దయచేసి వివరాలను అధికారిక మూలం ద్వారా ధృవీకరించుకోండి. మేము ఆధార్ లేదా బ్యాంక్ వివరాలను అడగము.",
    trustSafetyNote: "జనసఖి AI మీకు మార్గదర్శకత్వం మాత్రమే అందిస్తుంది. ముఖ్యమైన వివరాలను అధికారిక ప్రభుత్వ వెబ్‌సైట్ ద్వారా ధృవీకరించుకోండి.",
    guidedJourneyTitle: "ఉజ్జ్వల 2.0 దరఖాస్తు మార్గదర్శి",
    steps: {
      understand: "1. అర్థం చేసుకోండి",
      check: "2. అర్హత తనిఖీ",
      prepare: "3. పత్రాలు సిద్ధం",
      apply: "4. దరఖాస్తు విధానం",
      nextStep: "5. తదుపరి అడుగు",
    },
    journeyControls: {
      next: "తదుపరి అడుగు ➔",
      back: "⬅ వెనుకకు",
      startAgain: "మొదటినుండి ప్రారంభించండి",
      finish: "పూర్తయింది",
    },
    explainSimplyHeader: "కఠినమైన ప్రభుత్వ నోటీసును సరళంగా అర్థం చేసుకోండి",
    explainSimplySubtitle: "కఠినమైన లేదా అర్థం కాని ప్రభుత్వ సమాచారాన్ని ఇక్కడ పేస్ట్ చేయండి. మేము 4 సులభమైన అంశాలలో వివరిస్తాము.",
    explainSimplyPlaceholder: "ప్రభుత్వ నోటీసు లేదా సమాచారాన్ని ఇక్కడ పేస్ట్ చేయండి...",
    explainButton: "సరళంగా వివరించు",
    sampleNoticeButton: "ఉదాహరణ నోటీసు చూపించు",
    sampleNoticeText: "PMUY 2.0 Guidelines Clause 4.2: Beneficiary identification through SECC-2011/14-point declaration. Applicant must be adult female without prior domestic LPG connection in the same household.",
    sections: {
      meaning: "దీని అర్థం ఏమిటి?",
      actions: "నేను ఏమి చేయాలి?",
      documents: "నాకు ఏ పత్రాలు అవసరం?",
      nextStep: "నా తదుపరి అడుగు ఏమిటి?",
    },
    homeCategoryTitle: "అవసరమైన ప్రభుత్వ సేవలు — మీ స్వంత భాషలో",
    homeCategorySubtitle: "మీకు అవసరమైన వర్గాన్ని ఎంచుకోండి లేదా నేరుగా మాట్లాడండి:",
    categories: {
      schemes: {
        title: "🏛 ప్రభుత్వ పథకాలు",
        subtitle: "ఉచిత గ్యాస్ (ఉజ్జ్వల), ఇళ్ల స్థలాలు, సంక్షేమ పథకాలు",
        samplePrompt: "నాకు ఉచిత గ్యాస్ కనెక్షన్ ఉజ్జ్వల యోజన గురించి చెప్పండి",
      },
      documents: {
        title: "📄 పత్రాలు & సర్టిఫికేట్లు",
        subtitle: "రేషన్ కార్డు, ఆదాయ ధృవీకరణ, ఆధార్ నవీకరణ",
        samplePrompt: "నాకు కొత్త రేషన్ కార్డు ఎలా పొందాలో చెప్పండి",
      },
      education: {
        title: "🎓 విద్య & నైపుణ్యాలు",
        subtitle: "ఉచిత టైలరింగ్ శిక్షణ, కంప్యూటర్ నైపుణ్యాలు",
        samplePrompt: "ఉచిత టైలరింగ్ మరియు నైపుణ్య శిక్షణ ఎలా పొందాలో చెప్పండి",
      },
      jobs: {
        title: "💼 ఉపాధి & మహిళా సంఘాలు",
        subtitle: "లక్షాధికారి దీదీ, డ్వాక్రా సంఘాలు, గ్రామీణ పనులు",
        samplePrompt: "మహిళా స్వయం సహాయక సంఘం రుణాలు లఖపతి దీదీ గురించి చెప్పండి",
      },
      finance: {
        title: "💰 ఆర్థిక సహాయం",
        subtitle: "జీరో బ్యాలెన్స్ జన్ ధన్ ఖాతా, ముద్రా రుణాలు, పెన్షన్లు",
        samplePrompt: "జీరో బ్యాలెన్స్ జన్ ధన్ బ్యాంక్ ఖాతా ఎలా తెరవాలి?",
      },
      askJanSakhi: {
        title: "❓ జనసఖిని అడగండి",
        subtitle: "ఏదైనా ప్రశ్నను మీ గొంతుతో లేదా టైప్ చేసి అడగండి",
        samplePrompt: "నమస్తే! మొదటిసారి మహిళలకు ఏ ప్రభుత్వ పథకాలు అందుబాటులో ఉన్నాయి?",
      },
    },
    guidedPromptsHeading: "మీకు ఏ సహాయం కావాలి?",
    guidedPrompts: [
      { label: "🍳 ప్రభుత్వ పథకం తెలుసుకోవాలి", prompt: "నాకు ప్రభుత్వ పథకం గురించి తెలియజేయండి" },
      { label: "📄 సర్టిఫికేట్ లేదా పత్రం కావాలి", prompt: "నాకు సర్టిఫికేట్ లేదా పత్రం తీసుకోవడంలో సహాయం కావాలి" },
      { label: "🧵 ఒక నైపుణ్యం నేర్చుకోవాలి", prompt: "నేను ఉచితంగా ఒక నైపుణ్యం నేర్చుకోవాలనుకుంటున్నాను" },
      { label: "💼 ఉపాధి మార్గాలు కావాలి", prompt: "నాకు ఉపాధి లేదా పని అవకాశాల గురించి మార్గదర్శకత్వం కావాలి" },
      { label: "💰 నేను పొందగలిగే ఆర్థిక సహాయం", prompt: "నేను పొందగలిగే ఆర్థిక సహాయం గురించి తెలుసుకోవాలనుకుంటున్నాను" },
    ],
    voiceConfirm: {
      didYouSay: "మీరు ఇలా అన్నారా?",
      confirmButton: "జనసఖిని అడగండి ➔",
      retryButton: "మళ్ళీ మాట్లాడండి",
      editPlaceholder: "ప్రశ్నను సరిచేయడానికి ఇక్కడ తాకండి...",
      cancelButton: "రద్దు చేయండి",
    },
    guideHeadings: {
      badge: "అధికారిక మార్గదర్శి",
      whatItIs: "1. ఈ పథకం / సేవ ఏమిటి?",
      whoIsEligible: "2. ఎవరు అర్హులు?",
      documentsRequired: "3. కావలసిన పత్రాలు (సిద్ధం చేసుకోండి):",
      stepByStep: "4. దరఖాస్తు దశలవారీ విధానం:",
      whereToApply: "5. ఎక్కడ దరఖాస్తు చేయాలి?",
      officialSource: "6. అధికారిక మూలం & వెబ్‌సైట్:",
      nextStep: "7. మీ తదుపరి అడుగు:",
      applyHere: "అధికారిక పోర్టల్‌కు వెళ్లండి",
    },
    demoScenariosTitle: "డెమో దృశ్యాలు (తక్షణ పరీక్ష కోసం)",
    demoBadge: "డెమో మోడ్",
    demoScenarios: [
      {
        id: 'demo-ujjwala',
        title: "ఉజ్జ్వల 2.0 ఉచిత గ్యాస్",
        description: "డిపాజిట్ లేని గ్యాస్ సిలిండర్ & పొయ్యి",
        prompt: "నాకు ఉచిత గ్యాస్ కనెక్షన్ ఉజ్జ్వల యోజన గురించి చెప్పండి",
      },
      {
        id: 'demo-ration',
        title: "కొత్త రేషన్ కార్డు",
        description: "ఆహార భద్రత మరియు కుటుంబ కార్డు దరఖాస్తు",
        prompt: "కొత్త రేషన్ కార్డు ఎలా దరఖాస్తు చేయాలి?",
      },
      {
        id: 'demo-tailoring',
        title: "ఉచిత టైలరింగ్ కోర్సు",
        description: "PMKVY ప్రభుత్వ సర్టిఫైడ్ శిక్షణ",
        prompt: "ఉచిత టైలరింగ్ శిక్షణ వివరాలు చెప్పండి",
      },
      {
        id: 'demo-shg',
        title: "లక్షాధికారి దీదీ & రుణాలు",
        description: "మహిళా స్వయం సహాయక సంఘాల వ్యాపారం",
        prompt: "మహిళా స్వయం సహాయక సంఘం రుణాలు లఖపతి దీదీ గురించి చెప్పండి",
      },
    ],
    fontNormal: "సాధారణ",
    fontLarge: "పెద్దది",
    fontExtraLarge: "చాలా పెద్దది",
    errors: {
      generic: "అర్థం చేసుకోలేకపోయాను. దయచేసి మళ్ళీ ప్రయత్నించండి లేదా క్రింద టైప్ చేయండి.",
      emptyInput: "దయచేసి ఒక ప్రశ్న మాట్లాడండి లేదా టైప్ చేయండి.",
      micDenied: "వాయిస్ కోసం మైక్రోఫోన్ అనుమతి అవసరం. దయచేసి బ్రౌజర్ సెట్టింగ్స్‌లో మైక్రోఫోన్ అనుమతించండి లేదా క్రింద టైప్ చేయండి.",
      noSpeech: "మీ మాట వినబడలేదు. దయచేసి మైక్రోఫోన్ మళ్ళీ తాకి మాట్లాడండి.",
      network: "వాయిస్ గుర్తింపు తాత్కాలिकంగా అందుబాటులో లేదు. దయచేసి టైప్ చేయండి.",
      notSupported: "ఈ బ్రౌజర్‌లో వాయిస్ ఇన్‌పుట్ అందుబాటులో లేదు. దయచేసి మీ ప్రశ్నను టైప్ చేయండి.",
    },
  },

  // ==========================================
  // HINDI (हिन्दी)
  // ==========================================
  hi: {
    appName: "जनसखी AI",
    tagline: "आपकी आवाज़। आपकी भाषा। आपका अधिकार।",
    heroPrompt: "बोलें या लिखें। मैं आपको कदम-दर-कदम समझाऊंगी।",
    schemeTitle: "प्रधानमंत्री उज्ज्वला योजना (मुफ्त गैस कनेक्शन)",
    tapToSpeak: "बोलने के लिए छुएं",
    listening: "सुन रही हूँ... बोलिए...",
    processing: "जवाब तैयार हो रहा है...",
    speaking: "जनसखी बोल रही है...",
    typePlaceholder: "यहाँ अपना सवाल पूछें...",
    sendButton: "भेजें",
    voiceUnavailableNotice: "आपके ब्राउज़र में आवाज़ इनपुट उपलब्ध नहीं है। कृपया नीचे लिखकर पूछें।",
    readAloud: "सुनें",
    stopAudio: "रोकें",
    quickActionsTitle: "त्वरित सहायता",
    quickActionHelpMeApply: "आवेदन करने में मदद करें",
    quickActionAmIEligible: "क्या मैं पात्र हूँ?",
    quickActionWhatDoINeed: "मुझे क्या कागजात चाहिए?",
    quickActionHowDoIApply: "आवेदन कैसे करें?",
    quickActionExplainSimply: "सरल भाषा में समझें",
    officialSourceLabel: "आधिकारिक सरकारी स्रोत",
    officialSourceButton: "आधिकारिक सरकारी स्रोत पर जाएं (pmuy.gov.in)",
    tollFreeCall: "टोल-फ्री हेल्पलाइन: 1800-266-6696",
    disclaimer: "जनसखी एआई एक स्वतंत्र मार्गदर्शन उपकरण है, आधिकारिक सरकारी वेबसाइट नहीं। कृपया अंतिम विवरण आधिकारिक पोर्टल से सत्यापित करें। हम कभी आधार या बैंक विवरण नहीं मांगते।",
    trustSafetyNote: "जनसखी एआई केवल मार्गदर्शन देती है। किसी भी महत्वपूर्ण जानकारी को आधिकारिक सरकारी पोर्टल से अवश्य जांचें।",
    guidedJourneyTitle: "उज्ज्वला 2.0 आवेदन मार्गदर्शिका",
    steps: {
      understand: "1. योजना को समझें",
      check: "2. पात्रता जांचें",
      prepare: "3. दस्तावेज़ तैयार करें",
      apply: "4. आवेदन कैसे करें",
      nextStep: "5. अगला कदम",
    },
    journeyControls: {
      next: "अगला कदम ➔",
      back: "⬅ पीछे",
      startAgain: "फिर से शुरू करें",
      finish: "समाप्त",
    },
    explainSimplyHeader: "कठिन सरकारी आदेश को सरल भाषा में समझें",
    explainSimplySubtitle: "कठिन सरकारी सूचना यहाँ डालें। हम इसे 4 आसान हिस्सों में समझाएंगे।",
    explainSimplyPlaceholder: "यहाँ सरकारी आदेश या सूचना पेस्ट करें...",
    explainButton: "सरल करें",
    sampleNoticeButton: "उदाहरण सूचना दिखाएं",
    sampleNoticeText: "उज्ज्वला 2.0 नियम खंड 4: वयस्क महिला जो बीपीएल/एससी/एसटी वर्ग में है और परिवार में पहले से कोई गैस कनेक्शन नहीं है, वह मुफ्त गैस कनेक्शन प्राप्त करने की पात्र है।",
    sections: {
      meaning: "इसका क्या मतलब है?",
      actions: "मुझे क्या करना होगा?",
      documents: "कौन से दस्तावेज़ चाहिए?",
      nextStep: "मेरा अगला कदम क्या होगा?",
    },
    homeCategoryTitle: "ज़रूरी सरकारी सेवाएं — आपकी अपनी भाषा में",
    homeCategorySubtitle: "अपनी ज़रूरत चुनें या सीधे बोलकर पूछें:",
    categories: {
      schemes: {
        title: "🏛 सरकारी योजनाएं",
        subtitle: "मुफ्त गैस (उज्ज्वला), आवास योजना, महिला कल्याण",
        samplePrompt: "मुझे मुफ्त गैस कनेक्शन उज्ज्वला योजना के बारे में बताएं",
      },
      documents: {
        title: "📄 दस्तावेज़ एवं प्रमाणपत्र",
        subtitle: "राशन कार्ड, आय प्रमाणपत्र, आधार सुधार",
        samplePrompt: "नया राशन कार्ड कैसे बनवाएं?",
      },
      education: {
        title: "🎓 शिक्षा एवं कौशल",
        subtitle: "मुफ्त सिलाई प्रशिक्षण, कंप्यूटर कोर्स",
        samplePrompt: "मुफ्त सिलाई और कौशल प्रशिक्षण कैसे प्राप्त करें?",
      },
      jobs: {
        title: "💼 रोजगार एवं महिला समूह",
        subtitle: "लखपति दीदी, स्वयं सहायता समूह, आजीविका",
        samplePrompt: "लखपति दीदी और महिला स्वयं सहायता समूह के बारे में बताएं",
      },
      finance: {
        title: "💰 वित्तीय सहायता",
        subtitle: "जीरो बैलेंस जन धन खाता, मुद्रा लोन, पेंशन",
        samplePrompt: "जीरो बैलेंस जन धन बैंक खाता कैसे खोलें?",
      },
      askJanSakhi: {
        title: "❓ जनसखी से पूछें",
        subtitle: "कोई भी सवाल अपनी आवाज़ में या लिखकर पूछें",
        samplePrompt: "नमस्ते! महिलाओं के लिए कौन-कौन सी मुख्य सरकारी योजनाएं हैं?",
      },
    },
    guidedPromptsHeading: "आपको किसमें मदद चाहिए?",
    guidedPrompts: [
      { label: "🍳 सरकारी योजना के बारे में जानना है", prompt: "मुझे सरकारी योजना के बारे में जानना है" },
      { label: "📄 प्रमाणपत्र बनवाने में मदद चाहिए", prompt: "मुझे प्रमाणपत्र चाहिए" },
      { label: "🧵 कोई हुनर या सिलाई सीखनी है", prompt: "मैं कोई हुनर सीखना चाहती हूँ" },
      { label: "💼 काम या रोजगार के साधन चाहिए", prompt: "मुझे रोजगार के साधन चाहिए" },
      { label: "💰 सरकारी आर्थिक सहायता की जानकारी", prompt: "मुझे सरकारी आर्थिक सहायता की जानकारी चाहिए" },
    ],
    voiceConfirm: {
      didYouSay: "क्या आपने यही कहा?",
      confirmButton: "जनसखी से पूछें ➔",
      retryButton: "फिर से बोलें",
      editPlaceholder: "सवालों में सुधार करने के लिए यहाँ छुएं...",
      cancelButton: "रद्द करें",
    },
    guideHeadings: {
      badge: "आधिकारिक मार्गदर्शिका",
      whatItIs: "1. यह सेवा / योजना क्या है?",
      whoIsEligible: "2. कौन पात्र है?",
      documentsRequired: "3. आवश्यक दस्तावेज़ (तैयार रखें):",
      stepByStep: "4. चरण-दर-चरण आवेदन प्रक्रिया:",
      whereToApply: "5. कहाँ आवेदन करें?",
      officialSource: "6. आधिकारिक स्रोत एवं वेबसाइट:",
      nextStep: "7. आपका अगला कदम:",
      applyHere: "आधिकारिक पोर्टल पर जाएं",
    },
    demoScenariosTitle: "डेमो परिदृश्य (त्वरित परीक्षण हेतु)",
    demoBadge: "डेमो मोड",
    demoScenarios: [
      {
        id: 'demo-ujjwala',
        title: "उज्ज्वला 2.0 मुफ्त गैस",
        description: "बिना सुरक्षा राशि के गैस कनेक्शन एवं चूल्हा",
        prompt: "मुझे मुफ्त गैस कनेक्शन उज्ज्वला योजना के बारे में बताएं",
      },
      {
        id: 'demo-ration',
        title: "नया राशन कार्ड",
        description: "खाद्य सुरक्षा और पारिवारिक पहचान पत्र",
        prompt: "नया राशन कार्ड कैसे बनवाएं?",
      },
      {
        id: 'demo-tailoring',
        title: "मुफ्त सिलाई प्रशिक्षण",
        description: "पीएमकेवीवाई सरकारी प्रमाणित कोर्स",
        prompt: "मुफ्त सिलाई प्रशिक्षण की जानकारी दें",
      },
      {
        id: 'demo-shg',
        title: "लखपति दीदी एवं ऋण",
        description: "महिला स्वयं सहायता समूह से व्यवसाय",
        prompt: "लखपति दीदी और महिला स्वयं सहायता समूह के बारे में बताएं",
      },
    ],
    fontNormal: "सामान्य",
    fontLarge: "बड़ा",
    fontExtraLarge: "बहुत बड़ा",
    errors: {
      generic: "मैं समझ नहीं सकी। कृपया पुनः प्रयास करें या नीचे लिखकर पूछें।",
      emptyInput: "कृपया कोई सवाल बोलें या लिखें।",
      micDenied: "आवाज़ के लिए माइक्रोफ़ोन की अनुमति आवश्यक है। कृपया ब्राउज़र सेटिंग्स में अनुमति दें या नीचे लिखकर पूछें।",
      noSpeech: "कुछ सुनाई नहीं दिया। कृपया माइक्रोफ़ोन दबाकर पुनः बोलें।",
      network: "आवाज़ पहचान अस्थायी रूप से अनुपलब्ध है। कृपया अपना सवाल लिखें।",
      notSupported: "इस ब्राउज़र में आवाज़ पहचान समर्थित नहीं है। कृपया अपना सवाल लिखें।",
    },
  },

  // ==========================================
  // ENGLISH (English)
  // ==========================================
  en: {
    appName: "JanSakhi AI",
    tagline: "Your voice. Your language. Your access.",
    heroPrompt: "Speak or type your question. I will guide you step by step.",
    schemeTitle: "Pradhan Mantri Ujjwala Yojana (Free Gas Connection)",
    tapToSpeak: "Tap to Speak",
    listening: "Listening... Please speak...",
    processing: "Preparing guidance...",
    speaking: "JanSakhi is speaking...",
    typePlaceholder: "Type your question here...",
    sendButton: "Send",
    voiceUnavailableNotice: "Voice input is not supported in this browser. Please type below.",
    readAloud: "Listen",
    stopAudio: "Stop",
    quickActionsTitle: "Quick Navigation",
    quickActionHelpMeApply: "Help Me Apply",
    quickActionAmIEligible: "Am I Eligible?",
    quickActionWhatDoINeed: "What Do I Need?",
    quickActionHowDoIApply: "How Do I Apply?",
    quickActionExplainSimply: "Explain This Simply",
    officialSourceLabel: "Official Government Source",
    officialSourceButton: "Visit Official Government Source (pmuy.gov.in)",
    tollFreeCall: "Toll-Free Helpline: 1800-266-6696",
    disclaimer: "JanSakhi AI is an independent AI guidance tool, not an official government website. Always verify details with official sources. We never ask for Aadhaar or bank details.",
    trustSafetyNote: "JanSakhi AI provides guidance. Always verify important information on the official government website.",
    guidedJourneyTitle: "PM Ujjwala 2.0 Application Guide",
    steps: {
      understand: "1. Understand Scheme",
      check: "2. Check Eligibility",
      prepare: "3. Prepare Documents",
      apply: "4. How to Apply",
      nextStep: "5. Next Step",
    },
    journeyControls: {
      next: "Next Step ➔",
      back: "⬅ Back",
      startAgain: "Start Again",
      finish: "Finish",
    },
    explainSimplyHeader: "Understand Complex Notices Simply",
    explainSimplySubtitle: "Paste any complicated government notice here. We will break it into 4 easy takeaways.",
    explainSimplyPlaceholder: "Paste government notice text here...",
    explainButton: "Simplify This Notice",
    sampleNoticeButton: "Show Sample Notice",
    sampleNoticeText: "PMUY 2.0 Guidelines Clause 4.2: Beneficiary identification through SECC-2011/14-point declaration. Applicant must be adult female without prior domestic LPG connection in the same household.",
    sections: {
      meaning: "What does this mean?",
      actions: "What do I need to do?",
      documents: "What documents do I need?",
      nextStep: "What is my next step?",
    },
    homeCategoryTitle: "Essential Services — In Your Language",
    homeCategorySubtitle: "Select a need below or tap the microphone to speak:",
    categories: {
      schemes: {
        title: "🏛 Government Schemes",
        subtitle: "Free gas (Ujjwala), housing, women's welfare",
        samplePrompt: "Tell me about PM Ujjwala free gas connection",
      },
      documents: {
        title: "📄 Documents & Certificates",
        subtitle: "Ration Card, Income Certificate, Aadhaar update",
        samplePrompt: "How do I apply for a new Ration Card?",
      },
      education: {
        title: "🎓 Education & Skills",
        subtitle: "Free tailoring training, digital smartphone skills",
        samplePrompt: "How to get free skill and tailoring training?",
      },
      jobs: {
        title: "💼 Jobs & Employment",
        subtitle: "Lakhpati Didi, Self-Help Groups, rural work",
        samplePrompt: "Tell me about Lakhpati Didi and women self-help groups",
      },
      finance: {
        title: "💰 Financial Support",
        subtitle: "Zero-balance Jan Dhan account, Mudra loan, pension",
        samplePrompt: "How to open a zero-balance Jan Dhan bank account?",
      },
      askJanSakhi: {
        title: "❓ Ask JanSakhi",
        subtitle: "Speak or type any question in your mother tongue",
        samplePrompt: "Hello! What essential welfare schemes are available for women?",
      },
    },
    guidedPromptsHeading: "What do you need help with?",
    guidedPrompts: [
      { label: "🍳 Government scheme", prompt: "I want to know about a government scheme" },
      { label: "📄 Documents & certificate", prompt: "I need help getting a certificate" },
      { label: "🧵 Learn a skill", prompt: "I want to learn a skill" },
      { label: "💼 Employment resources", prompt: "I want help finding employment resources" },
      { label: "💰 Financial support", prompt: "I want to know what support I may be eligible for" },
    ],
    voiceConfirm: {
      didYouSay: "Did you say:",
      confirmButton: "Ask JanSakhi ➔",
      retryButton: "Try Again",
      editPlaceholder: "Tap here to edit your question...",
      cancelButton: "Cancel",
    },
    guideHeadings: {
      badge: "Official Guidance",
      whatItIs: "1. What this service/resource is:",
      whoIsEligible: "2. Who may be eligible:",
      documentsRequired: "3. What documents are required:",
      stepByStep: "4. Step-by-step instructions:",
      whereToApply: "5. Where and how to apply:",
      officialSource: "6. Official source / portal:",
      nextStep: "7. What you should do next:",
      applyHere: "Visit Official Source",
    },
    demoScenariosTitle: "Demo Scenarios (For Instant Evaluation)",
    demoBadge: "Demo Mode",
    demoScenarios: [
      {
        id: 'demo-ujjwala',
        title: "PM Ujjwala Free Gas",
        description: "Deposit-free cylinder & stove for women",
        prompt: "Tell me about PM Ujjwala free gas connection",
      },
      {
        id: 'demo-ration',
        title: "New Ration Card",
        description: "Food security & household document guide",
        prompt: "How do I apply for a new Ration Card?",
      },
      {
        id: 'demo-tailoring',
        title: "Free Tailoring Course",
        description: "PMKVY government certified skill course",
        prompt: "How to get free skill and tailoring training?",
      },
      {
        id: 'demo-shg',
        title: "Lakhpati Didi & Loans",
        description: "Women self-help group micro-business",
        prompt: "Tell me about Lakhpati Didi and women self-help groups",
      },
    ],
    fontNormal: "Normal",
    fontLarge: "Large",
    fontExtraLarge: "Extra Large",
    errors: {
      generic: "I couldn't understand that. Please try again or type your question.",
      emptyInput: "Please speak or type a question.",
      micDenied: "Microphone access is required for voice input. You can allow it in your browser settings or type your question instead.",
      noSpeech: "I couldn't hear anything. Please try again.",
      network: "Voice recognition is temporarily unavailable. Please type your question.",
      notSupported: "Voice input isn't supported in this browser. Please type your question.",
    },
  },

  // ==========================================
  // TAMIL (தமிழ்)
  // ==========================================
  ta: {
    appName: "ஜனசகி AI",
    tagline: "உங்கள் குரல். உங்கள் மொழி. உங்கள் உரிமை.",
    heroPrompt: "பேசுங்கள் அல்லது எழுதுங்கள். நான் உங்களுக்கு வழிகாட்டுவேன்.",
    schemeTitle: "பிரதான் மந்திரி உஜ்வாலா யோஜனா (இலவச எரிவாயு இணைப்பு)",
    tapToSpeak: "பேச தொடங்குங்கள்",
    listening: "கேட்கிறது... பேசுங்கள்...",
    processing: "பதில் தயாராகிறது...",
    speaking: "ஜனசகி பேசுகிறது...",
    typePlaceholder: "உங்கள் கேள்வியை இங்கு எழுதவும்...",
    sendButton: "அனுப்பு",
    voiceUnavailableNotice: "உங்கள் உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை.",
    readAloud: "கேளுங்கள்",
    stopAudio: "நிறுத்து",
    quickActionsTitle: "விரைவு உதவி",
    quickActionHelpMeApply: "விண்ணப்பிக்க உதவவும்",
    quickActionAmIEligible: "எனக்கு தகுதி உள்ளதா?",
    quickActionWhatDoINeed: "என்ன ஆவணங்கள் தேவை?",
    quickActionHowDoIApply: "விண்ணப்பிப்பது எப்படி?",
    quickActionExplainSimply: "எளிய முறையில் விளக்கு",
    officialSourceLabel: "அரசு அதிகாரப்பூர்வ ஆதாரம்",
    officialSourceButton: "அதிகாரப்பூர்வ இணையதளத்திற்கு செல்க (pmuy.gov.in)",
    tollFreeCall: "கட்டணமில்லா எண்: 1800-266-6696",
    disclaimer: "ஜனசகி AI ஒரு வழிகாட்டுதல் கருவி மட்டுமே, அதிகாரப்பூர்வ தளம் அல்ல.",
    trustSafetyNote: "ஜனசகி AI வழிகாட்டுதலை மட்டுமே வழங்குகிறது. அரசு இணையதளத்தில் சரிபார்க்கவும்.",
    guidedJourneyTitle: "உஜ்வாலா 2.0 விண்ணப்ப வழிகாட்டி",
    steps: {
      understand: "1. திட்டத்தை புரிந்து கொள்ளவும்",
      check: "2. தகுதி சரிபார்ப்பு",
      prepare: "3. ஆவணங்களை தயார் செய்தல்",
      apply: "4. விண்ணப்பிக்கும் முறை",
      nextStep: "5. அடுத்த படி",
    },
    journeyControls: {
      next: "அடுத்த படி ➔",
      back: "⬅ பின்னால்",
      startAgain: "மீண்டும் தொடங்கு",
      finish: "முடிந்தது",
    },
    explainSimplyHeader: "அரசு அறிவிப்புகளை எளிய முறையில் புரிந்து கொள்ளுங்கள்",
    explainSimplySubtitle: "அரசு உத்தரவை இங்கே இடுங்கள். 4 எளிய குறிப்புகளில் விளக்குவோம்.",
    explainSimplyPlaceholder: "அரசு அறிவிப்பை இங்கே ஒட்டவும்...",
    explainButton: "எளிய முறையில் விளக்கு",
    sampleNoticeButton: "மாதிரி அறிவிப்பு",
    sampleNoticeText: "உஜ்வாலா 2.0 திட்டத்தின் கீழ் தகுதியான பெண்களுக்கு வைப்புத்தொகை இல்லாமல் இலவச எரிவாயு இணைப்பு மற்றும் அடுப்பு வழங்கப்படும்.",
    sections: {
      meaning: "இதன் பொருள் என்ன?",
      actions: "நான் என்ன செய்ய வேண்டும்?",
      documents: "என்ன ஆவணங்கள் தேவை?",
      nextStep: "அடுத்த படி என்ன?",
    },
    homeCategoryTitle: "அத்தியாவசிய அரசு சேவைகள் — உங்கள் மொழியில்",
    homeCategorySubtitle: "தேவையைத் தேர்வுசெய்க அல்லது குரல் மூலம் கேட்கவும்:",
    categories: {
      schemes: {
        title: "🏛 அரசு திட்டங்கள்",
        subtitle: "இலவச எரிவாயு, வீடு கட்டும் திட்டம், மகளிர் நலம்",
        samplePrompt: "உஜ்வாலா இலவச எரிவாயு திட்டம் பற்றி கூறவும்",
      },
      documents: {
        title: "📄 ஆவணங்கள் & சான்றிதழ்கள்",
        subtitle: "குடும்ப அட்டை, வருமான சான்றிதழ், ஆதார் திருத்தம்",
        samplePrompt: "ரேஷன் கார்டு பெறுவது எப்படி?",
      },
      education: {
        title: "🎓 கல்வி & திறன் பயிற்சி",
        subtitle: "இலவச தையல் பயிற்சி, கணினி கல்வி",
        samplePrompt: "இலவச தையல் பயிற்சி பற்றி கூறவும்",
      },
      jobs: {
        title: "💼 வேலைவாய்ப்பு & மகளிர் குழுக்கள்",
        subtitle: "மகளிர் சுயஉதவிக் குழுக்கள், கிராமப்புற வேலை",
        samplePrompt: "மகளிர் சுயஉதவிக் குழுக்கள் பற்றி கூறவும்",
      },
      finance: {
        title: "💰 நிதி உதவி",
        subtitle: "ஜன் தன் வங்கி கணக்கு, முத்ரா கடன், ஓய்வூதியம்",
        samplePrompt: "ஜன் தன் வங்கி கணக்கு தொடங்குவது எப்படி?",
      },
      askJanSakhi: {
        title: "❓ ஜனசகியிடம் கேளுங்கள்",
        subtitle: "எந்தவொரு கேள்வியையும் உங்கள் தாய்மொழியில் கேட்கவும்",
        samplePrompt: "வணக்கம்! பெண்களுக்கு என்னென்ன அரசு திட்டங்கள் உள்ளன?",
      },
    },
    guidedPromptsHeading: "உங்களுக்கு என்ன உதவி தேவை?",
    guidedPrompts: [
      { label: "🍳 அரசு திட்டம் பற்றி அறிய", prompt: "எனக்கு அரசு திட்டம் பற்றி தெரிய வேண்டும்" },
      { label: "📄 சான்றிதழ் பெற உதவி", prompt: "சான்றிதழ் பெற உதவி வேண்டும்" },
      { label: "🧵 ஒரு திறன் கற்க", prompt: "நான் ஒரு திறன் கற்க விரும்புகிறேன்" },
      { label: "💼 வேலைவாய்ப்பு ஆதாரங்கள்", prompt: "வேலைவாய்ப்பு ஆதாரங்கள் பற்றி தெரிய வேண்டும்" },
      { label: "💰 நிதி உதவி விவரங்கள்", prompt: "எனக்கு கிடைக்கும் நிதி உதவி பற்றி அறிய வேண்டும்" },
    ],
    voiceConfirm: {
      didYouSay: "நீங்கள் கூறியது இதா?",
      confirmButton: "ஜனசகியிடம் கேளுங்கள் ➔",
      retryButton: "மீண்டும் பேசுங்கள்",
      editPlaceholder: "கேள்வியை திருத்த இங்கே தொடவும்...",
      cancelButton: "ரத்து செய்",
    },
    guideHeadings: {
      badge: "அதிகாரப்பூர்வ வழிகாட்டி",
      whatItIs: "1. இந்த திட்டம் என்ன?",
      whoIsEligible: "2. யார் தகுதியானவர்கள்?",
      documentsRequired: "3. தேவையான ஆவணங்கள்:",
      stepByStep: "4. விண்ணப்பிக்கும் படிகள்:",
      whereToApply: "5. எங்கு விண்ணப்பிக்க வேண்டும்?",
      officialSource: "6. அதிகாரப்பூர்வ ஆதாரம்:",
      nextStep: "7. உங்கள் அடுத்த படி:",
      applyHere: "அதிகாரப்பூர்வ தளத்திற்கு செல்க",
    },
    demoScenariosTitle: "டெமோ காட்சிகள்",
    demoBadge: "டெமோ",
    demoScenarios: [
      {
        id: 'demo-ujjwala',
        title: "உஜ்வாலா இலவச எரிவாயு",
        description: "இலவச சிலிண்டர் & அடுப்பு",
        prompt: "உஜ்வாலா இலவச எரிவாயு திட்டம் பற்றி கூறவும்",
      },
      {
        id: 'demo-ration',
        title: "புதிய குடும்ப அட்டை",
        description: "ரேஷன் கார்டு விண்ணப்ப வழிகாட்டி",
        prompt: "ரேஷன் கார்டு பெறுவது எப்படி?",
      },
      {
        id: 'demo-tailoring',
        title: "இலவச தையல் பயிற்சி",
        description: "அரசு சான்றிதழ் பயிற்சி",
        prompt: "இலவச தையல் பயிற்சி பற்றி கூறவும்",
      },
      {
        id: 'demo-shg',
        title: "மகளிர் சுயஉதவிக் குழுக்கள்",
        description: "குறைந்த வட்டி சிறுதொழில் கடன்",
        prompt: "மகளிர் சுயஉதவிக் குழுக்கள் பற்றி கூறவும்",
      },
    ],
    fontNormal: "இயல்பான",
    fontLarge: "பெரியது",
    fontExtraLarge: "மிகப் பெரியது",
    errors: {
      generic: "புரிந்துகொள்ள முடியவில்லை. தயவுசெய்து மீண்டும் முயற்சிக்கவும் அல்லது கீழே தட்டச்சு செய்யவும்.",
      emptyInput: "கேள்வியை பேசவும் அல்லது தட்டச்சு செய்யவும்.",
      micDenied: "குரல் உள்ளீட்டிற்கு மைக்ரோஃபோன் அனுமதி தேவை. தயவுசெய்து அமைப்புகளில் அனுமதிக்கவும் அல்லது கீழே தட்டச்சு செய்யவும்.",
      noSpeech: "குரல் எதுவும் கேட்கவில்லை. தயவுசெய்து மைக்ரோஃபோனைத் தொட்டு மீண்டும் பேசவும்.",
      network: "குரல் சேவை தற்காலிகமாக கிடைக்கவில்லை. தயவுசெய்து தட்டச்சு செய்யவும்.",
      notSupported: "இந்த உலாவியில் குரல் உள்ளீடு ஆதரிக்கப்படவில்லை. தயவுசெய்து உங்கள் கேள்வியை தட்டச்சு செய்யவும்.",
    },
  },

  // ==========================================
  // KANNADA (ಕನ್ನಡ)
  // ==========================================
  kn: {
    appName: "ಜನಸಖಿ AI",
    tagline: "ನಿಮ್ಮ ಧ್ವನಿ. ನಿಮ್ಮ ಭಾಷೆ. ನಿಮ್ಮ ಹಕ್ಕು.",
    heroPrompt: "ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ. ನಾನು ಹಂತ ಹಂತವಾಗಿ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತೇನೆ.",
    schemeTitle: "ಪ್ರಧಾನ ಮಂತ್ರಿ ಉಜ್ವಲ ಯೋಜನೆ (ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ)",
    tapToSpeak: "ಮಾತನಾಡಲು ಸ್ಪರ್ಶಿಸಿ",
    listening: "ಕೇಳಿಸಿಕೊಳ್ಳುತ್ತಿದ್ದೇನೆ...",
    processing: "ಉತ್ತರ ಸಿದ್ಧವಾಗುತ್ತಿದೆ...",
    speaking: "ಜನಸಖಿ ಮಾತನಾಡುತ್ತಿದೆ...",
    typePlaceholder: "ಇಲ್ಲಿ ಪ್ರಶ್ನೆ ಕೇಳಿ...",
    sendButton: "ಕಳುಹಿಸಿ",
    voiceUnavailableNotice: "ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ.",
    readAloud: "ಕೇಳಿ",
    stopAudio: "ನಿಲ್ಲಿಸಿ",
    quickActionsTitle: "ತ್ವರಿತ ಸಹಾಯ",
    quickActionHelpMeApply: "ಅರ್ಜಿ ಸಲ್ಲಿಸಲು ಸಹಾಯ ಮಾಡಿ",
    quickActionAmIEligible: "ನಾನು ಅರ್ಹಳೇ?",
    quickActionWhatDoINeed: "ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?",
    quickActionHowDoIApply: "ಅರ್ಜಿ ಹೇಗೆ ಸಲ್ಲಿಸುವುದು?",
    quickActionExplainSimply: "ಸರಳವಾಗಿ ವಿವರಿಸಿ",
    officialSourceLabel: "ಅಧಿಕೃತ ಸರ್ಕಾರಿ ಮೂಲ",
    officialSourceButton: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ (pmuy.gov.in)",
    tollFreeCall: "ಉಚಿತ ಸಹಾಯವಾಣಿ: 1800-266-6696",
    disclaimer: "ಜನಸಖಿ AI ಕೇವಲ ಮಾರ್ಗದರ್ಶಿ, ಅಧಿಕೃತ ಜಾಲತಾಣವಲ್ಲ.",
    trustSafetyNote: "ಜನಸಖಿ AI ಕೇವಲ ಮಾರ್ಗದರ್ಶನ ನೀಡುತ್ತದೆ. ಅಧಿಕೃತ ವೆಬ್‌ಸೈಟ್‌ನಲ್ಲಿ ಪರಿಶೀಲಿಸಿ.",
    guidedJourneyTitle: "ಉಜ್ವಲ 2.0 ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶಿ",
    steps: {
      understand: "1. ಯೋಜನೆ ತಿಳಿಯಿರಿ",
      check: "2. ಅರ್ಹತೆ ಪರಿಶೀಲಿಸಿ",
      prepare: "3. ದಾಖಲೆ ಸಿದ್ಧತೆ",
      apply: "4. ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ವಿಧಾನ",
      nextStep: "5. ಮುಂದಿನ ಹೆಜ್ಜೆ",
    },
    journeyControls: {
      next: "ಮುಂದಿನ ಹೆಜ್ಜೆ ➔",
      back: "⬅ ಹಿಂದೆ",
      startAgain: "ಮತ್ತೆ ಪ್ರಾರಂಭಿಸಿ",
      finish: "ಮುಗಿಯಿತು",
    },
    explainSimplyHeader: "ಕಠಿಣ ಸರ್ಕಾರಿ ಆದೇಶಗಳನ್ನು ಸರಳವಾಗಿ ತಿಳಿಯಿರಿ",
    explainSimplySubtitle: "ಸರ್ಕಾರಿ ಆದೇಶವನ್ನು ಇಲ್ಲಿ ಹಾಕಿ. 4 ಸರಳ ಅಂಶಗಳಲ್ಲಿ ವಿವರಿಸುತ್ತೇವೆ.",
    explainSimplyPlaceholder: "ಸರ್ಕಾರಿ ಆದೇಶ ಇಲ್ಲಿ ಪೇಸ್ಟ್ ಮಾಡಿ...",
    explainButton: "ಸರಳವಾಗಿ ವಿವರಿಸಿ",
    sampleNoticeButton: "ಮಾದರಿ ಆದೇಶ",
    sampleNoticeText: "ಉಜ್ವಲ 2.0 ಯೋಜನೆಯಡಿ ಅರ್ಹ ಮಹಿಳೆಯರಿಗೆ ಉಚಿತ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಮತ್ತು ಒಲೆ ನೀಡಲಾಗುವುದು.",
    sections: {
      meaning: "ಇದರ ಅರ್ಥವೇನು?",
      actions: "ನಾನು ಏನು ಮಾಡಬೇಕು?",
      documents: "ಯಾವ ದಾಖಲೆಗಳು ಬೇಕು?",
      nextStep: "ಮುಂದಿನ ಹೆಜ್ಜೆ ಏನು?",
    },
    homeCategoryTitle: "ಅಗತ್ಯ ಸರ್ಕಾರಿ ಸೇವೆಗಳು — ನಿಮ್ಮ ಭಾಷೆಯಲ್ಲಿ",
    homeCategorySubtitle: "ಆಯ್ಕೆ ಮಾಡಿ ಅಥವಾ ಧ್ವನಿ ಮೂಲಕ ಮಾತನಾಡಿ:",
    categories: {
      schemes: {
        title: "🏛 ಸರ್ಕಾರಿ ಯೋಜನೆಗಳು",
        subtitle: "ಉಚಿತ ಗ್ಯಾಸ್, ವಸತಿ ಯೋಜನೆ, ಮಹಿಳಾ ಕಲ್ಯಾಣ",
        samplePrompt: "ಉಜ್ವಲ ಉಚಿತ ಗ್ಯಾಸ್ ಯೋಜನೆಯ ವಿವರ ತಿಳಿಸಿ",
      },
      documents: {
        title: "📄 ದಾಖಲೆಗಳು & ಪ್ರಮಾಣಪತ್ರಗಳು",
        subtitle: "ರೇಷನ್ ಕಾರ್ಡ್, ಆದಾಯ ಪ್ರಮಾಣಪತ್ರ, ಆಧಾರ್ ತಿದ್ದುಪಡಿ",
        samplePrompt: "ಹೊಸ ರೇಷನ್ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?",
      },
      education: {
        title: "🎓 ಶಿಕ್ಷಣ & ಕೌಶಲ್ಯ",
        subtitle: "ಉಚಿತ ಹೊಲಿಗೆ ತರಬೇತಿ, ಕಂಪ್ಯೂಟರ್ ಕೌಶಲ್ಯ",
        samplePrompt: "ಉಚಿತ ಹೊಲಿಗೆ ತರಬೇತಿ ವಿವರ ತಿಳಿಸಿ",
      },
      jobs: {
        title: "💼 ಉದ್ಯೋಗ & ಮಹಿಳಾ ಸಂಘಗಳು",
        subtitle: "ಸ್ವಸಹಾಯ ಸಂಘಗಳು, ಲಕ್ಷಪತಿ ದೀದಿ, ಗ್ರಾಮೀಣ ಕೆಲಸ",
        samplePrompt: "ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘಗಳ ಸಾಲದ ಬಗ್ಗೆ ತಿಳಿಸಿ",
      },
      finance: {
        title: "💰 ಆರ್ಥಿಕ ನೆರವು",
        subtitle: "ಜನ ಧನ ಖಾತೆ, ಮುದ್ರಾ ಸಾಲ, ಮಾಸಾಶನ",
        samplePrompt: "ಜನ ಧನ ಬ್ಯಾಂಕ್ ಖಾತೆ ತೆರೆಯುವುದು ಹೇಗೆ?",
      },
      askJanSakhi: {
        title: "❓ ಜನಸಖಿ ಕೇಳಿ",
        subtitle: "ನಿಮ್ಮ ಧ್ವನಿಯಲ್ಲಿ ಯಾವುದೇ ಪ್ರಶ್ನೆ ಕೇಳಿ",
        samplePrompt: "ನಮಸ್ಕಾರ! ಮಹಿಳೆಯರಿಗೆ ಇರುವ ಮುಖ್ಯ ಸರ್ಕಾರಿ ಯೋಜನೆಗಳಾವುವು?",
      },
    },
    guidedPromptsHeading: "ನಿಮಗೆ ಯಾವ ಸಹಾಯ ಬೇಕು?",
    guidedPrompts: [
      { label: "🍳 ಸರ್ಕಾರಿ ಯೋಜನೆ ಬಗ್ಗೆ ತಿಳಿಯಲು", prompt: "ನನಗೆ ಸರ್ಕಾರಿ ಯೋಜನೆಯ ಬಗ್ಗೆ ತಿಳಿಯಬೇಕು" },
      { label: "📄 ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು ಸಹಾಯ", prompt: "ದಾಖಲೆ ಅಥವಾ ಪ್ರಮಾಣಪತ್ರ ಪಡೆಯಲು ಸಹಾಯ ಬೇಕು" },
      { label: "🧵 ಕೌಶಲ್ಯ ಕಲಿಯಲು", prompt: "ನಾನು ಕೌಶಲ್ಯ ಕಲಿಯಲು ಬಯಸುತ್ತೇನೆ" },
      { label: "💼 ಉದ್ಯೋಗದ ಮಾಹಿತಿ", prompt: "ಉದ್ಯೋಗದ ಮಾಹಿತಿಗಾಗಿ ಸಹಾಯ ಬೇಕು" },
      { label: "💰 ಆರ್ಥಿಕ ನೆರವಿನ ವಿವರ", prompt: "ಆರ್ಥಿಕ ನೆರವಿನ ಬಗ್ಗೆ ತಿಳಿಯಲು ಬಯಸುತ್ತೇನೆ" },
    ],
    voiceConfirm: {
      didYouSay: "ನೀವು ಹೇಳಿದ್ದು ಇದೇನಾ?",
      confirmButton: "ಜನಸಖಿ ಕೇಳಿ ➔",
      retryButton: "ಮತ್ತೆ ಮಾತನಾಡಿ",
      editPlaceholder: "ಪ್ರಶ್ನೆ ಸರಿಪಡಿಸಲು ಇಲ್ಲಿ ಸ್ಪರ್ಶಿಸಿ...",
      cancelButton: "ರದ್ದುಮಾಡಿ",
    },
    guideHeadings: {
      badge: "ಅಧಿಕೃತ ಮಾರ್ಗದರ್ಶಿ",
      whatItIs: "1. ಈ ಯೋಜನೆ ಏನು?",
      whoIsEligible: "2. ಯಾರು ಅರ್ಹರು?",
      documentsRequired: "3. ಅಗತ್ಯ ದಾಖಲೆಗಳು:",
      stepByStep: "4. ಅರ್ಜಿ ಸಲ್ಲಿಸುವ ಹಂತಗಳು:",
      whereToApply: "5. ಎಲ್ಲಿ ಅರ್ಜಿ ಸಲ್ಲಿಸಬೇಕು?",
      officialSource: "6. ಅಧಿಕೃತ ಮೂಲ:",
      nextStep: "7. ಮುಂದಿನ ಹೆಜ್ಜೆ:",
      applyHere: "ಅಧಿಕೃತ ಪೋರ್ಟಲ್‌ಗೆ ಭೇಟಿ ನೀಡಿ",
    },
    demoScenariosTitle: "ಡೆಮೊ ಸನ್ನಿವೇಶಗಳು",
    demoBadge: "ಡೆಮೊ",
    demoScenarios: [
      {
        id: 'demo-ujjwala',
        title: "ಉಜ್ವಲ ಉಚಿತ ಗ್ಯಾಸ್",
        description: "ಉಚಿತ ಸಿಲಿಂಡರ್ ಮತ್ತು ಗ್ಯಾಸ್ ಒಲೆ",
        prompt: "ಉಜ್ವಲ ಉಚಿತ ಗ್ಯಾಸ್ ಯೋಜನೆಯ ವಿವರ ತಿಳಿಸಿ",
      },
      {
        id: 'demo-ration',
        title: "ಹೊಸ ರೇಷನ್ ಕಾರ್ಡ್",
        description: "ಆಹಾರ ಭದ್ರತಾ ಚೀಟಿ ಅರ್ಜಿ ಮಾರ್ಗದರ್ಶಿ",
        prompt: "ಹೊಸ ರೇಷನ್ ಕಾರ್ಡ್ ಪಡೆಯುವುದು ಹೇಗೆ?",
      },
      {
        id: 'demo-tailoring',
        title: "ಉಚಿತ ಹೊಲಿಗೆ ತರಬೇತಿ",
        description: "ಸರ್ಕಾರಿ ಪ್ರಮಾಣೀಕೃತ ಕೌಶಲ್ಯ ಕೋರ್ಸ್",
        prompt: "ಉಚಿತ ಹೊಲಿಗೆ ತರಬೇತಿ ವಿವರ ತಿಳಿಸಿ",
      },
      {
        id: 'demo-shg',
        title: "ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘ",
        description: "ಕಡಿಮೆ ಬಡ್ಡಿದರದ ಸಾಲ ಮತ್ತು ಉದ್ಯಮ",
        prompt: "ಮಹಿಳಾ ಸ್ವಸಹಾಯ ಸಂಘಗಳ ಸಾಲದ ಬಗ್ಗೆ ತಿಳಿಸಿ",
      },
    ],
    fontNormal: "ಸಾಮಾನ್ಯ",
    fontLarge: "ದೊಡ್ಡದು",
    fontExtraLarge: "ತುಂಬಾ ದೊಡ್ಡದು",
    errors: {
      generic: "ಅರ್ಥಮಾಡಿಕೊಳ್ಳಲು ಸಾಧ್ಯವಾಗಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಪುನಃ ಪ್ರಯತ್ನಿಸಿ ಅಥವಾ ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ.",
      emptyInput: "ದಯವಿಟ್ಟು ಪ್ರಶ್ನೆ ಮಾತನಾಡಿ ಅಥವಾ ಟೈಪ್ ಮಾಡಿ.",
      micDenied: "ಧ್ವನಿ ಇನ್‌ಪುಟ್‌ಗಾಗಿ ಮೈಕ್ರೊಫೋನ್ ಅನುಮತಿ ಅಗತ್ಯವಿದೆ. ದಯವಿಟ್ಟು ಬ್ರೌಸರ್ ಸೆಟ್ಟಿಂಗ್‌ಗಳಲ್ಲಿ ಅನುಮತಿಸಿ ಅಥವಾ ಕೆಳಗೆ ಟೈಪ್ ಮಾಡಿ.",
      noSpeech: "ಯಾವುದೇ ಧ್ವನಿ ಕೇಳಿಸಲಿಲ್ಲ. ದಯವಿಟ್ಟು ಮೈಕ್ರೊಫೋನ್ ಮುಟ್ಟಿ ಪುನಃ ಮಾತನಾಡಿ.",
      network: "ಧ್ವನಿ ಗುರುತಿಸುವಿಕೆ ತಾತ್ಕಾಲಿಕವಾಗಿ ಲಭ್ಯವಿಲ್ಲ. ದಯವಿಟ್ಟು ಟೈಪ್ ಮಾಡಿ.",
      notSupported: "ಈ ಬ್ರೌಸರ್‌ನಲ್ಲಿ ಧ್ವನಿ ಇನ್‌ಪುಟ್ ಬೆಂಬಲಿತವಾಗಿಲ್ಲ. ದಯವಿಟ್ಟು ನಿಮ್ಮ ಪ್ರಶ್ನೆಯನ್ನು ಟೈಪ್ ಮಾಡಿ.",
    },
  },

  // ==========================================
  // MALAYALAM (മലയാളം)
  // ==========================================
  ml: {
    appName: "ജനസഖി AI",
    tagline: "നിങ്ങളുടെ ശബ്ദം. നിങ്ങളുടെ ഭാഷ. നിങ്ങളുടെ അവകാശം.",
    heroPrompt: "സംസാരിക്കുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക. ഞാൻ സഹായിക്കാം.",
    schemeTitle: "പ്രധാനമന്ത്രി ഉജ്ജ്വല യോജന (സൗജന്യ ഗ്യാസ് കണക്ഷൻ)",
    tapToSpeak: "സംസാരിക്കാൻ തൊടുക",
    listening: "കേൾക്കുന്നു...",
    processing: "മറുപടി തയ്യാറാക്കുന്നു...",
    speaking: "ജനസഖി സംസാരിക്കുന്നു...",
    typePlaceholder: "ചോദ്യം ഇവിടെ ചോദിക്കുക...",
    sendButton: "അയക്കുക",
    voiceUnavailableNotice: "വോയ്‌സ് ലഭ്യമല്ല. ദയവായി ടൈപ്പ് ചെയ്യുക.",
    readAloud: "കേൾക്കുക",
    stopAudio: "നിർത്തുക",
    quickActionsTitle: "പെട്ടെന്നുള്ള സഹായം",
    quickActionHelpMeApply: "അപേക്ഷിക്കാൻ സഹായിക്കൂ",
    quickActionAmIEligible: "എനിക്ക് അർഹതയുണ്ടോ?",
    quickActionWhatDoINeed: "എന്തൊക്കെ രേഖകൾ വേണം?",
    quickActionHowDoIApply: "എങ്ങനെ അപേക്ഷിക്കാം?",
    quickActionExplainSimply: "ലളിതമായി വിശദീകരിക്കൂ",
    officialSourceLabel: "ഔദ്യോഗിക സർക്കാർ ഉറവിടം",
    officialSourceButton: "ഔദ്യോഗിക പോർട്ടൽ സന്ദർശിക്കുക (pmuy.gov.in)",
    tollFreeCall: "സഹായവാണി: 1800-266-6696",
    disclaimer: "ജനസഖി AI ഒരു സഹായ മാർഗ്ഗദർശി മാത്രമാണ്.",
    trustSafetyNote: "ജനസഖി AI മാർഗ്ഗനിർദ്ദേശം മാത്രമാണ് നൽകുന്നത്. ഔദ്യോഗിക വെബ്സൈറ്റിൽ പരിശോധിക്കുക.",
    guidedJourneyTitle: "ഉജ്ജ്വല 2.0 അപേക്ഷ സഹായി",
    steps: {
      understand: "1. പദ്ധതിയെ അറിയുക",
      check: "2. യോഗ്യത പരിശോധന",
      prepare: "3. രേഖകൾ തയ്യാറാക്കൽ",
      apply: "4. അപേക്ഷാ രീതി",
      nextStep: "5. അടുത്ത നടപടി",
    },
    journeyControls: {
      next: "അടുത്ത നടപടി ➔",
      back: "⬅ തിരികെ",
      startAgain: "വീണ്ടും തുടങ്ങുക",
      finish: "പൂർത്തിയായി",
    },
    explainSimplyHeader: "സർക്കാർ അറിയിപ്പുകൾ ലളിതമായി മനസ്സിലാക്കാം",
    explainSimplySubtitle: "അറിയിപ്പ് ഇവിടെ പേസ്റ്റ് ചെയ്യുക. 4 ലളിതമായ കാര്യങ്ങളായി വിശദീകരിക്കാം.",
    explainSimplyPlaceholder: "അറിയിപ്പ് ഇവിടെ പേസ്റ്റ് ചെയ്യുക...",
    explainButton: "ലളിതമാക്കുക",
    sampleNoticeButton: "മാതൃകാ അറിയിപ്പ്",
    sampleNoticeText: "ഉജ്ജ്വല 2.0 വഴി അർഹരായ സ്ത്രീകൾക്ക് സൗജന്യ ഗ്യാസ് കണക്ഷൻ ലഭിക്കും.",
    sections: {
      meaning: "ഇതിന്റെ അർത്ഥമെന്ത്?",
      actions: "ഞാൻ എന്തുചെയ്യണം?",
      documents: "ആവശ്യമായ രേഖകൾ?",
      nextStep: "അടുത്ത നടപടി?",
    },
    homeCategoryTitle: "ആവശ്യമായ സർക്കാർ സേവനങ്ങൾ — നിങ്ങളുടെ ഭാഷയിൽ",
    homeCategorySubtitle: "ആവശ്യമുള്ളത് തിരഞ്ഞെടുക്കുക അല്ലെങ്കിൽ സംസാരിക്കുക:",
    categories: {
      schemes: {
        title: "🏛 സർക്കാർ പദ്ധതികൾ",
        subtitle: "സൗജന്യ ഗ്യാസ്, ഭവന പദ്ധതി, സ്ത്രീക്ഷേമം",
        samplePrompt: "സൗജന്യ ഗ്യാസ് കണക്ഷൻ ഉജ്ജ്വല പദ്ധതിയെക്കുറിച്ച് പറയൂ",
      },
      documents: {
        title: "📄 രേഖകളും സർട്ടിഫിക്കറ്റുകളും",
        subtitle: "റേഷൻ കാർഡ്, വരുമാന സർട്ടിഫിക്കറ്റ്, ആധാർ",
        samplePrompt: "റേഷൻ കാർഡ് എങ്ങനെ ലഭിക്കും?",
      },
      education: {
        title: "🎓 വിദ്യാഭ്യാസവും തൊഴിൽ പരിശീലനവും",
        subtitle: "സൗജന്യ തയ്യൽ പരിശീലനം, കമ്പ്യൂട്ടർ കോഴ്സ്",
        samplePrompt: "സൗജന്യ തയ്യൽ പരിശീലനം",
      },
      jobs: {
        title: "💼 തൊഴിൽ & വനിതാ സംഘങ്ങൾ",
        subtitle: "കുടുംബശ്രീ, സ്വയംസഹായ സംഘങ്ങൾ, ഗ്രാമീണ തൊഴിൽ",
        samplePrompt: "വനിതാ സ്വയംസഹായ സംഘങ്ങൾ",
      },
      finance: {
        title: "💰 സാമ്പത്തിക സഹായം",
        subtitle: "ജൻ ധൻ അക്കൗണ്ട്, മുദ്ര വായ്പ, പെൻഷൻ",
        samplePrompt: "ജൻ ധൻ ബാങ്ക് അക്കൗണ്ട് എടുക്കുന്നത് എങ്ങനെ?",
      },
      askJanSakhi: {
        title: "❓ ജനസഖിയോട് ചോദിക്കൂ",
        subtitle: "എന്തും നിങ്ങളുടെ സ്വന്തം ഭാഷയിൽ ചോദിക്കാം",
        samplePrompt: "നമസ്കാരം! സ്ത്രീകൾക്കുള്ള പ്രധാന പദ്ധതികൾ ഏതൊക്കെയാണ്?",
      },
    },
    guidedPromptsHeading: "നിങ്ങൾക്ക് എന്താണ് സഹായം വേണ്ടത്?",
    guidedPrompts: [
      { label: "🍳 സർക്കാർ പദ്ധതിയെക്കുറിച്ച്", prompt: "സർക്കാർ പദ്ധതിയെക്കുറിച്ച് അറിയണം" },
      { label: "📄 സർട്ടിഫിക്കറ്റ് ലഭിക്കാൻ സഹായം", prompt: "സർട്ടിഫിക്കറ്റ് ലഭിക്കാൻ സഹായം വേണം" },
      { label: "🧵 തൊഴിൽ നൈപുണ്യം പഠിക്കാൻ", prompt: "തൊഴിൽ പഠിക്കാൻ ആഗ്രഹിക്കുന്നു" },
      { label: "💼 തൊഴിൽ വിവരങ്ങൾ", prompt: "തൊഴിൽ വിവരങ്ങൾ അറിയണം" },
      { label: "💰 സാമ്പത്തിക സഹായം", prompt: "സാമ്പത്തിക സഹായത്തെക്കുറിച്ച് അറിയണം" },
    ],
    voiceConfirm: {
      didYouSay: "നിങ്ങൾ ഇതാണോ പറഞ്ഞത്?",
      confirmButton: "ജനസഖിയോട് ചോദിക്കൂ ➔",
      retryButton: "വീണ്ടും സംസാരിക്കുക",
      editPlaceholder: "തിരുത്താൻ ഇവിടെ തൊടുക...",
      cancelButton: "റദ്ദാക്കുക",
    },
    guideHeadings: {
      badge: "ഔദ്യോഗിക മാർഗ്ഗരേഖ",
      whatItIs: "1. എന്താണ് ഈ പദ്ധതി?",
      whoIsEligible: "2. ആർക്കാണ് അർഹത?",
      documentsRequired: "3. ആവശ്യമായ രേഖകൾ:",
      stepByStep: "4. അപേക്ഷാ ഘട്ടങ്ങൾ:",
      whereToApply: "5. എവിടെ അപേക്ഷിക്കണം?",
      officialSource: "6. ഔദ്യോഗിക ഉറവിടം:",
      nextStep: "7. അടുത്ത നടപടി:",
      applyHere: "ഔദ്യോഗിക പോർട്ടലിലേക്ക്",
    },
    demoScenariosTitle: "ഡെമോ",
    demoBadge: "ഡെമോ",
    demoScenarios: [
      {
        id: 'demo-ujjwala',
        title: "ഉജ്ജ്വല സൗജന്യ ഗ്യാസ്",
        description: "സൗജന്യ സിലിണ്ടറും സ്റ്റൗവും",
        prompt: "സൗജന്യ ഗ്യാസ് കണക്ഷൻ ഉജ്ജ്വല പദ്ധതിയെക്കുറിച്ച് പറയൂ",
      },
      {
        id: 'demo-ration',
        title: "പുതിയ റേഷൻ കാർഡ്",
        description: "റേഷൻ കാർഡ് അപേക്ഷാ മാർഗ്ഗരേഖ",
        prompt: "റേഷൻ കാർഡ് എങ്ങനെ ലഭിക്കും?",
      },
      {
        id: 'demo-tailoring',
        title: "സൗജന്യ തയ്യൽ പരിശീലനം",
        description: "സർക്കാർ സർട്ടിഫിക്കറ്റ് കോഴ്സ്",
        prompt: "സൗജന്യ തയ്യൽ പരിശീലനം",
      },
      {
        id: 'demo-shg',
        title: "വനിതാ സ്വയംസഹായ സംഘങ്ങൾ",
        description: "ലഘു വായ്പകളും തൊഴിലും",
        prompt: "വനിതാ സ്വയംസഹായ സംഘങ്ങൾ",
      },
    ],
    fontNormal: "സാധാരണ",
    fontLarge: "വലുത്",
    fontExtraLarge: "വളരെ വലുത്",
    errors: {
      generic: "മനസ്സിലാക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും ശ്രമിക്കുക അല്ലെങ്കിൽ താഴെ ടൈപ്പ് ചെയ്യുക.",
      emptyInput: "ദയവായി സംസാരിക്കുക അല്ലെങ്കിൽ ടൈപ്പ് ചെയ്യുക.",
      micDenied: "ശബ്ദ ഇൻപുട്ടിനായി മൈക്രോഫോൺ അനുമതി ആവശ്യമാണ്. ദയവായി ബ്രൗസർ ക്രമീകരണങ്ങളിൽ അനുമതി നൽകുക അല്ലെങ്കിൽ താഴെ ടൈപ്പ് ചെയ്യുക.",
      noSpeech: "ശബ്ദമൊന്നും കേൾക്കാൻ കഴിഞ്ഞില്ല. ദയവായി വീണ്ടും മൈക്രോഫോൺ തൊട്ട് സംസാരിക്കുക.",
      network: "വോയ്‌സ് റെക്കഗ്നിഷൻ താൽക്കാലികമായി ലഭ്യമല്ല. ദയവായി ടൈപ്പ് ചെയ്യുക.",
      notSupported: "ഈ ബ്രൗസറിൽ വോയ്‌സ് ഇൻപുട്ട് പിന്തുണയ്ക്കുന്നില്ല. ദയവായി നിങ്ങളുടെ ചോദ്യം ടൈപ്പ് ചെയ്യുക.",
    },
  },

  // ==========================================
  // BENGALI (বাংলা)
  // ==========================================
  bn: {
    appName: "জনসখী AI",
    tagline: "আপনার কণ্ঠ। আপনার ভাষা। আপনার অধিকার।",
    heroPrompt: "বলুন বা লিখুন। আমি ধাপে ধাপে বুঝিয়ে দেব।",
    schemeTitle: "প্রধানমন্ত্রী উজ্জ্বলা যোজনা (বিনামূল্যে গ্যাস সংযোগ)",
    tapToSpeak: "কথা বলতে স্পর্শ করুন",
    listening: "শুনছি... বলুন...",
    processing: "উত্তর প্রস্তুত হচ্ছে...",
    speaking: "জনসখী কথা বলছে...",
    typePlaceholder: "এখানে আপনার প্রশ্ন লিখুন...",
    sendButton: "পাঠান",
    voiceUnavailableNotice: "ভয়েস ইনপুট সমর্থিত নয়। অনুগ্রহ করে লিখে জানান।",
    readAloud: "শুনুন",
    stopAudio: "থামুন",
    quickActionsTitle: "দ্রুত সহায়তা",
    quickActionHelpMeApply: "আবেদন করতে সাহায্য করুন",
    quickActionAmIEligible: "আমি কি যোগ্য?",
    quickActionWhatDoINeed: "কি কি নথি লাগবে?",
    quickActionHowDoIApply: "আবেদন কিভাবে করব?",
    quickActionExplainSimply: "সহজ ভাষায় বুঝিয়ে দিন",
    officialSourceLabel: "অফিসিয়াল সরকারি উৎস",
    officialSourceButton: "অফিসিয়াল পোর্টালে যান (pmuy.gov.in)",
    tollFreeCall: "টোল-ফ্রি হেল্পলাইন: 1800-266-6696",
    disclaimer: "জনসখী এআই একটি নির্দেশিকা মাত্র, অফিসিয়াল সাইট নয়।",
    trustSafetyNote: "জনসখী এআই শুধুমাত্র নির্দেশিকা প্রদান করে। অফিসিয়াল সরকারি ওয়েবসাইটে যাচাই করুন।",
    guidedJourneyTitle: "উজ্জ্বলা ২.০ আবেদন নির্দেশিকা",
    steps: {
      understand: "১. যোজনা বুঝুন",
      check: "২. যোগ্যতা যাচাই",
      prepare: "৩. নথি প্রস্তুত",
      apply: "৪. আবেদন নিয়ম",
      nextStep: "৫. পরবর্তী পদক্ষেপ",
    },
    journeyControls: {
      next: "পরবর্তী পদক্ষেপ ➔",
      back: "⬅ পিছনে",
      startAgain: "পুনরায় শুরু করুন",
      finish: "সমাপ্ত",
    },
    explainSimplyHeader: "সরকারি বিজ্ঞপ্তি সহজ ভাষায় বুঝুন",
    explainSimplySubtitle: "কঠিন সরকারি আদেশ এখানে দিন। ৪টি সহজ ধাপে ব্যাখ্যা করব।",
    explainSimplyPlaceholder: "বিজ্ঞপ্তি এখানে পেস্ট করুন...",
    explainButton: "সহজ করুন",
    sampleNoticeButton: "নমুনা বিজ্ঞপ্তি",
    sampleNoticeText: "উজ্জ্বলা ২.০ যোজনার অধীনে দরিদ্র পরিবারের মহিলারা বিনামূল্যে গ্যাস সংযোগ ও ওভেন পাবেন।",
    sections: {
      meaning: "এর অর্থ কী?",
      actions: "আমার কী করণীয়?",
      documents: "কী কী নথি দরকার?",
      nextStep: "আমার পরবর্তী পদক্ষেপ কী?",
    },
    homeCategoryTitle: "জরুরি সরকারি পরিষেবা — আপনার নিজের ভাষায়",
    homeCategorySubtitle: "আপনার প্রয়োজন বেছে নিন অথবা মুখে বলুন:",
    categories: {
      schemes: {
        title: "🏛 সরকারি যোজনা",
        subtitle: "বিনামূল্যে গ্যাস (উজ্জ্বলা), আবাস যোজনা, নারী কল্যাণ",
        samplePrompt: "বিনামূল্যে গ্যাস সংযোগ উজ্জ্বলা যোজনা সম্পর্কে জানান",
      },
      documents: {
        title: "📄 নথি ও শংসাপত্র",
        subtitle: "রেশন কার্ড, ইনকাম সার্টিফিকেট, আধার সংশোধন",
        samplePrompt: "নতুন রেশন কার্ড কীভাবে পাব?",
      },
      education: {
        title: "🎓 শিক্ষা ও দক্ষতা",
        subtitle: "বিনামূল্যে সেলাই প্রশিক্ষণ, কম্পিউটার শিক্ষা",
        samplePrompt: "বিনামূল্যে সেলাই প্রশিক্ষণ",
      },
      jobs: {
        title: "💼 জীবিকা ও স্বনির্ভর গোষ্ঠী",
        subtitle: "লাখপতি দিদি, স্বনির্ভর দল, ১০০ দিনের কাজ",
        samplePrompt: "স্বনির্ভর গোষ্ঠী ও লাখপতি দিদি যোজনা",
      },
      finance: {
        title: "💰 আর্থিক সহায়তা",
        subtitle: "জিরো ব্যালেন্স জন ধন অ্যাকাউন্ট, মুদ্রা ঋণ, পেনশন",
        samplePrompt: "জন ধন ব্যাংক অ্যাকাউন্ট কীভাবে খুলব?",
      },
      askJanSakhi: {
        title: "❓ জনসখীকে জিজ্ঞাসা করুন",
        subtitle: "যেকোনো প্রশ্ন নিজের ভাষায় মুখে বলুন বা লিখে জানান",
        samplePrompt: "নমস্কার! মহিলাদের জন্য কী কী প্রধান সরকারি যোজনা রয়েছে?",
      },
    },
    guidedPromptsHeading: "আপনার কী সাহায্য দরকার?",
    guidedPrompts: [
      { label: "🍳 সরকারি যোজনা সম্পর্কে জানতে চাই", prompt: "সরকারি যোজনা সম্পর্কে জানতে চাই" },
      { label: "📄 শংসাপত্র বা নথি তৈরি", prompt: "শংসাপত্র তৈরির সাহায্য দরকার" },
      { label: "🧵 কোনো কাজ বা সেলাই শিখতে চাই", prompt: "কাজ শিখতে চাই" },
      { label: "💼 জীবিকা বা কাজের সুযোগ", prompt: "কাজের সুযোগ সম্পর্কে তথ্য চাই" },
      { label: "💰 আর্থিক সাহায্য", prompt: "আর্থিক সাহায্য সম্পর্কে জানতে চাই" },
    ],
    voiceConfirm: {
      didYouSay: "আপনি কি এটাই বলেছেন?",
      confirmButton: "জনসখীকে জিজ্ঞাসা করুন ➔",
      retryButton: "আবার বলুন",
      editPlaceholder: "প্রশ্ন সংশোধন করতে এখানে স্পর্শ করুন...",
      cancelButton: "বাতিল করুন",
    },
    guideHeadings: {
      badge: "অফিসিয়াল নির্দেশিকা",
      whatItIs: "১. এই যোজনা কী?",
      whoIsEligible: "২. কারা যোগ্য?",
      documentsRequired: "৩. প্রয়োজনীয় নথি:",
      stepByStep: "৪. ধাপে ধাপে আবেদনের নিয়ম:",
      whereToApply: "৫. কোথায় আবেদন করবেন?",
      officialSource: "৬. অফিসিয়াল উৎস:",
      nextStep: "৭. আপনার পরবর্তী পদক্ষেপ:",
      applyHere: "অফিসিয়াল পোর্টালে যান",
    },
    demoScenariosTitle: "ডেমো দৃশ্যপট",
    demoBadge: "ডেমো",
    demoScenarios: [
      {
        id: 'demo-ujjwala',
        title: "উজ্জ্বলা বিনামূল্যে গ্যাস",
        description: "বিনামূল্যে সিলিন্ডার ও গ্যাস ওভেন",
        prompt: "বিনামূল্যে গ্যাস সংযোগ উজ্জ্বলা যোজনা সম্পর্কে জানান",
      },
      {
        id: 'demo-ration',
        title: "নতুন রেশন কার্ড",
        description: "খাদ্য সুরক্ষা ও পারিবারিক নথি",
        prompt: "নতুন রেশন কার্ড কীভাবে পাব?",
      },
      {
        id: 'demo-tailoring',
        title: "বিনামূল্যে সেলাই প্রশিক্ষণ",
        description: "সরকারি সার্টিফিকেট কোর্স",
        prompt: "বিনামূল্যে সেলাই প্রশিক্ষণ",
      },
      {
        id: 'demo-shg',
        title: "লাখপতি দিদি ও ঋণ",
        description: "স্বনির্ভর গোষ্ঠীর সহজ ঋণ",
        prompt: "স্বনির্ভর গোষ্ঠী ও লাখপতি দিদি যোজনা",
      },
    ],
    fontNormal: "স্বাভাবিক",
    fontLarge: "বড়",
    fontExtraLarge: "খুব বড়",
    errors: {
      generic: "বুঝতে পারিনি। অনুগ্রহ করে আবার চেষ্টা করুন বা লিখে প্রশ্ন করুন।",
      emptyInput: "দয়া করে মুখে বলুন বা লিখে প্রশ্ন করুন।",
      micDenied: "ভয়েস ইনপুটের জন্য মাইক্রোফোনের অনুমতি প্রয়োজন। অনুগ্রহ করে ব্রাউজার সেটিংসে অনুমতি দিন অথবা নিচে লিখে প্রশ্ন করুন।",
      noSpeech: "কোনো শব্দ শোনা যায়নি। মাইক্রোফোনে স্পর্শ করে আবার কথা বলুন।",
      network: "ভয়েস শনাক্তকরণ সাময়িকভাবে অনুপলব্ধ। অনুগ্রহ করে লিখে প্রশ্ন করুন।",
      notSupported: "এই ব্রাউজারে ভয়েস ইনপুট সমর্থিত নয়। অনুগ্রহ করে আপনার প্রশ্নটি লিখে জানান।",
    },
  },

  // ==========================================
  // MARATHI (मराठी)
  // ==========================================
  mr: {
    appName: "जनसखी AI",
    tagline: "तुमचा आवाज. तुमची भाषा. तुमचा अधिकार.",
    heroPrompt: "बोला किंवा लिहा. मी तुम्हाला टप्प्याटप्प्याने मार्गदर्शन करेन.",
    schemeTitle: "प्रधानमंत्री उज्ज्वला योजना (मोफत गॅस कनेक्शन)",
    tapToSpeak: "बोलण्यासाठी स्पर्श करा",
    listening: "ऐकत आहे... बोला...",
    processing: "उत्तर तयार करत आहे...",
    speaking: "जनसखी बोलत आहे...",
    typePlaceholder: "येथे प्रश्न विचारा...",
    sendButton: "पाठवा",
    voiceUnavailableNotice: "आवाज सुविधा उपलब्ध नाही. कृपया लिहून विचारा.",
    readAloud: "ऐका",
    stopAudio: "थांबवा",
    quickActionsTitle: "जलद मदत",
    quickActionHelpMeApply: "अर्ज करण्यास मदत करा",
    quickActionAmIEligible: "मी पात्र आहे का?",
    quickActionWhatDoINeed: "कोणती कागदपत्रे लागतील?",
    quickActionHowDoIApply: "अर्ज कसा करावा?",
    quickActionExplainSimply: "सोप्या भाषेत समजावून सांगा",
    officialSourceLabel: "अधिकृत सरकारी स्रोत",
    officialSourceButton: "अधिकृत संकेतस्थळाला भेट द्या (pmuy.gov.in)",
    tollFreeCall: "टोल-फ्री हेल्पलाइन: 1800-266-6696",
    disclaimer: "जनसखी AI हे केवळ मार्गदर्शक साधन आहे, अधिकृत संकेतस्थळ नाही.",
    trustSafetyNote: "जनसखी AI केवळ मार्गदर्शन करते. अधिकृत सरकारी संकेतस्थळावर खात्री करा.",
    guidedJourneyTitle: "उज्ज्वला २.० अर्ज मार्गदर्शिका",
    steps: {
      understand: "१. योजना समजून घ्या",
      check: "२. पात्रता तपासा",
      prepare: "३. कागदपत्रे तयार करा",
      apply: "४. अर्ज प्रक्रिया",
      nextStep: "५. पुढील पाऊल",
    },
    journeyControls: {
      next: "पुढील पाऊल ➔",
      back: "⬅ मागे",
      startAgain: "पुन्हा सुरू करा",
      finish: "पूर्ण झाले",
    },
    explainSimplyHeader: "कठीण सरकारी आदेश सोप्या भाषेत समजून घ्या",
    explainSimplySubtitle: "कठीण सरकारी नोटीस येथे टाका. आम्ही ४ सोप्या मुद्द्यांमध्ये समजावून सांगू.",
    explainSimplyPlaceholder: "सरकारी नोटीस येथे पेस्ट करा...",
    explainButton: "सोपे करा",
    sampleNoticeButton: "नमुना नोटीस",
    sampleNoticeText: "उज्ज्वला २.० अंतर्गत पात्र महिलांना मोफत गॅस कनेक्शन आणि शेगडी विनाशुल्क दिली जाईल.",
    sections: {
      meaning: "याचा अर्थ काय?",
      actions: "मला काय करावे लागेल?",
      documents: "कोणती कागदपत्रे लागतील?",
      nextStep: "माझे पुढील पाऊल काय असेल?",
    },
    homeCategoryTitle: "आवश्यक सरकारी सेवा — तुमच्या भाषेत",
    homeCategorySubtitle: "तुमची गरज निवडा किंवा थेट बोलून विचारा:",
    categories: {
      schemes: {
        title: "🏛 सरकारी योजना",
        subtitle: "मोफत गॅस (उज्ज्वला), घरकुल योजना, महिला कल्याण",
        samplePrompt: "मोफत गॅस कनेक्शन उज्ज्वला योजनेबद्दल सांगा",
      },
      documents: {
        title: "📄 कागदपत्रे व प्रमाणपत्रे",
        subtitle: "रेशन कार्ड, उत्पन्न प्रमाणपत्र, आधार सुधारणा",
        samplePrompt: "नवीन रेशन कार्ड कसे मिळवावे?",
      },
      education: {
        title: "🎓 शिक्षण व कौशल्य",
        subtitle: "मोफत शिलाई प्रशिक्षण, संगणक कौशल्य",
        samplePrompt: "मोफत शिलाई प्रशिक्षण",
      },
      jobs: {
        title: "💼 रोजगार व महिला बचत गट",
        subtitle: "लखपती दीदी, बचत गट, रोजगार हमी",
        samplePrompt: "महिला बचत गट आणि लखपती दीदी",
      },
      finance: {
        title: "💰 आर्थिक साहाय्य",
        subtitle: "झिरो बॅलन्स जन धन खाते, मुद्रा कर्ज, पेन्शन",
        samplePrompt: "जन धन बँक खाते कसे उघडावे?",
      },
      askJanSakhi: {
        title: "❓ जनसखीला विचारा",
        subtitle: "कोणताही प्रश्न आपल्या भाषेत बोलून किंवा लिहून विचारा",
        samplePrompt: "नमस्ते! महिलांसाठी कोणत्या मुख्य सरकारी योजना आहेत?",
      },
    },
    guidedPromptsHeading: "तुम्हाला कशासाठी मदत हवी आहे?",
    guidedPrompts: [
      { label: "🍳 सरकारी योजनेबद्दल माहिती हवी", prompt: "मला सरकारी योजनेबद्दल जाणून घ्यायचे आहे" },
      { label: "📄 प्रमाणपत्र मिळवण्यासाठी मदत", prompt: "प्रमाणपत्र मिळवण्यासाठी मदत हवी आहे" },
      { label: "🧵 कौशल्य किंवा काम शिकायचे आहे", prompt: "मला कौशल्य शिकायचे आहे" },
      { label: "💼 रोजगाराच्या संधींची माहिती", prompt: "रोजगाराची माहिती हवी आहे" },
      { label: "💰 आर्थिक साहाय्याची माहिती", prompt: "आर्थिक साहाय्याची माहिती हवी आहे" },
    ],
    voiceConfirm: {
      didYouSay: "तुम्ही हेच बोललात का?",
      confirmButton: "जनसखीला विचारा ➔",
      retryButton: "पुन्हा बोला",
      editPlaceholder: "प्रश्न बदलण्यासाठी येथे स्पर्श करा...",
      cancelButton: "रद्द करा",
    },
    guideHeadings: {
      badge: "अधिकृत मार्गदर्शिका",
      whatItIs: "१. ही योजना काय आहे?",
      whoIsEligible: "२. कोण पात्र आहे?",
      documentsRequired: "३. आवश्यक कागदपत्रे:",
      stepByStep: "४. टप्प्याटप्प्याने अर्ज प्रक्रिया:",
      whereToApply: "५. कुठे अर्ज करावा?",
      officialSource: "६. अधिकृत स्रोत:",
      nextStep: "७. तुमचे पुढील पाऊल:",
      applyHere: "अधिकृत पोर्टलवर जा",
    },
    demoScenariosTitle: "डेमो परिस्थिती",
    demoBadge: "डेमो",
    demoScenarios: [
      {
        id: 'demo-ujjwala',
        title: "उज्ज्वला मोफत गॅस",
        description: "विनाशुल्क सिलिंडर आणि शेगडी",
        prompt: "मोफत गॅस कनेक्शन उज्ज्वला योजनेबद्दल सांगा",
      },
      {
        id: 'demo-ration',
        title: "नवीन रेशन कार्ड",
        description: "अन्न सुरक्षा ओळखपत्र अर्ज",
        prompt: "नवीन रेशन कार्ड कसे मिळवावे?",
      },
      {
        id: 'demo-tailoring',
        title: "मोफत शिलाई प्रशिक्षण",
        description: "शासकीय प्रमाणपत्र अभ्यासक्रम",
        prompt: "मोफत शिलाई प्रशिक्षण",
      },
      {
        id: 'demo-shg',
        title: "महिला बचत गट व कर्ज",
        description: "कमी व्याजाचे व्यवसाय कर्ज",
        prompt: "महिला बचत गट आणि लखपती दीदी",
      },
    ],
    fontNormal: "सामान्य",
    fontLarge: "मोठे",
    fontExtraLarge: "खूप मोठे",
    errors: {
      generic: "समजले नाही. कृपया पुन्हा प्रयत्न करा किंवा खाली टाइप करा.",
      emptyInput: "कृपया बोला किंवा प्रश्न लिहा.",
      micDenied: "व्हॉइस इनपुटसाठी मायक्रोफोनची परवानगी आवश्यक आहे. कृपया ब्राउझर सेटिंग्जमध्ये परवानगी द्या किंवा खाली टाइप करा.",
      noSpeech: "काहीही ऐकू आले नाही. कृपया मायक्रोफोन दाबून पुन्हा बोला.",
      network: "व्हॉइस ओळख तात्पुरती अनुपलब्ध आहे. कृपया टाइप करा.",
      notSupported: "या ब्राउझरमध्ये व्हॉइस इनपुट समर्थित नाही. कृपया आपला प्रश्न टाइप करा.",
    },
  },
};
