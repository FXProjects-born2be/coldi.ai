import st from './page.module.scss';

export default async function CallRequest({
  searchParams,
}: {
  searchParams: Promise<{ botName?: string }>;
}) {
  return <section className={st.layout}>{(await searchParams).botName}</section>;
}
