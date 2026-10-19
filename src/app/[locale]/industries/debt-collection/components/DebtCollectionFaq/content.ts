export const DEBT_COLLECTION_FAQ_IDS = [
  'collection-call',
  'collection-regulations',
  'transfer-to-human',
  'pay-during-call',
  'voice-vs-sms-chat',
  'collection-software',
] as const;

export type DebtCollectionFaqId = (typeof DEBT_COLLECTION_FAQ_IDS)[number];
