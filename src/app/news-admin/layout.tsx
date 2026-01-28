import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'News Admin Panel',
  description: 'Admin panel for news management',
  robots: {
    index: false,
    follow: false,
    nocache: true,
    googleBot: {
      index: false,
      follow: false,
      noimageindex: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  other: {
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  },
};

export default function NewsAdminLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <meta name="robots" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="googlebot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="bingbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="slurp" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="msnbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="teoma" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="ia_archiver" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="baiduspider" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="yandex" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      <meta name="duckduckbot" content="noindex, nofollow, noarchive, nosnippet, noimageindex" />
      {children}
    </>
  );
}
