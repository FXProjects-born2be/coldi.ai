export const FAQ_SECTIONS = [
  {
    id: 'about-coldi',
    items: ['what-is-coldi', 'coldi-vs-developer-platforms', 'who-is-behind-coldi'],
  },
  {
    id: 'ai-agents-capabilities',
    items: ['what-is-campaign-brain', 'which-languages', 'ai-disclosure', 'replace-sales-team'],
  },
  {
    id: 'integrations-implementation',
    items: ['which-systems', 'how-long-to-launch'],
  },
  {
    id: 'pricing-plans',
    items: ['how-much-does-coldi-cost', 'managed-vs-self-service'],
  },
  {
    id: 'security-compliance',
    items: ['secure-and-compliant'],
  },
] as const;

export type FaqSectionId = (typeof FAQ_SECTIONS)[number]['id'];
