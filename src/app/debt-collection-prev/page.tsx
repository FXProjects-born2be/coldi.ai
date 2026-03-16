import type { Metadata } from 'next';

import { Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  title: 'AI Voice Agents for Debt Collection Software',
  description:
    'AI debt collection software that automates borrower communication, payment reminders, and recovery workflows. Scale credit and debit collection services with AI voice agents.',
  openGraph: {
    title: 'AI Voice Agents for Debt Collection Software',
    description:
      'AI debt collection software that automates borrower communication, payment reminders, and recovery workflows. Scale credit and debit collection services with AI voice agents.',
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
