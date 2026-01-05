'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { requestRoutes } from '@/shared/lib/helpers/request-routes';
import { MessageIcon } from '@/shared/ui/icons/fill/message';
import { PhoneIcon } from '@/shared/ui/icons/fill/phone';
import { Facebook } from '@/shared/ui/icons/fill/socials/facebook';
import { Linkedin } from '@/shared/ui/icons/fill/socials/linkedin';
import { Whatsapp } from '@/shared/ui/icons/fill/socials/whatsapp';
import { WhatsappFixed } from '@/shared/ui/icons/fill/socials/whatsapp-fixed';
import { X } from '@/shared/ui/icons/fill/socials/x';
import { Youtube } from '@/shared/ui/icons/fill/socials/youtube';

import st from './Footer.module.scss';

export const Footer = () => {
  const pathname = usePathname();

  return !requestRoutes.has(pathname) ? (
    <>
      <footer className={st.footer}>
        <div className={st.footer__container}>
          <section className={st.footer__content}>
            <div className={st.footer__logo}>
              <Image src="/full-logo.svg" alt="Coldi" width={145} height={50} />
              <p>Brand-Tuned Ai Talkers. Always On.</p>
              <div className={st.footer__socials}>
                <Link href="https://x.com/Coldiai" target="_blank">
                  <X />
                </Link>
                <Link href="https://www.facebook.com/coldiai/" target="_blank">
                  <Facebook />
                </Link>
                <Link href="https://www.linkedin.com/company/coldiai/" target="_blank">
                  <Linkedin />
                </Link>
                <Link href="https://wa.me/447955534986" target="_blank">
                  <Whatsapp />
                </Link>
                <Link href="https://www.youtube.com/@coldi_ai" target="_blank">
                  <Youtube />
                </Link>
              </div>
            </div>
            <div className={st.footer__links}>
              <ul
                className={st.footer__list}
                itemScope
                itemType="http://schema.org/SiteNavigationElement"
              >
                <h4>Explore</h4>
                <li itemProp="name">
                  <Link href="/products" itemProp="url">
                    Products
                  </Link>
                </li>
                <li itemProp="name">
                  <Link href="/pricing" itemProp="url">
                    Pricing
                  </Link>
                </li>
                <li itemProp="name">
                  <Link href="/news" itemProp="url">
                    News
                  </Link>
                </li>
                <li itemProp="name">
                  <Link href="/about" itemProp="url">
                    About
                  </Link>
                </li>
              </ul>
              <ul className={st.footer__list}>
                <h4>Contact Us</h4>
                <li>
                  <Link href="mailto:info@coldi.ai">
                    <MessageIcon />
                    info@coldi.ai
                  </Link>
                </li>
                <li>
                  <Link href="tel:+441299667777">
                    <PhoneIcon />
                    +441299667777
                  </Link>
                </li>
              </ul>
            </div>
          </section>
          <span className={st.divider} />
          <div className={st.footer__copyright}>
            <p>© {new Date().getFullYear()} Coldi. Voice-Powered. Rights Reserved.</p>
            <a
              href="https://www.saashub.com/coldi?utm_source=badge&utm_campaign=badge&utm_content=coldi&badge_variant=color&badge_kind=approved"
              target="_blank"
            >
              <Image
                src="https://cdn-b.saashub.com/img/badges/approved-color.png?v=1"
                alt="Coldi badge"
                width={126}
                height={42}
              />
            </a>
          </div>
        </div>
      </footer>
      <Link href="https://wa.me/447955534986" target="_blank" className={st.whatsappFixedLink}>
        <WhatsappFixed />
      </Link>
    </>
  ) : null;
};
