export const DIGITAL_BANKING_FAQ_IDS = [
  'digital-banks-payments',
  'unfinished-onboarding',
  'verify-identity',
  'b2b-cross-border',
] as const;

export type DigitalBankingFaqId = (typeof DIGITAL_BANKING_FAQ_IDS)[number];
