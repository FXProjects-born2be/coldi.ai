'use client';

import { type CSSProperties, Fragment, useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import st from './AboutInfo.module.scss';

const AUTO_MS = 5000;

const blocks = [
  {
    id: 'phone-capacity',
    image: {
      src: '/images/about/about1.png',
      width: 427,
      height: 506,
    },
  },
  {
    id: 'work-in-business',
    image: {
      src: '/images/about/about2.png',
      width: 516,
      height: 515,
    },
  },
  {
    id: 'workflow',
    image: {
      src: '/images/about/about3.png',
      width: 564,
      height: 564,
    },
  },
  {
    id: 'operations',
    image: {
      src: '/images/about/about4.png',
      width: 427,
      height: 309,
    },
  },
  {
    id: 'global',
    image: {
      src: '/images/about/about5.png',
      width: 564,
      height: 564,
    },
  },
] as const;

type BlockId = (typeof blocks)[number]['id'];

export const AboutInfo = () => {
  const t = useTranslations('AboutInfo');
  const rootRef = useRef<HTMLDivElement>(null);
  const autoplayRef = useRef(true);
  const [inView, setInView] = useState(false);
  const [autoplay, setAutoplay] = useState(true);
  const [activeId, setActiveId] = useState<BlockId>(blocks[0].id);

  useEffect(() => {
    autoplayRef.current = autoplay;
  }, [autoplay]);

  useEffect(() => {
    const root = rootRef.current;

    if (!root) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;

        observer.disconnect();
        setInView(true);

        if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
          autoplayRef.current = false;
          setAutoplay(false);
        }
      },
      { threshold: 0.25 }
    );

    observer.observe(root);

    return () => observer.disconnect();
  }, []);

  const selectTab = (id: BlockId) => {
    autoplayRef.current = false;
    setAutoplay(false);
    setActiveId(id);
  };

  const handleFillEnd = () => {
    if (!autoplayRef.current) return;

    setActiveId((current) => {
      const index = blocks.findIndex((block) => block.id === current);

      return blocks[(index + 1) % blocks.length].id;
    });
  };

  const activeIndex = blocks.findIndex((block) => block.id === activeId);

  return (
    <div ref={rootRef} className={st.about_info}>
      <div className="container">
        <div className={st.about_info__items}>
          <div
            className={st.about_info__items_top}
            role="tablist"
            style={{ '--about-info-tab-duration': `${AUTO_MS}ms` } as CSSProperties}
          >
            {blocks.map((block, index) => {
              const title = t(`blocks.${block.id}.title`);
              const isActive = block.id === activeId;
              const isFilling = autoplay && inView && isActive;
              const isComplete = autoplay && inView && index < activeIndex;
              const isStaticActive = !autoplay && isActive;

              return (
                <button
                  key={block.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  aria-label={title}
                  className={cn(
                    st.about_info__tab,
                    (isComplete || isStaticActive) && st.about_info__tab_active,
                    isFilling && st.about_info__tab_filling
                  )}
                  onClick={() => selectTab(block.id)}
                >
                  <span
                    className={st.about_info__tab_bar}
                    onAnimationEnd={isFilling ? handleFillEnd : undefined}
                  />
                </button>
              );
            })}
          </div>

          {blocks.map((block) => {
            const isActive = block.id === activeId;
            const title = t(`blocks.${block.id}.title`);
            const hasSecondDescription = t.has(`blocks.${block.id}.secondDescription`);

            return (
              <div key={block.id} role="tabpanel" hidden={!isActive} className={st.about_info__row}>
                <div className={st.about_info__col}>
                  <h3 className={st.about_info__title}>
                    {title.split('\n').map((line, lineIndex) => (
                      <Fragment key={line}>
                        {lineIndex > 0 && <br />}
                        {line}
                      </Fragment>
                    ))}
                  </h3>
                  <p className={st.about_info__desc}>{t(`blocks.${block.id}.description`)}</p>
                  {hasSecondDescription && (
                    <p className={st.about_info__second_desc}>
                      {t(`blocks.${block.id}.secondDescription`)}
                    </p>
                  )}
                </div>
                <div className={st.about_info__img}>
                  <Image
                    src={block.image.src}
                    alt={title}
                    width={block.image.width}
                    height={block.image.height}
                    loading="lazy"
                  />
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
