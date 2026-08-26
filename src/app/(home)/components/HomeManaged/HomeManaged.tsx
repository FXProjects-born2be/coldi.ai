'use client';

import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { createPortal } from 'react-dom';

import { cn } from '@/shared/lib/helpers';
import { CloseIcon } from '@/shared/ui/icons/outline/close';

import st from './HomeManaged.module.scss';

type ManagedTabImage = {
  src: string;
  width: number;
  height: number;
};

type ManagedTab = {
  id: string;
  title: string;
  description: string;
  image: ManagedTabImage[];
};

const tabs: ManagedTab[] = [
  {
    id: 'calls',
    title: 'Calls',
    description: 'View call activity, duration, outcomes, and call details.',
    image: [
      {
        src: '/images/home/managed-one-main.png',
        width: 720,
        height: 361,
      },
      {
        src: '/images/home/managed-one-sub-one.png',
        width: 358,
        height: 181,
      },
      {
        src: '/images/home/managed-one-sub-two.png',
        width: 257,
        height: 161,
      },
    ],
  },
  {
    id: 'analytics',
    title: 'Analytics',
    description: 'Track call results, response rates, and key performance metrics.',
    image: [
      {
        src: '/images/home/managed-two.png',
        width: 720,
        height: 330,
      },
    ],
  },
  {
    id: 'agents',
    title: 'Agents',
    description: 'Configure agents, calling settings, scripts, and workflows.',
    image: [
      {
        src: '/images/home/managed-three.png',
        width: 720,
        height: 393,
      },
    ],
  },
  {
    id: 'leads',
    title: 'Leads',
    description: 'Track leads generated and captured from your calling campaigns.',
    image: [
      {
        src: '/images/home/managed-four.png',
        width: 660,
        height: 404,
      },
      {
        src: '/images/home/managed-four-sub-one.png',
        width: 366,
        height: 198,
      },
    ],
  },
  {
    id: 'campaign-performance',
    title: 'Campaign Performance',
    description: 'Monitor overall campaign results, efficiency, and outcomes.',
    image: [
      {
        src: '/images/home/managed-five.png',
        width: 720,
        height: 355,
      },
    ],
  },
];

const TAB_DURATION_MS = 60_000;
const TAB_RADIUS = 16;
const PROGRESS_INSET = 1;

const roundedRectPath = (width: number, height: number, radius: number, inset: number) => {
  const w = width - inset * 2;
  const h = height - inset * 2;
  const r = Math.min(radius, w / 2, h / 2);
  const x = inset;
  const y = inset;
  const midX = x + w / 2;

  return [
    `M ${midX} ${y}`,
    `H ${x + w - r}`,
    `A ${r} ${r} 0 0 1 ${x + w} ${y + r}`,
    `V ${y + h - r}`,
    `A ${r} ${r} 0 0 1 ${x + w - r} ${y + h}`,
    `H ${x + r}`,
    `A ${r} ${r} 0 0 1 ${x} ${y + h - r}`,
    `V ${y + r}`,
    `A ${r} ${r} 0 0 1 ${x + r} ${y}`,
    `H ${midX}`,
  ].join(' ');
};

const TabProgress = ({ durationMs }: { durationMs: number }) => {
  const svgRef = useRef<SVGSVGElement>(null);
  const [size, setSize] = useState({ width: 0, height: 0 });

  useLayoutEffect(() => {
    const svg = svgRef.current;
    const parent = svg?.parentElement;
    if (!parent) return;

    const update = () => {
      const width = parent.offsetWidth;
      const height = parent.offsetHeight;
      setSize((prev) =>
        prev.width === width && prev.height === height ? prev : { width, height }
      );
    };

    update();
    const observer = new ResizeObserver(update);
    observer.observe(parent);
    return () => observer.disconnect();
  }, []);

  const path =
    size.width > 0
      ? roundedRectPath(size.width, size.height, TAB_RADIUS - PROGRESS_INSET, PROGRESS_INSET)
      : '';

  return (
    <svg
      ref={svgRef}
      className={st.home_managed__tab_progress}
      viewBox={size.width > 0 ? `0 0 ${size.width} ${size.height}` : undefined}
      fill="none"
      aria-hidden
    >
      {path ? (
        <>
          <path
            d={path}
            pathLength={100}
            className={cn(
              st.home_managed__tab_progress_line,
              st['home_managed__tab_progress_line--cw']
            )}
            style={{ animationDuration: `${durationMs}ms` }}
          />
          <path
            d={path}
            pathLength={100}
            className={cn(
              st.home_managed__tab_progress_line,
              st['home_managed__tab_progress_line--ccw']
            )}
            style={{ animationDuration: `${durationMs}ms` }}
          />
        </>
      ) : null}
    </svg>
  );
};

