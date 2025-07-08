'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

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
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (window.innerWidth < 768) {
      setVisible(true);
    }

    const onScroll = () => headerVisibilityOnScrollHandle(setVisible);

    window.addEventListener('scroll', onScroll, { passive: true });

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <header className={cn(st.header, { [st.visible]: visible })}>
      <div className={st.header__container}>
        <Image src="/full-logo.svg" alt="logo" width={145} height={50} />
        <Navigation />
        <BurgerMenu />
      </div>
    </header>
  );
};

const Navigation = () => {
  return (
    <ul className={st.header__navigation}>
      <li>Home</li>
      <li>News Page</li>
      <li>Product Page</li>
      <li>About Page</li>
      <li>Pricing Page</li>
    </ul>
  );
};
