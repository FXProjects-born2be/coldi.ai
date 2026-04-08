import type { Metadata } from 'next';

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
      <Hero />
      <Why />
      <Cards />
      <Comparison />
      <ContentCards />
      <Faq />
    </main>
  );
}
