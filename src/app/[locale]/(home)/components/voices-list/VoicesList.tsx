'use client';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { getPersonas } from '@/features/personas/model/personas';
import { PersonaCard } from '@/features/personas/ui/persona-card';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button';

import st from './VoicesList.module.scss';

export const VoicesList = () => {
  const items = getPersonas().slice(0, 9);

  const blured = [
    {
      imgUrl: '/images/home/personas/jenna2.png',
      name: 'Jenna',
      type: 'Standard American',
      description: 'Sleek and contemporary — ideal for professional assistants or voice support.',
      audioUrl: '#',
    },
    {
      imgUrl: '/images/home/personas/mark.png',
      name: 'Mark',
      type: 'U.S. accent',
      description:
        'Calm, wise, and comforting. Mark’s voice instills reassurance and confidence in any project — great for healthcare, training, or casual conversational content.',
      audioUrl: '#',
    },
    {
      imgUrl: '/images/home/personas/clara.png',
      name: 'Clara',
      type: 'British Standard',
      description:
        'Sophisticated British accent — perfect for executive presentations and formal voice applications.',
      audioUrl: '#',
    },
  ];

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
      <section className={`${st.voicesList} ${st.images}`}>
        {blured.map((item) => (
          <PersonaCard key={item.name} persona={item} />
        ))}
        <Link href={`/voices`}>
          <Button fullWidth>Check more voices</Button>
        </Link>
      </section>
    </section>
  );
};
