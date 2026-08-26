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

import { cn, getPageHeadingFromPath } from '@/shared/lib/helpers';

import st from './BurgerMenu.module.scss';

import { Link, usePathname } from '@/i18n/navigation';

const industriesItems = [
  {
    id: 'healthcare',
    href: '/industries/healthcare',
    icon: '/icons/header/healthcare.svg',
  },
  {
    id: 'insurance',
    href: '/industries/insurance',
    icon: '/icons/header/insurance.svg',
  },
  {
    id: 'real-estate',
    href: '/industries/real-estate',
    icon: '/icons/header/real-estate.svg',
  },
  {
    id: 'call-center',
    href: '/industries/call-center',
    icon: '/icons/header/call-center.svg',
  },
  {
    id: 'debt-collection',
    href: '/industries/debt-collection',
    icon: '/icons/header/debt-collection.svg',
  },
];

const productsItems = [
  { id: 'outbound-calling', href: '/products/outbound-calling' },
  { id: 'inbound-calling', href: '/products/inbound-calling' },
  { id: 'agent-development', href: '/products/agent-development' },
  { id: 'customer-service-agent', href: '/products/customer-service-agent' },
  { id: 'ai-for-quality-control', href: '/products/ai-for-quality-control' },
  { id: 'voip-phone-service', href: '/products/voip-phone-service' },
];

const useCasesItems = [
  { id: 'silverbell', href: '/silverbellgroup' },
  { id: 'clarity-global', href: '/clarity-global' },
  { id: 'residential-service', href: '/residential-service-automation' },
  { id: 'agro-industry', href: '/agro-industry' },
  { id: 'hvac-leads', href: '/hvac-leads' },
];

const aboutItems = [{ id: 'meet-the-team', href: '/meettheteam' }];

export const BurgerMenu = () => {
  const t = useTranslations('Header');
  const [open, setOpen] = useState(false);
  const [openProducts, setOpenProducts] = useState(false);
  const [openIndustries, setOpenIndustries] = useState(false);
  const [openAbout, setOpenAbout] = useState(false);
  const [openUseCases, setOpenUseCases] = useState(false);
  const pathname = usePathname();
  const [prevPathname, setPrevPathname] = useState(pathname);
  const pageHeading = getPageHeadingFromPath(pathname);
  const isUseCasesPath =
    pathname.startsWith('/use-cases') || useCasesItems.some((item) => item.href === pathname);

  if (pathname !== prevPathname) {
    setPrevPathname(pathname);
    setOpen(false);
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
                  href="/news"
                  className={cn({ [st.active]: pathname === '/news' })}
                  itemProp="url"
                >
                  <span itemProp="name">{t('news')}</span>
                </Link>

                <div className={st.group}>
                  <button
                    aria-label={t('toggleProducts')}
                    name="toggle-products-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: pathname.startsWith('/products'),
                      [st.groupOpen]: openProducts,
                    })}
                    onClick={() => setOpenProducts((v) => !v)}
                  >
                    <span itemProp="name">{t('products')}</span>
                    <Image
                      src="/icons/header/arrow.svg"
                      alt={pageHeading}
                      width={16}
                      height={8}
                      className={st.groupArrow}
                    />
                  </button>
                  <div
                    className={cn(st.groupItems, {
                      [st.groupItemsOpen]: openProducts,
                    })}
                  >
                    {productsItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(st.subItem, {
                          [st.active]: pathname === item.href,
                        })}
                        itemProp="url"
                      >
                        <span itemProp="name">{t(`productItems.${item.id}`)}</span>
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
                <div className={st.group}>
                  <button
                    aria-label={t('toggleAbout')}
                    name="toggle-about-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: pathname.startsWith('/about'),
                      [st.groupOpen]: openAbout,
                    })}
                    onClick={() => setOpenAbout((v) => !v)}
                  >
                    <span itemProp="name">{t('about')}</span>
                    <Image
                      src="/icons/header/arrow.svg"
                      alt={pageHeading}
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
                    {aboutItems.map((item) => (
                      <Link
                        key={item.href}
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

                <div className={st.group}>
                  <button
                    aria-label={t('toggleIndustries')}
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
                      alt={pageHeading}
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
                    {industriesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(st.subItem, {
                          [st.active]: pathname === item.href,
                        })}
                        itemProp="url"
                      >
                        <Image src={item.icon} alt={pageHeading} width={20} height={20} />
                        <span itemProp="name">{t(`industryItems.${item.id}`)}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={st.group}>
                  <button
                    aria-label={t('toggleUseCases')}
                    name="toggle-use-cases-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: isUseCasesPath,
                      [st.groupOpen]: openUseCases,
                    })}
                    onClick={() => setOpenUseCases((v) => !v)}
                  >
                    <span itemProp="name">{t('useCases')}</span>
                    <Image
                      src="/icons/header/arrow.svg"
                      alt={pageHeading}
                      width={16}
                      height={8}
                      className={st.groupArrow}
                    />
                  </button>
                  <div
                    className={cn(st.groupItems, {
                      [st.groupItemsOpen]: openUseCases,
                    })}
                  >
                    {useCasesItems.map((item) => (
                      <Link
                        key={item.href}
                        href={item.href}
                        className={cn(st.subItem, {
                          [st.active]: pathname === item.href,
                        })}
                        itemProp="url"
                      >
                        <span itemProp="name">{t(`useCaseItems.${item.id}`)}</span>
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
