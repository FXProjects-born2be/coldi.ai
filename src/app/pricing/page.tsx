import type { Metadata } from 'next';

import { Pricing } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/pricing',
  },
  title: 'AI Voice Agent & Call Center Solutions Pricing',
  description:
    'See AI voice agent pricing and plans for inbound calls, booking agents, and full-service voice solutions. Discover affordable AI call center software built to scale. Request your AI voice agent now!',
  openGraph: {
    title: 'AI Voice Agent & Call Center Solutions Pricing',
    description:
      'See AI voice agent pricing and plans for inbound calls, booking agents, and full-service voice solutions. Discover affordable AI call center software built to scale. Request your AI voice agent now!',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function Products() {
  return (
    <main>
      <Pricing />
    </main>
  );
}
