'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './Different.module.scss';

const cards = [
  {
    title: 'Elastic Workforce',
    text: 'Scale from 0 to thousands of calls without hiring more agents.',
    illustration: 'activeCalls',
  },
  {
    title: 'Always On',
    text: 'AI outbound calling agents run 24/7.',
    illustration: 'status247',
  },
  {
    title: 'Consistency',
    text: 'Every outbound call follows your process without variability.',
    illustration: 'callProcess',
  },
  {
    title: 'Real-Time Speed',
    text: 'From lead capture to first call in seconds.',
    illustration: 'instantResponse',
  },
];

function ActiveCallsIllustration() {
  return (
    <div className={st.miniCard}>
      <div className={st.miniCardHeader}>
        <span className={st.miniCardTitle}>Active Calls</span>
        <span className={st.badgeBlue}>Auto-scaled AI agents</span>
      </div>
      <div className={st.callsChart}>
        <span className={st.callBubble} style={{ top: '0%', left: '0%' }}>
          0
        </span>
        <span className={st.callBubble} style={{ top: '60%', left: '25%' }}>
          250
        </span>
        <span className={st.callBubble} style={{ top: '10%', left: '50%' }}>
          1,200
        </span>
        <span className={st.callBubble} style={{ top: '35%', left: '78%' }}>
          3,480
        </span>
      </div>
    </div>
  );
}

function Status247Illustration() {
  const times = ['00:00', '06:00', '12:00', '18:00', '21:00'];
  return (
    <div className={st.miniCard}>
      <div className={st.miniCardHeader}>
        <span className={st.miniCardTitle}>24/7 Status</span>
        <span className={st.badgeGreen}>System Active</span>
      </div>
      <div className={st.timeTags}>
        {times.map((t) => (
          <div key={t} className={st.timeTag}>
            <span className={st.timeLabel}>{t}</span>
            <span className={st.timeValue}>Calls</span>
          </div>
        ))}
      </div>
    </div>
  );
}

function CallProcessIllustration() {
  const steps = ['Greeting', 'Qualification', 'Offer', 'Booking'];
  return (
    <div className={st.miniCard}>
      <p className={st.miniCardTitle}>Standardized call process</p>
      <div className={st.processFlow}>
        <div className={st.processRow}>
          {steps.slice(0, 2).map((s) => (
            <div key={s} className={st.processStep}>
              <span className={st.processDot} />
              <span>{s}</span>
            </div>
          ))}
        </div>
        <div className={st.processRow}>
          {steps.slice(2).map((s) => (
            <div key={s} className={st.processStep}>
              <span className={st.processDot} />
              <span>{s}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

function InstantResponseIllustration() {
  const items = [
    { num: 1, label: 'Lead captured', time: '10:01', active: false },
    { num: 2, label: 'Dialing', time: '10:01', active: false },
    { num: 3, label: 'Call connected', time: '10:02', active: true },
  ];
  return (
    <div className={st.miniCard}>
      <p className={st.miniCardTitle}>Instant response</p>
      <div className={st.responseSteps}>
        {items.map((item) => (
          <div
            key={item.num}
            className={`${st.responseStep} ${item.active ? st.responseStepActive : ''}`}
          >
            <span className={st.responseNum}>{item.num}</span>
            <span className={st.responseLabel}>{item.label}</span>
            <span className={st.responseTime}>{item.time}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const illustrations: Record<string, React.FC> = {
  activeCalls: ActiveCallsIllustration,
  status247: Status247Illustration,
  callProcess: CallProcessIllustration,
  instantResponse: InstantResponseIllustration,
};

export const Different = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        What Makes Outbound AI Different
      </motion.h2>

      <div className={st.grid}>
        {cards.map((card) => {
          const Illust = illustrations[card.illustration];
          return (
            <motion.div
              key={card.title}
              className={st.card}
              variants={blurInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <div className={st.illustWrap}>
                <Illust />
              </div>
              <div className={st.cardText}>
                <h3>{card.title}</h3>
                <p>{card.text}</p>
              </div>
            </motion.div>
          );
        })}
      </div>

      <motion.div
        className={st.cta}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        <Link href="#demo">
          <Button size="md">Stop missing Sale calls</Button>
        </Link>
      </motion.div>
    </section>
  );
};
