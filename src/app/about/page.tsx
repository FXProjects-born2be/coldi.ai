import type { Metadata } from 'next';

import { Details, Hero, ReadyToHear } from './components';

export const metadata: Metadata = {
  title: 'Expert AI Calling Solutions Provider',
  description:
    'Discover Coldi – an expert AI calling solutions provider delivering AI voice agents that answer calls, schedule, and support your business 24/7.',
  openGraph: {
    title: 'Expert AI Calling Solutions Provider',
    description:
      'Discover Coldi – an expert AI calling solutions provider delivering AI voice agents that answer calls, schedule, and support your business 24/7.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function Products() {
  return (
    <main>
      <Hero />
      <Details />
      <ReadyToHear />
    </main>
  );
}
