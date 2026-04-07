import type { Metadata } from 'next';

import { Faq, Features, Hero, Impact, Why } from './components';

export const metadata: Metadata = {
  title: 'AI Customer Service & Support Solutions',
  description:
    'Deploy end-to-end AI customer service agents that work in the real world. Automate inquiries 24/7 with seamless system integration and full-cycle support.',
  openGraph: {
    title: 'AI Customer Service & Support Solutions',
    description:
      'Deploy end-to-end AI customer service agents that work in the real world. Automate inquiries 24/7 with seamless system integration and full-cycle support.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function CustomerServiceAgentPage() {
  return (
    <main>
      <Hero />
      <Why />
      <Features />
      <Impact />
      <Faq />
    </main>
  );
}
