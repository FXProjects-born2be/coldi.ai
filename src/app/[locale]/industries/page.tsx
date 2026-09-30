import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

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

export default function IndustriesPage() {
  return (
    <main>
      <IndustriesHero />
      <IndustryInfo />
      <IndustryAreas />
      <IndustriesOther />
    </main>
  );
}
