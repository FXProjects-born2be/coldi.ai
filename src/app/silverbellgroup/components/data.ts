export type StudyItem = {
  title: string;
  description: string;
};

export type StudySection = {
  label?: string;
  number: string;
  title: string;
  description?: string;
  variant: 'diagram' | 'three' | 'video';
  items?: StudyItem[];
  videoId?: string;
};

export const heroContent = {
  label: 'Case Study',
  title: 'Strategic Partnership Case Study:\nSilverbell Group & Coldi.ai',
  paragraphs: [
    'In the world of high-tier global operations, the bridge between elite service and digital innovation is where true scale happens. Silverbell Group, a leader known for its professional excellence and international reach, has joined forces with Coldi.ai in a strategic partnership designed to showcase the future of AI-driven business support.',
    'To launch this synergy, Coldi.ai provided Silverbell Group with a full-scale integration of our flagship AI solution as a collaborative gesture, aiming to streamline their customer experience and explore new operational frontiers.',
  ],
};

export const studySections: StudySection[] = [
  {
    label: 'The Vision',
    number: '01',
    title: 'Supporting Excellence',
    description:
      'Silverbell Group is synonymous with high-tier service. To complement their existing professional team, Coldi.ai deployed a custom-built Autonomous AI Agent. This agent was not designed to replace the human element, but to act as a 24/7 digital extension of their expertise, ensuring that the Silverbell brand is always active, regardless of time zones or office hours.',
    variant: 'diagram',
  },
  {
    label: 'The Solution',
    number: '02',
    title: 'A Seamless Integration',
    description:
      'We integrated the AI Agent directly into the "Chat with an Online Representative" portal on the Silverbell website. This was not a generic chatbot implementation, but a specialized "Extra Mile" employee focused on:',
    variant: 'three',
    items: [
      {
        title: 'Round-the-Clock Coverage',
        description:
          'The AI effectively works "overtime," providing consistent support during nights, weekends, and holidays.',
      },
      {
        title: 'Proactive Appointment Setting',
        description:
          'To ensure no business opportunity is missed, the agent is programmed to professionally request the company name and direct contact information (phone/email) in every interaction.',
      },
      {
        title: 'Instant Expert Knowledge',
        description:
          'The agent arrived "pre-loaded" with Silverbell\'s specific industry expertise, allowing it to provide immediate, high-quality responses to a global clientele.',
      },
    ],
  },
  {
    number: '03',
    title: 'Watch AI Bot in Action.',
    variant: 'video',
    videoId: '2BtXNjpLgVg',
  },
  {
    label: 'Referral Fit',
    number: '04',
    title: 'Why We Are the Perfect Fit for Referrals',
    description:
      'As partners, our collaboration with Silverbell Group serves as a blueprint for how we treat every integration. We specialize in creating high-impact, "Plug-and-Play" solutions where Coldi.ai handles the heavy lifting of support and technical integration.',
    variant: 'three',
    items: [
      {
        title: 'Commitment to Quality',
        description:
          "We apply the same level of precision and care to our partners' referrals as we did for the Silverbell integration.",
      },
      {
        title: 'Ease of Use',
        description:
          'We transform complex AI technology into a simple, ready-to-use tool for any business.',
      },
      {
        title: 'Streamlined Success',
        description:
          'Our goal is to enhance relationships by providing a seamless, automated flow for customers.',
      },
    ],
  },
];
