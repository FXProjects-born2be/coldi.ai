'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { Counter } from '@/shared/ui/components/counter';

import st from './SolutionsDeliver.module.scss';

const CARDS = [
  {
    id: 'hoursSaved',
    value: 12702,
    image: null,
  },
  {
    id: 'meetings',
    value: 577,
    image: '/icons/streamline-ultimate_work-from-home-laptop-meeting.svg',
  },
  {
    id: 'transfers',
    value: 521,
    image: '/icons/hugeicons_arrow-data-transfer-horizontal.svg',
  },
  {
    id: 'callbacks',
    value: 685,
    image: '/icons/fluent_call-inbound-16-regular.svg',
  },
] as const;

export const SolutionsDeliver = () => {
  const t = useTranslations('SolutionsDeliver');
  const cardsRef = useRef<HTMLDivElement>(null);
  const [play, setPlay] = useState(false);

  useEffect(() => {
    const node = cardsRef.current;
    if (!node || play) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry?.isIntersecting) return;

        setPlay(true);
        observer.disconnect();
      },
      { threshold: 0.3 }
    );

    observer.observe(node);

    return () => observer.disconnect();
  }, [play]);

  return (
    <section className={st.solutions_deliver}>
      <div className="container">
        <div className={st.solutions_deliver__panel}>
          <h2 className={st.solutions_deliver__title}>{t('title')}</h2>
          <p className={st.solutions_deliver__description}>{t('description')}</p>
          <div ref={cardsRef} className={st.solutions_deliver__cards}>
            {CARDS.map((card) => (
              <article key={card.id} className={st.solutions_deliver__card}>
                {card.image && (
                  <div className={st.solutions_deliver__media}>
                    <Image src={card.image} alt="Icon" width={24} height={24} />
                  </div>
                )}
                <div>
                  <p className={st.solutions_deliver__value}>
                    <Counter
                      start={0}
                      end={card.value}
                      play={play}
                      separator
                      duration={7.6}
                      mobileDuration={3.8}
                    />
                  </p>
                  <h3 className={st.solutions_deliver__card_title}>
                    {t(`cards.${card.id}.title`)}
                  </h3>
                </div>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
