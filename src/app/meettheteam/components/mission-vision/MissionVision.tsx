'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './MissionVision.module.scss';

type StorySection = {
  eyebrow: string;
  title: string;
  body: string;
  reverse: boolean;
  illustration: string;
};

const storySections: StorySection[] = [
  {
    eyebrow: 'Our Purpose',
    title: 'Tansforming Communication into Growth',
    body: 'Our mission is clear: to transform large-scale business communication into measurable outcomes. We deploy and manage AI voice solutions that eliminate operational friction and guarantee consistent quality in every second of interaction.',
    reverse: false,
    illustration: '/images/meet-the-team/flow.png',
  },
  {
    eyebrow: 'Our Vision',
    title: 'The Global Standard for Managed AI',
    body: "We aim to become the global standard for the managed communication layer. We envision a future where the integration between human strategy and artificial intelligence is so seamless that technology isn't just a tool, but an invisible engine of high-efficiency growth.",
    reverse: true,
    illustration: '/images/meet-the-team/globe.png',
  },
];

export const MissionVision = () => {
  return (
    <section className={st.layout}>
      {storySections.map((section, index) => (
        <motion.article
          key={section.eyebrow}
          className={`${st.block} ${section.reverse ? st.reverse : ''}`}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          custom={index * 0.08}
        >
          <div className={st.visual}>
            <Image src={section.illustration} alt="" width={564} height={564} />
          </div>

          <div className={st.content}>
            <div className={st.eyebrow}>{section.eyebrow}</div>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </div>
        </motion.article>
      ))}
    </section>
  );
};
