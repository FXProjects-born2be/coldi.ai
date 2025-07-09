'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { useWindowSize } from '@/shared/lib/hooks/use-window-size';

import st from './WhatIs.module.scss';

export const WhatIs = () => {
  const { width } = useWindowSize();

  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        What Coldi Really Is
      </motion.h2>
      <motion.section
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={st.content}
      >
        <Image src="/full-logo.svg" alt="Coldi" width={159} height={50} />
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          Coldi is built to sound human, think fast, and act smarter. While speaking to one person,
          it draws from thousands of similar interactions in real-time – reading tone, context, and
          intent – to craft the perfect reply. The result? Conversations are so natural and
          persuasive that your prospects don’t just listen – they convert. Coldi isn’t just an AI
          agent. It’s the best sales rep you’ve ever had.
        </motion.p>
      </motion.section>
      {width > 768 ? (
        <motion.div
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src="/images/home/what-it-is.png"
            alt="What Coldi Really Is"
            width={801}
            height={598}
            unoptimized
          />
        </motion.div>
      ) : (
        <motion.div
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src="/images/home/what-it-is-mob.png"
            alt="What Coldi Really Is"
            width={326}
            height={598}
            unoptimized
          />
        </motion.div>
      )}
    </section>
  );
};
