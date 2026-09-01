'use client';

import { useState } from 'react';
import Image from 'next/image';

import {
  Content,
  Description,
  Overlay,
  Portal,
  Root,
  Title,
  Trigger,
} from '@radix-ui/react-dialog';
import { useTranslations } from 'next-intl';

import { cn } from '@/shared/lib/helpers';
import { headerAboutItems, headerIndustryItems } from '@/shared/ui/components/header/nav';

import st from './BurgerMenu.module.scss';

import { Link, usePathname } from '@/i18n/navigation';

export const BurgerMenu = () => {
  const t = useTranslations('Header');
  const [open, setOpen] = useState(false);
  const [openIndustries, setOpenIndustries] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
    setOpenIndustries(false);
    setOpenAbout(false);
  }

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <button aria-label={t('openMenuAria')} name="open-burger-menu" className={st.burger}>
          {t('menu')}
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
                  <span itemProp="name">{t('home')}</span>
                </Link>
                <Link
                  href="/solutions"
                  className={cn({ [st.active]: pathname === '/solutions' })}
                  itemProp="url"
                >
                  <span itemProp="name">{t('solutions')}</span>
                </Link>
                <div className={st.group}>
                  <button
                    aria-label={t('toggleIndustries')}
                    aria-expanded={openIndustries}
                    name="toggle-industries-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: pathname.startsWith('/industries'),
                      [st.groupOpen]: openIndustries,
                    })}
                    onClick={() => setOpenIndustries((v) => !v)}
                  >
                    <span itemProp="name">{t('industries')}</span>
                    <Image
                      src="/icons/header/arrow.svg"
                      alt=""
                      width={16}
                      height={8}
                      className={st.groupArrow}
                    />
                  </button>
                  <div
                    className={cn(st.groupItems, {
                      [st.groupItemsOpen]: openIndustries,
                    })}
                  >
                    {headerIndustryItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(st.subItem, {
                          [st.active]: pathname === item.href,
                        })}
                        itemProp="url"
                      >
                        <span itemProp="name">{t(`industryItems.${item.id}`)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className={cn({ [st.active]: pathname === '/pricing' })}
                  itemProp="url"
                >
                  <span itemProp="name">{t('pricing')}</span>
                </Link>
                <Link
                  href="/news"
                  className={cn({ [st.active]: pathname === '/news' })}
                  itemProp="url"
                >
                  <span itemProp="name">{t('news')}</span>
                </Link>
                <Link
                  href="/helios"
                  className={cn({ [st.active]: pathname === '/helios' })}
                  itemProp="url"
                >
                  <span itemProp="name">{t('useCases')}</span>
                </Link>
                <div className={st.group}>
                  <button
                    aria-label={t('toggleAbout')}
                    aria-expanded={openAbout}
                    name="toggle-about-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: pathname === '/about' || pathname.startsWith('/meettheteam'),
                      [st.groupOpen]: openAbout,
                    })}
                    onClick={() => setOpenAbout((v) => !v)}
                  >
                    <span itemProp="name">{t('about')}</span>
                    <Image
                      src="/icons/header/arrow.svg"
                      alt=""
                      width={16}
                      height={8}
                      className={st.groupArrow}
                    />
                  </button>
                  <div
                    className={cn(st.groupItems, {
                      [st.groupItemsOpen]: openAbout,
                    })}
                  >
                    {headerAboutItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(st.subItem, {
                          [st.active]: pathname === item.href,
                        })}
                        itemProp="url"
                      >
                        <span itemProp="name">{t(`aboutItems.${item.id}`)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link className={st.bookMeeting} href="/calendar" target="_blank">
                  {t('scheduleMeeting')}
                </Link>
              </nav>
            </section>
          </Description>
        </Content>
      </Portal>
    </Root>
  );
};
