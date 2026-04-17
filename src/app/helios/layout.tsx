import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  title: 'Helios',
  description: 'Helios',

  other: {
    'X-Robots-Tag': 'noindex, nofollow, noarchive, nosnippet, noimageindex',
  },
};

export default function UseCasesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
