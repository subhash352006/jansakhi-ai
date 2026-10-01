import { LanguageConfig, SupportedLanguage } from '../../../shared/types';

export const SUPPORTED_LANGUAGES: LanguageConfig[] = [
  { code: 'te', name: 'Telugu', nativeName: 'తెలుగు', speechLocale: 'te-IN' },
  { code: 'hi', name: 'Hindi', nativeName: 'हिन्दी', speechLocale: 'hi-IN' },
  { code: 'ta', name: 'Tamil', nativeName: 'தமிழ்', speechLocale: 'ta-IN' },
  { code: 'kn', name: 'Kannada', nativeName: 'ಕನ್ನಡ', speechLocale: 'kn-IN' },
  { code: 'ml', name: 'Malayalam', nativeName: 'മലയാളം', speechLocale: 'ml-IN' },
  { code: 'bn', name: 'Bengali', nativeName: 'বাংলা', speechLocale: 'bn-IN' },
  { code: 'mr', name: 'Marathi', nativeName: 'मराठी', speechLocale: 'mr-IN' },
  { code: 'en', name: 'English', nativeName: 'English', speechLocale: 'en-IN' },
];

export const DEFAULT_LANGUAGE: SupportedLanguage = 'te';
