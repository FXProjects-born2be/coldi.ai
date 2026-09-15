import type { CaseStudyContent, HeroContent } from '@/app/[locale]/silverbellgroup/components/data';

export const heroContent: HeroContent = {
  titleLine1: 'Clarity Global:',
  titleLine2: 'Automating compliance',
  subtitle:
    'How Clarity Global is eliminating manual follow-up work across hundreds of client reviews and cutting response lag to zero.',
  reportingLabel: 'Reporting Period:',
  reportingRange: 'Ongoing',
  paragraphs: [
    'Clarity Global is a Canadian fintech that provides advanced payment infrastructure to global businesses. Their core offering includes multi-currency IBANs, global payments, foreign exchange, and on/off-ramp.',
    "With hundreds of B2B clients and strict regulatory obligations on every side, compliance isn't a checkbox for them. It's a core part of how the business runs.",
  ],
};

const tocItems = [
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
];

export const caseStudyContent: CaseStudyContent = {
  tocItems,
  snapshotIcon: '/images/silverbellgroup/icon-data-transfer.svg',
  snapshotCards: [
    { value: '6 mo', label: 'Compliance review cycle' },
    { value: '24/7', label: 'Inbound coverage' },
    { value: '0', label: 'Wait times' },
    { value: '7 days', label: 'Reminder interval' },
    { value: '3', label: 'Response categories' },
    { value: '100s', label: 'Clients per cycle' },
    { value: 'AI', label: 'Live support agent' },
    { value: 'Full', label: 'Audit trail' },
  ],
  implementationPhases: [
    {
      title: 'Phase 1',
      subtitle: '(Compliance reviews)',
      text: 'We deployed an AI outbound calling agent that handles every step of the six-month periodic compliance review cycle, from first contact to final report, without any manual input from the Clarity Global team.',
    },
    {
      title: 'Phase 2',
      subtitle: '(Live support)',
      text: "Any user visiting Clarity Global's website can now reach a live AI support agent by calling +1 236 309 2666. The agent handles inbound queries around the clock — no wait times, no staff availability required.",
    },
  ],
  integratedIcon: '/images/silverbellgroup/icon-ai-magic.svg',
  integratedItems: [
    'Automatic CRM-based classification into corporate and individual, with separate approved message scripts per type.',
    'Reminders fire at precise 7-day intervals with per-client tracking of send dates and response status.',
    'Incoming emails are analysed and sorted into three defined categories automatically, with results saved for reporting.',
    'Change-declaration emails are sent to the compliance department the moment a client response is classified.',
    'Structured reports are auto-generated each cycle, covering all three client outcome categories with full per-client data.',
    'Every outbound message, client reply, AI classification, and compliance notification is stored with timestamps.',
  ],
  operationalFlowImage: {
    desktop: '/images/clarity-global/aboutVisual-desktop.svg',
    mobile: '/images/clarity-global/aboutVisual-mobile.svg',
    alt: 'Clarity Global operational flow',
  },
  scriptAdjustmentsLabel: 'Qualification flow:',
  scriptAdjustments: [
    {
      label: 'Account',
      value: 'Existing account or new registration?',
    },
    {
      label: 'Payment details',
      value: 'Business or personal payment solutions?',
    },
    {
      label: 'Country & industry',
      value: 'Country of operation, industry, and estimated transaction volume.',
    },
  ],
  issueColumns: [
    {
      title: 'Manual outreach',
      desktop: '/images/silverbellgroup/issue-software-desktop.png',
      mobile: '/images/silverbellgroup/issue-software-mobile.png',
    },
    {
      title: 'Unstructured follow-ups',
      desktop: '/images/silverbellgroup/issue-infrastructure-desktop.png',
      mobile: '/images/silverbellgroup/issue-infrastructure-mobile.png',
    },
    {
      title: 'No audit trail',
      desktop: '/images/silverbellgroup/issue-compliance-desktop.png',
      mobile: '/images/silverbellgroup/issue-compliance-mobile.png',
    },
  ],
  monitoringItems: [
    {
      label: '24/7 inbound coverage',
      value:
        'Around-the-clock phone coverage for any global inquiry without extra staff or night shifts.',
    },
    {
      label: 'Reduced human load',
      value:
        'First-tier queries are resolved automatically so only critical escalations reach human agents.',
    },
    {
      label: 'Smart routing',
      value:
        "Automatically identifies existing clients' queries and routes the call to the right support channel.",
    },
  ],
  resultsBg: '/images/silverbellgroup/results-bg.jpg',
  resultsMetrics: [
    { value: '24/7', label: 'inbound coverage', highlight: true },
    { value: '0', label: 'wait times', highlight: false },
    { value: '6 mo', label: 'review cycle automated', highlight: false },
    { value: '100%', label: 'audit trail coverage', highlight: false },
  ],
  cta: {
    title: 'Ready to automate your compliance workflows?',
    text: 'See what we can build for your team.',
    button: 'Book a Demo',
    href: '/calendar',
  },
};
