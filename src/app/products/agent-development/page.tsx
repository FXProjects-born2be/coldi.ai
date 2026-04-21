import type { Metadata } from 'next';

import { ProductStructuredData } from '@/shared/ui/components/structured-data/ProductStructuredData';

import { Comparison, Cost, Faq, Future, Hero, Practical, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/products/agent-development',
  },
  title: 'Custom AI Agent Development Services',
  description:
    'Expert AI agent development for business automation. We design, build, and deploy custom conversational agents and voice solutions with end-to-end delivery.',
  openGraph: {
    title: 'Custom AI Agent Development Services',
    description:
      'Expert AI agent development for business automation. We design, build, and deploy custom conversational agents and voice solutions with end-to-end delivery.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function AgentDevelopmentPage() {
  return (
    <main>
      <ProductStructuredData
        id="agent-development-product-jsonld"
        name="Custom AI Agent Development Services"
        image={['https://coldi.ai/images/products/card-agent-development-v2.png']}
        description="Premium AI Agent Development services designed to automate conversations and launch intelligent voice solutions. Coldi delivers bespoke conversational agents that understand context, carry natural conversations, and integrate seamlessly with CRMs and existing workflows."
        url="https://coldi.ai/products/agent-development"
      />
      <Hero />
      <Why />
      <Comparison />
      <Practical />
      <Cost />
      <Future />
      <Faq />
    </main>
  );
}
