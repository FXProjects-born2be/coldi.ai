'use client';

import { useEffect } from 'react';

import { useLocale } from 'next-intl';

import { getBodyPageClass, rememberCalendarReturn } from '@/shared/lib/helpers';

import { usePathname } from '@/i18n/navigation';
import { routing } from '@/i18n/routing';

export const BodyPageClass = () => {
  const pathname = usePathname() ?? '';
  const locale = useLocale();

  useEffect(() => {
    const pageClass = getBodyPageClass(pathname);

    document.body.classList.forEach((className) => {
      if (className.startsWith('page-')) {
        document.body.classList.remove(className);
      }
    });

    for (const appLocale of routing.locales) {
      document.body.classList.toggle(appLocale, appLocale === locale);
    }

    document.body.classList.add(pageClass);
    rememberCalendarReturn(pathname, window.location.search);
  }, [pathname, locale]);

  return null;
};
