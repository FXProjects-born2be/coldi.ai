'use client';

import { useRef } from 'react';
import Image from 'next/image';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';
import type { CSSProperties } from 'react';

import { processSections } from '../data';
import st from './Process.module.scss';

const ProcessCard = ({
  index,
  section,
}: {
  index: number;
  section: (typeof processSections)[number];
}) => {
  const cardRef = useRef<HTMLElement | null>(null);
  const shouldReduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: cardRef,
    offset: ['start 85%', 'start 20%'],
  });

  const y = useTransform(scrollYProgress, [0, 1], [88, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [0.94, 1]);
  const opacity = useTransform(scrollYProgress, [0, 1], [0.55, 1]);

  return (
    <article
      ref={cardRef}
      className={st.stickyItem}
      style={
        {
          '--stack-offset': `${index * 5}px`,
          '--stack-z': index + 1,
        } as CSSProperties
      }
    >
      <motion.div
        className={st.card}
        style={shouldReduceMotion ? undefined : { y, scale, opacity }}
      >
        <div className={st.header}>
          <div className={st.headerCopy}>
            <span className={st.badge}>{section.label}</span>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <div className={st.number}>{section.number}</div>
        </div>

        {section.variant === 'summary' ? (
          <>
            <div className={st.divider} />
            <div className={st.summaryGrid}>
              {section.items?.map((item) => (
                <article key={item.title} className={st.summaryCard}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </>
        ) : (
          <div className={`${st.visual} ${st[`visual${capitalize(section.variant)}`]}`}>
            {section.variant === 'triage' && section.desktopImage && (
              <Image
                src={section.desktopImage}
                alt=""
                width={1000}
                height={280}
                className={st.desktopImage}
              />
            )}
            {section.variant === 'triage' && section.mobileImage && (
              <Image
                src={section.mobileImage}
                alt=""
                width={1000}
                height={280}
                className={st.mobileImage}
              />
            )}
            {section.variant === 'capture' && section.desktopImage && (
              <Image
                src={section.desktopImage}
                alt=""
                width={1000}
                height={280}
                className={st.desktopImage}
              />
            )}
            {section.variant === 'capture' && section.mobileImage && (
              <Image
                src={section.mobileImage}
                alt=""
                width={1000}
                height={280}
                className={st.mobileImage}
              />
            )}
            {section.variant === 'scheduling' && section.desktopImage && (
              <Image
                src={section.desktopImage}
                alt=""
                width={1000}
                height={280}
                className={st.desktopImage}
              />
            )}
            {section.variant === 'scheduling' && section.mobileImage && (
              <Image
                src={section.mobileImage}
                alt=""
                width={1000}
                height={280}
                className={st.mobileImage}
              />
            )}
          </div>
        )}
      </motion.div>
    </article>
  );
};

const capitalize = (value: string) => `${value.slice(0, 1).toUpperCase()}${value.slice(1)}`;

export const Process = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        {processSections.map((section, index) => (
          <ProcessCard key={section.number} index={index} section={section} />
        ))}
      </div>
    </section>
  );
};
