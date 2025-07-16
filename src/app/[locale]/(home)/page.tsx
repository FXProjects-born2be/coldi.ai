import {
  Advantages,
  ColdiInNews,
  Delivers,
  HearColdi,
  Hero,
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
      <WhatCanDo />
      <HearColdi />
      <Delivers />
      <ColdiInNews />
      <Reviews />
      <WhatIs />
    </main>
  );
}
