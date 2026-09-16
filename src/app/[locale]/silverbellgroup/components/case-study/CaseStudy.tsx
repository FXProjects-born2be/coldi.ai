'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

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
    problem,
    snapshotCards,
    implementationPhases,
    integratedItems,
    askedCards,
    monitoringItems,
    wentWrongItems,
    resultsBg,
    resultsShow,
    resultsMetrics,
  } = content;
  const [activeId, setActiveId] = useState<string>(tocItems[0].id);
  const [phaseIndex, setPhaseIndex] = useState(0);
  const phaseTrackRef = useRef<HTMLDivElement>(null);
  const sectionTitle = (id: string) => tocItems.find((item) => item.id === id)?.title ?? '';
  const lastPhaseIndex = implementationPhases.length - 1;
  const canScrollPrev = phaseIndex > 0;
  const canScrollNext = phaseIndex < lastPhaseIndex;

  const goToPhase = (index: number) => {
    const next = Math.max(0, Math.min(lastPhaseIndex, index));
    const track = phaseTrackRef.current;
    const slide = track?.children[next] as HTMLElement | undefined;
    slide?.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    setPhaseIndex(next);
  };

  const onPhaseScroll = () => {
    const track = phaseTrackRef.current;
    if (!track) return;

    const slides = Array.from(track.children) as HTMLElement[];
    const left = track.scrollLeft;
    let closest = 0;
    let dist = Number.POSITIVE_INFINITY;

    slides.forEach((slide, index) => {
      const delta = Math.abs(slide.offsetLeft - left);
      if (delta < dist) {
        dist = delta;
        closest = index;
      }
    });

    setPhaseIndex(closest);
  };

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
            {problem && (
              <div id="problem" className={st.problemWrap}>
                <article className={st.card}>
                  <h2 className={st.cardTitle}>{problem.title}</h2>
                  <div className={st.problemGrid}>
                    {problem.items.map((item) => (
                      <div key={item.title} className={st.problemCard}>
                        <h3 className={st.problemCardTitle}>{item.title}</h3>
                        <p className={st.problemCardText}>{item.text}</p>
                      </div>
                    ))}
                  </div>
                </article>

                <div className={st.problemContext}>
                  <div className={st.problemTried}>
                    <h3 className={st.problemTriedTitle}>{problem.tried.title}</h3>
                    <div className={st.problemTriedList}>
                      {problem.tried.items.map((item) => (
                        <div key={item.title} className={st.problemTriedItem}>
                          <p className={st.problemTriedItemTitle}>{item.title}</p>
                          <p className={st.problemTriedItemText}>{item.text}</p>
                        </div>
                      ))}
                    </div>
                  </div>

                  <div className={st.problemHighlights}>
                    {[problem.asked, problem.conclusion].map((panel) => (
                      <div key={panel.title} className={st.problemHighlight}>
                        {panel.bgImage ? (
                          <Image
                            src={panel.bgImage}
                            alt=""
                            fill
                            sizes="(max-width: 1024px) 100vw, 400px"
                            className={st.problemHighlightBg}
                          />
                        ) : null}

                        <h3 className={st.problemHighlightTitle}>{panel.title}</h3>
                        <p className={st.problemHighlightText}>{panel.text}</p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            <article id="engagement-snapshot" className={st.card}>
              <h2 className={st.cardTitle}>{sectionTitle('engagement-snapshot')}</h2>
              <div className={st.snapshotGrid}>
                {snapshotCards.map((card, index) => (
                  <div key={`${card.label}-${index}`} className={st.snapshotCard}>
                    <div>
                      <p
                        className={st.snapshotValue}
                        dangerouslySetInnerHTML={{ __html: card.value }}
                      />
                      <p className={st.snapshotLabel}>{card.label}</p>
                    </div>
                    <div className={st.snapshotIcon}>
                      {card.src ? (
                        <Image src={card.src} alt="" width={24} height={24} unoptimized />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article id="integrated" className={st.card}>
              <h2 className={st.cardTitle}>{sectionTitle('integrated')}</h2>
              <div className={st.integratedGrid}>
                {integratedItems.map((item, index) => (
                  <div key={`integrated-${index}`} className={st.integratedItem}>
                    <span className={st.integratedIcon}>
                      {item.src ? (
                        <Image src={item.src} alt="Icon" width={24} height={24} unoptimized />
                      ) : null}
                    </span>
                    {item.title ? <p className={st.integratedTitle}>{item.title}</p> : null}
                    <p className={st.integratedText}>{renderWithStrong(item.text)}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="implementation" className={cn(st.card, st.implementation)}>
              <h2 className={st.cardTitle}>{sectionTitle('implementation')}</h2>
              <div className={st.phaseRow}>
                <div className={st.phaseTimeline}>
                  {implementationPhases.map((_, index) => (
                    <div key={`week-${index}`} className={st.phaseWeek}>
                      <p className={st.phaseWeekLabel}>Week {index + 1}</p>
                      {index < implementationPhases.length - 1 ? (
                        <Image
                          className={st.phaseWeekLine}
                          src="/images/silverbellgroup/connector-line.svg"
                          alt=""
                          width={8}
                          height={117}
                          unoptimized
                        />
                      ) : null}
                    </div>
                  ))}
                </div>
                <div className={st.phaseItems}>
                  {implementationPhases.map((phase) => (
                    <div key={phase.title} className={st.phaseCard}>
                      <h3 className={st.phaseTitle}>{phase.title}</h3>
                      {phase.subtitle ? <p className={st.phaseSubtitle}>{phase.subtitle}</p> : null}
                      <p className={st.phaseText}>{phase.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div className={st.phaseSlider}>
                <div className={st.phaseTrack} ref={phaseTrackRef} onScroll={onPhaseScroll}>
                  {implementationPhases.map((phase, index) => (
                    <div key={phase.title} className={st.phaseSlide}>
                      <div className={st.phaseWeek}>
                        <p className={st.phaseWeekLabel}>Week {index + 1}</p>
                        {index < implementationPhases.length - 1 ? (
                          <Image
                            className={st.phaseWeekLineMobile}
                            src="/images/silverbellgroup/connector-line-mobile.svg"
                            alt=""
                            width={174}
                            height={8}
                            unoptimized
                          />
                        ) : null}
                      </div>
                      <div className={st.phaseCard}>
                        <h3 className={st.phaseTitle}>{phase.title}</h3>
                        <p className={st.phaseText}>{phase.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className={st.phaseNav}>
                  <button
                    type="button"
                    className={cn(st.phaseNavPrev, canScrollPrev && st.can_scroll)}
                    aria-label="Previous week"
                    disabled={!canScrollPrev}
                    onClick={() => goToPhase(phaseIndex - 1)}
                  >
                    <Image
                      src={'/icons/arrow-left.svg'}
                      alt={'Icon'}
                      width={'18'}
                      height={'18'}
                      unoptimized
                    />
                  </button>
                  <button
                    type="button"
                    className={cn(st.phaseNavNext, canScrollNext && st.can_scroll)}
                    aria-label="Next week"
                    disabled={!canScrollNext}
                    onClick={() => goToPhase(phaseIndex + 1)}
                  >
                    <Image
                      src={'/icons/arrow-right.svg'}
                      alt={'Icon'}
                      width={'18'}
                      height={'18'}
                      unoptimized
                    />
                  </button>
                </div>
              </div>
            </article>

            <article id="issues" className={st.card}>
              <h2 className={st.cardTitle}>{sectionTitle('issues')}</h2>
              <div className={st.snapshotGrid}>
                {askedCards.map((card, index) => (
                  <div key={`${card.label}-${index}`} className={st.snapshotCard}>
                    <div>
                      <p
                        className={st.snapshotValue}
                        dangerouslySetInnerHTML={{ __html: card.value }}
                      />
                      <p className={st.snapshotLabel}>{card.label}</p>
                    </div>
                    <div className={st.snapshotIcon}>
                      {card.src ? (
                        <Image src={card.src} alt="" width={24} height={24} unoptimized />
                      ) : null}
                    </div>
                  </div>
                ))}
              </div>
            </article>

            <article id="monitoring" className={st.card}>
              <h2 className={st.cardTitle}>{sectionTitle('monitoring')}</h2>
              <div className={st.monitoringGrid}>
                {monitoringItems.map((item, index) => (
                  <div key={`mon-${index}`} className={st.monitoringCard}>
                    <p className={st.monitoringMuted}>{item.label}</p>
                    <p className={st.monitoringValue}>{item.value}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="went-wrong" className={st.card}>
              <h2 className={st.cardTitle}>{sectionTitle('went-wrong')}</h2>
              <div className={st.wentWrongGrid}>
                {wentWrongItems.map((item, index) => (
                  <div key={`wrong-${index}`} className={st.wentWrongCard}>
                    <p className={st.wentWrongTitle}>{item.title}</p>
                  </div>
                ))}
              </div>
            </article>

            <article id="results" className={st.results}>
              <div className={st.resultsRow}>
                <div className={st.resultsLeft}>
                  <Image
                    src={resultsBg}
                    alt="Image"
                    fill
                    className={st.resultsBg}
                    sizes="(max-width: 1024px) 100vw, 900px"
                  />
                  <h2 className={st.resultsTitle}>{sectionTitle('results')}</h2>
                  <div className={st.resultsGrid}>
                    {resultsMetrics.map((metric, index) => (
                      <div key={`result-${index}`} className={st.resultCard}>
                        <p
                          className={cn(
                            st.resultValue,
                            metric.highlight && st.resultValueHighlight
                          )}
                        >
                          {metric.value}
                        </p>
                        {metric.subtitle ? (
                          <p className={st.resultDescription}>{metric.subtitle}</p>
                        ) : null}
                        <p className={st.resultLabel}>{metric.label}</p>
                      </div>
                    ))}
                  </div>
                </div>
                <div className={st.resultsRight}>
                  {resultsShow.src ? (
                    <Image
                      src={resultsShow.src}
                      alt=""
                      fill
                      className={st.resultsBg}
                      sizes="(max-width: 1024px) 100vw, 400px"
                    />
                  ) : null}
                  <h2 className={st.resultsShowTitle}>{resultsShow.title}</h2>
                  <p className={st.resultsShowText}>{resultsShow.text}</p>
                </div>
              </div>
            </article>
          </div>
        </div>
      </section>
    </>
  );
};
