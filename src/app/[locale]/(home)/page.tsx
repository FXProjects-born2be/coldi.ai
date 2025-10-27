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
      <HearColdi />
      <Delivers />
      <ColdiInNews />
      <Reviews />
      <WhatIs />
    </main>
  );
}
