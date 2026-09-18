import type {
  CaseStudyContent,
  HeroContent,
  ProblemContent,
} from '@/app/[locale]/silverbellgroup/components/data';

export const heroContent: HeroContent = {
  titleLine1: 'Automated Technical Screening & Senior Sales Scheduling',
  titleLine2: '',
  subtitle:
    'How a global agricultural infrastructure provider deployed an autonomous AI voice assistant ("Sara") to handle technical discovery, qualify complex project leads, and populate CRM data.',
  images: {
    bgImage: null,
    image: {
      src: '/images/silverbellgroup/global-agro-logo.png',
      width: 191,
      height: 100,
    },
  },
  reportingRange: 'THE CLIENT',
  paragraphs: [
    'Global Agro Industry delivers turnkey agricultural infrastructure, livestock facilities, and complex engineering solutions to international markets.',
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
      title: 'High Cost of Manual Screening',
      text: 'Senior sales managers spent hours filtering unqualified inbound inquiries for multi-million dollar projects.',
    },
    {
      title: 'Resource Strain',
      text: 'High-value assets were buried under prospects lacking budget, authority, or immediate project intent.',
    },
    {
      title: 'Global Time Zone Friction',
      text: 'Inbound inquiries arriving across international regions lacked immediate technical response and qualification.',
    },
  ],
  tried: {
    title: 'What They Tried Before Coldi',
    items: [
      {
        title: 'Manual Lead Filtering',
        text: 'Reliance on senior reps to manually evaluate company sizes, geographical constraints, and scope details.',
      },
      {
        title: 'Standard Web Forms',
        text: 'Static contact forms failed to deliver deep technical discovery or capture complex project nuances.',
      },
    ],
  },
  asked: {
    title: 'What They Asked For',
    text: 'Deploy an autonomous digital concierge named Sara to handle initial technical inquiries, extract critical business intelligence into the CRM, screen project intent, and schedule pre-qualified prospects directly with senior sales teams',
    bgImage: '/images/silverbellgroup/problem-one.png',
  },
  conclusion: {
    title: 'The conclusion they reached',
    text: 'generic intake tools cannot evaluate complex industrial catalogs or conduct deep technical discovery across global markets. High-value sales teams require a specialized system that extracts structured business intelligence and pre-qualifies prospects before scheduling. That is the point at which they came to Coldi.',
    bgImage: '/images/silverbellgroup/problem-two.png',
  },
};

export const snapshotCards = [
  {
    value: '6 <span>Weeks</span>',
    label: 'Full Deployment Timeline',
    src: 'icons/clarity-engagement-icon-one.svg',
  },
  {
    value: '24/7',
    label: 'Global Multi-Time Zone Coverage',
    src: 'icons/clarity-engagement-icon-two.svg',
  },
  {
    value: '100<span>%</span>',
    label: 'Inbound Technical Intake Automated',
    src: 'icons/clarity-engagement-icon-three.svg',
  },
  {
    value: '4<span> Core Attributes</span>',
    label: 'Structured CRM Data Extraction',
    src: 'icons/clarity-engagement-icon-four.svg',
  },
];

export const implementationPhases = [
  {
    title: 'Discovery & Architecture',
    text: 'Mapped agricultural product catalog data, defined qualification thresholds, and wired internal CRM extraction endpoints.',
  },
  {
    title: 'Conversation & Knowledge Build',
    text: 'Programmed sector-specific rules for regional variations (e.g., poultry housing in Brazil vs. pig farming facilities in Vietnam).',
  },
  {
    title: 'Screening & Scoring Setup',
    text: 'Configured intent-analysis logic to distinguish serious investors from casual researchers and set automated lead scoring thresholds.',
  },
  {
    title: 'Transition Protocol Hardening',
    text: 'Built structured scheduling handoff flows to eliminate cold transfers and capture prospect availability.',
  },
  {
    title: 'Global Deployment',
    text: 'Launched 24/7 autonomous intake across international time zones.',
  },
  {
    title: 'Optimization & Audit',
    text: 'Evaluated CRM extraction accuracy, prompt precision, and senior manager calendar sync reliability.',
  },
];

export const integratedItems = [
  {
    title: 'Inbound Discovery & Screening Architecture',
    text: 'Deployed AI agent Sara, trained on complete agricultural product catalogs to answer technical questions and guide initial discovery.',
    src: 'icons/clarity-built-one.svg',
  },
  {
    title: 'Automated CRM Extraction Engine',
    text: 'Autonomous data capture extracting company profile, project scale, geography, and buy signals directly into internal CRM records.',
    src: 'icons/clarity-built-two.svg',
  },
  {
    title: 'Intent-Analysis & Lead Scoring Pipeline',
    text: 'Scoring logic designed to recognize specific buy signals and evaluate prospects against customized company qualification thresholds.',
    src: 'icons/clarity-built-three.svg',
  },
  {
    title: 'Structured Handoff & Scheduling Protocol',
    text: 'Appointment collection system gathering prospect availability and preferred channels to book fully briefed meetings with senior sales managers.',
    src: 'icons/clarity-built-four.svg',
  },
];

export const askedCards = [
  {
    value: 'Sector-Specific Product Rules',
    label: 'Differentiated context logic tailored to regional project specifications.',
    src: 'icons/clarity-asked-one.svg',
  },
  {
    value: 'Warm Handoff Protocols',
    label: 'Replaced cold phone transfers with structured appointment collection and lead briefs',
    src: 'icons/clarity-asked-two.svg',
  },
  {
    value: 'Strategic Data Capture Prompts',
    label:
      'Engineered dialogue logic to systematically extract Company Profile, Project Scope, Geography, and Intent Signals.',
    src: 'icons/clarity-asked-three.svg',
  },
];

export const monitoringItems = [
  {
    label: 'Continuous Global Operations',
    value:
      '24/7 availability maintained across international time zones for uninterrupted inquiry intake.',
  },
  {
    label: 'Qualification Threshold Guardrails',
    value:
      'Automated scoring logic prevents unqualified leads from populating senior sales calendars.',
  },
  {
    label: 'Turnkey Infrastructure Maintenance',
    value: 'Coldi manages prompt updates, catalog expansions, and CRM pipeline health',
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
  text: 'Industrial sales automation requires deep domain knowledge, precise intent scoring, and structured data extraction. Coldi provides the full technical framework to convert complex global inquiries into qualified, scheduled opportunities.',
  src: '/images/silverbellgroup/clarity-result-two-bg.png',
};

export const resultsMetrics = [
  {
    value: '100%',
    label: 'High-Probability Sales Focus for Senior Managers',
    highlight: true,
  },
  {
    value: 'Automated',
    label: 'Technical Discovery & Scope Intake',
    highlight: false,
  },
  {
    value: '4 Metrics',
    label: 'Extracted Automatically into CRM',
    highlight: false,
  },
  {
    value: '24/7',
    label: 'Continuous Multi-Time Zone Qualification',
    highlight: false,
  },
  {
    value: 'XXX',
    label: 'Data Missing',
    highlight: false,
  },
  {
    value: 'XXX',
    label: 'Data Missing',
    highlight: false,
  },
  {
    value: 'Targeted Sales Allocation',
    label:
      'Senior managers engage exclusively with pre-screened prospects holding verified budget and intent.',
    highlight: false,
  },
  {
    value: 'Complete Context Handoffs',
    label:
      'Structured briefs eliminate administrative discovery work during initial sales meetings.',
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
