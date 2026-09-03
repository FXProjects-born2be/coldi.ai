import Image from 'next/image';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './MeetTeamInfo.module.scss';

const storySections = [
  {
    id: 'purpose',
    reverse: false,
    illustration: '/images/meet-the-team/flow.svg',
  },
  {
    id: 'vision',
    reverse: true,
    illustration: '/images/meet-the-team/globe.svg',
  },
] as const;

export const MeetTeamInfo = async () => {
  const t = await getTranslations('MeetTeamInfo');

  return (
    <section className={st.meet_team_info}>
      <div className={cn('container', st.meet_team_info__container)}>
        {storySections.map((section) => (
          <div
            key={section.id}
            className={cn(
              st.meet_team_info__block,
              section.reverse && st.meet_team_info__block_reverse
            )}
          >
            <div className={st.meet_team_info__content}>
              <div className={st.meet_team_info__eyebrow}>
                {t(`sections.${section.id}.eyebrow`)}
              </div>
              <h2 className={st.meet_team_info__title}>{t(`sections.${section.id}.title`)}</h2>
              <p className={st.meet_team_info__desc}>{t(`sections.${section.id}.body`)}</p>
            </div>

            <div className={st.meet_team_info__visual}>
              <Image
                src={section.illustration}
                alt={t(`sections.${section.id}.title`)}
                width={464}
                height={512}
              />
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};
