export const SOLUTIONS_FAQ_IDS = [
  'what-ai-agents',
  'managed-by-coldi',
  'custom-ai-agent',
  'inbound-agent',
  'route-without-ivr',
  'reactivate-leads',
  'increase-outbound-rates',
  'agent-vs-chatbot',
  'hand-over-to-human',
  'compliance-quality',
] as const;

export type SolutionsFaqId = (typeof SOLUTIONS_FAQ_IDS)[number];
