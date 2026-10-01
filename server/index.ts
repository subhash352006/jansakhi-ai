import express, { Request, Response } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';
import { inspectAndSanitizeInput } from './guardrails.js';
import { askJanSakhiAI, explainSimplyAI } from './gemini.js';
import { pmUjjwalaScheme } from './schemes/pm-ujjwala.js';
import { SERVICES_CATALOG } from './schemes/services-catalog.js';
import { SupportedLanguage } from '../shared/types.js';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const PORT = process.env.PORT || 8080;

app.use(cors());
app.use(express.json({ limit: '500kb' }));

// Security Headers Middleware
app.use((req, res, next) => {
  res.setHeader('X-Content-Type-Options', 'nosniff');
  res.setHeader('X-Frame-Options', 'DENY');
  res.setHeader('X-XSS-Protection', '1; mode=block');
  res.setHeader('Referrer-Policy', 'strict-origin-when-cross-origin');
  next();
});

// Health check endpoint for Cloud Run
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    service: 'JanSakhi AI',
    version: '1.0.0',
    timestamp: new Date().toISOString(),
  });
});

// Catalog of essential services
app.get('/api/services', (req: Request, res: Response) => {
  res.json({
    success: true,
    services: SERVICES_CATALOG.map((s) => ({
      id: s.id,
      category: s.category,
      officialName: s.officialName,
      officialUrl: s.officialUrl,
      helpline: s.helpline,
      names: s.names,
    })),
  });
});

// Modular scheme information endpoint
app.get('/api/scheme-info', (req: Request, res: Response) => {
  res.json({
    success: true,
    scheme: {
      id: pmUjjwalaScheme.id,
      name: pmUjjwalaScheme.name,
      nativeNames: pmUjjwalaScheme.nativeNames,
      ministry: pmUjjwalaScheme.ministry,
      officialPortalUrl: pmUjjwalaScheme.officialPortalUrl,
      tollFreeHelpline: pmUjjwalaScheme.tollFreeHelpline,
      benefits: pmUjjwalaScheme.benefits,
      eligibilityConditions: pmUjjwalaScheme.eligibilityConditions,
      requiredDocuments: pmUjjwalaScheme.requiredDocuments,
      applicationSteps: pmUjjwalaScheme.applicationSteps,
      disclaimer: pmUjjwalaScheme.disclaimer,
    },
  });
});

// Main Multilingual Chat Endpoint
app.post('/api/chat', async (req: Request, res: Response) => {
  try {
    const { message, language = 'te' } = req.body;
    const lang = (language as SupportedLanguage) || 'te';

    if (!message || typeof message !== 'string' || !message.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please speak or enter a question.',
      });
    }

    // Security & Guardrail Check (Aadhaar / OTP / Bank detection)
    const check = inspectAndSanitizeInput(message, lang);
    if (!check.isSafe && check.warningMessage) {
      return res.json({
        success: true,
        reply: check.warningMessage,
        readAloudText: check.warningMessage,
        isWarning: true,
        suggestedFollowUps: [
          'Am I eligible?',
          'What documents do I need?',
          'How do I apply at the gas agency?'
        ],
      });
    }

    const aiResponse = await askJanSakhiAI(check.sanitizedText, lang);
    return res.json({
      success: true,
      ...aiResponse,
    });
  } catch (err: any) {
    console.error('[JanSakhi AI API] Error in /api/chat:', err);
    return res.status(500).json({
      success: false,
      error: 'An unexpected error occurred. Please try again.',
    });
  }
});

// "Explain This Simply" Endpoint
app.post('/api/explain-simply', async (req: Request, res: Response) => {
  try {
    const { complexText, language = 'te' } = req.body;
    const lang = (language as SupportedLanguage) || 'te';

    if (!complexText || typeof complexText !== 'string' || !complexText.trim()) {
      return res.status(400).json({
        success: false,
        error: 'Please paste government notice text to simplify.',
      });
    }

    // Guardrail against pasting sensitive documents with Aadhaar numbers
    const check = inspectAndSanitizeInput(complexText, lang);
    const result = await explainSimplyAI(check.sanitizedText, lang);

    return res.json({
      success: true,
      ...result,
      hadRedactedPii: !check.isSafe,
    });
  } catch (err: any) {
    console.error('[JanSakhi AI API] Error in /api/explain-simply:', err);
    return res.status(500).json({
      success: false,
      error: 'Unable to simplify this text right now. Please try again.',
    });
  }
});

