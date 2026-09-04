export type NewsCard = {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  image: string;
  category: string;
  created_at: string;
};

export type ArticleBlock =
  | { type: 'p'; html: string }
  | { type: 'note'; text: string }
  | { type: 'image'; src: string; alt?: string }
  | { type: 'table'; headers: string[]; rows: string[][] };

export type ArticleSection = {
  heading: string;
  blocks: ArticleBlock[];
};

export type NewsArticle = NewsCard & {
  dateLabel: string;
  heroImage?: string;
  showSummarize?: boolean;
  relatedSlugs: string[];
  intro: ArticleBlock[];
  sections: ArticleSection[];
};

export const slugifyHeading = (value: string) =>
  value
    .toLowerCase()
    .replace(/&nbsp;/g, ' ')
    .replace(/[^\p{L}\p{N}\s-]/gu, '')
    .trim()
    .replace(/\s+/g, '-');

export const DEFAULT_NEWS_IMAGE = '/images/news/news-outbound.png';
export const ARTICLES_PAGE_SIZE = 8;
export const LARGE_CARDS_COUNT = 2;

export const NEWS_CATEGORIES = [
  'Use Cases',
  'How AI Agents Work',
  'Industry Trends',
  'Company News',
  'Collaborations',
];

const getOrdinal = (day: number) => {
  if (day % 10 === 1 && day !== 11) return 'st';
  if (day % 10 === 2 && day !== 12) return 'nd';
  if (day % 10 === 3 && day !== 13) return 'rd';
  return 'th';
};

export const formatFeaturedDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  const day = date.getDate();
  const month = date.toLocaleString('en-GB', { month: 'long' });

  return `${day}${getOrdinal(day)} ${month} ${date.getFullYear()}`;
};

export const formatCardDate = (value: string) => {
  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return date.toLocaleString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });
};

export const padPage = (value: number) => String(value).padStart(2, '0');
