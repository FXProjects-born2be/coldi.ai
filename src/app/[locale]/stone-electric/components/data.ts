import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/silverbellgroup/components/data';

export const heroContent: HeroContent = {
  titleLine1: 'Automated Residential Service Intake & 24/7 Smart Dispatching',
  titleLine2: null,
  subtitle:
    'How a residential electrical contractor deployed an autonomous AI voice agent ("George") to triage emergency calls, validate service areas, and book jobs directly into technician calendars. ',
  images: {
    bgImage: {
      src: '/images/silverbellgroup/stone-electric-bg.png',
    },
    image: {
      src: '/images/silverbellgroup/stone-electric.svg',
      width: 126,
      height: 122,
    },
  },
  reportingRange: 'THE CLIENT',
  paragraphs: [
    'Stone Electric Company is a residential service business providing electrical contracting, emergency response, lighting, and renovation project work.',
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
      title: 'After-Hours Coverage',
      text: 'Inbound calls required 24/7 front-line dispatching to capture emergency and residential service leads.',
    },
    {
      title: 'Manual Screening & Scoping',
      text: 'Staff had to manually verify operational territory via ZIP codes, capture job details, and handle caller requests.',
    },
    {
      title: 'Scheduling Friction',
      text: 'Finding and locking in available appointment slots manually delayed conversions.',
    },
  ],
  tried: {
    title: 'What They Tried Before Coldi',
    items: [
      {
        title: 'Manual Dispatching',
        text: 'Inbound calls required 24/7 front-line dispatching to capture emergency and residential service leads.',
      },
      {
        title: 'Off-the-Shelf Tools',
        text: 'Systems that lacked real-time calendar syncing and custom intent detection workflows.',
      },
    ],
  },
  asked: {
    title: 'What They Asked For',
    text: 'Deploy an AI voice agent named George to triage inbound calls, screen emergencies, validate service areas, collect caller details, and book jobs directly into technician calendars.',
    bgImage: '/images/silverbellgroup/problem-one.png',
  },
  conclusion: {
    title: 'The conclusion they reached',
    text: 'generic call handling lacks the real-time calendar syncing, emergency transfer logic, and service-area validation needed for efficient trade dispatching. That is the point at which they came to Coldi.',
    bgImage: '/images/silverbellgroup/problem-two.png',
  },
};

export const snapshotCards = [
  {
    value: '6 <span>Weeks</span>',
    label: 'Full Deployment Timeline',
    src: 'icons/simple-one.svg',
  },
  {
    value: '24/7',
    label: 'Front-Line Inbound Dispatch Coverage',
    src: 'icons/simple-two.svg',
  },
  {
    value: '100<span>%</span>',
    label: 'Inbound Booking Lifecycle Automated',
    src: 'icons/stone-engagement-icon-one.svg',
  },
  {
    value: 'XXX',
    label: 'Housecall Pro & Twilio Telephony Integration',
    src: 'icons/simple-four.svg',
  },
];

export const implementationPhases = [
  {
    title: 'Discovery & Architecture',
    text: 'Configured Twilio voice routing, defined emergency triage parameters, and wired the Housecall Pro integration.',
  },
  {
    title: 'Conversation & Screening Build',
    text: 'Programmed ZIP code validation guardrails, soft-transfer retention scripts, and project scoping trees.',
  },
  {
    title: 'Live Testing & Audio Benchmarking',
    text: 'Tested agent response accuracy against real-world call scenarios, including complex project scoping and standard estimate requests.',
  },
  {
    title: 'Emergency Transfer Hardening',
    text: 'Validated live transfer fail-safes and ZIP code checks for urgent electrical service calls.',
  },
  {
    title: 'Full Automation Rollout',
    text: 'Transitioned 24/7 front-line dispatching live across all inbound residential calls.',
  },
  {
    title: 'Hardening & Post-Call Automation',
    text: 'Finalized automated post-call SMS confirmations and office manager lead summary webhooks.',
  },
];

