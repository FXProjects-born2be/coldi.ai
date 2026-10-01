'use client';

import { useSyncExternalStore } from 'react';

import { NEWS_LISTING_RETURN_KEY } from '../article-card/ArticleCard';

import { Link } from '@/i18n/navigation';
import { stripLocalePrefix } from '@/i18n/pathname';

type NewsListingLinkProps = {
  className?: string;
  children: React.ReactNode;
};

const subscribe = () => () => undefined;

const getListingHref = () => {
  try {
    const saved = sessionStorage.getItem(NEWS_LISTING_RETURN_KEY);
    if (saved?.startsWith('/')) return stripLocalePrefix(saved);
  } catch {
    // ignore storage errors
  }
  return '/news';
};

export const NewsListingLink = ({ className, children }: NewsListingLinkProps) => {
  const href = useSyncExternalStore(subscribe, getListingHref, () => '/news');

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
};
