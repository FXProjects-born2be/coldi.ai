import type { Package } from './types';

export const getInbound = (): Package[] => [
  {
    label: 'Inbond calls',
    title: 'Ready-Made Booking Agent',
    description:
      'Pick from Coldi’s library of pre-built agent personalities. Launch instantly with a proven script and voice configuration - perfect for fast setups and smaller teams.',
    price: '$299<span>/month</span>',
    features: [
      'Pre-built agent characters ',
      'Handles incoming calls and sets appointments',
      'Integration with your calendar',
      'Use of your own telephony system or Coldi’s global infrastructure',
      'Instant deployment with minimal configuration',
      'Basic usage analytics',
      'One concurrent call per agent license',
      'No script edits or customization included',
    ],
  },
  {
    label: 'Inbond calls',
    title: 'Fully Managed Inbound Agent',
    description:
      'A custom-built AI voice agent that handles incoming calls for your business. Coldi’s team manages the entire setup and ongoing performance - from script creation to live transfers.',
    price: '$499<span>/month</span>',
    features: [
      'Custom-built voice agent tailored to your business',
      'Personalized script creation by our conversational experts',
      'Appointment scheduling and calendar integration',
      'Real-time call transfers to your live agents',
      'Integration with your existing phone system or use of Coldi’s global telephony network',
      'CRM and third-party tool integrations',
      'A/B testing and optimization of call flows',
      'Analytics dashboard with real-time performance insights',
      'Call summaries and transcripts',
      'Full onboarding, setup, and ongoing support handled by our team',
      'One concurrent call per agent license',
      'One concurrent call per agent license',
    ],
  },
];
