import { FEATURED_ARTICLES, GRID_ARTICLES } from '../../data';
import { NEWS_CATEGORIES } from '../../lib';
import { AllArticles } from '../all-articles/AllArticles';
import { Hero } from '../hero/Hero';

export const NewsFeed = () => (
  <>
    <Hero articles={FEATURED_ARTICLES} />
    <AllArticles articles={GRID_ARTICLES} categories={NEWS_CATEGORIES} />
  </>
);
