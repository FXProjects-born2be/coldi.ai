export type ResultMetric = {
  value: string;
  suffix?: string;
  label: string;
};

export type FeaturedCase = {
  id: string;
  tab: string;
  title: string;
  href: string;
  pain: string;
  solution: string;
  results: ResultMetric[];
};

export type ImplementationCase = {
  id: string;
  tab: string;
  title: string;
  description: string;
  href: string;
  handles: { icon: string; label: string }[];
  workflow: string[];
  integration: {
    name: string;
    icon: string;
  };
};

export type WorkflowCard = {
  id: string;
  title: string;
  description: string;
  icon: string;
};

export const FEATURED_CASES: FeaturedCase[] = [
  {
    id: 'silverbell',
    tab: 'Silverbell Group',
    title: '24/7 AI Support for Global Clients',
    href: '/silverbellgroup',
    pain: 'Silverbell Group needed a digital extension of its professional team that could support clients around the clock without compromising the quality of the customer experience.',
    solution:
      "A 24/7 AI representative integrated directly into the company's online representative experience, extending the team's availability across time zones, nights, weekends, and holidays.",
    results: [
      { value: '24/7', label: 'Customer Support' },
      { value: 'Expert', label: 'Information Delivery' },
      { value: 'Capture', label: 'Contact Data' },
      { value: 'Book', label: 'Appointment Setting' },
    ],
  },
  {
    id: 'payment-solutions',
    tab: 'Payment Solutions Provider',
    title: 'Payment Solutions Provider',
    href: '/clarity-global',
    pain: 'Manual 6-month compliance reviews across hundreds of clients created spreadsheet overload and slow status-change escalations.',
    solution:
      'Coldi automated the entire review cycle with an outbound compliance agent and a 24/7 inbound AI phone line.',
    results: [
      { value: '100%', label: 'Review Cycle Automation' },
      { value: '0', suffix: 'Sec', label: 'Escalation Lag' },
      { value: '10+', suffix: 'Hours', label: 'Saved Monthly' },
      { value: '24/7', label: 'Inbound Coverage' },
    ],
  },
  {
    id: 'stone-electric',
    tab: 'Stone Electric Company',
    title: 'AI Voice Dispatch for Residential Services',
    href: '/residential-service-automation',
    pain: 'Electrical service companies cannot afford to miss emergency calls or lose qualified jobs because nobody is available to answer the phone.',
    solution:
      "George acts as a 24/7 front-line dispatcher, routing emergencies to electricians while booking qualified service requests directly into the company's calendar.",
    results: [
      { value: '24/7', label: 'Front-Line Dispatch' },
      { value: 'Auto', label: 'Emergency Routing' },
      { value: 'Booked', label: 'Service Appointments' },
      { value: 'SMS', label: 'Confirmations' },
    ],
  },
  {
    id: 'agro-industry',
    tab: 'Global Agro-Industry',
    title: 'AI Lead Qualification for Complex Industrial Sales',
    href: '/industries',
    pain: 'Large agricultural infrastructure projects require serious qualification before senior sales teams spend time on them. Sara handles that first layer of discovery automatically.',
    solution:
      'Senior sales managers receive qualified opportunities with the project information, contact details, and next step already defined.',
    results: [
      { value: 'Auto', label: 'Project Discovery' },
      { value: 'Scored', label: 'Lead Qualification' },
      { value: 'Ready', label: 'Sales Handoff' },
      { value: 'Defined', label: 'Next Step' },
    ],
  },
  {
    id: 'hvac-saas',
    tab: 'HVAC & SaaS',
    title: 'Re-Engaging High-Volume Lead Databases',
    href: '/hvac-leads',
    pain: 'Old leads lose value quickly. Coldi turns dormant databases into active conversations by contacting leads at scale, qualifying their current needs, and moving interested prospects directly toward a demo.',
    solution:
      'A 24/7 outbound engine that works through large lead lists, identifies qualified opportunities, and automatically moves interested prospects into the sales pipeline.',
    results: [
      { value: '24/7', label: 'Outbound Engine' },
      { value: 'Scale', label: 'Lead Reactivation' },
      { value: 'Demo', label: 'Scheduling' },
      { value: 'CRM', label: 'Pipeline Ready' },
    ],
  },
];

