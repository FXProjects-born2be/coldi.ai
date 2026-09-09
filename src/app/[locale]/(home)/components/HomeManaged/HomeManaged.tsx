'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';
import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/helpers';
import { IconTabProgress } from '@/shared/ui/icons/IconTabProgress';
import { CloseIcon } from '@/shared/ui/icons/outline/close';

import st from './HomeManaged.module.scss';

type ManagedTabImage = {
  src: string;
};

type ManagedTab = {
  id: string;
  image: ManagedTabImage[];
};

const tabs: ManagedTab[] = [
  {
    id: 'calls',
    image: [
      {
        src: '/images/home/managed-one-main.png',
      },
      {
        src: '/images/home/managed-one-sub-one.png',
      },
      {
        src: '/images/home/managed-one-sub-two.png',
      },
    ],
  },
  {
    id: 'analytics',
    image: [
      {
        src: '/images/home/managed-two.png',
      },
    ],
  },
  {
    id: 'agents',
    image: [
      {
        src: '/images/home/managed-three.png',
      },
    ],
  },
  {
    id: 'leads',
    image: [
      {
        src: '/images/home/managed-four.png',
      },
      {
        src: '/images/home/managed-four-sub-one.png',
      },
    ],
  },
  {
    id: 'campaign-performance',
    image: [
      {
        src: '/images/home/managed-five.svg',
      },
      {
        src: '/images/home/managed-fives-sub-one.png',
      },
      {
        src: '/images/home/managed-fives-sub-two.png',
      },
    ],
  },
];

const TAB_DURATION_MS = 60_000;

const IMAGE_MOVE_MS = 500;

const rotateClockwise = (order: number[], slot: number) => {
  const steps = (order.length - slot) % order.length;
  if (steps === 0) return order;
  return [...order.slice(-steps), ...order.slice(0, -steps)];
};

const ManagedVisualImages = ({
  images,
  alt,
  viewLabel,
  onPreview,
}: {
  images: ManagedTabImage[];
  alt: string;
  viewLabel: string;
  onPreview: (image: ManagedTabImage) => void;
}) => {
  const [order, setOrder] = useState(() => images.map((_, index) => index));
  const [liftedSrc, setLiftedSrc] = useState<string | null>(null);

  useEffect(() => {
    if (!liftedSrc) return;
    const timer = window.setTimeout(() => setLiftedSrc(null), IMAGE_MOVE_MS);
    return () => window.clearTimeout(timer);
  }, [liftedSrc]);

  const promote = (slot: number, src: string) => {
    if (slot <= 0 || images.length < 2) return;
    setOrder((current) => rotateClockwise(current, slot));
    setLiftedSrc(src);
  };

  const handleImageClick = (slot: number, image: ManagedTabImage) => {
    if (window.matchMedia('(max-width: 767px)').matches) {
      onPreview(image);
      return;
    }

    promote(slot, image.src);
  };

  return (
    <div className={st.home_managed__visual_images}>
      {images.map((image, originalIndex) => {
        const slot = order.indexOf(originalIndex);

        return (
          <button
            key={image.src}
            type="button"
            className={cn(
              st.home_managed__visual_image,
              st[`home_managed__visual_image--slot-${slot}`],
              liftedSrc === image.src && st['home_managed__visual_image--lift']
            )}
            onClick={() => handleImageClick(slot, image)}
            aria-label={viewLabel}
          >
            <Image
              src={image.src}
              alt={alt}
              fill
              sizes="(max-width: 1024px) 50vw, 720px"
              loading="lazy"
            />
          </button>
        );
      })}
    </div>
  );
};

