import type { Metadata } from 'next';

import { Faq, Hero, How, Sectors, Why } from './components';

export const metadata: Metadata = {
  title: 'Turn Leads into Meetings',
  description: '',
  openGraph: {
    title: 'Turn Leads into Meetings',
    description: '',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function TurnLeadsIntoMeetings() {
  return (
    <main>
      <Hero />
      <Why />
      <How />
      <Sectors />
      <Faq />
    </main>
  );
}
