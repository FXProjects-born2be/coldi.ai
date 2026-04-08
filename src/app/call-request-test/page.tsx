import type { Metadata } from 'next';

import { CallFormContainer } from './components';
import st from './page.module.scss';

export const metadata: Metadata = {
  alternates: {
    canonical: '/call-request-test',
  },
};

export default async function CallRequest({
  searchParams,
}: {
  searchParams: Promise<{ botName?: string }>;
}) {
  const { botName } = await searchParams;

  return (
    <section className={st.layout}>
      <CallFormContainer botName={botName} />
    </section>
  );
}
