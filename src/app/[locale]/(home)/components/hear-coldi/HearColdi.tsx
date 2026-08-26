import { getBots } from '@/features/bots/model/bots';
import { BotCard } from '@/features/bots/ui/bot-card/BotCard';

import st from './HearColdi.module.scss';

export const HearColdi = () => {
  const cards = getBots();

  return (
    <section className={st.layout}>
      <h2>Hear Coldi in Action</h2>
      <section className={st.cards}>
        {cards.map((card) => (
          <div key={card.name}>
            <BotCard {...card} />
          </div>
        ))}
      </section>
    </section>
  );
};
