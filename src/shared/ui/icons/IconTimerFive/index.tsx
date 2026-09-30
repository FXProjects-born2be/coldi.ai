import { cn } from '@/shared/lib/helpers';

import st from '../IconTimerTwo/IconTimerTwo.module.scss';

type IconTimerFiveProps = {
  active?: boolean;
};

export const IconTimerFive = ({ active }: IconTimerFiveProps) => (
  <svg
    className={cn(st.icon_timer_two, active && st.icon_timer_two_active)}
    xmlns="http://www.w3.org/2000/svg"
    width="358"
    height="282"
    viewBox="0 0 358 282"
    fill="none"
    aria-hidden
  >
    <g opacity="0.5" filter="url(#icon-timer-five-shadow)">
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M245.087 333.317C184.244 368.02 77.1965 365.054 51.0733 282.734C24.9501 200.414 49.8614 124.554 110.705 89.8501C171.549 55.1464 269.589 34.7953 305.193 137.791C324.87 211.931 305.931 298.613 245.087 333.317Z"
        fill="#4268FF"
      />
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M315.904 213.375C315.904 284.296 260.978 377.746 177.573 360.624C94.1676 343.502 41.2764 284.296 41.2764 213.375C41.2764 142.453 49.6593 56.6763 155.442 75.5106C228.676 94.3446 315.904 142.453 315.904 213.375Z"
        fill="#4268FF"
      />
      <path
        className={st.icon_timer_two__shape}
        opacity="0.5"
        d="M142.882 346.192C75.4928 327.836 0.912717 249.718 38.7691 172.253C76.6254 94.7875 138.553 49.3416 205.943 67.6974C273.333 86.0532 365.503 149.923 320.228 248.917C283.378 315.952 210.272 364.548 142.882 346.192Z"
        fill="#4268FF"
      />
      <g className={st.icon_timer_two__shape} filter="url(#icon-timer-five-core)">
        <path
          d="M68.0312 212.883C68.0312 151.217 118.021 101.227 179.688 101.227C241.354 101.227 291.344 151.217 291.344 212.883C291.344 274.549 241.354 324.539 179.688 324.539C118.021 324.539 68.0312 274.549 68.0312 212.883Z"
          fill="#F6F6F6"
          shapeRendering="crispEdges"
        />
      </g>
    </g>
    <defs>
      <filter
        id="icon-timer-five-shadow"
        x="-90.4577"
        y="-48.8912"
        width="537.915"
        height="537.915"
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
          radius="11.009"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="8.80721" />
        <feGaussianBlur stdDeviation="29.7243" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix
          type="matrix"
          values="0 0 0 0 0.259615 0 0 0 0 0.407692 0 0 0 0 1 0 0 0 1 0"
        />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
      <filter
        id="icon-timer-five-core"
        x="28.3312"
        y="66.4891"
        width="302.713"
        height="302.713"
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
          radius="6.20313"
          operator="dilate"
          in="SourceAlpha"
          result="effect1_dropShadow"
        />
        <feOffset dy="4.9625" />
        <feGaussianBlur stdDeviation="16.7484" />
        <feComposite in2="hardAlpha" operator="out" />
        <feColorMatrix type="matrix" values="0 0 0 0 0.627451 0 0 0 0 0.6 0 0 0 0 1 0 0 0 0.2 0" />
        <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow" />
        <feBlend mode="normal" in="SourceGraphic" in2="effect1_dropShadow" result="shape" />
      </filter>
    </defs>
  </svg>
);
