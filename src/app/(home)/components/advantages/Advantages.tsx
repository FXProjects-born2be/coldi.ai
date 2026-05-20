import Image from 'next/image';

import { cn } from '@/shared/lib/helpers';
import chipStyles from '@/shared/ui/kit/chip/Chip.module.scss';

import st from './Advantages.module.scss';

const cards = [
  {
    imgUrl: '/images/home/advtg/advtg1.svg',
    name: 'Tailored Voice Agents',
    text: 'Trained on your tone, tasks, and real business scenarios – not generic templates.',
  },
  {
    imgUrl: '/images/home/advtg/advtg2.svg',
    name: 'Hands-On Integration',
    text: 'We connect Coldi across your stack and channels. You don&apos;t lift a finger.',
  },
  {
    imgUrl: '/images/home/advtg/advtg3.svg',
    name: 'End-to-End Campaign Setup',
    text: 'We build, test, and adjust each scenario – until it performs.',
  },
  {
    imgUrl: '/images/home/advtg/advtg4.svg',
    name: 'Ongoing Optimization',
    text: 'We monitor, measure, and refine – so Coldi keeps delivering.',
  },
];

export const Advantages = () => {
  return (
    <section className={st.layout}>
      <header className={st.header}>
        <section className={st.title}>
          <div className={st.chipContainer}>
            <div className={st.arrowRight}>
              <span className={st.line} />
              <span className={st.dot} />
            </div>
            <div className={st.chip}>
              <span className={cn(chipStyles.chip, chipStyles.secondary)}>
                Stop struggling with AI setup
              </span>
            </div>
            <div className={st.arrowLeft}>
              <span className={st.line} />
              <span className={st.dot} />
            </div>
          </div>
          <h2>Coldi handles the heavy lifting.</h2>
        </section>
        <p className={st.desc}>
          A fully managed, done-for-you solution. From custom voice selection to deep API
          integration, every detail is built and synced to ensure your AI voice agent works
          seamlessly within your business from day one
        </p>
        <p className={st.subtitle}>The Advantages of Implementation</p>
      </header>

      <div className={st.image}>
        <Image
          src="/images/home/adv.svg"
          className={st.desktop}
          alt="Advantages"
          width={1672}
          height={500}
          quality={100}
        />
        <Image
          src="/images/home/advMob.svg"
          className={st.mobile}
          alt="Advantages"
          width={1672}
          height={500}
          quality={100}
        />
      </div>

      <section className={st.cards}>
        {cards.map((card, index) => (
          <div key={index}>
            <Card {...card} />
          </div>
        ))}
      </section>
    </section>
  );
};

const Card = ({ imgUrl, name, text }: { imgUrl: string; name: string; text: string }) => (
  <article
    className={st.cardLayout}
    style={{
      background: `linear-gradient(180deg, rgba(255, 255, 255, 0.00) 0%, #FFF 82.21%), url(${imgUrl}) lightgray 50% / cover no-repeat`,
    }}
  >
    <section className={st.card}>
      <h3>{name}</h3>
      <p>{text}</p>
    </section>
  </article>
);
