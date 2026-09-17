export type HeroImage = {
  src: string;
  width: number;
  height: number;
};

export type HeroBgImage = { src: string };

export type HeroImages = {
  bgImage: HeroBgImage | null;
  image: HeroImage;
};

export type HeroContent = {
  titleLine1: string;
  titleLine2: string | null;
  subtitle: string;
  images: HeroImages;
  reportingRange: string;
  paragraphs: string[];
};

export type TocItem = {
  id: string;
  title: string;
  description: string;
};

export type SnapshotCard = {
  value: string;
  label: string;
  src: string;
};

export type IntegratedItem = {
  title: string;
  text: string;
  src: string;
};

export type ImplementationPhase = {
  title: string;
  subtitle?: string;
  text: string;
};

export type LabelValue = {
  label: string;
  value: string;
  list?: readonly string[];
};

export type ResultMetric = {
  value: string;
  label: string;
  highlight: boolean;
  subtitle?: string;
};

export type ProblemItem = {
  title: string;
  text: string;
};

export type ProblemPanel = {
  title: string;
  text: string;
  bgImage?: string;
};

export type ProblemContent = {
  title: string;
  items: readonly ProblemItem[];
  tried: {
    title: string;
    items: readonly ProblemItem[];
  };
  asked: ProblemPanel;
  conclusion: ProblemPanel;
};

export type CaseStudyContent = {
  tocItems: readonly TocItem[];
  problem?: ProblemContent;
  snapshotCards: readonly SnapshotCard[];
  implementationPhases: readonly ImplementationPhase[];
  integratedItems: readonly IntegratedItem[];
  askedCards: readonly SnapshotCard[];
  monitoringItems: readonly LabelValue[];
  wentWrongItems: readonly { title: string }[];
  resultsBg: string;
  resultsShow: {
    title: string;
    text: string;
    src: string;
  };
  resultsMetrics: readonly ResultMetric[];
  column?: 'one' | 'two';
  layout?: 'two' | 'four';
};

