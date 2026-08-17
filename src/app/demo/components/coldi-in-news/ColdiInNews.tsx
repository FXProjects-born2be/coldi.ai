'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './ColdiInNews.module.scss';

const brands = [
  { src: '/images/home/logos/bloomberg.svg', alt: 'Bloomberg' },
  { src: '/images/home/logos/entrepreneur.svg', alt: 'Entrepreneur' },
  { src: '/images/home/logos/forbes.svg', alt: 'Forbes' },
  { src: '/images/home/logos/yahoo.svg', alt: 'Yahoo' },
];

export const ColdiInNews = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={st.title}
      >
        Coldi Featured in News
      </motion.h2>
      <motion.div
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
        className={st.brands}
      >
        {brands.map((brand) => (
          <Image key={brand.alt} src={brand.src} alt={brand.alt} width={160} height={40} />
        ))}
      </motion.div>
    </section>
  );
};
