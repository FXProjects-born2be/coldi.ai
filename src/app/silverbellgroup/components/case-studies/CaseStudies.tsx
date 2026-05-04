'use client';

import { type CSSProperties, useRef, useState } from 'react';
import Image from 'next/image';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import { PlayIcon } from '@/shared/ui/icons/fill/play';

import { studySections } from '../data';
import st from './CaseStudies.module.scss';
import { ProcessDiagram } from './ProcessDiagram';

const VideoCaseStudy = ({ videoId, title }: { videoId: string; title: string }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const thumbnailSrc = `https://i.ytimg.com/vi/${videoId}/hqdefault.jpg`;
  const embedSrc = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0`;

  return (
    <div className={st.videoFrame}>
      <div className={st.videoInner}>
        {isPlaying ? (
          <iframe
            className={st.videoEmbed}
            src={embedSrc}
            title={title}
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <>
            <Image className={st.videoPoster} src={thumbnailSrc} alt="" fill sizes="100vw" />
            <button
              type="button"
              className={st.playButton}
              onClick={() => setIsPlaying(true)}
              aria-label={`Play video: ${title}`}
            >
              <PlayIcon />
              <span>Play</span>
            </button>
          </>
        )}
      </div>
    </div>
  );
};

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
          '--stack-offset': `${index * 4}px`,
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
            {section.label && <span className={st.badge}>{section.label}</span>}
            <h2>{section.title}</h2>
            {section.description && <p>{section.description}</p>}
          </div>
          <div className={st.number}>{section.number}</div>
        </div>

        {section.variant === 'diagram' ? (
          <ProcessDiagram />
        ) : section.variant === 'video' && section.videoId ? (
          <VideoCaseStudy videoId={section.videoId} title={section.title} />
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
