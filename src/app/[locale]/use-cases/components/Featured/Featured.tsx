'use client';

import { useCallback, useEffect, useRef, useState } from 'react';

import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';

import { FEATURED_CASES } from '../../data';
import st from './Featured.module.scss';

import { Link } from '@/i18n/navigation';

const METRIC_HIGHLIGHT_MS = 5000;

export const UseCasesFeatured = () => {
  const t = useTranslations('UseCasesPage.featured');
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
    if (metricCount <= 1) return undefined;

    const timer = window.setInterval(() => {
      setHighlightIndex((current) => (current + 1) % metricCount);
    }, METRIC_HIGHLIGHT_MS);

    return () => window.clearInterval(timer);
  }, [metricCount, activeIndex]);

  return (
    <section className={st.section}>
      <div className={cn('container', st.inner)}>
        <div
          className={cn(st.tabs, isPaused && st.tabsPaused)}
          role="tablist"
          aria-label={t('tabsAria')}
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
                <span>{t(`cases.${item.id}.tab`)}</span>
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

        <div className={st.cards}>
          {FEATURED_CASES.map((item, index) => {
            const isActive = index === activeIndex;

            return (
              <article
                key={item.id}
                className={cn(st.card, isActive && st.cardActive)}
                aria-hidden={!isActive}
                onMouseEnter={() => setPaused(true)}
                onMouseLeave={() => setPaused(false)}
              >
                <div className={st.top}>
                  <div className={st.intro}>
                    <h2 className={st.title}>{t(`cases.${item.id}.title`)}</h2>
                    <Link href={item.href} className={st.cta} tabIndex={isActive ? undefined : -1}>
                      {t('exploreCta')}
                    </Link>
                  </div>

                  <div className={st.story}>
                    <div className={st.storyCard}>
                      <p className={st.storyLabel}>{t('painLabel')}</p>
                      <p className={st.storyText}>{t(`cases.${item.id}.pain`)}</p>
                    </div>
                    <div className={st.storyCard}>
                      <p className={st.storyLabel}>{t('solutionLabel')}</p>
                      <p className={st.storyText}>{t(`cases.${item.id}.solution`)}</p>
                    </div>
                  </div>
                </div>

                <div className={st.results}>
                  <p className={st.resultsTitle}>{t('resultsTitle')}</p>
                  <div className={st.metrics}>
                    {item.results.map((metric, metricIndex) => (
                      <div key={metric.labelKey} className={st.metric}>
                        <p
                          className={cn(
                            st.metricValue,
                            isActive && metricIndex === highlightIndex && st.metricValueHighlight
                          )}
                        >
                          <span>{metric.value}</span>
                          {metric.suffixKey ? (
                            <span className={st.metricSuffix}>
                              {t(`suffixes.${metric.suffixKey}`)}
                            </span>
                          ) : null}
                        </p>
                        <p className={st.metricLabel}>
                          {t(`cases.${item.id}.results.${metric.labelKey}`)}
                        </p>
                      </div>
                    ))}
                  </div>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
