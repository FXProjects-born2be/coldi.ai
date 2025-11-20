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
  Voices,
  VoicesList,
  WhatCanDo,
  WhatIs,
} from './components';

export default function Home() {
  return (
    <main>
      <Hero />
      <Voices />

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
