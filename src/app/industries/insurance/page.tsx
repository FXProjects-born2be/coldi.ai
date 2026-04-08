import type { Metadata } from 'next';

import { Cards, Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/industries/insurance',
  },
  title: 'AI Insurance Agents: Voice & Claims Automation | Coldi',
  description:
    'Automate policyholder calls and claims with AI voice agents. 24/7 multilingual support with CRM integration. Streamline your operations today.',
  openGraph: {
    title: 'AI Insurance Agents: Voice & Claims Automation | Coldi',
    description:
      'Automate policyholder calls and claims with AI voice agents. 24/7 multilingual support with CRM integration. Streamline your operations today.',
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
