'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp, fadeInLeft, fadeInRight } from '@/shared/lib/helpers';

import { closingSections } from '../data';
import st from './Closing.module.scss';

export const Closing = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        {closingSections.map((section) => {
          const textAnimation = section.reverse ? fadeInRight : fadeInLeft;
          const imageAnimation = section.reverse ? fadeInLeft : fadeInRight;

          return (
            <div
              key={section.title}
              className={`${st.row} ${section.reverse ? st.rowReverse : ''}`}
            >
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

                {section.quote && <div className={st.quote}>{section.quote}</div>}

                <div className={st.copy}>
                  {section.paragraphs.map((paragraph, index) => {
                    if (section.title === 'Efficiency Meets Expertise' && index === 2) {
                      return (
                        <p key={paragraph}>
                          <strong>Stop chasing leads. Start closing infrastructure.</strong> Let
                          Sara qualify the world, so you can build it.
                        </p>
                      );
                    }

                    if (
                      section.title === 'The "Transition to Scheduling" Protocol' &&
                      index === 0
                    ) {
                      return (
                        <p key={paragraph}>
                          The most critical moment in any industrial sale is the handoff. If a lead
                          meets the qualification criteria, Sara doesn&apos;t simply &quot;pass the
                          buck.&quot; She initiates a specialized{' '}
                          <strong>Transition to Scheduling</strong> protocol.
                        </p>
                      );
                    }

                    if (
                      section.title === 'The "Transition to Scheduling" Protocol' &&
                      index === 2
                    ) {
                      return (
                        <p key={paragraph}>
                          This ensures that when your senior sales manager receives the lead, they
                          aren&apos;t just getting a phone number, they are getting a{' '}
                          <strong>full brief and a scheduled appointment.</strong>
                        </p>
                      );
                    }

                    return <p key={paragraph}>{paragraph}</p>;
                  })}
                </div>
              </motion.article>
            </div>
          );
        })}
      </div>
    </section>
  );
};
