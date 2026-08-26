import Image from 'next/image';
import Link from 'next/link';

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
    image: '/images/home/tools/logo-newswire.svg',
    alt: 'PR Newswire',
    href: 'https://www.prnewswire.com/news-releases/coldi-unveils-turnkey-platform-for-integrated-ai-voice-agents-302781678.html',
  },
  {
    image: '/images/home/tools/logo-street.svg',
    alt: 'TheStreet',
    href: 'https://prconnect.thestreet.com/article/Coldi-Unveils-Turnkey-Platform-for-Integrated-AI-Voice-Agents?storyId=6a158c1c004597ee6ba1282f',
  },
];

export const HomeFeaturedOn = () => (
  <section className={st.home_featured_on}>
    <div className={cn('container', st.home_featured_on__container)}>
      <h2 className={st.home_featured_on__title}>Featured on</h2>
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
                  width={420}
                  height={40}
                  loading="lazy"
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
