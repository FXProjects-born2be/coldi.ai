'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';

import { useTranslations } from 'next-intl';

import { cn, getPageHeadingFromPath } from '@/shared/lib/helpers';
import { HeaderBurgerMenu } from '@/shared/ui/components/header/HeaderBurgerMenu';
import { headerAboutItems, headerIndustryItems } from '@/shared/ui/components/header/nav';

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
        <Navigation pathname={pathname} />

        <Link className={cn(st.header__bookMeeting, 'btn-primary')} href="/calendar">
          {t('scheduleMeeting')}
        </Link>

        <HeaderBurgerMenu />
      </div>
    </header>
  );
};

const Navigation = ({ pathname }: { pathname: string }) => {
  const t = useTranslations('Header');

  return (
    <ul
      className={st.header__navigation}
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <li className={cn({ [st.active]: pathname === '/' })} itemProp="name">
        <Link className={st.navLink} href="/" itemProp="url">
          {t('home')}
        </Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/solutions' })} itemProp="name">
        <Link className={st.navLink} href="/solutions" itemProp="url">
          {t('solutions')}
        </Link>
      </li>
      <li
        className={cn(st.hasDropdown, {
          [st.active]: pathname.startsWith('/industries'),
        })}
        itemProp="name"
      >
        <Link className={st.navTrigger} href="/industries" itemProp="url">
          <span>{t('industries')}</span>
          <span className={st.dropdownArrow}>
            <Image src="/icons/header/arrow.svg" alt="" width={16} height={8} />
          </span>
        </Link>
        <ul className={st.dropdown}>
          {headerIndustryItems.map((item) => (
            <li key={item.id} itemProp="name">
              <Link className={st.dropdownLink} href={item.href} itemProp="url">
                {t(`industryItems.${item.id}`)}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li className={cn({ [st.active]: pathname === '/pricing' })} itemProp="name">
        <Link className={st.navLink} href="/pricing" itemProp="url">
          {t('pricing')}
        </Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/news' })} itemProp="name">
        <Link className={st.navLink} href="/news" itemProp="url">
          {t('news')}
        </Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/helios' })} itemProp="name">
        <Link className={st.navLink} href="/helios" itemProp="url">
          {t('useCases')}
        </Link>
      </li>
      <li
        className={cn(st.hasDropdown, {
          [st.active]: pathname === '/about' || pathname.startsWith('/meet-the-team'),
        })}
        itemProp="name"
      >
        <Link className={st.navTrigger} href="/about" itemProp="url">
          <span>{t('about')}</span>
          <span className={st.dropdownArrow}>
            <Image src="/icons/header/arrow.svg" alt="" width={16} height={8} />
          </span>
        </Link>
        <ul className={st.dropdown}>
          {headerAboutItems.map((item) => (
            <li key={item.id} itemProp="name">
              <Link className={st.dropdownLink} href={item.href} itemProp="url">
                {t(`aboutItems.${item.id}`)}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};