export const HomeManaged = () => {
  const t = useTranslations('HomeManaged');
  const [activeId, setActiveId] = useState(tabs[0].id);
  const [autoPlay, setAutoPlay] = useState(true);
  const [preview, setPreview] = useState<ManagedTabImage | null>(null);

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];
  const activeTitle = t(`tabs.${activeTab.id}.title`);
  const activeDescription = t(`tabs.${activeTab.id}.description`);

  useEffect(() => {
    if (!autoPlay) return;

    const media = window.matchMedia('(min-width: 1025px)');
    if (!media.matches) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
    if (prefersReducedMotion.matches) return;

    const timer = window.setTimeout(() => {
      setActiveId((current) => {
        const index = tabs.findIndex((tab) => tab.id === current);
        return tabs[(index + 1) % tabs.length].id;
      });
    }, TAB_DURATION_MS);

    return () => window.clearTimeout(timer);
  }, [activeId, autoPlay]);

  useEffect(() => {
    if (!preview) return;

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setPreview(null);
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    window.addEventListener('keydown', onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', onKeyDown);
    };
  }, [preview]);

  const closePreview = () => setPreview(null);

  const selectTab = (id: string) => {
    setAutoPlay(false);
    setPreview(null);
    setActiveId(id);
  };

  const goToTab = (direction: number) => {
    setAutoPlay(false);
    setPreview(null);
    const index = tabs.findIndex((tab) => tab.id === activeId);
    setActiveId(tabs[(index + direction + tabs.length) % tabs.length].id);
  };

  return (
    <section className={st.home_managed}>
      <div className="container">
        <div className={st.home_managed__top}>
          <h2 className={st.home_managed__title}>{t('title')}</h2>
          <p className={st.home_managed__description}>{t('description')}</p>
        </div>

        <div className={st.home_managed__panel}>
          <div className={st.home_managed__tabs} role="tablist" aria-label={t('tabsAria')}>
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTab.id}
                className={cn(st.home_managed__tab, tab.id === activeTab.id && st.active)}
                onClick={() => selectTab(tab.id)}
              >
                <span className={st.home_managed__tab_title}>{t(`tabs.${tab.id}.title`)}</span>
                <span
                  className={cn(st.home_managed__tab_text, st['home_managed__tab_text--desktop'])}
                >
                  {t(`tabs.${tab.id}.description`)}
                </span>
                {autoPlay && tab.id === activeTab.id ? (
                  <IconTabProgress durationMs={TAB_DURATION_MS} />
                ) : null}
              </button>
            ))}
          </div>

          <div className={cn(st.home_managed__main, st[`home_managed__main_${activeTab.id}`])}>
            <div className={st.home_managed__visual}>
              <ManagedVisualImages
                key={activeTab.id}
                images={activeTab.image}
                alt={activeTitle}
                viewLabel={t('viewScreenshot', { title: activeTitle })}
                onPreview={setPreview}
              />
            </div>

            <div className={st.home_managed__tabs_mobile}>
              <span className={st.home_managed__tab_title}>{activeTitle}</span>
              <span className={st.home_managed__tab_text}>{activeDescription}</span>
            </div>
          </div>

          {preview
            ? createPortal(
                <div
                  className={st.home_managed__preview}
                  role="dialog"
                  aria-modal="true"
                  aria-label={activeTitle}
                  onClick={closePreview}
                >
                  <div
                    className={st.home_managed__preview_image}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Image src={preview.src} alt={activeTitle} />
                  </div>
                  <button
                    type="button"
                    className={st.home_managed__preview_close}
                    onClick={closePreview}
                    aria-label={t('close')}
                  >
                    <CloseIcon />
                  </button>
                </div>,
                document.body
              )
            : null}

          <div className={st.home_managed__slider}>
            <button
              type="button"
              className={st.home_managed__slider_btn}
              aria-label={t('prevTab')}
              onClick={() => goToTab(-1)}
            >
              <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} />
            </button>
            <p className={st.home_managed__slider_label}>{activeTitle}</p>
            <button
              type="button"
              className={st.home_managed__slider_btn}
              aria-label={t('nextTab')}
              onClick={() => goToTab(1)}
            >
              <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
