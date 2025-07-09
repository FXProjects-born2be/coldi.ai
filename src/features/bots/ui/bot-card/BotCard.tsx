'use client';

import { PlayIcon } from '@/shared/ui/icons/fill/play';
import { Button } from '@/shared/ui/kit/button';

import type { BotPreview } from '../../model/types';
import st from './BotCard.module.scss';

export const BotCard = ({ text, name, btnVariant, videoUrl }: BotPreview) => (
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
