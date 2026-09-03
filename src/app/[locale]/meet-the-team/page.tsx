import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  MeetTeamGrid,
  MeetTeamHero,
  MeetTeamInfo,
  MeetTeamInfoDrive,
  MeetTeamInfoQuote,
} from './components';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'MeetTeamPage' });

  return {
    alternates: {
      canonical: '/meet-the-team',
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

export default function MeetTheTeamPage() {
  return (
    <main>
      <MeetTeamHero />
      <MeetTeamInfo />
      <MeetTeamGrid />
      <MeetTeamInfoDrive />
      <MeetTeamInfoQuote />
    </main>
  );
}
