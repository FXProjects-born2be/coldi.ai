'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';
import { TypingText } from '@/shared/ui/components/typing-text';
import buttonStyles from '@/shared/ui/kit/button/Button.module.scss';

import st from './Hero.module.scss';

const lcpVideoPriorityProps = { fetchPriority: 'high' } as const;
const MOBILE_BREAKPOINT = 768;

export const Hero = () => {
  const [isMobile, setIsMobile] = useState<boolean | null>(null);

  useEffect(() => {
    const syncViewport = () => {
      setIsMobile(window.innerWidth <= MOBILE_BREAKPOINT);
    };

    syncViewport();
    window.addEventListener('resize', syncViewport);

    return () => window.removeEventListener('resize', syncViewport);
  }, []);

  return (
    <section className={st.hero}>
      <section className={st.hero__content}>
        <div className={st.hero__title}>
          <h1>
            Never Miss Another <br />
            <span className={st.highlighted}>
              {' '}
              Lead, Call, or
              <br /> Opportunity
            </span>
          </h1>
          <p>
            <b>AI Voice Agents for Inbound Calls, Outreach, and Customer Support.</b>
            <br />
            Get 72% more qualified leads.
          </p>
        </div>
        <Link href="/products">
          <div>
            <button
              aria-label="Explore"
              name="book-demo"
              type="button"
              className={cn(
                buttonStyles.button,
                buttonStyles.primary,
                buttonStyles.md,
                buttonStyles.defaultWidth
              )}
            >
              Explore
            </button>
          </div>
        </Link>
      </section>
      <section className={st.hero__video}>
        <TypingText
          text={[
            'Hi!',
            'Welcome to Coldi!',
            'I can be your first AI employee.',
            'Would you like to test me?',
            '¡Hola!',
            'Bienvenido a Coldi.',
            'Puedo ser tu primer empleado de IA.',
            '¿Te gustaría probarme?',
            'Salut!',
            'Bienvenue chez Coldi.',
            'Je peux être votre premier employé IA.',
            'Vous voulez me tester?',
            'Hallo!',
            'Willkommen bei Coldi.',
            'Ich kann Ihr erster KI-Mitarbeiter sein.',
            'Möchten Sie mich ausprobieren?',
            'Ciao!',
            'Benvenuto su Coldi.',
            'Posso essere il tuo primo dipendente IA.',
            'Vuoi mettermi alla prova?',
          ]}
          speed={150}
          delay={500}
          className={st.hero__subtitle}
        />
        {isMobile !== false ? (
          <Image
            className={st.hero__poster}
            src="/videos/home/hero.svg"
            alt=""
            width={720}
            height={720}
            sizes="100vw"
            priority
          />
        ) : (
          <video
            {...lcpVideoPriorityProps}
            src="/videos/voices/variant-1.mp4"
            autoPlay
            playsInline
            muted
            loop
            preload="metadata"
            controls={false}
            poster="/videos/home/hero.svg"
          />
        )}
      </section>
    </section>
  );
};
