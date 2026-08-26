import type { Metadata } from 'next';

import { Faq, Hero, How, Reviews, Sectors, Why } from './components';

export const metadata: Metadata = {
  title: 'Turn Leads into Meetings',
  description: '',
  openGraph: {
    title: 'Turn Leads into Meetings',
    description: '',
    images: '/images/meta.png',
  },
};

export default function TurnLeadsIntoMeetings() {
  return (
    <main>
      <Hero />
      <Why />
      <How />
      <Sectors />
      <Reviews />
      <Faq />
    </main>
  );
}
