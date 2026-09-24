import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/silverbellgroup/components/data';

export const heroContent: HeroContent = {
  titleLine1: 'High-Speed Outbound Reactivation & Tech Stack Scoping',
  titleLine2: null,
  subtitle:
    'How a SaaS and HVAC service operator deployed an ultra-low latency voice AI engine to reactivate cold lead databases, analyze existing software stacks, and book 15-minute product demos.',
  reportingRange: 'THE CLIENT',
  paragraphs: [
    'The client provides high-volume SaaS solutions to HVAC contractor networks and field service businesses managing cold prospect databases from previous events and outreach.',
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
      title: 'Database Decay',
      text: 'Uncontacted leads sat idle, causing ROI degradation and lost pipeline value over time.',
    },
    {
      title: 'High Manual Cold-Calling Overhead',
      text: 'Human reps faced rapid fatigue attempting high-volume outreach across cold lists.',
    },
    {
      title: 'Conversation Latency Pauses',
      text: 'Standard automated dialers introduced awkward silences, triggering immediate hang-ups from busy business owners.',
    },
  ],
  tried: {
    title: 'What They Tried Before Coldi',
    items: [
      {
        title: 'Manual SDR Dialing',
        text: 'Human capacity limits prevented thorough coverage of large, cold lead databases.',
      },
      {
        title: 'Off-the-Shelf Dialers',
        text: 'Systems lacked rapid response infrastructure and real-time CRM tech-stack logging capabilities.',
      },
    ],
  },
  asked: {
    title: 'What They Asked For',
    text: "Deploy an outbound voice AI engine to call cold lists, handle natural objection flow, identify the prospect's current software stack, and dispatch SMS booking links during live calls.",
    bgImage: '/images/silverbellgroup/problem-one.png',
  },
  conclusion: {
    title: 'The conclusion they reached',
    text: 'cold list reactivation requires sub-second voice latency, intelligent objection handling, and real-time calendar link dispatch to convert idle data before interest cools. That is the point at which they came to Coldi.',
    bgImage: '/images/silverbellgroup/problem-two.png',
  },
};

export const snapshotCards = [
  {
    value: '67',
    label: 'Total Outbound Calls Placed',
    src: 'icons/hvac-engagement-icon-one.svg',
  },
  {
    value: '104.09<span>Min</span>',
    label: 'Total Live Call Duration',
    src: 'icons/hvac-engagement-icon-two.svg',
  },
  {
    value: '27',
    label: 'Total Leads Captured',
    src: 'icons/hvac-engagement-icon-three.svg',
  },
  {
    value: '<500ms',
    label: 'Sub-Second Response Latency SLA',
    src: 'icons/hvac-engagement-icon-four.svg',
  },
];

export const implementationPhases = [
  {
    title: 'Data missing',
    text: 'Data missing',
  },
  {
    title: 'Data missing 2',
    text: 'Data missing',
  },
  {
    title: 'Data missing 3',
    text: 'Data missing',
  },
  {
    title: 'Data missing 4',
    text: 'Data missing',
  },
  {
    title: 'Data missing 5',
    text: 'Data missing',
  },
  {
    title: 'Data missing 6',
    text: 'Data missing',
  },
];

export const integratedItems = [
  {
    title: 'Ultra-Low Latency Voice Engine',
    text: 'Sub-500ms response architecture engineered to eliminate pauses, manage interruptions, and maintain natural conversation pacing.',
    src: 'icons/hvac-built-one.svg',
  },
  {
    title: 'Calendly & SMS Automation Engine',
    text: 'Automated SMS dispatch system sending direct Calendly booking links during live calls upon verbal prospect confirmation.',
    src: 'icons/hvac-built-two.svg',
  },
  {
    title: 'CRM Intelligence Feedback Loop',
    text: 'Real-time CRM integration logging current software stack details, conversation outcomes, and account performance summaries.',
    src: 'icons/hvac-built-three.svg',
  },
  {
    title: 'Real-Time Performance Dashboard',
    text: 'Centralized tracking environment displaying real-time call counts, live talk minutes, and qualified lead capture metrics.',
    src: 'icons/hvac-built-four.svg',
  },
];

export const askedAudios = [
  {
    title: 'SEE HVAC VOICE IN ACTION',
    text: null,
    image: '/images/silverbellgroup/asked-bg-one.png',
    audio: '/audio/hvac.mp3',
  },
];

export const askedCards = [
  {
    value: 'Two-Step Objection Rule',
    label:
      'Programmed logic where the agent acknowledges initial pushback, pivots with a value proposition, and concedes only after a second firm refusal.',
    src: 'icons/hvac-saas-asked-one.svg',
  },
  {
    value: 'Tech Stack Discovery Scripting',
    label:
      'Mid-call discovery prompts configured to extract and log the prospect’s existing software environment.',
    src: 'icons/hvac-saas-asked-two.svg',
  },
  {
    value: 'Instant Conversion Pivot',
    label: 'Real-time trigger executing SMS booking link dispatch upon verbal interest.',
    src: 'icons/hvac-saas-asked-three.svg',
  },
];

export const monitoringItems = [
  {
    label: 'Latency Management SLA',
    value:
      'Continuous enforcement of sub-500ms voice response speed to prevent robotic speech pauses.',
  },
  {
    label: 'Outreach Threshold Guardrails',
    value:
      'Automated stopping criteria enforcing objection handling caps to prevent prospect fatigue.',
  },
  {
    label: 'Managed CRM Logging',
    value: 'Automated synchronization of tech stack metadata and call summary logs.',
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
  text: 'Reactivating cold data requires sub-second voice responsiveness, persistent objection handling, and immediate digital link handoffs. Coldi provides the full technical voice pipeline to extract value from idle databases.',
  src: '/images/silverbellgroup/clarity-result-two-bg.png',
};

export const resultsMetrics = [
  {
    value: '27',
    label: 'Total Qualified Leads Captured',
    highlight: true,
  },
  {
    value: '2 Steps',
    label: 'Structured Objection Handling Enforcement',
    highlight: false,
  },
  { value: '100%', label: 'Automated Tech Stack Scoping Logged to CR', highlight: false },
  { value: '1 Click', label: 'Instant SMS Calendly Demo Delivery', highlight: false },
  { value: '67', label: 'Outbound Calls Placed', highlight: false },
  {
    value: '104.09 Min',
    label: 'Total Call Minutes Executed',
    highlight: false,
  },
  {
    value: '<span>Immediate Link Dispatch</span>',
    label:
      'Sending booking links during active calls converts verbal interest into calendar meetings before the caller hangs up',
    highlight: false,
  },
  {
    value: '<span>Automated Market Research</span>',
    label:
      'Capturing current software stack data enriches CRM records for future targeting even when demos are not booked immediately.',
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
  askedAudioColumn: 'one',
  monitoringItems,
  wentWrongItems,
  resultsBg,
  resultsShow,
  resultsMetrics,
  column: 'one',
};
