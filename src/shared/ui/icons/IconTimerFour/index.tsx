import { cn } from '@/shared/lib/helpers';

import st from '../IconTimerTwo/IconTimerTwo.module.scss';

type IconTimerFourProps = {
  active?: boolean;
};

export const IconTimerFour = ({ active }: IconTimerFourProps) => (
  <svg
    className={cn(st.icon_timer_two, active && st.icon_timer_two_active)}
    xmlns="http://www.w3.org/2000/svg"
    width="376"
    height="389"
    viewBox="0 0 376 389"
    fill="none"
    aria-hidden
  >
    <g opacity="0.5" filter="url(#icon-timer-four-shadow)">
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M473.514 528.879C373.13 586.136 196.515 581.242 153.415 445.425C110.315 309.607 151.416 184.447 251.801 127.19C352.185 69.9334 513.939 36.3568 572.681 206.287C605.146 328.609 573.899 471.622 473.514 528.879Z"
        fill="#4268FF"
      />
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M590.35 330.99C590.35 448.002 499.729 602.182 362.121 573.933C224.513 545.683 137.249 448.002 137.249 330.99C137.249 213.979 151.08 72.4576 325.607 103.532C446.434 134.606 590.35 213.979 590.35 330.99Z"
        fill="#4268FF"
      />
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M304.888 550.122C193.704 519.837 70.6563 390.952 133.114 263.144C195.573 135.336 297.746 60.3562 408.93 90.641C520.115 120.926 672.184 226.303 597.486 389.631C536.688 500.23 416.073 580.407 304.888 550.122Z"
        fill="#4268FF"
      />
      <g className={st.icon_timer_two__shape} filter="url(#icon-timer-four-core)">
        <path
          d="M181.391 330.179C181.391 228.437 263.868 145.96 365.609 145.96C467.351 145.96 549.828 228.437 549.828 330.179C549.828 431.92 467.351 514.397 365.609 514.397C263.868 514.397 181.391 431.92 181.391 330.179Z"
          fill="#F6F6F6"
        />
      </g>
    </g>
    <defs>
      <filter
        id="icon-timer-four-shadow"
        x="-80.0959"
        y="-101.715"
        width="887.492"
        height="887.492"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="18.1635"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="14.5308" />
        <feGaussianBlur stdDeviation="49.0414" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.259615 0 0 0 0 0.407692 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <filter
        id="icon-timer-four-core"
        x="115.891"
        y="88.6474"
        width="499.438"
        height="499.437"
        filterUnits="userSpaceOnUse"
        colorInterpolationFilters="sRGB"
      >
        <feFlood floodOpacity="0" result="BackgroundImageFix" />
        <feColorMatrix
          in="SourceAlpha"
          type="matrix"
          values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
          result="hardAlpha"
        />
        <feMorphology
          radius="10.2344"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="8.1875" />
        <feGaussianBlur stdDeviation="27.6328" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.627451 0 0 0 0 0.6 0 0 0 0 1 0 0 0 0.2 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);
