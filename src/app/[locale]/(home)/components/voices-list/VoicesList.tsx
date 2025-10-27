'use client';

import { motion } from 'framer-motion';

import { getPersonas } from '@/features/personas/model/personas';
import { PersonaCard } from '@/features/personas/ui/persona-card';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './VoicesList.module.scss';

export const VoicesList = () => {
  const items = getPersonas();
  return (
    <section className={st.layout}>
      <header className={st.header}>
        <section className={st.title}>
          <motion.h2
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Select Your Perfect Brand Voice
          </motion.h2>
        </section>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={st.desc}
        >
          Listen to our 15 AI voices and pick the one that resonates with your brand.
        </motion.p>
      </header>

      <section className={st.voicesList}>
        {items.map((item) => (
          <PersonaCard key={item.name} persona={item} />
        ))}
      </section>
    </section>
  );
};