export const IMPLEMENTATIONS: ImplementationCase[] = [
  {
    id: 'multi-asset-broker',
    tab: 'Multi-Asset Broker',
    title: 'Automated Lead Outreach & Callback Qualification',
    description:
      'The client needed a simple way to turn an existing lead database into live conversations without requiring its team to manually call every lead.',
    href: '/helios',
    handles: [
      { icon: '/images/use-cases-hub/handle-outbound.png', label: 'Outbound lead calling' },
      { icon: '/images/use-cases-hub/handle-interest.png', label: 'Interest qualification' },
      { icon: '/images/use-cases-hub/handle-callback.png', label: 'Callback agreement' },
      { icon: '/images/use-cases-hub/handle-summaries.png', label: 'Call summaries' },
      { icon: '/images/use-cases-hub/handle-handoff.png', label: 'Lead handoff' },
    ],
    workflow: [
      'Lead database',
      'AI outbound call',
      'Interest detection',
      'Callback agreement',
      'Lead summary',
      'Human sales team',
    ],
    integration: {
      name: 'Google Sheets',
      icon: '/images/use-cases-hub/google-sheets.png',
    },
  },
  {
    id: 'multi-currency',
    tab: 'Multi-Currency Payment Platform',
    title: 'AI Outbound Calling & Callback Scheduling',
    description:
      'The client wanted to automate outbound lead calling while making it possible for interested prospects to book a callback with a specialist.',
    href: '/clarity-global',
    handles: [
      { icon: '/images/use-cases-hub/handle-outbound.png', label: 'Outbound lead calling' },
      { icon: '/images/use-cases-hub/handle-interest.png', label: 'Lead qualification' },
      { icon: '/images/use-cases-hub/handle-callback.png', label: 'Callback conversion' },
      {
        icon: '/icons/fluent_calendar-phone-16-regular.svg',
        label: 'Real-time availability checks',
      },
      { icon: '/icons/hugeicons_appointment-02.svg', label: 'Appointment booking' },
    ],
    workflow: [
      'API lead delivery',
      'AI call',
      'Interest qualification',
      'Specialist availability',
      'Calendar booking',
      'Human callback',
    ],
    integration: {
      name: 'API · Calendly · VoIP · CRM',
      icon: '/icons/carbon_integration.svg',
    },
  },
  {
    id: 'portfolioiq',
    tab: 'AI-powered fintech platform',
    title: 'Lead Re-engagement with Automated Follow-Up',
    description:
      'PortfolioIQ needed to turn outbound calls into a complete follow-up process, giving interested leads both a direct path to a specialist and additional information by SMS.',
    href: '/clarity-global',
    handles: [
      { icon: '/images/use-cases-hub/handle-outbound.png', label: 'Outbound lead calling' },
      { icon: '/images/use-cases-hub/handle-interest.png', label: 'Interest qualification' },
      { icon: '/images/use-cases-hub/handle-callback.png', label: 'Callback conversion' },
      { icon: '/icons/ri_chat-follow-up-line.svg', label: 'SMS follow-up' },
      { icon: '/images/use-cases-hub/handle-handoff.png', label: 'Lead data capture' },
    ],
    workflow: [
      'Lead database',
      'AI call',
      'Interest detection',
      'Callback agreement',
      'SMS follow-up',
      'Lead handoff',
    ],
    integration: {
      name: 'Google Sheets · SMS · Local Brazilian number',
      icon: '/images/use-cases-hub/google-sheets.png',
    },
  },
  {
    id: 'digital-ads',
    tab: 'Digital Advertising Agency',
    title: 'AI Calling with Real-Time Human Handoff',
    description:
      'The client needed a seamless calling workflow that could determine when a live team was available and automatically handle the next step when they were not.',
    href: '/hvac-leads',
    handles: [
      { icon: '/images/use-cases-hub/handle-outbound.png', label: 'Outbound lead calling' },
      {
        icon: '/icons/griddy-icons_customer-support.svg',
        label: 'Call-center availability checks',
      },
      { icon: '/images/use-cases-hub/handle-handoff.png', label: 'Live agent transfers' },
      { icon: '/icons/hugeicons_appointment-02.svg', label: 'Callback scheduling' },
      { icon: '/images/use-cases-hub/handle-interest.png', label: 'Inbound lead identification' },
      { icon: '/icons/bx_data.svg', label: 'Lead data retrieval' },
    ],
    workflow: [
      'Hot lead',
      'AI call',
      'Call-center status check',
      'Live transfer or scheduling',
      'Lead identification',
      'Booking',
    ],
    integration: {
      name: 'Calendly · Custom API',
      icon: '/icons/carbon_integration.svg',
    },
  },
];

export const WORKFLOWS: WorkflowCard[] = [
  {
    id: 'qualify',
    title: 'Qualify',
    description: 'Identify serious opportunities before they reach your sales team.',
    icon: '/icons/fluent_call-inbound-16-regular.svg',
  },
  {
    id: 'follow-up',
    title: 'Follow Up',
    description: 'Reconnect with leads and customers without relying on manual outreach.',
    icon: '/icons/ri_chat-follow-up-line.svg',
  },
  {
    id: 'support',
    title: 'Support',
    description: 'Handle routine questions and provide 24/7 first-line assistance.',
    icon: '/icons/fluent_person-support-16-regular.svg',
  },
  {
    id: 'schedule',
    title: 'Schedule',
    description: 'Turn conversations into booked appointments without back-and-forth.',
    icon: '/icons/hugeicons_appointment-02.svg',
  },
  {
    id: 'dispatch',
    title: 'Dispatch',
    description: 'Identify urgent requests and route them to the right specialist.',
    icon: '/icons/carbon_send.svg',
  },
  {
    id: 'comply',
    title: 'Comply',
    description:
      'Run recurring compliance outreach, classify responses, and escalate exceptions automatically.',
    icon: '/icons/cil_balance-scale.svg',
  },
];
