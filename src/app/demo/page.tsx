import type { Metadata } from 'next';

import { Advantages, HearColdi, Hero, Voices } from './components';

export const metadata: Metadata = {
  title: 'Coldi Demo – Try Real AI Call Agents Live',
  description:
    'Test Coldi’s AI voice agents in real conversations. Choose a voice, receive a live call, or listen to recorded demos across different scenarios.',
  openGraph: {
    title: 'Coldi Demo – Try Real AI Call Agents Live',
    description:
      'Test Coldi’s AI voice agents in real conversations. Choose a voice, receive a live call, or listen to recorded demos across different scenarios.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function Demo() {
  return (
    <main>
      <Hero />
      <Voices />

      <Advantages />

      <HearColdi />
    </main>
  );
}
