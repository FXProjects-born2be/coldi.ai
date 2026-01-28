'use client';

import Link from 'next/link';

import { motion } from 'framer-motion';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Files.module.scss';

export const Files = () => {
  return (
    <>
      <section className={st.layout}>
        <div className={st.files}>
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.file}
          >
            <div>
              <h3>Terms of Service</h3>
              <p>PDF ・ Last updated 14 January 2026</p>
            </div>
            <Link href="/terms-of-service.pdf" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                  fill="#0C1021"
                />
              </svg>
              Download
            </Link>
          </motion.div>
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className={st.file}
          >
            <div>
              <h3>Privacy Policy</h3>
              <p>PDF ・ Last updated 27 January 2026</p>
            </div>
            <Link href="/privacy-policy.pdf" target="_blank">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M12 16L7 11L8.4 9.55L11 12.15V4H13V12.15L15.6 9.55L17 11L12 16ZM6 20C5.45 20 4.97933 19.8043 4.588 19.413C4.19667 19.0217 4.00067 18.5507 4 18V15H6V18H18V15H20V18C20 18.55 19.8043 19.021 19.413 19.413C19.0217 19.805 18.5507 20.0007 18 20H6Z"
                  fill="#0C1021"
                />
              </svg>
              Download
            </Link>
          </motion.div>
        </div>
      </section>
    </>
  );
};
