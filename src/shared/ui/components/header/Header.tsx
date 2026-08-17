'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { cn, getPageHeadingFromPath } from '@/shared/lib/helpers';
import { HeaderBurgerMenu } from '@/shared/ui/components/header/HeaderBurgerMenu';

import st from './Header.module.scss';

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

const useCasesItems = [
  {
    label: 'BPO (Silverbell Group)',
    href: '/silverbellgroup',
  },
  {
    label: 'Clarity Global',
    href: '/clarity-global',
  },
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

export const Header = ({ pathname: pathnameProp }: { pathname: string }) => {
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
          Schedule a Meeting
        </Link>

        <HeaderBurgerMenu />
      </div>
    </header>
  );
};

const Navigation = ({ pathname }: { pathname: string }) => {
  const pageHeading = getPageHeadingFromPath(pathname);
  const isUseCasesPath =
    pathname.startsWith('/use-cases') || useCasesItems.some((item) => item.href === pathname);

  return (
    <ul
      className={st.header__navigation}
      itemScope
      itemType="http://schema.org/SiteNavigationElement"
    >
      <li className={cn({ [st.active]: pathname === '/' })} itemProp="name">
        <Link className={st.navLink} href="/" itemProp="url" prefetch={false}>
          Home
        </Link>
      </li>
      <li className={cn({ [st.active]: pathname === '/news' })} itemProp="name">
        <Link className={st.navLink} href="/news" itemProp="url" prefetch={false}>
          News
        </Link>
      </li>
      <li
        className={cn(st.hasDropdown, {
          [st.active]: pathname.startsWith('/products'),
        })}
        itemProp="name"
      >
        <Link className={st.navTrigger} href="/products" itemProp="url" prefetch={false}>
          <span>Products</span>
          <span className={st.dropdownArrow}>
            <Image src="/icons/header/arrow.svg" alt={pageHeading} width={17} height={16} />
          </span>
        </Link>
        <ul className={st.dropdown}>
          <li itemProp="name">
            <Link
              className={st.dropdownLink}
              href="/products/outbound-calling"
              itemProp="url"
              prefetch={false}
            >
              Outbound Calling
            </Link>
          </li>
          <li itemProp="name">
            <Link
              className={st.dropdownLink}
              href="/products/inbound-calling"
              itemProp="url"
              prefetch={false}
            >
              Inbound Calling
            </Link>
          </li>
          <li itemProp="name">
            <Link
              className={st.dropdownLink}
              href="/products/agent-development"
              itemProp="url"
              prefetch={false}
            >
              AI Agent Development
            </Link>
          </li>
          <li itemProp="name">
            <Link
              className={st.dropdownLink}
              href="/products/customer-service-agent"
              itemProp="url"
              prefetch={false}
            >
              AI Customer Service
            </Link>
          </li>
          <li itemProp="name">
            <Link
              className={st.dropdownLink}
              href="/products/ai-for-quality-control"
              itemProp="url"
              prefetch={false}
            >
              AI for Quality Control
            </Link>
          </li>
          <li itemProp="name">
            <Link
              className={st.dropdownLink}
              href="/products/voip-phone-service"
              itemProp="url"
              prefetch={false}
            >
              VoIP Phone Service
            </Link>
          </li>
        </ul>
      </li>
      <li className={cn({ [st.active]: pathname === '/pricing' })} itemProp="name">
        <Link className={st.navLink} href="/pricing" itemProp="url" prefetch={false}>
          Pricing
        </Link>
      </li>
      <li
        className={cn(st.hasDropdown, {
          [st.active]: pathname.startsWith('/about'),
        })}
        itemProp="name"
      >
        <Link className={st.navTrigger} href="/about" itemProp="url" prefetch={false}>
          <span>About</span>
          <span className={st.dropdownArrow}>
            <Image src="/icons/header/arrow.svg" alt={pageHeading} width={16} height={8} />
          </span>
        </Link>
        <ul className={st.dropdown}>
          <li itemProp="name">
            <Link className={st.dropdownLink} href="/meettheteam" itemProp="url" prefetch={false}>
              Meet the Team
            </Link>
          </li>
        </ul>
      </li>
      <li
        className={cn(st.hasDropdown, {
          [st.active]: pathname.startsWith('/industries'),
        })}
        itemProp="name"
      >
        <Link className={st.navTrigger} href="/industries" itemProp="url" prefetch={false}>
          <span>Industries</span>
          <span className={st.dropdownArrow}>
            <Image src="/icons/header/arrow.svg" alt={pageHeading} width={16} height={8} />
          </span>
        </Link>
        <ul className={st.dropdown}>
          {industriesItems.map((item) => (
            <li key={item.href} itemProp="name">
              <Link className={st.dropdownLink} href={item.href} itemProp="url" prefetch={false}>
                <Image
                  className={st.dropdownIcon}
                  src={item.icon}
                  alt={pageHeading}
                  width={20}
                  height={20}
                />
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
      <li
        className={cn(st.hasDropdown, {
          [st.active]: isUseCasesPath,
        })}
        itemProp="name"
      >
        <span className={st.navLabel}>
          <span>Use Cases</span>
          <span className={st.dropdownArrow}>
            <Image src="/icons/header/arrow.svg" alt={pageHeading} width={16} height={8} />
          </span>
        </span>
        <ul className={st.dropdown}>
          {useCasesItems.map((item) => (
            <li key={item.href} itemProp="name">
              <Link className={st.dropdownLink} href={item.href} itemProp="url" prefetch={false}>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </li>
    </ul>
  );
};
