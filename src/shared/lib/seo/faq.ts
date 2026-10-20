export type FaqItem = {
  question: string;
  answer: string;
};

type FaqMessages = {
  (key: string): string;
  raw: (key: string) => unknown;
};

const normalizeFaqText = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

/** Build FAQPage items from the same i18n keys the accordion renders. */
export const buildFaqItems = (t: FaqMessages, ids: readonly string[]): FaqItem[] =>
  ids.map((id) => {
    const answerRaw = t.raw(`items.${id}.answer`);
    const answer = Array.isArray(answerRaw) ? answerRaw.join(' ') : String(answerRaw);

    return {
      question: t(`items.${id}.question`),
      answer,
    };
  });

export const getFaqStructuredData = (faqs: FaqItem[]) => ({
  mainEntity: faqs.map(({ question, answer }) => ({
    '@type': 'Question',
    name: normalizeFaqText(question),
    acceptedAnswer: {
      '@type': 'Answer',
      text: normalizeFaqText(answer),
    },
  })),
});
