import type { Metadata } from 'next';

import { Files, Hero } from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/legal',
  },
  title: 'Coldi Live',
  description: '',
  openGraph: {
    title: 'Coldi Live',
    description: '',
    images: '/images/meta.png',
  },
};

export default function Products() {
  return (
    <main>
      <Hero />
      <Files />
    </main>
  );
}
