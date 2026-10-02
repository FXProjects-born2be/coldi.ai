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
  const t = await getTranslations({ locale, namespace: 'EmisPaymentsPage' });

  return {
    alternates: {
      canonical: '/industries/digital-banking-payments',
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

export default async function DigitalBankingPaymentsPage() {
  const t = await getTranslations('EmisPaymentsPage');

  return (
    <main>
      <InsuranceHero
        title={t('hero.title')}
        titleAccent={t('hero.titleAccent')}
        description={t('hero.description')}
        image="/images/industries/digital-banking-payments-hero-bg.jpg"
      />
      <InsuranceHandles
        industry="emis"
        items={[
          {
            id: 'application-recovery',
            icon: '/icons/fluent_receipt-sparkles-24-regular.svg',
            label: t('handles.items.application-recovery'),
          },
          {
            id: 'verification-document-requests',
            icon: '/icons/ri_file-ai-2-line.svg',
            label: t('handles.items.verification-document-requests'),
          },
          {
            id: 'compliance-data-refresh',
            icon: '/icons/ri_bar-chart-box-ai-line.svg',
            label: t('handles.items.compliance-data-refresh'),
          },
          {
            id: 'account-support-routing',
            icon: '/icons/fluent_person-account-16-regular.svg',
            label: t('handles.items.account-support-routing'),
          },
        ]}
        background="/images/general/background-four.png"
        visual="dotWave"
      />
      <InsuranceCases
        title={t('cases.title')}
        titleAccent={t('cases.titleAccent')}
        description={t('cases.description')}
        audio="/audio/digital-banking.mp3"
        visual="dotWave"
        page="digital-banking-payments"
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
            id: 'onboarding-recovery',
            icon: '/icons/ic_outline-cloud.svg',
            title: t('why.onboarding-recovery.title'),
            body: t('why.onboarding-recovery.body'),
          },
          {
            id: 'compliance-outreach',
            icon: '/icons/eos-icons_network-policy-outlined.svg',
            title: t('why.compliance-outreach.title'),
            body: t('why.compliance-outreach.body'),
          },
          {
            id: 'support-coverage',
            icon: '/icons/fluent_person-support-16-regular.svg',
            title: t('why.support-coverage.title'),
            body: t('why.support-coverage.body'),
          },
          {
            id: 'lean-teams',
            icon: '/icons/eos-icons_ai-healing-outlined.svg',
            title: t('why.lean-teams.title'),
            body: t('why.lean-teams.body'),
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
            id: 'drop-off',
            label: t('info.items.drop-off'),
          },
          {
            id: 'stalls-without-touchpoint',
            label: t('info.items.stalls-without-touchpoint'),
          },
          {
            id: 'team-is-too-lean',
            label: t('info.items.team-is-too-lean'),
          },
        ]}
        description={t('info.description')}
      />
    </main>
  );
}
