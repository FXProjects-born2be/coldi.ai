'use client';

import { Button } from '@/shared/ui/kit/button';

import st from './Hero.module.scss';

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
        <Button size="md">Receive the Call</Button>
      </section>
      <p className={st.hero__subtitle}>Welcome to Coldi!</p>
      <video
        className={st.hero__video}
        src="/videos/home/hero.mp4"
        autoPlay
        playsInline
        muted
        loop
        preload="auto"
        controls={false}
      />
      <div className={st.hero__videoMobileContainer}>
        <p className={st.hero__subtitleMobile}>Welcome to Coldi!</p>
        <video
          className={st.hero__videoMobile}
          src="/videos/home/hero.mp4"
          autoPlay
          playsInline
          muted
          loop
          preload="auto"
          controls={false}
        />
      </div>
    </section>
  );
};
