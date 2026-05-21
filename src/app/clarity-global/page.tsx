import type { Metadata } from 'next';

import { CaseStudies, Closing, Hero } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/clarity-global',
  },
  title: 'Clarity Global use case',
  description:
    'How Clarity Global is eliminating manual follow-up work across hundreds of client reviews and cutting response lag to zero.',
  openGraph: {
    title: 'Clarity Global use case',
    description:
      'How Clarity Global is eliminating manual follow-up work across hundreds of client reviews and cutting response lag to zero.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function ClarityGlobalPage() {
  return (
    <main>
      <Hero />
      <CaseStudies />
      <Closing />
    </main>
  );
}
