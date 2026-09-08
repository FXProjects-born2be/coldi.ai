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
  title: 'Coldi Pricing: Flexible AI Voice Agent Plans for Fintech',
  description:
    "Compare Coldi's AI voice agent pricing for fintech. We offer outbound, inbound and fully managed plans across 10+ industries. Get a quote.",
  openGraph: {
    title: 'Coldi Pricing: Flexible AI Voice Agent Plans for Fintech',
    description:
      "Compare Coldi's AI voice agent pricing for fintech. We offer outbound, inbound and fully managed plans across 10+ industries. Get a quote.",
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
