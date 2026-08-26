'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import st from './HomeBuiltFor.module.scss';

type Workflow = {
  id: string;
  label: string;
  icon: string;
};

type ChatMessage = {
  role: 'user' | 'assistant' | 'status';
  text: string;
  icon?: string;
};

type Industry = {
  id: string;
  label: string;
  href: string;
  cta: string;
  image: string;
  secondImage: string;
  messages: ChatMessage[];
  workflows: Workflow[];
};

const industries: Industry[] = [
  {
    id: 'insurance',
    label: 'Insurance',
    href: '/industries/insurance',
    cta: 'Learn more',
    image: '/images/home/home-built-for-one.jpg',
    secondImage: '/images/home/home-built-for-one-second.png',
    messages: [
      { role: 'user', text: 'When does my policy expire?' },
      { role: 'assistant', text: 'Let me check. Can you confirm your policy number?' },
      { role: 'user', text: 'INS-88213' },
      {
        role: 'assistant',
        text: 'Renews August 3rd. Want me to lock in your rate?',
        icon: '/images/home/buit-for-icon.png',
      },
    ],
    workflows: [
      {
        id: 'policy-renewals',
        label: 'Policy Renewals',
        icon: '/images/icons/policy-renewals.png',
      },
      {
        id: 'claims-follow-up',
        label: 'Claims Follow-up',
        icon: '/images/icons/claims-follow-up.png',
      },
      {
        id: 'quote-qualification',
        label: 'Quote Qualification',
        icon: '/images/icons/quote-qualification.svg',
      },
      {
        id: 'payment-reminders',
        label: 'Payment Reminders',
        icon: '/images/icons/payment-reminders.svg',
      },
    ],
  },
  {
    id: 'trading',
    label: 'Trading Platforms',
    href: '/industries/brokers-and-trading-platforms',
    cta: 'Learn more',
    image: '/images/home/home-built-for-three.jpg',
    secondImage: '/images/home/home-built-for-three-second.png',
    messages: [
      { role: 'user', text: 'Can I move my payment to next week?' },
      { role: 'assistant', text: 'Sure. What date works?' },
      { role: 'user', text: 'The 15th' },
      {
        role: 'assistant',
        text: 'Confirmed. New date is the 15th.',
        icon: '/images/home/buit-for-icon.png',
      },
    ],
    workflows: [
      {
        id: 'lead-qualification',
        label: 'Lead Qualification',
        icon: '/images/icons/lead-qualification.svg',
      },
      {
        id: 'deposit-activation',
        label: 'Deposit Activation',
        icon: '/images/icons/deposit-activation.svg',
      },
      {
        id: 'kyc-follow-up',
        label: 'KYC Follow-up',
        icon: '/images/icons/kys-follow-up.svg',
      },
      {
        id: 'client-reactivation',
        label: 'Client Reactivation',
        icon: '/images/icons/client-reactivation.svg',
      },
    ],
  },
  {
    id: 'debt-collection',
    label: 'Learn more',
    href: '/industries/debt-collection',
    cta: 'Explore Debt Collection',
    image: '/images/home/home-built-for-four.jpg',
    secondImage: '/images/home/home-built-for-four-second.png',
    messages: [
      { role: 'user', text: "Why isn't my verification going through?" },
      { role: 'assistant', text: 'Have you uploaded a photo ID?' },
      { role: 'user', text: 'Not yet, only address proof' },
      {
        role: 'assistant',
        text: "That's it. Sending a secure upload link now.",
        icon: '/images/home/buit-for-icon.png',
      },
    ],
    workflows: [
      {
        id: 'debt-payment-reminders',
        label: 'Payment Reminders',
        icon: '/images/icons/payment-reminders.svg',
      },
      {
        id: 'promise-to-pay',
        label: 'Promise to Pay',
        icon: '/images/icons/promise-to-pay.svg',
      },
      {
        id: 'payment-plans',
        label: 'Payment Plans',
        icon: '/images/icons/build-payment-plans.svg',
      },
      {
        id: 'recovery-campaigns',
        label: 'Recovery Campaigns',
        icon: '/images/icons/recovery-campaigns.svg',
      },
    ],
  },
  {
    id: 'emis',
    label: 'EMIs',
    href: '/fintech-Industry',
    cta: 'Learn more',
    image: '/images/home/home-built-for-two.jpg',
    secondImage: '/images/home/home-built-for-two-second.png',
    messages: [
      { role: 'user', text: "My deposit isn't showing up" },
      { role: 'assistant', text: "Let's check. Amount and method?" },
      { role: 'user', text: '$500, bank transfer' },
      {
        role: 'assistant',
        text: 'Found it. Processing, live in 10 minutes.',
        icon: '/images/home/buit-for-icon.png',
      },
    ],
    workflows: [
      {
        id: 'customer-support',
        label: 'Customer Support',
        icon: '/images/icons/customer-support.svg',
      },
      {
        id: 'verification-calls',
        label: 'Verification Calls',
        icon: '/images/icons/verification-calls.svg',
      },
      {
        id: 'appointment-booking',
        label: 'Appointment Booking',
        icon: '/images/icons/appointment-booking.svg',
      },
      {
        id: 'custom-automations',
        label: 'Custom Automations',
        icon: '/images/icons/custom-automations.svg',
      },
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
  const [industryId, setIndustryId] = useState(industries[0].id);

  const industryIndex = industries.findIndex((item) => item.id === industryId);
  const industry = industries[industryIndex] ?? industries[0];

  const goToIndustry = (direction: -1 | 1) => {
    const nextIndex = (industryIndex + direction + industries.length) % industries.length;
    setIndustryId(industries[nextIndex].id);
  };

  return (
    <section className={st.home_built_for}>
      <div className="container">
        <div className={st.home_built_for__top}>
          <h2 className={st.home_built_for__title}>Built for Your Business</h2>
          <p className={st.home_built_for__description}>
            Every fintech business has different customer conversations. Select your industry to
            explore the Voice AI workflows we build, manage and optimize for teams like yours.
          </p>
        </div>

        <div className={st.home_built_for__tabs} role="tablist" aria-label="Industries">
          {industries.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === industry.id}
              className={cn(st.home_built_for__tab, item.id === industry.id && st.active)}
              onClick={() => setIndustryId(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={st.home_built_for__slider}>
          <button
            type="button"
            className={cn(st.home_built_for__slider_btn, 'rotate-180')}
            aria-label="Previous industry"
            onClick={() => goToIndustry(-1)}
          >
            <SliderChevron />
          </button>
          <p className={st.home_built_for__slider_label}>{industry.label}</p>
          <button
            type="button"
            className={st.home_built_for__slider_btn}
            aria-label="Next industry"
            onClick={() => goToIndustry(1)}
          >
            <SliderChevron />
          </button>
        </div>

        <div className={st.home_built_for__panel}>
          <h3 className={st.home_built_for__content_title}>{industry.label}</h3>

          <div className={st.home_built_for__content_items}>
            {industry.workflows.map((item) => (
              <div key={item.id} className={st.home_built_for__content_item}>
                <div className={st.home_built_for__content_item_image}>
                  <Image src={item.icon} alt="Icon" width={20} height={20} loading={'lazy'} />
                </div>
                <p className={st.home_built_for__content_item_title}>{item.label}</p>
              </div>
            ))}
          </div>

          <Link href={industry.href} className={cn('btn', 'btn-primary', st.home_built_for__cta)}>
            {industry.cta}
          </Link>

          <div className={st.home_built_for__visual}>
            <Image
              src={industry.image}
              alt={industry.label}
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
                      alt="Icon"
                      width={35}
                      height={35}
                      className={st.home_built_for__visual_icon}
                    />
                  ) : null}
                  {item.role === 'status' ? (
                    <>
                      {item.text.replace(/\.+$/, '')}
                      <span className={st.home_built_for__visual_dots} aria-hidden>
                        <span>.</span>
                        <span>.</span>
                        <span>.</span>
                      </span>
                    </>
                  ) : (
                    <span>{item.text}</span>
                  )}
                </p>
              ))}
            </div>

            <div className={st.home_built_for__visual_second_image}>
              <Image src={industry.secondImage} alt={industry.label} width={1077} height={1077} />
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
