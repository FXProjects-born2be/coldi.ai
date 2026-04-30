'use client';

import { useRouter } from 'next/navigation';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './SpecializedServices.module.scss';

import { services } from '@/app/pricing/model/content';

export const SpecializedServices = ({}) => {
  const router = useRouter();

  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Specialized Services
      </motion.h2>
      <div className={st.grid}>
        {services.map((service) => (
          <motion.article
            key={service.title}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <div className={st.inner}>
              <div className={st.copy}>
                <h3>{service.title}</h3>
                <p>{service.description}</p>
              </div>
              <div className={st.priceBlock}>
                <span>{service.eyebrow}</span>
                <strong>{service.price}</strong>
              </div>
              <span className={st.divider} />
              <Button size="md" fullWidth onClick={() => router.push('/calendar')}>
                Get Pricing Quote
              </Button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
