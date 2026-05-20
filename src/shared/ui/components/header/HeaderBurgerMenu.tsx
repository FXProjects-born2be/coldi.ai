'use client';

import dynamic from 'next/dynamic';

const BurgerMenu = dynamic(
  () => import('@/shared/ui/components/burger-menu').then((mod) => mod.BurgerMenu),
  {
    ssr: false,
  }
);

export const HeaderBurgerMenu = () => <BurgerMenu />;
