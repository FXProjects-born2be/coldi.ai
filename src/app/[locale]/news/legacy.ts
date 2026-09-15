import {
  getAllNews,
  getNewsBySlug,
  type NewsArticle as LegacyNewsArticle,
} from '@/features/news/news';

import { FEATURED_ARTICLES, GRID_ARTICLES, LISTING_ARTICLES } from './data';
import {
  DEFAULT_NEWS_IMAGE,
  formatCardDate,
  NEWS_CATEGORIES,
  type NewsArticle,
  type NewsCard,
  slugifyHeading,
} from './lib';

export type TocItem = {
  id: string;
  text: string;
};

const stripHtml = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/\s+/g, ' ')
    .trim();

const normalizeTitleKey = (title: string) =>
  title
    .toLowerCase()
    .replace(/&nbsp;/g, ' ')
    .replace(/[^a-z0-9]+/g, ' ')
    .trim();

const normalizeCategory = (raw?: string) => {
  const primary = (raw || 'Company News').split(',')[0]?.trim() || 'Company News';
  const matched = NEWS_CATEGORIES.find((item) => item.toLowerCase() === primary.toLowerCase());
  if (matched) return matched;

  return primary
    .split(/\s+/)
    .map((word) => (word ? word[0].toUpperCase() + word.slice(1) : word))
    .join(' ');
};

const excerptFromContent = (content: string, fallback = '') => {
  const text = stripHtml(content);
  if (!text) return fallback;
  return text.length > 180 ? `${text.slice(0, 177).trim()}…` : text;
};

export const addHeadingAnchors = (content: string): { html: string; tocItems: TocItem[] } => {
  const tocItems: TocItem[] = [];
  const slugCounts = new Map<string, number>();

  const normalizedContent = content.replace(/NN/g, '<br />');
  const html = normalizedContent.replace(
    /<h2([^>]*)>([\s\S]*?)<\/h2>/gi,
    (_match, attrs: string, headingHtml: string) => {
      const headingText = stripHtml(headingHtml);
      if (!headingText) {
        return `<h2${attrs}>${headingHtml}</h2>`;
      }

      const baseId = slugifyHeading(headingText) || 'section';
      const currentCount = slugCounts.get(baseId) || 0;
      slugCounts.set(baseId, currentCount + 1);
      const id = currentCount === 0 ? baseId : `${baseId}-${currentCount + 1}`;
      tocItems.push({ id, text: headingText });

      if (/\sid\s*=\s*["'][^"']+["']/i.test(attrs)) {
        return `<h2${attrs}>${headingHtml}</h2>`;
      }

      return `<h2${attrs} id="${id}">${headingHtml}</h2>`;
    }
  );

  return { html, tocItems };
};

export const mapLegacyPostToCard = (post: LegacyNewsArticle): NewsCard => ({
  id: String(post.id),
  title: post.title,
  slug: post.slug,
  excerpt: post.seo_description?.trim() || excerptFromContent(post.content),
  image: post.image || DEFAULT_NEWS_IMAGE,
  category: normalizeCategory(post.category),
  created_at: post.created_at,
  isLegacy: true,
});

export const mapLegacyPostToArticle = (post: LegacyNewsArticle): NewsArticle => {
  const card = mapLegacyPostToCard(post);
  const { html, tocItems } = addHeadingAnchors(post.content || '');

  return {
    ...card,
    dateLabel: formatCardDate(post.created_at),
    heroImage: card.image,
    relatedSlugs: [],
    intro: [],
    sections: [],
    htmlContent: html,
    htmlToc: tocItems,
    seoTitle: post.seo_title,
    seoDescription: post.seo_description,
  };
};

const fetchLegacyPosts = async (): Promise<LegacyNewsArticle[]> => {
  try {
    return await getAllNews();
  } catch (error) {
    console.error('Failed to load legacy news posts:', error);
    return [];
  }
};

export const getMergedGridArticles = async (): Promise<NewsCard[]> => {
  const legacyPosts = await fetchLegacyPosts();
  const staticCards = LISTING_ARTICLES;
  const reservedSlugs = new Set(staticCards.map((item) => item.slug));
  const reservedTitles = new Set(staticCards.map((item) => normalizeTitleKey(item.title)));
  const featuredSlugs = new Set(FEATURED_ARTICLES.map((item) => item.slug));

  const legacyCards = legacyPosts
    .map(mapLegacyPostToCard)
    .filter(
      (card) => !reservedSlugs.has(card.slug) && !reservedTitles.has(normalizeTitleKey(card.title))
    );

  const staticGrid = GRID_ARTICLES.filter((item) => !featuredSlugs.has(item.slug));

  return [...staticGrid, ...legacyCards].sort(
    (a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()
  );
};

export const getNewsFilterCategories = (articles: NewsCard[]) => {
  const fromArticles = articles
    .map((item) => item.category)
    .filter(Boolean)
    .filter(
      (item, index, list) =>
        list.findIndex((value) => value.toLowerCase() === item.toLowerCase()) === index
    );

  const preferred = NEWS_CATEGORIES.filter((category) =>
    fromArticles.some((item) => item.toLowerCase() === category.toLowerCase())
  );
  const extras = fromArticles.filter(
    (category) => !NEWS_CATEGORIES.some((item) => item.toLowerCase() === category.toLowerCase())
  );

  return [...preferred, ...extras];
};

export const resolveArticleBySlug = async (slug: string): Promise<NewsArticle | undefined> => {
  const { getArticleBySlug } = await import('./articles');
  const staticArticle = getArticleBySlug(slug);
  if (staticArticle && (staticArticle.sections.length > 0 || staticArticle.intro.length > 0)) {
    return staticArticle;
  }

  try {
    const legacy = await getNewsBySlug(slug);
    if (legacy) return mapLegacyPostToArticle(legacy);
  } catch (error) {
    console.error(`Failed to load legacy article ${slug}:`, error);
  }

  return staticArticle;
};

export const getRelatedCards = async (article: NewsArticle): Promise<NewsCard[]> => {
  const grid = await getMergedGridArticles();
  const pool = [...FEATURED_ARTICLES, ...grid];
  const bySlug = new Map(pool.map((item) => [item.slug, item]));

  const related = article.relatedSlugs
    .map((slug) => bySlug.get(slug))
    .filter((item): item is NewsCard => Boolean(item));

  if (related.length >= 3) return related.slice(0, 3);

  const extras = pool.filter(
    (item) =>
      item.slug !== article.slug && !related.some((relatedItem) => relatedItem.slug === item.slug)
  );

  return [...related, ...extras].slice(0, 3);
};
