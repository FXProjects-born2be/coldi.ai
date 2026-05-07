'use client';

import { useEffect, useState } from 'react';

import st from './NewsPage.module.scss';

type TocItem = {
  id: string;
  text: string;
};

type TocSidebarProps = {
  items: TocItem[];
};

export const TocSidebar = ({ items }: TocSidebarProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) return;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (!headings.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const visibleEntries = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);

        if (visibleEntries.length > 0) {
          setActiveId(visibleEntries[0].target.id);
          return;
        }

        const passedHeadings = headings.filter(
          (heading) => heading.getBoundingClientRect().top <= 140
        );
        const lastPassedHeading = passedHeadings[passedHeadings.length - 1];

        if (lastPassedHeading) {
          setActiveId(lastPassedHeading.id);
        }
      },
      {
        rootMargin: '-120px 0px -55% 0px',
        threshold: [0, 1],
      }
    );

    headings.forEach((heading) => observer.observe(heading));

    return () => observer.disconnect();
  }, [items]);

  return (
    <aside className={st.toc}>
      <p className={st.tocTitle}>On this page</p>
      <nav aria-label="Table of contents">
        <ul>
          {items.map((item) => (
            <li key={item.id}>
              <a
                href={`#${item.id}`}
                className={item.id === activeId ? st.tocLinkActive : undefined}
              >
                {item.text}
              </a>
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};
