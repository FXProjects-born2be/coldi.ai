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

import st from './NewsRow.module.scss';

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
      // Convert all categories to lowercase and remove duplicates
      const uniqueCategories = [...new Set(categories.map((cat) => cat.toLowerCase()))];
      setCategories(uniqueCategories);
    };
    fetchCategories();
  }, []);

  return (
    <section className={st.layout}>
      <div className={st.categories}>
        <div>
          <div
            className={`${st.category} ${activeCategory === 'all' ? st.active : ''}`}
            onClick={() => setActiveCategory('all')}
          >
            All
          </div>
          {categories.map((category) => (
            <div
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`${st.category} ${activeCategory === category ? st.active : ''}`}
            >
              {category}
            </div>
          ))}
          {!categories.includes('industry insight') && (
            <div
              className={`${st.category} ${activeCategory === 'industry insight' ? st.active : ''}`}
              onClick={() => setActiveCategory('industry insight')}
            >
              Industry Insight
            </div>
          )}
          {!categories.includes('best practices') && (
            <div
              className={`${st.category} ${activeCategory === 'best practices' ? st.active : ''}`}
              onClick={() => setActiveCategory('best practices')}
            >
              Best Practices
            </div>
          )}
          {!categories.includes('trends & predictions') && (
            <div
              className={`${st.category} ${activeCategory === 'trends & predictions' ? st.active : ''}`}
              onClick={() => setActiveCategory('trends & predictions')}
            >
              Trends & Predictions
            </div>
          )}
          {!categories.includes('use cases') && (
            <div
              className={`${st.category} ${activeCategory === 'use cases' ? st.active : ''}`}
              onClick={() => setActiveCategory('use cases')}
            >
              Use cases
            </div>
          )}
        </div>
      </div>
      <div className={st.news}>
        {isLoading ? (
          <div className={st.loading}>
            {Array.from({ length: 9 }).map((_, index) => (
              <div className={st.loadingItem} key={index}></div>
            ))}
          </div>
        ) : news.length > 0 ? (
          news.map((item) => (
            <div className={st.newsItem} key={item.id}>
              <Link href={`/news/${item.slug}`} className={st.newsItemTop}>
                <Image
                  src={item.image || '/images/news/news-item-image.png'}
                  alt={item.title}
                  width={413}
                  height={230}
                />
                <div className={st.title}>{item.title}</div>
              </Link>
              <Link href={`/news/${item.slug}`} className={st.readMore}>
                Read{' '}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="12"
                  height="24"
                  viewBox="0 0 12 24"
                  fill="none"
                >
                  <path
                    d="M2.45199 6.57999L3.51299 5.51999L9.29199 11.297C9.38514 11.3896 9.45907 11.4996 9.50952 11.6209C9.55997 11.7421 9.58594 11.8722 9.58594 12.0035C9.58594 12.1348 9.55997 12.2648 9.50952 12.3861C9.45907 12.5073 9.38514 12.6174 9.29199 12.71L3.51299 18.49L2.45299 17.43L7.87699 12.005L2.45199 6.57999Z"
                    fill="#4268FF"
                  />
                </svg>
              </Link>
            </div>
          ))
        ) : (
          <div className={st.noNews}>No news found</div>
        )}
      </div>
    </section>
  );
};
