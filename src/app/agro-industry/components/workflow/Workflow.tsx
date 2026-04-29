'use client';

import { type CSSProperties, useRef } from 'react';
import Image from 'next/image';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { workflowSections } from '../data';
import st from './Workflow.module.scss';

const WorkflowCard = ({
  index,
  section,
}: {
  index: number;
  section: (typeof workflowSections)[number];
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
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </div>
          <div className={st.number}>{section.number}</div>
        </div>

        {section.dataCards ? (
          <div className={st.gridThree}>
            {section.dataCards.map((item) => (
              <article key={item.title} className={st.infoCard}>
                <h3>{item.title}</h3>
                <p>{item.description}</p>
              </article>
            ))}
          </div>
        ) : (
          <div className={st.visualWrap}>
            <Image
              src={section.image!}
              alt={section.imageAlt!}
              width={1014}
              height={272}
              className={st.visual}
            />
          </div>
        )}
      </motion.div>
    </article>
  );
};

export const Workflow = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        {workflowSections.map((section, index) => (
          <WorkflowCard key={section.number} index={index} section={section} />
        ))}
      </div>
    </section>
  );
};
