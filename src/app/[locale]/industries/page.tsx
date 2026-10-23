import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { ServiceStructuredData } from '@/shared/ui/components/structured-data/ServiceStructuredData';

import { IndustriesHero, IndustriesOther, IndustryAreas, IndustryInfo } from './components';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'IndustriesPage' });

  return {
    alternates: {
      canonical: '/industries',
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

export default async function IndustriesPage() {
  const t = await getTranslations('IndustriesPage');

  return (
    <main>
      <ServiceStructuredData
        id="industries-service-jsonld"
        services={[
          {
            name: t('metaTitle'),
            description: t('metaDescription'),
            url: 'https://coldi.ai/industries',
          },
        ]}
      />
      <IndustriesHero />
      <IndustryInfo />
      <IndustryAreas />
      <IndustriesOther />
    </main>
  );
}
