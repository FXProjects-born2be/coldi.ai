'use client';

import { useState, useSyncExternalStore } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

import type { ReactNode } from 'react';

import st from '../NewsAdmin.module.scss';

const AUTH_KEY = 'news-admin-auth';
const authListeners = new Set<() => void>();

const subscribeAuth = (onStoreChange: () => void) => {
  authListeners.add(onStoreChange);
  return () => {
    authListeners.delete(onStoreChange);
  };
};

const getAuthSnapshot = () => localStorage.getItem(AUTH_KEY) === 'true';
const getAuthServerSnapshot = () => false;
const getIsClientSnapshot = () => true;
const getIsClientServerSnapshot = () => false;
const subscribeClient = () => () => undefined;

const emitAuthChange = () => {
  authListeners.forEach((listener) => listener());
};

type NewsAdminShellProps = {
  title: string;
  children: ReactNode;
};

export function NewsAdminShell({ title, children }: NewsAdminShellProps) {
  const router = useRouter();
  const isClient = useSyncExternalStore(
    subscribeClient,
    getIsClientSnapshot,
    getIsClientServerSnapshot
  );
  const isAuthenticated = useSyncExternalStore(
    subscribeAuth,
    getAuthSnapshot,
    getAuthServerSnapshot
  );
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

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
        localStorage.setItem(AUTH_KEY, 'true');
        emitAuthChange();
        router.refresh();
        return;
      }

      setError(data.error || 'Invalid credentials');
    } catch (loginError) {
      console.error('Login error:', loginError);
      setError('Failed to authenticate');
    }
  };

  const handleLogout = () => {
    localStorage.removeItem(AUTH_KEY);
    emitAuthChange();
    router.push('/news-admin');
  };

  if (!isClient) {
    return <div className={st.loading}>Checking access...</div>;
  }

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
            <button aria-label="Login" name="login" type="submit" className={st.loginButton}>
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
        <h1>{title}</h1>
        <button
          aria-label="Logout"
          name="logout"
          onClick={handleLogout}
          className={st.logoutButton}
        >
          Logout
        </button>
      </div>

      <nav className={st.topNav}>
        <Link href="/news-admin" className={st.topNavLink}>
          Articles
        </Link>
        <Link href="/news-admin/add" className={st.topNavLink}>
          Add Article
        </Link>
      </nav>

      {children}
    </div>
  );
}
