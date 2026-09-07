import { cn } from '@/shared/lib/helpers';

import st from '../IconHorizonWave/IconHorizonWave.module.scss';

type IconHorizonWaveMobileProps = {
  active?: boolean;
};

export const IconHorizonWaveMobile = ({ active }: IconHorizonWaveMobileProps) => (
  <svg
    className={cn(st.icon_horizon_wave, active && st.icon_horizon_wave_active)}
    xmlns="http://www.w3.org/2000/svg"
    width="358"
    height="259"
    viewBox="0 0 358 259"
    fill="none"
    aria-hidden
  >
    <path
      className={st.icon_horizon_wave__fill}
      d="M0 98.9989C107.788 104.003 113.723 -1.67361 172.203 0.534122C173.282 0.534122 174.36 0.534122 175.547 0.534122C236.832 -1.67361 260.246 125.933 357.892 108.419"
      fill="url(#icon-horizon-wave-mobile-g0)"
    />
    <path
      className={st.icon_horizon_wave__fill}
      d="M0.322266 85.6253C75.651 94.443 94.7256 67.2552 126.948 48.0033C150.441 33.8951 176.736 32.1315 201.307 42.1249C257.022 64.9038 288.705 105.465 357.783 66.0795V259H0.322266V85.6253Z"
      fill="url(#icon-horizon-wave-mobile-g1)"
    />
    <path
      className={st.icon_horizon_wave__line}
      d="M0.322266 80.628C38.4716 47.8557 87.3975 82.6854 168.222 91.5031C171.563 91.944 175.012 92.0909 178.46 91.944C238.917 89.2987 292.908 26.9872 357.783 44.1817"
      stroke="#2544BD"
      strokeMiterlimit="10"
    />
    <path
      className={st.icon_horizon_wave__line}
      d="M0.322266 98.8509C107.981 103.848 113.8 -1.67034 172.317 0.534071C173.395 0.534071 174.473 0.534071 175.658 0.534071C236.87 -1.67034 260.255 125.745 357.783 108.256"
      stroke="#C0C4CF"
      strokeMiterlimit="10"
    />
    <path
      className={cn(st.icon_horizon_wave__line, st.icon_horizon_wave__line_blue)}
      d="M0.322266 85.6253C75.651 94.443 94.7256 67.2552 126.948 48.0033C150.441 33.8951 176.736 32.1315 201.307 42.1249C257.022 64.9038 288.705 105.465 357.783 66.0795"
      stroke="#4268FF"
      strokeMiterlimit="10"
    />
    <defs>
      <linearGradient
        id="icon-horizon-wave-mobile-g0"
        x1="178.916"
        y1="25.8942"
        x2="178.916"
        y2="0.465862"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9ECF0" />
        <stop offset="1" stopColor="#D4DFED" />
      </linearGradient>
      <linearGradient
        id="icon-horizon-wave-mobile-g1"
        x1="179.022"
        y1="178.161"
        x2="179.022"
        y2="35.7542"
        gradientUnits="userSpaceOnUse"
      >
        <stop stopColor="#E9EBF0" />
        <stop offset="1" stopColor="#D4DFED" />
      </linearGradient>
    </defs>
  </svg>
);
