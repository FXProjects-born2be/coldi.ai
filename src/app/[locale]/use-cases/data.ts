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
    id: 'multi-asset-broker',
    tab: 'Multi-Asset Broker',
    title: 'Multi-Asset Broker',
    href: '/evest',
    pain: 'Re-engaging a cold database of 11,840 leads across global markets caused low contact rates, manual dialer fatigue, and wasted time on automated voicemails.',
    solution:
      'Coldi deployed an outbound AI voice engine with 2.48 multi-dial cadences, precision answering machine filtering, and dynamic callback scheduling directly into account manager queues.',
    results: [
      { value: '29,377', label: 'calls placed' },
      { value: '88+ talk', label: 'hours logged' },
      { value: '96.4%', label: 'live human pickup efficiency' },
      { value: '672', label: 'qualified leads captured' },
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
    id: 'silverbell',
    tab: 'Business Process Outsourcing',
    title: 'Silverbell Group',
    href: '/silverbellgroup',
    pain: 'High inquiry volume across global time zones caused delayed responses, missed appointment opportunities, and staff fatigue outside standard operating hours.',
    solution:
      'Coldi integrated a 24/7 AI voice representative into Silverbell’s digital touchpoints to deliver expert responses, capture contact data, and schedule appointments around the clock.',
    results: [
      { value: '100+', label: 'Daily Automated Inquiries Managed' },
      { value: '75', suffix: 'Hours', label: 'hours saved weekly' },
      { value: '45%', label: 'Increase in Qualified Lead Conversions' },
      { value: '24/7', label: 'Continuous Global Coverage Achieved' },
    ],
  },
  {
    id: 'stone-electric',
    tab: 'Home & Residential Services',
    title: 'Stone Electric Company',
    href: '/stone-electric',
    pain: 'Missed calls during high-volume hours and after-hours emergencies resulted in lost high-value jobs and delayed technician dispatch',
    solution:
      'Coldi deployed an AI voice agent to handle 24/7 intake—instantly transferring emergency calls to live electricians and booking routine jobs directly into technician calendars.',
    results: [
      { value: '24/7', label: 'Dispatch' },
      { value: '0s', label: 'Emergency Delay' },
      { value: '100%', label: 'Booking Automated' },
      { value: '0m', label: 'Scheduling Overhead' },
    ],
  },
  {
    id: 'agro-industry',
    tab: 'Global Agro Industry',
    title: 'Global Agro Industry',
    href: '/agro-industry',
    pain: 'Senior sales managers wasted hours manually filtering unqualified inbound inquiries for complex multi-million dollar infrastructure projects.',
    solution:
      'Coldi deployed an autonomous AI voice concierge to manage technical discovery, extract structured project data, and schedule qualified prospects.',
    results: [
      { value: '100%', label: 'High-Probability Sales Focus' },
      { value: '0 Min', label: 'Manual Screening Overhead' },
      { value: '4 Metrics', label: 'Surgical CRM Data Extraction' },
      { value: '24/7', label: 'Multi-Time Zone Pipeline' },
    ],
  },
  {
    id: 'hvac-saas',
    tab: 'HVAC & SaaS',
    title: 'HVAC & SaaS',
    href: '/hvac-leads',
    pain: 'Dormant lead databases lose value rapidly, leaving past event lists and cold CRM contacts uncontacted due to manual dialing limits.',
    solution:
      'Coldi deployed an outbound AI engine to call cold lists, handle objections, qualify software stacks, and send instant SMS demo booking links.',
    results: [
      { value: '27', label: 'Total Leads Captured' },
      { value: '2 Steps', label: 'Structured Objection Handling' },
      { value: '100%', label: 'Automated Tech Stack Capture' },
      { value: '1 Click', label: 'Instant SMS Demo Delivery' },
    ],
  },
];

export const IMPLEMENTATIONS: ImplementationCase[] = [
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
