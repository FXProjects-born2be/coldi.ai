'use client';

import { useEffect, useState } from 'react';

import { cn } from '@/shared/lib/helpers';

import st from './ArticlePage.module.scss';

type TocItem = {
  id: string;
  text: string;
};

type ArticleTocProps = {
  items: TocItem[];
};

export const ArticleToc = ({ items }: ArticleTocProps) => {
  const [activeId, setActiveId] = useState(items[0]?.id ?? '');

  useEffect(() => {
    if (!items.length) return undefined;

    const headings = items
      .map((item) => document.getElementById(item.id))
      .filter((heading): heading is HTMLElement => Boolean(heading));

    if (!headings.length) return undefined;

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

  if (!items.length) return null;

  return (
    <nav className={st.tocNav} aria-label="In this article">
      <p className={st.tocTitle}>In this article:</p>
      <ul className={st.tocList}>
        {items.map((item) => (
          <li key={item.id}>
            <a href={`#${item.id}`} className={cn(item.id === activeId && st.tocLinkActive)}>
              {item.text}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};
