import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CaseStudy, Hero } from '../global-professional-services-provider/components';
import {
  buildResidentialElectricalCaseStudy,
  buildResidentialElectricalHero,
} from './components/data';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ResidentialElectricalPage' });

  return {
    alternates: {
      canonical: '/residential-electrical-contractor',
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

export default async function StoneElectricPage() {
  const t = await getTranslations('ResidentialElectricalPage');
  const translator = Object.assign((key: string) => t(key), {
    raw: (key: string) => t.raw(key) as string,
  });

  return (
    <main>
      <Hero content={buildResidentialElectricalHero(translator)} />
      <CaseStudy content={buildResidentialElectricalCaseStudy(translator)} />
    </main>
  );
}
