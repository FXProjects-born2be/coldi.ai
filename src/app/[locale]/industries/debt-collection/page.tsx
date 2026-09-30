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
  const t = await getTranslations({ locale, namespace: 'DebtCollectionPage' });

  return {
    alternates: {
      canonical: '/industries/debt-collection',
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

export default async function DebtCollectionPage() {
  const t = await getTranslations('DebtCollectionPage');

  return (
    <main>
      <InsuranceHero
        title={t('hero.title')}
        titleAccent={t('hero.titleAccent')}
        description={t('hero.description')}
        video="/videos/debt-collection-hero.mp4"
      />
      <InsuranceHandles
        industry="debt-collection"
        items={[
          {
            id: 'payment-reminders',
            icon: '/icons/fluent_receipt-sparkles-24-regular.svg',
            label: t('handles.items.payment-reminders'),
          },
          {
            id: 'arrangement-negotiation',
            icon: '/icons/ic_outline-policy.svg',
            label: t('handles.items.arrangement-negotiation'),
          },
          {
            id: 'broken-promise-follow-up',
            icon: '/icons/hugeicons_ai-audio.svg',
            label: t('handles.items.broken-promise-follow-up'),
          },
          {
            id: 'pre-legal-notice',
            icon: '/icons/octicon_comment-ai-16.svg',
            label: t('handles.items.pre-legal-notice'),
          },
        ]}
        background="/images/general/background-three.png"
        visual="timerTwo"
      />
      <InsuranceCases
        title={t('cases.title')}
        titleAccent={t('cases.titleAccent')}
        description={t('cases.description')}
        audio="/audio/debt-collection.mp3"
        visual="timer"
        page="debt-collection"
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
            id: 'contact-rate',
            icon: '/icons/ic_outline-star-rate.svg',
            title: t('why.contact-rate.title'),
            body: t('why.contact-rate.body'),
          },
          {
            id: 'compliance',
            icon: '/icons/ic_outline-policy.svg',
            title: t('why.compliance.title'),
            body: t('why.compliance.body'),
          },
          {
            id: 'small-balances',
            icon: '/icons/cil_balance-scale.svg',
            title: t('why.small-balances.title'),
            body: t('why.small-balances.body'),
          },
          {
            id: 'follow-through',
            icon: '/icons/fluent_payment-16-regular.svg',
            title: t('why.follow-through.title'),
            body: t('why.follow-through.body'),
          },
        ]}
      />
      <InsuranceOperations
        title={t('operations.title')}
        description={
          <>
            {t('operations.description1')}
            <br /> {t('operations.description2')}
          </>
        }
      />
      <InsuranceInfo
        items={[
          {
            id: 'portfolio-headcount',
            label: t('info.items.portfolio-headcount'),
          },
          {
            id: 'audit-compliance',
            label: t('info.items.audit-compliance'),
          },
          {
            id: 'small-balances',
            label: t('info.items.small-balances'),
          },
          {
            id: 'agent-turnover',
            label: t('info.items.agent-turnover'),
          },
        ]}
        description={t('info.description')}
      />
    </main>
  );
}
