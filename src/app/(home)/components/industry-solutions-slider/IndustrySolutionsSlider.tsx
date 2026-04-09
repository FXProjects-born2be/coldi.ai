'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import type { ReactNode } from 'react';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';

import { blurInUp } from '@/shared/lib/helpers';

import st from './IndustrySolutionsSlider.module.scss';

import 'swiper/css';

type IndustryCard = {
  cta: string;
  description: ReactNode;
  href: string;
  icon: string;
  title: string;
};

const INDUSTRY_CARDS: IndustryCard[] = [
  {
    title: 'Call Centers',
    href: '/industries/call-center',
    cta: 'Explore Call Center Solution',
    icon: '/images/home/solution-sliders/industry-call-centers.svg',
    description: (
      <>
        <p>
          <Link href="/industries/call-center">AI voice agents empower call centers</Link> to reach
          peak efficiency by managing thousands of concurrent calls, effectively eliminating wait
          times.
        </p>
        <p>
          Unlike traditional systems, these agents provide instant, 24/7 support without delays.
        </p>
        <p>
          By automating high-volume interactions, organizations can slash operational costs,
          accelerate response speeds, and deliver a consistently superior customer experience while
          scaling effortlessly.
        </p>
      </>
    ),
  },
  {
    title: 'Forex & Trading Platforms',
    href: '/industries/fx-brokers',
    cta: 'Explore Trading Solution',
    icon: '/images/home/solution-sliders/industry-forex.svg',
    description: (
      <>
        <p>
          Our AI voice agents serve as a 24/7 support layer, assisting traders with platform
          navigation, account inquiries, and complex verification processes (KYC).
        </p>
        <p>
          This allows account managers and advisory teams to pivot their focus toward high-value
          risk management and personalized client consulting.
        </p>
        <p>
          Traders gain real-time access to account balances and market updates through natural
          dialogue, ensuring premium support even during periods of extreme market volatility.
        </p>
      </>
    ),
  },
  {
    title: 'Credit & Debt Collection',
    href: '/industries/debt-collection',
    cta: 'Explore Debt Collection Solution',
    icon: '/images/home/solution-sliders/industry-debt.svg',
    description: (
      <>
        <p>
          AI transforms <Link href="/industries/debt-collection">debt recovery</Link> by automating
          routine outreach, including payment reminders, installment discussions, and balance
          inquiries.
        </p>
        <p>
          This shift enables collection teams to focus on sensitive, high-stakes negotiations that
          require a human touch. Operating with strict compliance, these agents manage thousands of
          simultaneous borrower interactions, significantly increasing recovery rates and ensuring
          no repayment opportunity is overlooked.
        </p>
      </>
    ),
  },
  {
    title: 'Insurance',
    href: '/industries/insurance',
    cta: 'Explore Insurance Solution',
    icon: '/images/home/solution-sliders/industry-insurance.svg',
    description: (
      <>
        <p>
          From instant quote generation to complex policy inquiries, AI voice agents are built for
          the fast-paced <Link href="/industries/insurance">insurance industry</Link>.
        </p>
        <p>
          They streamline the claims process by guiding policyholders through documentation with
          precision, reducing emotional friction and accelerating settlements.
        </p>
        <p>
          Engineered with enterprise-grade security, these agents securely verify identities and
          process sensitive data, maintaining a high-efficiency workflow for high-volume
          administrative tasks.
        </p>
      </>
    ),
  },
  {
    title: 'Healthcare',
    href: '/industries/healthcare',
    cta: 'Explore Healthcare Solution',
    icon: '/images/home/solution-sliders/industry-healthcare.svg',
    description: (
      <>
        <p>
          AI voice agents optimize patient coordination by managing appointment scheduling,
          prescription refills, and post-discharge follow-ups.
        </p>
        <p>
          By handling these high-volume administrative workflows with HIPAA-compliant security, they
          reduce &quot;no-show&quot; rates and free up medical staff to focus on clinical care.
        </p>
        <p>
          Patients receive immediate, compassionate responses, ensuring a seamless journey from the
          first call to the final recovery stage.
        </p>
      </>
    ),
  },
  {
    title: 'Real Estate',
    href: '/industries/real-estate',
    cta: 'Explore Development',
    icon: '/images/home/solution-sliders/industry-real-estate.svg',
    description: (
      <>
        <p>
          The real estate market never sleeps, and neither should your lead engagement.{' '}
          <Link href="/industries/real-estate">Our AI real estate Agents</Link> qualify prospects
          through fluid, natural dialogue, answering property specifications and booking viewings
          directly into your calendar.
        </p>
        <p>
          By pulling real-time market data and cross-referencing caller preferences with current
          listings, these agents act as a scalable extension of your team. They turn cold inquiries
          into &quot;ready-to-sign&quot; leads while maintaining a consistent professional brand
          voice within your CRM.
        </p>
      </>
    ),
  },
];

const PAGE_COUNT = Math.ceil(INDUSTRY_CARDS.length / 2);

export const IndustrySolutionsSlider = () => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activePage, setActivePage] = useState(0);

  const handlePageClick = useCallback((pageIndex: number) => {
    if (!swiperRef.current) return;
    swiperRef.current.slideToLoop(pageIndex * 2);
  }, []);

  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        AI Voice Solution for <br />
        more than 10 industries
      </motion.h2>

      <div className={st.sliderShell}>
        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          loop
          speed={900}
          autoplay={{
            delay: 4000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          onSlideChange={(swiper) => {
            setActivePage(Math.min(Math.floor(swiper.realIndex / 2), PAGE_COUNT - 1));
          }}
          className={st.swiper}
          breakpoints={{
            0: { spaceBetween: 16, slidesPerView: 1 },
            769: { spaceBetween: 24, slidesPerView: 3.2 },
            1600: {
              slidesPerView: 4.3,
              spaceBetween: 24,
            },
          }}
        >
          {INDUSTRY_CARDS.map((card) => (
            <SwiperSlide key={card.title} className={st.slide}>
              <article className={st.card}>
                <div className={st.iconWrap}>
                  <Image src={card.icon} alt="" width={48} height={48} aria-hidden unoptimized />
                </div>

                <div className={st.cardBody}>
                  <div className={st.cardText}>
                    <h3>{card.title}</h3>
                    <div className={st.description}>{card.description}</div>
                  </div>

                  <Link href={card.href} className={st.button}>
                    {card.cta}
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>

      <div className={st.pagination}>
        {Array.from({ length: PAGE_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to industry slide ${index + 1}`}
            className={`${st.dot} ${activePage === index ? st.dotActive : ''}`}
            onClick={() => handlePageClick(index)}
          />
        ))}
      </div>
    </section>
  );
};
