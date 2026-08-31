'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import st from './SolutionsInfo.module.scss';

const ITEM_DURATION_MS = 5000;

const ITEM_ICONS = [
  '/icons/ic_outline-policy.svg',
  '/icons/ix_document-ai.svg',
  '/icons/hugeicons_ai-audio.svg',
  '/icons/octicon_comment-ai-16.svg',
  '/icons/streamline_insurance-hand.svg',
] as const;

const CHECKMARK_ICON = '/icons/fluent_checkmark-circle-12-filled.svg';

const TABS = [
  {
    id: 'insurance',
    items: ['policyRenewal', 'quoteFollowUp', 'kycReminder', 'retention', 'fnol'],
  },
  {
    id: 'trading',
    items: [
      'leadQualification',
      'eventBasedCalling',
      'leadNurturing',
      'onboardingKyc',
      'reactivation',
    ],
  },
  {
    id: 'debt',
    items: ['paymentReminder', 'arrangement', 'brokenPromise', 'preLegal'],
  },
  {
    id: 'emi',
    items: ['applicationRecovery', 'complianceRefresh', 'accountSupport'],
  },
] as const;

export const SolutionsInfo = () => {
  const t = useTranslations('SolutionsInfo');
  const [activeId, setActiveId] = useState<(typeof TABS)[number]['id']>('insurance');
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = TABS.find((tab) => tab.id === activeId) ?? TABS[0];
  const tabIndex = TABS.findIndex((tab) => tab.id === activeId);
  const items = activeTab.items;
  const activeLabel = t(`tabs.${activeId}.label`);

  const handleTabChange = (id: (typeof TABS)[number]['id']) => {
    setActiveId(id);
    setActiveIndex(0);
  };

  const goToTab = (direction: -1 | 1) => {
    const nextIndex = (tabIndex + direction + TABS.length) % TABS.length;
    handleTabChange(TABS[nextIndex].id);
  };

  useEffect(() => {
    if (items.length < 2) return;

    const timer = window.setTimeout(() => {
      setActiveIndex((index) => (index + 1) % items.length);
    }, ITEM_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeId, activeIndex, items.length]);

  return (
    <div className={st.solutions_info}>
      <div className="container">
        <div className={st.solutions_info__tabs}>
          <button
            type="button"
            className={st.solutions_info__tabs_btn}
            aria-label={t('prevTab')}
            onClick={() => goToTab(-1)}
          >
            <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} />
          </button>
          <p className={st.solutions_info__tabs_label}>{activeLabel}</p>
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cn(st.solutions_info__tab, tab.id === activeId && st.active)}
              onClick={() => handleTabChange(tab.id)}
            >
              {t(`tabs.${tab.id}.label`)}
            </button>
          ))}
          <button
            type="button"
            className={st.solutions_info__tabs_btn}
            aria-label={t('nextTab')}
            onClick={() => goToTab(1)}
          >
            <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} />
          </button>
        </div>

        <div className={st.solutions_info__row}>
          <div>
            <p className={st.solutions_info__item_tab_title}>{activeLabel}</p>
            <div className={st.solutions_info__item_wrapper}>
              {items.map((itemId, index) => (
                <div
                  key={itemId}
                  className={cn(st.solutions_info__item, index === activeIndex && st.active)}
                >
                  <div className={st.solutions_info__item_icon}>
                    <Image src={ITEM_ICONS[index]} width={24} height={24} alt="" loading="lazy" />
                  </div>
                  <p className={st.solutions_info__item_title}>
                    {t(`tabs.${activeId}.items.${itemId}.title`)}
                  </p>
                  <div className={st.solutions_info__item_description}>
                    <p>{t(`tabs.${activeId}.items.${itemId}.description`)}</p>
                  </div>
                  <span className={st.solutions_info__item_progress} aria-hidden>
                    {index === activeIndex && (
                      <span
                        key={`${activeId}-${activeIndex}`}
                        className={st.solutions_info__item_progress_fill}
                      />
                    )}
                  </span>
                </div>
              ))}
            </div>
          </div>
          <div className={st.solutions_info__visual}>
            <Image
              className={st.solutions_info__visual_bg}
              src="/images/solutions/solutions-info-bg.png"
              alt=""
              fill
              sizes="(max-width: 1024px) 100vw, 592px"
              aria-hidden
            />
            {activeId === 'insurance' && (
              <div
                className={cn(
                  st.solutions_info__visual_content,
                  st['solutions_info__visual_content--0']
                )}
              >
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.managedBy')}</span>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-thirteen.svg"
                    width={155}
                    height={93}
                    alt="Icon"
                    loading="lazy"
                  />
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-twelve.svg"
                    width={136}
                    height={82}
                    alt="Icon"
                    loading="lazy"
                  />
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-eleven.svg"
                    width={137}
                    height={344}
                    alt="Icon"
                    loading="lazy"
                  />
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-fourteen.svg"
                    width={139}
                    height={240}
                    alt="Icon"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.telephony')}</span>
                  </div>

                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.api')}</span>
                  </div>
                </div>
                <div className={st.solutions_info__visual_item}>
                  <span>{t('visual.accountVerification')}</span>
                </div>

                <div className={st.solutions_info__visual_item}>
                  <span>{t('visual.optimization')}</span>
                </div>
              </div>
            )}
            {activeId === 'trading' && (
              <div
                className={cn(
                  st.solutions_info__visual_content,
                  st['solutions_info__visual_content--1']
                )}
              >
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.api')}</span>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-one.svg"
                    width={143}
                    height={26}
                    alt="Icon"
                    loading="lazy"
                  />
                  <div className={st.solutions_info__visual_item}>
                    <Image src={CHECKMARK_ICON} width={27} height={27} alt="" loading="lazy" />
                    <span>{t('visual.connected')}</span>
                  </div>
                </div>

                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.accountVerification')}</span>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-two.svg"
                    width={121}
                    height={40}
                    alt=""
                    loading="lazy"
                  />
                  <div className={st.solutions_info__visual_item}>
                    <Image src={CHECKMARK_ICON} width={27} height={27} alt="Icon" loading="lazy" />
                    <span>{t('visual.active')}</span>
                  </div>
                </div>

                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.telephony')}</span>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-three.svg"
                    width={101}
                    height={49}
                    alt="Icon"
                    loading="lazy"
                  />

                  <div className={st.solutions_info__visual_item}>
                    <Image src={CHECKMARK_ICON} width={27} height={27} alt="Icon" loading="lazy" />
                    <span>{t('visual.operational')}</span>
                  </div>
                </div>

                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.optimization')}</span>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-four.svg"
                    width={107}
                    height={49}
                    alt="Icon"
                    loading="lazy"
                  />
                  <div className={st.solutions_info__visual_item}>
                    <Image
                      src={'/icons/fa7-solid_gear.svg'}
                      width={27}
                      height={27}
                      alt="Icon"
                      loading="lazy"
                    />
                    <span>{t('visual.autoLearning')}</span>
                  </div>
                </div>
              </div>
            )}
            {activeId === 'debt' && (
              <div
                className={cn(
                  st.solutions_info__visual_content,
                  st['solutions_info__visual_content--2']
                )}
              >
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <Image src={CHECKMARK_ICON} width={27} height={27} alt="" loading="lazy" />
                    <span>{t('visual.sentiment')}</span>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-seven.svg"
                    width={8}
                    height={225}
                    alt="Icon"
                    loading="lazy"
                  />
                </div>
                <div>
                  <div>
                    <div className={st.solutions_info__visual_item}>
                      <Image src={CHECKMARK_ICON} width={27} height={27} alt="" loading="lazy" />
                      <span>{t('visual.risk')}</span>
                    </div>
                    <Image
                      className={st.solutions_info__visual_item_second_icon}
                      src="/icons/connector-line-five.svg"
                      width={154}
                      height={139}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className={st.solutions_info__visual_item}>
                      <Image src={CHECKMARK_ICON} width={27} height={27} alt="" loading="lazy" />
                      <span>{t('visual.routing')}</span>
                    </div>
                    <Image
                      className={st.solutions_info__visual_item_second_icon}
                      src="/icons/connector-line-six.svg"
                      width={136}
                      height={139}
                      alt=""
                      loading="lazy"
                    />
                  </div>
                </div>
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <Image src={CHECKMARK_ICON} width={27} height={27} alt="" loading="lazy" />
                    <span>{t('visual.triage')}</span>
                  </div>
                </div>
              </div>
            )}
            {activeId === 'emi' && (
              <div
                className={cn(
                  st.solutions_info__visual_content,
                  st['solutions_info__visual_content--3']
                )}
              >
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.setup')}</span>

                    <div className={st.solutions_info__visual_item_right}>
                      <Image
                        src={CHECKMARK_ICON}
                        width={24}
                        height={24}
                        alt="Icon"
                        loading="lazy"
                      />
                      <span>{t('visual.completed')}</span>
                    </div>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-eight.svg"
                    width={222}
                    height={38}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.integrations')}</span>

                    <div className={st.solutions_info__visual_item_right}>
                      <Image
                        src={CHECKMARK_ICON}
                        width={24}
                        height={24}
                        alt="Icon"
                        loading="lazy"
                      />
                      <span>{t('visual.completed')}</span>
                    </div>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-nine.svg"
                    width={217}
                    height={61}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.callLogic')}</span>

                    <div className={st.solutions_info__visual_item_right}>
                      <Image
                        src={CHECKMARK_ICON}
                        width={24}
                        height={24}
                        alt="Icon"
                        loading="lazy"
                      />
                      <span>{t('visual.completed')}</span>
                    </div>
                  </div>
                  <Image
                    className={st.solutions_info__visual_item_second_icon}
                    src="/icons/connector-line-ten.svg"
                    width={254}
                    height={38}
                    alt=""
                    loading="lazy"
                  />
                </div>
                <div>
                  <div className={st.solutions_info__visual_item}>
                    <span>{t('visual.live')}</span>

                    <div className={st.solutions_info__visual_item_right}>
                      <Image
                        src={'/icons/fluent_checkmark-circle-filled.svg'}
                        width={24}
                        height={24}
                        alt="Icon"
                        loading="lazy"
                      />
                      <span>{t('visual.active')}</span>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
