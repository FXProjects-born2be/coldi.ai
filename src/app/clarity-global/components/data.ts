export const heroContent = {
  label: 'Case Study',
  title: 'Clarity Global: Automating compliance',
  description:
    'How Clarity Global is eliminating manual follow-up work across hundreds of client reviews and cutting response lag to zero.',
};

export const aboutSection = {
  number: '01',
  title: 'About Clarity Global',
  description:
    'Clarity Global is a Canadian fintech that provides advanced payment infrastructure to global businesses.',
  offeringsHeading: 'Their core offering includes:',
  offerings: [
    'Multi-currency IBANs',
    'Global Payments',
    'Foreign Exchange',
    'On/Off-Ramp',
    'On/Off-Ramp',
  ],
  conclusion:
    "With hundreds of B2B clients and strict regulatory obligations on every side, compliance isn't a checkbox for them. It's a core part of how the business runs.",
};

export const needSection = {
  label: 'The need',
  number: '02',
  title: 'Why a fintech company needed AI agents',
  description:
    'Operating in regulated markets means Clarity Global runs mandatory periodic compliance reviews for every client in their portfolio every six months, without exception.',
  paragraphs: [
    'Each cycle involves reaching out to hundreds of clients, gathering confirmations or change declarations, notifying internal compliance teams, and maintaining a full audit trail. Done manually, this is a repetitive, time-consuming process with significant room for human error.',
    'As their client base grows, the compliance team faces a familiar scaling problem: the volume of work increases faster than headcount. Reminders get missed. Response tracking is inconsistent. Monthly reporting consumes hours that could be spent on higher-value tasks.',
    'And any delay in flagging a "changes reported" response to the compliance department introduces regulatory risk.',
    'They need a system that can handle the entire communication lifecycle autonomously, reaching out, reminding, classifying responses, escalating when needed, and reporting, with zero manual intervention.',
  ],
  automationSteps: ['communication', 'reaching out', 'reminding', 'escalating', 'reporting'],
};

export const challengeSection = {
  label: 'The challenge',
  number: '03',
  title: "A compliance process that doesn't scale",
  description: 'Pain points before working with us:',
  items: [
    {
      title: 'Manual & Unsegmented Outreach',
      description:
        'Manual outreach to hundreds of clients every six months, with no automated segmentation between corporate and individual clients',
    },
    {
      title: 'Unstructured Follow-Ups',
      description: 'No structured reminder system, follow-ups rely on team memory and spreadsheets',
    },
    {
      title: 'Slow Response Classification',
      description: 'Response classification done by hand, introducing delays and inconsistency',
    },
    {
      title: 'Manual Compliance Risks',
      description:
        'Compliance department notifications triggered manually, risking lag on high-priority "changes reported" cases',
    },
    {
      title: 'Time-Consuming Reporting',
      description:
        'Monthly reporting built from scratch each cycle, consuming several hours of staff time',
    },
    {
      title: 'No Centralized Audit Trail',
      description:
        'No centralised audit trail for outbound messages, client responses, and internal notifications',
    },
  ],
};

export const deliveredSection = {
  number: '04',
  title: 'What was delivered',
  description:
    'We deployed an AI outbound calling agent that handles every step of the six-month periodic compliance review cycle, from first contact to final report, without any manual input from the Clarity Global team.',
  items: [
    {
      icon: 'user',
      title: 'Client segmentation & routing',
      description:
        'Automatic CRM-based classification into corporate and individual, with separate approved message scripts per type.',
    },
    {
      icon: 'automation',
      title: '3-stage reminder automation',
      description:
        'Reminders fire at precise 7-day intervals with per-client tracking of send dates and response status.',
    },
    {
      icon: 'ai',
      title: 'AI response classification',
      description:
        'Incoming emails are analysed and sorted into three defined categories automatically, with results saved for reporting.',
    },
    {
      icon: 'notification',
      title: 'Instant compliance notifications',
      description:
        'Change-declaration emails are sent to the compliance department the moment a client response is classified.',
    },
    {
      icon: 'reporting',
      title: 'Automated monthly reporting',
      description:
        'Structured reports are auto-generated each cycle, covering all three client outcome categories with full per-client data.',
    },
    {
      icon: 'audit',
      title: 'Full audit trail',
      description:
        'Every outbound message, client reply, AI classification, and compliance notification is stored with timestamps.',
    },
  ],
} as const;

export const liveSupportSection = {
  number: '05',
  title: 'AI Live Support Agent',
  description:
    "Any user visiting Clarity Global's website can now reach a live AI support agent by calling +1 236 309 2666. The agent handles inbound queries around the clock — no wait times, no staff availability required.",
  intro: 'For new users, the agent runs a short qualification flow:',
  bullets: [
    'Existing account or new registration?',
    'Business or personal payment solutions?',
    'Country of operation',
    'Industry',
    'Estimated transaction volume',
  ],
  flowLabel: 'Qualification flow',
  flowSteps: [
    'Account',
    'Payment details',
    'Country of operation',
    'Industry',
    'Transaction volume',
  ],
};

export const supportSection = {
  number: '06',
  title: 'Solving Support Bottlenecks:\nThe AI Live Support Agent',
  description:
    'Scaling human support to provide 24/7 coverage is costly and often leads to staff burnout from handling repetitive tier-1 queries.\n\nTo solve exactly that we developed our AI Live Support Agent (+1 236 309 2666) to streamline their operations and deliver immediate operational benefits:',
  benefitCards: [
    {
      title: '24/7 Inbound Coverage',
      description:
        'Provides immediate, around-the-clock phone coverage for any global inquiry without requiring extra staff availability or night shifts. By eliminating traditional queue times entirely, it ensures that every website visitor is greeted instantly, significantly improving the user experience and preventing potential leads from dropping off due to long delays.',
    },
    {
      title: 'Reduced Human Load',
      description:
        'Operates as the frontline defense by successfully resolving repetitive first-tier queries and filtering out routine administrative questions. This automation absorbs the bulk of the daily ticket volume, drastically lifting the operational burden from your staff and ensuring that only highly critical or complex escalations ever reach human support agents.',
    },
  ],
  qualificationTitle: 'Instant Visitor Qualification',
  qualificationDescription:
    'Explains services to new website visitors and screens them through a brief, automated flow to capture essential data:',
  qualificationBullets: [
    'Existing account or new registration?',
    'Business or personal payment solutions?',
    'Country of operation',
    'Industry',
    'Estimated transaction volume',
    'Once qualified, the user instantly receives a direct registration link to get started.',
  ],
  routingTitle: 'Smart Routing for Clients',
  routingDescription:
    "Automatically identifies the nature of existing clients' queries and routes the call to the right support channel.",
};

export const closingSection = {
  title: 'Ready to automate your compliance workflows?',
  description: 'See what we can build for your team.',
  ctaLabel: 'Book a demo with us.',
  ctaHref: '/calendar',
};
