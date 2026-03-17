import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  title: 'AI Insurance Agents | AI Voice Agents for Insurance',
  description:
    'AI-powered calling agents built for insurance operations. Answer more policyholder calls, streamline claims communication, and deliver faster support with AI voice agents.',
  openGraph: {
    title: 'AI Insurance Agents | AI Voice Agents for Insurance',
    description:
      'AI-powered calling agents built for insurance operations. Answer more policyholder calls, streamline claims communication, and deliver faster support with AI voice agents.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function InsuranceAgentsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
