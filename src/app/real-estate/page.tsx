import type { Metadata } from 'next';

import { Cards, Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  title: 'AI Real Estate Agents | AI Voice Agents for Realtors',
  description:
    'AI-powered voice agents built for real estate operations. Manage property inquiries, streamline lead qualification, and deliver instant support across every listing.',
  openGraph: {
    title: 'AI Real Estate Agents | AI Voice Agents for Realtors',
    description:
      'AI-powered voice agents built for real estate operations. Manage property inquiries, streamline lead qualification, and deliver instant support across every listing.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function RealEstatePage() {
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
