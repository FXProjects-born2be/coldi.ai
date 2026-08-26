import type { Metadata } from 'next';

import { Hero, NewsOutbound, NewsRow, ReadyToHear } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/news',
  },
  title: 'Coldi News: Guides & Industry Insights on AI in Fintech',
  description:
    'Explore AI voice agent trends, use cases and industry insights for call centers, insurance, healthcare and real estate. Read now.',
  openGraph: {
    title: 'Coldi News: Guides & Industry Insights on AI in Fintech',
    description:
      'Explore AI voice agent trends, use cases and industry insights for call centers, insurance, healthcare and real estate. Read now.',
    images: '/images/meta.png',
  },
};

export default function News() {
  return (
    <main>
      <Hero />
      <NewsOutbound />
      <NewsRow />
      <ReadyToHear />
    </main>
  );
}
