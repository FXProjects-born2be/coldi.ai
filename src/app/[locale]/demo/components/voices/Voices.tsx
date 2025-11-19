'use client';
//import Image from 'next/image';
//import Link from 'next/link';

import { motion } from 'framer-motion';

import { getVoices } from '@/features/voices/model/voices';
import { VoiceCard } from '@/features/voices/ui/voice-card';

import { blurInUp } from '@/shared/lib/helpers/animations';

import st from './Voices.module.scss';

export const Voices = () => {
  const items = getVoices();

  /*const images = [
    '/images/home/voices/temp1.png',
    '/images/home/voices/temp2.png',
    '/images/home/voices/temp3.png',
  ];*/

  return (
    <section className={st.voices}>
      <motion.h2
        variants={blurInUp}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        Meet the Voices Behind Coldi
      </motion.h2>
      <section className={st.voices__list}>
        {items.map((item, index) => (
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            key={item.name}
            viewport={{ once: true }}
            custom={index * 0.2}
          >
            <VoiceCard {...item} />
          </motion.div>
        ))}
      </section>
      {/* Temporary disabled images: 
      <section className={`${st.voices__list} ${st.images}`}>
        {images.map((imgUrl, index) => (
          <motion.div
            variants={blurInUp}
            initial="hidden"
            whileInView="visible"
            key={imgUrl}
            viewport={{ once: true }}
            custom={index * 0.2}
          >
            <article className={st.container}>
              <Image
                src={imgUrl}
                alt={imgUrl.split('/').pop() || ''}
                width={509}
                height={484}
                unoptimized
              />
            </article>
          </motion.div>
        ))}
        <Link href={`/voices`}>
          <Button fullWidth>Check more voices</Button>
        </Link>
      </section>*/}
    </section>
  );
};