// Guided Journey: Safe Eligibility Check
app.post('/api/journey/check-eligibility', (req: Request, res: Response) => {
  const { isWoman18Plus, hasExistingLPG, isLowIncome, language = 'te' } = req.body;
  const lang = (language as SupportedLanguage) || 'te';

  const responsesByLang: Record<SupportedLanguage, {
    likely: string;
    hasLpg: string;
    notWoman: string;
    lowIncomeReq: string;
  }> = {
    en: {
      likely: "Based on the preliminary information you provided, you may meet the basic conditions for PM Ujjwala 2.0. Please confirm final eligibility through the official source.",
      hasLpg: "Under official PM Ujjwala rules, an applicant cannot have an existing LPG connection in the same household.",
      notWoman: "Under official PM Ujjwala rules, the connection is issued in the name of an adult woman (aged 18 years or older).",
      lowIncomeReq: "PM Ujjwala is intended for eligible low-income categories (such as SC, ST, PMAY Gramin, or poor households).",
    },
    hi: {
      likely: "आपके द्वारा दी गई जानकारी के अनुसार, आप उज्ज्वला 2.0 की बुनियादी शर्तें पूरी करती हैं। कृपया आधिकारिक स्रोत से अंतिम पात्रता की पुष्टि करें।",
      hasLpg: "उज्ज्वला नियमों के तहत, घर में पहले से किसी के पास गैस कनेक्शन नहीं होना चाहिए।",
      notWoman: "उज्ज्वला योजना के तहत कनेक्शन केवल 18 वर्ष या उससे अधिक उम्र की वयस्क महिला के नाम पर ही जारी होता है।",
      lowIncomeReq: "उज्ज्वला योजना पात्र गरीब परिवारों (जैसे एससी, एसटी, पीएम आवास योजना आदि) के लिए है।",
    },
    te: {
      likely: "మీరు అందించిన సమాచారం ప్రకారం, మీరు ఉజ్జ్వల 2.0 ప్రాథమిక నిబంధనలను పూర్తి చేయవచ్చు. దయచేసి అధికారిక గ్యాస్ ఏజెన్సీ లేదా వెబ్‌సైట్ ద్వారా ధృవీకరించుకోండి.",
      hasLpg: "ఉజ్జ్వల నిబంధనల ప్రకారం, ఇంట్లో ఎవరి పేరిటా ఇంతకుముందు గ్యాస్ కనెక్షన్ ఉండకూడదు.",
      notWoman: "ఉజ్జ్వల పథకం కేవలం 18 సంవత్సరాలు నిండిన మహిళల పేరిట మాత్రమే మంజూరు చేయబడుతుంది.",
      lowIncomeReq: "ఉజ్జ్వల పథకం అర్హులైన పేద కుటుంబాలకు (SC, ST, PMAY మొదలైనవి) ఉద్దేశించబడింది.",
    },
    ta: {
      likely: "நீங்கள் வழங்கிய தகவலின்படி, நீங்கள் உஜ்வாலா 2.0-க்கான அடிப்படை நிபந்தனைகளை பூர்த்தி செய்ய வாய்ப்புள்ளது. அதிகாரப்பூர்வ ஆதாரத்தின் மூலம் இறுதி தகுதியை உறுதிப்படுத்தவும்.",
      hasLpg: "உஜ்வாலா விதிகளின்படி, குடும்பத்தில் ஏற்கனவே எரிவாயு இணைப்பு இருக்கக்கூடாது.",
      notWoman: "உஜ்வாலா இணைப்பு 18 வயது நிரம்பிய பெண்களின் பெயரில் மட்டுமே வழங்கப்படும்.",
      lowIncomeReq: "உஜ்வாலா திட்டம் தகுதியான குறைந்த வருமானம் கொண்ட குடும்பங்களுக்கானது.",
    },
    kn: {
      likely: "ನೀವು ನೀಡಿದ ಮಾಹಿತಿಯ ಆಧಾರದ ಮೇಲೆ, ನೀವು ಉಜ್ವಲ 2.0 ಮೂಲಭೂತ ಷರತ್ತುಗಳನ್ನು ಪೂರೈಸಬಹುದು. ದಯವಿಟ್ಟು ಅಧಿಕೃತ ಮೂಲದಿಂದ ಅಂತಿಮ ಅರ್ಹತೆಯನ್ನು ಖಚಿತಪಡಿಸಿಕೊಳ್ಳಿ.",
      hasLpg: "ಉಜ್ವಲ ನಿಯಮಗಳ ಪ್ರಕಾರ, ಮನೆಯಲ್ಲಿ ಮೊದಲೇ ಗ್ಯಾಸ್ ಸಂಪರ್ಕ ಇರಬಾರದು.",
      notWoman: "ಉಜ್ವಲ ಸಂಪರ್ಕವನ್ನು 18 ವರ್ಷ ತುಂಬಿದ ಮಹಿಳೆಯ ಹೆಸರಿನಲ್ಲಿ ಮಾತ್ರ ನೀಡಲಾಗುತ್ತದೆ.",
      lowIncomeReq: "ಉಜ್ವಲ ಯೋಜನೆಯು ಅರ್ಹ ಬಡ ಕುಟುಂಬಗಳಿಗೆ ಮೀಸಲಾಗಿದೆ.",
    },
    ml: {
      likely: "നിങ്ങൾ നൽകിയ വിവരങ്ങൾ അടിസ്ഥാനമാക്കി, നിങ്ങൾ ഉജ്ജ്വല 2.0-ൻ്റെ അടിസ്ഥാന വ്യവസ്ഥകൾ പാലിച്ചേക്കാം. ഔദ്യോഗിക ഉറവിടത്തിലൂടെ അന്തിമ യോഗ്യത ഉറപ്പാക്കുക.",
      hasLpg: "ഉജ്ജ്വല നിയമങ്ങൾ അനുസരിച്ച്, വീട്ടിൽ നിലവിൽ ഗ്യാസ് കണക്ഷൻ ഉണ്ടാകാൻ പാടില്ല.",
      notWoman: "18 വയസ്സ് തികഞ്ഞ സ്ത്രീയുടെ പേരിൽ മാത്രമേ കണക്ഷൻ ലഭിക്കൂ.",
      lowIncomeReq: "അർഹതയുള്ള കുറഞ്ഞ വരുമാനമുള്ള കുടുംബങ്ങൾക്കാണ് ഈ പദ്ധതി.",
    },
    bn: {
      likely: "আপনার প্রদত্ত তথ্যের ভিত্তিতে, আপনি উজ্জ্বলা ২.০ যোজনার প্রাথমিক শর্তগুলি পূরণ করতে পারেন। অনুগ্রহ করে অফিসিয়াল উৎস থেকে চূড়ান্ত যোগ্যতা যাচাই করুন।",
      hasLpg: "উজ্জ্বলা নিয়ম অনুযায়ী, একই পরিবারে আগে থেকে কোনো গ্যাস সংযোগ থাকা চলবে না।",
      notWoman: "উজ্জ্বলা সংযোগ শুধুমাত্র ১৮ বছর বা তার বেশি বয়সী মহিলার নামে দেওয়া হয়।",
      lowIncomeReq: "উজ্জ্বলা যোজনা যোগ্য দরিদ্র পরিবারের জন্য নির্দিষ্ট।",
    },
    mr: {
      likely: "तुम्ही दिलेल्या माहितीच्या आधारे, तुम्ही उज्ज्वला २.० च्या मूलभूत अटी पूर्ण करू शकता. कृपया अधिकृत स्रोताद्वारे अंतिम पात्रतेची खात्री करा.",
      hasLpg: "उज्ज्वला नियमांनुसार, घरात आधीपासून कोणाच्याही नावावर गॅस कनेक्शन नसावे.",
      notWoman: "उज्ज्वला कनेक्शन केवळ १८ वर्षे किंवा त्याहून अधिक वयाच्या महिलेच्या नावावर दिले जाते.",
      lowIncomeReq: "उज्ज्वला योजना पात्र कमी उत्पन्न असलेल्या कुटुंबांसाठी आहे.",
    },
  };

  const texts = responsesByLang[lang] || responsesByLang.en;

  if (hasExistingLPG) {
    return res.json({
      success: true,
      eligible: false,
      message: texts.hasLpg,
      statusBadge: 'not_eligible',
    });
  }

  if (isWoman18Plus === false) {
    return res.json({
      success: true,
      eligible: false,
      message: texts.notWoman,
      statusBadge: 'not_eligible',
    });
  }

  if (isLowIncome === false) {
    return res.json({
      success: true,
      eligible: false,
      message: texts.lowIncomeReq,
      statusBadge: 'not_eligible',
    });
  }

  return res.json({
    success: true,
    eligible: true,
    message: texts.likely,
    statusBadge: 'likely_eligible',
  });
});

