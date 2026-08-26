'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import st from './HomeBuiltFor.module.scss';

import { Link } from '@/i18n/navigation';

type Workflow = {
  id: string;
  icon: string;
};

type ChatMessage = {
  role: 'user' | 'assistant' | 'status';
  icon?: string;
};

type Industry = {
  id: string;
  href: string;
  image: string;
  secondImage: string;
  messages: ChatMessage[];
  workflows: Workflow[];
};

const industries: Industry[] = [
  {
    id: 'insurance',
    href: '/industries/insurance',
    image: '/images/home/home-built-for-one.jpg',
    secondImage: '/images/home/home-built-for-one-second.png',
    messages: [
      { role: 'user' },
      { role: 'assistant' },
      { role: 'user' },
      { role: 'assistant', icon: '/images/home/buit-for-icon.png' },
    ],
    workflows: [
      { id: 'policy-renewals', icon: '/images/icons/policy-renewals.png' },
      { id: 'claims-follow-up', icon: '/images/icons/claims-follow-up.png' },
      { id: 'quote-qualification', icon: '/images/icons/quote-qualification.svg' },
      { id: 'payment-reminders', icon: '/images/icons/payment-reminders.svg' },
    ],
  },
  {
    id: 'trading',
    href: '/industries/brokers-and-trading-platforms',
    image: '/images/home/home-built-for-three.jpg',
    secondImage: '/images/home/home-built-for-three-second.png',
    messages: [
      { role: 'user' },
      { role: 'assistant' },
      { role: 'user' },
      { role: 'assistant', icon: '/images/home/buit-for-icon.png' },
    ],
    workflows: [
      { id: 'lead-qualification', icon: '/images/icons/lead-qualification.svg' },
      { id: 'deposit-activation', icon: '/images/icons/deposit-activation.svg' },
      { id: 'kyc-follow-up', icon: '/images/icons/kys-follow-up.svg' },
      { id: 'client-reactivation', icon: '/images/icons/client-reactivation.svg' },
    ],
  },
  {
    id: 'debt-collection',
    href: '/industries/debt-collection',
    image: '/images/home/home-built-for-four.jpg',
    secondImage: '/images/home/home-built-for-four-second.png',
    messages: [
      { role: 'user' },
      { role: 'assistant' },
      { role: 'user' },
      { role: 'assistant', icon: '/images/home/buit-for-icon.png' },
    ],
    workflows: [
      { id: 'debt-payment-reminders', icon: '/images/icons/payment-reminders.svg' },
      { id: 'promise-to-pay', icon: '/images/icons/promise-to-pay.svg' },
      { id: 'payment-plans', icon: '/images/icons/build-payment-plans.svg' },
      { id: 'recovery-campaigns', icon: '/images/icons/recovery-campaigns.svg' },
    ],
  },
  {
    id: 'emis',
    href: '/fintech-Industry',
    image: '/images/home/home-built-for-two.jpg',
    secondImage: '/images/home/home-built-for-two-second.png',
    messages: [
      { role: 'user' },
      { role: 'assistant' },
      { role: 'user' },
      { role: 'assistant', icon: '/images/home/buit-for-icon.png' },
    ],
    workflows: [
      { id: 'customer-support', icon: '/images/icons/customer-support.svg' },
      { id: 'verification-calls', icon: '/images/icons/verification-calls.svg' },
      { id: 'appointment-booking', icon: '/images/icons/appointment-booking.svg' },
      { id: 'custom-automations', icon: '/images/icons/custom-automations.svg' },
    ],
  },
];

const SliderChevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M6.68262 14.94L11.5726 10.05C12.1501 9.4725 12.1501 8.5275 11.5726 7.95L6.68262 3.06"
      stroke="#171717"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HomeBuiltFor = () => {
  const t = useTranslations('HomeBuiltFor');
  const [industryId, setIndustryId] = useState(industries[0].id);

  const industryIndex = industries.findIndex((item) => item.id === industryId);
  const industry = industries[industryIndex] ?? industries[0];
  const industryLabel = t(`industries.${industry.id}.label`);

  const goToIndustry = (direction: -1 | 1) => {
    const nextIndex = (industryIndex + direction + industries.length) % industries.length;
    setIndustryId(industries[nextIndex].id);
  };

  return (
    <section className={st.home_built_for}>
      <div className="container">
        <div className={st.home_built_for__top}>
          <h2 className={st.home_built_for__title}>{t('title')}</h2>
          <p className={st.home_built_for__description}>{t('description')}</p>
        </div>

        <div className={st.home_built_for__tabs} role="tablist" aria-label={t('tabsAria')}>
          {industries.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === industry.id}
              className={cn(st.home_built_for__tab, item.id === industry.id && st.active)}
              onClick={() => setIndustryId(item.id)}
            >
              {t(`industries.${item.id}.label`)}
            </button>
          ))}
        </div>

        <div className={st.home_built_for__slider}>
          <button
            type="button"
            className={cn(st.home_built_for__slider_btn, 'rotate-180')}
            aria-label={t('prevIndustry')}
            onClick={() => goToIndustry(-1)}
          >
            <SliderChevron />
          </button>
          <p className={st.home_built_for__slider_label}>{industryLabel}</p>
          <button
            type="button"
            className={st.home_built_for__slider_btn}
            aria-label={t('nextIndustry')}
            onClick={() => goToIndustry(1)}
          >
            <SliderChevron />
          </button>
        </div>

        <div className={st.home_built_for__panel}>
          <h3 className={st.home_built_for__content_title}>{industryLabel}</h3>

          <div className={st.home_built_for__content_items}>
            {industry.workflows.map((item) => (
              <div key={item.id} className={st.home_built_for__content_item}>
                <div className={st.home_built_for__content_item_image}>
                  <Image src={item.icon} alt="" width={20} height={20} loading={'lazy'} />
                </div>
                <p className={st.home_built_for__content_item_title}>
                  {t(`industries.${industry.id}.workflows.${item.id}`)}
                </p>
              </div>
            ))}
          </div>

          <Link href={industry.href} className={cn('btn', 'btn-primary', st.home_built_for__cta)}>
            {t(`industries.${industry.id}.cta`)}
          </Link>

          <div className={st.home_built_for__visual}>
            <Image
              src={industry.image}
              alt={industryLabel}
              width={700}
              height={474}
              className={st.home_built_for__visual_bg_image}
            />

            <div key={industry.id} className={st.home_built_for__visual_chat}>
              {industry.messages.map((item, index) => (
                <p
                  key={`${item.role}-${index}`}
                  className={cn(st.home_built_for__visual_text, st[item.role])}
                >
                  {item.icon ? (
                    <Image
                      src={item.icon}
                      alt=""
                      width={35}
                      height={35}
                      className={st.home_built_for__visual_icon}
                    />
                  ) : null}
                  {item.role === 'status' ? (
                    <>
                      {t(`industries.${industry.id}.messages.${index}`).replace(/\.+$/, '')}
                      <span className={st.home_built_for__visual_dots} aria-hidden>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </>
                  ) : (
                    <span>{t(`industries.${industry.id}.messages.${index}`)}</span>
                  )}
                </p>
              ))}
            </div>

            <div className={st.home_built_for__visual_second_image}>
              <Image src={industry.secondImage} alt={industryLabel} width={1077} height={1077} />
              <div className={st.home_built_for__visual_second_image_block}>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
