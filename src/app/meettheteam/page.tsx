import type { Metadata } from 'next';

import { Hero, MissionVision, QuoteSection, TeamGrid, ValuesSection } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/meettheteam',
  },
  title: 'Meet the team',
  description:
    'We don’t just build technology; we design the bridge between your business strategy and automated execution.',
  openGraph: {
    title: 'Meet the team',
    description:
      'We don’t just build technology; we design the bridge between your business strategy and automated execution.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function MeetTheTeamPage() {
  return (
    <main>
      <Hero />
      <MissionVision />
      <TeamGrid />
      <ValuesSection />
      <QuoteSection />
    </main>
  );
}
