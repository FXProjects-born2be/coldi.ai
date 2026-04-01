import type { Metadata } from 'next';

import { Hero, TeamGrid } from './components';

export const metadata: Metadata = {
  title: 'Meet the Team',
  description:
    'Meet the Coldi team behind our AI voice agents, operations, marketing, sales, and technology.',
  openGraph: {
    title: 'Meet the Team',
    description:
      'Meet the Coldi team behind our AI voice agents, operations, marketing, sales, and technology.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function MeetTheTeamPage() {
  return (
    <main>
      <Hero />
      <TeamGrid />
    </main>
  );
}
