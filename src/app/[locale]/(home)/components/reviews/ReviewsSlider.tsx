'use client';

import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import st from './Reviews.module.scss';

import './ReviewsSlider.css';

import 'swiper/css';
import 'swiper/css/pagination';

const slides = [
  {
    title:
      'Coldi cut our sales response time by 70% and helped us reconnect with leads we’d already written off.',
    review:
      'We were skeptical at first, but the improvement in engagement and the sheer volume Coldi handled changed our minds. It integrated into our workflow and just started working.',
    name: 'Lara Jensen',
    position: 'Growth Manager',
    company: 'SilverPoint Media',
  },
  {
    title:
      '40% drop in manual call workload within first weeks, and Coldi now handles all our initial outreach.',
    review:
      'It still needs fine-tuning for edge cases, but the time and cost savings are undeniable. For the first time, we’ve significantly reduced our workload.',
    name: 'Alan Rodrigues',
    position: 'Director of Customer Operations',
    company: 'BrightLane Energy',
  },
  {
    title: 'Our average response time dropped to under a minute with Coldi.',
    review:
      'Qualified appointments increased, and we were able to maintain fast response times even during high-volume periods.',
    name: 'Nina Feldman',
    position: 'Sales Operations Director',
    company: 'Beaconware CRM',
  },
  {
    title: 'Coldi boosted our conversion rate by +8,74% in the first month.',
    review:
      'Hundreds of calls, Coldi keeps consistent performance throughout the day. No other tweak in our work has ever provided the same result.',
    name: 'Alex Moreno',
    position: 'Head of Sales',
    company: 'LightBridge Solutions',
  },
  {
    title: '11% increase in customer satisfaction, Coldi helped us stop missing follow-ups.',
    review:
      'We missed a lot of follow-ups, and clients would get frustrated repeating themselves. Now every call gets handled, and people feel finally heard!',
    name: 'Daniela Martines',
    position: 'Client Services Lead',
    company: 'Westmoor Realty',
  },
];

export const ReviewsSlider = () => {
  const pagination = {
    clickable: true,
    renderBullet: (_: number, className: string) => `<span class="${className} bullet"></span>`,
  };

  return (
    <Swiper
      slidesPerView={1}
      spaceBetween={12}
      pagination={pagination}
      modules={[Pagination]}
      loop
      grabCursor
      breakpoints={{
        992: {
          slidesPerView: 2,
          spaceBetween: 12,
        },
        1600: {
          slidesPerView: 3,
          spaceBetween: 12,
        },
      }}
    >
      {slides.map((item) => (
        <SwiperSlide key={item.name}>
          <SliderCard {...item} />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

const SliderCard = ({
  company,
  name,
  position,
  review,
  title,
}: {
  title: string;
  review: string;
  name: string;
  position: string;
  company: string;
}) => {
  return (
    <section className={st.review}>
      <header>
        <h3>{title}</h3>
        <p>{review}</p>
      </header>
      <section className={st.review__info}>
        <p className={st.name}>— {name}</p>
        <span className={st.position}>
          {position} | {company}
        </span>
      </section>
    </section>
  );
};
