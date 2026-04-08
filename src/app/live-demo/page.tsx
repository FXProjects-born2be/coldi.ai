import type { Metadata } from 'next';

import { Hero } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/live-demo',
  },
  title: 'Coldi Live',
  description: '',
  openGraph: {
    title: 'Coldi Live',
    description: '',
    images: 'https://coldi.ai/images/meta.png',
  },
};

export default function Products() {
  return (
    <main>
      <Hero />
    </main>
  );
}
