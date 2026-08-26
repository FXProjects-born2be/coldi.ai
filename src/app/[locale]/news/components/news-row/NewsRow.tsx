'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import {
  getAllNews,
  getNewsByCategory,
  getNewsCategories,
  type NewsArticle,
} from '@/features/news/news';

import { cn } from '@/shared/lib/helpers';

import st from './NewsRow.module.scss';

const formatNewsDate = (value: string) => {
  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return '';

  const day = date.getDate();
  const ordinal =
    day % 10 === 1 && day !== 11
      ? 'st'
      : day % 10 === 2 && day !== 12
        ? 'nd'
        : day % 10 === 3 && day !== 13
          ? 'rd'
          : 'th';
  const month = date.toLocaleString('en-GB', { month: 'long' });

  return `${day}${ordinal} ${month} ${date.getFullYear()}`;
};

export const NewsRow = () => {
  const [categories, setCategories] = useState<string[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);
      if (activeCategory === 'all') {
        const news = await getAllNews();
        setNews(news);
      } else {
        const news = await getNewsByCategory(activeCategory);
        setNews(news);
      }
      setIsLoading(false);
    };
    fetchNews();
  }, [activeCategory]);

  useEffect(() => {
    const fetchCategories = async () => {
      const categories = await getNewsCategories();
      const uniqueCategories = [...new Set(categories.map((cat) => cat.toLowerCase()))];
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  return (
    <section className={st.news_row}>
      <div className="container">
        <div className={st.news_row__tabs}>
          <button
            type="button"
            className={cn(st.news_row__tab, activeCategory === 'all' && st.active)}
            onClick={() => setActiveCategory('all')}
          >
            All
          </button>
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setActiveCategory(category)}
              className={cn(st.news_row__tab, activeCategory === category && st.active)}
            >
              {category}
            </button>
          ))}
          {!categories.includes('industry insight') && (
            <button
              type="button"
              className={cn(st.news_row__tab, activeCategory === 'industry insight' && st.active)}
              onClick={() => setActiveCategory('industry insight')}
            >
              Industry Insight
            </button>
          )}
          {!categories.includes('best practices') && (
            <button
              type="button"
              className={cn(st.news_row__tab, activeCategory === 'best practices' && st.active)}
              onClick={() => setActiveCategory('best practices')}
            >
              Best Practices
            </button>
          )}
          {!categories.includes('trends & predictions') && (
            <button
              type="button"
              className={cn(
                st.news_row__tab,
                activeCategory === 'trends & predictions' && st.active
              )}
              onClick={() => setActiveCategory('trends & predictions')}
            >
              Trends & Predictions
            </button>
          )}
          {!categories.includes('use cases') && (
            <button
              type="button"
              className={cn(st.news_row__tab, activeCategory === 'use cases' && st.active)}
              onClick={() => setActiveCategory('use cases')}
            >
              Use cases
            </button>
          )}
        </div>

        <h2 className={st.news_row__title}>{activeCategory === 'all' ? 'All' : activeCategory}</h2>

        <div className={st.news_row__list}>
          {isLoading ? (
            <div className={st.news_row__loading}>
              {Array.from({ length: 9 }).map((_, index) => (
                <div className={st.news_row__loading_item} key={index} />
              ))}
            </div>
          ) : news.length > 0 ? (
            news.map((item) => (
              <article className={st.news_row__item} key={item.id}>
                <Link href={`/news/${item.slug}`} className={st.news_row__item_top}>
                  <div className={st.news_row__item_title}>{item.title}</div>
                </Link>

                <div>
                  {item.created_at && (
                    <time className={st.news_row__item_date} dateTime={item.created_at}>
                      {formatNewsDate(item.created_at)}
                    </time>
                  )}

                  <div className={st.news_row__item_image}>
                    <Image
                      src={item.image || '/images/news/news-item-image.png'}
                      alt={item.title}
                      width={413}
                      height={230}
                    />
                  </div>
                </div>
              </article>
            ))
          ) : (
            <div className={st.news_row__empty}>No news found</div>
          )}
        </div>
      </div>
    </section>
  );
};
