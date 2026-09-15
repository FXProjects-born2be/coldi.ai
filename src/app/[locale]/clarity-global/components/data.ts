import type { CaseStudyContent, HeroContent } from '@/app/[locale]/silverbellgroup/components/data';

export const heroContent: HeroContent = {
  titleLine1: 'Clarity Global:',
  titleLine2: 'Automating compliance',
  subtitle:
    'How Clarity Global Eliminates Manual Follow-Up Work Across Hundreds of Client Reviews and Cuts Response Lag to Zero ',
  reportingLabel: 'Reporting Period:',
  reportingRange: '[month] 2026  - [month] 2026',
  paragraphs: [
    "Clarity Global is a Canadian fintech that provides advanced payment infrastructure to global businesses. With hundreds of B2B clients and strict regulatory obligations on every side, compliance isn't a checkbox for them. It's a core part of how the business runs. By deploying an outbound AI review workflow alongside a 24/7 inbound AI Live Support Agent, Clarity Global eliminated manual outreach delays, automated response classification, and removed operational bottlenecks for their compliance and support teams.",
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
    { value: 'Data', label: 'Data missing' },
    { value: 'Data', label: 'Data missing' },
    { value: 'Data', label: 'Data missing' },
    { value: 'Data', label: 'Data missing' },
    { value: 'Data', label: 'Data missing' },
    { value: 'Data', label: 'Data missing' },
    { value: 'Data', label: 'Data missing' },
    { value: 'Data', label: 'Data missing' },
  ],
  implementationPhases: [
    {
      title: 'July 2026',
      subtitle: '(Phase 1 Rollout)  ',
      text: 'Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum',
    },
    {
      title: 'August 2026',
      subtitle: '(Phase 2 Optimization)',
      text: 'Lorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsumLorem ipsum Lorem ipsum Lorem ipsum',
    },
  ],
  integratedIcon: '/images/silverbellgroup/icon-ai-magic.svg',
  integratedItems: [
    '<strong>Client Segmentation & Routing:</strong> CRM-based automatic classification into corporate and individual accounts with distinct approved message scripts per category.',
    '<strong>3-Stage Reminder Automation:</strong> System schedules and fires follow-up reminders at exact 7-day intervals with real-time send date and status tracking per client.',
    '<strong>AI Response Classification:</strong> Autonomous analysis and categorization of incoming client emails into three defined categories, updating reports automatically.',
    '<strong>Instant Compliance Escalation:</strong> Real-time trigger system that instantly notifies the compliance department upon detecting a high-priority "changes reported" response.',
    '<strong>Automated Monthly Reporting:</strong> System auto-generates audit-ready reports covering all outcome categories and individual client details.',
    '<strong>Centralized Audit Trail Log:</strong> Timestamped storage of every outbound message, client reply, AI classification, and internal compliance alert.',
    '<strong>24/7 AI Live Support Agent (+1 236 309 2666):</strong> Inbound phone automation providing immediate coverage, client qualification, and smart query routing to appropriate support channels.',
  ],
  operationalFlowImage: null,
  scriptAdjustmentsLabel: 'Script Adjustments:',
  scriptAdjustments: [
    {
      label: 'Audience-Specific Messaging',
      value:
        'Configured separate, approved prompt templates and message scripts for Corporate Clients vs. Individual Clients during outreach.',
    },
    {
      label: 'Inbound Lead Qualification Flow',
      value:
        'Programmed interactive script logic to collect five critical data points from new visitors:',
      list: [
        'Existing account vs. new registration status',
        'Business vs. personal payment solutions',
        'Country of operation',
        'Industry sector',
        'Estimated transaction volume',
      ],
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
      label: 'Complete Audit Trail:',
      value:
        'Every single outbound communication, incoming client response, AI classification decision, and internal notification is stored with immutable timestamps for regulatory compliance.',
    },
    {
      label: 'Strict Escalation SLA:',
      value:
        'Automatic instant routing of change-declaration flags directly to compliance officers, eliminating human delay on high-risk accounts.',
    },
  ],
  resultsBg: '/images/silverbellgroup/results-bg.jpg',
  resultsMetrics: [
    {
      value: '24/7',
      subtitle: 'Front-Line Dispatching Established',
      label: 'Across all residential electrical and emergency response inquiries.',
      highlight: true,
    },
    {
      value: '100%',
      subtitle: 'Inbound Booking Lifecycle Automated',
      label: 'From initial ring and intent triage to confirmed calendar appointment.',
      highlight: false,
    },
    {
      value: '0 Min',
      subtitle: 'Manual Scheduling Delays',
      label: 'By syncing live quotes and time slots directly into Housecall Pro.',
      highlight: false,
    },
    {
      value: '100%',
      subtitle: 'Automated Lead & Scope Capture',
      label: 'Lifting human overhead for routine project estimate intake.',
      highlight: false,
    },
    {
      value: '0 Sec',
      subtitle: 'Automated Lead Qualification',
      label: 'Intent screening, ZIP code validation, and detailed job scoping per call.',
      highlight: false,
    },
    {
      value: '100%',
      subtitle: 'Instant Post-Call Notifications',
      label: 'Instant Post-Call Notifications ',
      highlight: false,
    },
    {
      value: '3 Steps',
      subtitle: 'Automated Lead Qualification',
      label: 'Intent screening, ZIP code validation, and detailed job scoping per call. ',
      highlight: false,
    },
  ],
  cta: {
    title: 'Ready to automate your workflows?',
    text: 'See what we can build for your team.',
  },
};
