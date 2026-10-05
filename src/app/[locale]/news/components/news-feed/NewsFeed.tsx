import { getLocale } from 'next-intl/server';

import { getTranslatedFeaturedArticles } from '../../article-translations';
import { FEATURED_ARTICLES } from '../../data';
import { getMergedGridArticles, getNewsFilterCategories } from '../../legacy';
import { AllArticles } from '../all-articles/AllArticles';
import { Hero } from '../hero/Hero';

import NewsInterview from '@/app/[locale]/news/components/NewsInterview';

export const NewsFeed = async () => {
  const locale = await getLocale();
  const [featuredArticles, gridArticles] = await Promise.all([
    getTranslatedFeaturedArticles(FEATURED_ARTICLES, locale),
    getMergedGridArticles(locale),
  ]);
  const categories = getNewsFilterCategories([...featuredArticles, ...gridArticles]);

  return (
    <>
      <Hero articles={featuredArticles} />
      <NewsInterview />
      <AllArticles articles={gridArticles} categories={categories} />
    </>
  );
};
