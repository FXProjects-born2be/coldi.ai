'use client';

import { type ReactNode } from 'react';

import st from './Selected.module.scss';

export const Selected = ({ children }: { children: ReactNode }) => {
  return (
    <span className={st.selected}>
      {children}
      {/* <svg
        className={st.icon}
        onClick={onDelete}
        xmlns="http://www.w3.org/2000/svg"
        width="14"
        height="14"
        viewBox="0 0 14 14"
        fill="none"
      >
        <path
          d="M3.73268 11.0834L2.91602 10.2667L6.18268 7.00008L2.91602 3.73341L3.73268 2.91675L6.99935 6.18342L10.266 2.91675L11.0827 3.73341L7.81602 7.00008L11.0827 10.2667L10.266 11.0834L6.99935 7.81675L3.73268 11.0834Z"
          fill="white"
        />
      </svg> */}
    </span>
  );
};
