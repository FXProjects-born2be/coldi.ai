'use client';

import { type CSSProperties, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';
import { SoundWave } from '@/shared/ui/icons/SoundWave';

import st from './InsuranceHandles.module.scss';

import { Link } from '@/i18n/navigation';

const items = [
  { id: 'policy-renewals', icon: '/icons/ic_outline-policy.svg', label: 'Policy Renewals' },
  {
    id: 'claims-follow-up',
    icon: '/icons/hugeicons_ai-audio.svg',
    label: 'Claims Follow-up',
  },
  {
    id: 'quote-qualification',
    icon: '/icons/octicon_comment-ai-16.svg',
    label: 'Quote Qualification',
  },
  {
    id: 'payment-reminders',
    icon: '/icons/fluent_receipt-sparkles-24-regular.svg',
    label: 'Payment Reminders',
  },
  {
    id: 'document-kyc',
    icon: '/icons/ri_file-ai-2-line.svg',
    label: 'Document / KYC Chasing',
  },
] as const;

const FIRST_TEXT =
  'Coldi: "Hi, saw you just registered on [Platform]. Got two minutes to tell me what you\'re looking to trade?"';
const SECOND_TEXT =
  'Coldi: "Good, I\'ll connect you with an account manager who specializes in FX. They\'ll call within the hour."';

const CHAR_MS = 28;
const QUESTION_IN_MS = 500;
const SPEAKING_MS = 1600;
const AFTER_ANSWER_MS = 1200;
const ITEM_MS = 5000;
const TABLET_MQ = '(max-width: 1024px)';

const BOTS_HREF = '/solutions?tab=trading#solutions-info';
type Phase = 'idle' | 'question' | 'typing-1' | 'speaking' | 'answer' | 'typing-2' | 'done';
type ItemId = (typeof items)[number]['id'];

export const InsuranceHandles = () => {
  const rootRef = useRef<HTMLDivElement>(null);
  const [phase, setPhase] = useState<Phase>('idle');
  const [displayed, setDisplayed] = useState('');
  const [isTablet, setIsTablet] = useState(false);
  const [itemsInView, setItemsInView] = useState(false);
  const [activeItemId, setActiveItemId] = useState<ItemId>(items[0].id);

  const isTyping = phase === 'typing-1' || phase === 'typing-2';
  const fullText = phase === 'typing-2' || phase === 'done' ? SECOND_TEXT : FIRST_TEXT;

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        setPhase('question');
        setItemsInView(true);
      },
      { threshold: 0.35 }
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const media = window.matchMedia(TABLET_MQ);
    const update = () => setIsTablet(media.matches);

    update();
    media.addEventListener('change', update);

    return () => media.removeEventListener('change', update);
  }, []);

  useEffect(() => {
    if (!isTablet || !itemsInView) return;

    const timeoutId = window.setTimeout(() => {
      setActiveItemId((current) => {
        const index = items.findIndex((item) => item.id === current);

        return items[(index + 1) % items.length].id;
      });
    }, ITEM_MS);

    return () => window.clearTimeout(timeoutId);
  }, [activeItemId, isTablet, itemsInView]);

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
        setPhase(phase === 'typing-1' ? 'speaking' : 'done');
      }
    }, CHAR_MS);

    return () => window.clearTimeout(timeoutId);
  }, [displayed, fullText, phase]);

  useEffect(() => {
    if (phase !== 'speaking') return;

    const timeoutId = window.setTimeout(() => {
      setPhase('answer');
    }, SPEAKING_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  useEffect(() => {
    if (phase !== 'answer') return;

    const timeoutId = window.setTimeout(() => {
      setDisplayed('');
      setPhase('typing-2');
    }, AFTER_ANSWER_MS);

    return () => window.clearTimeout(timeoutId);
  }, [phase]);

  const showQuestion = phase !== 'idle';
  const showSpeaking = phase === 'speaking';
  const showAnswer = phase === 'answer' || phase === 'typing-2' || phase === 'done';

  return (
    <section className={st.insurance_handles}>
      <div className={'container'}>
        <div ref={rootRef} className={st.insurance_handles__row}>
          <div className={st.insurance_handles__left}>
            <h2 className={st.insurance_handles__title}>What Coldi Handles</h2>

            <ul
              className={st.insurance_handles__list}
              style={{ '--insurance-handles-item-duration': `${ITEM_MS}ms` } as CSSProperties}
            >
              {items.map((item) => (
                <li
                  key={item.id}
                  className={cn(
                    st.insurance_handles__item,
                    item.id === activeItemId && st.insurance_handles__item_active,
                    isTablet &&
                      itemsInView &&
                      item.id === activeItemId &&
                      st.insurance_handles__item_filling
                  )}
                >
                  <span className={st.insurance_handles__item_icon}>
                    <Image src={item.icon} alt={item.label} width={24} height={24} />
                  </span>
                  <span className={st.insurance_handles__item_label}>{item.label}</span>
                </li>
              ))}
            </ul>

            <Link
              href={BOTS_HREF}
              className={cn('btn btn-secondary', st.insurance_handles__btn_desktop)}
            >
              Check Available Bots
            </Link>
          </div>

          <div className={st.insurance_handles__right}>
            <div className={st.insurance_handles__reaction}>
              {showSpeaking && (
                <div className={st.insurance_handles__right_top}>
                  <p className={st.insurance_handles__right_top_text}>Speaking...</p>
                  <Image src={'/icons/voice.svg'} alt={'Icon'} width={24} height={24} />
                  <div className={st.insurance_handles__right_top_icon_speaking}>
                    <Image src={'/icons/speaking.svg'} alt={'Icon'} width={54} height={54} />
                  </div>
                </div>
              )}

              {showAnswer && (
                <div className={st.insurance_handles__answer_wrapper}>
                  <p className={st.insurance_handles__answer}>Yeah, go ahead.</p>
                </div>
              )}
            </div>

            <div>
              {showQuestion && (
                <div className={st.insurance_handles__question_wrapper}>
                  <p className={st.insurance_handles__question}>{displayed}</p>
                </div>
              )}
              <div className={st.insurance_handles__logo}>
                <Image alt="Icon" width="60" height="60" src="/icons/logo-white.svg" />
              </div>
            </div>

            <div className={st.insurance_handles__sound_wave}>
              <SoundWave active={isTyping} />
            </div>
          </div>

          <Link
            href={BOTS_HREF}
            className={cn('btn btn-secondary', st.insurance_handles__btn_tablet)}
          >
            Check Available Bots
          </Link>
        </div>
      </div>
    </section>
  );
};
