// import { withBotId } from 'botid/next/config'; // temporarily disabled to debug 429 on static chunks
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

// export default withBotId(nextConfig); // temporarily disabled to debug 429 on static chunks
export default nextConfig;
