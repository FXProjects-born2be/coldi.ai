import type { Metadata } from 'next';

import { Cards, Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/industries/real-estate',
  },
  title: 'AI for Real Estate Agents: Leads & Showings Automated',
  description:
    'Automate real estate lead qualification, property inquiries, and showing scheduling with AI voice agents available 24/7. Never miss a buyer again.',
  openGraph: {
    title: 'AI for Real Estate Agents: Leads & Showings Automated',
    description:
      'Automate real estate lead qualification, property inquiries, and showing scheduling with AI voice agents available 24/7. Never miss a buyer again.',
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
