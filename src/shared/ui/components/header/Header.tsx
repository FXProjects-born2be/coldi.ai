'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import { cn } from '@/shared/lib/helpers/styles';
import { BurgerMenu } from '@/shared/ui/components/burger-menu';

import st from './Header.module.scss';

const headerVisibilityOnScrollHandle = (set: (visible: boolean) => void) => {
  const scrollY = window.scrollY;
  set(scrollY > 0);
};

export const Header = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => headerVisibilityOnScrollHandle(setVisible);

    window.addEventListener('scroll', onScroll, {
      passive: true,
    });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <header className={cn(st.header, { [st.visible]: visible })}>
      <div className={st.header__container}>
        <Image src="/full-logo.svg" alt="logo" width={145} height={50} />
        <Navigation visible={false} />
        <BurgerMenu />
      </div>
    </header>
  );
};

const Navigation = ({ visible }: { visible: boolean }) => {
  return (
    <ul className={cn(st.header__navigation, { [st.header__navigation_visible]: visible })}>
      <li>Home</li>
      <li>News Page</li>
      <li>Product Page</li>
      <li>About Page</li>
      <li>Pricing Page</li>
    </ul>
  );
};
