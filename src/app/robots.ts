import type { MetadataRoute } from 'next';

import { isSearchIndexable } from '@/shared/lib/seo/indexing';

/** AI / answer-engine crawlers that should explicitly be allowed to fetch public pages. */
const AI_CRAWLERS = ['GPTBot', 'ClaudeBot', 'PerplexityBot', 'Google-Extended'] as const;

const PUBLIC_DISALLOW = ['/news-admin', '/api/auth/', '/api/news/', '/it/', '/et/', '/de/'];

export default function robots(): MetadataRoute.Robots {
  if (!isSearchIndexable()) {
    return {
      rules: {
        userAgent: '*',
        disallow: '/',
      },
    };
  }

  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        disallow: PUBLIC_DISALLOW,
      },
      ...AI_CRAWLERS.map((userAgent) => ({
        userAgent,
        allow: '/',
        disallow: PUBLIC_DISALLOW,
      })),
    ],
    sitemap: 'https://coldi.ai/sitemap.xml',
  };
}
