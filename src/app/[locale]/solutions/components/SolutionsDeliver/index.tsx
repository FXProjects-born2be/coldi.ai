'use client';

import { useRef } from 'react';
import Image from 'next/image';

import { Swiper, SwiperSlide } from 'swiper/react';
import type { Swiper as SwiperInstance } from 'swiper/types';

import st from './SolutionsDeliver.module.scss';

import 'swiper/css';

const CARDS = [
  {
    value: '56.5%',
    image: { src: '/images/solutions/deliver-one.svg', width: 262, height: 191 },
    title: 'of calls become conversations',
    description:
      'Coldi agents turn more than half of answered calls into meaningful conversations with the customer.',
  },
  {
    value: '33.3%',
    image: { src: '/images/solutions/deliver-two.svg', width: 268, height: 178 },
    title: 'of conversations move to the next stage',
    description:
      'One in three conversations results in clear customer interest and a defined next step.',
  },
  {
    value: '17.6%',
    image: { src: '/images/solutions/deliver-three.png', width: 301, height: 156 },
    title: 'of conversations result in a scheduled callback',
    description:
      'Coldi AI agents convert qualified conversations into scheduled follow-ups with the right specialist.',
  },
];

const SliderChevron = () => (
  <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 18 18" fill="none">
    <path
      d="M6.68262 14.94L11.5726 10.05C12.1501 9.4725 12.1501 8.5275 11.5726 7.95L6.68262 3.06"
      stroke="#171717"
      strokeWidth="1.5"
      strokeMiterlimit="10"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const Card = ({ card }: { card: (typeof CARDS)[number] }) => (
  <article className={st.solutions_deliver__card}>
    <div className={st.solutions_deliver__media}>
      <Image src={card.image.src} alt="Image" width={card.image.width} height={card.image.height} />
    </div>
    <p className={st.solutions_deliver__value}>{card.value}</p>
    <h3 className={st.solutions_deliver__card_title}>{card.title}</h3>
    <p className={st.solutions_deliver__card_text}>{card.description}</p>
  </article>
);

export const SolutionsDeliver = () => {
  const swiperRef = useRef<SwiperInstance | null>(null);

  return (
    <section className={st.solutions_deliver}>
      <div className="container">
        <div className={st.solutions_deliver__panel}>
          <h2 className={st.solutions_deliver__title}>What Coldi Agents Deliver</h2>
          <div className={st.solutions_deliver__grid}>
            {CARDS.map((card) => (
              <Card key={card.value} card={card} />
            ))}
          </div>
          <div className={st.solutions_deliver__slider}>
            <Swiper
              observer
              observeParents
              centeredSlides
              slidesPerView={1.22}
              spaceBetween={16}
              onSwiper={(instance) => {
                swiperRef.current = instance;
              }}
              className={st.solutions_deliver__swiper}
            >
              {CARDS.map((card) => (
                <SwiperSlide key={card.value}>
                  <Card card={card} />
                </SwiperSlide>
              ))}
            </Swiper>
            <div className={st.solutions_deliver__nav}>
              <button
                type="button"
                className={st.solutions_deliver__nav_prev}
                aria-label="Previous slide"
                onClick={() => swiperRef.current?.slidePrev()}
              >
                <span className="rotate-180">
                  <SliderChevron />
                </span>
              </button>
              <button
                type="button"
                className={st.solutions_deliver__nav_next}
                aria-label="Next slide"
                onClick={() => swiperRef.current?.slideNext()}
              >
                <SliderChevron />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
