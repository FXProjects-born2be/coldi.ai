import type { Metadata } from 'next';

import { Comparison, Cost, Faq, Future, Hero, Practical, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/products/agent-development',
  },
  title: 'Custom AI Agent Development Services',
  description:
    'Expert AI agent development for business automation. We design, build, and deploy custom conversational agents and voice solutions with end-to-end delivery.',
  openGraph: {
    title: 'Custom AI Agent Development Services',
    description:
      'Expert AI agent development for business automation. We design, build, and deploy custom conversational agents and voice solutions with end-to-end delivery.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function AgentDevelopmentPage() {
  return (
    <main>
      <Hero />
      <Why />
      <Comparison />
      <Practical />
      <Cost />
      <Future />
      <Faq />
    </main>
  );
}
