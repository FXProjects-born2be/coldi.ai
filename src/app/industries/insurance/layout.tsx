import type { Metadata } from 'next';

import './layout.scss';

export const metadata: Metadata = {
  title: 'AI Insurance Agents: Voice & Claims Automation | Coldi',
  description:
    'Automate policyholder calls and claims with AI voice agents. 24/7 multilingual support with CRM integration. Streamline your operations today.',
  openGraph: {
    title: 'AI Insurance Agents: Voice & Claims Automation | Coldi',
    description:
      'Automate policyholder calls and claims with AI voice agents. 24/7 multilingual support with CRM integration. Streamline your operations today.',
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
