'use client';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import st from './Option.module.scss';

export const Option = ({
  children,
  selected,
  onClick,
}: {
  children: ReactNode;
  selected?: boolean;
  onClick?: () => void;
}) => (
  <button className={cn(st.option, selected && st.selected)} onClick={onClick}>
    {children}
  </button>
);
