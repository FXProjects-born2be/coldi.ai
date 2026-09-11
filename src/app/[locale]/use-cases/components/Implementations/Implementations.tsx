'use client';

import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import { IMPLEMENTATIONS } from '../../data';
import st from './Implementations.module.scss';

export const UseCasesImplementations = () => {
  const [activeId, setActiveId] = useState(IMPLEMENTATIONS[0].id);
  const activeIndex = IMPLEMENTATIONS.findIndex((item) => item.id === activeId);
  const active = IMPLEMENTATIONS[activeIndex] ?? IMPLEMENTATIONS[0];

  const goTo = (direction: -1 | 1) => {
    const nextIndex = (activeIndex + direction + IMPLEMENTATIONS.length) % IMPLEMENTATIONS.length;
    setActiveId(IMPLEMENTATIONS[nextIndex].id);
  };

  return (
    <section className={st.section}>
      <div className={cn('container', st.inner)}>
        <h2 className={st.heading}>More Coldi Implementations</h2>

        <div className={st.panel}>
          <div className={st.sidebar} role="tablist" aria-label="Implementations">
            {IMPLEMENTATIONS.map((item) => {
              const isActive = item.id === active.id;

              return (
                <button
                  key={item.id}
                  type="button"
                  role="tab"
                  aria-selected={isActive}
                  className={cn(st.sideTab, isActive && st.sideTabActive)}
                  onClick={() => setActiveId(item.id)}
                >
                  {item.tab}
                </button>
              );
            })}
          </div>

          <div className={st.content} key={active.id}>
            <div className={st.contentTop}>
              <div className={st.copy}>
                <div className={st.copyText}>
                  <h3 className={st.title}>{active.title}</h3>
                  <p className={st.description}>{active.description}</p>
                </div>
                <Link href={active.href} className={st.cta}>
                  Explore Full Case
                </Link>
              </div>

              <div className={st.handles}>
                <p className={st.handlesTitle}>Coldi handles</p>
                <ul className={st.handlesList}>
                  {active.handles.map((handle) => (
                    <li key={handle.label} className={st.handleItem}>
                      <span className={st.handleIcon}>
                        <Image src={handle.icon} alt="" width={24} height={24} unoptimized />
                      </span>
                      <span className={st.handleLabel}>{handle.label}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className={st.visuals}>
              <div className={st.workflow}>
                <Image
                  src="/images/use-cases-hub/workflow-card.png"
                  alt="The workflow"
                  width={624}
                  height={300}
                  className={cn(st.cardImage, st.cardImageDesktop)}
                  unoptimized
                />

                <div className={st.workflowMobile}>
                  <Image
                    src="/images/use-cases-hub/workflow-card-bg.jpg"
                    alt=""
                    fill
                    className={st.cardBg}
                    sizes="100vw"
                    unoptimized
                  />
                  <div className={st.workflowOverlay} aria-hidden />
                  <p className={st.visualLabel}>The workflow</p>
                  <div className={st.workflowZigzag}>
                    <svg className={st.zigzagLines} viewBox="0 0 300 320" fill="none" aria-hidden>
                      <path
                        d="M120 28 C160 28, 180 40, 200 55"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M160 88 C120 88, 100 100, 90 120"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M120 155 C160 155, 180 168, 200 185"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M160 218 C120 218, 100 230, 90 250"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <path
                        d="M140 278 C200 278, 240 290, 250 300 C250 310, 220 310, 180 305"
                        stroke="white"
                        strokeWidth="1.4"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <polygon points="200,50 206,58 194,58" fill="white" />
                      <polygon points="90,115 96,123 84,123" fill="white" />
                      <polygon points="200,180 206,188 194,188" fill="white" />
                      <polygon points="90,245 96,253 84,253" fill="white" />
                      <polygon points="180,300 172,294 172,306" fill="white" />
                    </svg>
                    {active.workflow.map((step, index) => (
                      <span
                        key={step}
                        className={cn(st.node, index % 2 === 1 ? st.nodeRight : st.nodeLeft)}
                      >
                        <Image
                          src="/images/use-cases-hub/check-blue.svg"
                          alt=""
                          width={20}
                          height={20}
                          unoptimized
                        />
                        {step}
                      </span>
                    ))}
                  </div>
                </div>
              </div>

              <div className={st.integration}>
                <Image
                  src="/images/use-cases-hub/integration-card.png"
                  alt="Integration: Google Sheets connected"
                  width={288}
                  height={300}
                  className={cn(st.cardImage, st.cardImageDesktop)}
                  unoptimized
                />

                <div className={st.integrationMobile}>
                  <Image
                    src="/images/use-cases-hub/integration-bg.jpg"
                    alt=""
                    fill
                    className={st.cardBg}
                    sizes="100vw"
                    unoptimized
                  />
                  <div className={st.integrationTint} aria-hidden />
                  <p className={st.visualLabel}>Integration</p>
                  <div className={st.integrationFlow}>
                    <svg
                      className={st.integrationConnectors}
                      viewBox="0 0 220 110"
                      fill="none"
                      aria-hidden
                    >
                      <path
                        d="M165 28 C205 28, 205 62, 55 62 C25 62, 25 88, 60 88"
                        stroke="white"
                        strokeWidth="1.5"
                        strokeDasharray="4 4"
                        strokeLinecap="round"
                      />
                      <polygon points="60,83 68,88 60,93" fill="white" />
                    </svg>
                    <div className={st.sheetsPill}>
                      <Image
                        src="/images/use-cases-hub/google-sheets.png"
                        alt="Google Sheets"
                        width={179}
                        height={52}
                        unoptimized
                      />
                    </div>
                    <div className={st.connectedPill}>
                      <Image
                        src="/images/use-cases-hub/check-green.svg"
                        alt=""
                        width={22}
                        height={22}
                        unoptimized
                      />
                      <span>Connected</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className={st.mobileNav}>
            <button
              type="button"
              className={st.navBtn}
              aria-label="Previous implementation"
              onClick={() => goTo(-1)}
            >
              <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} unoptimized />
            </button>
            <p className={st.navTitle}>{active.tab}</p>
            <button
              type="button"
              className={st.navBtn}
              aria-label="Next implementation"
              onClick={() => goTo(1)}
            >
              <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} unoptimized />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};
