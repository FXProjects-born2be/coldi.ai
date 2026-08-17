import Image from 'next/image';
import Link from 'next/link';

import st from './ReadyToHear.module.scss';

export const ReadyToHear = () => (
  <section className={st.ready_to_hear}>
    <div className="container">
      <div className={st.ready_to_hear__inner}>
        <div>
          <h2 className={st.ready_to_hear__title}>Ready to go?</h2>
          <p className={st.ready_to_hear__subtitle}>
            Explore Coldi voices and find your perfect call agent!
          </p>
          <Link href="/call-request" className={`btn btn-primary ${st.ready_to_hear__cta}`}>
            Book demo
          </Link>
        </div>
        <Image
          src="/images/news/news-ready.png"
          alt="Image"
          className={st.ready_to_hear__image}
          width={850}
          height={308}
          layout="lazy"
        />
      </div>
    </div>
  </section>
);
