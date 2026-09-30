import { FEATURED_ARTICLES } from '../../data';
import { getMergedGridArticles, getNewsFilterCategories } from '../../legacy';
import { AllArticles } from '../all-articles/AllArticles';
import { Hero } from '../hero/Hero';

export const NewsFeed = async () => {
  const gridArticles = await getMergedGridArticles();
  const categories = getNewsFilterCategories([...FEATURED_ARTICLES, ...gridArticles]);

  return (
    <>
      <Hero articles={FEATURED_ARTICLES} />
      <AllArticles articles={gridArticles} categories={categories} />
    </>
  );
};
