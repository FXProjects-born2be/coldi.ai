import Image from 'next/image';

import type { Metadata } from 'next';

import { getNewsBySlug } from '@/features/news/news';

import { BreadcrumbLabel } from '@/shared/ui/components/breadcrumbs';
import { StructuredData } from '@/shared/ui/components/structured-data/StructuredData';

import { TestIt } from '../components/test-it/TestIt';
import st from './NewsPage.module.scss';
import { TocSidebar } from './TocSidebar';

const SITE_URL = 'https://coldi.ai';
const DEFAULT_NEWS_IMAGE = `${SITE_URL}/images/news/news-item-image.png`;
const PUBLISHER_NAME = 'Coldi';
const PUBLISHER_LOGO_URL = `${SITE_URL}/full-logo.svg`;
const AUTHOR_NAME = 'Or Gold';
const AUTHOR_JOB_TITLE = 'Co-Founder';
const AUTHOR_URL = 'https://www.linkedin.com/in/or-g-602606119/';

type TocItem = {
  id: string;
  text: string;
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const slugifyHeading = (value: string) =>
  stripHtml(value)
    .toLowerCase()
    .replace(/&nbsp;/g, ' ')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');

const addTableOfContents = (content: string): { content: string; tocItems: TocItem[] } => {
  const tocItems: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  const normalizedContent = content.replace(/NN/g, '<br />');
  const contentWithAnchors = normalizedContent.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_match, attrs: string, headingHtml: string) => {
      const headingText = stripHtml(headingHtml);
      if (!headingText) {
        return `<h2${attrs}>${headingHtml}</h2>`;
      }

      const baseId = slugifyHeading(headingText) || 'section';
      const currentCount = slugCounts.get(baseId) || 0;
      const nextCount = currentCount + 1;
      slugCounts.set(baseId, nextCount);

      const id = currentCount === 0 ? baseId : `${baseId}-${nextCount}`;
      tocItems.push({ id, text: headingText });

      if (/\sid\s*=\s*["'][^"']+["']/i.test(attrs)) {
        return `<h2${attrs}>${headingHtml}</h2>`;
      }

      return `<h2${attrs} id="${id}">${headingHtml}</h2>`;
    }
  );

  return { content: contentWithAnchors, tocItems };
};

const getArticleDescription = (news?: {
  title?: string;
  content?: string;
  seo_description?: string;
}) => {
  if (!news) return '';
  if (news.seo_description?.trim()) return news.seo_description;

  const plainText = stripHtml(news.content || '')
    .slice(0, 160)
    .trim();
  return plainText || news.title || '';
};

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const news = await getNewsBySlug(slug);
  const description = getArticleDescription(news || undefined);

  return {
    alternates: {
      canonical: `/news/${slug}`,
    },
    title: news?.seo_title || news?.title || '',
    description,
    authors: [{ name: AUTHOR_NAME, url: AUTHOR_URL }],
    publisher: PUBLISHER_NAME,
    openGraph: {
      title: news?.seo_title || news?.title || '',
      description,
      images: [news?.image || DEFAULT_NEWS_IMAGE],
    },
  };
}

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const news = await getNewsBySlug(slug);
  const articleUrl = `${SITE_URL}/news/${slug}`;
  const articleImage = news?.image || DEFAULT_NEWS_IMAGE;
  const description = getArticleDescription(news || undefined);
  const { content: contentWithAnchors, tocItems } = addTableOfContents(news?.content || '');
  const hasToc = tocItems.length > 0;

  return (
    <>
      {news && (
        <StructuredData
          id={`news-article-${news.slug}`}
          type="NewsArticle"
          data={{
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': articleUrl,
            },
            headline: news.title,
            description,
            image: [articleImage],
            datePublished: news.created_at,
            dateModified: news.updated_at || news.created_at,
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
      )}
      {news?.title && <BreadcrumbLabel segment={slug} label={news.title} />}
      <section className={st.layout}>
        <div className={`${st.articleGrid} ${hasToc ? st.articleGridWithToc : ''}`}>
          <div className={st.newsItemTop}>
            <Image
              src={news?.image || '/images/news/news-item-image.png'}
              alt={news?.title || ''}
              width={413}
              height={230}
            />
            <h1 className={st.title}>{news?.title}</h1>
            <div
              className={st.content}
              dangerouslySetInnerHTML={{
                __html: contentWithAnchors,
              }}
            />
          </div>
          {hasToc && <TocSidebar items={tocItems} />}
        </div>
      </section>
      <TestIt />
    </>
  );
}
