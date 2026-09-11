import type { Metadata } from 'next';

import {
  UseCasesCta,
  UseCasesFeatured,
  UseCasesHero,
  UseCasesImplementations,
  UseCasesWorkflows,
} from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/use-cases',
  },
  title: 'Coldi Use Cases: AI Voice Agents for Real Business Workflows',
  description:
    'See how Coldi automates qualification, follow-ups, support, scheduling, and compliance with real AI voice agent implementations.',
  openGraph: {
    title: 'Coldi Use Cases: AI Voice Agents for Real Business Workflows',
    description:
      'See how Coldi automates qualification, follow-ups, support, scheduling, and compliance with real AI voice agent implementations.',
    images: '/images/meta.png',
  },
};

export default function UseCasesPage() {
  return (
    <main>
      <UseCasesHero />
      <UseCasesFeatured />
      <UseCasesImplementations />
      <UseCasesWorkflows />
      <UseCasesCta />
    </main>
  );
}
