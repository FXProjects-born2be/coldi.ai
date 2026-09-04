import { cn } from '@/shared/lib/helpers';

import st from '../IconTimerTwo/IconTimerTwo.module.scss';

type IconTimerThreeProps = {
  active?: boolean;
};

export const IconTimerThree = ({ active }: IconTimerThreeProps) => (
  <svg
    className={cn(st.icon_timer_two, active && st.icon_timer_two_active)}
    xmlns="http://www.w3.org/2000/svg"
    width="382"
    height="389"
    viewBox="0 0 382 389"
    fill="none"
    aria-hidden
  >
    <g opacity="0.5" filter="url(#icon-timer-three-shadow)">
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M121.364 246.879C20.9794 304.136 -155.635 299.242 -198.735 163.425C-241.835 27.6072 -200.734 -97.5531 -100.35 -154.81C0.034861 -212.067 161.788 -245.643 220.53 -75.7131C252.996 46.6091 221.749 189.622 121.364 246.879Z"
        fill="#4268FF"
      />
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M238.199 48.9904C238.199 166.002 147.579 320.182 9.97075 291.933C-127.638 263.683 -214.901 166.002 -214.901 48.9904C-214.901 -68.0211 -201.071 -209.542 -26.5429 -178.468C94.2839 -147.394 238.199 -68.0211 238.199 48.9904Z"
        fill="#4268FF"
      />
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M-47.262 268.122C-158.446 237.837 -281.494 108.952 -219.036 -18.8561C-156.578 -146.664 -54.4045 -221.644 56.7799 -191.359C167.964 -161.074 320.034 -55.6969 245.336 107.631C184.537 218.23 63.9224 298.407 -47.262 268.122Z"
        fill="#4268FF"
      />
      <g className={st.icon_timer_two__shape} filter="url(#icon-timer-three-core)">
        <path
          d="M-170.76 48.1786C-170.76 -53.5626 -88.2822 -136.04 13.459 -136.04C115.2 -136.04 197.678 -53.5626 197.678 48.1786C197.678 149.92 115.2 232.397 13.459 232.397C-88.2822 232.397 -170.76 149.92 -170.76 48.1786Z"
          fill="#F6F6F6"
        />
      </g>
    </g>
    <defs>
      <filter
        id="icon-timer-three-shadow"
        x="-432.246"
        y="-383.715"
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
        id="icon-timer-three-core"
        x="-236.26"
        y="-193.353"
        width="499.438"
        height="499.438"
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
