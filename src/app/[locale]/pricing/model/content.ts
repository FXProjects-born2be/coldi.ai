export type Plan = {
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  price: string;
  priceSuffix: string;
  requestPrice: string;
  features: { text: string; icon: string }[];
};

export type Service = {
  title: string;
  description: string;
  eyebrow: string;
  price: string;
};

export type ProcessStep = {
  number: string;
  title: string;
  description: string;
};

export const plans: Plan[] = [
  {
    label: 'Outbound Solutions',
    title: 'Outbound Calling Service',
    description:
      'Transform your outreach with proactive AI agents that execute campaigns on autopilot.',
    eyebrow: 'Starting from',
    price: '$0.40',
    priceSuffix: '/per minute',
    requestPrice: '$0.40/per minute',
    features: [
      {
        text: 'Strategy & Setup: High-conversion conversational flows',
        icon: '/icons/pricing/carbon_ai-agent-invocation.svg',
      },
      {
        text: 'Dynamic Scripting: Real-time adaptive responses',
        icon: '/icons/pricing/ix_code-ai.svg',
      },
      {
        text: 'Campaign Hours: Flexible timezone scheduling',
        icon: '/icons/pricing/mdi_clock-star-four-points-outline.svg',
      },
      {
        text: 'Infrastructure: Your VoIP or Global Infrastructure',
        icon: '/icons/pricing/boxicons_globe-alt.svg',
      },
      {
        text: 'Performance Tracking & analytics',
        icon: '/icons/pricing/ix_piechart-ai.svg',
      },
    ],
  },
  {
    label: 'Inbound & Customer Service',
    title: 'Inbound Calling Service',
    description:
      'Voice agents that understand intent and execute real business actions in real time.',
    eyebrow: 'Starting from',
    price: '$500',
    priceSuffix: '/per agent',
    requestPrice: '$500/per agent',
    features: [
      {
        text: 'Action-oriented AI: bookings, tickets, queries',
        icon: '/icons/pricing/hugeicons_ai-magic.svg',
      },
      {
        text: 'CRM integration: Zendesk, Salesforce, and more',
        icon: '/icons/pricing/hugeicons_ai-folder-01.svg',
      },
      {
        text: '24/7 resolution with zero wait time',
        icon: '/icons/pricing/reicon_twenty-four-hour-support.svg',
      },
      {
        text: 'Omnichannel support: voice, chat, messaging',
        icon: '/icons/pricing/mingcute_chat-4-ai-line.svg',
      },
      {
        text: 'Intelligent escalation to human agents',
        icon: '/icons/pricing/griddy-icons_ai-assistant.svg',
      },
    ],
  },
];

export const services: Service[] = [
  {
    title: 'Custom AI Development',
    description:
      'Full architecture design of a custom AI agent tailored to your specific business logic and brand voice.',
    eyebrow: 'Pricing',
    price: 'Custom Quote',
  },
  {
    title: 'Quality Control (QC) AI',
    description:
      'Automated auditing of 100% of interactions to ensure script compliance, brand safety, and data accuracy.',
    eyebrow: 'Pricing',
    price: 'Custom Quote',
  },
  {
    title: 'Global VoIP Infrastructure',
    description:
      'High-quality local numbering and telephony access in dozens of countries to ensure maximum deliverability.',
    eyebrow: 'Pricing',
    price: 'Based on Region/Volume',
  },
  {
    title: 'Managed Implementation',
    description:
      "Full deployment, testing, and continuous optimization. We handle the technical heavy lifting so you don't have to.",
    eyebrow: 'Pricing',
    price: 'Included in Managed Plans',
  },
];

export const processSteps: ProcessStep[] = [
  {
    number: '01',
    title: 'Infrastructure Integration',
    description:
      'Connect our AI with your existing VoIP provider or leverage our optimized high-deliverability network. We sync with your CRM to ensure the AI has the full context.',
  },
  {
    number: '02',
    title: 'Script & Workflow Design',
    description:
      'Our experts build your dynamic scripts and business logic. We define exactly how the agent handles every scenario to ensure professional and accurate interactions.',
  },
  {
    number: '03',
    title: 'Launch & Continuous Optimization',
    description:
      'Go live with 100% transparency. We monitor every interaction, providing you with detailed analytics and constant performance tuning to improve resolution rates.',
  },
];
