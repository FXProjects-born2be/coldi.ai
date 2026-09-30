'use client';

import { NewsAdminShell } from '../components/NewsAdminShell';
import { type ArticleFormState, NewsArticleForm } from '../components/NewsArticleForm';

const emptyForm: ArticleFormState = {
  title: '',
  slug: '',
  category: '',
  image: '',
  seo_title: '',
  seo_description: '',
  content: '',
};

export default function AddNewsArticlePage() {
  return (
    <NewsAdminShell title="Add News Article">
      <NewsArticleForm
        mode="create"
        initialValue={emptyForm}
        title="Create article"
        description="This page only creates new articles and cannot overwrite existing ones."
        submitLabel="Create article"
        submittingLabel="Saving..."
        successMessage="Article created successfully"
        endpoint="/api/news"
        method="POST"
      />
    </NewsAdminShell>
  );
}
