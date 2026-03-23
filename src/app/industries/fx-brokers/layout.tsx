import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  title: 'AI Voice Agents for FX Brokers & Trading Platforms | Coldi',
  description:
    'Instantly call new leads, reactivate dormant traders, and automate broker support with AI voice agents built for trading platforms and FX teams.',
  openGraph: {
    title: 'AI Voice Agents for FX Brokers & Trading Platforms | Coldi',
    description:
      'Instantly call new leads, reactivate dormant traders, and automate broker support with AI voice agents built for trading platforms and FX teams.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function BrokersLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
