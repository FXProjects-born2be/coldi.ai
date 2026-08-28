'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { useRequestPricingStore } from '@/features/request-pricing/store/store';
import { RequestDialog } from '@/features/request-pricing/ui/request-dialog/RequestDialog';

import { cn } from '@/shared/lib/helpers';

import st from './PricingPlans.module.scss';

import { plans } from '@/app/[locale]/pricing/model/content';

export const PricingPlans = () => {
  const t = useTranslations('PricingPlans');
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(plans[0]?.id);
  const setPlan = useRequestPricingStore((state) => state.setPlan);

  if (!plans.length || !activeId) return null;

  return (
    <section className={st.pricing_plans}>
      <div className="container">
        <div className={st.pricing_plans__tabs} role="tablist" aria-label={t('tabsAria')}>
          {plans.map((plan) => (
            <button
              key={plan.id}
              type="button"
              role="tab"
              aria-selected={plan.id === activeId}
              className={cn(st.pricing_plans__tab, plan.id === activeId && st.active)}
              onClick={() => setActiveId(plan.id)}
            >
              {t(`plans.${plan.id}.tab`)}
            </button>
          ))}
        </div>

        <div className={st.pricing_plans__grid}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(st.pricing_plans__card, plan.id === activeId && st.active)}
            >
              <div className={st.pricing_plans__inner}>
                <div className={st.pricing_plans__inner_top}>
                  <h2 className={st.pricing_plans__title}>{t(`plans.${plan.id}.title`)}</h2>
                  <div className={st.pricing_plans__price}>
                    <p className={st.pricing_plans__price_label}>{t(`plans.${plan.id}.eyebrow`)}</p>
                    <div className={st.pricing_plans__price_line}>
                      <span className={st.pricing_plans__price_value}>{plan.price}</span>
                      <span className={st.pricing_plans__price_suffix}>
                        {t(`plans.${plan.id}.priceSuffix`)}
                      </span>
                    </div>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() => {
                    setPlan({
                      label: t(`plans.${plan.id}.label`),
                      title: t(`plans.${plan.id}.title`),
                      price: `${plan.price}${t(`plans.${plan.id}.priceSuffix`)}`,
                    });
                    setOpen(true);
                  }}
                  className={cn('btn', st.pricing_plans__btn)}
                >
                  {t('requestNow')}
                </button>

                <p className={st.pricing_plans__description}>{t(`plans.${plan.id}.description`)}</p>

                <ul className={st.pricing_plans__features}>
                  {plan.features.map((feature) => (
                    <li key={feature.id} className={st.pricing_plans__feature}>
                      <div className={st.pricing_plans__icon}>
                        <Image src={feature.icon} alt="" width={24} height={24} loading={'lazy'} />
                      </div>
                      <p className={st.pricing_plans__feature_text}>
                        {t(`plans.${plan.id}.features.${feature.id}`)}
                      </p>
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
