import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/silverbellgroup/components/data';

export const heroContent: HeroContent = {
  titleLine1: 'Scaled Customer Onboarding & Live Manager Routing',
  titleLine2: '',
  subtitle:
    'How a performance marketing agency deployed an autonomous outbound voice campaign to process 8,255 unique leads, book 419 onboarding sessions, and execute 386 live Success Manager transfers.',
  reportingRange: 'THE CLIENT',
  paragraphs: [
    'The client is a performance marketing agency managing high-volume client onboarding and customer success operations.',
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
      title: 'High-Volume Onboarding Bottlenecks',
      text: 'Manual outreach to thousands of new leads delayed onboarding completion.',
    },
    {
      title: 'Resource Constraints',
      text: 'Human success managers spent significant time making initial contact rather than conducting live onboarding sessions.',
    },
    {
      title: 'Bandwidth Wasted on Voicemails',
      text: 'Staff lost capacity answering and filtering automated answering machines instead of speaking to live human pickups.',
    },
  ],
  tried: {
    title: 'What They Tried Before Coldi',
    items: [
      {
        title: 'Manual Outbound Follow-Ups',
        text: 'Human teams manually attempted to contact and schedule onboarding sessions across large lead lists.',
      },
      {
        title: 'Basic Outbound Dialers',
        text: 'Traditional tools lacked real-time answering machine filtering and warm live-transfer capability.',
      },
    ],
  },
  asked: {
    title: 'What They Asked For',
    text: 'Deploy an autonomous outbound AI voice engine across 8,255 unique leads to qualify intent, book onboarding sessions directly into calendars, route high-value prospects via live transfers to Success Managers, and schedule deferred callbacks.',
    bgImage: '/images/silverbellgroup/problem-one.png',
  },
  conclusion: {
    title: 'The conclusion they reached',
    text: 'scaling client onboarding requires high-accuracy answering machine filtering, interactive calendar booking during calls, and immediate live transfers for high-intent prospects. That is the point at which they came to Coldi.',
    bgImage: '/images/silverbellgroup/problem-two.png',
  },
};

export const snapshotCards = [
  {
    value: '8,255',
    label: 'Calls Placed & Unique Leads Dialed',
    src: 'icons/clickomi-engagement-icon-one.svg',
  },
  {
    value: '80.6%',
    label: 'Call Answer Rate',
    src: 'icons/clickomi-engagement-icon-two.svg',
  },
  {
    value: '2,081',
    label: 'Live Persons Reached',
    src: 'icons/clickomi-engagement-icon-three.svg',
  },
  {
    value: '1,409',
    label: 'Engaged Conversations Held',
    src: 'icons/clickomi-engagement-icon-four.svg',
  },
  {
    value: '31 Hours',
    label: 'Total Live Talk Time',
    src: 'icons/clickomi-engagement-icon-five.svg',
  },
  {
    value: '67.5 Sec',
    label: 'Average Conversation Length',
    src: 'icons/clickomi-engagement-icon-six.svg',
  },
  {
    value: '68.8%',
    label: 'Lead Interest Rate',
    src: 'icons/clickomi-engagement-icon-seven.svg',
  },
  {
    value: '+10.3%',
    label: 'Month-over-Month Booking Growth',
    src: 'icons/clickomi-engagement-icon-eight.svg',
  },
];

export const implementationPhases = [
  {
    title: 'Rollout (July 2026)',
    text: 'Placed 2,900 calls resulting in 390 live conversations, securing 87 booked onboarding sessions (22.3% conversation-to-booking rate) and 116 live transfers.',
  },
  {
    title: 'Optimization (August 2026)',
    text: 'Scaled to 5,355 calls across 1,019 conversations, securing 332 booked onboarding sessions (32.6% conversation-to-booking rate) and 270 live transfers before campaign completion on August 18.',
  },
];

