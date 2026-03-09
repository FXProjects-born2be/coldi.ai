import { CallFormContainerNew } from './components';
import st from './page.module.scss';

export default async function CallRequest({
  searchParams,
}: {
  searchParams: Promise<{ botName?: string }>;
}) {
  const { botName } = await searchParams;
  console.log(botName);
  return (
    <section className={st.layout}>
      <CallFormContainerNew />
    </section>
  );
}
