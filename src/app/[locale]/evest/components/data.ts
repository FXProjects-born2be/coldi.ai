import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/silverbellgroup/components/data';

export const heroContent: HeroContent = {
  titleLine1: 'High-Volume Multi-Asset Trader Qualification & Callback Scheduling',
  titleLine2: null,
  subtitle:
    'How an international trading platform leveraged an outbound AI voice engine across 29,377 dial attempts to qualify trader intent and lock in 671 structured callbacks.',
  reportingRange: 'THE CLIENT',
  paragraphs: [
    'Evest is an international multi-asset trading and investment platform handling high-volume global lead re-engagement and trader qualification operations.',
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
      title: 'High Dial Volume Demands',
      text: 'Managing re-engagement across 11,840 unique lead records required constant manual dialing overhead.',
    },
    {
      title: 'Low Contact Efficiency',
      text: 'Human account managers wasted time navigating voicemails and unanswered calls instead of speaking with active traders.',
    },
    {
      title: 'Scheduling Friction',
      text: 'Unstructured follow-up attempts led to missed connections and poor callback completion rates.',
    },
  ],
  tried: {
    title: 'What They Tried Before Coldi',
    items: [
      {
        title: 'Manual Lead Outreach',
        text: 'Account managers manually called leads, resulting in low dial-frequency per lead and inefficient contact rates.',
      },
      {
        title: 'Basic Automated Outbound Dialers',
        text: 'Legacy tools lacked real-time answering machine filtering and interactive calendar callback scheduling.',
      },
    ],
  },
  asked: {
    title: 'What They Asked For',
    text: 'Deploy an automated outbound voice engine across 11,840 unique leads over 17 calling days to qualify active trader buy signals, capture platform interest, and schedule exact callback time slots for account teams.',
    bgImage: '/images/silverbellgroup/problem-one.png',
  },
  conclusion: {
    title: 'The conclusion they reached',
    text: 'scaling trader re-engagement requires systematic multi-dial cadences, precision voicemail filtering, and automated time-specific callback scheduling. That is the point at which they came to Coldi.',
    bgImage: '/images/silverbellgroup/problem-two.png',
  },
};

export const snapshotCards = [
  {
    value: '29,377',
    label: 'Total Outbound Calls Placed',
    src: 'icons/evest-engagement-icon-one.svg',
  },
  {
    value: '6,886',
    label: 'Total Calls Answered',
    src: 'icons/evest-engagement-icon-two.svg',
  },
  {
    value: '6,638',
    label: 'Live Persons Reached',
    src: 'icons/evest-engagement-icon-three.svg',
  },
  {
    value: '3,519',
    label: 'Engaged Conversations Held',
    src: 'icons/evest-engagement-icon-four.svg',
  },
  {
    value: '88+ <span>Hours</span>',
    label: 'Total Live Talk Time',
    src: 'icons/evest-engagement-icon-five.svg',
  },
  {
    value: '66.1 Sec',
    label: 'Average Conversation Length',
    src: 'icons/evest-engagement-icon-six.svg',
  },
  {
    value: '672',
    label: 'Qualified Leads Captured',
    src: 'icons/evest-engagement-icon-seven.svg',
  },
  {
    value: '+5.5%',
    label: 'Month-over-Month Pickups-to-Talk Rate',
    src: 'icons/evest-engagement-icon-eight.svg',
  },
];

export const implementationPhases = [
  {
    title: 'Rollout (July 2026)',
    text: 'Placed 14,765 calls resulting in 1,682 live conversations (50.3% of live pickups) and secured 309 arranged callbacks.',
  },
  {
    title: 'Optimization (August 2026)',
    text: 'Placed 14,612 calls resulting in 1,837 live conversations (55.8% of live pickups) and secured 362 arranged callbacks up through August 19.',
  },
];

export const integratedItems = [
  {
    title: 'High-Volume Multi-Dial Engine',
    text: 'Automated outbound system managing an average of 2.48 dial attempts per unique lead to maximize contact coverage.',
    src: 'icons/evest-built-one.svg',
  },
  {
    title: 'Precision Answering Machine Detection (AMD)',
    text: 'Real-time signal processing filtering out automated voicemails to ensure 96.4% of answered calls connected to live humans.',
    src: 'icons/evest-built-two.svg',
  },
  {
    title: 'Scheduled Callback Engine',
    text: 'Interactive scheduling protocol locking specific follow-up time slots directly into internal account manager queues.',
    src: 'icons/evest-built-three.svg',
  },
  {
    title: 'Qualified Intent Tagging System',
    text: 'Real-time conversational classification engine categorizing active trader buy signals and platform interest.',
    src: 'icons/evest-built-four.svg',
  },
];

export const askedCards = [
  {
    value: 'Time-Specific Callback Protocol',
    label:
      'Programmed prompt logic securing exact follow-up dates and times, locking in specific schedules for 92.8% of arranged callbacks (623 out of 671).',
    src: 'icons/evest-asked-one.svg',
  },
  {
    value: 'Mid-Campaign Conversation Optimization',
    label:
      'Refined dialogue trees between July and August to boost live pickup-to-conversation conversion by 10.9% relative (50.3% to 55.8%).',
    src: 'icons/evest-asked-two.svg',
  },
];

export const monitoringItems = [
  {
    label: 'Lead Cadence Guardrails',
    value:
      'Automated pacing rules balancing 29,377 calls across 11,840 unique records to prevent list exhaustion and carrier spam flagging.',
  },
  {
    label: 'Overlap-Aware Outcome Tracking',
    value:
      'Multi-variable analytics engine isolating qualified interest flags and callback bookings without double-counting call volume.',
  },
  {
    label: 'Managed Dialogue Refinement',
    value: 'Continuous conversational prompt tuning based on live human pickup responses.',
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
  text: 'High-volume trading lead qualification requires structured cadence management, real-time voicemail filtering, and explicit callback scheduling. Coldi provides the full outbound architecture to turn large-scale database calling into qualified account pipeline opportunities.',
  src: '/images/silverbellgroup/clarity-result-two-bg.png',
};

export const resultsMetrics = [
  {
    value: '672',
    label: 'Leads Showing Qualified Interest (19.1% of live conversations)',
    highlight: true,
  },
  {
    value: '671',
    label: 'Total Callbacks Arranged (19.1% of live conversations)',
    highlight: false,
  },
  {
    value: '92.8%',
    label:
      'Time-Specific Callback Accuracy (623 out of 671 callbacks locked with explicit appointment times)',
    highlight: false,
  },
  {
    value: '3,519',
    label: 'Total Live Conversations Held across 88+ talk hours',
    highlight: false,
  },
  {
    value: '96.4%',
    label: 'Live Human Pick-Up Efficiency (6,638 human connections out of 6,886 answered calls)',
    highlight: false,
  },
  {
    value: '55.8%',
    label: 'Peak Conversation Conversion Rate achieved in August',
    highlight: true,
  },
  {
    value: '<span>Precision Appointment Lock-In</span>',
    label:
      'Securing exact dates and times for 92.8% of callbacks prevents lost leads and eliminates phone tag for account managers.',
    highlight: false,
  },
  {
    value: '<span>Voicemail Filtering Efficiency</span>',
    label:
      'Eliminating 96.4% of automated voicemails ensures conversation time is spent exclusively with active, live prospects.',
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
