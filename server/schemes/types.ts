export interface SchemeDetail {
  id: string;
  name: string;
  nativeNames: Record<string, string>;
  ministry: string;
  officialPortalUrl: string;
  tollFreeHelpline: string;
  benefits: string[];
  eligibilityConditions: string[];
  requiredDocuments: string[];
  applicationSteps: string[];
  disclaimer: string;
  groundingFactsheet: string;
}
