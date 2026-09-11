'use client';

import { useState } from 'react';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import { FEATURED_CASES } from '../../data';
import st from './Featured.module.scss';

export const UseCasesFeatured = () => {
  const [activeId, setActiveId] = useState(FEATURED_CASES[0].id);
  const active = FEATURED_CASES.find((item) => item.id === activeId) ?? FEATURED_CASES[0];

  return (
    <section className={st.section}>
      <div className={cn('container', st.inner)}>
        <div className={st.tabs} role="tablist" aria-label="Featured use cases">
          {FEATURED_CASES.map((item) => {
            const isActive = item.id === active.id;

            return (
              <button
                key={item.id}
                type="button"
                role="tab"
                aria-selected={isActive}
                className={cn(st.tab, isActive && st.tabActive)}
                onClick={() => setActiveId(item.id)}
              >
                <span>{item.tab}</span>
                {isActive && <span className={st.tabLine} aria-hidden />}
              </button>
            );
          })}
        </div>

        <article className={st.card} key={active.id}>
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
              {active.results.map((metric) => (
                <div key={metric.label} className={st.metric}>
                  <p className={st.metricValue}>
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
