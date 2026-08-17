'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

import st from './HomeWhatCanDo.module.scss';

type WhatCanDoItem = {
  id: string;
  label: string;
  icon: string;
};

const salesGrowth: WhatCanDoItem[] = [
  {
    id: 'qualify-leads',
    label: 'Qualify leads at scale, automatically',
    icon: '/images/icons/qualify-leads.svg',
  },
  {
    id: 're-engage-leads',
    label: 'Re-engage abandoned leads',
    icon: '/images/icons/re-engage-leads.svg',
  },
  {
    id: 'outbound-campaigns',
    label: 'Run outbound campaigns at any volume',
    icon: '/images/icons/outbound-campaigns.svg',
  },
  {
    id: 'win-back-accounts',
    label: 'Win back dormant accounts',
    icon: '/images/icons/win-back-accounts.svg',
  },
];

const customerSupport: WhatCanDoItem[] = [
  {
    id: 'collect-feedback',
    label: 'Collect feedback after every call',
    icon: '/images/icons/collect-feedback.svg',
  },
  {
    id: 'inbound-calls',
    label: 'Handle inbound calls, 24/7',
    icon: '/images/icons/inbound-calls.svg',
  },
  {
    id: 'multilingual-support',
    label: 'Deliver multilingual customer support',
    icon: '/images/icons/multilingual-support.svg',
  },
  {
    id: 'route-calls',
    label: 'Route calls to the right desk instantly',
    icon: '/images/icons/route-calls.svg',
  },
];

const complianceScheduling: WhatCanDoItem[] = [
  {
    id: 'schedule-appointments',
    label: 'Schedule appointments and send reminders',
    icon: '/images/icons/schedule-appointments.svg',
  },
  {
    id: 'verify-identity',
    label: 'Verify identity documents instantly',
    icon: '/images/icons/verify-identity.svg',
  },
  {
    id: 'policy-renewals',
    label: 'Confirm policy renewals before they lapse',
    icon: '/images/icons/policy-renewals.svg',
  },
  {
    id: 'review-calls',
    label: 'Review 100% of calls for compliance',
    icon: '/images/icons/review-calls.svg',
  },
  {
    id: 'kyc-documents',
    label: 'Chase missing KYC documents',
    icon: '/images/icons/kyc-documents.svg',
  },
];

const paymentsPlatform: WhatCanDoItem[] = [
  {
    id: 'custom-agents',
    label: 'Deploy custom AI agents for any workflow',
    icon: '/images/icons/custom-agents.svg',
  },
  {
    id: 'payment-plans',
    label: 'Set up payment plans automatically',
    icon: '/images/icons/payment-plans.svg',
  },
  {
    id: 'payment-promises',
    label: 'Follow up on broken payment promises',
    icon: '/images/icons/payment-promises.svg',
  },
];

type WhatCanDoColumn = {
  id: string;
  title: string;
  items: WhatCanDoItem[];
  accent?: boolean;
};

const leftColumns: WhatCanDoColumn[] = [
  {
    id: 'sales-growth',
    title: 'Sales & growth',
    items: salesGrowth,
    accent: true,
  },
  {
    id: 'customer-support',
    title: 'Customer support',
    items: customerSupport,
  },
];

const rightColumns: WhatCanDoColumn[] = [
  {
    id: 'compliance-scheduling',
    title: 'Compliance & scheduling',
    items: complianceScheduling,
  },
  {
    id: 'payments-platform',
    title: 'Payments & platform',
    items: paymentsPlatform,
  },
];

const renderColumns = (columns: WhatCanDoColumn[]) => (
  <div className={st.home_what_do__left}>
    {columns.map((column) => (
      <article key={column.id} className={cn(st.home_what_do__card, column.accent && st.accent)}>
        <h3 className={st.home_what_do__card_title}>{column.title}</h3>
        <ul className={st.home_what_do__list}>
          {column.items.map((item) => (
            <li key={item.id} className={st.home_what_do__item}>
              <div className={st.home_what_do__item_image}>
                <Image src={item.icon} alt="Icon" width={18} height={18} loading={'lazy'} />
              </div>
              <span className={st.home_what_do__item_title}>{item.label}</span>
            </li>
          ))}
        </ul>
      </article>
    ))}
  </div>
);

export const HomeWhatCanDo = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const [inView, setInView] = useState(false);

  useEffect(() => {
    const section = sectionRef.current;

    if (!section) return;

    let timeoutId: ReturnType<typeof setTimeout>;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        timeoutId = setTimeout(() => setInView(true), 500);
      },
      { threshold: 0.3 }
    );

    observer.observe(section);

    return () => {
      observer.disconnect();
      clearTimeout(timeoutId);
    };
  }, []);

  return (
    <section ref={sectionRef} className={cn(st.home_what_do, inView && st.in_view)}>
      <div className="container">
        <h2 className={st.home_what_do__title}>What Coldi Can Do for Your Business</h2>

        <div className={st.home_what_do__row}>
          {renderColumns(leftColumns)}

          <div className={st.home_what_do__left_icons_wrapper}>
            <div>
              <Image
                src={'/images/home/what-can-icon-one.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={253}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-two.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={182}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-three.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={114}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-four.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={45}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-five.svg'}
                alt="Icon"
                loading={'lazy'}
                width={91}
                height={117}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-six.svg'}
                alt="Icon"
                loading={'lazy'}
                width={92}
                height={187}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-seven.svg'}
                alt="Icon"
                loading={'lazy'}
                width={93}
                height={258}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-eight.svg'}
                alt="Icon"
                loading={'lazy'}
                width={93}
                height={327}
              />
            </div>
          </div>

          <div className={st.home_what_do__image}>
            <Image
              src={'/images/home/what-can-image-main.png'}
              alt="Icon"
              loading={'lazy'}
              width={293}
              height={293}
            />
          </div>

          <div className={st.home_what_do__icons_mobile}>
            <div>
              <Image
                src={'/images/home/what-can-icon-mobile-one.svg'}
                alt="Icon"
                loading={'lazy'}
                width={125}
                height={60}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-mobile-two.svg'}
                alt="Icon"
                loading={'lazy'}
                width={125}
                height={60}
              />
            </div>
          </div>

          <div className={st.home_what_do__right_icons_wrapper}>
            <div>
              <Image
                src={'/images/home/what-can-icon-nine.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={252}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-ten.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={177}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-eleven.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={110}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-icon-twelve.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={37}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-do-thirteen.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={37}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-do-fourteen.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={210}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-do-fifteen.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={277}
              />
            </div>
            <div>
              <Image
                src={'/images/home/what-can-do-sixteen.svg'}
                alt="Icon"
                loading={'lazy'}
                width={94}
                height={352}
              />
            </div>
          </div>

          {renderColumns(rightColumns)}
        </div>
      </div>
    </section>
  );
};
