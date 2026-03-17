import type { Metadata } from 'next';

import { Cards, Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  title: 'AI Insurance Agents | AI Voice Agents for Insurance',
  description:
    'AI-powered calling agents built for insurance operations. Answer more policyholder calls, streamline claims communication, and deliver faster support with AI voice agents.',
  openGraph: {
    title: 'AI Insurance Agents | AI Voice Agents for Insurance',
    description:
      'AI-powered calling agents built for insurance operations. Answer more policyholder calls, streamline claims communication, and deliver faster support with AI voice agents.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function InsuranceAgentsPage() {
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
