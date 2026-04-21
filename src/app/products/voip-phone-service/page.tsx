import type { Metadata } from 'next';

import { ProductStructuredData } from '@/shared/ui/components/structured-data/ProductStructuredData';

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
      <ProductStructuredData
        id="voip-phone-service-product-jsonld"
        name="Business VoIP Phone Service"
        image={['https://coldi.ai/images/products/card-voip-v2.png']}
        description="A modern VoIP phone service built for businesses that need reliable communication, global reach, and intelligent automation. Coldi AI combines voice infrastructure with AI-powered call handling to deliver a complete, fully managed solution with unlimited concurrent calls and CRM integration."
        url="https://coldi.ai/products/voip-phone-service"
      />
      <Hero />
      <Why />
      <Comparison />
      <ContentCards />
      <Faq />
    </main>
  );
}
