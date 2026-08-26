'use client';

import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers';

import st from './OtherIndustries.module.scss';

const columns = [
  [
    { icon: '/images/industries/icon-technology.svg', label: 'Technology' },
    { icon: '/images/industries/icon-retail.svg', label: 'Retail' },
    { icon: '/images/industries/icon-manufacturing.svg', label: 'Manufacturing' },
  ],
  [
    { icon: '/images/industries/icon-consulting.svg', label: 'Consulting' },
    { icon: '/images/industries/icon-nonprofit.svg', label: 'Non-profit' },
    { icon: '/images/industries/icon-ecommerce.svg', label: 'E-commerce' },
    { icon: '/images/industries/icon-nonprofit.svg', label: 'Entertainment' },
  ],
  [
    { icon: '/images/industries/icon-consulting.svg', label: 'Education' },
    { icon: '/images/industries/icon-nonprofit.svg', label: 'Telecommunications' },
    { icon: '/images/industries/icon-ecommerce.svg', label: 'Hospitality' },
  ],
];

export const OtherIndustries = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Other industries we work with
      </motion.h2>

      <div className={st.grid}>
        {columns.map((column, colIndex) => (
          <div key={colIndex} className={st.column}>
            {column.map((item) => (
              <motion.div
                key={item.label}
                className={st.card}
                variants={blurInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
              >
                <div className={st.iconWrap}>
                  <Image src={item.icon} alt={item.label} width={48} height={48} unoptimized />
                </div>
                <p>{item.label}</p>
              </motion.div>
            ))}
          </div>
        ))}
      </div>
    </section>
  );
};
