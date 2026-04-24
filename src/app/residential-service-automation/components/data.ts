import type { ButtonVariants } from '@/shared/ui/kit/button';

export type ProcessSection = {
  label: string;
  number: string;
  title: string;
  description: string;
  variant: 'triage' | 'capture' | 'scheduling' | 'summary';
  items?: {
    title: string;
    description: string;
  }[];
  desktopImage?: string;
  mobileImage?: string;
};

export type AudioScenario = {
  title: string;
  description: string;
  audioUrl: string;
  buttonVariant: ButtonVariants;
  videoUrl: string;
};

export const heroContent = {
  label: 'Case Study',
  title: 'Residential Service Automation',
  paragraphs: ['See how we helped Stone Electric Company grow with AI voice agents.'],
};

export const processSections: ProcessSection[] = [
  {
    label: 'Intent Detection',
    number: '01',
    title: 'Initial Screening & Triage',
    description:
      'Every interaction begins with immediate intent recognition. The AI agent, George, first identifies if the situation is an emergency. If so, it performs a quick ZIP check and instantly transfers the caller to a live electrician. For standard inquiries, George validates the service area via ZIP code, ensuring only qualified leads from within the operational territory proceed.',
    variant: 'triage',
    desktopImage: '/images/residential-service-automation/triage.png',
    mobileImage: '/images/residential-service-automation/triage-mobile.png',
  },
  {
    label: 'Data Capture',
    number: '02',
    title: 'Data Collection & Intelligent Engagement',
    description:
      'Once a location is confirmed, the system seamlessly transitions to data gathering, capturing essential details like address, phone number, and name. During this phase, George is designed to handle transparency and human-centric requests. If a user asks about his AI identity or requests a human operator, the system triggers a soft transfer or retention script to maintain trust while keeping the booking process on track.',
    variant: 'capture',
    desktopImage: '/images/residential-service-automation/capture.png',
    mobileImage: '/images/residential-service-automation/capture-mobile.png',
  },
  {
    label: 'Full Automation',
    number: '03',
    title: 'Dynamic Scheduling & Finalization',
    description:
      'The final stage focuses on conversion through smart scheduling. George offers specific time slots based on real-time availability. If the first option does not fit, he provides alternatives until a match is found. The process concludes with a final confirmation, where all details are summarized and the booking is locked in, providing a frictionless experience from the first ring to a confirmed appointment.',
    variant: 'scheduling',
    desktopImage: '/images/residential-service-automation/scheduling.png',
    mobileImage: '/images/residential-service-automation/scheduling-mobile.png',
  },
  {
    label: 'Referral Fit',
    number: '04',
    title: 'End-to-End Operational Flow',
    description:
      'This system acts as a 24/7 front-line dispatcher for electrical and emergency networks, designed to automate the entire lifecycle of an inbound inquiry.',
    variant: 'summary',
    items: [
      {
        title: 'Intelligent Dispatching',
        description:
          'The AI identifies the caller’s specific issue and triggers immediate transfers to live technicians for emergencies.',
      },
      {
        title: 'Seamless Tech Stack',
        description: 'Integrated via Twilio for high-fidelity voice routing and SMS notifications.',
      },
      {
        title: 'Real-Time Scheduling',
        description:
          'Deep integration with Housecall Pro allows the AI to check live availability and book jobs directly into the electrician’s calendar according to the service area.',
      },
      {
        title: 'Post-Call Automation',
        description:
          'The system sends an instant SMS confirmation to the customer and a comprehensive lead summary to the office manager.',
      },
    ],
  },
];

export const audioScenarios: AudioScenario[] = [
  {
    title: 'Complex Project Scoping',
    description:
      'In this call, the AI manages a detailed request for a deck renovation, collecting specific requirements for outlets and lighting while validating the service area.',
    audioUrl: '/audio/electric-1.wav',
    buttonVariant: 'primary',
    videoUrl: '/videos/voices/variant-1.mp4',
  },
  {
    title: 'Standard Quote & Appointment Booking',
    description:
      'Watch how the agent handles a common inquiry for an outdoor outlet, explains the installation process, and syncs directly with the calendar for an onsite estimate.',
    audioUrl: '/audio/electric-2.wav',
    buttonVariant: 'secondary',
    videoUrl: '/videos/voices/variant-2.mp4',
  },
];
