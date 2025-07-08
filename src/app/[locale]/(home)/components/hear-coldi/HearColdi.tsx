'use client';

import { PlayIcon } from '@/shared/ui/icons/fill/play';
import { Button, type ButtonVariants } from '@/shared/ui/kit/button';

import st from './HearColdi.module.scss';

type Preview = { videoUrl: string; name: string; text: string; btnVariant: ButtonVariants };

export const cards: Preview[] = [
  {
    videoUrl: '/videos/voices/b2b.mp4',
    name: 'B2B Services',
    text: 'Lead qualification & callback setup',
    btnVariant: 'primary',
  },
  {
    videoUrl: '/videos/voices/commerce.mp4',
    name: 'E-commerce',
    text: 'Cart recovery with objection handling',
    btnVariant: 'secondary',
  },
  {
    videoUrl: '/videos/voices/finance.mp4',
    name: 'Finance',
    text: 'Loan interest confirmation & upsell',
    btnVariant: 'success',
  },
];

export const HearColdi = () => {
  return (
    <section className={st.layout}>
      <h2>Hear Coldi in Action</h2>
      <section className={st.cards}>
        {cards.map((card) => (
          <Card key={card.name} {...card} />
        ))}
      </section>
    </section>
  );
};

const Card = ({ text, name, btnVariant, videoUrl }: Preview) => (
  <article className={st.card}>
    <video className={st.card__video} src={videoUrl} autoPlay muted loop playsInline />
    <section className={st.card__contentContainer}>
      <div className={st.card__content}>
        <h3>{name}</h3>
        <p>{text}</p>
      </div>
      <Button variant={btnVariant} fullWidth>
        <PlayIcon />
        Play
      </Button>
    </section>
  </article>
);
