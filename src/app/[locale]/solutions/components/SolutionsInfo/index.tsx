'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';
import { IconConnectorLine } from '@/shared/ui/icons/IconConnectorLine';

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
  {
    id: 'other',
    items: [],
  },
] as const;

type TabId = (typeof TABS)[number]['id'];

const isTabId = (value: string | null): value is TabId => TABS.some((tab) => tab.id === value);

export const SolutionsInfo = () => {
  const t = useTranslations('SolutionsInfo');
  const searchParams = useSearchParams();
  const tabFromUrl = searchParams.get('tab');
  const [activeId, setActiveId] = useState<TabId>(isTabId(tabFromUrl) ? tabFromUrl : 'insurance');
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = TABS.find((tab) => tab.id === activeId) ?? TABS[0];
  const tabIndex = TABS.findIndex((tab) => tab.id === activeId);
  const items = activeTab.items;
  const activeLabel = t(`tabs.${activeId}.label`);

  const handleTabChange = (id: TabId) => {
    setActiveId(id);
    setActiveIndex(0);
  };

  const goToTab = (direction: -1 | 1) => {
    const nextIndex = Math.min(TABS.length - 1, Math.max(0, tabIndex + direction));
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
    <div id="solutions-info" className={st.solutions_info}>
      <div className="container">
        <div className={st.solutions_info__tabs}>
          <button
            type="button"
            className={st.solutions_info__tabs_btn}
            aria-label={t('prevTab')}
            disabled={tabIndex === 0}
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
            disabled={tabIndex === TABS.length - 1}
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
                    <Image
                      src={ITEM_ICONS[index]}
                      width={24}
                      height={24}
                      alt="Icon"
                      loading="lazy"
                    />
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
          <div key={activeId} className={st.solutions_info__visual}>
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
                  <IconConnectorLine
                    variant="thirteen"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={0.9}
                    duration={0.9}
                  />
                  <IconConnectorLine
                    variant="twelve"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={0.9}
                    duration={0.8}
                  />
                  <IconConnectorLine
                    variant="eleven"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={0.9}
                    duration={1.8}
                  />
                  <IconConnectorLine
                    variant="fourteen"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={0.9}
                    duration={1.45}
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
                  <IconConnectorLine
                    variant="one"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={0.9}
                    duration={0.7}
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
                  <IconConnectorLine
                    variant="two"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={2.1}
                    duration={0.7}
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
                  <IconConnectorLine
                    variant="three"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={3.3}
                    duration={0.7}
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
                  <IconConnectorLine
                    variant="four"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={4.5}
                    duration={0.7}
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
                  <IconConnectorLine
                    variant="seven"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={0.9}
                    duration={1.4}
                  />
                </div>
                <div>
                  <div>
                    <div className={st.solutions_info__visual_item}>
                      <Image src={CHECKMARK_ICON} width={27} height={27} alt="" loading="lazy" />
                      <span>{t('visual.risk')}</span>
                    </div>
                    <IconConnectorLine
                      variant="five"
                      className={st.solutions_info__visual_item_second_icon}
                      delay={2.3}
                      duration={0.9}
                    />
                  </div>
                  <div>
                    <div className={st.solutions_info__visual_item}>
                      <Image src={CHECKMARK_ICON} width={27} height={27} alt="" loading="lazy" />
                      <span>{t('visual.routing')}</span>
                    </div>
                    <IconConnectorLine
                      variant="six"
                      className={st.solutions_info__visual_item_second_icon}
                      delay={2.3}
                      duration={0.9}
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
                  <IconConnectorLine
                    variant="eight"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={0.9}
                    duration={0.8}
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
                  <IconConnectorLine
                    variant="nine"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={1.7}
                    duration={0.85}
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
                  <IconConnectorLine
                    variant="ten"
                    className={st.solutions_info__visual_item_second_icon}
                    delay={2.55}
                    duration={0.8}
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
