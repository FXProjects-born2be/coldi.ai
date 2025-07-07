'use client';

import Image from 'next/image';
import Link from 'next/link';

import { MessageIcon } from '@/shared/ui/icons/fill/message';
import { PhoneIcon } from '@/shared/ui/icons/fill/phone';

import st from './Footer.module.scss';

export const Footer = () => {
  return (
    <footer className={st.footer}>
      <div className={st.footer__container}>
        <section className={st.footer__content}>
          <div className={st.footer__logo}>
            <Image src="/full-logo.svg" alt="Coldi" width={145} height={50} />
            <p>Brand-Tuned Ai Talkers. Always On.</p>
          </div>
          <div className={st.footer__links}>
            <ul className={st.footer__list}>
              <h4>Explore</h4>
              <li>
                <Link href="/products">Products</Link>
              </li>
              <li>
                <Link href="/pricing">Pricing</Link>
              </li>
              <li>
                <Link href="/news">News</Link>
              </li>
              <li>
                <Link href="/about">About</Link>
              </li>
            </ul>
            <ul className={st.footer__list}>
              <h4>Contact Us</h4>
              <li>Registered address:</li>
              <li>Registered number:</li>
              <li>Office address:</li>
              <li>
                <Link href="mailto:info@example.com">
                  <MessageIcon />
                  info@example.com
                </Link>
              </li>
              <li>
                <Link href="tel:+1000000000">
                  <PhoneIcon />
                  +1 000 000 000
                </Link>
              </li>
            </ul>
          </div>
        </section>
        <span className={st.divider} />
        <p className={st.footer__copyright}>
          © {new Date().getFullYear()} Coldi. Voice-Powered. Rights Reserved.
        </p>
      </div>
      <Image
        className={st.footer__image}
        src="/images/footer.png"
        alt="Coldi"
        unoptimized
        width={1440}
        height={100}
      />
    </footer>
  );
};
