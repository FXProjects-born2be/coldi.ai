import type { Metadata } from 'next';

import { Cards, Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  title: 'FX Brokers',
  description: '',
  openGraph: {
    title: 'FX Brokers',
    description: '',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function BrokersPage() {
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
