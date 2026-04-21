import type { Metadata } from 'next';

import { ProductStructuredData } from '@/shared/ui/components/structured-data/ProductStructuredData';

import { Cards, Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/products/inbound-calling',
  },
  title: 'AI Inbound Calling Solution for Businesses',
  description:
    'AI inbound calling that answers, routes, and manages inbound calls automatically. A smarter inbound answering service and contact center solution powered by voice AI.',
  openGraph: {
    title: 'AI Inbound Calling Solution for Businesses',
    description:
      'AI inbound calling that answers, routes, and manages inbound calls automatically. A smarter inbound answering service and contact center solution powered by voice AI.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function InboundCallingPage() {
  return (
    <main>
      <ProductStructuredData
        id="inbound-calling-product-jsonld"
        name="AI Inbound Calling System"
        image={['https://coldi.ai/images/products/card-inbound-v2.png']}
        description="Smart AI inbound calling systems that handle customer inquiries instantly without the overhead of a traditional call center. Features include real-time automation, smart routing, multilingual support in 30+ languages, and seamless CRM integration."
        url="https://coldi.ai/products/inbound-calling"
      />
      <Hero />
      <Why />
      <Cards />
      <Comparison />
      <ContentCards />
      <Faq />
    </main>
  );
}
