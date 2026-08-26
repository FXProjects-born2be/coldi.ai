'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './Different.module.scss';

const cards = [
  {
    title: 'Elastic Workforce',
    text: 'Scale from 0 to thousands of calls without hiring more agents.',
    illustration: '/images/outbound/different-1.svg',
  },
  {
    title: 'Always On',
    text: 'AI outbound calling agents run 24/7.',
    illustration: '/images/outbound/different-2.svg',
  },
  {
    title: 'Consistency',
    text: 'Every outbound call follows your process without variability.',
    illustration: '/images/outbound/different-3.svg',
  },
  {
    title: 'Real-Time Speed',
    text: 'From lead capture to first call in seconds.',
    illustration: '/images/outbound/different-4.svg',
  },
];

export const Different = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        What Makes Outbound AI Different
      </motion.h2>

      <div className={st.grid}>
        {cards.map((card) => {
          return (
            <motion.div
              key={card.title}
              className={st.card}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={st.illustWrap}>
                <Image
                  src={card.illustration}
                  alt={imageAlt('outboundCalling', card.title)}
                  width={427}
                  height={202}
                />
              </div>
              <div className={st.cardText}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className={st.cta}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link href="#demo">
          <Button size="md">Stop missing Sale calls</Button>
        </Link>
      </motion.div>
    </section>
  );
};
