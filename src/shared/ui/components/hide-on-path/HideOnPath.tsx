'use client';

import { usePathname } from 'next/navigation';

import type { ReactNode } from 'react';

const HIDDEN_PATHS = ['/calendar'];

const isHiddenPath = (pathname: string) =>
  HIDDEN_PATHS.some((path) => pathname === path || pathname.startsWith(`${path}/`));

export const HideOnPath = ({ children }: { children: ReactNode }) => {
  const pathname = usePathname() ?? '';

  if (isHiddenPath(pathname)) return null;

  return children;
};
