import type { Metadata } from 'next';

import { Different, Faq, Hero, How, Why } from './components';

export const metadata: Metadata = {
  title: 'AI Outbound Calling | Coldi.ai',
  description:
    'AI Voice Agents trained to qualify leads and handoff opportunities to your sales team.',
  openGraph: {
    title: 'AI Outbound Calling | Coldi.ai',
    description:
      'AI Voice Agents trained to qualify leads and handoff opportunities to your sales team.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function OutboundCallingPage() {
  return (
    <main>
      <Hero />
      <How />
      <Why />
      <Different />
      <Faq />
    </main>
  );
}
