'use client';

import { Autoplay, Pagination } from 'swiper/modules';
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
      'We were skeptical at first, but the improvement in engagement and the sheer volume Coldi can handle completely changed our minds. What surprised us most was how smoothly it integrated into our workflow – with no disruption and no learning curve. It just started working. It’s now a key part of how we run outreach.',
    name: 'Lara Jensen',
    position: 'Growth Manager',
    company: 'SilverPoint Media',
  },
  {
    title:
      'We saw a 40% drop in manual call workload within weeks, and Coldi now handles all our initial outreach.',
    review:
      'It’s not perfect – we still fine-tune it for specific edge cases – but the time and cost savings have been undeniable. What really impressed us was how quickly Coldi became part of our process. No heavy setup, no disruption – just real results from day one.',
    name: 'Alan Rodrigues',
    position: 'Director of Customer Operations',
    company: 'BrightLane Energy',
  },
  {
    title:
      'Coldi helped us engage leads faster than ever—our average response time dropped to under a minute.',
    review:
      'There’s still room to refine tone for niche cases, but overall, we’ve seen a clear lift in qualified appointments – and the integration was smoother than we expected. Coldi quickly became a natural part of our process.',
    name: 'Nina Feldman',
    position: 'Sales Operations Director',
    company: 'Beaconware CRM',
  },
  {
    title: 'Coldi is what helped us take our calls to a whole new level.',
    review:
      'Hundreds of calls, Coldi keeps consistent performance throughout the day. The results of the first month are amazing. We got +8,74% in conversion rate, just imagine. No other tweak in our work has ever provided the same result. We got +8,74% of customers saying yes to us. Bravo, Coldi!',
    name: 'Alex Moreno',
    position: 'Head of Sales',
    company: 'LightBridge Solutions',
  },
  {
    title:
      'We used to miss a lot of follow-ups, and clients would get frustrated repeating themselves. Coldi changed that fast.',
    review:
      'Now every call gets handled, and people feel heard the first time. We witness an 11% increase in customer satisfaction — and honestly, that says it all.',
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
      spaceBetween={24}
      pagination={pagination}
      modules={[Pagination, Autoplay]}
      autoplay={{ delay: 5000, disableOnInteraction: false }}
      loop
      grabCursor
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
