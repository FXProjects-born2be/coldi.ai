'use client';

import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import { DEFAULT_NEWS_IMAGE, formatCardDate, type NewsCard } from '../../lib';
import st from './ArticleCard.module.scss';

export const NEWS_LISTING_RETURN_KEY = 'newsListingReturn';

type ArticleCardProps = {
  article: NewsCard;
  variant?: 'large' | 'compact' | 'related';
};

const IMAGE_SIZES = {
  large: '(max-width: 767px) 100vw, 50vw',
  compact: '(max-width: 767px) 100px, (max-width: 1024px) 50vw, 33vw',
  related: '(max-width: 1024px) 100vw, 33vw',
} as const;

const rememberListingReturn = () => {
  if (typeof window === 'undefined') return;
  try {
    const path = `${window.location.pathname}${window.location.search}`;
    if (path.includes('/news') && !/\/news\/[^/?]+/.test(path)) {
      sessionStorage.setItem(NEWS_LISTING_RETURN_KEY, path);
    }
  } catch {
    // ignore storage errors
  }
};

export const ArticleCard = ({ article, variant = 'compact' }: ArticleCardProps) => {
  const dateLabel = formatCardDate(article.created_at);
  const category = article.category || 'News';
  const isLegacyPreview = Boolean(article.isLegacy);

  return (
    <Link
      href={`/news/${article.slug}`}
      className={cn(st.card, st[variant])}
      onClick={rememberListingReturn}
    >
      <div className={cn(st.imageWrap, isLegacyPreview && st.textPreview)}>
        {isLegacyPreview ? (
          <>
            <span className={st.badge}>
              <Image src="/icons/logo-white.svg" alt="" width={18} height={18} unoptimized />
              Coldi
            </span>
            <p className={st.previewTitle}>{article.title}</p>
          </>
        ) : (
          <Image
            src={article.image || DEFAULT_NEWS_IMAGE}
            alt={article.title}
            width={1024}
            height={576}
            sizes={IMAGE_SIZES[variant]}
          />
        )}
      </div>
      <span className={st.arrow} aria-hidden>
        <Image
          src="/images/news/icons/arrow-up-right.svg"
          alt=""
          width={24}
          height={24}
          unoptimized
        />
      </span>
      <div className={st.body}>
        <div className={st.meta}>
          <span>{category}</span>
          {dateLabel && (
            <>
              <span className={st.dot} />
              <time dateTime={article.created_at}>{dateLabel}</time>
            </>
          )}
        </div>
        <h3 className={st.title}>{article.title}</h3>
        {variant === 'large' && article.excerpt && <p className={st.excerpt}>{article.excerpt}</p>}
      </div>
    </Link>
  );
};
