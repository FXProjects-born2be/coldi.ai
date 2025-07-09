'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { TypingText } from '@/shared/ui/components/typing-text';
import { Button } from '@/shared/ui/kit/button';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={st.hero}>
      <section className={st.hero__content}>
        <div className={st.hero__title}>
          <motion.h1
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Coldi <br />
            Brand-Tuned
            <br /> <span className={st.highlighted}>AI Talkers</span>
          </motion.h1>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Hired and Ready Before You Even Say &quot;Engage!&quot;
          </motion.p>
        </div>
        <Link href="/call-request">
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Button size="md">Receive the Call</Button>
          </motion.div>
        </Link>
      </section>
      <TypingText text="Welcome to Coldi!" speed={150} delay={500} className={st.hero__subtitle} />
      <video
        className={st.hero__video}
        src="/videos/home/hero2.mp4"
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        controls={false}
      />
      <div className={st.hero__videoMobileContainer}>
        <TypingText
          text="Welcome to Coldi!"
          speed={150}
          delay={500}
          className={st.hero__subtitleMobile}
        />
        <video
          className={st.hero__videoMobile}
          src="/videos/home/hero2.mp4"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          controls={false}
        />
      </div>
    </section>
  );
};
