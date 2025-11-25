import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';

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
};

const withNextIntl = createNextIntlPlugin();
export default withNextIntl(nextConfig);
