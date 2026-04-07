'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';

import st from './TeamGrid.module.scss';

type TeamMember = {
  name: string;
  role: string;
  image: string;
  alt: string;
  linkedinUrl: string;
};

const LINKEDIN_PLACEHOLDER = 'Linkedin';

const teamMembers: TeamMember[] = [
  {
    name: 'Or Gold',
    role: 'Co - Founder',
    image: '/images/meet-the-team/or-gold.png',
    alt: 'Portrait of Or Gold',
    linkedinUrl: 'https://www.linkedin.com/in/or-g-602606119/',
  },
  {
    name: 'Ilia Ron',
    role: 'Co - Founder',
    image: '/images/meet-the-team/ilia-ron.png',
    alt: 'Portrait of Ilia Ron',
    linkedinUrl:
      'https://www.linkedin.com/in/iliaronin?utm_source=share_via&utm_content=profile&utm_medium=member_ios',
  },
  {
    name: 'Yosi Stern',
    role: 'CTO',
    image: '/images/meet-the-team/yosi-stern.png',
    alt: 'Portrait of Yosi Stern',
    linkedinUrl: 'https://www.linkedin.com/in/yosi-stern/',
  },
  {
    name: 'Hector Iglesias',
    role: 'Head of Marketing',
    image: '/images/meet-the-team/hector-iglesias.png',
    alt: 'Portrait of Hector Iglesias',
    linkedinUrl: 'https://es.linkedin.com/in/h%C3%A9ctoriglesias',
  },
  {
    name: 'Serhii Zhakhovskyi',
    role: 'Sales Manager',
    image: '/images/meet-the-team/serhii-zhakhovskyi.png',
    alt: 'Portrait of Serhii Zhakhovskyi',
    linkedinUrl: 'https://www.linkedin.com/in/serhiizhaks/',
  },
  {
    name: 'Jacob Berkun',
    role: 'BDM',
    image: '/images/meet-the-team/jacob-berkun.png',
    alt: 'Portrait of Jacob Berkun',
    linkedinUrl: 'https://www.linkedin.com/in/jacob-berkun-b5671014b/',
  },
  {
    name: 'Leeron Ben Zion',
    role: 'Sales Account Executive',
    image: '/images/meet-the-team/leeron-ben-zion.png',
    alt: 'Portrait of Leeron Ben Zion',
    linkedinUrl: 'https://www.linkedin.com/in/leeron-ben-zion',
  },
  {
    name: 'Natalia Kunytsyna',
    role: 'Customer Success Manager',
    image: '/images/meet-the-team/natalia-kunytsyna.png',
    alt: 'Portrait of Natalia Kunytsyna',
    linkedinUrl: 'https://www.linkedin.com/in/natalia-kunytsyna-15781361',
  },
  {
    name: 'Vladyslav Kachanov',
    role: 'AI Tech Specialist',
    image: '/images/meet-the-team/vladyslav-kachanov.png',
    alt: 'Portrait of Vladyslav Kachanov',
    linkedinUrl:
      'https://www.linkedin.com/in/vladyslav-kachanov-2176a2338?utm_source=share_via&utm_content=profile&utm_medium=member_android',
  },
  {
    name: 'Oleksandr Romashko',
    role: 'AI Tech Specialist',
    image: '/images/meet-the-team/oleksandr-romashko.png',
    alt: 'Portrait of Oleksandr Romashko',
    linkedinUrl: 'https://www.linkedin.com/in/oleksandr-romashko-84394723b',
  },
  {
    name: 'Ihor Zhabokrytskyi',
    role: 'Head of IT Department',
    image: '/images/meet-the-team/ihor-zhabokrytskyi.png',
    alt: 'Portrait of Ihor Zhabokrytskyi',
    linkedinUrl: 'https://www.linkedin.com/in/izhabokrytskiy/',
  },
  {
    name: 'Iryna Mykolenko',
    role: 'Operations Teamleader',
    image: '/images/meet-the-team/iryna-mykolenko.png',
    alt: 'Portrait of Iryna Mykolenko',
    linkedinUrl: '',
  },
];

function resolveLinkedinHref(value: string) {
  return value && value !== LINKEDIN_PLACEHOLDER ? value : 'https://www.linkedin.com/';
}

export const TeamGrid = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        className={st.heading}
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Meet the Team
      </motion.h2>

      <div className={st.grid}>
        {teamMembers.map((member, index) => (
          <motion.article
            key={member.name}
            className={st.card}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            custom={index * 0.05}
          >
            <div className={st.imageWrap}>
              <Image
                src={member.image}
                alt={imageAlt('meettheteam')}
                width={348}
                height={348}
                className={st.image}
                unoptimized
              />
              <Image
                src="/images/meet-the-team/team-badge.svg"
                alt=""
                width={62}
                height={22}
                className={st.badge}
                unoptimized
              />
            </div>

            <div className={st.info}>
              <div className={st.text}>
                <h2>{member.name}</h2>
                <p>{member.role}</p>
              </div>

              <Link
                href={resolveLinkedinHref(member.linkedinUrl)}
                target="_blank"
                rel="noopener noreferrer"
                title={member.linkedinUrl}
                aria-label={`${member.name} Linkedin`}
                className={st.linkedin}
              >
                <Image
                  src="/images/meet-the-team/linkedin.svg"
                  alt=""
                  width={16}
                  height={16}
                  unoptimized
                />
              </Link>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
};
