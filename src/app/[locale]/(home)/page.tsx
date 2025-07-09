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
      <ColdiInNews />
      <Advantages />
      <WhatCanDo />
      <HearColdi />
      <Delivers />
      <Reviews />
      <WhatIs />
    </main>
  );
}
