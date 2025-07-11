'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { Chip } from '@/shared/ui/kit/chip';

import st from './Advantages.module.scss';

const cards = [
  {
    imgUrl: '/images/home/advtg/voice-agents.jpg',
    name: 'Tailored Voice Agents',
    text: 'Trained on your tone, tasks, and real business scenarios – not generic templates.',
  },
  {
    imgUrl: '/images/home/advtg/integration.jpg',
    name: 'Hands-On Integration',
    text: 'We connect Coldi across your stack and channels. You don&apos;t lift a finger.',
  },
  {
    imgUrl: '/images/home/advtg/setup.jpg',
    name: 'End-to-End Campaign Setup',
    text: 'We build, test, and adjust each scenario – until it performs.',
  },
  {
    imgUrl: '/images/home/advtg/optimization.jpg',
    name: 'Ongoing Optimization',
    text: 'We monitor, measure, and refine – so Coldi keeps delivering.',
  },
];

export const Advantages = () => {
  return (
    <section className={st.layout}>
      <header className={st.header}>
        <section className={st.title}>
          <div className={st.chipContainer}>
            <motion.div className={st.arrowRight}>
              <motion.span
                className={st.line}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.span
                className={st.dot}
                initial={{ x: -256 }}
                whileInView={{ x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>
            <motion.div
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={0.2}
            >
              <Chip variant="secondary">Most AI tools fail on implementation.</Chip>
            </motion.div>
            <motion.div className={st.arrowLeft}>
              <motion.span
                className={st.line}
                initial={{ width: 0 }}
                whileInView={{ width: '100%' }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
              <motion.span
                className={st.dot}
                initial={{ x: 0 }}
                whileInView={{ x: 248 }}
                viewport={{ once: true }}
                transition={{ duration: 1.5, ease: 'easeInOut' }}
              />
            </motion.div>
          </div>
          <motion.h2
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            The Advantages of Implementation
          </motion.h2>
        </section>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          className={st.desc}
        >
          Coldi doesn&apos;t. We handle everything — from voice selection to full setup and
          performance tuning. You get a fully integrated AI voice agent that works for your
          business.s
        </motion.p>
      </header>
      <section className={st.cards}>
        {cards.map((card, index) => (
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            key={card.name}
            custom={index * 0.2}
          >
            <Card {...card} />
          </motion.div>
        ))}
      </section>
    </section>
  );
};

const Card = ({ imgUrl, name, text }: { imgUrl: string; name: string; text: string }) => (
  <article className={st.cardLayout}>
    <Image src={imgUrl} alt={name} width={318} height={318} unoptimized />
    <section className={st.card}>
      <h3>{name}</h3>
      <p>{text}</p>
    </section>
  </article>
);
