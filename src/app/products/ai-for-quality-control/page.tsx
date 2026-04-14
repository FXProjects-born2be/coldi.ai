import type { Metadata } from 'next';

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
