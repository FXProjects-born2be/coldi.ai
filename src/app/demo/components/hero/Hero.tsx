'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';
import { TypingText } from '@/shared/ui/components/typing-text';
import { Button } from '@/shared/ui/kit/button';

import st from './Hero.module.scss';

export const Hero = () => {
  return (
    <section className={st.hero}>
      <section className={st.hero__content}>
        <div className={st.hero__title}>
          <motion.h1
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Coldi <br />
            Brand-Tuned
            <br /> <span className={st.highlighted}>AI Talkers</span>
          </motion.h1>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Hired and Ready Before You Even Say &quot;Engage!&quot;
          </motion.p>
        </div>
        <Link href="/lead-request">
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Button size="md">Talk to Coldi</Button>
          </motion.div>
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
          src="/videos/voices/variant-1.mp4"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          controls={false}
          poster="/videos/home/hero.svg"
        />
      </section>
    </section>
  );
};
