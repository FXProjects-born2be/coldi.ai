'use client';

import { getVoices } from '@/features/voices/model/voices';
import { VoiceCard } from '@/features/voices/ui/voice-card';

import st from './Voices.module.scss';

export const Voices = () => {
  const items = getVoices();

  return (
    <section className={st.voices}>
      <h2>Meet the Voices Behind Coldi</h2>
      <section className={st.voices__list}>
        {items.map((item) => (
          <VoiceCard key={item.name} {...item} />
        ))}
      </section>
    </section>
  );
};
