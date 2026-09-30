'use client';

import { useState } from 'react';

import type { ArticleFaqItem } from '../../lib';
import st from './ArticleFaq.module.scss';

type ArticleFaqProps = {
  items: ArticleFaqItem[];
};

export const ArticleFaq = ({ items }: ArticleFaqProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (!items.length) return null;

  return (
    <section className={st.faq}>
      <h2 id="faq" className={st.title}>
        FAQ
      </h2>

      <div className={st.list}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;

          return (
            <div key={item.question} className={st.item}>
              <button
                type="button"
                className={st.trigger}
                aria-expanded={isOpen}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <span className={st.question}>{item.question}</span>
                <span className={st.icon} aria-hidden>
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              {isOpen ? <p className={st.answer}>{item.answer}</p> : null}
            </div>
          );
        })}
      </div>
    </section>
  );
};
