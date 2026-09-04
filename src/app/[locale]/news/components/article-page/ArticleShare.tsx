'use client';

import Image from 'next/image';

import st from './ArticlePage.module.scss';

type ArticleShareProps = {
  title: string;
  url: string;
};

export const ArticleShare = ({ title, url }: ArticleShareProps) => {
  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);

  return (
    <div className={st.share}>
      <a
        className={st.shareButton}
        href={`mailto:?subject=${encodedTitle}&body=${encodedUrl}`}
        aria-label="Share by email"
      >
        <Image src="/images/news/icons/share-email.svg" alt="" width={20} height={20} unoptimized />
      </a>
      <a
        className={st.shareButton}
        href={`https://wa.me/?text=${encodedTitle}%20${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on WhatsApp"
      >
        <Image
          src="/images/news/icons/share-whatsapp.svg"
          alt=""
          width={20}
          height={20}
          unoptimized
        />
      </a>
      <a
        className={st.shareButton}
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Facebook"
      >
        <Image
          src="/images/news/icons/share-facebook.svg"
          alt=""
          width={20}
          height={20}
          unoptimized
        />
      </a>
      <a
        className={st.shareButton}
        href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
        target="_blank"
        rel="noreferrer"
        aria-label="Share on Twitter"
      >
        <Image
          src="/images/news/icons/share-twitter.svg"
          alt=""
          width={20}
          height={20}
          unoptimized
        />
      </a>
    </div>
  );
};
