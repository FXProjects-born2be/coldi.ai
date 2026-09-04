'use client';

import { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';

import { ARTICLES_PAGE_SIZE, LARGE_CARDS_COUNT, type NewsCard, padPage } from '../../lib';
import { ArticleCard } from '../article-card/ArticleCard';
import st from './AllArticles.module.scss';

type AllArticlesProps = {
  articles: NewsCard[];
  categories: string[];
};

export const AllArticles = ({ articles, categories }: AllArticlesProps) => {
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('all');
  const [page, setPage] = useState(1);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const filterRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  const filterOptions = useMemo(
    () => ['All', ...categories.filter((item) => item.toLowerCase() !== 'all')],
    [categories]
  );

  const filtered = useMemo(() => {
    const query = search.trim().toLowerCase();

    return articles.filter((article) => {
      const matchesCategory =
        category === 'all' || article.category?.toLowerCase() === category.toLowerCase();
      const matchesSearch =
        !query ||
        article.title.toLowerCase().includes(query) ||
        article.category?.toLowerCase().includes(query) ||
        article.excerpt?.toLowerCase().includes(query);

      return matchesCategory && matchesSearch;
    });
  }, [articles, category, search]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / ARTICLES_PAGE_SIZE));
  const currentPage = Math.min(page, totalPages);
  const pageItems = filtered.slice(
    (currentPage - 1) * ARTICLES_PAGE_SIZE,
    currentPage * ARTICLES_PAGE_SIZE
  );
  const isFirstPage = currentPage === 1;
  const largeCards = isFirstPage ? pageItems.slice(0, LARGE_CARDS_COUNT) : [];
  const compactCards = isFirstPage ? pageItems.slice(LARGE_CARDS_COUNT) : pageItems;

  useEffect(() => {
    setPage(1);
  }, [category, search]);

  useEffect(() => {
    const onPointerDown = (event: MouseEvent) => {
      if (!filterRef.current?.contains(event.target as Node)) {
        setIsFilterOpen(false);
      }
    };

    document.addEventListener('mousedown', onPointerDown);
    return () => document.removeEventListener('mousedown', onPointerDown);
  }, []);

  const goToPage = (nextPage: number) => {
    const clamped = Math.min(Math.max(nextPage, 1), totalPages);
    if (clamped === currentPage) return;

    setPage(clamped);
    sectionRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };

  const selectCategory = (value: string) => {
    setCategory(value.toLowerCase() === 'all' ? 'all' : value);
    setIsFilterOpen(false);
  };

  return (
    <section ref={sectionRef} className={st.section}>
      <div className={`container ${st.inner}`}>
        <div className={st.toolbar}>
          <div className={st.toolbarTop}>
            <h2 className={st.heading}>All Articles</h2>
            <div className={st.filterWrap} ref={filterRef}>
              <button
                type="button"
                className={cn(st.filter, (isFilterOpen || category !== 'all') && st.filterActive)}
                aria-expanded={isFilterOpen}
                aria-haspopup="listbox"
                onClick={() => setIsFilterOpen((open) => !open)}
              >
                <span className={st.filterLabel}>
                  <span className={st.icon}>
                    <Image
                      src="/images/news/icons/filter.svg"
                      alt=""
                      width={20}
                      height={20}
                      unoptimized
                    />
                  </span>
                  Filter
                </span>
                <span className={cn(st.chevron, isFilterOpen && st.chevronOpen)}>
                  <Image
                    src="/images/news/icons/arrow-down.svg"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                  />
                </span>
              </button>
              {isFilterOpen && (
                <ul className={st.menu} role="listbox">
                  {filterOptions.map((option) => {
                    const isActive =
                      option.toLowerCase() === 'all'
                        ? category === 'all'
                        : category.toLowerCase() === option.toLowerCase();

                    return (
                      <li key={option}>
                        <button
                          type="button"
                          role="option"
                          aria-selected={isActive}
                          className={cn(st.menuItem, isActive && st.menuItemActive)}
                          onClick={() => selectCategory(option)}
                        >
                          {option}
                        </button>
                      </li>
                    );
                  })}
                </ul>
              )}
            </div>
          </div>
          <label className={st.search}>
            <input
              type="search"
              placeholder="Search"
              aria-label="Search articles"
              value={search}
              onChange={(event) => setSearch(event.target.value)}
            />
            <span className={st.searchIcon}>
              <Image
                src="/images/news/icons/search.svg"
                alt=""
                width={20}
                height={20}
                unoptimized
              />
            </span>
          </label>
        </div>

        {pageItems.length === 0 ? (
          <p className={st.empty}>No news found</p>
        ) : (
          <>
            {largeCards.length > 0 && (
              <div className={st.largeGrid} key={`large-${currentPage}`}>
                {largeCards.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="large" />
                ))}
              </div>
            )}
            {compactCards.length > 0 && (
              <div className={st.compactGrid} key={`compact-${currentPage}`}>
                {compactCards.map((article) => (
                  <ArticleCard key={article.id} article={article} variant="compact" />
                ))}
              </div>
            )}
          </>
        )}

        {filtered.length > ARTICLES_PAGE_SIZE && (
          <div className={st.pagination}>
            <button
              type="button"
              className={st.pageButton}
              onClick={() => goToPage(currentPage - 1)}
              disabled={currentPage === 1}
              aria-label="Previous page"
            >
              <Image src="/icons/arrow-left.svg" alt="" width={18} height={18} unoptimized />
            </button>
            <div className={st.pageStatus}>
              <span className={st.pageCurrent}>{padPage(currentPage)}</span>
              <span className={st.pageDot} />
              <span className={st.pageTotal}>{padPage(totalPages)}</span>
            </div>
            <button
              type="button"
              className={cn(st.pageButton, st.pageButtonNext)}
              onClick={() => goToPage(currentPage + 1)}
              disabled={currentPage === totalPages}
              aria-label="Next page"
            >
              <Image src="/icons/arrow-right.svg" alt="" width={18} height={18} unoptimized />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
