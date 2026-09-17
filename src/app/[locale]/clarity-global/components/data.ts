import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/silverbellgroup/components/data';

export const heroContent: HeroContent = {
  titleLine1: 'Zero Response Lag, 100% Audit Readiness:',
  titleLine2: 'How Clarity Global Automated B2B Compliance & Inbound Support',
  subtitle:
    'How a Canadian fintech deployed autonomous outbound review workflows and a 24/7 inbound voice agent to eliminate manual follow-ups across hundreds of B2B client reviews.',
  images: {
    bgImage: {
      src: '/images/silverbellgroup/clarity-global-bg.png',
    },
    image: {
      src: '/images/silverbellgroup/clarity-global.svg',
      width: 126,
      height: 122,
    },
  },
  reportingRange: 'THE CLIENT',
  paragraphs: [
    'Clarity Global is a Canadian fintech providing advanced payment infrastructure to global B2B clients. Operating under strict regulatory obligations, mandatory periodic compliance reviews are a core operational requirement.',
  ],
};

export const tocItems = [
  {
    id: 'problem',
    title: 'Problem',
    description: 'Calls slipping through after hours',
  },
  {
    id: 'engagement-snapshot',
    title: 'Engagement Snapshot',
    description: 'The client, scope, and setup',
  },
  {
    id: 'integrated',
    title: 'What Coldi Built',
    description: 'The agent, integrations, and workflows',
  },
  {
    id: 'implementation',
    title: 'How The Implementation Went',
    description: 'A phased rollout to go-live',
  },
  {
    id: 'issues',
    title: 'What The Client Asked For Along The Way',
    description: 'Requests that reshaped the build',
  },
  {
    id: 'monitoring',
    title: 'How Coldi Runs The Account',
    description: 'Monitored, tuned, and audit-ready',
  },
  {
    id: 'went-wrong',
    title: 'What Went Wrong, and How Fast It Was Fixed',
    description: 'Edge cases, caught and closed',
  },
  {
    id: 'results',
    title: 'Results & What The Numbers Mean',
    description: 'The impact since launch',
  },
];

export const problemContent: ProblemContent = {
  title: 'The Problem',
  items: [
    {
      title: 'Manual & Unsegmented Outreach',
      text: 'Reaching out to hundreds of clients every six months was conducted manually with zero segmentation between corporate and individual accounts.',
    },
    {
      title: 'Unstructured Follow-Ups & Scaling Bottlenecks',
      text: 'No automated reminder cadence existed; follow-ups relied on spreadsheets and team memory, causing missed reminders as client volume grew.',
    },
    {
      title: 'Slow Response Classification',
      text: 'Client responses were categorized by hand, introducing operational lag.',
    },
    {
      title: 'Compliance Escalation Risks',
      text: 'Notifications to the compliance team were triggered manually, risking severe delays on high-priority "changes reported" cases.',
    },
    {
      title: 'Time-Consuming Reporting',
      text: 'Monthly reporting was built manually from scratch each cycle, consuming hours of staff time.',
    },
    {
      title: 'Lack of Audit Trail',
      text: 'No centralized, timestamped record existed for outbound messages, client replies, and internal alerts.',
    },
  ],
  tried: {
    title: 'What They Tried Before Coldi',
    items: [
      {
        title: 'Spreadsheet Tracking',
        text: 'Manual logs created inconsistent response tracking and high exposure to human error.',
      },
      {
        title: 'Manual Staff Escalation',
        text: 'Relying on human agents to manually flag high-risk declarations created compliance bottlenecks.',
      },
      {
        title: 'Traditional Support Staffing',
        text: 'Human-only support led to high operational costs and staff burnout from handling repetitive Tier-1 queries around the clock.',
      },
    ],
  },
  asked: {
    title: 'What They Asked For',
    text: 'Deploy an autonomous outbound compliance workflow to handle the complete six-month review cycle alongside a 24/7 inbound AI Live Support Agent to qualify visitors, answer queries, and route existing clients automatically.',
    bgImage: '/images/silverbellgroup/problem-one.png',
  },
  conclusion: {
    title: 'The conclusion they reached',
    text: 'static spreadsheets and manual follow-ups introduce regulatory risk and cannot scale with growth. The critical requirement is a fully automated communication lifecycle—handling outreach, reminder cadences, response classification, instant high-risk escalation, and audit reporting with zero manual input. That is the point at which they came to Coldi.',
    bgImage: '/images/silverbellgroup/problem-two.png',
  },
};

export const snapshotCards = [
  {
    value: '6 <span>Weeks</span>',
    label: 'Implementation Timeline',
    src: 'icons/clarity-engagement-icon-one.svg',
  },
  {
    value: '24/7',
    label: 'Inbound Voice Support Availability',
    src: 'icons/clarity-engagement-icon-two.svg',
  },
  {
    value: '100<span>%</span>',
    label: 'Automated Compliance Lifecycle Execution',
    src: 'icons/clarity-engagement-icon-three.svg',
  },
  {
    value: '7<span> Day</span>',
    label: 'Structured Follow-Up Interval Cadence',
    src: 'icons/clarity-engagement-icon-four.svg',
  },
  {
    value: 'XXX',
    label: 'Calls Independently Audited',
    src: 'icons/clarity-engagement-icon-five.svg',
  },
  {
    value: 'XXX',
    label: 'Local Numbers Provisioned',
    src: 'icons/clarity-engagement-icon-six.svg',
  },
  {
    value: 'XXX',
    label: 'Total Dial Attempts',
    src: 'icons/clarity-engagement-icon-seven.svg',
  },
  {
    value: 'XXX',
    label: 'Hours of Manual Work Saved',
    src: 'icons/clarity-engagement-icon-eight.svg',
  },
];

