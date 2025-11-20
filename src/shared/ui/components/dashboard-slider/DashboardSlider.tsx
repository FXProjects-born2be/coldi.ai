'use client';

import { useCallback, useMemo, useRef, useState } from 'react';
import Image from 'next/image';

import { motion } from 'framer-motion';
import { Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './DashboardSlider.module.scss';

import 'swiper/css';

export const DashboardSlider = ({ title, subtitle }: { title: string; subtitle: string }) => {
  const images = useMemo(
    () => [
      '/images/dashboard/slide-1.png',
      '/images/dashboard/slide-2.png',
      '/images/dashboard/slide-3.png',
      '/images/dashboard/slide-4.png',
    ],
    []
  );

  const [activeIndex, setActiveIndex] = useState(0);
  const swiperRef = useRef<SwiperInstance | null>(null);

  const handleDotClick = useCallback((index: number) => {
    if (!swiperRef.current) return;
    swiperRef.current.slideToLoop(index);
  }, []);

  return (
    <section className={st.layout}>
      <div className={st.title}>
        <motion.h2
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{ __html: title }}
        />
        <motion.p
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          dangerouslySetInnerHTML={{ __html: subtitle }}
        />
      </div>
      <section className={st.slider}>
        <Swiper
          slidesPerView={1}
          spaceBetween={24}
          modules={[Autoplay]}
          autoplay={{ delay: 4500, disableOnInteraction: false }}
          loop
          onSwiper={(instance) => {
            swiperRef.current = instance;
          }}
          onSlideChange={(swiper) => {
            setActiveIndex(swiper.realIndex);
          }}
        >
          {images.map((image, index) => (
            <SwiperSlide key={image}>
              <Image
                src={image}
                alt={`Dashboard Slider ${index + 1}`}
                width={1590}
                height={800}
                sizes="(max-width: 1200px) 100vw, 1200px"
                priority={index === 0}
                unoptimized
              />
            </SwiperSlide>
          ))}
        </Swiper>
        <div className={st.pagination}>
          {images.map((_, index) => (
            <button
              key={index}
              type="button"
              aria-label={`Go to slide ${index + 1}`}
              className={`${st.dot} ${activeIndex === index ? st.dotActive : ''}`}
              onClick={() => handleDotClick(index)}
            />
          ))}
        </div>
      </section>
    </section>
  );
};
