export const heroContent = {
  label: 'Case Study',
  title: ['High-Volume Lead Re-engagement Strategy:', 'Transforming Cold Data into SaaS Pipelines'],
  description:
    'In the high-stakes world of SaaS and HVAC services, a lead\'s value diminishes every hour it sits idle. Database decay is a silent killer of ROI, especially when dealing with lists from past expos or "cold" outreach. Coldi AI addresses this challenge through Case Use 3: an automated, high-speed outbound engine designed to reactivate business owners and secure 15-minute software demonstrations.',
};

export type HvacCardSection = {
  number: string;
  title: string;
  description: string;
  variant: 'image' | 'split';
  image?: string;
  items?: {
    title: string;
    description: string;
  }[];
};

export const processSections: HvacCardSection[] = [
  {
    number: '01',
    title: 'The Strategy: Precision at Scale',
    description:
      'The primary objective of this outbound flow is not just to "touch" a lead, but to qualify and convert them with surgical precision. Unlike traditional cold calling, which relies on manual labor and is prone to human fatigue, this AI-driven approach ensures that every single lead in a high-volume list is contacted at the optimal time with a consistent, persuasive message.',
    variant: 'image',
    image: '/images/hvac-leads/the-strategy.svg',
  },
  {
    number: '02',
    title: 'The Tech Stack: Engineering Human Connection',
    description:
      'To bridge the gap between "robotic" automation and human-like rapport, the system utilizes two critical technical pillars:',
    variant: 'split',
    items: [
      {
        title: 'Ultra-Low Latency (<500ms)',
        description:
          'In a sales environment, silence is a deal-killer. By achieving response times under half a second, Coldi AI eliminates the awkward pauses that typically signal a bot. This allows the conversation to flow naturally, accommodating interruptions and rapid-fire questions from busy business owners.',
      },
      {
        title: 'The "Two-Step Objection Rule"',
        description:
          'Cold calling is a game of resistance. Most prospects lead with a reflexive "I’m too busy." The agent is programmed to acknowledge the objection, pivot with a value proposition, and attempt to re-engage. It only concedes after the second firm pushback, ensuring maximum persistence without becoming a nuisance.',
      },
    ],
  },
  {
    number: '03',
    title: 'Visualizing Success: Dashboard Insights',
    description:
      'As seen in the Coldi AI Dashboard, the system provides total transparency over the campaign’s performance:',
    variant: 'split',
    items: [
      {
        title: 'Volume Tracking',
        description:
          'Metrics show the "Number of Calls" (e.g., 67 calls) and "Total Call Minutes" (e.g., 104.09), giving managers a clear view of the agent\'s productivity.',
      },
      {
        title: 'Lead Capture',
        description:
          'The "Performance Summary" tracks new leads captured in real-time. In the provided example, even with a cold list, the campaign has successfully maintained a pool of 27 Total Leads, providing a steady stream of opportunities for the closing team.',
      },
    ],
  },
  {
    number: '04',
    title: 'Workflow & Seamless Integration',
    description:
      "The process is designed to be frictionless for both the prospect and the sales team. The conversation isn't just about talking; it's about data gathering and action.",
    variant: 'split',
    items: [
      {
        title: 'Software Qualification',
        description:
          "During the call, the AI identifies the prospect’s current software stack. This intelligence is fed back into the CRM, allowing for personalized follow-ups even if the demo isn't booked immediately.",
      },
      {
        title: 'Instant SMS Trigger',
        description:
          'The moment a lead expresses interest ("Sure, send me the link"), the AI triggers an automated SMS. This message contains a Calendly link, moving the transaction from a verbal commitment to a digital calendar event in seconds. This "strike while the iron is hot" approach significantly reduces drop-off rates.',
      },
    ],
  },
  {
    number: '05',
    title: 'Conclusion: The Competitive Edge',
    description:
      'For companies in the HVAC and SaaS sectors, the ability to churn through thousands of cold leads to find the "gold" is a massive competitive advantage. By leveraging Case Use 3, businesses can maintain a 24/7 outbound presence that qualifies leads based on their current tech stack and automates the scheduling process. This system effectively removes the "grunt work" from the sales cycle, allowing human account executives to focus exclusively on what they do best: closing high-value demos.',
    variant: 'image',
    image: '/images/hvac-leads/conclusion.svg',
  },
];
