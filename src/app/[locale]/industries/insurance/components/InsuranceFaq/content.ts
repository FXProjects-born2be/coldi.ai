export const INSURANCE_FAQ_IDS = [
  'automate-for-brokers',
  'first-notice-of-loss',
  'will-ai-replace-agents',
  'renewals-and-quotes',
  'peak-claim-volume',
] as const;

export type InsuranceFaqId = (typeof INSURANCE_FAQ_IDS)[number];
