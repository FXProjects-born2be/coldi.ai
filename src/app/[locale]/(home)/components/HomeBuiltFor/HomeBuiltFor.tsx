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
  messages: ChatMessage[];
  workflows: Workflow[];
};

const industries: Industry[] = [
  {
    id: 'insurance',
    href: '/industries/insurance',
    image: '/images/home/home-built-for-one.png',
    messages: [{ role: 'user' }, { role: 'user' }, { role: 'user' }, { role: 'user' }],
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
    image: '/images/home/home-built-for-two.png',
    messages: [{ role: 'user' }, { role: 'user' }, { role: 'user' }, { role: 'user' }],
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
    image: '/images/home/home-built-for-three.png',
    messages: [{ role: 'user' }, { role: 'user' }, { role: 'user' }, { role: 'user' }],
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
    image: '/images/home/home-built-for-one.png',
    messages: [{ role: 'user' }, { role: 'user' }, { role: 'user' }, { role: 'user' }],
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
              height={580}
              className={st.home_built_for__visual_bg_image}
            />

            <div key={industry.id} className={st.home_built_for__visual_chat}>
              <div className={st.home_built_for__visual_speaking}>
                <p className={st.home_built_for__visual_speaking_title}>{t('speaking')}</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                >
                  <rect
                    x="6.40186"
                    y="2.98746"
                    width="1.70712"
                    height="15.3641"
                    rx="0.853561"
                    fill="#F6F6F6"
                  />
                  <rect
                    x="13.23"
                    y="2.98746"
                    width="1.70712"
                    height="15.3641"
                    rx="0.853561"
                    fill="#F6F6F6"
                  />
                  <rect
                    x="9.81592"
                    y="5.54814"
                    width="1.70712"
                    height="10.2427"
                    rx="0.853561"
                    fill="#F6F6F6"
                  />
                  <rect
                    x="2.9873"
                    y="5.54814"
                    width="1.70712"
                    height="10.2427"
                    rx="0.853561"
                    fill="#F6F6F6"
                  />
                  <rect
                    x="16.6445"
                    y="5.54814"
                    width="1.70712"
                    height="10.2427"
                    rx="0.853561"
                    fill="#F6F6F6"
                  />
                </svg>
                <Image
                  src={'/images/home/home-built-for-speaking.png'}
                  alt={industryLabel}
                  width={60}
                  height={60}
                  loading={'lazy'}
                  className={st.home_built_for__visual_speaking_icon}
                />
              </div>
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

            {/*<div className={st.home_built_for__visual_second_image}>*/}
            {/*  <div className={st.home_built_for__visual_second_image_block}>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*    <span></span>*/}
            {/*  </div>*/}
            {/*</div>*/}

            <Image
              src={'/images/home/home-built-for-logo.png'}
              alt={industryLabel}
              width={118}
              height={118}
              loading={'lazy'}
              className={st.home_built_for__visual_logo}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
