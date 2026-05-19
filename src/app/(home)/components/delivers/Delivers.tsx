import Image from 'next/image';
import Link from 'next/link';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/helpers';
import { Counter } from '@/shared/ui/components/counter';
import { Button } from '@/shared/ui/kit/button';

import st from './Delivers.module.scss';

const cards = [
  {
    imgUrl: '/images/home/delivers/chart.svg',
    title: { start: 10, end: 72, suffix: '%' },
    text: (
      <p>
        more qualified leads
        <br /> from automated outreach
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/phone.svg',
    title: { start: 0, end: 0, suffix: '' },
    text: (
      <p>
        missed follow-ups
        <br />
        with Coldi&apos;s built-in call logic
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/counter.svg',
    title: { start: 100, end: 300, suffix: 'X' },
    text: (
      <p>
        faster lead coverage
        <br />
        compared to human agents
      </p>
    ),
  },
  {
    imgUrl: '/images/home/delivers/chart-2.svg',
    title: { start: 10, end: 80, suffix: '%' },
    text: (
      <p>
        cost reduction
        <br />
        in outbound call operations
      </p>
    ),
  },
];

export const Delivers = () => {
  return (
    <section className={st.layout}>
      <h2>
        What Coldi <br />
        <span className={st.highlight}>Delivers at Scale</span>
      </h2>
      <section className={st.cards}>
        <div>
          <Card {...cards[0]} />
        </div>
        <div>
          <Card {...cards[1]} reverse />
        </div>
        <div>
          <Card {...cards[2]} />
        </div>
        <div>
          <Card {...cards[3]} reverse />
        </div>
      </section>
      <Link href="/call-request" className={st.button}>
        <div>
          <Button size="md">Get Started with Coldi</Button>
        </div>
      </Link>
    </section>
  );
};

const Card = ({
  imgUrl,
  title,
  text,
  reverse,
}: {
  imgUrl: string;
  title: { start: number; end: number; suffix: string };
  text: ReactNode;
  reverse?: boolean;
}) => (
  <article className={cn(st.card, reverse && st.card__reverse)}>
    <Image src={imgUrl} alt={`${title.end}${title.suffix}`} width={296} height={296} />
    <div className={st.card__content}>
      <h3>
        <Counter
          start={title.start}
          end={title.end}
          suffix={title.suffix}
          duration={2}
          delay={0.5}
        />
      </h3>
      {text}
    </div>
  </article>
);
