import { redirect } from 'next/navigation';

import type { Metadata } from 'next';

import { HearAgents, Hero, Process } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/residential-service-automation',
  },
  title: 'Residential Service Automation Case Study',
  description:
    'See how Coldi automates residential service calls with AI-powered screening, data capture, scheduling, and end-to-end operational follow-through.',
  openGraph: {
    title: 'Residential Service Automation Case Study',
    description:
      'See how Coldi automates residential service calls with AI-powered screening, data capture, scheduling, and end-to-end operational follow-through.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function ResidentialServiceAutomationPage() {
  redirect('/');

  return (
    <main>
      <Hero />
      <Process />
      <HearAgents />
    </main>
  );
}
