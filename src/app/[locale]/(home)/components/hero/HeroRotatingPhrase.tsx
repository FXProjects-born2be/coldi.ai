'use client';

import { useEffect, useState } from 'react';

import { useLocale, useTranslations } from 'next-intl';

const PHRASE_KEYS = [
  'phrases.insuranceBrokers',
  'phrases.tradingPlatforms',
  'phrases.debtCollection',
  'phrases.salesTeams',
] as const;

const PHRASE_DURATION_MS = 3000;

export const HeroRotatingPhrase = () => {
  const locale = useLocale();

  return <RotatingPhrase key={locale} />;
};

const RotatingPhrase = () => {
  const t = useTranslations('Hero');
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const id = window.setInterval(() => {
      setIndex((current) => (current + 1) % PHRASE_KEYS.length);
    }, PHRASE_DURATION_MS);

    return () => window.clearInterval(id);
  }, []);

  const phrase = t(PHRASE_KEYS[index]);

  return <span style={{ animationDuration: `${PHRASE_DURATION_MS}ms` }}>{phrase}</span>;
};
