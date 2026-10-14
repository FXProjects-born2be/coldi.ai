'use client';

import { useState } from 'react';

import { cn } from '@/shared/lib/helpers';

import { type ArticleFaqItem, slugifyHeading } from '../../lib';
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
        Frequently asked questions
      </h2>

      <div className={st.list}>
        {items.map((item, index) => {
          const isOpen = openIndex === index;
          const questionId = slugifyHeading(item.question);

          return (
            <div key={item.question} id={questionId} className={st.item}>
              <button
                type="button"
                className={st.trigger}
                aria-expanded={isOpen}
                aria-controls={`${questionId}-answer`}
                onClick={() => setOpenIndex(isOpen ? null : index)}
              >
                <h3 className={st.question}>{item.question}</h3>
                <span className={st.icon} aria-hidden>
                  {isOpen ? '−' : '+'}
                </span>
              </button>

              <p
                id={`${questionId}-answer`}
                className={cn(st.answer, !isOpen && st.answerCollapsed)}
              >
                {item.answer}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
};
