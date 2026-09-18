import type { Metadata } from 'next';

import { CaseStudy, Hero } from '../silverbellgroup/components';
import { caseStudyContent, heroContent } from './components/data';

export const metadata: Metadata = {
  alternates: {
    canonical: '/hvac-saas',
  },
  title: 'High-Volume Lead Re-engagement for SaaS and HVAC',
  description:
    'Re-engage cold SaaS & HVAC leads with ultra-low latency AI. Handle objections automatically and send Calendly links via SMS to book more software demos.',
  openGraph: {
    title: 'High-Volume Lead Re-engagement for SaaS and HVAC',
    description:
      'Re-engage cold SaaS & HVAC leads with ultra-low latency AI. Handle objections automatically and send Calendly links via SMS to book more software demos.',
    images: '/images/meta.png',
  },
};

export default function hvacSaasPage() {
  return (
    <main>
      <Hero content={heroContent} />
      <CaseStudy content={caseStudyContent} />
    </main>
  );
}
