'use client';

import { createContext, useContext, useState } from 'react';

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

  const setLabelOverride = (segment: string, label: string) => {
    setLabelOverrides((prev) => ({ ...prev, [segment]: label }));
  };

  return (
    <BreadcrumbsContext.Provider value={{ labelOverrides, setLabelOverride }}>
      {children}
    </BreadcrumbsContext.Provider>
  );
};

export const useBreadcrumbsContext = () => useContext(BreadcrumbsContext);
