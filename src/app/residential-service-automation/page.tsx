import type { Metadata } from 'next';

import { HearAgents, Hero, Process } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/residential-service-automation',
  },
  title: 'Residential Service Use case',
  description:
    'Case Study: Automating electrical service calls with AI. Learn how ZIP-code validation and live scheduling transform inbound lead management.',
  openGraph: {
    title: 'Residential Service Use case',
    description:
      'Case Study: Automating electrical service calls with AI. Learn how ZIP-code validation and live scheduling transform inbound lead management.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function ResidentialServiceAutomationPage() {
  return (
    <main>
      <Hero />
      <Process />
      <HearAgents />
    </main>
  );
}
