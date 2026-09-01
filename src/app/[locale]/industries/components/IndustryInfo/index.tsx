'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';
import { IconAura } from '@/shared/ui/icons/IconAura';
import { IconDots } from '@/shared/ui/icons/IconDots';
import { IconTimer } from '@/shared/ui/icons/IconTimer';
import { IconWaveform } from '@/shared/ui/icons/IconWaveform';

import st from './IndustryInfo.module.scss';

import { Link } from '@/i18n/navigation';

const TABS = [
  {
    id: 'insurance',
    href: '/industries/insurance',
    visual: IconWaveform,
    cards: [
      { key: 'renewals', icon: '/icons/reicon_subscription.svg' },
      { key: 'claimsIntake', icon: '/icons/bx_data.svg' },
      { key: 'crossSell', icon: '/icons/ic_outline-sell.svg' },
    ],
  },
  {
    id: 'trading',
    href: '/industries/trading-platforms-brokers',
    visual: IconAura,
    cards: [
      { key: 'firstContact', icon: '/icons/boxicons_thumb-up.svg' },
      { key: 'leadEconomics', icon: '/icons/material-symbols_finance-mode-rounded.svg' },
      { key: 'onboarding', icon: '/icons/ic_outline-tour.svg' },
    ],
  },
  {
    id: 'debt',
    href: '/industries/debt-collection',
    visual: IconTimer,
    cards: [
      { key: 'contactRate', icon: '/icons/ic_outline-star-rate.svg' },
      { key: 'smallBalances', icon: '/icons/cil_balance-scale.svg' },
      { key: 'followThrough', icon: '/icons/fluent_payment-16-regular.svg' },
    ],
  },
  {
    id: 'emi',
    href: '/industries/emis-payments',
    visual: IconDots,
    cards: [
      { key: 'onboardingRecovery', icon: '/icons/ic_outline-tour.svg' },
      { key: 'supportCoverage', icon: '/icons/fluent_person-support-16-regular.svg' },
      { key: 'leanTeams', icon: '/icons/eos-icons_ai-healing-outlined.svg' },
    ],
  },
] as const;

export const IndustryInfo = () => {
  const t = useTranslations('IndustryInfo');
  const [activeId, setActiveId] = useState<(typeof TABS)[number]['id']>('insurance');
  const activeTab = TABS.find((tab) => tab.id === activeId) ?? TABS[0];
  const Visual = activeTab.visual;

  return (
    <section className={st.industry_info}>
      <div className="container">
        <div className={st.industry_info__tabs}>
          {TABS.map((tab) => (
            <div key={tab.id}>
              <button
                type="button"
                className={cn(
                  st.industry_info__tab,
                  tab.id === activeId && st.industry_info__tab_active
                )}
                onClick={() => setActiveId(tab.id)}
              >
                <span className={st.industry_info__tab_title}>{t(`tabs.${tab.id}.label`)}</span>
                <span className={st.industry_info__tab_subtitle}>
                  {t(`tabs.${tab.id}.subtitle`)}
                </span>
              </button>
            </div>
          ))}
        </div>

        <div
          className={cn(
            st.industry_info__panel,
            activeId === 'insurance' && st.industry_info__panel_first
          )}
        >
          <div className={st.industry_info__row}>
            <div className={st.industry_info__intro}>
              <h2 className={st.industry_info__title}>{t(`tabs.${activeId}.label`)}</h2>
              <p className={st.industry_info__text}>{t(`tabs.${activeId}.description`)}</p>
              <Link href={activeTab.href} className={cn('btn btn-primary', st.industry_info__cta)}>
                {t(`tabs.${activeId}.cta`)}
              </Link>
            </div>
            <div className={st.industry_info__visual}>
              <Image
                className={st.industry_info__visual_bg}
                src="/images/industries/info-bg.png"
                alt={t('visualAlt')}
                fill
                sizes="(max-width: 1024px) 100vw, 592px"
                loading="lazy"
              />
              <div className={st.industry_info__visual_icon}>
                <Visual />
              </div>
              <div
                className={cn(
                  st.industry_info__visual_logo,
                  st[`industry_info__visual_logo_${activeId}`]
                )}
              >
                <Image src="/icons/logo-white.svg" alt="" width={42} height={53} />
              </div>
            </div>
          </div>

          <div className={st.industry_info__cards}>
            {activeTab.cards.map((card) => (
              <article key={card.key} className={st.industry_info__card}>
                <div className={st.industry_info__card_icon}>
                  <Image src={card.icon} alt="" width={24} height={24} />
                </div>
                <h3 className={st.industry_info__card_title}>
                  {t(`tabs.${activeId}.cards.${card.key}.title`)}
                </h3>
                <p className={st.industry_info__card_text}>
                  {t(`tabs.${activeId}.cards.${card.key}.description`)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
