import type { Metadata } from 'next';

import { ProductStructuredData } from '@/shared/ui/components/structured-data/ProductStructuredData';

import { Faq, Features, Hero, Impact, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/products/customer-service-agent',
  },
  title: 'AI Customer Service & Support Solutions',
  description:
    'Deploy end-to-end AI customer service agents that work in the real world. Automate inquiries 24/7 with seamless system integration and full-cycle support.',
  openGraph: {
    title: 'AI Customer Service & Support Solutions',
    description:
      'Deploy end-to-end AI customer service agents that work in the real world. Automate inquiries 24/7 with seamless system integration and full-cycle support.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function CustomerServiceAgentPage() {
  return (
    <main>
      <ProductStructuredData
        id="customer-service-agent-product-jsonld"
        name="AI Customer Service Agent"
        image={['https://coldi.ai/images/customer-service-agent/why-1.png']}
        description="Transform your customer service with AI agents that understand intent and resolve complex tasks through deep system integration. Coldi provides 24/7 automated resolution, natural conversational understanding, and seamless omnichannel support."
        url="https://coldi.ai/products/customer-service-agent"
      />
      <Hero />
      <Why />
      <Features />
      <Impact />
      <Faq />
    </main>
  );
}
