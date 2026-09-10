'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';
import { IconAuraTwo } from '@/shared/ui/icons/IconAuraTwo';
import { IconDotWave } from '@/shared/ui/icons/IconDotWave';
import { IconSpeaking } from '@/shared/ui/icons/IconSpeaking';
import { IconTimerTwo } from '@/shared/ui/icons/IconTimerTwo';
import { SoundWave } from '@/shared/ui/icons/SoundWave';

import st from './HomeBuiltFor.module.scss';

import { Link } from '@/i18n/navigation';

type Workflow = {
  id: string;
  icon: string;
};

type HandlesVisual = 'soundWave' | 'auraTwo' | 'timerTwo' | 'dotWave';

type Industry = {
  id: string;
  href: string;
  workflows: Workflow[];
  handles: {
    background: string;
    firstText: string;
    secondText: string;
    answer: string;
    visual: HandlesVisual;
  };
};

const CHAR_MS = 28;
const QUESTION_IN_MS = 500;
const PAUSE_MS = 2000;

type HandlesPhase =
  | 'idle'
  | 'question'
  | 'typing-1'
  | 'hold'
  | 'speaking'
  | 'answer'
  | 'typing-2'
  | 'done';

const VISUALS = {
  soundWave: SoundWave,
  auraTwo: IconAuraTwo,
  timerTwo: IconTimerTwo,
  dotWave: IconDotWave,
} as const;

const industries: Industry[] = [
  {
    id: 'insurance',
    href: '/industries/insurance',
    workflows: [
      { id: 'policy-renewals', icon: '/images/icons/policy-renewals.png' },
      { id: 'claims-follow-up', icon: '/images/icons/claims-follow-up.png' },
      { id: 'quote-qualification', icon: '/images/icons/quote-qualification.svg' },
      { id: 'payment-reminders', icon: '/images/icons/payment-reminders.svg' },
    ],
    handles: {
      background: '/images/general/background.png',
      firstText:
        '"Hi, this is Coldi calling on behalf of [Insurer]. Your policy renews August 3rd — want me to lock in your current rate now?"',
      secondText: '"Done. You\'ll get confirmation by text and email in the next minute."',
      answer: 'Yeah, go ahead.',
      visual: 'soundWave',
    },
  },
  {
    id: 'trading',
    href: '/industries/trading-platforms-brokers',
    workflows: [
      { id: 'lead-qualification', icon: '/images/icons/lead-qualification.svg' },
      { id: 'deposit-activation', icon: '/images/icons/deposit-activation.svg' },
      { id: 'kyc-follow-up', icon: '/images/icons/kys-follow-up.svg' },
      { id: 'client-reactivation', icon: '/images/icons/client-reactivation.svg' },
    ],
    handles: {
      background: '/images/general/background-two.png',
      firstText:
        '"Hi, saw you just registered on [Platform]. Got two minutes to tell me what you\'re looking to trade?"',
      answer: 'Sure, mostly FX pairs.',
      secondText:
        '"Good, I\'ll connect you with an account manager who specializes in FX. They\'ll call within the hour."',
      visual: 'auraTwo',
    },
  },
  {
    id: 'debt-collection',
    href: '/industries/debt-collection',
    workflows: [
      { id: 'debt-payment-reminders', icon: '/images/icons/payment-reminders.svg' },
      { id: 'promise-to-pay', icon: '/images/icons/promise-to-pay.svg' },
      { id: 'payment-plans', icon: '/images/icons/build-payment-plans.svg' },
      { id: 'recovery-campaigns', icon: '/images/icons/recovery-campaigns.svg' },
    ],
    handles: {
      background: '/images/general/background-three.png',
      firstText:
        '"Hi, this is Coldi calling about your account ending 4471. You have a payment of $210 due Friday. Would you like to set up a plan?"',
      answer: 'Can I pay half now and half next month?',
      secondText:
        '"Yes, I can set that up right now. You\'ll get a confirmation text with both dates."',
      visual: 'timerTwo',
    },
  },
  {
    id: 'emis',
    href: '/industries/emis-payments',
    workflows: [
      { id: 'customer-support', icon: '/images/icons/customer-support.svg' },
      { id: 'verification-calls', icon: '/images/icons/verification-calls.svg' },
      { id: 'appointment-booking', icon: '/images/icons/appointment-booking.svg' },
      { id: 'custom-automations', icon: '/images/icons/custom-automations.svg' },
    ],
    handles: {
      background: '/images/general/background-four.png',
      firstText:
        '"Hi, this is Coldi calling on behalf of [Provider]. You started an account application but didn\'t finish verification — got two minutes?"',
      answer: 'Yeah, what do you need?',
      secondText: '"Just a photo ID upload, I\'ll text you the secure link now."',
      visual: 'dotWave',
    },
  },
];