// Production client static assets serving
const possibleDistPaths = [
  path.resolve(__dirname, '..'), // When running dist/server/index.js -> dist
  path.resolve(__dirname, '../client'), // dist/client
  path.resolve(__dirname, '../dist/client'),
  path.resolve(__dirname, '../../dist'),
];
const clientDistPath = possibleDistPaths.find((p) => fs.existsSync(path.join(p, 'index.html'))) || path.resolve(__dirname, '..');
app.use(express.static(clientDistPath));

app.get('*', (req: Request, res: Response) => {
  // If API route not found, return 404 JSON
  if (req.path.startsWith('/api/')) {
    return res.status(404).json({ error: 'API route not found' });
  }
  // Otherwise serve index.html for client-side routing if available
  res.sendFile(path.join(clientDistPath, 'index.html'), (err) => {
    if (err) {
      res.status(200).send(`
        <!DOCTYPE html>
        <html>
          <head><title>JanSakhi AI API Server</title></head>
          <body style="font-family: sans-serif; padding: 2rem; text-align: center;">
            <h1>JanSakhi AI Server Running</h1>
            <p>Port: ${PORT}</p>
            <p>API Endpoint: <a href="/api/health">/api/health</a></p>
          </body>
        </html>
      `);
    }
  });
});

if (!process.env.VERCEL) {
  app.listen(PORT, () => {
    console.log(`[JanSakhi AI] Server listening on port ${PORT}`);
  });
}

export default app;
export { app };
