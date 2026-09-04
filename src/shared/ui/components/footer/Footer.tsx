import { Suspense } from 'react';
import Image from 'next/image';
import NextLink from 'next/link';

import { getTranslations } from 'next-intl/server';

import { cn, getPageHeadingFromPath, requestRoutes } from '@/shared/lib/helpers';
import { MessageIcon } from '@/shared/ui/icons/fill/message';
import { PhoneIcon } from '@/shared/ui/icons/fill/phone';
import { Facebook } from '@/shared/ui/icons/fill/socials/facebook';
import { Linkedin } from '@/shared/ui/icons/fill/socials/linkedin';
import { WhatsappFixed } from '@/shared/ui/icons/fill/socials/whatsapp-fixed';
import { X } from '@/shared/ui/icons/fill/socials/x';
import { Youtube } from '@/shared/ui/icons/fill/socials/youtube';

import st from './Footer.module.scss';
import { FooterLanguageSelect } from './FooterLanguageSelect';

import { Link } from '@/i18n/navigation';

const menu = [
  {
    id: 'explore',
    links: [
      { id: 'products', href: '/products' },
      { id: 'pricing', href: '/pricing' },
      { id: 'news', href: '/news' },
      { id: 'about', href: '/about' },
      { id: 'trustCenter', href: '/trust-center' },
    ],
  },
  {
    id: 'industries',
    links: [
      { id: 'insurance', href: '/industries/insurance' },
      { id: 'trading', href: '/industries/trading-platforms-brokers' },
      { id: 'debt-collection', href: '/industries/debt-collection' },
      { id: 'emis', href: '/industries/emis-payments' },
      { id: 'other', href: '/industries#other-industries' },
    ],
  },
  {
    id: 'legal',
    links: [
      { id: 'terms', href: '/terms-of-service.pdf', external: true },
      { id: 'privacy', href: '/privacy-policy.pdf', external: true },
    ],
  },
] as const;

export const Footer = async ({ pathname }: { pathname: string }) => {
  const t = await getTranslations('Footer');
  const phoneNumber = '+441299667777';
  const pageHeading = getPageHeadingFromPath(pathname);

  return !requestRoutes.has(pathname) ? (
    <>
      <footer className={st.footer}>
        <div className={cn('container', st.footer__container)}>
          <div className={st.footer__inner}>
            <div className={st.footer__top}>
              <div>
                <Link href="/" className={st.footer__logo}>
                  <Image
                    src="/footer-logo.svg"
                    alt={pageHeading}
                    width={292}
                    height={100}
                    loading={'lazy'}
                  />
                </Link>

                <p className={st.footer__subtitle}>{t('subtitle')}</p>

                <div className={st.footer__socials_wrapper}>
                  <Suspense fallback={null}>
                    <FooterLanguageSelect />
                  </Suspense>

                  <ul className={st.footer__socials}>
                    <li>
                      <NextLink href="https://x.com/Coldiai" className={st.footer__socials_link}>
                        <X />
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        href="https://www.facebook.com/coldiai/"
                        className={st.footer__socials_link}
                      >
                        <Facebook />
                      </NextLink>
                    </li>
                    <li>
                      <NextLink
                        href="https://www.linkedin.com/company/coldiai/"
                        target="_blank"
                        className={st.footer__socials_link}
                      >
                        <Linkedin />
                      </NextLink>
                    </li>

                    <li>
                      <NextLink
                        href="https://www.youtube.com/@coldi_ai"
                        target="_blank"
                        className={st.footer__socials_link}
                      >
                        <Youtube />
                      </NextLink>
                    </li>
                  </ul>
                </div>

                <ul className={st.footer__contact}>
                  <li className={st.footer__contact_item}>
                    <NextLink href="mailto:info@coldi.ai" className={st.footer__contact_link}>
                      <MessageIcon />
                      info@coldi.ai
                    </NextLink>
                  </li>
                  <li className={st.footer__contact_item}>
                    <NextLink href={`tel:${phoneNumber}`} className={st.footer__contact_link}>
                      <PhoneIcon />
                      {phoneNumber}
                    </NextLink>
                  </li>
                </ul>
              </div>
              <div className={st.footer__menu}>
                {menu.map((column) => (
                  <div key={column.id}>
                    <h4 className={st.footer__menu_title}>{t(`columns.${column.id}`)}</h4>
                    <ul
                      className={st.footer__menu_list}
                      itemScope
                      itemType="http://schema.org/SiteNavigationElement"
                    >
                      {column.links.map((link) => {
                        const label = t(`${column.id}.${link.id}`);
                        const isExternal = 'external' in link && link.external;

                        return (
                          <li key={link.id} itemProp="name">
                            {isExternal ? (
                              <NextLink
                                href={link.href}
                                itemProp="url"
                                className={st.footer__menu_link}
                                target="_blank"
                                rel="noopener noreferrer"
                              >
                                {label}
                              </NextLink>
                            ) : (
                              <Link
                                href={link.href}
                                itemProp="url"
                                className={st.footer__menu_link}
                              >
                                {label}
                              </Link>
                            )}
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
              </div>
            </div>

            <div className={st.footer__bottom}>
              <p className={st.footer__copyright}>
                {t('copyright', { year: new Date().getFullYear() })}
              </p>
              <div className={st.footer__badges}>
                <a
                  href="https://cloudsecurityalliance.org/star/registry/coldi-labs-ltd"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('starAria')}
                >
                  <Image
                    src="/images/footer/star-ai.png"
                    alt={pageHeading}
                    width={140}
                    height={140}
                    loading={'lazy'}
                  />
                </a>
                <a
                  href="https://cloudsecurityalliance.org/star/registry/coldi-labs-ltd/services/coldi-ai"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('starAria')}
                >
                  <Image
                    src="/images/footer/star-level.png"
                    alt={pageHeading}
                    width={140}
                    height={140}
                    loading={'lazy'}
                  />
                </a>
                <a
                  href="https://www.saashub.com/coldi?utm_source=badge&utm_campaign=badge&utm_content=coldi&badge_variant=color&badge_kind=approved"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('saasHubAria')}
                >
                  <Image
                    src="/images/footer/saas-hub.png"
                    alt={t('saasHubAria')}
                    width={126}
                    height={42}
                  />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div className={st.footer__video} aria-hidden>
          <video
            src="/videos/footer-video.mp4"
            autoPlay
            playsInline
            muted
            loop
            preload="metadata"
            controls={false}
          />
        </div>

        <a
          target="_blank"
          rel="noopener noreferrer"
          aria-label={t('whatsappAria')}
          className={st.footer__whatsapp}
          href="https://wa.me/447955534986"
        >
          <WhatsappFixed />
        </a>
      </footer>
    </>
  ) : null;
};
