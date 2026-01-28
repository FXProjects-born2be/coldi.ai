'use client';
import Image from 'next/image';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Details.module.scss';

export const Details = () => {
  return (
    <section className={st.layout}>
      <div className={st.row}>
        <div className={st.col}>
          <motion.h3
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            AI Is No Longer Optional
          </motion.h3>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            The average call center handles over 4,000 calls per month, yet many still miss dozens
            daily due to overload. Traditional call centers can no longer keep up. Delayed
            responses, dropped calls, and overwhelmed agents lead to missed opportunities and lost
            revenue. AI is no longer an innovation - it&apos;s a necessity.
          </motion.p>
        </div>
        <motion.div
          className={st.img}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src={'/images/about/about1.png'} alt="Outbound Calling" width={427} height={506} />
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
            Coldi Is Not Just a Product - It’s a Process
          </motion.h3>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Many companies offer AI call center tools. Few take responsibility for making them
            actually work. Coldi is not a plug-and-play solution that performs miracles on its own.
            To bring results, it needs to be trained, configured, and integrated - and that’s
            exactly what our team does for you.
          </motion.p>
        </div>
        <motion.div
          className={st.img}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src={'/images/about/about2.png'} alt="Outbound Calling" width={516} height={515} />
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
            Seamless Integration <br />
            Without Disruption
          </motion.h3>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            AI should fit into your workflow, not replace it. Coldi is built to work with the tools
            your team already uses - calendars, CRMs, ticketing systems, or booking tools. No extra
            platforms, no tech headaches. We prioritize practical deployment, not technical
            complexity.
          </motion.p>
        </div>
        <motion.div
          className={st.img}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src={'/images/about/about3.png'} alt="Outbound Calling" width={564} height={564} />
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
            Our Expertise <br />
            Behind Every Call
          </motion.h3>
          <motion.p
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Coldi isn’t just software - it’s supported by a team that knows how real business works.
            We make sure AI fits into your workflow and helps you get things done.
          </motion.p>
        </div>
        <motion.div
          className={st.img}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image src={'/images/about/about4.png'} alt="Outbound Calling" width={427} height={309} />
        </motion.div>
      </div>
    </section>
  );
};
