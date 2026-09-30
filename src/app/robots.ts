import type { MetadataRoute } from 'next';

import { isSearchIndexable } from '@/shared/lib/seo/indexing';

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
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/news-admin', '/api/auth/', '/api/news/', '/it/', '/et/', '/de/'],
    },
    sitemap: 'https://coldi.ai/sitemap.xml',
  };
}
