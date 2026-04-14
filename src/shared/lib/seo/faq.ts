export type FaqItem = {
  question: string;
  answer: string;
};

const normalizeFaqText = (value: string) =>
  value
    .replace(/<[^>]+>/g, ' ')
    .replace(/&nbsp;/gi, ' ')
    .replace(/\s+/g, ' ')
    .trim();

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
