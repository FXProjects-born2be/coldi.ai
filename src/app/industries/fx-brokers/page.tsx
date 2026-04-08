import type { Metadata } from 'next';

import { Cards, Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/industries/fx-brokers',
  },
  title: 'AI Agents for FX Brokers More FTDs & Retention',
  description:
    'Convert more leads and retain more traders with AI voice agents built for FX brokers. Instant calls, reactivation, and 30+ languages. Book a demo.',
  openGraph: {
    title: 'AI Agents for FX Brokers More FTDs & Retention',
    description:
      'Convert more leads and retain more traders with AI voice agents built for FX brokers. Instant calls, reactivation, and 30+ languages. Book a demo.',
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
