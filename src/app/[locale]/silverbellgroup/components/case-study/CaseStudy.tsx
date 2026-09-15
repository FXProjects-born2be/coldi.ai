'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';

import type { CaseStudyContent } from '../data';
import { caseStudyContent as defaultContent } from '../data';
import st from './CaseStudy.module.scss';

const renderWithStrong = (text: string) =>
  text.split(/(<strong>[\s\S]*?<\/strong>)/g).map((part, index) => {
    const match = /^<strong>([\s\S]*?)<\/strong>$/.exec(part);
    if (match) {
      return <strong key={index}>{match[1]}</strong>;
    }
    return part;
  });

export const CaseStudy = ({ content = defaultContent }: { content?: CaseStudyContent }) => {
  const {
    tocItems,
    snapshotCards,
    snapshotIcon,
    implementationPhases,
    integratedItems,
    integratedIcon,
    operationalFlowImage,
    scriptAdjustmentsLabel,
    scriptAdjustments,
    issueColumns,
    monitoringItems,
    resultsBg,
    resultsMetrics,
    cta,
  } = content;
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
  }, [tocItems]);

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
            <article id={tocItems[0].id} className={st.card}>
              <h2 className={st.cardTitle}>{tocItems[0].title}</h2>
              <div className={st.snapshotGrid}>
                {snapshotCards.map((card, index) => (
                  <div key={`${card.label}-${index}`} className={st.snapshotCard}>
                    <div className={st.snapshotText}>
                      <p className={st.snapshotValue}>{card.value}</p>
                      <p className={st.snapshotLabel}>{card.label}</p>
                    </div>
                    <span className={st.snapshotIcon}>
                      <Image src={snapshotIcon} alt="" width={24} height={24} unoptimized />
                    </span>
                  </div>
                ))}
              </div>
            </article>

            <article id={tocItems[1].id} className={st.card}>
              <h2 className={st.cardTitle}>{tocItems[1].title}</h2>
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

            <article id={tocItems[2].id} className={st.card}>
              <h2 className={st.cardTitle}>{tocItems[2].title}</h2>
              <div className={st.integratedGrid}>
                {integratedItems.map((item, index) => (
                  <div key={`integrated-${index}`} className={st.integratedItem}>
                    <span className={st.integratedIcon}>
                      <Image src={integratedIcon} alt="" width={24} height={24} unoptimized />
                    </span>
                    <p>{renderWithStrong(item)}</p>
                  </div>
                ))}
              </div>

              {operationalFlowImage && (
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
              )}

              <div className={st.adjustments}>
                <p className={st.adjustmentsLabel}>{scriptAdjustmentsLabel}</p>
                <div className={st.adjustmentsGrid}>
                  {scriptAdjustments.map((item, index) => (
                    <div key={`adj-${index}`} className={st.adjustmentCard}>
                      <p className={st.adjustmentMuted}>{item.label}</p>
                      <p className={st.adjustmentValue}>{item.value}</p>
                      {item.list?.length ? (
                        <ul className={st.adjustmentList}>
                          {item.list.map((entry) => (
                            <li key={entry}>{entry}</li>
                          ))}
                        </ul>
                      ) : null}
                    </div>
                  ))}
                </div>
              </div>
            </article>

            <article id={tocItems[3].id} className={st.card}>
              <h2 className={st.cardTitle}>{tocItems[3].title}</h2>
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

            <article id={tocItems[4].id} className={st.card}>
              <h2 className={st.cardTitle}>{tocItems[4].title}</h2>
              <div className={st.monitoringGrid}>
                {monitoringItems.map((item, index) => (
                  <div key={`mon-${index}`} className={st.monitoringCard}>
                    <p className={st.monitoringMuted}>{item.label}</p>
                    <p className={st.monitoringValue}>{item.value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id={tocItems[5].id} className={st.results}>
              <Image
                src={resultsBg}
                alt=""
                fill
                className={st.resultsBg}
                sizes="(max-width: 1024px) 100vw, 900px"
                unoptimized
              />
              <div className={st.resultsOverlay} aria-hidden />
              <h2 className={st.resultsTitle}>{tocItems[5].title}</h2>
              <div className={st.resultsGrid}>
                {resultsMetrics.map((metric, index) => (
                  <div key={`result-${index}`} className={st.resultCard}>
                    <p className={cn(st.resultValue, metric.highlight && st.resultValueHighlight)}>
                      {metric.value}
                    </p>
                    {metric.subtitle ? (
                      <p className={st.resultDescription}>{metric.subtitle}</p>
                    ) : null}
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
          <h2 className={st.ctaTitle}>{cta.title}</h2>
          <p className={st.ctaText}>{cta.text}</p>
          <BookDemo className={'btn-secondary'}></BookDemo>
        </div>
        <video
          className={st.ctaVideo}
          src="/videos/solutions-specific.mp4"
          autoPlay
          playsInline
          muted
          loop
          preload="metadata"
          controls={false}
          aria-hidden
        />
      </section>
    </>
  );
};
