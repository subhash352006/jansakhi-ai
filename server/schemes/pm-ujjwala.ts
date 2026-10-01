import { SchemeDetail } from './types.js';

export const pmUjjwalaScheme: SchemeDetail = {
  id: 'pm-ujjwala',
  name: 'Pradhan Mantri Ujjwala Yojana (PMUY / Ujjwala 2.0)',
  nativeNames: {
    en: 'Pradhan Mantri Ujjwala Yojana',
    hi: 'प्रधानमंत्री उज्ज्वला योजना',
    te: 'ప్రధాన మంత్రి ఉజ్జ్వల యోజన',
    ta: 'பிரதான் மந்திரி உஜ்வாலா யோஜனா',
    kn: 'ಪ್ರಧಾನ ಮಂತ್ರಿ ಉಜ್ವಲ ಯೋಜನೆ',
    ml: 'പ്രധാൻ മന്ത്രി ഉജ്ജ്വല യോജന',
    bn: 'প্রধানমন্ত্রী উজ্জ্বলা যোজনা',
    mr: 'प्रधानमंत्री उज्ज्वला योजना',
  },
  ministry: 'Ministry of Petroleum & Natural Gas (MoPNG), Government of India',
  officialPortalUrl: 'https://www.pmuy.gov.in/',
  tollFreeHelpline: '1800-266-6696',
  benefits: [
    'Deposit-free LPG cylinder connection provided in the name of an adult woman of the household.',
    'First LPG refill cylinder provided free of cost.',
    'Free gas stove (hotplate) provided with the initial connection.',
    'No upfront charges or security deposit required from eligible beneficiaries.',
  ],
  eligibilityConditions: [
    'The applicant must be an adult woman aged 18 years or older.',
    'There must NOT be any existing LPG connection in the same household from any Oil Marketing Company (Indane, Bharatgas, or HP Gas).',
    'The applicant must belong to an eligible category: SC, ST, PMAY (Gramin), Antyodaya Anna Yojana (AAY), Most Backward Classes (MBC), Forest Dwellers, Resident of Island/River Island, Tea and Ex-Tea Garden tribes, or Poor Household under the 14-Point Declaration.',
  ],
  requiredDocuments: [
    'Know Your Customer (KYC) form with self-declaration.',
    'Ration Card issued by State Govt / document certifying family composition.',
    'Aadhaar or Electoral Photo ID / Voter ID of applicant as Proof of Identity & Address.',
    'Bank Account details (Bank Passbook copy with IFSC) of the woman applicant for subsidy credits.',
    'Recent passport-size photograph of the applicant.',
  ],
  applicationSteps: [
    'Step 1: Check basic conditions (woman 18+ years, no LPG connection in household, low-income category).',
    'Step 2: Gather basic documents (Identity proof, Address/Ration card, Bank passbook copy, 1 photo).',
    'Step 3: Visit your nearest authorized LPG distributor (Indane, Bharatgas, or HP Gas) or Common Service Centre (CSC). You can also apply online at pmuy.gov.in.',
    'Step 4: Submit the paper application form (Form 1) with document photocopies. No fee or bribe is required.',
    'Step 5: The LPG distributor verifies the documents and installs the gas cylinder and stove at your home.',
  ],
  disclaimer: 'JanSakhi AI is an independent AI guidance tool, not an official government website. Please verify current eligibility, requirements and application details through the official government source (pmuy.gov.in) or call 1800-266-6696.',
  groundingFactsheet: `
FACTSHEET FOR GROUNDING:
- Scheme Name: Pradhan Mantri Ujjwala Yojana (PM Ujjwala 2.0).
- Launching Ministry: Ministry of Petroleum & Natural Gas, Government of India.
- Purpose: Clean cooking fuel access for women from economically vulnerable households, protecting them from smoke health hazards.
- Beneficiary: Adult woman (18+) of an eligible household. Connection is strictly in her name.
- Core Rule 1: No other LPG connection exists in the same household.
- Core Rule 2: Free deposit-free cylinder + free first refill + free stove.
- Core Rule 3: Application can be made at any LPG distributor (Indane, HP, Bharatgas) or official website pmuy.gov.in.
- Security & Integrity: NEVER ask for Aadhaar number, OTP, bank passwords, or debit cards. JanSakhi does NOT submit applications directly. Direct users to distributor or official portal.
- Helpline: 1800-266-6696 (Toll-Free) or 1906 (Emergency LPG leak).
`,
};
