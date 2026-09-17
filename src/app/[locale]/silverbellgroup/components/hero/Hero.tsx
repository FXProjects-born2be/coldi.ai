import Image from 'next/image';

import type { HeroContent } from '../data';
import { heroContent as defaultHeroContent } from '../data';
import st from './Hero.module.scss';

export const Hero = ({ content = defaultHeroContent }: { content?: HeroContent }) => (
  <section className={`hero-shadow-two ${st.section}`}>
    <div className={`container ${st.inner}`}>
      <div className={st.copy}>
        <h1 className={st.title}>
          <span
            className={st.titleAccent}
            dangerouslySetInnerHTML={{ __html: content.titleLine1 }}
          />
          <span className={st.titleRest} dangerouslySetInnerHTML={{ __html: content.titleLine2 }} />
        </h1>
        <p className={st.subtitle} dangerouslySetInnerHTML={{ __html: content.subtitle }} />
      </div>

      <div className={st.card}>
        <div className={st.images}>
          {content.images.bgImage && (
            <Image
              src={content.images.bgImage.src}
              alt="Image"
              fill
              sizes="200px"
              className={st.bgImage}
            />
          )}
          <Image
            className={st.image}
            src={content.images.image.src}
            alt="Image"
            width={content.images.image.width}
            height={content.images.image.height}
          />
        </div>

        <p className={st.periodRange}>{content.reportingRange}</p>

        <div className={st.paragraphs}>
          {content.paragraphs.map((paragraph) => (
            <p key={paragraph.slice(0, 40)}>{paragraph}</p>
          ))}
        </div>
      </div>
    </div>

    <video
      className={st.video}
      src="/videos/about-hero.mp4"
      autoPlay
      playsInline
      muted
      loop
      preload="auto"
      controls={false}
      aria-hidden
    />
  </section>
);
