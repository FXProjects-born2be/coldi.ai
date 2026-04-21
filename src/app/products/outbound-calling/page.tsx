import type { Metadata } from 'next';

import { ProductStructuredData } from '@/shared/ui/components/structured-data/ProductStructuredData';

import { Different, Faq, Hero, How, Multilingual, Results, UseCases, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/products/outbound-calling',
  },
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
      <ProductStructuredData
        id="outbound-calling-product-jsonld"
        name="AI Outbound Calling Agents"
        image={['https://coldi.ai/images/products/card-outbound-v2.png']}
        description="AI Voice Agents trained to engage, qualify leads, and handoff opportunities to your sales team. Coldi provides human-like natural conversation flow, multi-language support, and 24/7 availability for scalable outbound sales processes."
        url="https://coldi.ai/products/outbound-calling"
      />
      <Hero />
      <Results />
      <How />
      <Why />
      <Different />
      <UseCases />
      <Multilingual />
      <Faq />
    </main>
  );
}
