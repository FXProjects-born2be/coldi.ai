import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';

import {
  InsuranceCases,
  InsuranceHandles,
  InsuranceHero,
  InsuranceInfo,
  InsuranceOperations,
  InsuranceWhy,
} from '../insurance/components';

type Props = {
  params: Promise<{ locale: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { locale } = await params;
  const t = await getTranslations({ locale, namespace: 'TradingPlatformsPage' });

  return {
    alternates: {
      canonical: '/industries/trading-platforms-brokers',
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

export default async function BrokersPage() {
  const t = await getTranslations('TradingPlatformsPage');

  return (
    <main>
      <InsuranceHero
        title={t('hero.title')}
        titleAccent={t('hero.titleAccent')}
        description={t('hero.description')}
        video="/videos/trading-platforms-brokers-hero.mp4"
      />
      <InsuranceHandles
        industry="trading"
        items={[
          {
            id: 'lead-qualification',
            icon: '/icons/icons8_diploma-1.svg',
            label: t('handles.items.lead-qualification'),
          },
          {
            id: 'event-based-calling',
            icon: '/icons/fluent_calendar-phone-16-regular.svg',
            label: t('handles.items.event-based-calling'),
          },
          {
            id: 'lead-nurturing',
            icon: '/icons/boxicons_pencil-sparkles.svg',
            label: t('handles.items.lead-nurturing'),
          },
          {
            id: 'onboarding-kyc',
            icon: '/icons/ic_outline-tour.svg',
            label: t('handles.items.onboarding-kyc'),
          },
          {
            id: 'reactivation',
            icon: '/icons/streamline-flex_voice-activation-check-validate-remix.svg',
            label: t('handles.items.reactivation'),
          },
        ]}
        background="/images/general/background-two.png"
        visual="auraTwo"
      />
      <InsuranceCases
        title={t('cases.title')}
        titleAccent={t('cases.titleAccent')}
        description={t('cases.description')}
        audio="/audio/trading-platforms.mp3"
        visual="aura"
        page="trading-platforms-brokers"
      />
      <InsuranceWhy
        items={[
          {
            id: 'intro',
            icon: null,
            video: '/videos/meet-the-team-drive.mp4',
            title: t('why.intro.title'),
            titleAccent: t('why.intro.titleAccent'),
          },
          {
            id: 'first-contact',
            icon: '/icons/boxicons_thumb-up.svg',
            title: t('why.first-contact.title'),
            body: t('why.first-contact.body'),
          },
          {
            id: 'lead-economics',
            icon: '/icons/material-symbols_finance-mode-rounded.svg',
            title: t('why.lead-economics.title'),
            body: t('why.lead-economics.body'),
          },
          {
            id: 'retention',
            icon: '/icons/streamline-flex_voice-activation-check-validate-remix.svg',
            title: t('why.retention.title'),
            body: t('why.retention.body'),
          },
          {
            id: 'onboarding',
            icon: '/icons/ic_outline-tour.svg',
            title: t('why.onboarding.title'),
            body: t('why.onboarding.body'),
          },
        ]}
      />
      <InsuranceOperations
        title={t('operations.title')}
        description={t('operations.description')}
      />
      <InsuranceInfo
        items={[
          {
            id: 'leads-faster',
            label: t('info.items.leads-faster'),
          },
          {
            id: 'paid-traffic',
            label: t('info.items.paid-traffic'),
          },
          {
            id: 'new-languages',
            label: t('info.items.new-languages'),
          },
          {
            id: 'floor-reduction',
            label: t('info.items.floor-reduction'),
          },
        ]}
        description={t('info.description')}
      />
    </main>
  );
}
