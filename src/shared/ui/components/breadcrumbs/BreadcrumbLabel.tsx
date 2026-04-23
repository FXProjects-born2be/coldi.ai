'use client';

import { useEffect } from 'react';

import { useBreadcrumbsContext } from './BreadcrumbsContext';

export const BreadcrumbLabel = ({ segment, label }: { segment: string; label: string }) => {
  const { setLabelOverride } = useBreadcrumbsContext();

  useEffect(() => {
    setLabelOverride(segment, label);
  }, [label, segment, setLabelOverride]);

  return null;
};
