'use client';

import { useEffect } from 'react';

import { getBodyPageClass } from '@/shared/lib/helpers';

import { usePathname } from '@/i18n/navigation';

export const BodyPageClass = () => {
  const pathname = usePathname() ?? '';

  useEffect(() => {
    const pageClass = getBodyPageClass(pathname);

    document.body.classList.forEach((className) => {
      if (className.startsWith('page-')) {
        document.body.classList.remove(className);
      }
    });

    document.body.classList.add(pageClass);
  }, [pathname]);

  return null;
};
