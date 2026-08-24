'use client';

import { useState } from 'react';
import Image from 'next/image';
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

import { cn, getPageHeadingFromPath } from '@/shared/lib/helpers';

import st from './BurgerMenu.module.scss';

const industriesItems = [
  {
    label: 'Healthcare',
    href: '/industries/healthcare',
    icon: '/icons/header/healthcare.svg',
  },
  {
    label: 'Insurance Agents',
    href: '/industries/insurance',
    icon: '/icons/header/insurance.svg',
  },
  {
    label: 'Real Estate',
    href: '/industries/real-estate',
    icon: '/icons/header/real-estate.svg',
  },
  {
    label: 'Call Center',
    href: '/industries/call-center',
    icon: '/icons/header/call-center.svg',
  },
  {
    label: 'Debt Collection',
    href: '/industries/debt-collection',
    icon: '/icons/header/debt-collection.svg',
  },
];

const productsItems = [
  { label: 'Outbound Calling', href: '/products/outbound-calling' },
  { label: 'Inbound Calling', href: '/products/inbound-calling' },
  { label: 'AI Agent Development', href: '/products/agent-development' },
  { label: 'AI Customer Service', href: '/products/customer-service-agent' },
  { label: 'AI for Quality Control', href: '/products/ai-for-quality-control' },
  { label: 'VoIP Phone Service', href: '/products/voip-phone-service' },
];

const useCasesItems = [
  { label: 'BPO (Silverbell Group)', href: '/silverbellgroup' },
  { label: 'Clarity Global', href: '/clarity-global' },
  {
    label: 'Residential Service (Stone Electric)',
    href: '/residential-service-automation',
  },
  {
    label: 'Agro-Industry',
    href: '/agro-industry',
  },
  {
    label: 'HVAC Leads',
    href: '/hvac-leads',
  },
];

const aboutItems = [{ label: 'Meet the Team', href: '/meettheteam' }];

export const BurgerMenu = () => {
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
        <button aria-label="Open burger menu" name="open-burger-menu" className={st.burger}>
          Menu
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

                <div className={st.group}>
                  <button
                    aria-label="Toggle products group"
                    name="toggle-products-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: pathname.startsWith('/products'),
                      [st.groupOpen]: openProducts,
                    })}
                    onClick={() => setOpenProducts((v) => !v)}
                  >
                    <span itemProp="name">Products</span>
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
                        <span itemProp="name">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  href="/pricing"
                  className={cn({ [st.active]: pathname === '/pricing' })}
                  itemProp="url"
                >
                  <span itemProp="name">Pricing</span>
                </Link>
                <div className={st.group}>
                  <button
                    aria-label="Toggle about group"
                    name="toggle-about-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: pathname.startsWith('/about'),
                      [st.groupOpen]: openProducts,
                    })}
                    onClick={() => setOpenAbout((v) => !v)}
                  >
                    <span itemProp="name">About</span>
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
                        <span itemProp="name">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={st.group}>
                  <button
                    aria-label="Toggle industries group"
                    name="toggle-industries-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: pathname.startsWith('/industries'),
                      [st.groupOpen]: openIndustries,
                    })}
                    onClick={() => setOpenIndustries((v) => !v)}
                  >
                    <span itemProp="name">Industries</span>
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
                        <span itemProp="name">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <div className={st.group}>
                  <button
                    aria-label="Toggle use cases group"
                    name="toggle-use-cases-group"
                    className={cn(st.groupTrigger, {
                      [st.active]: isUseCasesPath,
                      [st.groupOpen]: openUseCases,
                    })}
                    onClick={() => setOpenUseCases((v) => !v)}
                  >
                    <span itemProp="name">Use Cases</span>
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
                        <span itemProp="name">{item.label}</span>
                      </Link>
                    ))}
                  </div>
                </div>

                <Link
                  className={st.bookMeeting}
                  // href="https://calendly.com/coldi/30min"
                  href="/calendar"
                  target="_blank"
                >
                  Schedule a Meeting
                </Link>
              </nav>
            </section>
          </Description>
        </Content>
      </Portal>
    </Root>
  );
};
