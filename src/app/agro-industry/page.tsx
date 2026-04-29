import type { Metadata } from 'next';

import { Closing, Hero, Story, Workflow } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/agro-industry',
  },
  title: 'Lead Qualification in the Global Agro-Industry',
  description:
    'Scale your agro-industrial sales with Sara, an AI assistant built to screen inbound inquiries, capture structured data, and schedule high-value turnkey projects.',
  openGraph: {
    title: 'Lead Qualification in the Global Agro-Industry',
    description:
      'Scale your agro-industrial sales with Sara, an AI assistant built to screen inbound inquiries, capture structured data, and schedule high-value turnkey projects.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function AgroIndustryPage() {
  return (
    <main>
      <Hero />
      <Story />
      <Workflow />
      <Closing />
    </main>
  );
}
