'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { getAllNews, type NewsArticle } from '@/features/news/news';

import { NewsAdminShell } from './components/NewsAdminShell';
import st from './NewsAdmin.module.scss';

export default function NewsAdminPage() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchNews = async () => {
      setIsLoading(true);

      try {
        const newsData = await getAllNews();
        setNews(newsData);
      } catch (fetchError) {
        console.error('Error fetching news:', fetchError);
        setError('Failed to fetch news');
      } finally {
        setIsLoading(false);
      }
    };

    fetchNews();
  }, []);

  const sortedNews = useMemo(
    () =>
      [...news].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [news]
  );

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNews((current) => current.filter((article) => article.id !== id));
      } else {
        setError('Failed to delete article');
      }
    } catch (deleteError) {
      console.error('Error deleting article:', deleteError);
      setError('Failed to delete article');
    }
  };

  return (
    <NewsAdminShell title="News Admin Panel">
      {error && <div className={st.error}>{error}</div>}

      <section className={st.editorCard}>
        <div className={st.editorHeader}>
          <div>
            <h2>Articles</h2>
            <p>
              Create new articles in a dedicated route and edit existing ones in a separate route.
            </p>
          </div>
          <Link href="/news-admin/add" className={st.primaryLinkButton}>
            Add article
          </Link>
        </div>
      </section>

      {isLoading ? (
        <div className={st.loading}>Loading articles...</div>
      ) : (
        <div className={st.articlesList}>
          {sortedNews.map((article) => (
            <div key={article.id} className={st.articleItem}>
              <div className={st.articleImage}>
                <Image
                  src={article.image || '/images/news/news-item-image.png'}
                  alt={article.title}
                  width={200}
                  height={120}
                />
              </div>
              <div className={st.articleInfo}>
                <h3>{article.title}</h3>
                <p className={st.category}>Category: {article.category || 'Uncategorized'}</p>
                <p className={st.slug}>/{article.slug}</p>
                <p className={st.date}>
                  Updated:{' '}
                  {article.updated_at
                    ? new Date(article.updated_at).toLocaleString()
                    : new Date(article.created_at).toLocaleString()}
                </p>
              </div>
              <div className={st.articleActions}>
                <Link href={`/news-admin/edit?id=${article.id}`} className={st.editLinkButton}>
                  Edit
                </Link>
                <button onClick={() => handleDeleteArticle(article.id)} className={st.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </NewsAdminShell>
  );
}
