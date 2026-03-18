import type { Metadata } from 'next';

import './layout.scss';

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

export default function DebtCollectionLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
