import { Hero } from './components/Hero/Hero';

type SearchParams = Promise<{
  firstName?: string | string[];
  lastName?: string | string[];
  email?: string | string[];
  phone?: string | string[];
  industry?: string | string[];
}>;

const firstValue = (value?: string | string[]) => (Array.isArray(value) ? value[0] : value);

export default async function CalendarPage({ searchParams }: { searchParams: SearchParams }) {
  const params = await searchParams;

  return (
    <main>
      <Hero
        firstName={firstValue(params.firstName)}
        lastName={firstValue(params.lastName)}
        email={firstValue(params.email)}
        phone={firstValue(params.phone)}
        industry={firstValue(params.industry)}
      />
    </main>
  );
}
