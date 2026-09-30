import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  UseCasesCta,
  UseCasesFeatured,
  UseCasesHero,
  UseCasesImplementations,
  UseCasesWorkflows,
} from './components';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'UseCasesPage' });

  return {
    alternates: {
      canonical: '/use-cases',
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

export default function UseCasesPage() {
  return (
    <main>
      <UseCasesHero />
      <UseCasesFeatured />
      <UseCasesImplementations />
      <UseCasesWorkflows />
      <UseCasesCta />
    </main>
  );
}
