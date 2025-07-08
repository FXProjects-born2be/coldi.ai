'use client';

import st from './BurgerMenu.module.scss';

export const BurgerMenu = () => {
  return (
    <button className={st.burger}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
      >
        <path
          d="M3 6H21M3 12H21M3 18H21"
          stroke="#0C1021"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </button>
  );
};
