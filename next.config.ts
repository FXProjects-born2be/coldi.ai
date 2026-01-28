import { withBotId } from 'botid/next/config';
import type { NextConfig } from 'next';

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

// Спочатку застосовуємо next-intl, потім botid
export default withBotId(nextConfig);
