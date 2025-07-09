'use client';

import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/shared/ui/kit/button';
import { Chip } from '@/shared/ui/kit/chip';

import st from './VoiceCard.module.scss';

export const VoiceCard = ({
  name,
  description,
  features,
  imgUrl,
}: {
  name: string;
  description: string;
  features: string[];
  imgUrl: string;
}) => (
  <article className={st.container}>
    <Image src={imgUrl} alt={name} width={509} height={484} unoptimized />
    <section className={st.container__card}>
      <div className={st.container__cardContent}>
        <h3>{name}</h3>
        <p>{description}</p>
        <h4>Voice Features:</h4>
        <section className={st.container__features}>
          {features.map((feature) => (
            <Chip key={feature}>{feature}</Chip>
          ))}
        </section>
      </div>
      <Link href={`/call-request?botName=${name}`}>
        <Button fullWidth>Receive the Call</Button>
      </Link>
    </section>
  </article>
);
