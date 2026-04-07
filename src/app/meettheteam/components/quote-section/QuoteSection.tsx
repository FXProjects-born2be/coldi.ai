'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './QuoteSection.module.scss';

export const QuoteSection = () => {
  return (
    <section className={st.layout}>
      <motion.div
        className={st.content}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        <Image
          src="/images/meet-the-team/quote-open.svg"
          alt=""
          width={48}
          height={48}
          aria-hidden="true"
          className={st.quoteOpen}
        />

        <div className={st.badge}>Connect. Automate. Grow.</div>

        <h2>
          <span>Behind every </span>
          <span className={st.muted}>AI</span>
          <span> solution is a </span>
          <span className={st.muted}>human</span>
          <span> team obsessed with </span>
          <span className={st.muted}>detail</span>
          <span>, </span>
          <span className={st.muted}>integration</span>
          <span>, and, above all, your operational </span>
          <span className={st.muted}>success</span>
        </h2>

        <Image
          src="/images/meet-the-team/quote-close.svg"
          alt=""
          width={48}
          height={48}
          aria-hidden="true"
          className={st.quoteClose}
        />
      </motion.div>
    </section>
  );
};
