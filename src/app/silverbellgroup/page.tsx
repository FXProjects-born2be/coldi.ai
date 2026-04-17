import { redirect } from 'next/navigation';

/*
import type { Metadata } from 'next';

import { CaseStudies, Hero } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/silverbellgroup',
  },
  title: 'AI Operational Excellence: Silverbell Group Case Study',
  description:
    'Discover how Coldi and Silverbell Group built a strategic partnership through AI integration. Our Autonomous AI Agent provides 24/7 expert support and proactive appointment setting to enhance global service standards.',
  openGraph: {
    title: 'AI Operational Excellence: Silverbell Group Case Study',
    description:
      'Discover how Coldi and Silverbell Group built a strategic partnership through AI integration. Our Autonomous AI Agent provides 24/7 expert support and proactive appointment setting to enhance global service standards.',
    images: 'https://coldi.ai/images/meta.png',
  },
};
*/

export default function SilverbellGroupPage() {
  redirect('/');

  /*
  return (
    <main>
      <Hero />
      <CaseStudies />
    </main>
  );
  */
}
