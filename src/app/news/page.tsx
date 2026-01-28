import type { Metadata } from 'next';

import { Hero, NewsRow, ReadyToHear } from './components';

export const metadata: Metadata = {
  title: 'AI Calling & Industry News',
  description:
    'Stay informed with the latest news and updates on AI calling, AI call center software, and AI voice agents. Explore updates on AI call solutions shaping how businesses handle calls.',
  openGraph: {
    title: 'AI Calling & Industry News',
    description:
      'Stay informed with the latest news and updates on AI calling, AI call center software, and AI voice agents. Explore updates on AI call solutions shaping how businesses handle calls.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function News() {
  return (
    <main>
      <Hero />
      <NewsRow />
      <ReadyToHear />
    </main>
  );
}
