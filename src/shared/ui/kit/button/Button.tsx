'use client';

import type { ButtonHTMLAttributes } from 'react';

import { cn } from '@/shared/lib/helpers/styles';

import st from './Button.module.scss';

export const Button = ({
  children,
  className,
  variant = 'primary',
  fullWidth = false,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: 'primary' | 'secondary' | 'success';
  fullWidth?: boolean;
}) => {
  return (
    <button
      className={cn(st.button, st[variant], fullWidth ? st.fullWidth : st.defaultWidth, className)}
      {...props}
    >
      {children}
    </button>
  );
};
