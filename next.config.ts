import type { NextConfig } from 'next';
import createNextIntlPlugin from 'next-intl/plugin';
import path from 'node:path';

const withNextIntl = createNextIntlPlugin();

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
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '3000',
        pathname: '/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'grqtgrzdalvrywluyqxe.supabase.co',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.facebook.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'dashboard.retellai.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'cdn-b.saashub.com',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'i.ytimg.com',
        pathname: '/**',
      },
    ],
  },
  turbopack: {
    resolveAlias: {
      'next-intl/config': './src/i18n/request.ts',
    },
  },
  webpack(config) {
    config.resolve = config.resolve ?? {};
    config.resolve.alias = {
      ...config.resolve.alias,
      'next-intl/config': path.resolve(process.cwd(), 'src/i18n/request.ts'),
    };
    return config;
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      { source: '/agents', destination: '/solutions', permanent: true },
      { source: '/uk/agents', destination: '/uk/solutions', permanent: true },
    ];
  },
};

// export default withBotId(nextConfig); // temporarily disabled to debug 429 on static chunks
export default withNextIntl(nextConfig);
