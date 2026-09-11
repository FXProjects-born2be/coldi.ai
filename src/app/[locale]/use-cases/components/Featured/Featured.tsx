'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import { FEATURED_CASES } from '../../data';
import st from './Featured.module.scss';

const METRIC_HIGHLIGHT_MS = 5000;

export const UseCasesFeatured = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [highlightIndex, setHighlightIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const isPausedRef = useRef(false);
  const pendingAdvanceRef = useRef(false);

  const tabCount = FEATURED_CASES.length;
  const active = FEATURED_CASES[activeIndex] ?? FEATURED_CASES[0];
  const metricCount = active.results.length;

  const goToTab = useCallback(
    (index: number) => {
      if (!tabCount) return;
      pendingAdvanceRef.current = false;
      setActiveIndex((index + tabCount) % tabCount);
      setHighlightIndex(0);
    },
    [tabCount]
  );

  const goToNextTab = useCallback(() => {
    if (tabCount <= 1) return;
    pendingAdvanceRef.current = false;
    setActiveIndex((current) => (current + 1) % tabCount);
    setHighlightIndex(0);
  }, [tabCount]);

  const handleProgressEnd = useCallback(() => {
    if (isPausedRef.current) {
      pendingAdvanceRef.current = true;
      return;
    }
    goToNextTab();
  }, [goToNextTab]);

  const setPaused = useCallback(
    (paused: boolean) => {
      isPausedRef.current = paused;
      setIsPaused(paused);
      if (!paused && pendingAdvanceRef.current) {
        goToNextTab();
      }
    },
    [goToNextTab]
  );

  useEffect(() => {
    if (metricCount <= 1 || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setHighlightIndex((current) => (current + 1) % metricCount);
    }, METRIC_HIGHLIGHT_MS);

    return () => window.clearInterval(timer);
  }, [metricCount, isPaused, activeIndex]);

  return (
    <section className={st.section}>
      <div className={cn('container', st.inner)}>
        <div
          className={cn(st.tabs, isPaused && st.tabsPaused)}
          role="tablist"
          aria-label="Featured use cases"
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
          onFocusCapture={() => setPaused(true)}
          onBlurCapture={(event) => {
            if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
              setPaused(false);
            }
          }}
        >
          {FEATURED_CASES.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={cn(st.tab, isActive && st.tabActive)}
                onClick={() => goToTab(index)}
              >
                <span>{item.tab}</span>
                <span className={st.tabTrack} aria-hidden>
                  <span
                    key={isActive ? `fill-${activeIndex}` : `idle-${item.id}`}
                    className={cn(st.tabFill, isActive && st.tabFillActive)}
                    onAnimationEnd={isActive ? handleProgressEnd : undefined}
                  />
                </span>
              </button>
            );
          })}
        </div>

        <article
          className={st.card}
          key={active.id}
          onMouseEnter={() => setPaused(true)}
          onMouseLeave={() => setPaused(false)}
        >
          <div className={st.top}>
            <div className={st.intro}>
              <h2 className={st.title}>{active.title}</h2>
              <Link href={active.href} className={st.cta}>
                Explore Full Case
              </Link>
            </div>

            <div className={st.story}>
              <div className={st.storyCard}>
                <p className={st.storyLabel}>The Pain Point</p>
                <p className={st.storyText}>{active.pain}</p>
              </div>
              <div className={st.storyCard}>
                <p className={st.storyLabel}>The Solution</p>
                <p className={st.storyText}>{active.solution}</p>
              </div>
            </div>
          </div>

          <div className={st.results}>
            <p className={st.resultsTitle}>Results</p>
            <div className={st.metrics}>
              {active.results.map((metric, index) => (
                <div key={metric.label} className={st.metric}>
                  <p
                    className={cn(
                      st.metricValue,
                      index === highlightIndex && st.metricValueHighlight
                    )}
                  >
                    <span>{metric.value}</span>
                    {metric.suffix ? (
                      <span className={st.metricSuffix}> {metric.suffix}</span>
                    ) : null}
                  </p>
                  <p className={st.metricLabel}>{metric.label}</p>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
};
