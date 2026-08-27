'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';
import { FluentArrowTrendingLinesFilled } from '@/shared/ui/icons/FluentArrowTrendingLinesFilled';
import { IconCheck } from '@/shared/ui/icons/IconCheck';
import { IconCirclePartRoundedBottom } from '@/shared/ui/icons/IconCirclePartRoundedBottom';
import { IconCirclePartRoundedBottomThumb } from '@/shared/ui/icons/IconCirclePartRoundedBottomThumb';
import { IconCirclePartRoundedMobileFour } from '@/shared/ui/icons/IconCirclePartRoundedMobileFour';
import { IconCirclePartRoundedMobileOne } from '@/shared/ui/icons/IconCirclePartRoundedMobileOne';
import { IconCirclePartRoundedMobileThree } from '@/shared/ui/icons/IconCirclePartRoundedMobileThree';
import { IconCirclePartRoundedMobileTwo } from '@/shared/ui/icons/IconCirclePartRoundedMobileTwo';
import { IconCirclePartRoundedTop } from '@/shared/ui/icons/IconCirclePartRoundedTop';
import { IconCirclePartRoundedTopThumb } from '@/shared/ui/icons/IconCirclePartRoundedTopThumb';
import { IconFluentPersonSupport } from '@/shared/ui/icons/IconFluentPersonSupport';
import { IconHugeIconsAiGenerative } from '@/shared/ui/icons/IconHugeIconsAiGenerative';
import { IconHugeIconsAIScheduling } from '@/shared/ui/icons/IconHugeIconsAIScheduling';
import { IconLine } from '@/shared/ui/icons/IconLine';

import st from './HomeWhatCanDo.module.scss';

const items = [
  {
    id: 'sales-growth',
    title: 'Sales & growth',
    titleIcon: FluentArrowTrendingLinesFilled,
    list: [
      {
        id: 'qualify-leads',
        title: 'Qualify leads at scale, automatically',
      },
      {
        id: 're-engage-leads',
        title: 'Re-engage abandoned leads',
      },
      {
        id: 'outbound-campaigns',
        title: 'Run outbound campaigns at any volume',
      },
      {
        id: 'win-back-accounts',
        title: 'Win back dormant accounts',
      },
    ],
  },
  {
    id: 'customer-support',
    title: 'Customer support',
    titleIcon: IconFluentPersonSupport,
    list: [
      {
        id: 'collect-feedback',
        title: 'Collect feedback after every call',
      },
      {
        id: 'inbound-calls',
        title: 'Handle inbound calls, 24/7',
      },
      {
        id: 'multilingual-support',
        title: 'Deliver multilingual customer support',
      },
      {
        id: 'route-calls',
        title: 'Route calls to the right desk instantly',
      },
    ],
  },
  {
    id: 'compliance-scheduling',
    title: 'Compliance & scheduling',
    titleIcon: IconHugeIconsAIScheduling,
    list: [
      {
        id: 'schedule-appointments',
        title: 'Schedule appointments and send reminders',
      },
      {
        id: 'verify-identity',
        title: 'Verify identity documents instantly',
      },
      {
        id: 'policy-renewals',
        title: 'Confirm policy renewals before they lapse',
      },
      {
        id: 'review-calls',
        title: 'Review 100% of calls for compliance',
      },
      {
        id: 'kyc-documents',
        title: 'Chase missing KYC documents',
      },
    ],
  },
  {
    id: 'payments-platform',
    title: 'Payments & platform',
    titleIcon: IconHugeIconsAiGenerative,
    list: [
      {
        id: 'custom-agents',
        title: 'Deploy custom AI agents for any workflow',
      },
      {
        id: 'payment-plans',
        title: 'Set up payment plans automatically',
      },
      {
        id: 'payment-promises',
        title: 'Follow up on broken payment promises',
      },
    ],
  },
];

const IMAGE_MS = 800;
const TAB_START_MS = 3400 + IMAGE_MS;
const TAB_STEP_MS = 3400;
const TAB_ANIM_MS = 3200;

