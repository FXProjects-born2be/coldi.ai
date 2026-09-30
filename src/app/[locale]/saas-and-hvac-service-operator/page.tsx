import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CaseStudy, Hero } from '../global-professional-services-provider/components';
import { buildSaasHvacCaseStudy, buildSaasHvacHero } from './components/data';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'SaasHvacPage' });

  return {
    alternates: {
      canonical: '/saas-and-hvac-service-operator',
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

export default async function hvacSaasPage() {
  const t = await getTranslations('SaasHvacPage');
  const translator = Object.assign((key: string) => t(key), {
    raw: (key: string) => t.raw(key) as string,
  });

  return (
    <main>
      <Hero content={buildSaasHvacHero(translator)} />
      <CaseStudy content={buildSaasHvacCaseStudy(translator)} />
    </main>
  );
}
