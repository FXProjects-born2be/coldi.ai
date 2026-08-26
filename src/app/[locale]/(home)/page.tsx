import type { Metadata } from 'next';

import {
  Hero,
  HomeBuiltFor,
  HomeFeaturedOn,
  HomeHearVoice,
  HomeManaged,
  HomeTools,
  HomeWhatCanDo,
} from './components';

export const metadata: Metadata = {
  alternates: {
    canonical: '/',
  },
};

export default function Home() {
  return (
    <main>
      <Hero />
      <HomeBuiltFor />
      <HomeTools />
      <HomeWhatCanDo />
      <HomeHearVoice />
      <HomeFeaturedOn />
      <HomeManaged />
    </main>
  );
}
