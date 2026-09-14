export const heroContent = {
  titleLine1: 'Group & Coldi.ai:',
  titleLine2: 'Strategic Partnership Case Study',
  subtitle:
    'AI-Driven 24/7 Autonomous Customer Experience & Appointment Setting for Global Professional Services',
  reportingLabel: 'Reporting Period:',
  reportingRange: '[month] 2026  - [month] 2026',
  paragraphs: [
    'In the world of high-tier global operations, the bridge between elite service and digital innovation is where true scale happens. Silverbell Group, a leader known for its professional excellence and international reach, has joined forces with Coldi.ai in a strategic partnership designed to showcase the future of AI-driven business support.',
    'To launch this synergy, Coldi.ai provided Silverbell Group with a full-scale integration of our flagship AI solution as a collaborative gesture, aiming to streamline their customer experience and explore new operational frontiers.',
  ],
};

export const tocItems = [
  {
    id: 'engagement-snapshot',
    title: 'Engagement Snapshot',
    description: 'The client, the challenge, and what we set out to fix',
  },
  {
    id: 'implementation',
    title: 'How The Implementation Went',
    description: 'Our phased rollout, from kickoff to the first live call',
  },
  {
    id: 'integrated',
    title: 'What Coldi Integrated',
    description: 'The systems, channels, and workflows we connected',
  },
  {
    id: 'issues',
    title: 'Issues Found and Fixed',
    description: 'Edge cases we caught and resolved before they reached callers',
  },
  {
    id: 'monitoring',
    title: 'Proactive Monitoring & Compliance Engineering',
    description: 'Keeping the agent reliable, secure, and audit-ready',
  },
  {
    id: 'results',
    title: 'Results to Date',
    description: 'Measurable impact since Coldi went live',
  },
] as const;

export const snapshotCards = Array.from({ length: 8 }, () => ({
  value: 'Data',
  label: 'Data missing',
}));

export const implementationPhases = [
  {
    title: 'July 2026',
    subtitle: '(Phase 1 Rollout)',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum',
  },
  {
    title: 'August 2026',
    subtitle: '(Phase 2 Optimization)',
    text: 'Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum',
  },
];

export const integratedItems = [
  'Integrated the AI Agent directly into the "Chat with an Online Representative" portal on the Silverbell website.',
  '24/7 digital extension offering round-the-clock coverage during nights, weekends, and holidays.',
  'Proactive appointment setting: programmed to request company name and direct contact information (phone/email) in every interaction.',
  "Instant expert knowledge base: pre-loaded with Silverbell's specific industry expertise to handle global clientele queries.",
];

export const operationalFlowImage = {
  desktop: '/images/silverbellgroup/flow-desktop.png',
  mobile: '/images/silverbellgroup/flow-mobile.png',
  alt: 'Operational Flow',
};

export const scriptAdjustments = [
  {
    label: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    value: 'Lorem ipsum Lorem ipsum Lorem ipsum',
  },
  {
    label: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    value: 'Lorem ipsum Lorem ipsum Lorem ipsum',
  },
  {
    label: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    value: 'Lorem ipsum Lorem ipsum Lorem ipsum',
  },
];

export const issueColumns = [
  {
    title: 'Software',
    desktop: '/images/silverbellgroup/issue-software-desktop.png',
    mobile: '/images/silverbellgroup/issue-software-mobile.png',
  },
  {
    title: 'Infrastructure',
    desktop: '/images/silverbellgroup/issue-infrastructure-desktop.png',
    mobile: '/images/silverbellgroup/issue-infrastructure-mobile.png',
  },
  {
    title: 'Compliance',
    desktop: '/images/silverbellgroup/issue-compliance-desktop.png',
    mobile: '/images/silverbellgroup/issue-compliance-mobile.png',
  },
];

export const monitoringItems = [
  {
    label: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    value: 'Lorem ipsum Lorem ipsum Lorem ipsum',
  },
  {
    label: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    value: 'Lorem ipsum Lorem ipsum Lorem ipsum',
  },
  {
    label: 'Lorem ipsum Lorem ipsum Lorem ipsum',
    value: 'Lorem ipsum Lorem ipsum Lorem ipsum',
  },
];

export const resultsMetrics = [
  { value: '100', label: 'calls daily', highlight: true },
  { value: '75', label: 'hours saved weekly', highlight: false },
  { value: '45%', label: 'conversion boost', highlight: false },
  { value: '100500', label: 'clients happy', highlight: false },
];

export const ctaContent = {
  title: 'Ready to automate your workflows?',
  text: 'See what we can build for your team.',
  button: 'Book a Demo',
  href: '/calendar',
};
