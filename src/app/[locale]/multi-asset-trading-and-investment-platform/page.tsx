import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CaseStudy, Hero } from '../global-professional-services-provider/components';
import { buildMultiAssetCaseStudy, buildMultiAssetHero } from './components/data';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MultiAssetPage' });

  return {
    alternates: {
      canonical: '/multi-asset-trading-and-investment-platform',
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

export default async function EvestPage() {
  const t = await getTranslations('MultiAssetPage');
  const translator = Object.assign((key: string) => t(key), {
    raw: (key: string) => t.raw(key) as string,
  });

  return (
    <main>
      <Hero content={buildMultiAssetHero(translator)} />
      <CaseStudy content={buildMultiAssetCaseStudy(translator)} />
    </main>
  );
}
