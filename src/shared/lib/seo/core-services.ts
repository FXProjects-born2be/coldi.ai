import type { ServiceStructuredDataInput } from '@/shared/lib/seo/service';

/** Homepage / product-level Service schema for Coldi's managed voice offering. */
export const getCoreVoiceAgentService = (): ServiceStructuredDataInput => ({
  name: 'Managed AI Voice Agents',
  description:
    'Coldi builds, integrates and runs AI voice agents that handle inbound and outbound calls for lead qualification, follow-ups, customer support, appointment scheduling and other call-based workflows.',
  url: 'https://coldi.ai',
});
