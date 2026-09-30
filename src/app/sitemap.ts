import type { MetadataRoute } from 'next';

import { getAllNews } from '@/features/news/news';

import { LISTING_ARTICLES } from './[locale]/news/data';

const SITE_URL = 'https://coldi.ai';

/** Public indexable routes that exist as App Router pages (no redirects / dead URLs). */
const STATIC_PATHS = [
  '/',
  '/solutions',
  '/pricing',
  '/use-cases',
  '/coldi-vision',
  '/meet-the-team',
  '/trust-center',
  '/news',
  '/industries',
  '/industries/debt-collection',
  '/industries/emis-payments',
  '/industries/insurance',
  '/industries/other-industries',
  '/industries/trading-platforms-brokers',
  '/canadian-fintech',
  '/global-agricultural-infrastructure-provider',
  '/global-professional-services-provider',
  '/multi-asset-trading-and-investment-platform',
  '/performance-marketing-agency',
  '/residential-electrical-contractor',
  '/saas-and-hvac-service-operator',
] as const;

const toUrl = (path: string) => (path === '/' ? SITE_URL : `${SITE_URL}${path}`);

const parseDate = (value?: string) => {
  if (!value) return undefined;
  const date = new Date(value);
  return Number.isNaN(date.getTime()) ? undefined : date;
};

export const revalidate = 3600;

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const staticEntries: MetadataRoute.Sitemap = STATIC_PATHS.map((path) => ({
    url: toUrl(path),
    lastModified: new Date(),
    changeFrequency: path === '/news' ? 'daily' : 'weekly',
    priority: path === '/' ? 1 : path === '/news' ? 0.9 : 0.8,
  }));

  const newsDates = new Map<string, Date>();

  for (const article of LISTING_ARTICLES) {
    newsDates.set(article.slug, parseDate(article.created_at) ?? new Date());
  }

  const legacyPosts = await getAllNews();
  for (const post of legacyPosts) {
    if (!post.slug) continue;
    const next = parseDate(post.updated_at) ?? parseDate(post.created_at) ?? new Date();
    const current = newsDates.get(post.slug);
    if (!current || next > current) {
      newsDates.set(post.slug, next);
    }
  }

  const newsEntries: MetadataRoute.Sitemap = [...newsDates.entries()].map(
    ([slug, lastModified]) => ({
      url: toUrl(`/news/${slug}`),
      lastModified,
      changeFrequency: 'monthly',
      priority: 0.7,
    })
  );

  return [...staticEntries, ...newsEntries];
}
