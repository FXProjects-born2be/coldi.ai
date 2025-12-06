import { withBotId } from 'botid/next/config';
import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

const withNextIntl = createNextIntlPlugin();

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost',
      'localhost:3000',
      'grqtgrzdalvrywluyqxe.supabase.co',
      'www.facebook.com',
      'dashboard.retellai.com',
      'cdn-b.saashub.com',
    ],
  },
  async rewrites() {
    return [
      {
        source: '/botid/:path*',
        destination: 'https://botid.vercel.app/:path*',
      },
    ];
  },
};

// Спочатку застосовуємо next-intl, потім botid
export default withBotId(withNextIntl(nextConfig));
