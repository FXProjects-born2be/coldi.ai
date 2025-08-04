'use client';
import { useEffect, useState } from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { Button } from '@/shared/ui/kit/button';
import { Chip } from '@/shared/ui/kit/chip';

import st from './Hero.module.scss';

export const Hero = () => {
  const [isSmall, setIsSmall] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsSmall(window.innerWidth < 1300);
    };
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <>
      <section className={st.layout}>
        <div className={st.header}>
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
                  initial={{ x: isSmall ? -128 : -256 }}
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
                className={st.chip}
              >
                <Chip variant="secondary">Sales. Retention. Support. </Chip>
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
                  whileInView={{ x: isSmall ? 116 : 235 }}
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
              Meet Codli Agents
            </motion.h2>
          </section>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.desc}
          >
            Coldi voices step into real workflows and deliver real results.
          </motion.p>

          <Link href="/call-request">
            <motion.div
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Button size="md">Request Now</Button>
            </motion.div>
          </Link>
        </div>
      </section>
      <div className={st.video}>
        <video
          src="/videos/products/hero.mp4"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          controls={false}
        />
      </div>
    </>
  );
};
