'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import {
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';

import { cn } from '@/shared/lib/helpers/styles';

import st from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
  const [open, setOpen] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <button className={st.burger}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
          >
            <path
              d="M3 6H21M3 12H21M3 18H21"
              stroke="#0C1021"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      </Trigger>
      <Portal>
        <Overlay className={st.overlay} />
        <Content>
          <Title />
          <Description asChild>
            <section className={cn(st.content, { [st.open]: open })}>
              <nav className={st.nav} itemScope itemType="http://schema.org/SiteNavigationElement">
                <Link href="/" className={cn({ [st.active]: pathname === '/' })} itemProp="url">
                  <span itemProp="name">Home</span>
                </Link>
                <Link
                  href="/news"
                  className={cn({ [st.active]: pathname === '/news' })}
                  itemProp="url"
                >
                  <span itemProp="name">News</span>
                </Link>
                <Link
                  href="/products"
                  className={cn({ [st.active]: pathname === '/product' })}
                  itemProp="url"
                >
                  <span itemProp="name">Products</span>
                </Link>
                <Link
                  href="/about"
                  className={cn({ [st.active]: pathname === '/about' })}
                  itemProp="url"
                >
                  <span itemProp="name">About</span>
                </Link>
                <Link
                  href="/pricing"
                  className={cn({ [st.active]: pathname === '/pricing' })}
                  itemProp="url"
                >
                  <span itemProp="name">Pricing</span>
                </Link>
              </nav>
            </section>
          </Description>
        </Content>
      </Portal>
    </Root>
  );
};
