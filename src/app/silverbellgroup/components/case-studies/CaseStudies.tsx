'use client';

import { type CSSProperties, useRef } from 'react';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { studySections } from '../data';
import st from './CaseStudies.module.scss';
import { ProcessDiagram } from './ProcessDiagram';

const CaseStudyCard = ({
  index,
  section,
}: {
  index: number;
  section: (typeof studySections)[number];
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
          '--stack-offset': `${index * 28}px`,
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

        {section.variant === 'diagram' ? (
          <ProcessDiagram />
        ) : (
          <>
            <div className={st.divider} />
            <div className={st.gridThree}>
              {section.items?.map((item) => (
                <article key={item.title} className={st.infoCard}>
                  <h3>{item.title}</h3>
                  <p>{item.description}</p>
                </article>
              ))}
            </div>
          </>
        )}
      </motion.div>
    </article>
  );
};

export const CaseStudies = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        {studySections.map((section, index) => (
          <CaseStudyCard key={section.number} index={index} section={section} />
        ))}
      </div>
    </section>
  );
};
