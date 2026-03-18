import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  title: 'AI Voice Solution for more than 10 industries',
  description:
    'Explore AI voice solutions for more than 10 industries. Purpose-built agents to scale operations and handle 5,000+ minutes monthly',
  openGraph: {
    title: 'AI Voice Solution for more than 10 industries',
    description:
      'Explore AI voice solutions for more than 10 industries. Purpose-built agents to scale operations and handle 5,000+ minutes monthly',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function IndustriesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
