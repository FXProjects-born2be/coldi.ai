'use client';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { ListCheck } from '@/shared/ui/icons/fill/list-check';
import { Button } from '@/shared/ui/kit/button';

import st from './PricingPlans.module.scss';

import { plans } from '@/app/pricing/model/content';

export const PricingPlans = ({
  onRequest,
}: {
  onRequest: (plan: { label: string; title: string; price: string }) => void;
}) => {
  return (
    <section className={st.layout}>
      <div className={st.grid}>
        {plans.map((plan) => (
          <motion.article
            key={plan.title}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={st.inner}>
              <span className={st.badge}>{plan.label}</span>
              <div className={st.copy}>
                <h2>{plan.title}</h2>
                <p>{plan.description}</p>
              </div>
              <div className={st.priceBlock}>
                <span className={st.priceLabel}>{plan.eyebrow}</span>
                <p className={st.priceLine}>
                  <span className={st.priceValue}>{plan.price}</span>
                  <span className={st.priceSuffix}>{plan.priceSuffix}</span>
                </p>
              </div>
              <span className={st.divider} />
              <ul className={st.features}>
                {plan.features.map((feature) => (
                  <li key={feature}>
                    <ListCheck />
                    <span>{feature}</span>
                  </li>
                ))}
              </ul>
              <Button
                size="md"
                fullWidth
                onClick={() =>
                  onRequest({
                    label: plan.label,
                    title: plan.title,
                    price: plan.requestPrice,
                  })
                }
              >
                Request Now
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
