'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './ColdiAgentsBuilt.module.scss';

export const ColdiAgentsBuilt = () => {
  return (
    <section className={st.layout}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Coldi Agents Built <br />
        <span className={st.highlighted}>for Your Business</span>
      </motion.h2>
      <div className={st.row}>
        <div className={st.col}>
          <motion.h3
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Real Estate
          </motion.h3>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Qualify inquiries, arrange property viewings, confirm availability, and update CRM – all
            in real time, 24/7.
          </motion.p>
        </div>
        <motion.div
          className={st.img}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src={'/images/products/real-estate.png'}
            alt="Outbound Calling"
            width={494}
            height={338}
          />
        </motion.div>
      </div>
      <div className={st.row}>
        <div className={st.col}>
          <motion.h3
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Investments
          </motion.h3>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Deliver pre-approved market updates, handle FAQs, and route high-value leads to your
            team – automatically.
          </motion.p>
        </div>
        <motion.div
          className={st.img}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src={'/images/products/investments.png'}
            alt="Outbound Calling"
            width={427}
            height={324}
          />
        </motion.div>
      </div>
      <div className={st.row}>
        <div className={st.col}>
          <motion.h3
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Tech Support
          </motion.h3>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Resolve common issues with voice-first troubleshooting, log detailed tickets, and
            escalate priority cases – without hold times or missed calls.
          </motion.p>
        </div>
        <motion.div
          className={st.img}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src={'/images/products/tech-support.png'}
            alt="Outbound Calling"
            width={395}
            height={422}
          />
        </motion.div>
      </div>
    </section>
  );
};
