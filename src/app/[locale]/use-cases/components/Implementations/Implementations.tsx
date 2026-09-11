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
                <Image
                  src="/images/use-cases-hub/workflow-card-mobile.jpg"
                  alt="The workflow"
                  width={636}
                  height={1291}
                  className={cn(st.cardImage, st.cardImageMobile)}
                  unoptimized
                />
              </div>

              <div className={st.integration}>
                <Image
                  src="/images/use-cases-hub/integration-card.jpg"
                  alt="Integration: Google Sheets connected"
                  width={576}
                  height={600}
                  className={cn(st.cardImage, st.cardImageDesktop)}
                  unoptimized
                />
                <Image
                  src="/images/use-cases-hub/integration-card-mobile.jpg"
                  alt="Integration: Google Sheets connected"
                  width={636}
                  height={475}
                  className={cn(st.cardImage, st.cardImageMobile)}
                  unoptimized
                />
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
