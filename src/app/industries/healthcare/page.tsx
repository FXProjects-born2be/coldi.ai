import type { Metadata } from 'next';

import { Comparison, ContentCards, Faq, Hero, Infrastructure, Why } from './components';

export const metadata: Metadata = {
  title: 'AI Agents for Healthcare Operations | Coldi',
  description:
    'AI agents for healthcare that automate patient calls, scheduling, and support. Improve first-call resolution and scale patient communication.',
  openGraph: {
    title: 'AI Agents for Healthcare Operations | Coldi',
    description:
      'AI agents for healthcare that automate patient calls, scheduling, and support. Improve first-call resolution and scale patient communication.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function HealthcarePage() {
  return (
    <main>
      <Hero />
      <Why />
      <Comparison />
      <ContentCards />
      <Infrastructure />
      <Faq />
    </main>
  );
}
