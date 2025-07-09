import { CallFormContainer } from './components';
import st from './page.module.scss';

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
