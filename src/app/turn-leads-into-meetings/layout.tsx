/**
 * Live Demo Layout
 * This layout wraps only the live-demo pages and excludes Header/Footer
 * It's a nested layout that extends the root layout
 */
import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
    googleBot: { index: false, follow: false },
  },
};

export default function LiveDemoLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <div className="layout">{children}</div>;
}
