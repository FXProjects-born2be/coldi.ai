'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useRequestPricingStore } from '@/features/request-pricing/store/store';
import { RequestDialog } from '@/features/request-pricing/ui/request-dialog/RequestDialog';

import { cn } from '@/shared/lib/helpers';

import st from './PricingPlans.module.scss';

import { plans } from '@/app/[locale]/pricing/model/content';

export const PricingPlans = () => {
  const [open, setOpen] = useState(false);
  const setPlan = useRequestPricingStore((state) => state.setPlan);

  return (
    <section className={st.pricing_plans}>
      <div className="container">
        <div className={st.pricing_plans__grid}>
          {plans.map((plan) => (
            <div key={plan.title} className={st.pricing_plans__card}>
              <div className={st.pricing_plans__inner}>
                <div className={st.pricing_plans__inner_top}>
                  <h2 className={st.pricing_plans__title}>{plan.title}</h2>
                  <div className={st.pricing_plans__price}>
                    <p className={st.pricing_plans__price_label}>{plan.eyebrow}</p>
                    <div className={st.pricing_plans__price_line}>
                      <span className={st.pricing_plans__price_value}>{plan.price}</span>
                      <span className={st.pricing_plans__price_suffix}>{plan.priceSuffix}</span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPlan({
                      label: plan.label,
                      title: plan.title,
                      price: plan.requestPrice,
                    });
                    setOpen(true);
                  }}
                  className={cn('btn btn-primary', st.pricing_plans__btn)}
                >
                  Request Now
                </button>

                <ul className={st.pricing_plans__features}>
                  {plan.features.map((feature) => (
                    <li key={feature.text} className={st.pricing_plans__feature}>
                      <div className={st.pricing_plans__icon}>
                        <Image src={feature.icon} alt="" width={24} height={24} loading={'lazy'} />
                      </div>
                      <p className={st.pricing_plans__feature_text}>{feature.text}</p>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </div>
      <RequestDialog open={open} setOpen={setOpen} />
    </section>
  );
};
