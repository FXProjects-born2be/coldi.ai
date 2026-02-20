'use client';

import { useState } from 'react';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

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

export const How = () => {
  const [playing, setPlaying] = useState(false);

  return (
    <>
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
            Why teams choose AI Voice Agents
          </motion.p>
        </div>
        <div className={st.row}>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>01</span>
            <div>
              <h3>A lead comes in</h3>
              <p>From ads, forms, cold lists or your CRM.</p>
            </div>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>02</span>
            <div>
              <h3>AI Voice Agent calls instantly</h3>
              <p>Qualifies the lead, asks the right questions, and detects intent.</p>
            </div>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>03</span>
            <div>
              <h3>Sales-ready leads get booked</h3>
              <p>Calls are scheduled directly on your sales team’s calendar.</p>
            </div>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <span>04</span>
            <div>
              <h3>Everything is tracked</h3>
              <p>Full visibility across leads, calls, and outcomes.</p>
            </div>
          </motion.div>
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
                  alt=""
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
      </section>
    </>
  );
};
