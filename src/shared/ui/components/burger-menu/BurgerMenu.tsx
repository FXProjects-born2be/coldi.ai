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
                <Link className={st.call} href="tel:+441299667777" target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M19.2291 15.26L16.6891 14.97C16.3904 14.9349 16.0877 14.968 15.8036 15.0667C15.5196 15.1654 15.2616 15.3273 15.0491 15.54L13.2091 17.38C10.3705 15.9359 8.06313 13.6286 6.61906 10.79L8.46906 8.94C8.89906 8.51 9.10906 7.91 9.03906 7.3L8.74906 4.78C8.69258 4.29209 8.45853 3.84202 8.09153 3.51559C7.72452 3.18916 7.25023 3.0092 6.75906 3.01H5.02906C3.89906 3.01 2.95906 3.95 3.02906 5.08C3.55906 13.62 10.3891 20.44 18.9191 20.97C20.0491 21.04 20.9891 20.1 20.9891 18.97V17.24C20.9991 16.23 20.2391 15.38 19.2291 15.26Z"
                      fill="#4268FF"
                    />
                  </svg>
                  <span>Call Coldi</span>
                </Link>
                <Link
                  className={st.bookMeeting}
                  href="https://calendly.com/coldi/30min"
                  target="_blank"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                  >
                    <path
                      d="M7.7501 2.5C7.7501 2.30109 7.67108 2.11032 7.53043 1.96967C7.38978 1.82902 7.19901 1.75 7.0001 1.75C6.80119 1.75 6.61042 1.82902 6.46977 1.96967C6.32912 2.11032 6.2501 2.30109 6.2501 2.5V4.08C4.8101 4.195 3.8661 4.477 3.1721 5.172C2.4771 5.866 2.1951 6.811 2.0791 8.25H21.9211C21.8051 6.81 21.5231 5.866 20.8281 5.172C20.1341 4.477 19.1891 4.195 17.7501 4.079V2.5C17.7501 2.30109 17.6711 2.11032 17.5304 1.96967C17.3898 1.82902 17.199 1.75 17.0001 1.75C16.8012 1.75 16.6104 1.82902 16.4698 1.96967C16.3291 2.11032 16.2501 2.30109 16.2501 2.5V4.013C15.5851 4 14.8391 4 14.0001 4H10.0001C9.1611 4 8.4151 4 7.7501 4.013V2.5Z"
                      fill="white"
                    />
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M2 12C2 11.161 2 10.415 2.013 9.75H21.987C22 10.415 22 11.161 22 12V14C22 17.771 22 19.657 20.828 20.828C19.656 21.999 17.771 22 14 22H10C6.229 22 4.343 22 3.172 20.828C2.001 19.656 2 17.771 2 14V12ZM17 14C17.2652 14 17.5196 13.8946 17.7071 13.7071C17.8946 13.5196 18 13.2652 18 13C18 12.7348 17.8946 12.4804 17.7071 12.2929C17.5196 12.1054 17.2652 12 17 12C16.7348 12 16.4804 12.1054 16.2929 12.2929C16.1054 12.4804 16 12.7348 16 13C16 13.2652 16.1054 13.5196 16.2929 13.7071C16.4804 13.8946 16.7348 14 17 14ZM17 18C17.2652 18 17.5196 17.8946 17.7071 17.7071C17.8946 17.5196 18 17.2652 18 17C18 16.7348 17.8946 16.4804 17.7071 16.2929C17.5196 16.1054 17.2652 16 17 16C16.7348 16 16.4804 16.1054 16.2929 16.2929C16.1054 16.4804 16 16.7348 16 17C16 17.2652 16.1054 17.5196 16.2929 17.7071C16.4804 17.8946 16.7348 18 17 18ZM13 13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13C11 12.7348 11.1054 12.4804 11.2929 12.2929C11.4804 12.1054 11.7348 12 12 12C12.2652 12 12.5196 12.1054 12.7071 12.2929C12.8946 12.4804 13 12.7348 13 13ZM13 17C13 17.2652 12.8946 17.5196 12.7071 17.7071C12.5196 17.8946 12.2652 18 12 18C11.7348 18 11.4804 17.8946 11.2929 17.7071C11.1054 17.5196 11 17.2652 11 17C11 16.7348 11.1054 16.4804 11.2929 16.2929C11.4804 16.1054 11.7348 16 12 16C12.2652 16 12.5196 16.1054 12.7071 16.2929C12.8946 16.4804 13 16.7348 13 17ZM7 14C7.26522 14 7.51957 13.8946 7.70711 13.7071C7.89464 13.5196 8 13.2652 8 13C8 12.7348 7.89464 12.4804 7.70711 12.2929C7.51957 12.1054 7.26522 12 7 12C6.73478 12 6.48043 12.1054 6.29289 12.2929C6.10536 12.4804 6 12.7348 6 13C6 13.2652 6.10536 13.5196 6.29289 13.7071C6.48043 13.8946 6.73478 14 7 14ZM7 18C7.26522 18 7.51957 17.8946 7.70711 17.7071C7.89464 17.5196 8 17.2652 8 17C8 16.7348 7.89464 16.4804 7.70711 16.2929C7.51957 16.1054 7.26522 16 7 16C6.73478 16 6.48043 16.1054 6.29289 16.2929C6.10536 16.4804 6 16.7348 6 17C6 17.2652 6.10536 17.5196 6.29289 17.7071C6.48043 17.8946 6.73478 18 7 18Z"
                      fill="white"
                    />
                  </svg>
                  AI Voice Demo
                </Link>
              </nav>
            </section>
          </Description>
        </Content>
      </Portal>
    </Root>
  );
};
