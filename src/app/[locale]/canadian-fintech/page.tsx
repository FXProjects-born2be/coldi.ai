import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { CaseStudy, Hero } from '../global-professional-services-provider/components';
import { buildCanadianFintechCaseStudy, buildCanadianFintechHero } from './components/data';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'CanadianFintechPage' });

  return {
    alternates: {
      canonical: '/canadian-fintech',
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

export default async function ClarityGlobalPage() {
  const t = await getTranslations('CanadianFintechPage');
  const translator = Object.assign((key: string) => t(key), {
    raw: (key: string) => t.raw(key) as string,
  });

  return (
    <main>
      <Hero content={buildCanadianFintechHero(translator)} />
      <CaseStudy content={buildCanadianFintechCaseStudy(translator)} />
    </main>
  );
}
