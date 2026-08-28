import Image from 'next/image';

import st from './SolutionsDeliver.module.scss';

const CARDS = [
  {
    value: '56.5%',
    image: { src: '/images/solutions/deliver-one.svg', width: 262, height: 191 },
    title: 'of calls become conversations',
    description:
      'Coldi agents turn more than half of answered calls into meaningful conversations with the customer.',
  },
  {
    value: '33.3%',
    image: { src: '/images/solutions/deliver-two.svg', width: 268, height: 178 },
    title: 'of conversations move to the next stage',
    description:
      'One in three conversations results in clear customer interest and a defined next step.',
  },
  {
    value: '17.6%',
    image: { src: '/images/solutions/deliver-three.png', width: 301, height: 156 },
    title: 'of conversations result in a scheduled callback',
    description:
      'Coldi AI agents convert qualified conversations into scheduled follow-ups with the right specialist.',
  },
];

export const SolutionsDeliver = () => {
  return (
    <section className={st.solutions_deliver}>
      <div className="container">
        <div className={st.solutions_deliver__panel}>
          <h2 className={st.solutions_deliver__title}>What Coldi Agents Deliver</h2>
          <div className={st.solutions_deliver__grid}>
            {CARDS.map((card) => (
              <article key={card.value} className={st.solutions_deliver__card}>
                <div className={st.solutions_deliver__media}>
                  <Image
                    src={card.image.src}
                    alt="Image"
                    width={card.image.width}
                    height={card.image.height}
                  />
                </div>
                <p className={st.solutions_deliver__value}>{card.value}</p>
                <h3 className={st.solutions_deliver__card_title}>{card.title}</h3>
                <p className={st.solutions_deliver__card_text}>{card.description}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};
