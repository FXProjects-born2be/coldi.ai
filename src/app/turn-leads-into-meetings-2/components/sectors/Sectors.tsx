'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Sectors.module.scss';

export const Sectors = () => {
  return (
    <>
      <section className={st.layout}>
        <div className={st.header}>
          <motion.h2
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Sectors We Work With
          </motion.h2>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Built for service businesses with real call volume
          </motion.p>
        </div>
        <div className={st.row}>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/sector-1.svg"
              alt="BPO & Call Centers"
              width={96}
              height={96}
            />
            <h3>BPO & Call Centers</h3>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src="/images/leads/sector-2.svg" alt="Insurance" width={96} height={96} />
            <h3>Insurance</h3>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src="/images/leads/sector-3.svg" alt="Fintech" width={96} height={96} />
            <h3>Fintech</h3>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/sector-4.svg"
              alt="Field Service Management"
              width={96}
              height={96}
            />
            <h3>Field Service Management</h3>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src="/images/leads/sector-5.svg" alt="Healthcare" width={96} height={96} />
            <h3>Healthcare</h3>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image src="/images/leads/sector-6.svg" alt="Real Estate" width={96} height={96} />
            <h3>Real Estate</h3>
          </motion.div>
          <motion.div
            className={st.item}
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <Image
              src="/images/leads/sector-7.svg"
              alt="If your business depends on outbound or inbound calls, this fits!"
              width={384}
              height={96}
            />
            <h3>
              If your <b>business depends</b> on <b>outbound</b> or <b>inbound calls, this fits!</b>
            </h3>
          </motion.div>
        </div>
      </section>
    </>
  );
};
