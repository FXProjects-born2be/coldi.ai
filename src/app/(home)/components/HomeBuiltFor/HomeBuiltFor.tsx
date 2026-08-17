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

type Industry = {
  id: string;
  label: string;
  href: string;
  cta: string;
  image: string;
  workflows: Workflow[];
};

const industries: Industry[] = [
  {
    id: 'insurance',
    label: 'Insurance',
    href: '/industries/insurance',
    cta: 'Explore Insurance',
    image: '/images/home/home-built-for-one.png',
    workflows: [
      {
        id: 'policy-renewals',
        label: 'Policy Renewals',
        icon: '/images/icons/payment-reminders.svg',
      },
      {
        id: 'claims-follow-up',
        label: 'Claims Follow-up',
        icon: '/images/icons/payment-reminders.svg',
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
    id: 'fintech',
    label: 'Fintech',
    href: '/industries',
    cta: 'Explore Fintech',
    image: '/images/home/home-built-for-two.png',
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
  {
    id: 'trading',
    label: 'Trading Platforms',
    href: '/industries/fx-brokers',
    cta: 'Explore Trading Platforms',
    image: '/images/home/home-built-for-three.png',
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
    label: 'Debt Collection',
    href: '/industries/debt-collection',
    cta: 'Explore Debt Collection',
    image: '/images/home/home-built-for-four.png',
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
];

export const HomeBuiltFor = () => {
  const [industryId, setIndustryId] = useState(industries[0].id);
  const [workflowId, setWorkflowId] = useState(industries[0].workflows[0].id);

  const industry = industries.find((item) => item.id === industryId) ?? industries[0];
  const workflow =
    industry.workflows.find((item) => item.id === workflowId) ?? industry.workflows[0];

  const selectIndustry = (id: string) => {
    const nextIndustry = industries.find((item) => item.id === id);

    if (!nextIndustry) return;

    setIndustryId(nextIndustry.id);
    setWorkflowId(nextIndustry.workflows[0].id);
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
              onClick={() => selectIndustry(item.id)}
            >
              {item.label}
            </button>
          ))}
        </div>

        <div className={st.home_built_for__panel}>
          <h3 className={st.home_built_for__content_title}>{industry.label}</h3>

          <div className={st.home_built_for__content_items} role="tablist" aria-label="Workflows">
            {industry.workflows.map((item) => (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={item.id === workflow.id}
                className={cn(
                  st.home_built_for__content_item,
                  item.id === workflow.id && st.active
                )}
                onClick={() => setWorkflowId(item.id)}
              >
                <Image src={item.icon} alt="icon" width={20} height={20} />
                <span>{item.label}</span>
              </button>
            ))}
          </div>

          <Link href={industry.href} className={cn('btn', 'btn-primary', st.home_built_for__cta)}>
            {industry.cta}
          </Link>

          <div className={st.home_built_for__visual}>
            <Image
              src={industry.image}
              alt={workflow.label}
              width={700}
              height={474}
              layout="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
};
