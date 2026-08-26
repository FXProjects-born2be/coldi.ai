import Image from 'next/image';
import Link from 'next/link';

import { getTranslations } from 'next-intl/server';

import { cn } from '@/shared/lib/helpers';

import st from './HomeFeaturedOn.module.scss';

type Logo = {
  image: string;
  alt: string;
  href: string;
};

const logos: Logo[] = [
  {
    image: '/images/home/tools/logo-yahoo.svg',
    alt: 'Yahoo! Finance',
    href: 'https://finance.yahoo.com/sectors/technology/articles/coldi-unveils-turnkey-platform-integrated-120000915.html',
  },
  {
    image: '/images/home/tools/logo-morningstar.svg',
    alt: 'Morningstar',
    href: 'https://www.morningstar.com/news/pr-newswire/20260526ln67617/coldi-unveils-turnkey-platform-for-integrated-ai-voice-agents',
  },
  {
    image: '/images/home/tools/logo-benzinga.svg',
    alt: 'Benzinga',
    href: 'https://www.benzinga.com/pressreleases/26/05/n52773206/coldi-unveils-turnkey-platform-for-integrated-ai-voice-agents',
  },
  {
    image: '/images/home/tools/logo-street.svg',
    alt: 'TheStreet',
    href: 'https://prconnect.thestreet.com/article/Coldi-Unveils-Turnkey-Platform-for-Integrated-AI-Voice-Agents?storyId=6a158c1c004597ee6ba1282f',
  },
  {
    image: '/images/home/tools/logo-businesschief.svg',
    alt: 'Businesschief',
    href: 'https://businesschief.com/pr_newswire?rkey=20260526LN67617&filter=22716',
  },
  {
    image: '/images/home/tools/logo-tms.png',
    alt: 'TMC',
    href: ' https://www.tmcnet.com/usubmit/2026/05/26/10388420.htm',
  },
  {
    image: '/images/home/tools/logo-california-business-journal.svg',
    alt: 'California business journal',
    href: ' https://calbizjournal.com/latest-tech-news/?rkey=20260526LN67617&filter=26804',
  },
  {
    image: '/images/home/tools/all-tech-magazine-logo.svg',
    alt: 'Tech magazine',
    href: 'https://alltechmagazine.com/press-releases/?rkey=20260526LN67617&filter=25603 ',
  },
  {
    image: '/images/home/tools/ktla-logo.png',
    alt: 'KTLA',
    href: 'https://www.ktla.com/business/press-releases/cision/20260526LN67617/coldi-unveils-turnkey-platform-for-integrated-ai-voice-agents',
  },
];

export const HomeFeaturedOn = async () => {
  const t = await getTranslations('HomeFeaturedOn');

  return (
    <section className={st.home_featured_on}>
      <div className={cn('container', st.home_featured_on__container)}>
        <h2 className={st.home_featured_on__title}>{t('title')}</h2>
        <div className={st.home_featured_on__images}>
          <div className={st.home_featured_on__track}>
            {[...logos, ...logos].map((item, index) => {
              const isDuplicate = index >= logos.length;

              return (
                <Link
                  key={`${item.alt}-${index}`}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className={st.card}
                  aria-hidden={isDuplicate}
                  tabIndex={isDuplicate ? -1 : undefined}
                >
                  <Image
                    src={item.image}
                    alt={isDuplicate ? '' : item.alt}
                    width={160}
                    height={40}
                    loading="eager"
                    style={{ width: 'auto', height: 40 }}
                  />
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
