import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CaseStudy, Hero } from './components';
import {
  buildProfessionalServicesCaseStudy,
  buildProfessionalServicesHero,
} from './components/data';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'ProfessionalServicesPage' });

  return {
    alternates: {
      canonical: '/global-professional-services-provider',
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

export default async function SilverbellGroupPage() {
  const t = await getTranslations('ProfessionalServicesPage');
  const translator = Object.assign((key: string) => t(key), {
    raw: (key: string) => t.raw(key) as string,
  });

  return (
    <main>
      <Hero content={buildProfessionalServicesHero(translator)} />
      <CaseStudy content={buildProfessionalServicesCaseStudy(translator)} />
    </main>
  );
}
