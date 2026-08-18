'use client';

import { useEffect, useState } from 'react';

const phrases = ['Insurance Brokers', 'Trading Platforms', 'Debt Collection', 'Sales Teams'];

const PHRASE_DURATION_MS = 3000;

export const HeroRotatingPhrase = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % phrases.length);
    }, PHRASE_DURATION_MS);

    return () => window.clearInterval(id);
  }, []);

  return (
    <span key={phrases[index]} style={{ animationDuration: `${PHRASE_DURATION_MS}ms` }}>
      {phrases[index]}
    </span>
  );
};
