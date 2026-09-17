'use client';

import { useEffect, useRef } from 'react';

import st from './ArticleSummarizeWithAi.module.scss';

export const ArticleSummarizeWithAi = ({ url }: { url: string }) => {
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = rootRef.current;
    if (!root) return undefined;

    let cancelled = false;

    void import('summarize-with-ai').then(({ SummarizeWidget }) => {
      if (cancelled || !rootRef.current) return;

      SummarizeWidget.init({
        target: root,
        theme: 'light',
        mode: 'content',
        preferSelection: false,
        extractContent: () => url,
        promptPrefix: 'Summarize this article:',
      });
    });

    return () => {
      cancelled = true;
    };
  }, [url]);

  return <div ref={rootRef} className={st.root} />;
};
