import Image from 'next/image';
import Link from 'next/link';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/helpers';

import { DEFAULT_NEWS_IMAGE, type NewsArticle, type NewsCard, slugifyHeading } from '../../lib';
import { ArticleCard } from '../article-card/ArticleCard';
import st from './ArticlePage.module.scss';
import { ArticleShare } from './ArticleShare';
import { ArticleSummarizeWithAi } from './ArticleSummarizeWithAi';
import { ArticleToc } from './ArticleToc';
import { NewsListingLink } from './NewsListingLink';

const SITE_URL = 'https://coldi.ai';

type ArticlePageProps = {
  article: NewsArticle;
  related: NewsCard[];
};

const renderBlocks = (blocks: NewsArticle['intro'], className: string) => {
  const nodes: ReactNode[] = [];
  let paragraphHtml = '';

  const flushParagraphs = () => {
    if (!paragraphHtml) return;
    nodes.push(
      <div
        key={`p-${nodes.length}`}
        className={className}
        dangerouslySetInnerHTML={{ __html: paragraphHtml }}
      />
    );
    paragraphHtml = '';
  };

  blocks.forEach((block, index) => {
    if (block.type === 'p') {
      paragraphHtml += block.html.trim().startsWith('<p') ? block.html : `<p>${block.html}</p>`;
      return;
    }

    flushParagraphs();

    if (block.type === 'note') {
      nodes.push(
        <p key={`note-${index}`} className={st.note}>
          {block.text}
        </p>
      );
      return;
    }

    if (block.type === 'image') {
      nodes.push(
        <div key={`img-${index}`} className={st.inlineImage}>
          <Image
            src={block.src}
            alt={block.alt || ''}
            fill
            sizes="900px"
            quality={100}
            unoptimized
          />
        </div>
      );
      return;
    }

    const rowClass = `${st.tableRow} ${block.headers.length === 2 ? st.tableRow2 : ''}`;

    nodes.push(
      <div key={`table-${index}`} className={st.table} role="table">
        <div className={rowClass} role="row">
          {block.headers.map((header) => (
            <div key={header} className={`${st.tableCell} ${st.tableHead}`} role="columnheader">
              {header}
            </div>
          ))}
        </div>
        {block.rows.map((row) => (
          <div key={row.join('-')} className={rowClass} role="row">
            {row.map((cell) => (
              <div key={cell} className={st.tableCell} role="cell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>
    );
  });

  flushParagraphs();
  return nodes;
};

export const ArticlePage = ({ article, related }: ArticlePageProps) => {
  const articleUrl = `${SITE_URL}/news/${article.slug}`;
  const tocItems =
    article.htmlToc && article.htmlToc.length > 0
      ? article.htmlToc
      : article.sections.map((section) => ({
          id: slugifyHeading(section.heading),
          text: section.heading,
        }));

  return (
    <main className={st.page}>
      <section className={st.hero}>
        <div className={`container ${st.heroInner}`}>
          <nav className={st.breadcrumbs} aria-label="Breadcrumb">
            <ol className={st.crumbs}>
              <li>
                <Link href="/" className={st.crumbLink}>
                  Home
                </Link>
              </li>
              <li className={st.separator} aria-hidden>
                <Image
                  src="/images/news/icons/breadcrumbs-arrow.svg"
                  alt=""
                  width={8}
                  height={16}
                  unoptimized
                />
              </li>
              <li>
                <NewsListingLink className={st.crumbLink}>News</NewsListingLink>
              </li>
              <li className={st.separator} aria-hidden>
                <Image
                  src="/images/news/icons/breadcrumbs-arrow.svg"
                  alt=""
                  width={8}
                  height={16}
                  unoptimized
                />
              </li>
              <li>
                <span className={st.crumbCurrent}>{article.title}</span>
              </li>
            </ol>
          </nav>

          <div className={st.heroCopy}>
            <h1 className={st.title}>{article.title}</h1>
            <div className={st.meta}>
              <div className={st.metaItem}>
                <span className={st.metaLabel}>Date</span>
                <time className={st.metaValue} dateTime={article.created_at}>
                  {article.dateLabel}
                </time>
              </div>
              <div className={st.metaItem}>
                <span className={st.metaLabel}>category</span>
                <span className={st.metaValue}>{article.category}</span>
              </div>
            </div>
          </div>

          <div className={cn(st.heroImage, article.isLegacy && st.heroTextPreview)}>
            {article.isLegacy ? (
              <>
                <span className={st.heroBadge}>
                  <Image src="/icons/logo-white.svg" alt="" width={18} height={18} unoptimized />
                  Coldi
                </span>
                <p className={st.heroPreviewTitle}>{article.title}</p>
              </>
            ) : (
              <Image
                src={article.heroImage || article.image || DEFAULT_NEWS_IMAGE}
                alt={article.title}
                fill
                sizes="(max-width: 1024px) 100vw, 1280px"
              />
            )}
          </div>
        </div>
      </section>

      <section className={st.body}>
        <div className={`container ${st.bodyInner}`}>
          <aside className={st.sidebar}>
            <ArticleToc items={tocItems} />
            <ArticleShare title={article.title} url={articleUrl} />
          </aside>

          <div className={st.content}>
            <ArticleSummarizeWithAi url={articleUrl} />

            {article.htmlContent ? (
              <div
                className={`${st.section} ${st.htmlContent}`}
                dangerouslySetInnerHTML={{ __html: article.htmlContent }}
              />
            ) : (
              <>
                {article.intro.length > 0 && (
                  <div className={st.section}>{renderBlocks(article.intro, st.intro)}</div>
                )}

                {article.sections.map((section) => {
                  const id = slugifyHeading(section.heading);

                  return (
                    <section key={id} className={st.section}>
                      <h2 id={id} className={st.heading}>
                        {section.heading}
                      </h2>
                      {renderBlocks(section.blocks, st.sectionBody)}
                    </section>
                  );
                })}
              </>
            )}
          </div>
        </div>
      </section>

      {related.length > 0 && (
        <section className={st.keepReading}>
          <div className={`container ${st.keepInner}`}>
            <h2 className={st.keepTitle}>Keep reading:</h2>
            <div className={st.keepGrid}>
              {related.map((item) => (
                <ArticleCard key={item.id} article={item} variant="related" />
              ))}
            </div>
          </div>
        </section>
      )}

      <section className={st.cta}>
        <Image
          src="/images/news/article-cta-bg.png"
          alt=""
          fill
          className={st.ctaBg}
          quality={100}
          unoptimized
        />
        <div className={st.ctaInner}>
          <h2 className={st.ctaTitle}>Turn more calls into real conversations</h2>
          <Link href="/calendar" className={st.ctaButton}>
            Talk to Sales
          </Link>
        </div>
      </section>
    </main>
  );
};