export const implementationPhases = [
  {
    title: 'Discovery & Wiring',
    text: 'CRM integration setup, client segmentation rules established, and inbound telephony stood up.',
  },
  {
    title: 'Iterative Prompt & Flow Build',
    text: 'Configured 3-stage reminder cadences, corporate/individual prompt templates, and the 5-point inbound qualification flow.',
  },
  {
    title: 'Classification & Escalation Engine',
    text: 'Built AI response sorting (3 categories) and instant compliance alert triggers.',
  },
  {
    title: 'Audit & Reporting Automation',
    text: 'Integrated centralized timestamped logging and automated monthly compliance report generation.',
  },
  {
    title: 'Full System Rollout',
    text: 'Launched live outbound compliance reviews and 24/7 inbound support agent (+1 236 309 2666).',
  },
  {
    title: 'Hardening & Audit Review',
    text: 'Evaluated classification accuracy, latency, and automated hand-off compliance.',
  },
];

export const integratedItems = [
  {
    title: 'Client Segmentation & Dynamic Scripting',
    text: 'Automatic CRM-based classification into corporate vs. individual accounts, triggering approved, segment-specific outreach scripts.',
    src: 'icons/clarity-built-one.svg',
  },
  {
    title: '3-Stage Automated Reminder Engine',
    text: 'Schedules and executes follow-up reminders at exact 7-day intervals with per-client tracking of send dates and response status.',
    src: 'icons/clarity-built-two.svg',
  },
  {
    title: 'AI Response Classification & Real-Time Escalation',
    text: 'Analyzes incoming client replies, categorizes them into three defined groups, and instantly alerts the compliance department upon detecting "changes reported".',
    src: 'icons/clarity-built-three.svg',
  },
  {
    title: 'Automated Audit Trail & Monthly Reporting',
    text: 'Auto-generates audit-ready monthly reports covering all outcome categories while maintaining a timestamped log of all outreach, replies, and notifications.',
    src: 'icons/clarity-built-four.svg',
  },
  {
    title: '24/7 Inbound AI Live Support Agent',
    text: 'Dedicated voice coverage (+1 236 309 2666) providing instant response, smart routing for existing clients, and a 5-point lead qualification flow for new visitors.',
    src: 'icons/clarity-built-five.svg',
  },
];

export const askedCards = [
  {
    value: '5<span>-Point</span>',
    label:
      'Inbound Qualification Logic Built (Account Status, Payment Solution, Country, Industry, Volume)',
    src: 'icons/clarity-asked-one.svg',
  },
  {
    value: 'Strict SLA',
    label: 'Configured for Instant Compliance Escalation Triggers',
    src: 'icons/clarity-asked-two.svg',
  },
  {
    value: '100%',
    label: 'Audit-Ready Automated Report Templates Custom-Built',
    src: 'icons/clarity-asked-three.svg',
  },
];

export const monitoringItems = [
  {
    label: 'Immutable Compliance Auditing',
    value:
      'Complete timestamped records of every call, message, AI classification decision, and internal alert stored automatically.',
  },
  {
    label: 'Zero-Lag Escalation SLA',
    value:
      'Direct automated routing of change declarations directly to compliance officers, eliminating human delay.',
  },
  {
    label: 'Managed System Health',
    value:
      'Ongoing monitoring of phone line deliverability, prompt accuracy, and CRM sync stability.',
  },
];

export const wentWrongItems = [
  { title: 'Area' },
  { title: 'What Happened' },
  { title: 'How Coldi Resolved It' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  {
    title: 'Data Missing',
  },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  {
    title: 'Data Missing',
  },
  {
    title: 'Data Missing',
  },
  {
    title: 'Data Missing',
  },
  {
    title: 'Data Missing',
  },
];

export const resultsBg = '/images/silverbellgroup/results-bg.png';

export const resultsShow = {
  title: 'What This Engagement Shows',
  text: 'In highly regulated fintech environments, AI deployment must provide total operational precision. Coldi delivers strict logic, real-time escalation triggers, and immutable audit trails directly alongside autonomous voice and text capabilities.',
  src: '/images/silverbellgroup/clarity-result-two-bg.png',
};

export const resultsMetrics = [
  {
    value: '24/7',
    label: 'Front-Line Inbound Support Established (+1 236 309 2666)',
    highlight: false,
  },
  {
    value: '100%',
    label: 'Inbound & Outbound Compliance Review Lifecycle Automated',
    highlight: true,
  },
  { value: '0 Min', label: 'Manual Scheduling & Follow-Up Delays', highlight: false },
  { value: '100%', label: 'Automated Lead & Scope Capture', highlight: false },
  { value: '0 Sec', label: 'Automated Lead Qualification Delay', highlight: false },
  { value: '100%', label: 'Instant Post-Call Compliance Escalation & Reporting', highlight: true },
  { value: '3 Steps', label: 'Automated Lead Qualification Logic Implemented', highlight: false },
  {
    value: 'Zero <span>Response Lag:</span>',
    label:
      'Automated classification and real-time triggers removed manual delays on high-risk accounts.',
    highlight: false,
  },
];

export const caseStudyContent: CaseStudyContent = {
  tocItems,
  problem: problemContent,
  snapshotCards,
  implementationPhases,
  integratedItems,
  askedCards,
  monitoringItems,
  wentWrongItems,
  resultsBg,
  resultsShow,
  resultsMetrics,
  column: 'one',
  layout: 'four',
};
