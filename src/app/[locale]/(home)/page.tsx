import {
  Advantages,
  ColdiInNews,
  Delivers,
  HearColdi,
  Hero,
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
      <WhatIs />
    </main>
  );
}
