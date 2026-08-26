'use client';

import Image from 'next/image';
import Link from 'next/link';

import { motion } from 'framer-motion';

import { imageAlt } from '@/shared/constants/page-image-alt';
import { blurInUp } from '@/shared/lib/helpers';
import { Button } from '@/shared/ui/kit/button';

import st from './Infrastructure.module.scss';

export const Infrastructure = () => {
  return (
    <section className={st.layout}>
      <div className={st.content}>
        <motion.div
          className={st.card}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3>Reliable Infrastructure for Healthcare Communication</h3>
          <p>
            Healthcare communication requires stability, consistency, and accuracy. Coldi.ai
            operates on enterprise-grade telephony infrastructure designed to support high
            availability and reliable call performance. <br />
            <br />
            From call routing to conversation tracking and documentation, every interaction is
            structured to support healthcare operations at scale, ensuring teams always have
            visibility and control over patient communication workflows.
          </p>
          <Link href="#demo">
            <Button size="md">Book a Demo</Button>
          </Link>
        </motion.div>

        <motion.div
          className={st.illustration}
          variants={blurInUp}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <Image
            src="/images/healthcare/infrastructure.svg"
            alt={imageAlt(
              'debtCollection',
              'Enterprise infrastructure for collections communication'
            )}
            width={427}
            height={427}
            unoptimized
          />
        </motion.div>
      </div>
    </section>
  );
};
