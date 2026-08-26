'use client';

import { getPersonas } from '@/features/personas/model/personas';
import { PersonaCard } from '@/features/personas/ui/persona-card';

import st from './VoicesList.module.scss';

export const VoicesList = () => {
  const items = getPersonas();
  return (
    <section className={st.layout}>
      <section className={st.voicesList}>
        {items.map((item) => (
          <PersonaCard key={item.name} persona={item} />
        ))}
      </section>
    </section>
  );
};
