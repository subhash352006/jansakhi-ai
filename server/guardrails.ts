import { SupportedLanguage } from '../shared/types.js';

interface SafetyCheckResult {
  isSafe: boolean;
  warningMessage?: string;
  sanitizedText: string;
}

const PII_WARNINGS: Record<SupportedLanguage, string> = {
  en: 'Security Alert: For your protection, never share your Aadhaar number, OTP, bank account number, or passwords. JanSakhi AI will never ask for sensitive personal details.',
  hi: 'सुरक्षा सूचना: अपनी सुरक्षा के लिए, कृपया कभी भी अपना आधार नंबर, ओटीपी, बैंक खाता नंबर या पासवर्ड साझा न करें। जनसखी एआई कभी भी आपसे संवेदनशील जानकारी नहीं मांगेगी।',
  te: 'భద్రతా హెచ్చరిక: మీ భద్రత కొరకు, దయచేసి మీ ఆధార్ సంఖ్య, ఓటీపీ (OTP), బ్యాంక్ ఖాతా వివరాలు లేదా పాస్‌వర్డ్‌లను ఎప్పుడూ చెప్పకండి. జనసఖి AI వీటిని ఎప్పటికీ అడగదు.',
  ta: 'பாதுகாப்பு எச்சரிக்கை: உங்கள் பாதுகாப்பிற்காக, உங்கள் ஆதார் எண், OTP, வங்கி கணக்கு எண் அல்லது கடவுச்சொற்களை ஒருபோதும் பகிர வேண்டாம். ஜன்சகி AI இவற்றை ஒருபோதும் கேட்காது.',
  kn: 'ಸುರಕ್ಷತಾ ಎಚ್ಚರಿಕೆ: ನಿಮ್ಮ ಸುರಕ್ಷತೆಗಾಗಿ, ನಿಮ್ಮ ಆಧಾರ್ ಸಂಖ್ಯೆ, ಒಟಿಪಿ (OTP), ಬ್ಯಾಂಕ್ ಖಾತೆ ವಿವರ ಅಥವಾ ಪಾಸ್‌ವರ್ಡ್‌ಗಳನ್ನು ಎಂದಿಗೂ ಹಂಚಿಕೊಳ್ಳಬೇಡಿ. ಜನಸಖಿ AI ಇದನ್ನು ಎಂದಿಗೂ ಕೇಳುವುದಿಲ್ಲ.',
  ml: 'സുരക്ഷാ മുന്നറിയിപ്പ്: നിങ്ങളുടെ സുരക്ഷയ്ക്കായി, ആധാർ നമ്പർ, ഒടിപി, ബാങ്ക് അക്കൗണ്ട് നമ്പർ അല്ലെങ്കിൽ പാസ്‌വേഡ് എന്നിവ ഒരിക്കലും പങ്കിടരുത്. ജൻസഖി AI ഒരിക്കലും ഇവ ആവശ്യപ്പെടില്ല.',
  bn: 'নিরাপত্তা সতর্কতা: আপনার সুরক্ষার জন্য, কখনও আপনার আধার নম্বর, ওটিপি, ব্যাংক অ্যাকাউন্ট নম্বর বা পাসওয়ার্ড শেয়ার করবেন না। জনসখী এআই কখনই এই তথ্য চাইবে না।',
  mr: 'सुरक्षा सूचना: तुमच्या सुरक्षिततेसाठी, कृपया तुमचा आधार क्रमांक, ओटीपी, बँक खाते तपशील किंवा पासवर्ड कधीही शेअर करू नका. जनसखी AI ही माहिती कधीही विचारणार नाही.',
};

// Regex patterns for sensitive Indian PII & Financial Identifiers
const AADHAAR_REGEX = /\b[2-9]{1}[0-9]{3}[\s-]?[0-9]{4}[\s-]?[0-9]{4}\b/g;
const OTP_REGEX = /\b(otp|one[\s-]?time[\s-]?password|pin|code)[\s:]*([0-9]{4,8})\b/gi;
const BANK_ACCT_REGEX = /\b(account|ac|a\/c|bank)[\s#:]*([0-9]{9,18})\b/gi;
const CARD_REGEX = /\b(?:4[0-9]{12}(?:[0-9]{3})?|5[1-5][0-9]{14}|6(?:011|5[0-9][0-9])[0-9]{12})\b/g;
const PAN_REGEX = /\b[A-Z]{5}[0-9]{4}[A-Z]{1}\b/gi;

// Mitigate potential prompt injections attempting to bypass government grounding
const INJECTION_REGEX = /\b(ignore\s+(all\s+)?(previous|prior)\s+instructions|system\s+prompt|disregard\s+rules|you\s+are\s+now\s+an\s+unrestricted)\b/gi;

export function inspectAndSanitizeInput(text: string, language: SupportedLanguage): SafetyCheckResult {
  if (!text || typeof text !== 'string') {
    return { isSafe: true, sanitizedText: '' };
  }

  // Hard limit input length to prevent denial-of-service / token stuffing
  const boundedText = text.slice(0, 2000).trim();

  const hasAadhaar = AADHAAR_REGEX.test(boundedText);
  const hasOtp = OTP_REGEX.test(boundedText);
  const hasBankAcct = BANK_ACCT_REGEX.test(boundedText);
  const hasCard = CARD_REGEX.test(boundedText);
  const hasPan = PAN_REGEX.test(boundedText);
  const hasInjection = INJECTION_REGEX.test(boundedText);

  if (hasAadhaar || hasOtp || hasBankAcct || hasCard || hasPan) {
    const warning = PII_WARNINGS[language] || PII_WARNINGS.en;
    const sanitized = boundedText
      .replace(AADHAAR_REGEX, '[REDACTED_AADHAAR]')
      .replace(OTP_REGEX, '[REDACTED_OTP]')
      .replace(BANK_ACCT_REGEX, '[REDACTED_BANK_INFO]')
      .replace(CARD_REGEX, '[REDACTED_CARD]')
      .replace(PAN_REGEX, '[REDACTED_PAN]');

    return {
      isSafe: false,
      warningMessage: warning,
      sanitizedText: sanitized,
    };
  }

  // If prompt injection attempt detected, sanitize it silently
  let safeCleaned = boundedText;
  if (hasInjection) {
    safeCleaned = boundedText.replace(INJECTION_REGEX, '[FILTERED_PHRASE]');
  }

  return {
    isSafe: true,
    sanitizedText: safeCleaned,
  };
}

