import Image from 'next/image';

import { getNewsBySlug } from '@/features/news/news';

import { TestIt } from '../components/test-it/TestIt';
import st from './NewsPage.module.scss';

export default async function NewsPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;

  const news = await getNewsBySlug(slug);

  return (
    <>
      <section className={st.layout}>
        <div className={st.newsItemTop}>
          <Image
            src={news?.image || '/images/news/news-item-image.png'}
            alt={news?.title || ''}
            width={413}
            height={230}
          />
          <h1 className={st.title}>{news?.title}</h1>
          <div
            className={st.content}
            dangerouslySetInnerHTML={{
              __html: news?.content?.replace(/NN/g, '<br />') || '',
            }}
          />
        </div>
      </section>
      <TestIt />
    </>
  );
}
