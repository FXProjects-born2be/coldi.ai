import type { Metadata } from 'next';

import { Cards, Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/industries/call-center',
  },
  title: 'AI for Call Centers: Reduce Costs & Scale Call Volume',
  description:
    'Discover how AI for call centers reduces costs and handles higher call volumes with AI call center agents, bots, and voice-based automation that improves efficiency and customer support.',
  openGraph: {
    title: 'AI for Call Centers: Reduce Costs & Scale Call Volume',
    description:
      'Discover how AI for call centers reduces costs and handles higher call volumes with AI call center agents, bots, and voice-based automation that improves efficiency and customer support.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function CallCenterPage() {
  return (
    <main>
      <Hero />
      <Why />
      <Cards />
      <Comparison />
      <ContentCards />
      <Faq />
    </main>
  );
}
