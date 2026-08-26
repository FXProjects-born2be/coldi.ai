import { NextRequest } from 'next/server';

import createMiddleware from 'next-intl/middleware';

import { stripLocalePrefix } from '@/i18n/pathname';
import { routing } from '@/i18n/routing';

const handleI18n = createMiddleware(routing);

export default function middleware(request: NextRequest) {
  const requestHeaders = new Headers(request.headers);
  requestHeaders.set('x-pathname', stripLocalePrefix(request.nextUrl.pathname));

  const requestWithPathname = new NextRequest(request, {
    headers: requestHeaders,
  });

  return handleI18n(requestWithPathname);
}

export const config = {
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};
