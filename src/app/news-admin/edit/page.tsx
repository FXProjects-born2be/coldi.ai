'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';

import { getNewsById, type NewsArticle } from '@/features/news/news';

import { NewsAdminShell } from '../components/NewsAdminShell';
import { NewsArticleForm } from '../components/NewsArticleForm';
import st from '../NewsAdmin.module.scss';

export default function EditNewsArticlePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const articleId = searchParams.get('id');
  const [article, setArticle] = useState<NewsArticle | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticle = async () => {
      if (!articleId) {
        setError('Missing article id');
        setIsLoading(false);
        return;
      }

      setIsLoading(true);

      try {
        const articleData = await getNewsById(articleId);

        if (!articleData) {
          setError('Article not found');
        } else {
          setArticle(articleData);
          setError('');
        }
      } catch (fetchError) {
        console.error('Error fetching article:', fetchError);
        setError('Failed to fetch article');
      } finally {
        setIsLoading(false);
      }
    };

    fetchArticle();
  }, [articleId]);

  return (
    <NewsAdminShell title="Edit News Article">
      {isLoading ? (
        <div className={st.loading}>Loading article...</div>
      ) : error || !articleId || !article ? (
        <section className={st.editorCard}>
          <div className={st.error}>{error || 'Article not found'}</div>
          <div className={st.formActions}>
            <Link href="/news-admin" className={st.secondaryLinkButton}>
              Back to articles
            </Link>
          </div>
        </section>
      ) : (
        <NewsArticleForm
          key={article.id}
          mode="edit"
          initialValue={{
            title: article.title || '',
            slug: article.slug || '',
            category: article.category || '',
            image: article.image || '',
            seo_title: article.seo_title || article.title || '',
            seo_description: article.seo_description || '',
            content: article.content || '',
          }}
          title="Edit article"
          description="This page only updates the selected article from the articles list."
          submitLabel="Update article"
          submittingLabel="Saving..."
          successMessage="Article updated successfully"
          endpoint={`/api/news/${article.id}`}
          method="PUT"
          onSuccess={() => router.push('/news-admin')}
        />
      )}
    </NewsAdminShell>
  );
}
