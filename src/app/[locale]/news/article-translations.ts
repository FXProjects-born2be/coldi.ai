import type { ArticleBlock, ArticleFaqItem, ArticleSection, NewsArticle, NewsCard } from './lib';

export const TRANSLATABLE_ARTICLE_SLUGS = [
  'what-building-for-the-us-taught-us',
  'impact-of-ai-on-life-insurance',
  'ai-benefits-for-real-estate-brokerage',
  'best-voice-ai-platforms-for-fintech-debt-collection-and-insurance-in-2026-where-coldi-fits',
  'coldi-ai-vs-topcalls-two-managed-voice-ai-providers-compared-for-fintech-and-collections',
  'coldi-ai-vs-in-house-build-real-cost-and-time-to-launch-of-diy-voice-ai',
  'coldi-ai-vs-legacy-ivr-why-conversational-voice-ai-is-replacing-phone-trees',
  'coldi-ai-vs-talkdesk-aircall-and-nextiva-autonomous-ai-agents-vs-ai-copilot-for-human-reps',
  'coldi-ai-vs-traditional-bpo-call-centers-ai-voice-agents-vs-human-agent-teams',
  'coldi-ai-vs-bland-ai-which-platform-needs-less-engineering',
  'coldi-ai-vs-retell-ai-full-service-operations-vs-api-first-voice-platform',
  'coldi-ai-vs-vapi-done-for-you-deployment-vs-developer-infrastructure',
  'coldi-ai-vs-elevenlabs-managed-voice-agents-vs-build-your-own',
  'is-ai-safe',
  'will-ai-replace-real-estate-agents',
  'voice-ai-for-outbound-sales',
  'what-is-an-inbound-call-center',
  'how-ai-reduces-costs-in-healthcare',
  'ai-car-in-insurance',
  'free-llm-ecosystems-and-frameworks',
  'will-ai-replace-real-estate-agents-2026',
] as const;

export type TranslatableArticleSlug = (typeof TRANSLATABLE_ARTICLE_SLUGS)[number];

export type ArticleTranslationContent = {
  title: string;
  category: string;
  excerpt: string;
  dateLabel: string;
  intro: ArticleBlock[];
  sections: ArticleSection[];
  faq: ArticleFaqItem[];
};

const isTranslatableSlug = (slug: string): slug is TranslatableArticleSlug =>
  (TRANSLATABLE_ARTICLE_SLUGS as readonly string[]).includes(slug);

export const loadArticleTranslation = async (
  slug: string,
  locale: string
): Promise<ArticleTranslationContent | null> => {
  if (!isTranslatableSlug(slug)) return null;

  const read = async (loc: string) => {
    const mod = await import(`../../../../messages/news-articles/${loc}/${slug}.json`);
    return (mod.default ?? mod) as ArticleTranslationContent;
  };

  try {
    return await read(locale);
  } catch {
    if (locale === 'en') return null;
    try {
      return await read('en');
    } catch {
      return null;
    }
  }
};

export const applyArticleTranslation = (
  article: NewsArticle,
  content: ArticleTranslationContent
): NewsArticle => ({
  ...article,
  title: content.title,
  category: content.category,
  excerpt: content.excerpt,
  dateLabel: content.dateLabel,
  intro: content.intro,
  sections: content.sections,
  faq: content.faq,
});

export const applyCardTranslation = (
  card: NewsCard,
  content: Pick<ArticleTranslationContent, 'title' | 'category' | 'excerpt'>
): NewsCard => ({
  ...card,
  title: content.title,
  category: content.category,
  excerpt: content.excerpt,
});

export const getTranslatedFeaturedArticles = async (
  featured: NewsCard[],
  locale: string
): Promise<NewsCard[]> =>
  Promise.all(
    featured.map(async (card) => {
      const content = await loadArticleTranslation(card.slug, locale);
      return content ? applyCardTranslation(card, content) : card;
    })
  );
