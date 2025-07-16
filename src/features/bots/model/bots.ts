import type { BotPreview } from './types';

export const getBots = (): BotPreview[] => [
  {
    videoUrl: '/videos/voices/variant-1.mp4',
    name: 'B2B Services',
    text: 'Lead qualification & callback setup',
    btnVariant: 'primary',
  },
  {
    videoUrl: '/videos/voices/variant-2.mp4',
    name: 'E-commerce',
    text: 'Cart recovery with objection handling',
    btnVariant: 'secondary',
  },
  {
    videoUrl: '/videos/voices/variant-3.mp4',
    name: 'Finance',
    text: 'Loan interest confirmation & upsell',
    btnVariant: 'success',
  },
];
