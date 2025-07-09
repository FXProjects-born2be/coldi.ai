'use client';

import { motion } from 'framer-motion';

import { getBots } from '@/features/bots/model/bots';
import { BotCard } from '@/features/bots/ui/bot-card/BotCard';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './HearColdi.module.scss';

export const HearColdi = () => {
  const cards = getBots();

  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Hear Coldi in Action
      </motion.h2>
      <section className={st.cards}>
        {cards.map((card, index) => (
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            key={card.name}
            custom={index * 0.5}
          >
            <BotCard {...card} />
          </motion.div>
        ))}
      </section>
    </section>
  );
};
