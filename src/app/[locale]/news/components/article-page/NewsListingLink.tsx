'use client';

import { useSyncExternalStore } from 'react';
import Link from 'next/link';

import { NEWS_LISTING_RETURN_KEY } from '../article-card/ArticleCard';

type NewsListingLinkProps = {
  className?: string;
  children: React.ReactNode;
};

const subscribe = () => () => undefined;

const getListingHref = () => {
  try {
    const saved = sessionStorage.getItem(NEWS_LISTING_RETURN_KEY);
    if (saved?.startsWith('/')) return saved;
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
