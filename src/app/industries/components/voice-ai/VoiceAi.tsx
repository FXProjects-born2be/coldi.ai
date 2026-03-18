'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './VoiceAi.module.scss';

const humanLedItems = ['Human-led', 'Moderate cost', 'Manual workflows'];
const aiPoweredItems = ['AI-powered', 'Lower cost per minute', 'Automated insights'];

export const VoiceAi = () => {
  return (
    <section className={st.layout}>
      <div className={st.content}>
        <motion.div
          className={st.textBlock}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h2>
            How to know if you need <span>Voice AI</span>?
          </h2>
          <div className={st.description}>
            <p>
              For growing enterprises, the most objective indicator for AI adoption is the
              5,000-minute monthly call threshold.
            </p>
            <p>
              Once your organization exceeds 5,000 minutes of talk time per month, the overhead of
              human-operated desks often leads to diminishing returns and employee burnout.
            </p>
            <p>
              At this scale, the cost-per-minute of an AI Voice Agent is significantly lower than a
              traditional call center or an in-house team.
            </p>
            <p>
              Transitioning at this stage doesn&apos;t just cut costs—it ensures 100% message
              consistency and provides deep-dive analytics, turning every second of those 5,000+
              minutes into actionable business intelligence.
            </p>
          </div>
        </motion.div>

        <motion.div
          className={st.comparisonWrap}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <div className={st.circles}>
            <Image
              src="/images/industries/ellipse-inner.svg"
              alt=""
              width={378}
              height={378}
              className={st.circleInner}
              unoptimized
            />
            <Image
              src="/images/industries/ellipse-mid.svg"
              alt=""
              width={560}
              height={560}
              className={st.circleMid}
              unoptimized
            />
            <Image
              src="/images/industries/ellipse-outer.svg"
              alt=""
              width={734}
              height={734}
              className={st.circleOuter}
              unoptimized
            />
          </div>

          <div className={st.comparisonCard}>
            <div className={st.column}>
              <p className={st.columnTitle}>&lt; 5,000 min / monthly</p>
              <div className={st.tags}>
                {humanLedItems.map((item) => (
                  <div key={item} className={st.tag}>
                    <Image
                      src="/images/industries/dot-gray.svg"
                      alt=""
                      width={7}
                      height={7}
                      unoptimized
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className={st.divider} />

            <div className={st.column}>
              <p className={st.columnTitle}>5,000+ min / monthly</p>
              <div className={st.tags}>
                {aiPoweredItems.map((item) => (
                  <div key={item} className={st.tag}>
                    <Image
                      src="/images/industries/dot-blue.svg"
                      alt=""
                      width={7}
                      height={7}
                      unoptimized
                    />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
