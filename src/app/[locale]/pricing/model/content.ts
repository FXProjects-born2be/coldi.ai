export type Plan =
  | {
      id: 'outbound';
      price: string;
      features: {
        id:
          | 'strategy-setup'
          | 'dynamic-scripting'
          | 'campaign-hours'
          | 'infrastructure'
          | 'performance-tracking';
        icon: string;
      }[];
    }
  | {
      id: 'inbound';
      price: string;
      features: {
        id:
          | 'action-oriented'
          | 'crm-integration'
          | 'resolution-24-7'
          | 'omnichannel'
          | 'intelligent-escalation';
        icon: string;
      }[];
    };

export type Service = {
  id: 'custom-ai' | 'quality-control' | 'voip' | 'implementation';
  hoverBg: string;
};

export type ProcessStep = {
  id: 'infrastructure' | 'script' | 'launch';
  number: string;
};

export const plans: Plan[] = [
  {
    id: 'outbound',
    price: '$0.40',
    features: [
      { id: 'strategy-setup', icon: '/icons/pricing/carbon_ai-agent-invocation.svg' },
      { id: 'dynamic-scripting', icon: '/icons/pricing/ix_code-ai.svg' },
      { id: 'campaign-hours', icon: '/icons/pricing/mdi_clock-star-four-points-outline.svg' },
      { id: 'infrastructure', icon: '/icons/pricing/boxicons_globe-alt.svg' },
      { id: 'performance-tracking', icon: '/icons/pricing/ix_piechart-ai.svg' },
    ],
  },
  {
    id: 'inbound',
    price: '$500',
    features: [
      { id: 'action-oriented', icon: '/icons/pricing/hugeicons_ai-magic.svg' },
      { id: 'crm-integration', icon: '/icons/pricing/hugeicons_ai-folder-01.svg' },
      { id: 'resolution-24-7', icon: '/icons/pricing/reicon_twenty-four-hour-support.svg' },
      { id: 'omnichannel', icon: '/icons/pricing/mingcute_chat-4-ai-line.svg' },
      { id: 'intelligent-escalation', icon: '/icons/pricing/griddy-icons_ai-assistant.svg' },
    ],
  },
];

export const services: Service[] = [
  { id: 'custom-ai', hoverBg: '/images/pricing/services-one-hover-bg.png' },
  { id: 'quality-control', hoverBg: '/images/pricing/services-two-hover-bg.png' },
  { id: 'voip', hoverBg: '/images/pricing/services-three-hover-bg.png' },
  { id: 'implementation', hoverBg: '/images/pricing/services-four-hover-bg.png' },
];

export const processSteps: ProcessStep[] = [
  { id: 'infrastructure', number: '01' },
  { id: 'script', number: '02' },
  { id: 'launch', number: '03' },
];
