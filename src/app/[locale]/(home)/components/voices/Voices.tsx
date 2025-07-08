'use client';

import Image from 'next/image';

import { Button } from '@/shared/ui/kit/button';
import { Chip } from '@/shared/ui/kit/chip';

import st from './Voices.module.scss';

const items = [
  {
    imgUrl: '/images/home/voices/sana.jpg',
    name: 'Sana',
    description:
      'Confident and persuasive communicator who builds trust quickly, blending clarity with warmth to guide prospects toward decisions without pressure.',
    features: [
      'Warm',
      'Persuasive',
      'American',
      'Sales Rep',
      'Business-oriented',
      'Conversational',
      'Young Adult',
    ],
  },
  {
    imgUrl: '/images/home/voices/james.jpg',
    name: 'James',
    description:
      'Calm, authoritative voice who speaks with precision and composure—ideal for guiding complex conversations and reassuring even the most hesitant prospects.',
    features: [
      'Calming',
      'British (RP)',
      'Legal Advisor',
      'Senior-ready',
      'Slow & Clear',
      'Analytical',
      'Mature Adult',
    ],
  },
  {
    imgUrl: '/images/home/voices/victoria.jpg',
    name: 'Victoria',
    description:
      'Confident, upbeat communicator who blends clarity with charm—perfect for energizing leads, maintaining engagement, and driving conversations toward action.',
    features: [
      'Energetic',
      'Friendly',
      'American',
      'AI Assistant',
      'Youth-focused',
      'Motivational',
      'Young Adult',
    ],
  },
];

export const Voices = () => {
  return (
    <section className={st.voices}>
      <h2>Meet the Voices Behind Coldi</h2>
      <section className={st.voices__list}>
        {items.map((item) => (
          <Card key={item.name} {...item} />
        ))}
      </section>
    </section>
  );
};

const Card = ({
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
  <article className={st.voices__cardContainer}>
    <Image src={imgUrl} alt={name} width={509} height={484} unoptimized />
    <section className={st.voices__card}>
      <div className={st.voices__cardContent}>
        <h3>{name}</h3>
        <p>{description}</p>
        <h4>Voice Features:</h4>
        <section className={st.voices__features}>
          {features.map((feature) => (
            <Chip key={feature}>{feature}</Chip>
          ))}
        </section>
      </div>
      <Button fullWidth>Receive the Call</Button>
    </section>
  </article>
);
