import Image from 'next/image';
import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { cn } from '@/shared/lib/helpers';

import st from './MeetTeamGrid.module.scss';

const LINKEDIN_PLACEHOLDER = 'Linkedin';

const teamMembers = [
  {
    id: 'or-gold',
    name: 'Or Gold',
    image: '/images/meet-the-team/or-gold.png',
    linkedinUrl: 'https://www.linkedin.com/in/or-g-602606119/',
  },
  {
    id: 'ilia-ron',
    name: 'Ilia Ron',
    image: '/images/meet-the-team/ilia-ron.png',
    linkedinUrl:
      'https://www.linkedin.com/in/iliaronin?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    id: 'yosi-stern',
    name: 'Yosi Stern',
    image: '/images/meet-the-team/yosi-stern.png',
    linkedinUrl: 'https://www.linkedin.com/in/yosi-stern/',
  },
  {
    id: 'serhii-zhakhovskyi',
    name: 'Serhii Zhakhovskyi',
    image: '/images/meet-the-team/serhii-zhakhovskyi.png',
    linkedinUrl: 'https://www.linkedin.com/in/serhiizhaks/',
  },
  {
    id: 'jacob-berkun',
    name: 'Jacob Berkun',
    image: '/images/meet-the-team/jacob-berkun.png',
    linkedinUrl: 'https://www.linkedin.com/in/jacob-berkun-b5671014b/',
  },
  {
    id: 'leeron-ben-zion',
    name: 'Leeron Ben Zion',
    image: '/images/meet-the-team/leeron-ben-zion.png',
    linkedinUrl: 'https://www.linkedin.com/in/leeron-ben-zion',
  },
  {
    id: 'natalia-kunytsyna',
    name: 'Natalia Kunytsyna',
    image: '/images/meet-the-team/natalia-kunytsyna.png',
    linkedinUrl: 'https://www.linkedin.com/in/natalia-kunytsyna-15781361',
  },
  {
    id: 'vladyslav-kachanov',
    name: 'Vladyslav Kachanov',
    image: '/images/meet-the-team/vladyslav-kachanov.png',
    linkedinUrl:
      'https://www.linkedin.com/in/vladyslav-kachanov-2176a2338?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    id: 'oleksandr-romashko',
    name: 'Oleksandr Romashko',
    image: '/images/meet-the-team/oleksandr-romashko.png',
    linkedinUrl: 'https://www.linkedin.com/in/oleksandr-romashko-84394723b',
  },
  {
    id: 'ihor-zhabokrytskyi',
    name: 'Ihor Zhabokrytskyi',
    image: '/images/meet-the-team/ihor-zhabokrytskyi.png',
    linkedinUrl: 'https://www.linkedin.com/in/izhabokrytskiy/',
  },
  {
    id: 'iryna-mykolenko',
    name: 'Iryna Mykolenko',
    image: '/images/meet-the-team/iryna-mykolenko.png',
    linkedinUrl: '',
  },
  {
    id: 'alina-denysenko',
    name: 'Alina Denysenko',
    image: '/images/meet-the-team/alina-denysenko.png',
    linkedinUrl: 'https://www.linkedin.com/in/alina-d-20ab1a401/',
  },
  {
    id: 'thomas-angelo',
    name: 'Thomas Angelo',
    image: '/images/meet-the-team/thomas-angelo.png',
    linkedinUrl: '',
  },
] as const;

function resolveLinkedinHref(value: string) {
  return value && value !== LINKEDIN_PLACEHOLDER ? value : 'https://www.linkedin.com/';
}

export const MeetTeamGrid = async () => {
  const t = await getTranslations('MeetTeamGrid');

  return (
    <section className={st.meet_team_grid}>
      <div className={cn('container', st.meet_team_grid__container)}>
        <h2 className={st.meet_team_grid__title}>{t('title')}</h2>

        <div className={st.meet_team_grid__list}>
          {teamMembers.map((member) => (
            <article key={member.id} className={st.meet_team_grid__card}>
              <div className={st.meet_team_grid__photo}>
                <Image
                  src={member.image}
                  alt={imageAlt('meettheteam')}
                  width={348}
                  height={348}
                  className={st.meet_team_grid__img}
                  unoptimized
                />
                <Image
                  src="/images/meet-the-team/team-badge.svg"
                  alt={imageAlt('meettheteam')}
                  width={62}
                  height={22}
                  className={st.meet_team_grid__badge}
                  unoptimized
                />
              </div>

              <div className={st.meet_team_grid__info}>
                <div className={st.meet_team_grid__text}>
                  <h3 className={st.meet_team_grid__name}>{member.name}</h3>
                  <p className={st.meet_team_grid__role}>{t(`roles.${member.id}`)}</p>
                </div>

                <Link
                  href={resolveLinkedinHref(member.linkedinUrl)}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={member.linkedinUrl}
                  aria-label={t('linkedinAria', { name: member.name })}
                  className={st.meet_team_grid__linkedin}
                >
                  <Image
                    src="/images/meet-the-team/linkedin.svg"
                    alt={imageAlt('meettheteam')}
                    width={16}
                    height={16}
                    unoptimized
                  />
                </Link>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
};