export const heroContent: HeroContent = {
  titleLine1: 'Global Scale,<br />Zero Downtime:',
  titleLine2: 'How Silverbell Group Expanded 24/7 Service Without Adding Headcount',
  subtitle:
    'How a global professional services leader integrated autonomous AI agents into their client intake funnel to capture after-hours leads and streamline global operations.',
  images: {
    bgImage: null,
    image: {
      src: '/images/silverbellgroup/sbg.png',
      width: 190,
      height: 100,
    },
  },
  reportingRange: 'THE CLIENT',
  paragraphs: [
    'Silverbell Group is an international leader in professional services and enterprise outsourcing. Operating across multiple time zones, their global clientele requires immediate, high-touch support and rapid sales intake.',
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
] as const;

export const problemContent: ProblemContent = {
  title: 'The Problem',
  items: [
    {
      title: 'Time Zone Coverage Gaps',
      text: 'Inbound inquiries arriving outside standard regional office hours were delayed in response, leading to lost conversion opportunities.',
    },
    {
      title: 'Capacity Limits',
      text: 'High-tier human specialists spent excessive time on initial data capture and basic routine inquiries rather than high-value consultation.',
    },
    {
      title: 'Lead Leakage',
      text: 'Web portal traffic during nights, weekends, and holidays went unengaged without a live, proactive representative available.',
    },
  ],
  tried: {
    title: 'What They Tried Before Coldi',
    items: [
      {
        title: 'Standard Off-the-Shelf Chatbots',
        text: 'Generic conversational bots failed to handle industry-specific nuance and could not reliably drive conversion or intent-based routing.',
      },
      {
        title: 'Expanding Manual Shifts',
        text: 'Staffing global hours manually created steep operational overhead and inconsistent service quality across regional shifts.',
      },
      {
        title: 'Static Web Forms',
        text: 'Unattended contact forms suffered from low completion rates and slow follow-up speeds.',
      },
    ],
  },
  asked: {
    title: 'What They Asked For',
    text: "Deploy a 24/7 autonomous AI agent directly into the website representative portal to answer complex inquiries, capture prospect contact details, and book qualified meetings directly into human specialists' calendars.",
    bgImage: '/images/silverbellgroup/problem-one.png',
  },
  conclusion: {
    title: 'The conclusion they reached',
    text: 'Generic tools and static forms do not drive business growth. The critical challenge is deploying an active, brand-tuned agent that manages technical routing, instant scheduling, and data intake seamlessly around the clock. That is the point at which they came to Coldi.',
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
    label: 'Active Coverage Across All Time Zones',
    src: 'icons/simple-two.svg',
  },
  {
    value: '100<span>%</span>',
    label: 'Inbound Web Portal Integration',
    src: 'icons/simple-three.svg',
  },
  {
    value: '100+<span> Daily</span>',
    label: 'Inquiries Managed System-Wide',
    src: 'icons/simple-four.svg',
  },
];

export const implementationPhases = [
  {
    title: 'Discovery & Wiring',
    text: 'Mapped intent logic, pre-loaded Silverbell domain knowledge, and wired API connections to internal scheduling tools.',
  },
  {
    title: 'Iterative Prompt & Logic Tuning',
    text: 'Tested response handling against historical customer inquiries; refined conversational tone and booking prompts.',
  },
  {
    title: 'Portal Integration & Pilot Launch',
    text: 'Deployed agent to live web environment; began real-time transcript monitoring for edge cases.',
  },
  {
    title: 'Escalation Protocol Optimization',
    text: 'Hardened the live-transfer and callback logic for inquiries requiring human specialist intervention.',
  },
  {
    title: 'Full Automation & 24/7 Rollout',
    text: 'Expanded system to handle complete weekend, holiday, and night-shift coverage without manual supervision.',
  },
  {
    title: 'Hardening & Performance Audit',
    text: 'Conducted full transcript review, optimized response latencies, and finalized operational handoff reporting.',
  },
];

export const integratedItems = [
  {
    title: 'Autonomous Web Agent Integration',
    text: 'Embedded directly into Silverbell’s "Chat with an Online Representative" portal to act as a digital extension of their elite service team.',
    src: 'icons/autonomous.svg',
  },
  {
    title: 'Domain-Specific Knowledge Base',
    text: 'Pre-loaded with Silverbell’s proprietary operational data to deliver immediate, accurate technical and service responses.',
    src: 'icons/domain.svg',
  },
  {
    title: 'Proactive Lead Capture & Appointment Engine',
    text: 'Programmed with strict logic to collect verified contact data (company name, phone, email) and lock in appointments in real time.',
    src: 'icons/proactive.svg',
  },
  {
    title: 'Human-in-the-Loop Routing Architecture',
    text: 'Built-in logic flow to seamlessly escalate complex edge cases directly to live human teams with full transcript context.',
    src: 'icons/human.svg',
  },
];

export const askedCards = [
  {
    value: '20+',
    label: 'Specific Prompt Adjustments for Tone and Brand Tuning',
    src: 'icons/specific.svg',
  },
  {
    value: '5+',
    label: 'Calendar Integration Tweaks for Dynamic Slot Allocation',
    src: 'icons/calendar.svg',
  },
  {
    value: '100%',
    label: 'Coverage Verified Across After-Hours and Holiday Schedules',
    src: 'icons/coverage.svg',
  },
];

export const monitoringItems = [
  {
    label: 'Turnkey Managed Solution',
    value:
      'Coldi handles all ongoing prompt engineering, system maintenance, and API health monitoring.',
  },
  {
    label: 'Full Data Transparency',
    value:
      'Complete transcript access and outcome reporting supplied automatically to management teams.',
  },
  {
    label: 'Proactive Logic Updates',
    value: "Knowledge bases are continuously updated as Silverbell's service catalog evolves.",
  },
];

export const wentWrongItems = [
  { title: 'Area' },
  { title: 'What Happened' },
  { title: 'How Coldi Resolved It' },
  { title: 'Data Collection' },
  { title: 'Initial leads occasionally omitted company size during open conversation.' },
  {
    title:
      'Re-prompted agent logic to enforce mandatory contact data capture before slot confirmation.',
  },
  { title: 'Schedule Syncing' },
  { title: 'Slot availability conflicted across multi-regional specialist calendars.' },
  {
    title:
      'Reconfigured scheduling integration to auto-detect client time zones and dynamically display localized availability.',
  },
  {
    title: 'Hand-Off Context',
  },
  {
    title: 'Human specialists lacked immediate context when reviewing AI-booked leads.',
  },
  {
    title: 'Configured automated post-chat summary webhooks sent straight to internal CRM/inbox.',
  },
];

export const resultsBg = '/images/silverbellgroup/results-bg.png';

export const resultsShow = {
  title: 'What This Engagement Shows',
  text: 'Success in AI deployment depends on deep implementation—embedding domain expertise, enforcing clean data capture, and creating flawless hand-offs to human teams. Coldi delivers the complete operational engine alongside the voice and chat technology.',
  src: '/images/silverbellgroup/result-two-bg.png',
};

export const resultsMetrics = [
  { value: '100+', label: 'Daily Automated Inquiries Managed', highlight: true },
  { value: '75 Hours', label: 'Saved Weekly in Initial Qualification', highlight: false },
  { value: '45%', label: 'Increase in Qualified Lead Conversions', highlight: false },
  { value: '24/7', label: 'Continuous Global Coverage Achieved', highlight: false },
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
  column: 'two',
  layout: 'two',
};
