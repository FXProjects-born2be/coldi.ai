import type { Metadata } from 'next';

import {
  PricingChooseMinutes,
  PricingContact,
  PricingHero,
  PricingHowWorks,
  PricingPlans,
  PricingProcess,
  PricingSpecializedServices,
} from './components';

import PricingSetupFree from '@/app/[locale]/pricing/components/PricingSetupFree';

export const metadata: Metadata = {
  alternates: {
    canonical: '/pricing',
  },
  title: 'Coldi Pricing: Flexible AI Voice Agent Plans for Fintech',
  description:
    "Compare Coldi's AI voice agent pricing for fintech. We offer outbound, inbound and fully managed plans across 10+ industries. Get a quote.",
  keywords: ['Fintech AI voice agents pricing'],
  openGraph: {
    title: 'Coldi Pricing: Flexible AI Voice Agent Plans for Fintech',
    description:
      "Compare Coldi's AI voice agent pricing for fintech. We offer outbound, inbound and fully managed plans across 10+ industries. Get a quote.",
    images: '/images/meta-news.png',
  },
};

export default function PricingPage() {
  return (
    <main>
      <PricingHero />
      <PricingSetupFree />
      <PricingPlans />
      <PricingSpecializedServices />
      <PricingChooseMinutes />
      <PricingProcess />
      <PricingHowWorks />
      <PricingContact />
    </main>
  );
}
