export type SupportedLanguage = 
  | 'te' // Telugu
  | 'hi' // Hindi
  | 'ta' // Tamil
  | 'kn' // Kannada
  | 'ml' // Malayalam
  | 'bn' // Bengali
  | 'mr' // Marathi
  | 'en'; // English

export interface LanguageConfig {
  code: SupportedLanguage;
  name: string;
  nativeName: string;
  speechLocale: string;
}

export type ServiceCategory = 
  | 'schemes'
  | 'documents'
  | 'education'
  | 'jobs'
  | 'finance'
  | 'askJanSakhi';

export interface FollowUpChoice {
  label: string;
  prompt: string;
  icon?: string;
}

export interface StructuredGuidance {
  serviceId: string;
  serviceName: string;
  category: ServiceCategory;
  whatItIs: string;
  whoIsEligible: string[];
  documentsRequired: string[];
  steps: string[];
  whereToApply: string;
  officialSource: {
    name: string;
    url: string;
    helpline?: string;
  };
  nextStep: string;
}

export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: number;
  readAloudText?: string;
  suggestedActions?: string[];
  isWarning?: boolean;
  structuredGuidance?: StructuredGuidance;
  followUpQuestion?: {
    question: string;
    choices: FollowUpChoice[];
  };
}

export interface ExplainSimplyResult {
  meaning: string;
  actions: string[];
  documents: string[];
  nextStep: string;
  disclaimer: string;
}

export interface EligibilityQuestion {
  id: string;
  question: string;
  explanation: string;
  requiredValue: boolean;
}

export interface SchemeMetadata {
  id: string;
  name: string;
  category: string;
  tagline: string;
  officialPortalUrl: string;
  tollFreeHelpline: string;
  benefits: string[];
  eligibilityPoints: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
}

export interface DemoScenario {
  id: string;
  category: ServiceCategory;
  title: Record<SupportedLanguage, string>;
  description: Record<SupportedLanguage, string>;
  prompt: Record<SupportedLanguage, string>;
}
