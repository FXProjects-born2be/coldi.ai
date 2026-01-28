import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

export function middleware(req: NextRequest) {
  // ✅ bypass Vercel internal/proxy traffic (BotID дуже часто йде так)
  if (
    req.headers.get('x-vercel-proxy-signature') ||
    req.headers.get('x-vercel-id') ||
    req.headers.get('x-vercel-sc-host')
  ) {
    return NextResponse.next();
  }

  // ✅ стандартні байпаси
  const { pathname } = req.nextUrl;
  if (
    pathname.startsWith('/_next') ||
    pathname.startsWith('/api') ||
    pathname === '/favicon.ico' ||
    pathname === '/robots.txt' ||
    pathname === '/sitemap.xml'
  ) {
    return NextResponse.next();
  }

  // ...твоя існуюча логіка
  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!_next|api|favicon.ico|robots.txt|sitemap.xml).*)'],
};
