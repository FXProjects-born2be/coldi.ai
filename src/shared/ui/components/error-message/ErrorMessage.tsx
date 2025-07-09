'use client';

import { type ReactNode } from 'react';

import st from './ErrorMessage.module.scss';

export const ErrorMessage = ({ children }: { children: ReactNode }) => {
  return <p className={st.errorMessage}>{children}</p>;
};
