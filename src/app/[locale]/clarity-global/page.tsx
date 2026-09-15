import type { Metadata } from 'next';

import { CaseStudy, Hero } from '../silverbellgroup/components';
import { caseStudyContent, heroContent } from './components/data';

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
    images: '/images/meta.png',
  },
};

export default function ClarityGlobalPage() {
  return (
    <main>
      <Hero content={heroContent} />
      <CaseStudy content={caseStudyContent} />
    </main>
  );
}
