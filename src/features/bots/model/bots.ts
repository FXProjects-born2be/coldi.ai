import type { BotPreview } from './types';

export const getBots = (): BotPreview[] => [
  {
    videoUrl: '/videos/voices/variant-1.mp4',
    name: 'Insurance',
    text: 'Needs check & offer <br/>optimization',
    btnVariant: 'primary',
    audioUrl: '/audio/insurance.wav',
  },
  {
    videoUrl: '/videos/voices/variant-2.mp4',
    name: 'Survey',
    text: 'Social media habits & usage <br/>data collection',
    btnVariant: 'secondary',
    audioUrl: '/audio/survey.wav',
  },
  {
    videoUrl: '/videos/voices/variant-3.mp4',
    name: 'Investment',
    text: 'Interest confirmation <br/>& proposal call',
    btnVariant: 'success',
    audioUrl: '/audio/investment.wav',
  },
];
