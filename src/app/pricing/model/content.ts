export type Plan = {
  label: string;
  title: string;
  description: string;
  eyebrow: string;
  price: string;
  priceSuffix: string;
  requestPrice: string;
  features: string[];
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
      'Strategy & Setup: High-conversion conversational flows',
      'Dynamic Scripting: Real-time adaptive responses',
      'Campaign Hours: Flexible timezone scheduling',
      'Infrastructure: Your VoIP or Global Infrastructure',
      'Performance Tracking & analytics',
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
      'Action-oriented AI: bookings, tickets, queries',
      'CRM integration: Zendesk, Salesforce, and more',
      '24/7 resolution with zero wait time',
      'Omnichannel support: voice, chat, messaging',
      'Intelligent escalation to human agents',
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