export const integratedItems = [
  {
    title: 'Inbound Call Architecture & Intent Screening',
    text: 'Implemented AI agent George to run immediate intent detection, triage emergencies, validate operational territory via ZIP code, and capture user details.',
    src: 'icons/stone-built-one.svg',
  },
  {
    title: 'Intelligent Emergency Dispatching',
    text: 'Configured automated intent recognition that triggers immediate live transfers to technicians for urgent issues after a ZIP check.',
    src: 'icons/stone-built-two.svg',
  },
  {
    title: 'Housecall Pro Direct Calendar Sync',
    text: 'Deep calendar integration checking real-time technician availability to negotiate and lock booked appointments directly into field schedules.',
    src: 'icons/stone-built-three.svg',
  },
  {
    title: 'Twilio Telephony & Post-Call Automation',
    text: 'Integrated Twilio for high-fidelity voice routing, post-call SMS confirmations to customers, and instant lead summary briefs sent to office managers.',
    src: 'icons/stone-built-four.svg',
  },
];

export const askedAudios = [
  {
    title: 'Complex Project Scoping',
    text: 'In this call, the AI manages a detailed request for a deck renovation, collecting specific requirements for outlets and lighting while validating the service area.',
    image: '/images/silverbellgroup/asked-bg-one.png',
    audio: '/audio/electric-1.mp3',
  },
  {
    title: 'Standard Quote & Appointment Booking',
    text: 'Watch how the agent handles a common inquiry for an outdoor outlet, explains the installation process, and syncs directly with the calendar for an onsite estimate.',
    image: '/images/silverbellgroup/asked-bg-two.png',
    audio: '/audio/electric-2.mp3',
  },
];

export const askedCards = [
  {
    value: 'Emergency Scripting',
    label: 'Immediate ZIP check and live transfer logic built for urgent calls.',
    src: 'icons/stone-asked-one.svg',
  },
  {
    value: 'AI Disclosure & Retention Handling',
    label:
      'Soft transfer and trust-preservation scripts added for callers asking about AI identity or human operators',
    src: 'icons/stone-asked-two.svg',
  },
  {
    value: 'Dynamic Slot Negotiation',
    label: 'Configured multi-option slot offering logic to maximize booking conversion.',
    src: 'icons/stone-asked-three.svg',
  },
  {
    value: 'Technical Scope Gathering',
    label:
      'Customized conversation trees for complex scoping (deck renovations, outdoor outlets, lighting).',
    src: 'icons/stone-asked-four.svg',
  },
  {
    value: 'Audio Call Examples',
    label: 'Configured for Complex Project Scoping and Standard Quote & Appointment Booking.',
    src: 'icons/stone-asked-five.svg',
  },
];

export const monitoringItems = [
  {
    label: 'Operational Territory Guardrails',
    value:
      'Automated ZIP code verification ensuring only leads within service boundaries proceed to booking.',
  },
  {
    label: 'Full Data Summarization',
    value:
      'End-of-call confirmation step summarizing contact details and job requirements back to the caller.',
  },
  {
    label: 'Managed Integrations',
    value:
      'Continuous automated syncing between Twilio routing, Housecall Pro scheduling, and SMS dispatching.',
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
  text: 'Automating home service operations requires instant intent triage, territory validation, and direct calendar syncing. Coldi provides the full technical build and integration layer to turn inbound calls into structured, scheduled field work.',
  src: '/images/silverbellgroup/clarity-result-two-bg.png',
};

export const resultsMetrics = [
  {
    value: '24/7',
    label: 'Front-Line Dispatching Established',
    highlight: false,
  },
  {
    value: '100%',
    label: 'Inbound Booking Lifecycle Automated',
    highlight: true,
  },
  { value: 'Instant', label: 'Calendar Syncing via Housecall Pro Integration', highlight: false },
  { value: '100%', label: 'Automated Lead & Scope Capture', highlight: false },
  { value: 'Immediate', label: 'Intent Recognition & ZIP Validation', highlight: false },
  { value: '100%', label: 'Instant Post-Call Customer & Office Notifications', highlight: false },
  { value: '3 Steps', label: 'Automated Lifecycle Completed', highlight: false },
  {
    value: '<span>Immediate Emergency Escalation</span>',
    label:
      'Urgent calls bypass intake queues and connect directly to live electricians within seconds of location validation.',
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
  askedAudios,
  monitoringItems,
  wentWrongItems,
  resultsBg,
  resultsShow,
  resultsMetrics,
  column: 'one',
};
