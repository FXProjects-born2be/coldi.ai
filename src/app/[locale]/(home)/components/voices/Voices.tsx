'use client';

import { motion } from 'framer-motion';

import { getVoices } from '@/features/voices/model/voices';
import { VoiceCard } from '@/features/voices/ui/voice-card';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Voices.module.scss';

export const Voices = () => {
  const items = getVoices();

  return (
    <section className={st.voices}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Meet the Voices Behind Coldi
      </motion.h2>
      <section className={st.voices__list}>
        {items.map((item, index) => (
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            key={item.name}
            viewport={{ once: true }}
            custom={index * 0.5}
          >
            <VoiceCard {...item} />
          </motion.div>
        ))}
      </section>
    </section>
  );
};