const HomeBuiltForHandlesVisual = ({
  speakingLabel,
  firstText,
  secondText,
  answer,
  visual,
}: {
  speakingLabel: string;
  firstText: string;
  secondText: string;
  answer: string;
  visual: HandlesVisual;
}) => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<HandlesPhase>('idle');
  const [displayed, setDisplayed] = useState('');

  const fullText = phase === 'typing-2' || phase === 'done' ? secondText : firstText;
  const showQuestion = phase !== 'idle';
  const showSpeaking = phase === 'speaking';
  const showAnswer = phase === 'answer' || phase === 'typing-2' || phase === 'done';
  const isWaveActive =
    phase === 'question' || phase === 'typing-1' || phase === 'speaking' || phase === 'typing-2';
  const Visual = VISUALS[visual];
  const isAuraVisual = visual === 'auraTwo' || visual === 'timerTwo';

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        setPhase('question');
      },
      { threshold: 0.35 }
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (phase !== 'question') return;

    const timeoutId = window.setTimeout(() => {
      setPhase('typing-1');
    }, QUESTION_IN_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'typing-1' && phase !== 'typing-2') return;
    if (displayed.length >= fullText.length) return;

    const timeoutId = window.setTimeout(() => {
      const nextText = fullText.slice(0, displayed.length + 1);
      setDisplayed(nextText);

      if (nextText.length >= fullText.length) {
        setPhase(phase === 'typing-1' ? 'hold' : 'done');
      }
    }, CHAR_MS);

    return () => window.clearTimeout(timeoutId);
  }, [displayed, fullText, phase]);

  useEffect(() => {
    if (phase !== 'hold') return;

    const timeoutId = window.setTimeout(() => {
      setPhase('speaking');
    }, PAUSE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'speaking') return;

    const timeoutId = window.setTimeout(() => {
      setPhase('answer');
    }, PAUSE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'answer') return;

    const timeoutId = window.setTimeout(() => {
      setDisplayed('');
      setPhase('typing-2');
    }, PAUSE_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  return (
    <>
      <div ref={rootRef} className={st.home_built_for__visual_reaction}>
        {showSpeaking && (
          <div className={st.home_built_for__visual_speaking_handles}>
            <p className={st.home_built_for__visual_speaking_title}>{speakingLabel}</p>
            <IconSpeaking />
            <div className={st.home_built_for__visual_speaking_icon}>
              <Image src="/icons/speaking.svg" alt="" width={54} height={54} />
            </div>
          </div>
        )}

        {showAnswer && (
          <div className={st.home_built_for__visual_answer_wrapper}>
            <p className={st.home_built_for__visual_answer}>{answer}</p>
          </div>
        )}
      </div>

      <div>
        {showQuestion && (
          <div className={st.home_built_for__visual_question_wrapper}>
            <p className={st.home_built_for__visual_question}>{displayed}</p>
          </div>
        )}

        <div className={st.home_built_for__visual_logo}>
          <Image alt="" width={60} height={60} src="/icons/logo-white.svg" />
        </div>
      </div>

      <div
        className={cn(
          st.home_built_for__visual_sound_wave,
          isAuraVisual && st.home_built_for__visual_sound_wave_aura
        )}
      >
        <Visual active={isWaveActive} />
      </div>
    </>
  );
};

export const HomeBuiltFor = () => {
  const t = useTranslations('HomeBuiltFor');
  const [industryId, setIndustryId] = useState(industries[0].id);

  const industryIndex = industries.findIndex((item) => item.id === industryId);
  const industry = industries[industryIndex] ?? industries[0];
  const industryLabel = t(`industries.${industry.id}.label`);

  const canScrollPrev = industryIndex > 0;
  const canScrollNext = industryIndex < industries.length - 1;

  const goToIndustry = (direction: -1 | 1) => {
    const nextIndex = Math.min(industries.length - 1, Math.max(0, industryIndex + direction));
    setIndustryId(industries[nextIndex].id);
  };

  return (
    <section className={st.home_built_for}>
      <div className="container">
        <div className={st.home_built_for__top}>
          <h2 className={st.home_built_for__title}>{t('title')}</h2>
          <p className={st.home_built_for__description}>{t('description')}</p>
        </div>

        <div className={st.home_built_for__tabs} role="tablist" aria-label={t('tabsAria')}>
          {industries.map((item) => (
            <button
              key={item.id}
              type="button"
              role="tab"
              aria-selected={item.id === industry.id}
              className={cn(st.home_built_for__tab, item.id === industry.id && st.active)}
              onClick={() => setIndustryId(item.id)}
            >
              {t(`industries.${item.id}.label`)}
            </button>
          ))}
        </div>

        <div className={st.home_built_for__slider}>
          <button
            type="button"
            className={cn(st.home_built_for__slider_btn, canScrollPrev && st.can_scroll)}
            aria-label={t('prevIndustry')}
            disabled={!canScrollPrev}
            onClick={() => goToIndustry(-1)}
          >
            <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} />
          </button>
          <p className={st.home_built_for__slider_label}>{industryLabel}</p>
          <button
            type="button"
            className={cn(st.home_built_for__slider_btn, canScrollNext && st.can_scroll)}
            aria-label={t('nextIndustry')}
            disabled={!canScrollNext}
            onClick={() => goToIndustry(1)}
          >
            <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} />
          </button>
        </div>

        <div className={st.home_built_for__panel}>
          <h3 className={st.home_built_for__content_title}>{industryLabel}</h3>

          <div className={st.home_built_for__content_items}>
            {industry.workflows.map((item) => (
              <div key={item.id} className={st.home_built_for__content_item}>
                <div className={st.home_built_for__content_item_image}>
                  <Image src={item.icon} alt="" width={20} height={20} loading={'lazy'} />
                </div>
                <p className={st.home_built_for__content_item_title}>
                  {t(`industries.${industry.id}.workflows.${item.id}`)}
                </p>
              </div>
            ))}
          </div>

          <Link
            href={industry.href}
            className={cn('btn btn-primary w-max', st.home_built_for__cta)}
          >
            {t(`industries.${industry.id}.cta`)}
          </Link>

          <div
            className={cn(st.home_built_for__visual, st.home_built_for__visual_handles)}
            style={
              {
                '--home-built-for-visual-bg': `url("${industry.handles.background}")`,
              } as CSSProperties
            }
          >
            <HomeBuiltForHandlesVisual
              key={industry.id}
              speakingLabel={t('speaking')}
              firstText={industry.handles.firstText}
              secondText={industry.handles.secondText}
              answer={industry.handles.answer}
              visual={industry.handles.visual}
            />
          </div>
        </div>
      </div>
    </section>
  );
};