const IMAGE_MOVE_MS = 500;

const rotateClockwise = (order: number[], slot: number) => {
  const steps = (order.length - slot) % order.length;
  if (steps === 0) return order;
  return [...order.slice(-steps), ...order.slice(0, -steps)];
};

const ManagedVisualImages = ({
  images,
  alt,
  onPreview,
}: {
  images: ManagedTabImage[];
  alt: string;
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
            aria-label={`View ${alt} screenshot`}
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

const SliderChevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M6.68262 14.94L11.5726 10.05C12.1501 9.4725 12.1501 8.5275 11.5726 7.95L6.68262 3.06"
      stroke="#171717"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

export const HomeManaged = () => {
  const [activeId, setActiveId] = useState(tabs[0].id);
  const [autoPlay, setAutoPlay] = useState(true);
  const [preview, setPreview] = useState<ManagedTabImage | null>(null);

  const activeTab = tabs.find((tab) => tab.id === activeId) ?? tabs[0];

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
          <h2 className={st.home_managed__title}>Managed Beyond Launch</h2>
          <p className={st.home_managed__description}>
            Coldi continuously monitors conversations, analyzes performance, and optimizes every
            workflow to maximize business outcomes.
          </p>
        </div>

        <div className={st.home_managed__panel}>
          <div className={st.home_managed__tabs} role="tablist" aria-label="Managed features">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={tab.id === activeTab.id}
                className={cn(st.home_managed__tab, tab.id === activeTab.id && st.active)}
                onClick={() => selectTab(tab.id)}
              >
                <span className={st.home_managed__tab_title}>{tab.title}</span>
                <span
                  className={cn(st.home_managed__tab_text, st['home_managed__tab_text--desktop'])}
                >
                  {tab.description}
                </span>
                {autoPlay && tab.id === activeTab.id ? (
                  <TabProgress durationMs={TAB_DURATION_MS} />
                ) : null}
              </button>
            ))}
          </div>

          <div className={st.home_managed__main}>
            <div className={st.home_managed__visual}>
              <ManagedVisualImages
                key={activeTab.id}
                images={activeTab.image}
                alt={activeTab.title}
                onPreview={setPreview}
              />
            </div>

            <div className={st.home_managed__tabs_mobile}>
              <span className={st.home_managed__tab_title}>{activeTab.title}</span>
              <span className={st.home_managed__tab_text}>{activeTab.description}</span>
            </div>
          </div>

          {preview
            ? createPortal(
                <div
                  className={st.home_managed__preview}
                  role="dialog"
                  aria-modal="true"
                  aria-label={activeTab.title}
                  onClick={closePreview}
                >
                  <div
                    className={st.home_managed__preview_image}
                    onClick={(event) => event.stopPropagation()}
                  >
                    <Image
                      src={preview.src}
                      alt={activeTab.title}
                      width={preview.width}
                      height={preview.height}
                    />
                  </div>
                  <button
                    type="button"
                    className={st.home_managed__preview_close}
                    onClick={closePreview}
                    aria-label="Close"
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
              className={cn(st.home_managed__slider_btn, 'rotate-180')}
              aria-label="Previous tab"
              onClick={() => goToTab(-1)}
            >
              <SliderChevron />
            </button>
            <p className={st.home_managed__slider_label}>{activeTab.title}</p>
            <button
              type="button"
              className={st.home_managed__slider_btn}
              aria-label="Next tab"
              onClick={() => goToTab(1)}
            >
              <SliderChevron />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
