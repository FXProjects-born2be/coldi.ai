'use client';
import { useEffect, useState } from 'react';
import Image from 'next/image';

import { getAllNews, type NewsArticle } from '@/features/news/news';

import st from './NewsAdmin.module.scss';

export default function NewsAdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check if user is already authenticated
    const auth = localStorage.getItem('news-admin-auth');
    if (auth === 'true') {
      setIsAuthenticated(true);
      fetchNews();
    }
  }, []);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

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
    } catch (error) {
      console.error('Login error:', error);
      setError('Failed to authenticate');
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('news-admin-auth');
    setNews([]);
  };

  const fetchNews = async () => {
    setIsLoading(true);
    try {
      const newsData = await getAllNews();
      setNews(newsData);
    } catch (error) {
      console.error('Error fetching news:', error);
      setError('Failed to fetch news');
    } finally {
      setIsLoading(false);
    }
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
        setNews(news.filter((article) => article.id !== id));
      } else {
        setError('Failed to delete article');
      }
    } catch (error) {
      console.error('Error deleting article:', error);
      setError('Failed to delete article');
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

      {isLoading ? (
        <div className={st.loading}>Loading articles...</div>
      ) : (
        <div className={st.articlesList}>
          {news.map((article) => (
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
                <p className={st.category}>Category: {article.category}</p>
              </div>
              <div className={st.articleActions}>
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
