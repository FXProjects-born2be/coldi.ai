import type { Metadata } from 'next';

import { Advantages, Hero, Infrustructure, Tools } from './components';
import { HomeDeferredSections } from './components/HomeDeferredSections';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main>
      <Hero />

      <Advantages />
      <Infrustructure />
      <Tools />
      <HomeDeferredSections />
    </main>
  );
}
