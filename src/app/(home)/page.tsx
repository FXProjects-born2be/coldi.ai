import type { Metadata } from 'next';

import { DashboardSlider } from '@/shared/ui/components/dashboard-slider/DashboardSlider';

import {
  Advantages,
  ColdiInNews,
  Delivers,
  HearColdi,
  Hero,
  Infrustructure,
  Reviews,
  Tools,
  VoicesList,
  WhatCanDo,
  WhatIs,
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

      <Advantages />
      <Infrustructure />
      <Tools />
      <VoicesList />
      <WhatCanDo />
      <DashboardSlider
        title="<span>Easily Track</span> How Coldi Works"
        subtitle="See all results in one place: review calls, compare performance, <br/>and optimize your campaigns with clear, real-time data."
      />
      <HearColdi />
      <Delivers />
      <ColdiInNews />
      <Reviews />
      <WhatIs />
    </main>
  );
}
