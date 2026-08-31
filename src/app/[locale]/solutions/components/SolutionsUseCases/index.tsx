'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import st from './SolutionsUseCases.module.scss';

const CASES = [
  { id: 'clickomi', image: '/images/solutions/cases-one.png' },
  { id: 'payset', image: '/images/solutions/cases-two.svg' },
  { id: 'clarity', image: '/images/solutions/cases-three.svg' },
  { id: 'stone', image: '/images/solutions/cases-four.svg' },
] as const;

export const SolutionsUseCases = () => {
  const t = useTranslations('SolutionsUseCases');
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
    const next = Math.min(CASES.length - 1, Math.max(0, getClosestIndex() + direction));
    scrollToIndex(next);
  };

  return (
    <section className={st.solutions_use_cases}>
      <div className={cn('container', st.solutions_use_cases__container)}>
        <h2 className={st.solutions_use_cases__title}>{t('title')}</h2>
        <div
          ref={viewportRef}
          className={st.solutions_use_cases__grid}
          onScroll={() => {
            const closest = getClosestIndex();
            setActiveIndex((current) => (current === closest ? current : closest));
          }}
        >
          {CASES.map((item, index) => (
            <article
              key={item.id}
              className={st.solutions_use_cases__card}
              ref={(node) => {
                slideRefs.current[index] = node;
              }}
            >
              <div className={st.solutions_use_cases__card_media}>
                <Image
                  src={item.image}
                  alt={t(`items.${item.id}.title`)}
                  fill
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <h3 className={st.solutions_use_cases__card_title}>{t(`items.${item.id}.title`)}</h3>
              <p className={st.solutions_use_cases__card_text}>
                {t(`items.${item.id}.description`)}
              </p>
              <a href="#" className={cn('btn btn-secondary w-max', st.solutions_use_cases__cta)}>
                {t('readCase')}
              </a>
            </article>
          ))}
        </div>
        <div className={st.solutions_use_cases__nav}>
          <button
            type="button"
            className={st.solutions_use_cases__nav_prev}
            aria-label={t('prevSlide')}
            disabled={activeIndex === 0}
            onClick={() => goTo(-1)}
          >
            <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} />
          </button>
          <button
            type="button"
            className={st.solutions_use_cases__nav_next}
            aria-label={t('nextSlide')}
            disabled={activeIndex === CASES.length - 1}
            onClick={() => goTo(1)}
          >
            <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} />
          </button>
        </div>
      </div>
    </section>
  );
};
