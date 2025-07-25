import {
  Advantages,
  ColdiInNews,
  Delivers,
  HearColdi,
  Hero,
  Infrustructure,
  Reviews,
  Voices,
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
      <WhatCanDo />
      <HearColdi />
      <Delivers />
      <ColdiInNews />
      <Reviews />
      <WhatIs />
    </main>
  );
}
