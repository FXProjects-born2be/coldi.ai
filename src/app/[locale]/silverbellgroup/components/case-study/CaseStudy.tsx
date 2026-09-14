'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import {
  ctaContent,
  implementationPhases,
  integratedItems,
  issueColumns,
  monitoringItems,
  operationalFlowImage,
  resultsMetrics,
  scriptAdjustments,
  snapshotCards,
  tocItems,
} from '../data';
import st from './CaseStudy.module.scss';

export const CaseStudy = () => {
  const [activeId, setActiveId] = useState<string>(tocItems[0].id);

  useEffect(() => {
    const sections = tocItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => Boolean(el));

    if (!sections.length) return undefined;

    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visible[0]?.target.id) {
          setActiveId(visible[0].target.id);
        }
      },
      { rootMargin: '-20% 0px -55% 0px', threshold: [0, 1] }
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <>
      <section className={st.body}>
        <div className={cn('container', st.bodyInner)}>
          <aside className={st.toc} aria-label="Case study sections">
            {tocItems.map((item) => (
              <a
                key={item.id}
                href={`#${item.id}`}
                className={cn(st.tocItem, activeId === item.id && st.tocItemActive)}
              >
                <span className={st.tocTitle}>{item.title}</span>
                <span className={st.tocDesc}>{item.description}</span>
              </a>
            ))}
          </aside>

          <div className={st.content}>
            <article id="engagement-snapshot" className={st.card}>
              <h2 className={st.cardTitle}>Engagement Snapshot</h2>
              <div className={st.snapshotGrid}>
                {snapshotCards.map((card, index) => (
                  <div key={`snapshot-${index}`} className={st.snapshotCard}>
                    <div className={st.snapshotText}>
                      <p className={st.snapshotValue}>{card.value}</p>
                      <p className={st.snapshotLabel}>{card.label}</p>
                    </div>
                    <span className={st.snapshotIcon}>
                      <Image
                        src="/images/silverbellgroup/icon-data-transfer.svg"
                        alt=""
                        width={24}
                        height={24}
                        unoptimized
                      />
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article id="implementation" className={st.card}>
              <h2 className={st.cardTitle}>How The Implementation Went</h2>
              <div className={st.phaseGrid}>
                {implementationPhases.map((phase) => (
                  <div key={phase.title} className={st.phaseCard}>
                    <h3 className={st.phaseTitle}>
                      {phase.title}
                      <br />
                      {phase.subtitle}
                    </h3>
                    <p className={st.phaseText}>{phase.text}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="integrated" className={st.card}>
              <h2 className={st.cardTitle}>What Coldi Integrated</h2>
              <div className={st.integratedGrid}>
                {integratedItems.map((item) => (
                  <div key={item} className={st.integratedItem}>
                    <span className={st.integratedIcon}>
                      <Image
                        src="/images/silverbellgroup/icon-ai-magic.svg"
                        alt=""
                        width={24}
                        height={24}
                        unoptimized
                      />
                    </span>
                    <p>{item}</p>
                  </div>
                ))}
              </div>

              <div className={st.flow}>
                <Image
                  className={st.flowDesktop}
                  src={operationalFlowImage.desktop}
                  alt={operationalFlowImage.alt}
                  width={820}
                  height={388}
                  sizes="(max-width: 768px) 0px, 820px"
                  unoptimized
                />
                <Image
                  className={st.flowMobile}
                  src={operationalFlowImage.mobile}
                  alt={operationalFlowImage.alt}
                  width={318}
                  height={388}
                  sizes="(max-width: 768px) 100vw, 0px"
                  unoptimized
                />
              </div>

              <div className={st.adjustments}>
                <p className={st.adjustmentsLabel}>Script Adjustments:</p>
                <div className={st.adjustmentsGrid}>
                  {scriptAdjustments.map((item, index) => (
                    <div key={`adj-${index}`} className={st.adjustmentCard}>
                      <p className={st.adjustmentMuted}>{item.label}</p>
                      <p className={st.adjustmentValue}>{item.value}</p>
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article id="issues" className={st.card}>
              <h2 className={st.cardTitle}>Issues Found and Fixed</h2>
              <div className={st.issuesGrid}>
                {issueColumns.map((column) => (
                  <div key={column.title} className={st.issueCard}>
                    <Image
                      className={st.issueDesktop}
                      src={column.desktop}
                      alt={column.title}
                      width={318}
                      height={300}
                      sizes="(max-width: 768px) 0px, 33vw"
                      unoptimized
                    />
                    <Image
                      className={st.issueMobile}
                      src={column.mobile}
                      alt={column.title}
                      width={267}
                      height={300}
                      sizes="(max-width: 768px) 100vw, 0px"
                      unoptimized
                    />
                  </div>
                ))}
              </div>
            </article>

            <article id="monitoring" className={st.card}>
              <h2 className={st.cardTitle}>Proactive Monitoring & Compliance Engineering</h2>
              <div className={st.monitoringGrid}>
                {monitoringItems.map((item, index) => (
                  <div key={`mon-${index}`} className={st.monitoringCard}>
                    <p className={st.monitoringMuted}>{item.label}</p>
                    <p className={st.monitoringValue}>{item.value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="results" className={st.results}>
              <Image
                src="/images/silverbellgroup/results-bg.jpg"
                alt=""
                fill
                className={st.resultsBg}
                sizes="(max-width: 1024px) 100vw, 900px"
                unoptimized
              />
              <div className={st.resultsOverlay} aria-hidden />
              <h2 className={st.resultsTitle}>Results to Date</h2>
              <div className={st.resultsGrid}>
                {resultsMetrics.map((metric) => (
                  <div key={metric.label} className={st.resultCard}>
                    <p className={cn(st.resultValue, metric.highlight && st.resultValueHighlight)}>
                      {metric.value}
                    </p>
                    <p className={st.resultLabel}>{metric.label}</p>
                  </div>
                ))}
              </div>
            </article>
          </div>
        </div>
      </section>

      <section className={st.cta}>
        <div className={cn('container', st.ctaInner)}>
          <h2 className={st.ctaTitle}>{ctaContent.title}</h2>
          <p className={st.ctaText}>{ctaContent.text}</p>
          <Link href={ctaContent.href} className={st.ctaButton}>
            {ctaContent.button}
          </Link>
        </div>
      </section>
    </>
  );
};
