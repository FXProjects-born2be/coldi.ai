// import { withBotId } from 'botid/next/config'; // temporarily disabled to debug 429 on static chunks
import type { NextConfig } from 'next';

// Security headers applied to every response.
// CSP starts with a safe baseline (`upgrade-insecure-requests`) that does NOT
// block any assets. To enforce a stricter policy later, extend this string with
// script-src/style-src/etc. and test against the third-party scripts in use
// (Google Analytics, Meta Pixel, reCAPTCHA, hCaptcha, Cloudflare Turnstile,
// Retell AI, Supabase, YouTube embeds).
const securityHeaders = [
  {
    key: 'Referrer-Policy',
    value: 'strict-origin-when-cross-origin',
  },
  {
    key: 'X-Frame-Options',
    value: 'SAMEORIGIN',
  },
  {
    key: 'X-Content-Type-Options',
    value: 'nosniff',
  },
  {
    key: 'Content-Security-Policy',
    value: 'upgrade-insecure-requests;',
  },
];

const nextConfig: NextConfig = {
  images: {
    domains: [
      'localhost',
      'localhost:3000',
      'grqtgrzdalvrywluyqxe.supabase.co',
      'www.facebook.com',
      'dashboard.retellai.com',
      'cdn-b.saashub.com',
      'i.ytimg.com',
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
};

// export default withBotId(nextConfig); // temporarily disabled to debug 429 on static chunks
export default nextConfig;
