import type { Metadata } from 'next';

import { CaseStudy, Hero } from '../global-professional-services-provider/components';
import { caseStudyContent, heroContent } from './components/data';

export const metadata: Metadata = {
  alternates: {
    canonical: '/performance-marketing-agency',
  },
  title: 'AI Voice Onboarding & Live Transfer Automation',
  description:
    'See how a performance marketing agency automated outbound client onboarding across 8,255 leads, booking onboarding sessions, scheduling callbacks and transferring high-intent prospects directly to Success Managers.',
  openGraph: {
    title: 'AI Voice Onboarding & Live Transfer Automation',
    description:
      'See how a performance marketing agency automated outbound client onboarding across 8,255 leads, booking onboarding sessions, scheduling callbacks and transferring high-intent prospects directly to Success Managers.',
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