const connectors = [
  { id: items[0].id, className: st.home_what_do__icon_circle_one, Icon: IconCirclePartRoundedTop },
  {
    id: items[1].id,
    className: st.home_what_do__icon_circle_two,
    Icon: IconCirclePartRoundedTopThumb,
  },
  {
    id: items[2].id,
    className: st.home_what_do__icon_circle_three,
    Icon: IconCirclePartRoundedBottomThumb,
  },
  {
    id: items[3].id,
    className: st.home_what_do__icon_circle_four,
    Icon: IconCirclePartRoundedBottom,
  },
];

const mobileConnectors = [
  {
    id: items[0].id,
    className: st.home_what_do__icon_circle_mobile_one,
    Icon: IconCirclePartRoundedMobileOne,
  },
  {
    id: items[1].id,
    className: st.home_what_do__icon_circle_mobile_two,
    Icon: IconCirclePartRoundedMobileTwo,
  },
  {
    id: items[2].id,
    className: st.home_what_do__icon_circle_mobile_three,
    Icon: IconCirclePartRoundedMobileThree,
  },
  {
    id: items[3].id,
    className: st.home_what_do__icon_circle_mobile_four,
    Icon: IconCirclePartRoundedMobileFour,
  },
];

export const HomeWhatCanDo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);
  const [tabsReady, setTabsReady] = useState(false);
  const [activeId, setActiveId] = useState<string | null>(null);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        setInView(true);

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          setActiveId(items[items.length - 1].id);
          setTabsReady(true);
        }
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!inView) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const timeouts = items.map((item, index) =>
      window.setTimeout(() => setActiveId(item.id), TAB_START_MS + index * TAB_STEP_MS)
    );

    timeouts.push(
      window.setTimeout(
        () => setTabsReady(true),
        TAB_START_MS + (items.length - 1) * TAB_STEP_MS + TAB_ANIM_MS
      )
    );

    return () => timeouts.forEach(window.clearTimeout);
  }, [inView]);

  const selectTab = (id: string) => {
    if (!tabsReady || id === activeId) return;
    setActiveId(id);
  };

  return (
    <section
      ref={sectionRef}
      className={cn(st.home_what_do, inView && st.in_view, tabsReady && st.tabs_ready)}
    >
      <div className="container">
        <h2 className={st.home_what_do__title}>What Coldi Can Do for Your Business</h2>

        <div className={st.home_what_do__row}>
          <div className={st.home_what_do__image}>
            <Image
              src={'/images/home/what-can-image-main.png'}
              alt="Icon"
              loading={'lazy'}
              width={293}
              height={293}
            />
          </div>

          {connectors.map(({ id, className, Icon }) => (
            <div key={id} className={cn(className, activeId === id && st.active)}>
              <Icon />
            </div>
          ))}

          {mobileConnectors.map(({ id, className, Icon }) => (
            <div key={`mobile-${id}`} className={cn(className, activeId === id && st.active)}>
              <Icon />
            </div>
          ))}

          <div className={st.home_what_do__items} role="tablist" aria-label="What Coldi can do">
            {items.map((item) => {
              const TitleIcon = item.titleIcon;
              const isActive = activeId === item.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-disabled={!tabsReady}
                  className={cn(st.home_what_do__item, isActive && st.active)}
                  onClick={() => selectTab(item.id)}
                >
                  <TitleIcon />
                  <span
                    className={cn(
                      st.home_what_do__item_title,
                      st['home_what_do__item_title--desktop']
                    )}
                  >
                    {item.title}
                  </span>
                  <div className={st.home_what_do__item_icon_line}>
                    <IconLine />
                  </div>
                </button>
              );
            })}
          </div>

          <div className={st.home_what_do__content}>
            {items.map((item) => (
              <div
                key={item.id}
                role="tabpanel"
                className={cn(st.home_what_do__content_panel, activeId === item.id && st.active)}
              >
                {item.list.map((itemList) => (
                  <div key={itemList.id} className={st.home_what_do__content_item}>
                    <div className={st.home_what_do__content_item_icon}>
                      <IconCheck />
                    </div>
                    <p className={st.home_what_do__content_item_title}>{itemList.title}</p>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
