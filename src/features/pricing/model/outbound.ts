import type { Package } from './types';

export const getOutbound = (): Package[] => [
  {
    label: 'Outbound calls',
    title: 'Pay-As-You-Go Campaigns',
    description:
      'Ideal for outbound or inbound calling campaigns, this option gives you full access to Coldi’s end-to-end setup and campaign management - tailored for scale.',
    price: '$0.40<span>/per minute</span>',
    features: [
      'Script writing and collaborative development with your team',
      'Full campaign strategy and agent training',
      'A/B testing for message performance and conversion rates',
      'CRM and telephony system integrations',
      'Option to use Coldi’s global telephony or your own provider',
      'Multi-agent routing logic',
      'Campaign analytics and reporting dashboards',
      'Real-time call routing to your team when needed',
      'Call recording, transcription, and insights',
      'All implementation and configuration handled by Coldi',
      'Unlimited concurrent calls - scale up to thousands of simultaneous connections',
      'Ideal for lead generation, surveys, outreach, and more',
    ],
  },
  {
    label: 'Outbound calls',
    title: 'Enterprise & Custom Solutions',
    description:
      'For larger organizations or regulated industries, Coldi offers custom solutions tailored to specific technical, legal, and performance requirements.',
    price: 'Custom Quote',
    features: [
      'Dedicated technical and strategy team',
      'Multi-language agents with localization options',
      'Compliance-ready implementations (HIPAA, GDPR, TCPA)',
      'Sophisticated routing, escalation, and fallback logic',
      'Deep integrations with internal or proprietary systems',
      'Global telephony provisioning and management',
      'Unlimited concurrent calls for inbound and outbound operations',
      'SLAs, onboarding programs, and enterprise-level support',
      'Ongoing optimization, monitoring, and analytics',
      'Available training for in-house teams and IT departments',
    ],
  },
];
