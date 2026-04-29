import type { Metadata } from 'next';

import { Hear, Hero, Process } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/hvac-leads',
  },
  title: 'High-Volume Lead Re-engagement for SaaS and HVAC',
  description:
    'Re-engage cold SaaS & HVAC leads with ultra-low latency AI. Handle objections automatically and send Calendly links via SMS to book more software demos.',
  openGraph: {
    title: 'High-Volume Lead Re-engagement for SaaS and HVAC',
    description:
      'Re-engage cold SaaS & HVAC leads with ultra-low latency AI. Handle objections automatically and send Calendly links via SMS to book more software demos.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function HvacLeadsPage() {
  return (
    <main>
      <Hero />
      <Process />
      <Hear />
    </main>
  );
}