export const integratedItems = [
  {
    title: 'High-Volume Outbound Voice Engine',
    text: 'Automated dialing pipeline processing over 8,000 unique contact records with precise answer-detection logic.',
    src: 'icons/clickomi-built-one.svg',
  },
  {
    title: 'Live Success Manager Transfer Routing',
    text: 'Real-time telephony integration routing hot, qualified contacts directly to active account managers mid-call.',
    src: 'icons/clickomi-built-two.svg',
  },
  {
    title: 'Automated Calendar Booking Workflow',
    text: 'Interactive scheduling engine allowing callers to lock in onboarding slots during live conversations.',
    src: 'icons/clickomi-built-three.svg',
  },
  {
    title: 'Callback Scheduling System',
    text: 'Automated protocol arranging deferred callback slots for prospects requesting future outreach.',
    src: 'icons/clickomi-built-four.svg',
  },
];

export const askedCards = [
  {
    value: 'Answering Machine Detection (AMD)',
    label:
      'Configured filter logic to bypass 4,569 answering machine pickups and preserve agent bandwidth for live pickups.',
    src: 'icons/clickomi-asked-one.svg',
  },
  {
    value: 'Live Transfer Pivot Logic',
    label:
      'Programmed immediate escalation rules to trigger live warm transfers to Success Managers when high intent was detected mid-conversation.',
    src: 'icons/clickomi-asked-two.svg',
  },
  {
    value: 'Onboarding Pitch Refinement',
    label:
      'Iterated core prompt scripting between July and August, driving a 46% relative increase in booking conversion efficiency (from 22.3% to 32.6%)',
    src: 'icons/clickomi-asked-three.svg',
  },
];

export const monitoringItems = [
  {
    label: 'Answering Machine Filtering',
    value:
      'High-accuracy signal processing separating automated voicemails from live human connections in real time.',
  },
  {
    label: 'Non-Overlapping Metric Tracking',
    value:
      'Isolated analytics tracking multi-outcome interactions (sessions booked, live transfers, and expressed interest) without double-counting core volume.',
  },
  {
    label: 'Managed Campaign Optimization',
    value:
      'Continuous prompt iteration and live routing maintenance across operational calling windows.',
  },
];

export const wentWrongItems = [
  { title: 'Area' },
  { title: 'What Happened' },
  { title: 'How Coldi Resolved It' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
  { title: 'Data Missing' },
];

export const resultsBg = '/images/silverbellgroup/results-bg.png';

export const resultsShow = {
  title: 'What This Engagement Shows',
  text: 'Scaling customer onboarding requires robust answering machine filtering, live transfer routing, and adaptive prompt refinement. Coldi provides the voice automation infrastructure to convert large lead volumes into scheduled onboarding sessions and live account manager connections.',
  src: '/images/silverbellgroup/clarity-result-two-bg.png',
};

export const resultsMetrics = [
  {
    value: '419',
    label: 'Onboarding Sessions Booked (29.7% of all live conversations)',
    highlight: true,
  },
  {
    value: '386',
    label: 'Live Success Manager Transfers Executed (27.4% of conversations)',
    highlight: false,
  },
  {
    value: '68.8%',
    label:
      'Overall Lead Interest Rate (969 leads showing explicit interest across 1,409 conversations)',
    highlight: false,
  },
  {
    value: '332',
    label: 'August Onboarding Bookings (Up from 87 in July)',
    highlight: false,
  },
  {
    value: '195',
    label: 'Automated Callbacks Arranged',
    highlight: false,
  },
  {
    value: '32.6%',
    label: 'Peak Conversation-to-Booking Rate Achieved in August',
    highlight: false,
  },
  {
    value: 'Immediate Warm Handoffs',
    label:
      'Routing high-intent prospects directly to Success Managers mid-call maximizes real-time conversion',
    highlight: false,
  },
  {
    value: 'Continuous Optimization Impact',
    label:
      'Iterative script tuning boosted conversation-to-booking conversion efficiency by 46% relative month-over-month. ',
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
};
