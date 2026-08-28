import type { Metadata } from 'next';

import {
  PricingContact,
  PricingHero,
  PricingPlans,
  PricingProcess,
  PricingSpecializedServices,
} from './components';

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
    images: '/images/meta.png',
  },
};

export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <PricingPlans />
      <PricingSpecializedServices />
      <PricingProcess />
      <PricingContact />
    </main>
  );
}
