import type { Metadata } from 'next';

import { CaseStudy, Hero } from '../silverbellgroup/components';
import { caseStudyContent, heroContent } from './components/data';

export const metadata: Metadata = {
  alternates: {
    canonical: '/clickomi',
  },
  title: 'Lead Qualification in the Global Agro-Industry',
  description:
    'How Global Agro Industry deployed Coldi’s AI voice concierge Sara for technical discovery, CRM data extraction, and senior sales scheduling.',
  openGraph: {
    title: 'Lead Qualification in the Global Agro-Industry',
    description:
      'How Global Agro Industry deployed Coldi’s AI voice concierge Sara for technical discovery, CRM data extraction, and senior sales scheduling.',
    images: '/images/meta.png',
  },
};

export default function ClickomiPage() {
  return (
    <main>
      <Hero content={heroContent} />
      <CaseStudy content={caseStudyContent} />
    </main>
  );
}
