'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp, fadeInLeft, fadeInRight } from '@/shared/lib/helpers';

import { storySections } from '../data';
import st from './Story.module.scss';

export const Story = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        {storySections.map((section) => {
          const textAnimation = section.reverse ? fadeInRight : fadeInLeft;
          const imageAnimation = section.reverse ? fadeInLeft : fadeInRight;

          return (
            <div
              key={section.title}
              className={`${st.row} ${section.reverse ? st.rowReverse : ''}`}
            >
              <motion.article
                className={st.contentCard}
                variants={textAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <motion.h2
                  variants={blurInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, amount: 0.5 }}
                >
                  {section.title}
                </motion.h2>
                <div className={st.copy}>
                  {section.paragraphs.map((paragraph) => (
                    <p key={paragraph}>{paragraph}</p>
                  ))}
                </div>
              </motion.article>

              <motion.div
                className={st.visualCard}
                variants={imageAnimation}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.35 }}
              >
                <Image
                  src={section.image}
                  alt={section.imageAlt}
                  width={564}
                  height={564}
                  className={st.visual}
                />
              </motion.div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
