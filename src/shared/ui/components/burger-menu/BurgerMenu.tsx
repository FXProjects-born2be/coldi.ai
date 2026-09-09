'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';

import { Content, Description, Portal, Root, Title, Trigger } from '@radix-ui/react-dialog';
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

  useEffect(() => {
    if (!open) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.body.style.overflow = previousOverflow;
    };
  }, [open]);

  return (
    <Root open={open} onOpenChange={setOpen}>
      <Trigger asChild>
        <button aria-label={t('openMenuAria')} name="open-burger-menu" className={st.burger_menu}>
          {t('menu')}
        </button>
      </Trigger>
      <Portal>
        <Content>
          <Title />
          <Description asChild>
            <section className={st.burger_menu__content}>
              <div className={st.burger_menu__top}>
                <Link href="/" className={st.burger_menu__logo} onClick={() => setOpen(false)}>
                  <Image src="/full-logo.svg" alt="Coldi" width={93} height={32} />
                </Link>
                <button
                  type="button"
                  className={cn('btn', 'btn-secondary', st.burger_menu__close)}
                  onClick={() => setOpen(false)}
                >
                  {t('close')}
                </button>
              </div>
              <nav
                className={st.burger_menu__nav}
                itemScope
                itemType="http://schema.org/SiteNavigationElement"
              >
                <Link
                  href="/"
                  className={cn(st.burger_menu__link, pathname === '/' && st.active)}
                  itemProp="url"
                >
                  <span itemProp="name">{t('home')}</span>
                </Link>
                <Link
                  href="/solutions"
                  className={cn(st.burger_menu__link, pathname === '/solutions' && st.active)}
                  itemProp="url"
                >
                  <span itemProp="name">{t('solutions')}</span>
                </Link>
                <div className={st.burger_menu__group}>
                  <div
                    className={cn(st.burger_menu__group_trigger, {
                      [st.active]: pathname.startsWith('/industries'),
                      [st.group_open]: openIndustries,
                    })}
                  >
                    <Link href="/industries" itemProp="url">
                      <span itemProp="name">{t('industries')}</span>
                    </Link>
                    <button
                      type="button"
                      aria-label={t('toggleIndustries')}
                      aria-expanded={openIndustries}
                      name="toggle-industries-group"
                      className={st.burger_menu__group_arrow_btn}
                      onClick={() => setOpenIndustries((v) => !v)}
                    >
                      <Image
                        src="/icons/header/arrow.svg"
                        alt=""
                        width={16}
                        height={8}
                        className={st.burger_menu__group_arrow}
                      />
                    </button>
                  </div>
                  <div className={cn(st.burger_menu__group_items, openIndustries && st.open)}>
                    {headerIndustryItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          st.burger_menu__sub_item,
                          pathname === item.href && st.active
                        )}
                        itemProp="url"
                      >
                        <span itemProp="name">{t(`industryItems.${item.id}`)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  href="/pricing"
                  className={cn(st.burger_menu__link, pathname === '/pricing' && st.active)}
                  itemProp="url"
                >
                  <span itemProp="name">{t('pricing')}</span>
                </Link>
                <Link
                  href="/news"
                  className={cn(st.burger_menu__link, pathname === '/news' && st.active)}
                  itemProp="url"
                >
                  <span itemProp="name">{t('news')}</span>
                </Link>
                <Link
                  href="/helios"
                  className={cn(st.burger_menu__link, pathname === '/helios' && st.active)}
                  itemProp="url"
                >
                  <span itemProp="name">{t('useCases')}</span>
                </Link>
                <div className={st.burger_menu__group}>
                  <div
                    className={cn(st.burger_menu__group_trigger, {
                      [st.active]: pathname === '/about' || pathname.startsWith('/meet-the-team'),
                      [st.group_open]: openAbout,
                    })}
                  >
                    <Link href="/about" itemProp="url">
                      <span itemProp="name">{t('about')}</span>
                    </Link>
                    <button
                      type="button"
                      aria-label={t('toggleAbout')}
                      aria-expanded={openAbout}
                      name="toggle-about-group"
                      className={st.burger_menu__group_arrow_btn}
                      onClick={() => setOpenAbout((v) => !v)}
                    >
                      <Image
                        src="/icons/header/arrow.svg"
                        alt=""
                        width={16}
                        height={8}
                        className={st.burger_menu__group_arrow}
                      />
                    </button>
                  </div>
                  <div className={cn(st.burger_menu__group_items, openAbout && st.open)}>
                    {headerAboutItems.map((item) => (
                      <Link
                        key={item.id}
                        href={item.href}
                        className={cn(
                          st.burger_menu__sub_item,
                          pathname === item.href && st.active
                        )}
                        itemProp="url"
                      >
                        <span itemProp="name">{t(`aboutItems.${item.id}`)}</span>
                      </Link>
                    ))}
                  </div>
                </div>
                <Link
                  className={cn('btn', 'btn-primary', st.burger_menu__book)}
                  href="/calendar"
                  target="_blank"
                >
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
