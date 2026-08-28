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
      <SolutionsInfo />
      <SolutionsDeliver />
      <SolutionsUseCases />
      <SolutionsSpecific />
    </main>
  );
}
