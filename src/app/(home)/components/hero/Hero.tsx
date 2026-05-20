import Link from 'next/link';

import { cn } from '@/shared/lib/helpers';
import { TypingText } from '@/shared/ui/components/typing-text';
import buttonStyles from '@/shared/ui/kit/button/Button.module.scss';

import st from './Hero.module.scss';

const lcpVideoPriorityProps = { fetchpriority: 'high' } as const;

export const Hero = () => {
  return (
    <section className={st.hero}>
      <section className={st.hero__content}>
        <div className={st.hero__title}>
          <h1>
            Coldi <br />
            Brand-Tuned
            <br /> <span className={st.highlighted}>AI Talkers</span>
          </h1>
          <p>Hired and Ready Before You Even Say &quot;Engage!&quot;</p>
        </div>
        <Link href="/call-request">
          <div>
            <button
              type="button"
              className={cn(
                buttonStyles.button,
                buttonStyles.primary,
                buttonStyles.md,
                buttonStyles.defaultWidth
              )}
            >
              Book a demo
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
      </section>
    </section>
  );
};
