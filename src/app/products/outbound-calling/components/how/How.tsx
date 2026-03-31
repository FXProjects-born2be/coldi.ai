'use client';

import { useState } from 'react';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './How.module.scss';

const YOUTUBE_VIDEO_ID = 'wTg_XClaLFI';
const YOUTUBE_THUMB = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/maxresdefault.jpg`;

function PlayIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="80"
      height="80"
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden
    >
      <circle cx="40" cy="40" r="40" fill="rgba(0,0,0,0.5)" />
      <circle cx="40" cy="40" r="36" stroke="white" strokeWidth="2" fill="none" />
      <path
        d="M32 26v28l22-14-22-14z"
        fill="white"
        stroke="white"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
    </svg>
  );
}

const steps = [
  {
    num: '01',
    title: 'Upload contacts or connect your CRM',
    text: 'Import leads from ads, forms, databases or outbound lists.',
  },
  {
    num: '02',
    title: 'AI Outbound Calling Agent starts calling',
    text: 'AI handles the first conversation instantly.',
  },
  {
    num: '03',
    title: 'Lead qualification in real time',
    text: 'Intent detection and smart qualification logic.',
  },
  {
    num: '04',
    title: 'Handoff or meeting scheduling',
    text: 'Qualified leads get transferred live or booked directly into your calendar.',
  },
];

export const How = () => {
  const [playing, setPlaying] = useState(false);
  return (
    <section className={st.layout}>
      <div className={st.header}>
        <motion.h2
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          How it Works
        </motion.h2>
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          From lead list to booked call — fully automated
        </motion.p>
      </div>

      <div className={st.content}>
        <div className={st.grid}>
          {steps.map((step) => (
            <motion.div
              key={step.num}
              className={st.item}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <span>{step.num}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.text}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          className={st.videoWrap}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {!playing ? (
            <button
              type="button"
              className={st.poster}
              onClick={() => setPlaying(true)}
              aria-label="Play video"
            >
              {/* eslint-disable-next-line @next/next/no-img-element -- YouTube thumbnail with fallback; source is external */}
              <img
                src={YOUTUBE_THUMB}
                alt={imageAlt(
                  'outboundCalling',
                  'How it works — video thumbnail (play to watch on YouTube)'
                )}
                className={st.posterImage}
                loading="lazy"
                onError={(e) => {
                  const t = e.currentTarget;
                  t.src = `https://img.youtube.com/vi/${YOUTUBE_VIDEO_ID}/sddefault.jpg`;
                }}
              />
              <span className={st.playButton}>
                <PlayIcon />
              </span>
            </button>
          ) : (
            <iframe
              className={st.video}
              src={`https://www.youtube.com/embed/${YOUTUBE_VIDEO_ID}?autoplay=1&rel=0`}
              title="How it Works"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          )}
        </motion.div>
      </div>

      <motion.div
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link href="#demo">
          <Button size="md">Book a Demo</Button>
        </Link>
      </motion.div>
    </section>
  );
};
