'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import st from './SolutionsDeliver.module.scss';

const CARDS = [
  {
    id: 'conversations',
    value: '56.5%',
    image: { src: '/images/solutions/deliver-one.svg', width: 262, height: 191 },
  },
  {
    id: 'nextStage',
    value: '33.3%',
    image: { src: '/images/solutions/deliver-two.svg', width: 268, height: 178 },
  },
  {
    id: 'callback',
    value: '17.6%',
    image: { src: '/images/solutions/deliver-three.png', width: 301, height: 156 },
  },
] as const;

export const SolutionsDeliver = () => {
  const t = useTranslations('SolutionsDeliver');
  const viewportRef = useRef<HTMLDivElement>(null);
  const slideRefs = useRef<(HTMLElement | null)[]>([]);
  const [activeIndex, setActiveIndex] = useState(0);

  const getClosestIndex = useCallback(() => {
    const viewport = viewportRef.current;
    if (!viewport) return 0;

    const center = viewport.scrollLeft + viewport.clientWidth / 2;
    let closest = 0;
    let distance = Infinity;

    slideRefs.current.forEach((slide, index) => {
      if (!slide) return;

      const mid = slide.offsetLeft + slide.offsetWidth / 2;
      const nextDistance = Math.abs(mid - center);

      if (nextDistance < distance) {
        distance = nextDistance;
        closest = index;
      }
    });

    return closest;
  }, []);

  const scrollToIndex = (index: number) => {
    const viewport = viewportRef.current;
    const slide = slideRefs.current[index];
    if (!viewport || !slide) return;

    viewport.scrollTo({
      left: slide.offsetLeft - (viewport.clientWidth - slide.offsetWidth) / 2,
      behavior: 'smooth',
    });
    setActiveIndex(index);
  };

  const goTo = (direction: -1 | 1) => {
    const next = Math.min(CARDS.length - 1, Math.max(0, getClosestIndex() + direction));
    scrollToIndex(next);
  };

  return (
    <section className={st.solutions_deliver}>
      <div className="container">
        <div className={st.solutions_deliver__panel}>
          <h2 className={st.solutions_deliver__title}>{t('title')}</h2>

          <div
            ref={viewportRef}
            className={st.solutions_deliver__viewport}
            onScroll={() => {
              const closest = getClosestIndex();
              setActiveIndex((current) => (current === closest ? current : closest));
            }}
          >
            {CARDS.map((card, index) => (
              <article
                key={card.id}
                className={st.solutions_deliver__card}
                ref={(node) => {
                  slideRefs.current[index] = node;
                }}
              >
                <div className={st.solutions_deliver__media}>
                  <Image
                    src={card.image.src}
                    alt=""
                    width={card.image.width}
                    height={card.image.height}
                  />
                </div>
                <p className={st.solutions_deliver__value}>{card.value}</p>
                <h3 className={st.solutions_deliver__card_title}>{t(`cards.${card.id}.title`)}</h3>
                <p className={st.solutions_deliver__card_text}>
                  {t(`cards.${card.id}.description`)}
                </p>
              </article>
            ))}
          </div>

          <div className={st.solutions_deliver__nav}>
            <button
              type="button"
              className={st.solutions_deliver__nav_prev}
              aria-label={t('prevSlide')}
              disabled={activeIndex === 0}
              onClick={() => goTo(-1)}
            >
              <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} />
            </button>
            <button
              type="button"
              className={st.solutions_deliver__nav_next}
              aria-label={t('nextSlide')}
              disabled={activeIndex === CARDS.length - 1}
              onClick={() => goTo(1)}
            >
              <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
