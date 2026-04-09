'use client';

import { useCallback, useRef, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';

import { blurInUp } from '@/shared/lib/helpers';

import st from './ProductSolutionsSlider.module.scss';

import 'swiper/css';

type ProductCard = {
  cta: string;
  description: string;
  href: string;
  icon: string;
  title: string;
};

const PRODUCT_CARDS: ProductCard[] = [
  {
    title: 'Outbound AI Calling',
    href: '/products/outbound-calling',
    cta: 'Explore Outbound',
    icon: '/images/home/solution-sliders/product-outbound.svg',
    description:
      'Automate outbound campaigns, lead qualification, and follow-ups with AI voice agents that scale your sales and outreach efforts.',
  },
  {
    title: 'Inbound AI Calling',
    href: '/products/inbound-calling',
    cta: 'Explore Inbound',
    icon: '/images/home/solution-sliders/product-inbound.svg',
    description:
      'Handle incoming calls instantly with AI agents that resolve requests, reduce wait times, and improve customer experience.',
  },
  {
    title: 'AI Agent Development',
    href: '/products/agent-development',
    cta: 'Explore Development',
    icon: '/images/home/solution-sliders/product-agent-development.svg',
    description:
      'Design and deploy custom AI voice agents tailored to your workflows, integrations, and business logic.',
  },
  {
    title: 'AI Customer Service',
    href: '/products/customer-service-agent',
    cta: 'Explore Customer Service',
    icon: '/images/home/solution-sliders/product-customer-service.svg',
    description:
      'Deliver fast, consistent, and scalable customer support with AI-powered conversations across multiple channels.',
  },
  {
    title: 'VoIP Phone Service',
    href: '/products/voip-phone-service',
    cta: 'Explore VoIP',
    icon: '/images/home/solution-sliders/product-voip.svg',
    description:
      'A fully managed VoIP system with built-in AI capabilities for smarter, global business communication.',
  },
];

const PAGE_COUNT = Math.ceil(PRODUCT_CARDS.length / 2);

export const ProductSolutionsSlider = () => {
  const swiperRef = useRef<SwiperInstance | null>(null);
  const [activePage, setActivePage] = useState(1);

  const handlePrev = useCallback(() => {
    swiperRef.current?.slidePrev();
  }, []);

  const handleNext = useCallback(() => {
    swiperRef.current?.slideNext();
  }, []);

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
        AI Voice Solutions Built for Scale
      </motion.h2>

      <div className={st.sliderShell}>
        <div className={`${st.edgeFade} ${st.edgeFadeLeft}`} />
        <div className={`${st.edgeFade} ${st.edgeFadeRight}`} />

        <button type="button" className={`${st.navButton} ${st.prev}`} onClick={handlePrev}>
          <Image
            src="/images/home/solution-sliders/slider-arrow.svg"
            alt=""
            width={24}
            height={24}
            unoptimized
          />
        </button>

        <Swiper
          modules={[Autoplay]}
          spaceBetween={24}
          centeredSlides
          loop
          initialSlide={2}
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
            0: { spaceBetween: 8, slidesPerView: 1 },
            769: { spaceBetween: 24, slidesPerView: 3 },
            1600: {
              slidesPerView: 4,
              spaceBetween: 24,
            },
          }}
        >
          {PRODUCT_CARDS.map((card) => (
            <SwiperSlide key={card.title} className={st.slide}>
              <article className={st.card}>
                <div className={st.iconWrap}>
                  <Image src={card.icon} alt="" width={48} height={48} aria-hidden unoptimized />
                </div>

                <div className={st.cardBody}>
                  <div className={st.cardText}>
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                  </div>

                  <Link href={card.href} className={st.button}>
                    {card.cta}
                  </Link>
                </div>
              </article>
            </SwiperSlide>
          ))}
        </Swiper>

        <button type="button" className={`${st.navButton} ${st.next}`} onClick={handleNext}>
          <Image
            src="/images/home/solution-sliders/slider-arrow.svg"
            alt=""
            width={24}
            height={24}
            unoptimized
          />
        </button>
      </div>

      <div className={st.pagination}>
        {Array.from({ length: PAGE_COUNT }).map((_, index) => (
          <button
            key={index}
            type="button"
            aria-label={`Go to product slide ${index + 1}`}
            className={`${st.dot} ${activePage === index ? st.dotActive : ''}`}
            onClick={() => handlePageClick(index)}
          />
        ))}
      </div>
    </section>
  );
};
