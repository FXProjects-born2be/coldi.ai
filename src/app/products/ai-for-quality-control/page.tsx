import type { Metadata } from 'next';

import { ProductStructuredData } from '@/shared/ui/components/structured-data/ProductStructuredData';

import { Faq, Hero, Optimization, Results, Traceability, Why, Workflow } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/products/ai-for-quality-control',
  },
  title: 'Best AI Voice Agent Solutions for Quality Control',
  description:
    'Automate your inspections with the best AI voice agent solutions and vision systems. Coldi optimizes quality control in automated AI processes to eliminate waste.',
  openGraph: {
    title: 'Best AI Voice Agent Solutions for Quality Control',
    description:
      'Automate your inspections with the best AI voice agent solutions and vision systems. Coldi optimizes quality control in automated AI processes to eliminate waste.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function AiForQualityControlPage() {
  return (
    <main>
      <ProductStructuredData
        id="ai-for-quality-control-product-jsonld"
        name="AI-Powered Call Monitoring & Quality Control"
        image={['https://coldi.ai/images/ai-for-quality-control/hero-visual.png']}
        description="Transform operational oversight with a fully configurable, AI-driven quality control system. Automatically review, score, and analyze every conversation to ensure compliance, script adherence, and lead qualification with zero-touch CRM sync."
        url="https://coldi.ai/products/ai-for-quality-control"
      />
      <Hero />
      <Why />
      <Workflow />
      <Results />
      <Optimization />
      <Traceability />
      <Faq />
    </main>
  );
}
