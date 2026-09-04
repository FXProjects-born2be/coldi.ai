'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import { DEFAULT_NEWS_IMAGE, formatFeaturedDate, type NewsCard } from '../../lib';
import st from './Hero.module.scss';

const AUTOPLAY_MS = 6000;

type HeroProps = {
  articles: NewsCard[];
};

type FeaturedControlProps = {
  articles: NewsCard[];
  activeIndex: number;
  isPaused: boolean;
  className?: string;
  onSelect: (index: number) => void;
};

const FeaturedControl = ({
  articles,
  activeIndex,
  isPaused,
  className,
  onSelect,
}: FeaturedControlProps) => (
  <div className={cn(st.featuredControl, isPaused && st.featuredControlPaused, className)}>
    <span>Featured</span>
    <div className={st.bars} role="tablist" aria-label="Featured articles">
      {articles.map((article, index) => (
        <button
          key={article.id}
          type="button"
          role="tab"
          aria-selected={index === activeIndex}
          aria-label={`Show featured article ${index + 1}`}
          className={st.bar}
          onClick={() => onSelect(index)}
        >
          <span
            key={index === activeIndex ? `fill-${activeIndex}` : `idle-${article.id}`}
            className={cn(st.barFill, index === activeIndex && st.barFillActive)}
          />
        </button>
      ))}
    </div>
  </div>
);

export const Hero = ({ articles }: HeroProps) => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const activeArticle = articles[activeIndex] ?? articles[0];

  const goTo = useCallback(
    (index: number) => {
      if (!articles.length) return;
      setActiveIndex((index + articles.length) % articles.length);
    },
    [articles.length]
  );

  useEffect(() => {
    if (articles.length <= 1 || isPaused) return undefined;

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % articles.length);
    }, AUTOPLAY_MS);

    return () => window.clearInterval(timer);
  }, [articles.length, isPaused, activeIndex]);

  useEffect(() => {
    if (activeIndex > articles.length - 1) {
      setActiveIndex(0);
    }
  }, [activeIndex, articles.length]);

  return (
    <section className={st.hero}>
      <div className={`container ${st.inner}`}>
        <nav className={st.breadcrumbs} aria-label="Breadcrumb">
          <ol className={st.crumbs}>
            <li>
              <Link href="/" className={st.crumbLink}>
                Home
              </Link>
            </li>
            <li className={st.separator} aria-hidden>
              <Image
                src="/images/news/icons/breadcrumbs-arrow.svg"
                alt=""
                width={8}
                height={16}
                unoptimized
              />
            </li>
            <li>
              <span className={st.crumbCurrent}>News</span>
            </li>
          </ol>
        </nav>

        <div className={st.stage}>
          <div className={st.headingRow}>
            <div className={st.copy}>
              <h1 className={st.title}>Coldi Community & News</h1>
              <p className={st.subtitle}>
                Media buzz, product updates, and real-world impact - follow the rise of
                human-sounding AI callers built to convert.
              </p>
            </div>
            {articles.length > 0 && (
              <FeaturedControl
                articles={articles}
                activeIndex={activeIndex}
                isPaused={isPaused}
                className={st.featuredControlDesktop}
                onSelect={goTo}
              />
            )}
          </div>

          {!activeArticle ? null : (
            <Link
              href={`/news/${activeArticle.slug}`}
              key={activeArticle.id}
              className={st.featured}
              onMouseEnter={() => setIsPaused(true)}
              onMouseLeave={() => setIsPaused(false)}
            >
              <div className={st.featuredImage}>
                <Image
                  src={activeArticle.image || DEFAULT_NEWS_IMAGE}
                  alt={activeArticle.title}
                  width={1024}
                  height={576}
                  quality={100}
                  unoptimized
                  priority
                />
              </div>
              <div className={st.featuredBody}>
                <div className={st.featuredText}>
                  {activeArticle.category && (
                    <p className={st.featuredCategory}>{activeArticle.category}</p>
                  )}
                  <h2 className={st.featuredTitle}>{activeArticle.title}</h2>
                  <p className={st.featuredExcerpt}>{activeArticle.excerpt}</p>
                </div>
                {activeArticle.created_at && (
                  <time className={st.featuredDate} dateTime={activeArticle.created_at}>
                    {formatFeaturedDate(activeArticle.created_at)}
                  </time>
                )}
              </div>
            </Link>
          )}

          {articles.length > 0 && (
            <FeaturedControl
              articles={articles}
              activeIndex={activeIndex}
              isPaused={isPaused}
              className={st.featuredControlMobile}
              onSelect={goTo}
            />
          )}
        </div>
      </div>
    </section>
  );
};
