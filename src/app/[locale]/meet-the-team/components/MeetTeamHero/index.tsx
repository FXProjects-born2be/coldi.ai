import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';
import { LazyVideo } from '@/shared/ui/components/lazy-video';

import st from './MeetTeamHero.module.scss';

export const MeetTeamHero = async () => {
  const t = await getTranslations('MeetTeamHero');

  return (
    <section className={cn('hero-shadow', st.meet_team_hero)}>
      <div className={cn('container', st.meet_team_hero__container)}>
        <div className={st.meet_team_hero__header}>
          <h1 className={st.meet_team_hero__title}>
            <span>{t('titleEyebrow')}</span>
            <br />
            {t('title')}
          </h1>

          <p className={st.meet_team_hero__desc}>{t('description')}</p>
        </div>
      </div>
      <LazyVideo className={st.meet_team_hero__video} src="/videos/meet-the-team-hero.mp4" />
    </section>
  );
};
