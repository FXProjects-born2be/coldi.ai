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
  const t = await getTranslations({ locale, namespace: 'OtherIndustriesPage' });

  return {
    alternates: {
      canonical: '/industries/other-industries',
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

export default async function OtherIndustriesPage() {
  const t = await getTranslations('OtherIndustriesPage');
  const tHandles = await getTranslations('OtherIndustriesPage.InsuranceHandles');

  return (
    <main>
      <InsuranceHero
        title={t('hero.title')}
        titleAccent={t('hero.titleAccent')}
        description={t('hero.description')}
        video="/videos/other-industries-hero.mp4"
      />
      <InsuranceHandles
        industry="other"
        items={[
          {
            id: 'lead-qualification',
            icon: '/icons/hugeicons_diploma.svg',
            label: tHandles('lead-qualification'),
          },
          {
            id: 'appointment-booking',
            icon: '/icons/hugeicons_appointment-02.svg',
            label: tHandles('appointment-booking'),
          },
          {
            id: 'customer-support',
            icon: '/icons/griddy-icons_customer-support.svg',
            label: tHandles('customer-support'),
          },
          {
            id: 'service-dispatchg',
            icon: '/icons/carbon_send.svg',
            label: tHandles('service-dispatchg'),
          },
          {
            id: 'lead-re-engagement',
            icon: '/icons/hugeicons_touch-interaction-01.svg',
            label: tHandles('lead-re-engagement'),
          },
          {
            id: 'follow-ups',
            icon: '/icons/famicons_trending-up-outline.svg',
            label: tHandles('follow-ups'),
          },
        ]}
        background="/images/general/background-five.png"
        video="/videos/other-industries-handles.mp4"
      />
      <InsuranceCases
        title={t('cases.title')}
        description={t('cases.description')}
        audio="/audio/other-industries.mp3"
        visual="horizon"
        page="other-industries"
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
            id: 'handle-more-calls',
            icon: '/icons/bx_phone-call.svg',
            title: t('why.handle-more-calls.title'),
            body: t('why.handle-more-calls.body'),
          },
          {
            id: 'follow-up-faster',
            icon: '/icons/ri_chat-follow-up-line.svg',
            title: t('why.follow-up-faster.title'),
            body: t('why.follow-up-faster.body'),
          },
          {
            id: 'automate-routine-tasks',
            icon: '/icons/mdi_checkbox-marked-circle-auto-outline.svg',
            title: t('why.automate-routine-tasks.title'),
            body: t('why.automate-routine-tasks.body'),
          },
          {
            id: 'scale-without-a-call-center',
            icon: '/icons/boxicons_scale.svg',
            title: t('why.scale-without-a-call-center.title'),
            body: t('why.scale-without-a-call-center.body'),
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
            id: 'cannot-respond-fast-enough',
            label: t('info.items.cannot-respond-fast-enough'),
          },
          {
            id: 'leads-go-cold',
            label: t('info.items.leads-go-cold'),
          },
          {
            id: 'repetitive-calls',
            label: t('info.items.repetitive-calls'),
          },
          {
            id: 'volume-peaks',
            label: t('info.items.volume-peaks'),
          },
          {
            id: 'routine-conversations',
            label: t('info.items.routine-conversations'),
          },
          {
            id: 'calling-capacity',
            label: t('info.items.calling-capacity'),
          },
          {
            id: 'no-24-7-coverage',
            label: t('info.items.no-24-7-coverage'),
          },
        ]}
        description={t('info.description')}
        page="other-industries"
      />
    </main>
  );
}
