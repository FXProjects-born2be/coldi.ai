'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Why.module.scss';

export const Why = () => {
  return (
    <>
      <section className={st.layout}>
        <div className={st.header}>
          <motion.h2
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why Coldi
          </motion.h2>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Why teams choose AI Voice Agents
          </motion.p>
        </div>
        <div className={st.row}>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/why-1.svg"
              alt="Instant lead contact, 24/7"
              width={290}
              height={225}
            />
            <div>
              <h3>Instant lead contact, 24/7</h3>
              <p>
                Your leads are called the moment they enter the system. No delays. No missed
                opportunities.
              </p>
            </div>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/why-2.svg"
              alt="Increase your booked calls"
              width={290}
              height={225}
            />
            <div>
              <h3>Increase your booked calls</h3>
              <p>Automate qualification and move only sales-ready leads to your calendar.</p>
            </div>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/why-3.svg"
              alt="Full lead tracking"
              width={290}
              height={225}
            />
            <div>
              <h3>Full lead tracking</h3>
              <p>Every call, outcome, and interaction tracked in real time.</p>
            </div>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/why-4.svg"
              alt="Built for high-volume teams"
              width={290}
              height={225}
            />
            <div>
              <h3>Built for high-volume teams</h3>
              <p>Designed for companies handling 5,000+ minutes of calls per month.</p>
            </div>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/why-5.svg"
              alt="Works in 30+ languages"
              width={290}
              height={225}
            />
            <div>
              <h3>Works in 30+ languages</h3>
              <p>Speak to your leads in their language, automatically.</p>
            </div>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/why-6.svg"
              alt="Global Telephony Infrastructure"
              width={290}
              height={225}
            />
            <div>
              <h3>Global Telephony Infrastructure</h3>
              <p>
                A fully managed, high-quality telephony network, with the option to use your own
                provider or local landline infrastructure.
              </p>
            </div>
          </motion.div>
        </div>
      </section>
    </>
  );
};
