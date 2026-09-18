import type { Metadata } from 'next';

import { CaseStudy, Hero } from '../silverbellgroup/components';
import { caseStudyContent, heroContent } from './components/data';

export const metadata: Metadata = {
  alternates: {
    canonical: '/evest',
  },
  title: 'Evest use case',
  description:
    'How Evest is eliminating manual follow-up work across hundreds of client reviews and cutting response lag to zero.',
  openGraph: {
    title: 'Evest use case',
    description:
      'How Evest is eliminating manual follow-up work across hundreds of client reviews and cutting response lag to zero.',
    images: '/images/meta.png',
  },
};

export default function EvestPage() {
  return (
    <main>
      <Hero content={heroContent} />
      <CaseStudy content={caseStudyContent} />
    </main>
  );
}
