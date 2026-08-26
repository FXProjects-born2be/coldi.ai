'use client';

import { type CSSProperties, useRef } from 'react';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { studySections } from '../data';
import st from './CaseStudies.module.scss';

const variantClassMap = {
  challenge: st.gridChallenge,
  solution: st.gridSolution,
  results: st.gridResults,
  drivers: st.gridDrivers,
} as const;

type CaseStudyCardProps = {
  index: number;
  number: string;
  title: string;
  description?: string;
  label: string;
  variant: keyof typeof variantClassMap;
  items: (typeof studySections)[number]['items'];
};

const CaseStudyCard = ({
  index,
  number,
  title,
  description,
  label,
  variant,
  items,
}: CaseStudyCardProps) => {
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
            <span className={st.badge}>{label}</span>
            <h2>{title}</h2>
            {description && <p>{description}</p>}
          </div>
          <div className={st.number}>{number}</div>
        </div>

        <div className={st.divider} />

        <div className={`${st.grid} ${variantClassMap[variant]}`}>
          {items.map((item) => (
            <article key={item.title} className={st.infoCard}>
              <h3>{item.title}</h3>
              {item.description && <p>{item.description}</p>}
              {item.points && (
                <ul>
                  {item.points.map((point) => (
                    <li key={point}>{point}</li>
                  ))}
                </ul>
              )}
            </article>
          ))}
        </div>
      </motion.div>
    </article>
  );
};

export const CaseStudies = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        {studySections.map((section, index) => (
          <CaseStudyCard
            key={section.number}
            index={index}
            number={section.number}
            title={section.title}
            description={section.description}
            label={section.label}
            variant={section.variant}
            items={section.items}
          />
        ))}
      </div>
    </section>
  );
};
