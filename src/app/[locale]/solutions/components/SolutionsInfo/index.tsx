'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

import st from './SolutionsInfo.module.scss';

const ITEM_DURATION_MS = 5000;

const TABS = [
  {
    id: 'insurance',
    label: 'Insurance',
    items: [
      {
        title: 'Policy Renewal Bot',
        description: 'Calls policyholders ahead of renewal to confirm and lock in rates',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Quote Follow-up Bot',
        description: 'Follows up on open quotes to convert them into policies',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'KYC / Document Reminder Bot',
        description: 'Chases missing documents and verification to complete onboarding',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Retention / Win-back Bot',
        description: 'Re-engages lapsing or cancelled policyholders',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'FNOL Intake Bot',
        description: 'Handles inbound first-notice-of-loss intake and triage',
        icon: '/icons/ic_outline-policy.svg',
      },
    ],
  },
  {
    id: 'trading',
    label: 'Trading Platforms',
    items: [
      {
        title: 'Lead Qualification Bot',
        description: 'Calls and qualifies new sign-ups while intent is still high',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Event-Based Calling Bot',
        description: 'Triggers a call on account events like a deposit drop-off or inactivity',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Lead Nurturing Bot',
        description: 'Brings cold and aged leads back into activity',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Onboarding / KYC Completion Bot',
        description: 'Pushes new users through verification and onboarding',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Reactivation Bot',
        description: 'Wins back dormant accounts',
        icon: '/icons/ic_outline-policy.svg',
      },
    ],
  },
  {
    id: 'debt',
    label: 'Debt Collection',
    items: [
      {
        title: 'Payment Reminder Bot',
        description: 'Pre-due and overdue reminders, compliant and consistent',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Arrangement / Negotiation Bot',
        description: 'Sets up and confirms payment plans',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Broken-Promise Follow-up Bot',
        description: 'Follows up on missed payment commitments',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Pre-Legal Notice Bot',
        description: 'Delivers compliant escalation notices before legal steps',
        icon: '/icons/ic_outline-policy.svg',
      },
    ],
  },
  {
    id: 'emi',
    label: 'EMIs',
    items: [
      {
        title: 'Application Recovery Bot',
        description: 'Walks abandoned applicants through the last steps of verification',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Compliance Refresh Bot',
        description: 'Runs document requests and consent refreshes on a schedule',
        icon: '/icons/ic_outline-policy.svg',
      },
      {
        title: 'Account Support Bot',
        description: 'Answers routine account questions and routes to specialists when needed',
        icon: '/icons/ic_outline-policy.svg',
      },
    ],
  },
] as const;

export const SolutionsInfo = () => {
  const [activeId, setActiveId] = useState<(typeof TABS)[number]['id']>('insurance');
  const [activeIndex, setActiveIndex] = useState(0);
  const activeTab = TABS.find((tab) => tab.id === activeId) ?? TABS[0];
  const items = activeTab.items;

  const handleTabChange = (id: (typeof TABS)[number]['id']) => {
    setActiveId(id);
    setActiveIndex(0);
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
          {TABS.map((tab) => (
            <button
              key={tab.id}
              type="button"
              className={cn(st.solutions_info__tab, tab.id === activeId && st.active)}
              onClick={() => handleTabChange(tab.id)}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className={st.solutions_info__row}>
          <div>
            <p className={st.solutions_info__item_tab_title}>{activeTab.label}</p>
            <div className={st.solutions_info__item_wrapper}>
              {items.map((item, index) => (
                <div
                  key={item.title}
                  className={cn(st.solutions_info__item, index === activeIndex && st.active)}
                >
                  <div className={st.solutions_info__item_icon}>
                    <Image src={item.icon} width={24} height={24} alt="" loading="lazy" />
                  </div>
                  <p className={st.solutions_info__item_title}>{item.title}</p>
                  <div className={st.solutions_info__item_description}>
                    <p>{item.description}</p>
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
          <div className={st.solutions_info__visual} aria-hidden>
            <Image
              src="/images/solutions/solutions-info-bg.png"
              width={592}
              height={592}
              alt=""
              sizes="(max-width: 1024px) 100vw, 592px"
            />
          </div>
        </div>
      </div>
    </div>
  );
};
