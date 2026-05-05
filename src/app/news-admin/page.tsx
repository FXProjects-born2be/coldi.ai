'use client';

import { useEffect, useMemo, useState } from 'react';
import Image from 'next/image';

import { getAllNews, type NewsArticle } from '@/features/news/news';

import { RichTextEditor } from './components/RichTextEditor';
import st from './NewsAdmin.module.scss';

type ArticleFormState = {
  title: string;
  slug: string;
  category: string;
  image: string;
  seo_title: string;
  seo_description: string;
  content: string;
};

const emptyForm: ArticleFormState = {
  title: '',
  slug: '',
  category: '',
  image: '',
  seo_title: '',
  seo_description: '',
  content: '',
};

const slugify = (value: string) =>
  value
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)+/g, '');

export default function NewsAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [editingArticleId, setEditingArticleId] = useState<string | null>(null);
  const [slugTouched, setSlugTouched] = useState(false);
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [form, setForm] = useState<ArticleFormState>(emptyForm);

  useEffect(() => {
    const auth = localStorage.getItem('news-admin-auth');

    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchNews();
    }
  }, []);

  const sortedNews = useMemo(
    () =>
      [...news].sort((a, b) => new Date(b.created_at).getTime() - new Date(a.created_at).getTime()),
    [news]
  );

  const resetForm = () => {
    setForm(emptyForm);
    setImageFile(null);
    setEditingArticleId(null);
    setSlugTouched(false);
  };

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const response = await fetch('/api/auth/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      const data = await response.json();

      if (response.ok && data.success) {
        setIsAuthenticated(true);
        localStorage.setItem('news-admin-auth', 'true');
        fetchNews();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (loginError) {
      console.error('Login error:', loginError);
      setError('Failed to authenticate');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('news-admin-auth');
    setNews([]);
    resetForm();
  };

  const fetchNews = async () => {
    setIsLoading(true);

    try {
      const newsData = await getAllNews();
      setNews(newsData);
    } catch (fetchError) {
      console.error('Error fetching news:', fetchError);
      setError('Failed to fetch news');
    } finally {
      setIsLoading(false);
    }
  };

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

  const handleEditArticle = (article: NewsArticle) => {
    setError('');
    setSuccess('');
    setEditingArticleId(article.id);
    setImageFile(null);
    setSlugTouched(true);
    setForm({
      title: article.title || '',
      slug: article.slug || '',
      category: article.category || '',
      image: article.image || '',
      seo_title: article.seo_title || article.title || '',
      seo_description: article.seo_description || '',
      content: article.content || '',
    });
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleDeleteArticle = async (id: string) => {
    if (!confirm('Are you sure you want to delete this article?')) {
      return;
    }

    try {
      const response = await fetch(`/api/news/${id}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        setNews((current) => current.filter((article) => article.id !== id));

        if (editingArticleId === id) {
          resetForm();
        }
      } else {
        setError('Failed to delete article');
      }
    } catch (deleteError) {
      console.error('Error deleting article:', deleteError);
      setError('Failed to delete article');
    }
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

      const isEditing = Boolean(editingArticleId);
      const response = await fetch(isEditing ? `/api/news/${editingArticleId}` : '/api/news', {
        method: isEditing ? 'PUT' : 'POST',
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        setError(data.error || 'Failed to save article');
        return;
      }

      if (isEditing) {
        setNews((current) =>
          current.map((article) => (article.id === data.article.id ? data.article : article))
        );
        setSuccess('Article updated successfully');
      } else {
        setNews((current) => [data.article, ...current]);
        setSuccess('Article created successfully');
      }

      resetForm();
    } catch (submitError) {
      console.error('Error saving article:', submitError);
      setError('Failed to save article');
    } finally {
      setIsSaving(false);
    }
  };

  if (!isAuthenticated) {
    return (
      <div className={st.loginContainer}>
        <div className={st.loginForm}>
          <h1>News Admin Login</h1>
          <form onSubmit={handleLogin}>
            <div className={st.inputGroup}>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className={st.inputGroup}>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            {error && <div className={st.error}>{error}</div>}
            <button type="submit" className={st.loginButton}>
              Login
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className={st.adminContainer}>
      <div className={st.header}>
        <h1>News Admin Panel</h1>
        <button onClick={handleLogout} className={st.logoutButton}>
          Logout
        </button>
      </div>

      {error && <div className={st.error}>{error}</div>}
      {success && <div className={st.success}>{success}</div>}

      <section className={st.editorCard}>
        <div className={st.editorHeader}>
          <div>
            <h2>{editingArticleId ? 'Edit article' : 'Create article'}</h2>
            <p>Manage content, SEO fields, slug, and article image in one place.</p>
          </div>
          {editingArticleId && (
            <button type="button" className={st.secondaryButton} onClick={resetForm}>
              Cancel editing
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className={st.articleForm}>
          <div className={st.formGrid}>
            <div className={st.inputGroup}>
              <label htmlFor="title">Title</label>
              <input
                id="title"
                type="text"
                value={form.title}
                onChange={(e) => handleTitleChange(e.target.value)}
                required
              />
            </div>

            <div className={st.inputGroup}>
              <label htmlFor="slug">Slug</label>
              <input
                id="slug"
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
              <label htmlFor="category">Category</label>
              <input
                id="category"
                type="text"
                value={form.category}
                onChange={(e) => updateForm('category', e.target.value)}
                required
              />
            </div>

            <div className={st.inputGroup}>
              <label htmlFor="image">Image URL</label>
              <input
                id="image"
                type="text"
                value={form.image}
                onChange={(e) => updateForm('image', e.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className={st.inputGroup}>
              <label htmlFor="imageFile">Or upload image</label>
              <input
                id="imageFile"
                type="file"
                accept="image/*"
                onChange={(e) => setImageFile(e.target.files?.[0] || null)}
              />
              {imageFile && <span className={st.helpText}>Selected: {imageFile.name}</span>}
            </div>

            <div className={st.inputGroup}>
              <label htmlFor="seoTitle">SEO title</label>
              <input
                id="seoTitle"
                type="text"
                value={form.seo_title}
                onChange={(e) => updateForm('seo_title', e.target.value)}
              />
            </div>
          </div>

          <div className={st.inputGroup}>
            <label htmlFor="seoDescription">SEO description</label>
            <textarea
              id="seoDescription"
              value={form.seo_description}
              onChange={(e) => updateForm('seo_description', e.target.value)}
              rows={4}
            />
          </div>

          <div className={st.inputGroup}>
            <label>Content</label>
            <RichTextEditor
              value={form.content}
              onChange={(value) => updateForm('content', value)}
            />
          </div>

          <div className={st.formActions}>
            <button type="submit" className={st.primaryButton} disabled={isSaving}>
              {isSaving ? 'Saving...' : editingArticleId ? 'Update article' : 'Create article'}
            </button>
            <button type="button" className={st.secondaryButton} onClick={resetForm}>
              Clear form
            </button>
          </div>
        </form>
      </section>

      {isLoading ? (
        <div className={st.loading}>Loading articles...</div>
      ) : (
        <div className={st.articlesList}>
          {sortedNews.map((article) => (
            <div key={article.id} className={st.articleItem}>
              <div className={st.articleImage}>
                <Image
                  src={article.image || '/images/news/news-item-image.png'}
                  alt={article.title}
                  width={200}
                  height={120}
                />
              </div>
              <div className={st.articleInfo}>
                <h3>{article.title}</h3>
                <p className={st.category}>Category: {article.category || 'Uncategorized'}</p>
                <p className={st.slug}>/{article.slug}</p>
                <p className={st.date}>
                  Updated:{' '}
                  {article.updated_at
                    ? new Date(article.updated_at).toLocaleString()
                    : new Date(article.created_at).toLocaleString()}
                </p>
              </div>
              <div className={st.articleActions}>
                <button onClick={() => handleEditArticle(article)} className={st.editButton}>
                  Edit
                </button>
                <button onClick={() => handleDeleteArticle(article.id)} className={st.deleteButton}>
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
