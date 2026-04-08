import type { Metadata } from 'next';

import { Comparison, ContentCards, Faq, Hero, Why } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/products/voip-phone-service',
  },
  title: 'VoIP Phone Service for Business',
  description:
    'A modern VoIP phone service with AI-powered call handling, seamless integrations, global coverage, and fully managed deployment by Coldi.',
  openGraph: {
    title: 'VoIP Phone Service for Business',
    description:
      'A modern VoIP phone service with AI-powered call handling, seamless integrations, global coverage, and fully managed deployment by Coldi.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function VoipPhoneServicePage() {
  return (
    <main>
      <Hero />
      <Why />
      <Comparison />
      <ContentCards />
      <Faq />
    </main>
  );
}
