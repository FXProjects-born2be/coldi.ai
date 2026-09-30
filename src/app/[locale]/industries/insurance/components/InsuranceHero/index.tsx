import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { BookDemo } from '@/shared/ui/components/book-demo';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './InsuranceHero.module.scss';

type InsuranceHeroProps = {
  title?: string;
  titleAccent?: string;
  description?: string;
  video?: string;
  image?: string;
};

export const InsuranceHero = async ({
  title,
  titleAccent,
  description,
  video = '/videos/insurance-hero.mp4',
  image,
}: InsuranceHeroProps) => {
  const t = await getTranslations('InsuranceHero');

  return (
    <section className={st.insurance_hero}>
      <div className={cn('container', st.insurance_hero__container)}>
        <h1 className={st.insurance_hero__title}>
          {title ?? t('title')}
          <br />
          <span>{titleAccent ?? t('titleAccent')}</span>
        </h1>

        <p className={st.insurance_hero__desc}>{description ?? t('description')}</p>

        <BookDemo />
      </div>
      {image ? (
        <Image
          className={st.insurance_hero__image}
          src={image}
          alt=""
          fill
          sizes="100vw"
          aria-hidden
        />
      ) : (
        <LazyVideo className={st.insurance_hero__video} src={video} />
      )}
    </section>
  );
};
