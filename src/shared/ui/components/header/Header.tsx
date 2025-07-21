'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { requestRoutes } from '@/shared/lib/helpers/request-routes';
import { cn } from '@/shared/lib/helpers/styles';
import { BurgerMenu } from '@/shared/ui/components/burger-menu';

import st from './Header.module.scss';

const headerVisibilityOnScrollHandle = (set: (visible: boolean) => void) => {
  const scrollY = window.scrollY;
  set(scrollY > 0);

  if (window.innerWidth < 768) {
    set(true);
  }
};

export const Header = () => {
  const pathname = usePathname();
  const isForcedVisible = requestRoutes.has(pathname);

  const [visible, setVisible] = useState(isForcedVisible ? true : false);

  useEffect(() => {
    if (isForcedVisible) return;

    if (window.innerWidth < 768) {
      setVisible(true);
    }

    const onScroll = () => headerVisibilityOnScrollHandle(setVisible);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, [isForcedVisible]);

  return (
    <header className={cn(st.header, { [st.visible]: visible })}>
      <div className={st.header__container}>
        <Link href="/">
          <Image src="/full-logo.svg" alt="logo" width={145} height={50} />
        </Link>
        <Navigation />
        <BurgerMenu />
      </div>
    </header>
  );
};

const Navigation = () => {
  const pathname = usePathname();

  return (
    <ul className={st.header__navigation}>
      <li className={cn({ [st.active]: pathname === '/' })}>
        <Link href="/">Home</Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/news' })}>
        <Link href="/news">News</Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/products' })}>
        <Link href="/products">Products</Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/pricing' })}>
        <Link href="/pricing">Pricing</Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/about' })}>
        <Link href="/about">About</Link>
      </li>
    </ul>
  );
};
