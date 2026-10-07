import type { Metadata } from 'next';

import { ServiceStructuredData } from '@/shared/ui/components/structured-data/ServiceStructuredData';

import {
  PricingChooseMinutes,
  PricingContact,
  PricingHero,
  PricingHowWorks,
  PricingPlans,
  PricingProcess,
  PricingSetupFree,
  PricingSpecializedServices,
} from './components';

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
      <ServiceStructuredData
        id="pricing-services-structured-data"
        services={[
          {
            name: 'Setup Fee',
            description:
              'AI voice agent built, scripted and voiced for your campaign. CRM and telephony integration. Testing with your real leads before launch.',
            offers: {
              description: '1,500–3,000 one-time setup fee',
            },
          },
          {
            name: 'Managed',
            description:
              'We run and optimise your campaigns. Weekly performance report. Up to 3 script adjustments per month. Dedicated account manager.',
            offers: {
              price: '1500',
              priceCurrency: 'USD',
              description: '3-month minimum, per month',
            },
          },
          {
            name: 'Self-Service',
            description:
              'We launch it with you. You run it. Up to 3 use cases included; each additional use case may carry a setup fee. We launch your first campaign together, provide training for your team, and you run campaigns in the Coldi platform.',
            offers: {
              price: '0',
              priceCurrency: 'USD',
              description: 'Per month, no monthly commitment',
            },
          },
          {
            name: 'Custom AI Development',
            description:
              'Custom AI agent architecture designed around your business logic, workflows and brand voice.',
            offers: {
              description: 'Custom Quote',
            },
          },
          {
            name: 'AI Quality Control (QC)',
            description:
              'Automated auditing of 100% of interactions to check script compliance, brand requirements and data accuracy.',
            offers: {
              description: 'Custom Quote',
            },
          },
          {
            name: 'Global VoIP Infrastructure',
            description:
              'Local phone numbers and telephony infrastructure across multiple countries, with pricing based on region and call volume.',
            offers: {
              description: 'Based on Region/Volume',
            },
          },
          {
            name: 'Call Minutes',
            description:
              'Call minutes include call recording, transcripts, CRM logging and analytics dashboard. Larger volumes on request.',
            offers: [
              {
                price: '6000',
                priceCurrency: 'USD',
                description: '15,000 minutes at $0.40 per minute',
                priceSpecification: {
                  price: '0.40',
                  priceCurrency: 'USD',
                  unitText: 'minute',
                },
              },
              {
                price: '7200',
                priceCurrency: 'USD',
                description: '20,000 minutes at $0.36 per minute',
                priceSpecification: {
                  price: '0.36',
                  priceCurrency: 'USD',
                  unitText: 'minute',
                },
              },
              {
                price: '9600',
                priceCurrency: 'USD',
                description: '30,000 minutes at $0.32 per minute',
                priceSpecification: {
                  price: '0.32',
                  priceCurrency: 'USD',
                  unitText: 'minute',
                },
              },
            ],
          },
        ]}
      />

      <PricingHero />
      <PricingPlans />
      <PricingChooseMinutes />
      <PricingSetupFree />
      <PricingProcess />
      <PricingHowWorks />
      <PricingSpecializedServices />
      <PricingContact />
    </main>
  );
}
