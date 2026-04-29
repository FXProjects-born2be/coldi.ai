export const heroContent = {
  label: 'Case Study',
  title: ['Lead Qualification in the', 'Global Agro-Industry'],
  paragraphs: [
    "In the world of large-scale agricultural infrastructure, a lead isn't just a name in a database, it's a potential multi-million dollar partnership.",
    `When dealing with turnkey projects, livestock facilities, and complex engineering solutions, the cost of a "bad lead" is high. Senior sales managers are your most valuable assets, yet they often find themselves buried under a mountain of unqualified inbound inquiries.`,
    'They spend hours filtering through prospects who lack the budget, authority, or immediate intent to move forward. This is the primary bottleneck of growth in the global agro-industry. To solve it, we’ve developed a specialized AI solution: Sara.',
  ],
};

export type StorySection = {
  title: string;
  paragraphs: string[];
  image: string;
  imageAlt: string;
  reverse?: boolean;
};

export const storySections: StorySection[] = [
  {
    title: 'The Specialist: Introducing Sara',
    paragraphs: [
      'Sara is an AI assistant specifically engineered for the industrial sector. Unlike generic bots, Sara is trained on the intricacies of your product catalog and the nuances of the agricultural market.',
      'She understands that a poultry housing project in Brazil has different requirements than a pig farming facility in Vietnam.',
      'By managing complex inbound inquiries autonomously, Sara acts as a sophisticated digital concierge, ensuring that every caller is greeted with technical expertise and professional poise.',
    ],
    image: '/images/agro-industry/ai-specialist.svg',
    imageAlt: 'Global Agro-Industry Use case',
  },
  {
    title: 'The Workflow: How Sara Qualifies at Scale',
    paragraphs: [
      'The "Industrial Lead Qualification" flow is designed to be rigorous yet seamless, filtering noise while elevating high-value opportunities.',
    ],
    image: '/images/agro-industry/lead-qualification.svg',
    imageAlt: 'Global Agro-Industry Use case',
    reverse: true,
  },
];

export type WorkflowSection = {
  number: string;
  title: string;
  description: string;
  image?: string;
  imageAlt?: string;
  dataCards?: {
    title: string;
    description: string;
  }[];
};

export const workflowSections: WorkflowSection[] = [
  {
    number: '01',
    title: 'Technical Identification & Screening',
    description:
      "The moment an inquiry arrives, Sara takes the lead. She identifies the specific project type, whether it's poultry, pig farming, or grain storage, and begins a deep-dive conversation to understand the prospect's needs. Because she is trained on your specific offerings, she can answer foundational questions and guide the caller through the initial discovery phase.",
    image: '/images/agro-industry/technical-identification.svg',
    imageAlt: 'Global Agro-Industry Use case',
  },
  {
    number: '02',
    title: 'Strategic Data Capture',
    description:
      'While the conversation feels natural, Sara is performing a surgical extraction of structured data. She populates your CRM with critical business intelligence, including:',
    dataCards: [
      {
        title: 'Company Name & Profile',
        description: 'Determining the size and history of the entity.',
      },
      {
        title: 'Project Scope',
        description: 'Identifying the scale of the infrastructure required.',
      },
      {
        title: 'Geography',
        description: 'Mapping out the logistical and regulatory landscape.',
      },
    ],
  },
  {
    number: '03',
    title: 'Intent Analysis',
    description: `Sara doesn't just collect data; she evaluates intent. She is programmed to recognize the "buy signals" that separate a serious investor from a casual researcher. By the end of the interaction, the AI has assigned a qualification score based on your company's unique threshold.`,
    image: '/images/agro-industry/intent-analysis.svg',
    imageAlt: 'Global Agro-Industry Use case',
  },
];

export const closingSections = [
  {
    title: 'The "Transition to Scheduling" Protocol',
    paragraphs: [
      `The most critical moment in any industrial sale is the handoff. If a lead meets the qualification criteria, Sara doesn't simply "pass the buck." She initiates a specialized Transition to Scheduling protocol.`,
      'Instead of a cold transfer that leads to a missed call, Sara gathers the prospect’s best contact times and preferred communication channels.',
      `This ensures that when your senior sales manager receives the lead, they aren't just getting a phone number, they are getting a full brief and a scheduled appointment.`,
    ],
    image: '/images/agro-industry/protocol.svg',
    imageAlt: 'Global Agro-Industry Use case',
    reverse: false,
  },
  {
    title: 'Efficiency Meets Expertise',
    quote: `In industrial sales, time is the only resource you can't manufacture.`,
    paragraphs: [
      'By implementing Sara into your inbound strategy, you ensure that your sales team spends 100% of their time on high-probability projects.',
      'You eliminate the friction of manual screening, professionalize the first point of contact, and build a scalable pipeline that operates 24/7 across every time zone.',
      'Stop chasing leads. Start closing infrastructure. Let Sara qualify the world, so you can build it.',
    ],
    image: '/images/agro-industry/efficiency.svg',
    imageAlt: 'Global Agro-Industry Use case',
    reverse: true,
  },
];
