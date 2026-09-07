import { cn } from '@/shared/lib/helpers';

import st from './IconHorizonWave.module.scss';

type IconHorizonWaveProps = {
  active?: boolean;
};

export const IconHorizonWave = ({ active }: IconHorizonWaveProps) => (
  <svg
    className={cn(st.icon_horizon_wave, active && st.icon_horizon_wave_active)}
    xmlns="http://www.w3.org/2000/svg"
    width="1280"
    height="178"
    viewBox="0 0 1280 178"
    fill="none"
    aria-hidden
  >
    <path
      className={st.icon_horizon_wave__fill}
      d="M0 76.1365C385.389 79.9792 406.606 -1.1691 615.696 0.526202C619.554 0.526202 623.412 0.526202 627.655 0.526202C846.775 -1.1691 930.488 96.8192 1279.61 83.3698"
      fill="url(#icon-horizon-wave-g0)"
    />
    <path
      className={st.icon_horizon_wave__fill}
      d="M1.15332 65.867C270.485 72.638 338.685 51.7608 453.893 36.9774C537.89 26.1438 631.906 24.7896 719.757 32.4634C918.962 49.9552 1032.24 81.1018 1279.23 50.858V199H1.15332V65.867Z"
      fill="url(#icon-horizon-wave-g1)"
    />
    <path
      className={st.icon_horizon_wave__line}
      d="M1.15332 62.0296C137.553 36.864 312.484 63.6095 601.466 70.3805C613.411 70.7191 625.741 70.8319 638.071 70.7191C854.23 68.6878 1047.27 20.8393 1279.23 34.0428"
      stroke="#2544BD"
      strokeMiterlimit="10"
    />
    <path
      className={st.icon_horizon_wave__line}
      d="M1.15332 76.0229C386.078 79.8598 406.885 -1.16659 616.108 0.526163C619.961 0.526163 623.814 0.526163 628.053 0.526163C846.909 -1.16659 930.521 96.6744 1279.23 83.2453"
      stroke="#C0C4CF"
      strokeMiterlimit="10"
    />
    <path
      className={cn(st.icon_horizon_wave__line, st.icon_horizon_wave__line_blue)}
      d="M1.15332 65.867C270.485 72.638 338.685 51.7608 453.893 36.9774C537.89 26.1438 631.906 24.7896 719.757 32.4634C918.962 49.9552 1032.24 81.1018 1279.23 50.858"
      stroke="#4268FF"
      strokeMiterlimit="10"
    />
    <defs>
      <linearGradient
        id="icon-horizon-wave-g0"
        x1="639.698"
        y1="20"
        x2="639.698"
        y2="0.473785"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9ECF0" />
        <stop offset="1" stopColor="#D4DFED" />
      </linearGradient>
      <linearGradient
        id="icon-horizon-wave-g1"
        x1="640.081"
        y1="136.924"
        x2="640.081"
        y2="27.5714"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9EBF0" />
        <stop offset="1" stopColor="#D4DFED" />
      </linearGradient>
    </defs>
  </svg>
);
