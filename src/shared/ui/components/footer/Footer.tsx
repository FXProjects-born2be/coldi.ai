import Image from 'next/image';
import Link from 'next/link';

import { cn, getPageHeadingFromPath, requestRoutes } from '@/shared/lib/helpers';
import { MessageIcon } from '@/shared/ui/icons/fill/message';
import { PhoneIcon } from '@/shared/ui/icons/fill/phone';
import { Facebook } from '@/shared/ui/icons/fill/socials/facebook';
import { Linkedin } from '@/shared/ui/icons/fill/socials/linkedin';
import { WhatsappFixed } from '@/shared/ui/icons/fill/socials/whatsapp-fixed';
import { X } from '@/shared/ui/icons/fill/socials/x';
import { Youtube } from '@/shared/ui/icons/fill/socials/youtube';

import st from './Footer.module.scss';

const menu = [
  {
    title: 'Explore',
    links: [
      { href: '/products', label: 'Products' },
      { href: '/pricing', label: 'Pricing' },
      { href: '/news', label: 'News' },
      { href: '/about', label: 'About' },
    ],
  },
  {
    title: 'Products',
    links: [
      { href: '/products/outbound-calling', label: 'Outbound AI Calling' },
      { href: '/products/inbound-calling', label: 'Inbound AI Calling' },
      { href: '/products/agent-development', label: 'AI Agent Development' },
      { href: '/products/customer-service-agent', label: 'AI Customer Service' },
      { href: '/products/ai-for-quality-control', label: 'AI for Quality Control' },
      { href: '/products/voip-phone-service', label: 'VoIP Phone Service' },
    ],
  },
  {
    title: 'Industries',
    links: [
      { href: '/industries/healthcare', label: 'Healthcare' },
      { href: '/industries/insurance', label: 'Insurance' },
      { href: '/industries/real-estate', label: 'Real Estate' },
      { href: '/industries/call-center', label: 'Call Centers' },
      { href: '/industries/debt-collection', label: 'Debt Collection' },
    ],
  },
  {
    title: 'Legal',
    links: [
      { href: '/legal', label: 'Terms of Service' },
      { href: '/legal', label: 'Privacy Policy' },
      { href: '/legal', label: 'Data Processing Agreement' },
    ],
  },
];

export const Footer = ({ pathname }: { pathname: string }) => {
  const phoneNumber = '+441299667777'; // Static phone number
  const pageHeading = getPageHeadingFromPath(pathname);

  return !requestRoutes.has(pathname) ? (
    <>
      <footer className={st.footer}>
        <div className={st.footer__top_image}>
          <Image
            src="/images/footer-top.png"
            alt={pageHeading}
            width={1440}
            height={254}
            loading={'lazy'}
          />

          <Image
            src="/images/footer-top-mobile.png"
            alt={pageHeading}
            width={390}
            height={531}
            loading={'lazy'}
          />
        </div>

        <div className={cn('container', st.footer__container)}>
          <div className={st.footer__inner}>
            <div className={st.footer__top}>
              <div>
                <a href={'/'} className={st.footer__logo}>
                  <Image
                    src="/footer-logo.svg"
                    alt={pageHeading}
                    width={292}
                    height={180}
                    loading={'lazy'}
                  />
                </a>

                <p className={st.footer__subtitle}>Making voice AI work for Fintech</p>

                <ul className={st.footer__socials}>
                  <li>
                    <Link href="https://x.com/Coldiai" className={st.footer__socials_link}>
                      <X />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.facebook.com/coldiai/"
                      className={st.footer__socials_link}
                    >
                      <Facebook />
                    </Link>
                  </li>
                  <li>
                    <Link
                      href="https://www.linkedin.com/company/coldiai/"
                      target="_blank"
                      className={st.footer__socials_link}
                    >
                      <Linkedin />
                    </Link>
                  </li>

                  <li>
                    <Link
                      href="https://www.youtube.com/@coldi_ai"
                      target="_blank"
                      className={st.footer__socials_link}
                    >
                      <Youtube />
                    </Link>
                  </li>
                </ul>

                <ul className={st.footer__contact}>
                  <li className={st.footer__contact_item}>
                    <Link href="mailto:info@coldi.ai" className={st.footer__contact_link}>
                      <MessageIcon />
                      info@coldi.ai
                    </Link>
                  </li>
                  <li className={st.footer__contact_item}>
                    <Link href={`tel:${phoneNumber}`} className={st.footer__contact_link}>
                      <PhoneIcon />
                      {phoneNumber}
                    </Link>
                  </li>
                  {/*<li className={st.footer__contact_item}>*/}
                  {/*  <Link*/}
                  {/*    href="https://wa.me/447955534986"*/}
                  {/*    target="_blank"*/}
                  {/*    rel="noopener noreferrer"*/}
                  {/*    aria-label="Open WhatsApp chat with Coldi"*/}
                  {/*    className={st.footer__contact_link}*/}
                  {/*  >*/}
                  {/*    <Whatsapp />*/}
                  {/*    Whatsapp*/}
                  {/*  </Link>*/}
                  {/*</li>*/}
                </ul>
              </div>
              <div className={st.footer__menu}>
                {menu.map((column) => (
                  <div key={column.title}>
                    <h4 className={st.footer__menu_title}>{column.title}</h4>
                    <ul
                      className={st.footer__menu_list}
                      itemScope
                      itemType="http://schema.org/SiteNavigationElement"
                    >
                      {column.links.map((link) => (
                        <li key={link.label} itemProp="name">
                          <Link href={link.href} itemProp="url" className={st.footer__menu_link}>
                            {link.label}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className={st.footer__bottom}>
              <p className={st.footer__copyright}>
                © {new Date().getFullYear()} Coldi. Voice-Powered. Rights Reserved.
              </p>
              <div className={st.footer__badges}>
                <a
                  href="https://cloudsecurityalliance.org/star/registry/coldi-labs-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Coldi on Star AI"
                >
                  <Image src="/images/star-ai.png" alt={pageHeading} width={140} height={140} />
                </a>
                <a
                  href="https://cloudsecurityalliance.org/star/registry/coldi-labs-ltd/services/coldi-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Coldi on Star AI"
                >
                  <Image src="/images/star-level.png" alt={pageHeading} width={140} height={140} />
                </a>
                <a
                  href="https://www.saashub.com/coldi?utm_source=badge&utm_campaign=badge&utm_content=coldi&badge_variant=color&badge_kind=approved"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="View Coldi on SaaSHub"
                >
                  <Image
                    src="https://cdn-b.saashub.com/img/badges/approved-color.png?v=1"
                    alt={pageHeading}
                    width={126}
                    height={42}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={st.footer__bottom_image}>
          <Image
            src="/images/footer-bottom.png"
            alt={pageHeading}
            width={1440}
            height={253}
            loading={'lazy'}
          />

          <Image
            src="/images/footer-bottom-mobile.png"
            alt={pageHeading}
            width={390}
            height={424}
            loading={'lazy'}
          />
        </div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open WhatsApp chat with Coldi"
          className={st.footer__whatsapp}
          href="https://wa.me/447955534986"
        >
          <WhatsappFixed />
        </a>
      </footer>
    </>
  ) : null;
};
