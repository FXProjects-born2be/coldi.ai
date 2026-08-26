export type StudyItem = {
  title: string;
  description?: string;
  points?: string[];
};

export type StudySection = {
  label: string;
  number: string;
  title: string;
  description?: string;
  variant: 'challenge' | 'solution' | 'results' | 'drivers';
  items: StudyItem[];
};

export const overview = {
  label: 'Case Study',
  title: 'Helios - Scaling Performance & Slashing Operational Costs with Conversational AI',
  description:
    'Helios, a leading firm in the FX (<a href="/industries/fx-brokers">Foreign Exchange</a>) industry with a global footprint, faced the challenge of scaling their sales operations while keeping fixed costs under control. By integrating our AI solution, they reduced their human sales force by 64% while quintupling call volume and maintaining a steady conversion rate.',
};

export const studySections: StudySection[] = [
  {
    label: 'The Challenge',
    number: '01',
    title: 'The "Fixed Cost" Ceiling',
    description:
      'Before partnering with us, Helios operated under a traditional, labor-intensive sales model:',
    variant: 'challenge',
    items: [
      {
        title: 'Sales Force',
        description:
          '70 sales representatives covering English-speaking regions (US, CA, UK, AU, SA, EU).',
      },
      {
        title: 'Workload',
        description: 'Each agent was making 300-350 manual calls per day.',
      },
      {
        title: 'The Problem',
        description:
          "The CEO identified that salaries, office space, hardware (PCs), and VoIP infrastructure created a massive fixed cost that didn't fluctuate with profit.",
      },
      {
        title: 'Critical Metric',
        description:
          'The operational cost per FTD (First Time Deposit) stood at $220 USD. "I have 70 sales reps who get paid regardless of the profit I make. For every rep, I need an office, a PC, and technical support. It is a massive overhead." - CEO, Helios.',
      },
    ],
  },
  {
    label: 'The Solution',
    number: '02',
    title: 'High-Availability AI Integration',
    description:
      'We implemented a strategic two-phase transition to shift the heavy lifting from humans to our AI:',
    variant: 'solution',
    items: [
      {
        title: 'Phase 1: Cold Lead Automation',
        description:
          'We launched the initial cold flow within 1.5 months, establishing the framework for automated dialing and lead qualification.',
      },
      {
        title: 'Phase 2: Hot Lead Optimization',
        description: 'In just 2 weeks, we reconfigured the workflow for high-intent leads:',
      },
      {
        title: 'Real-Time CRM Integration',
        description:
          'We replaced manual lists (CSV/Excel) with a direct integration. The AI recognizes a "hot lead" the moment it enters the CRM and calls it immediately.',
      },
      {
        title: 'Smart Qualification',
        description:
          "The AI handles the initial filtering (age, income, restrictions). If a lead does not meet the criteria, the AI closes the ticket without wasting a human agent's time.",
      },
      {
        title: 'Live Transfers',
        description:
          'Only fully qualified, interested leads are transferred to the remaining human closing team.',
      },
    ],
  },
  {
    label: 'Results',
    number: '03',
    title: 'Results That Matter',
    description:
      'The transition allowed Helios to transform its cost structure from a heavy fixed burden to an efficient, variable model.',
    variant: 'results',
    items: [
      {
        title: 'Cost Efficiency',
        points: ['Reduced cost per lead from $220 to $160', '-27% operational cost'],
      },
      {
        title: 'Team Optimization',
        points: ['Reduced team size from 70 to 25 agents', '-64% overhead'],
      },
      {
        title: 'Scalability',
        points: ['Increased call volume from 30K to 150K minutes', '5x growth'],
      },
      {
        title: 'Availability',
        points: ['From limited shifts to 24/7 / 365 coverage'],
      },
      {
        title: 'Performance Stability',
        points: ['Conversion Rate maintained at 10% despite scaling'],
      },
    ],
  },
  {
    label: 'Key Drivers',
    number: '04',
    title: 'Why It Worked',
    variant: 'drivers',
    items: [
      {
        title: 'Instant Speed to Lead',
        description:
          'The AI contacts the lead the second they register, eliminating the "lead decay" that occurs with manual dialing.',
      },
      {
        title: 'Unlimited Scalability',
        description:
          'Helios grew from 30k to 150k minutes in one year without hiring a single new employee.',
      },
      {
        title: 'Zero "Noise"',
        description:
          'The remaining 25 agents now only speak with prospects who have already been vetted and are ready to talk, eliminating burnout from bad leads.',
      },
      {
        title: 'Operational Peace of Mind',
        description:
          'Reduced the "headache" of managing a large workforce, office logistics, and technical churn.',
      },
    ],
  },
];

export const nextSteps = {
  label: 'The Road Ahead',
  title: 'Next Steps',
  description: 'Our partnership with Helios continues to push the boundaries of AI in Fintech:',
  items: [
    {
      title: 'QC Dash',
      description:
        'We are currently developing a Quality Control Dashboard that uses AI to audit and grade the calls made by the human sales team.',
      icon: '/images/use-cases/next-step-qc.svg',
      alt: 'Quality control dashboard icon',
    },
    {
      title: 'Increased Volume',
      description:
        'Continuous expansion of minutes to dominate additional English-speaking market segments.',
      icon: '/images/use-cases/next-step-trend.svg',
      alt: 'Growth icon',
    },
    {
      title: 'Refined Logic',
      description:
        'Constantly adjusting scripts based on the performance of top-tier human closers to ensure the AI remains indistinguishable from a top producer.',
      icon: '/images/use-cases/next-step-brain.svg',
      alt: 'AI refinement icon',
    },
  ],
};
