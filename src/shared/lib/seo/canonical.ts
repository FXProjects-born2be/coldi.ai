const SITE_URL = 'https://coldi.ai';

const NON_INDEXED_PATH_PREFIXES = [
  '/calendar',
  '/news-admin',
  '/turn-leads-into-meetings',
  '/turn-leads-into-meetings-2',
];

const matchesPathPrefix = (pathname: string, prefix: string) =>
  pathname === prefix || pathname.startsWith(`${prefix}/`);

export const shouldHaveSelfCanonical = (pathname: string) =>
  !NON_INDEXED_PATH_PREFIXES.some((prefix) => matchesPathPrefix(pathname, prefix));

export const getCanonicalUrl = (pathname: string) => {
  if (pathname === '/') return SITE_URL;

  return `${SITE_URL}${pathname}`;
};
