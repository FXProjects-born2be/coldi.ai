'use client';

import { type CSSProperties, type ReactNode, useRef } from 'react';
import Image from 'next/image';

import { motion, useReducedMotion, useScroll, useTransform } from 'framer-motion';

import {
  aboutSection,
  challengeSection,
  deliveredSection,
  liveSupportSection,
  needSection,
  supportSection,
} from '../data';
import st from './CaseStudies.module.scss';

const cardSections = [
  { number: aboutSection.number, render: <AboutSection /> },
  { number: needSection.number, render: <NeedSection /> },
  { number: challengeSection.number, render: <ChallengeSection /> },
  { number: deliveredSection.number, render: <DeliveredSection /> },
  { number: liveSupportSection.number, render: <LiveSupportSection /> },
  { number: supportSection.number, render: <SupportSection /> },
];

function StickyCard({ index, children }: { index: number; children: ReactNode }) {
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
        {children}
      </motion.div>
    </article>
  );
}

function CardHeader({
  number,
  title,
  description,
  label,
}: {
  number: string;
  title: string;
  description?: string;
  label?: string;
}) {
  return (
    <div className={st.header}>
      <div className={st.headerCopy}>
        {label ? <span className={st.sectionBadge}>{label}</span> : null}
        <h2>{title}</h2>
        {description ? <p>{description}</p> : null}
      </div>
      <div className={st.number}>{number}</div>
    </div>
  );
}

function AboutSection() {
  return (
    <>
      <CardHeader
        number={aboutSection.number}
        title={aboutSection.title}
        description={aboutSection.description}
      />
      <div className={st.aboutVisual}>
        <Image
          src="/images/clarity-global/aboutVisual-desktop.svg"
          alt=""
          width={100}
          height={100}
          className={st.aboutVisualDesktop}
        />
        <Image
          src="/images/clarity-global/aboutVisual-mobile.svg"
          alt=""
          width={100}
          height={100}
          className={st.aboutVisualMobile}
        />
      </div>
      <p className={st.conclusion}>{aboutSection.conclusion}</p>
    </>
  );
}

function NeedSection() {
  return (
    <>
      <CardHeader
        number={needSection.number}
        label={needSection.label}
        title={needSection.title}
        description={needSection.description}
      />
      <div className={st.needGrid}>
        <div className={st.needCopy}>
          {needSection.paragraphs.map((paragraph) => (
            <p key={paragraph}>{paragraph}</p>
          ))}
        </div>
        <div className={st.automationVisual}>
          <div className={st.automationPills}>
            <Image
              src="/images/clarity-global/automationPills-desktop.svg"
              alt=""
              width={100}
              height={100}
              className={st.automationPillsDesktop}
            />
            <Image
              src="/images/clarity-global/automationPills-mobile.svg"
              alt=""
              width={100}
              height={100}
              className={st.automationPillsMobile}
            />
          </div>
        </div>
      </div>
    </>
  );
}

function ChallengeSection() {
  return (
    <>
      <CardHeader
        number={challengeSection.number}
        label={challengeSection.label}
        title={challengeSection.title}
        description={challengeSection.description}
      />
      <div className={st.challengeGrid}>
        {challengeSection.items.map((item) => (
          <article key={item.title} className={st.infoCard}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function DeliveredSection() {
  return (
    <>
      <CardHeader
        number={deliveredSection.number}
        title={deliveredSection.title}
        description={deliveredSection.description}
      />
      <div className={st.deliveredGrid}>
        {deliveredSection.items.map((item) => (
          <article key={item.title} className={st.deliveredCard}>
            <div className={st.iconBadge}>
              <DeliveredIcon icon={item.icon} />
            </div>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
    </>
  );
}

function LiveSupportSection() {
  return (
    <>
      <CardHeader
        number={liveSupportSection.number}
        title={liveSupportSection.title}
        description={liveSupportSection.description}
      />
      <div className={st.liveSupportGrid}>
        <div className={st.liveSupportCopy}>
          <p>{liveSupportSection.intro}</p>
          <ul className={st.blueList}>
            {liveSupportSection.bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
        <div className={st.flowCard}>
          <Image
            src="/images/clarity-global/liveSupport-desktop.svg"
            alt=""
            width={100}
            height={100}
            className={st.liveSupportDesktop}
          />
          <Image
            src="/images/clarity-global/liveSupport-mobile.svg"
            alt=""
            width={100}
            height={100}
            className={st.liveSupportMobile}
          />
        </div>
      </div>
    </>
  );
}

function SupportSection() {
  const supportDescription = supportSection.description.split('\n\n');

  return (
    <>
      <CardHeader number={supportSection.number} title={supportSection.title} />
      <div className={st.supportIntro}>
        {supportDescription.map((paragraph) => (
          <p key={paragraph}>{paragraph}</p>
        ))}
      </div>
      <div className={st.supportGrid}>
        {supportSection.benefitCards.map((item) => (
          <article key={item.title} className={st.infoCardLarge}>
            <h3>{item.title}</h3>
            <p>{item.description}</p>
          </article>
        ))}
      </div>
      <article className={st.qualificationCard}>
        <h3>{supportSection.qualificationTitle}</h3>
        <div className={st.qualificationGrid}>
          <p>{supportSection.qualificationDescription}</p>
          <ul className={st.blueList}>
            {supportSection.qualificationBullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        </div>
      </article>
      <article className={st.routingCard}>
        <h3>{supportSection.routingTitle}</h3>
        <p>{supportSection.routingDescription}</p>
      </article>
    </>
  );
}

function DeliveredIcon({ icon }: { icon: (typeof deliveredSection.items)[number]['icon'] }) {
  if (icon === 'user') {
    return (
      <span className={st.userIcon} aria-hidden="true">
        <Image src="/images/clarity-global/user-head.svg" alt="" width={10} height={6} />
        <Image src="/images/clarity-global/user-body.svg" alt="" width={16} height={10} />
      </span>
    );
  }

  const srcMap = {
    automation: '/images/clarity-global/automation.svg',
    ai: '/images/clarity-global/ai.svg',
    notification: '/images/clarity-global/notification.svg',
    reporting: '/images/clarity-global/reporting.svg',
    audit: '/images/clarity-global/audit.svg',
  } as const;

  return <Image src={srcMap[icon]} alt="" width={24} height={24} />;
}

export const CaseStudies = () => {
  return (
    <section className={st.layout}>
      <div className={st.inner}>
        {cardSections.map((section, index) => (
          <StickyCard key={section.number} index={index}>
            {section.render}
          </StickyCard>
        ))}
      </div>
    </section>
  );
};
