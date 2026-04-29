import type { Metadata } from 'next';

import { CallFormContainerNew } from './components';
import st from './page.module.scss';

export const metadata: Metadata = {
  alternates: {
    canonical: '/call-request',
  },
  title: 'Request a Call or Demo',
  description: 'Request a call today and see how Coldi’s AI agents automate your phone outreach.',
  openGraph: {
    title: 'Request a Call or Demo',
    description: 'Request a call today and see how Coldi’s AI agents automate your phone outreach.',
    images: 'https://coldi.ai/images/meta.png',
  },
};

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
