import type { Metadata } from 'next';
import type { ReactNode } from 'react';

import '@/shared/lib/styles/null.scss';
import '@/shared/lib/styles/base.scss';

const getMetadataBase = () => {
  if (process.env.VERCEL_GIT_COMMIT_REF === 'dev') {
    return new URL('https://staging.coldi.ai');
  }

  if (process.env.VERCEL_ENV === 'production') {
    return new URL('https://coldi.ai');
  }

  return new URL('http://localhost:3000');
};

export const metadata: Metadata = {
  metadataBase: getMetadataBase(),
  verification: {
    google: 'xwxPBu6sQqKwZ2sx5fphyZV8rM-oyAvHww_SZNUXevQ',
  },
  other: {
    'facebook-domain-verification': 'mzne85ac0n2d0wka3heosu8pd81iwc',
  },
  title: {
    template: '%s | Coldi',
    default: 'Fully Managed AI Voice Agents for Fintech | Coldi AI',
  },
  description:
    'Automate customer conversations with AI voice agents built for FinTech. Handle calls, qualify leads, collect payments, and scale customer operations.',
  openGraph: {
    title: {
      template: '%s | Coldi',
      default: 'Fully Managed AI Voice Agents for Fintech | Coldi AI',
    },
    description:
      'Automate customer conversations with AI voice agents built for FinTech. Handle calls, qualify leads, collect payments, and scale customer operations.',
    images: '/images/meta.png',
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return children;
}
