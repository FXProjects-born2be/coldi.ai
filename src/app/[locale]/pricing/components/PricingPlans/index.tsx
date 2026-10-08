'use client';

import { useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { RequestDialog } from '@/features/request-pricing/ui/request-dialog/RequestDialog';

import { cn } from '@/shared/lib/helpers';

import st from './PricingPlans.module.scss';

import { plans } from '@/app/[locale]/pricing/model/content';

export const PricingPlans = () => {
  const t = useTranslations('PricingPlans');
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState(plans[0]?.id);
  const [hoveredId, setHoveredId] = useState<(typeof plans)[number]['id'] | null>(null);

  if (!plans.length || !activeId) return null;

  const highlightedId = hoveredId ?? activeId;

  return (
    <section className={st.pricing_plans}>
      <div className="container">
        <h2 className={st.pricing_plans__main_title}>Choose Your Coldi Pricing Plan</h2>
        <div className={st.pricing_plans__tabs_wrapper}>
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
        </div>

        <div className={st.pricing_plans__grid}>
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={cn(
                st.pricing_plans__card,
                plan.id === activeId && st.active,
                plan.id === highlightedId && st.highlighted
              )}
              onMouseEnter={() => setHoveredId(plan.id)}
              onMouseLeave={() => setHoveredId(null)}
            >
              <div className={st.pricing_plans__inner_top}>
                <Image
                  className={st.pricing_plans__inner_top_bg}
                  src="/images/pricing/plans-bg.jpg"
                  alt="Image"
                  fill
                  sizes="(max-width: 1024px) 100vw, 476px"
                  aria-hidden
                />
                <div>
                  <div className={st.pricing_plans__inner_top_wrapper}>
                    <p className={st.pricing_plans__inner_label}>{t(`plans.${plan.id}.label`)}</p>
                    {t.has(`plans.${plan.id}.badge`) && t(`plans.${plan.id}.badge`) ? (
                      <div className={st.pricing_plans__inner_badge_wrapper}>
                        <p className={st.pricing_plans__inner_badge}>
                          {t(`plans.${plan.id}.badge`)}
                        </p>
                      </div>
                    ) : null}
                  </div>
                  <h2 className={st.pricing_plans__title}>{t(`plans.${plan.id}.title`)}</h2>
                  {t(`plans.${plan.id}.subtitle`) && (
                    <p className={st.pricing_plans__subtitle}>{t(`plans.${plan.id}.subtitle`)}</p>
                  )}
                </div>
                <div className={st.pricing_plans__price}>
                  <div className={st.pricing_plans__price_line}>
                    <span className={st.pricing_plans__price_value}>{plan.price}</span>
                    <span className={st.pricing_plans__price_suffix}>
                      {t(`plans.${plan.id}.priceSuffix`)}
                    </span>
                  </div>
                  <p className={st.pricing_plans__price_label}>{t(`plans.${plan.id}.eyebrow`)}</p>
                </div>
              </div>

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
          ))}
        </div>
      </div>
      <RequestDialog open={open} setOpen={setOpen} />
    </section>
  );
};
