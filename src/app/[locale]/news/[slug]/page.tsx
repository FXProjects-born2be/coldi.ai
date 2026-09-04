import { notFound } from 'next/navigation';

import type { Metadata } from 'next';

import { StructuredData } from '@/shared/ui/components/structured-data/StructuredData';

import { getArticleBySlug, getRelatedArticles } from '../articles';
import { ArticlePage } from '../components/article-page/ArticlePage';

const SITE_URL = 'https://coldi.ai';
const DEFAULT_NEWS_IMAGE = `${SITE_URL}/images/news/news-item-image.png`;
const PUBLISHER_NAME = 'Coldi';
const PUBLISHER_LOGO_URL = `${SITE_URL}/full-logo.svg`;
const AUTHOR_NAME = 'Or Gold';
const AUTHOR_JOB_TITLE = 'Co-Founder';
const AUTHOR_URL = 'https://www.linkedin.com/in/or-g-602606119/';

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const getArticleDescription = (article?: {
  title?: string;
  excerpt?: string;
  intro?: { type: string; html?: string }[];
}) => {
  if (!article) return '';
  if (article.excerpt?.trim()) return article.excerpt;

  const introText = article.intro
    ?.filter((block) => block.type === 'p' && block.html)
    .map((block) => stripHtml(block.html || ''))
    .join(' ')
    .slice(0, 160)
    .trim();

  return introText || article.title || '';
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const article = getArticleBySlug(slug);
  const description = getArticleDescription(article);

  return {
    alternates: {
      canonical: `/news/${slug}`,
    },
    title: article?.title || '',
    description,
    authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    publisher: PUBLISHER_NAME,
    openGraph: {
      title: article?.title || '',
      description,
      images: [article?.image || DEFAULT_NEWS_IMAGE],
    },
  };
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const article = getArticleBySlug(slug);

  if (!article) {
    notFound();
  }

  const articleUrl = `${SITE_URL}/news/${slug}`;
  const articleImage = article.image || DEFAULT_NEWS_IMAGE;
  const description = getArticleDescription(article);
  const related = getRelatedArticles(article);

  return (
    <>
      <StructuredData
        id={`news-article-${article.slug}`}
        type="NewsArticle"
        data={{
          mainEntityOfPage: {
            '@type': 'WebPage',
            '@id': articleUrl,
          },
          headline: article.title,
          description,
          image: [articleImage],
          datePublished: article.created_at,
          dateModified: article.created_at,
          author: {
            '@type': 'Person',
            name: AUTHOR_NAME,
            jobTitle: AUTHOR_JOB_TITLE,
            url: AUTHOR_URL,
            sameAs: [AUTHOR_URL],
          },
          publisher: {
            '@type': 'Organization',
            name: PUBLISHER_NAME,
            logo: {
              '@type': 'ImageObject',
              url: PUBLISHER_LOGO_URL,
            },
          },
        }}
      />
      <ArticlePage article={article} related={related} />
    </>
  );
}
