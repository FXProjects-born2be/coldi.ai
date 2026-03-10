import type { Metadata } from 'next';

import { Different, Faq, Hero, How, Why } from './components';

export const metadata: Metadata = {
  title: 'Outbound Calling AI Agents for Sales Teams',
  description:
    'AI outbound calling agents that qualify leads, book meetings, and scale sales outreach. Automate outbound calls and increase contact rates.',
  openGraph: {
    title: 'Outbound Calling AI Agents for Sales Teams',
    description:
      'AI outbound calling agents that qualify leads, book meetings, and scale sales outreach. Automate outbound calls and increase contact rates.',
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
