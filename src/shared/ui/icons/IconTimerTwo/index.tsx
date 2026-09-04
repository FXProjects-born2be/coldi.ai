import { cn } from '@/shared/lib/helpers';

import st from './IconTimerTwo.module.scss';

type IconTimerTwoProps = {
  active?: boolean;
};

export const IconTimerTwo = ({ active }: IconTimerTwoProps) => (
  <svg
    className={cn(st.icon_timer_two, active && st.icon_timer_two_active)}
    xmlns="http://www.w3.org/2000/svg"
    width="678"
    height="327"
    viewBox="0 0 678 327"
    fill="none"
    aria-hidden
  >
    <g filter="url(#icon-timer-two-shadow)">
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M437.369 507.951C344.647 560.837 181.515 556.317 141.705 430.867C101.895 305.417 139.858 189.811 232.58 136.925C325.301 84.0392 474.707 53.0256 528.965 209.984C558.952 322.969 530.09 455.065 437.369 507.951Z"
        fill="white"
      />
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M545.286 325.168C545.286 433.247 461.584 575.658 334.48 549.565C207.376 523.472 126.773 433.247 126.773 325.168C126.773 217.089 139.548 86.3706 300.753 115.073C412.357 143.774 545.286 217.089 545.286 325.168Z"
        fill="white"
      />
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M281.614 527.572C178.917 499.599 65.2623 380.552 122.953 262.501C180.643 144.449 275.017 75.193 377.714 103.166C480.411 131.139 620.872 228.472 551.876 379.333C495.719 481.489 384.311 555.545 281.614 527.572Z"
        fill="white"
      />
      <g className={st.icon_timer_two__shape} filter="url(#icon-timer-two-core)">
        <path
          d="M167.544 324.418C167.544 230.444 243.725 154.262 337.7 154.262C431.675 154.262 507.856 230.444 507.856 324.418C507.856 418.393 431.675 494.575 337.7 494.575C243.725 494.575 167.544 418.393 167.544 324.418Z"
          fill="url(#icon-timer-two-fill)"
        />
      </g>
    </g>
    <defs>
      <filter
        id="icon-timer-two-shadow"
        x="-73.9809"
        y="-74.5067"
        width="819.745"
        height="819.745"
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
          radius="16.777"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="13.4216" />
        <feGaussianBlur stdDeviation="45.2978" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.259615 0 0 0 0 0.407692 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <filter
        id="icon-timer-two-core"
        x="107.044"
        y="101.325"
        width="461.313"
        height="461.313"
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
          radius="9.45312"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="7.5625" />
        <feGaussianBlur stdDeviation="25.5234" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.627451 0 0 0 0 0.6 0 0 0 0 1 0 0 0 0.2 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <linearGradient
        id="icon-timer-two-fill"
        x1="337.7"
        y1="154.262"
        x2="337.7"
        y2="494.575"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#3B5F99" />
        <stop offset="1" stopColor="#396BA4" />
      </linearGradient>
    </defs>
  </svg>
);
