import type { Metadata } from 'next';

import { CaseStudies, Hero, NextSteps, Overview } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/helios',
  },
  title: 'How Helios Cut Costs by 30% & Scaled with AI',
  description:
    "Discover how Helios reduced its sales team by 64% while increasing call volume by 5x and slashing acquisition costs from $220 to $160 per lead with Coldi's AI.",
  openGraph: {
    title: 'How Helios Cut Costs by 30% & Scaled with AI',
    description:
      "Discover how Helios reduced its sales team by 64% while increasing call volume by 5x and slashing acquisition costs from $220 to $160 per lead with Coldi's AI.",
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function UseCasesPage() {
  return (
    <main>
      <Hero />
      <Overview />
      <CaseStudies />
      <NextSteps />
    </main>
  );
}
