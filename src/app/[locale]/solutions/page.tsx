import { Suspense } from 'react';

import {
  SolutionsDeliver,
  SolutionsHero,
  SolutionsInfo,
  SolutionsSpecific,
  SolutionsUseCases,
} from './components';

export default function SolutionsPage() {
  return (
    <main>
      <SolutionsHero />
      <Suspense fallback={null}>
        <SolutionsInfo />
      </Suspense>
      <SolutionsDeliver />
      <SolutionsUseCases />
      <SolutionsSpecific />
    </main>
  );
}
