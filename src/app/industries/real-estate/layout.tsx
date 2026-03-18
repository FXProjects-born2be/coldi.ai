import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  title: 'AI for Real Estate Agents: Leads & Showings Automated',
  description:
    'Automate real estate lead qualification, property inquiries, and showing scheduling with AI voice agents available 24/7. Never miss a buyer again.',
  openGraph: {
    title: 'AI for Real Estate Agents: Leads & Showings Automated',
    description:
      'Automate real estate lead qualification, property inquiries, and showing scheduling with AI voice agents available 24/7. Never miss a buyer again.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function RealEstateLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
