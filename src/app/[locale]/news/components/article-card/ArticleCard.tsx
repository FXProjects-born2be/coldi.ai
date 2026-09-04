import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';

import { DEFAULT_NEWS_IMAGE, formatCardDate, type NewsCard } from '../../lib';
import st from './ArticleCard.module.scss';

type ArticleCardProps = {
  article: NewsCard;
  variant?: 'large' | 'compact' | 'related';
};

export const ArticleCard = ({ article, variant = 'compact' }: ArticleCardProps) => {
  const dateLabel = formatCardDate(article.created_at);
  const category = article.category || 'News';

  return (
    <Link href={`/news/${article.slug}`} className={cn(st.card, st[variant])}>
      <div className={st.imageWrap}>
        <Image
          src={article.image || DEFAULT_NEWS_IMAGE}
          alt={article.title}
          width={1024}
          height={576}
          quality={100}
          unoptimized
        />
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
