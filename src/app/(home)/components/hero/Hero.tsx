import Image from 'next/image';
import Link from 'next/link';

import st from './Hero.module.scss';

const rings = [
  { src: '/images/home/one.svg', width: 1440, height: 676 },
  { src: '/images/home/two.svg', width: 1440, height: 676 },
  { src: '/images/home/three.svg', width: 1440, height: 676 },
  { src: '/images/home/four.svg', width: 1440, height: 676 },
  { src: '/images/home/five.svg', width: 1372, height: 586 },
  { src: '/images/home/six.svg', width: 1098, height: 449 },
  { src: '/images/home/seven.svg', width: 1143, height: 472 },
  { src: '/images/home/eight.svg', width: 915, height: 357 },
  { src: '/images/home/nine.svg', width: 686, height: 243 },
];

export const Hero = () => {
  return (
    <section className={st.hero}>
      <div className={st.hero__bg} aria-hidden>
        {rings.map((ring, index) => (
          <div
            key={ring.src}
            className={st.hero__ring}
            style={{
              animationDelay: `${index * 0.35}s, ${index * 0.45}s`,
            }}
          >
            <Image
              src={ring.src}
              alt=""
              width={ring.width}
              height={ring.height}
              style={{ width: `${(ring.width / 1440) * 100}%`, height: 'auto' }}
            />
          </div>
        ))}
      </div>
      <div className={st.hero__glow} aria-hidden />

      <div className={`container ${st.hero__content}`}>
        <h1 className={st.hero__title}>
          AI Workforce
          <br />
          Built for the next generation of <br />
          <span>Insurance brokers</span>
        </h1>
        <p className={st.hero__subtitle}>
          Production-ready AI voice agents, fully managed from day one.
        </p>

        <div className="text-center">
          <Link href="/products" className="btn btn-primary d-inline-block">
            Book a Demo
          </Link>
        </div>
      </div>
    </section>
  );
};
