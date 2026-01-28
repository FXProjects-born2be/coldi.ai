import type { Metadata } from 'next';

import { Hero, ReadyToHear, VoicesList } from './components';

export const metadata: Metadata = {
  title: 'Meet Coldi Voices – Real AI Call Agents in Action',
  description:
    'Explore Coldi’s real AI call agents. Listen to authentic conversations, compare voices, and find the perfect match for your business needs.',
  openGraph: {
    title: 'Meet Coldi Voices – Real AI Call Agents in Action',
    description:
      'Explore Coldi’s real AI call agents. Listen to authentic conversations, compare voices, and find the perfect match for your business needs.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function Voices() {
  return (
    <main>
      <Hero />
      <VoicesList />
      <ReadyToHear />
    </main>
  );
}
