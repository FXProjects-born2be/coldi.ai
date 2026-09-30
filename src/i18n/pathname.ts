import { routing } from './routing';

export type AppLocale = (typeof routing.locales)[number];

export const isAppLocale = (value: string): value is AppLocale =>
  (routing.locales as readonly string[]).includes(value);

export const getLocaleFromPathname = (pathname: string): AppLocale => {
  const first = pathname.split('/').filter(Boolean)[0];
  return first && isAppLocale(first) ? first : routing.defaultLocale;
};

export const stripLocalePrefix = (pathname: string): string => {
  const first = pathname.split('/').filter(Boolean)[0];
  if (!first || !isAppLocale(first)) return pathname || '/';

  const stripped = pathname.replace(new RegExp(`^/${first}(?=/|$)`), '');
  return stripped || '/';
};
