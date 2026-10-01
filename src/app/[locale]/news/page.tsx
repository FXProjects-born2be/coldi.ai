import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import { NewsFeed } from './components';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'NewsPage' });

  return {
    alternates: {
      canonical: '/news',
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

export default function News() {
  return (
    <main>
      <NewsFeed />
    </main>
  );
}
