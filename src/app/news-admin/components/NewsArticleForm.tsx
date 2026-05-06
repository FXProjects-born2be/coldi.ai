'use client';

import { useState } from 'react';

import st from '../NewsAdmin.module.scss';
import { RichTextEditor } from './RichTextEditor';

export type ArticleFormState = {
  title: string;
  slug: string;
  category: string;
  image: string;
  seo_title: string;
  seo_description: string;
  content: string;
};

type NewsArticleFormProps = {
  mode: 'create' | 'edit';
  initialValue: ArticleFormState;
  title: string;
  description: string;
  submitLabel: string;
  submittingLabel: string;
  successMessage: string;
  endpoint: string;
  method: 'POST' | 'PUT';
  onSuccess?: () => void;
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export function NewsArticleForm({
  mode,
  initialValue,
  title,
  description,
  submitLabel,
  submittingLabel,
  successMessage,
  endpoint,
  method,
  onSuccess,
}: NewsArticleFormProps) {
  const [form, setForm] = useState<ArticleFormState>(initialValue);
  const [slugTouched, setSlugTouched] = useState(mode === 'edit');
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const updateForm = <K extends keyof ArticleFormState>(key: K, value: ArticleFormState[K]) => {
    setForm((current) => ({
      ...current,
      [key]: value,
    }));
  };

  const handleTitleChange = (value: string) => {
    setForm((current) => ({
      ...current,
      title: value,
      slug: slugTouched ? current.slug : slugify(value),
      seo_title: current.seo_title || value,
    }));
  };

  const resetForm = () => {
    setForm(initialValue);
    setImageFile(null);
    setSlugTouched(mode === 'edit');
    setError('');
    setSuccess('');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.title.trim() || !form.content.trim()) {
      setError('Title and content are required');
      return;
    }

    if (!imageFile && !form.image.trim()) {
      setError('Please provide an image URL or upload an image');
      return;
    }

    setIsSaving(true);

    try {
      const formData = new FormData();
      formData.append(
        'data',
        JSON.stringify({
          ...form,
          slug: slugify(form.slug || form.title),
          seo_title: form.seo_title || form.title,
        })
      );

      if (imageFile) {
        formData.append('imageFile', imageFile);
      }

      const response = await fetch(endpoint, {
        method,
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to save article');
        return;
      }

      setSuccess(successMessage);

      if (mode === 'create') {
        setForm({
          title: '',
          slug: '',
          category: '',
          image: '',
          seo_title: '',
          seo_description: '',
          content: '',
        });
        setImageFile(null);
        setSlugTouched(false);
      }

      onSuccess?.();
    } catch (submitError) {
      console.error('Error saving article:', submitError);
      setError('Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className={st.editorCard}>
      <div className={st.editorHeader}>
        <div>
          <h2>{title}</h2>
          <p>{description}</p>
        </div>
      </div>

      {error && <div className={st.error}>{error}</div>}
      {success && <div className={st.success}>{success}</div>}

      <form onSubmit={handleSubmit} className={st.articleForm}>
        <div className={st.formGrid}>
          <div className={st.inputGroup}>
            <label htmlFor={`${mode}-title`}>Title</label>
            <input
              id={`${mode}-title`}
              type="text"
              value={form.title}
              onChange={(e) => handleTitleChange(e.target.value)}
              required
            />
          </div>

          <div className={st.inputGroup}>
            <label htmlFor={`${mode}-slug`}>Slug</label>
            <input
              id={`${mode}-slug`}
              type="text"
              value={form.slug}
              onChange={(e) => {
                setSlugTouched(true);
                updateForm('slug', slugify(e.target.value));
              }}
              required
            />
          </div>

          <div className={st.inputGroup}>
            <label htmlFor={`${mode}-category`}>Category</label>
            <input
              id={`${mode}-category`}
              type="text"
              value={form.category}
              onChange={(e) => updateForm('category', e.target.value)}
              required
            />
          </div>

          <div className={st.inputGroup}>
            <label htmlFor={`${mode}-image`}>Image URL</label>
            <input
              id={`${mode}-image`}
              type="text"
              value={form.image}
              onChange={(e) => updateForm('image', e.target.value)}
              placeholder="https://..."
            />
          </div>

          <div className={st.inputGroup}>
            <label htmlFor={`${mode}-imageFile`}>Or upload image</label>
            <input
              id={`${mode}-imageFile`}
              type="file"
              accept="image/*"
              onChange={(e) => setImageFile(e.target.files?.[0] || null)}
            />
            {imageFile && <span className={st.helpText}>Selected: {imageFile.name}</span>}
          </div>

          <div className={st.inputGroup}>
            <label htmlFor={`${mode}-seoTitle`}>SEO title</label>
            <input
              id={`${mode}-seoTitle`}
              type="text"
              value={form.seo_title}
              onChange={(e) => updateForm('seo_title', e.target.value)}
            />
          </div>
        </div>

        <div className={st.inputGroup}>
          <label htmlFor={`${mode}-seoDescription`}>SEO description</label>
          <textarea
            id={`${mode}-seoDescription`}
            value={form.seo_description}
            onChange={(e) => updateForm('seo_description', e.target.value)}
            rows={4}
          />
        </div>

        <div className={st.inputGroup}>
          <label>Content</label>
          <RichTextEditor value={form.content} onChange={(value) => updateForm('content', value)} />
        </div>

        <div className={st.formActions}>
          <button type="submit" className={st.primaryButton} disabled={isSaving}>
            {isSaving ? submittingLabel : submitLabel}
          </button>
          <button type="button" className={st.secondaryButton} onClick={resetForm}>
            Reset form
          </button>
        </div>
      </form>
    </section>
  );
}
