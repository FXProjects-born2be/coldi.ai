import { Suspense } from 'react';

import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  SolutionsDeliver,
  SolutionsHero,
  SolutionsInfo,
  SolutionsSpecific,
  SolutionsUseCases,
} from './components';

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

export default function SolutionsPage() {
  return (
    <main>
      <SolutionsHero />
      <Suspense fallback={null}>
        <SolutionsInfo />
      </Suspense>
      <SolutionsDeliver />
      <SolutionsUseCases />
      <SolutionsSpecific />
    </main>
  );
}
