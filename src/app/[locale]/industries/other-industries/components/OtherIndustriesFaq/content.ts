export const OTHER_INDUSTRIES_FAQ_IDS = [
  'outside-fintech',
  'replace-call-center',
  'alongside-call-center',
  'vs-contact-center-ai',
  'urgent-service',
  'gdpr-sales-calls',
] as const;

export type OtherIndustriesFaqId = (typeof OTHER_INDUSTRIES_FAQ_IDS)[number];
