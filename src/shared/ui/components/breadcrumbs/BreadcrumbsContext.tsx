'use client';

import { createContext, useCallback, useContext, useMemo, useState } from 'react';

type BreadcrumbsContextType = {
  labelOverrides: Record<string, string>;
  setLabelOverride: (segment: string, label: string) => void;
};

const BreadcrumbsContext = createContext<BreadcrumbsContextType>({
  labelOverrides: {},
  setLabelOverride: () => {},
});

export const BreadcrumbsProvider = ({ children }: { children: React.ReactNode }) => {
  const [labelOverrides, setLabelOverrides] = useState<Record<string, string>>({});

  const setLabelOverride = useCallback((segment: string, label: string) => {
    setLabelOverrides((prev) => {
      if (prev[segment] === label) {
        return prev;
      }

      return { ...prev, [segment]: label };
    });
  }, []);

  const value = useMemo(
    () => ({
      labelOverrides,
      setLabelOverride,
    }),
    [labelOverrides, setLabelOverride]
  );

  return <BreadcrumbsContext.Provider value={value}>{children}</BreadcrumbsContext.Provider>;
};

export const useBreadcrumbsContext = () => useContext(BreadcrumbsContext);
