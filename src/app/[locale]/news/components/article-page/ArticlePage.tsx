import Image from 'next/image';
import Link from 'next/link';

import type { ReactNode } from 'react';

import { DEFAULT_NEWS_IMAGE, type NewsArticle, type NewsCard, slugifyHeading } from '../../lib';
import { ArticleCard } from '../article-card/ArticleCard';
import st from './ArticlePage.module.scss';
import { ArticleShare } from './ArticleShare';
import { ArticleToc } from './ArticleToc';

const SITE_URL = 'https://coldi.ai';

const SUMMARIZE_TOOLS = [
  {
    name: 'ChatGPT',
    icon: '/images/news/icons/ai-chatgpt.svg',
    href: (url: string) =>
      `https://chatgpt.com/?q=${encodeURIComponent(`Summarize this article: ${url}`)}`,
  },
  {
    name: 'Perplexity',
    icon: '/images/news/icons/ai-perplexity.svg',
    href: (url: string) =>
      `https://www.perplexity.ai/search?q=${encodeURIComponent(`Summarize ${url}`)}`,
  },
  {
    name: 'Grok',
    icon: '/images/news/icons/ai-grok.svg',
    href: (url: string) =>
      `https://x.com/i/grok?text=${encodeURIComponent(`Summarize this article: ${url}`)}`,
  },
  {
    name: 'Gemini',
    icon: '/images/news/icons/ai-gemini.svg',
    href: (url: string) =>
      `https://gemini.google.com/app?q=${encodeURIComponent(`Summarize this article: ${url}`)}`,
  },
  {
    name: 'Claude',
    icon: '/images/news/icons/ai-claude.svg',
    href: (url: string) =>
      `https://claude.ai/new?q=${encodeURIComponent(`Summarize this article: ${url}`)}`,
  },
] as const;

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
  const tocItems = article.sections.map((section) => ({
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
                <Link href="/news" className={st.crumbLink}>
                  News
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

          <div className={st.heroImage}>
            <Image
              src={article.heroImage || article.image || DEFAULT_NEWS_IMAGE}
              alt={article.title}
              fill
              sizes="(max-width: 1024px) 100vw, 1280px"
              quality={100}
              unoptimized
              priority
            />
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
            {article.showSummarize && (
              <div className={st.summarize}>
                <p className={st.summarizeLabel}>
                  <Image
                    src="/images/news/icons/sparks.svg"
                    alt=""
                    width={16}
                    height={16}
                    unoptimized
                  />
                  Summarize with ai
                </p>
                <div className={st.summarizeButtons}>
                  {SUMMARIZE_TOOLS.map((tool) => (
                    <a
                      key={tool.name}
                      className={st.summarizeButton}
                      href={tool.href(articleUrl)}
                      target="_blank"
                      rel="noreferrer"
                    >
                      <Image src={tool.icon} alt="" width={24} height={24} unoptimized />
                      {tool.name}
                    </a>
                  ))}
                </div>
              </div>
            )}

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
