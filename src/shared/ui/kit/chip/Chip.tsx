'use client';

import type { ReactNode } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import st from './Chip.module.scss';

export const Chip = ({
  children,
  variant = 'primary',
}: {
  children: ReactNode;
  variant?: 'primary' | 'secondary';
}) => <span className={cn(st.chip, st[variant])}>{children}</span>;
