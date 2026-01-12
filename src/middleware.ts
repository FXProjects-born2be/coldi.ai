import type { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { routing } from './i18n/routing';

const intlMiddleware = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  // 1) запускаємо next-intl middleware
  const response = intlMiddleware(request);

  // 2) додаємо pathname в headers
  // (врахуй: тут буде вже з locale в URL, напр. /en/pricing)
  response.headers.set('x-pathname', request.nextUrl.pathname);

  return response;
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
