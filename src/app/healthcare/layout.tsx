import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  title: 'AI Agents for Healthcare Operations',
  description:
    'AI agents for healthcare that automate patient calls, scheduling, and support. Improve first-call resolution and scale patient communication.',
  openGraph: {
    title: 'AI Agents for Healthcare Operations',
    description:
      'AI agents for healthcare that automate patient calls, scheduling, and support. Improve first-call resolution and scale patient communication.',
    images: 'https://coldi.ai/images/meta.png',
  },
};
export default function HealthcareLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <>{children}</>;
}
