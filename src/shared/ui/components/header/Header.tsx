'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn, getPageHeadingFromPath } from '@/shared/lib/helpers';
import { HeaderBurgerMenu } from '@/shared/ui/components/header/HeaderBurgerMenu';

import st from './Header.module.scss';

import { Link, usePathname } from '@/i18n/navigation';

export const Header = ({ pathname: pathnameProp }: { pathname: string }) => {
  const t = useTranslations('Header');
  const pathname = usePathname() || pathnameProp;
  const pageHeading = getPageHeadingFromPath(pathname);
  const headerRef = useRef<HTMLElement>(null);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const header = headerRef.current;

    if (!header) return;

    const update = () => {
      setScrolled(window.scrollY > header.offsetHeight);
    };

    update();
    window.addEventListener('scroll', update, { passive: true });

    return () => window.removeEventListener('scroll', update);
  }, []);

  return (
    <header ref={headerRef} className={cn(st.header, scrolled && st.scrolled)}>
      <div className={cn(st.header__container, 'container')}>
        <Link href="/">
          <Image
            className={st.header__logo}
            src="/full-logo.svg"
            alt={pageHeading}
            width={93}
            height={32}
          />
        </Link>
        <Navigation pathname={pathname} homeLabel={t('home')} newsLabel={t('news')} />

        <Link className={cn(st.header__bookMeeting, 'btn-primary')} href="/calendar">
          {t('scheduleMeeting')}
        </Link>

        <HeaderBurgerMenu />
      </div>
    </header>
  );
};

const Navigation = ({
  pathname,
  homeLabel,
  newsLabel,
}: {
  pathname: string;
  homeLabel: string;
  newsLabel: string;
}) => {
  return (
    <ul
      className={st.header__navigation}
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <li className={cn({ [st.active]: pathname === '/' })} itemProp="name">
        <Link className={st.navLink} href="/" itemProp="url" prefetch={false}>
          {homeLabel}
        </Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/news' })} itemProp="name">
        <Link className={st.navLink} href="/news" itemProp="url" prefetch={false}>
          {newsLabel}
        </Link>
      </li>
    </ul>
  );
};
