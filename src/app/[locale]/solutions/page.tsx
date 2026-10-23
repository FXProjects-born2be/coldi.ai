import { Suspense } from 'react';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { buildFaqItems } from '@/shared/lib/seo/faq';
import { FaqStructuredData } from '@/shared/ui/components/structured-data/FaqStructuredData';
import { ServiceStructuredData } from '@/shared/ui/components/structured-data/ServiceStructuredData';
import { SoftwareApplicationStructuredData } from '@/shared/ui/components/structured-data/SoftwareApplicationStructuredData';

import {
  SolutionsDeliver,
  SolutionsFaq,
  SolutionsHero,
  SolutionsInfo,
  SolutionsSpecific,
  SolutionsUseCases,
} from './components';
import { SOLUTIONS_FAQ_IDS } from './components/SolutionsFaq/content';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SolutionsPage' });

  return {
    alternates: {
      canonical: '/solutions',
    },
    title: t('metaTitle'),
    description: t('metaDescription'),
    keywords: ['AI agent lead qualification in agro industry'],
    openGraph: {
      title: t('metaTitle'),
      description: t('metaDescription'),
      images: '/images/meta.png',
    },
  };
}

export default async function SolutionsPage() {
  const t = await getTranslations('SolutionsPage');
  const tFaq = await getTranslations('SolutionsFaq');
  const faqs = buildFaqItems(tFaq, SOLUTIONS_FAQ_IDS);

  return (
    <main>
      <FaqStructuredData id="solutions-faq-jsonld" faqs={faqs} />
      <SoftwareApplicationStructuredData
        id="solutions-software-application-jsonld"
        url="https://coldi.ai/solutions"
        description={t('metaDescription')}
      />
      <ServiceStructuredData
        id="solutions-service-jsonld"
        services={[
          {
            name: t('metaTitle'),
            description: t('metaDescription'),
            url: 'https://coldi.ai/solutions',
          },
        ]}
      />
      <SolutionsHero />
      <Suspense fallback={null}>
        <SolutionsInfo />
      </Suspense>
      <SolutionsDeliver />
      <SolutionsUseCases />
      <SolutionsFaq />
      <SolutionsSpecific />
    </main>
  );
}
