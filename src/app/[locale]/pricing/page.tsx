import type { Metadata } from 'next';

import { PricingTabs } from '@/features/pricing/ui/pricing-tabs/PricingTabs';

import { Hero, Infrustructure, ReadyToHear } from './components';

export const metadata: Metadata = {
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
      <Hero />
      <PricingTabs />
      <Infrustructure />
      <ReadyToHear />
    </main>
  );
}
