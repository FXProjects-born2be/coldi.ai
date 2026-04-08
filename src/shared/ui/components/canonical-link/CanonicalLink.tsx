'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

import { getCanonicalUrl, shouldHaveSelfCanonical } from '@/shared/lib/seo/canonical';

const CANONICAL_SELECTOR = 'link[rel="canonical"][data-self-canonical="true"]';

export const CanonicalLink = () => {
  const pathname = usePathname();

  useEffect(() => {
    const existing = document.head.querySelector<HTMLLinkElement>(CANONICAL_SELECTOR);

    if (!pathname || !shouldHaveSelfCanonical(pathname)) {
      existing?.remove();
      return;
    }

    const href = getCanonicalUrl(pathname);
    const link = existing ?? document.createElement('link');

    link.setAttribute('rel', 'canonical');
    link.setAttribute('href', href);
    link.setAttribute('data-self-canonical', 'true');

    if (!existing) {
      document.head.appendChild(link);
    }
  }, [pathname]);

  return null;
};
