import type { Metadata } from 'next';

import { Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  title: 'AI Agents for Debt Collection',
  description:
    'AI agents for debt collection that automate borrower outreach, repayment conversations, and recovery workflows without increasing operational costs.',
  openGraph: {
    title: 'AI Agents for Debt Collection',
    description:
      'AI agents for debt collection that automate borrower outreach, repayment conversations, and recovery workflows without increasing operational costs.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function DebtCollectionPage() {
  return (
    <main>
      <Hero />
      <Why />
      <Comparison />
      <ContentCards />
      <Faq />
    </main>
  );
}
