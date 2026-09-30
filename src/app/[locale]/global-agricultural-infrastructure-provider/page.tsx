import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CaseStudy, Hero } from '../global-professional-services-provider/components';
import {
  buildAgriculturalInfrastructureCaseStudy,
  buildAgriculturalInfrastructureHero,
} from './components/data';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'AgriculturalInfrastructurePage' });

  return {
    alternates: {
      canonical: '/global-agricultural-infrastructure-provider',
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

export default async function AgroIndustryPage() {
  const t = await getTranslations('AgriculturalInfrastructurePage');
  const translator = Object.assign((key: string) => t(key), {
    raw: (key: string) => t.raw(key) as string,
  });

  return (
    <main>
      <Hero content={buildAgriculturalInfrastructureHero(translator)} />
      <CaseStudy content={buildAgriculturalInfrastructureCaseStudy(translator)} />
    </main>
  );
}
