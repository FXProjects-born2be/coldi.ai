import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { buildFaqItems } from '@/shared/lib/seo/faq';
import { FaqStructuredData } from '@/shared/ui/components/structured-data/FaqStructuredData';
import { ServiceStructuredData } from '@/shared/ui/components/structured-data/ServiceStructuredData';

import {
  InsuranceCases,
  InsuranceFaq,
  InsuranceHandles,
  InsuranceHero,
  InsuranceInfo,
  InsuranceOperations,
  InsuranceWhy,
} from './components';
import { INSURANCE_FAQ_IDS } from './components/InsuranceFaq/content';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'InsurancePage' });

  return {
    alternates: {
      canonical: '/industries/insurance',
    },
    title: t('metaTitle'),
    description: t('metaDescription'),
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: '/images/meta.png',
    },
  };
}

export default async function InsuranceAgentsPage() {
  const t = await getTranslations('InsurancePage');
  const tFaq = await getTranslations('InsuranceFaq');
  const faqs = buildFaqItems(tFaq, INSURANCE_FAQ_IDS);

  return (
    <main>
      <FaqStructuredData id="insurance-faq-jsonld" faqs={faqs} />
      <ServiceStructuredData
        id="insurance-service-jsonld"
        services={[
          {
            name: t('metaTitle'),
            description: t('metaDescription'),
            url: 'https://coldi.ai/industries/insurance',
          },
        ]}
      />
      <InsuranceHero />
      <InsuranceHandles />
      <InsuranceCases page="insurance" />
      <InsuranceWhy />
      <InsuranceOperations />
      <InsuranceInfo />
      <InsuranceFaq />
    </main>
  );
}
