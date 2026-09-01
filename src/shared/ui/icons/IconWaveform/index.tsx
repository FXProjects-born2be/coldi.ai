import st from './IconWaveform.module.scss';

const BARS = [
  { y: 90.9583, height: 54.0833, opacity: 0.6 },
  { x: 24.583, y: 76.2083, height: 83.5833, opacity: 0.852441 },
  { x: 49.1665, y: 54.0833, height: 127.833, opacity: 0.872789 },
  { x: 73.75, y: 31.9583, height: 172.083, opacity: 0.642336 },
  { x: 98.333, y: 13.5208, height: 208.958, opacity: 0.372959 },
  { x: 122.917, y: 1.22919, height: 233.542, opacity: 0.312323 },
  { x: 147.5, y: 9.83331, height: 216.333, opacity: 0.516175 },
  { x: 172.083, y: 29.5, height: 177, opacity: 0.797096 },
  { x: 196.667, y: 46.7083, height: 142.583, opacity: 0.896807 },
  { x: 221.25, y: 63.9167, height: 108.167, opacity: 0.723636 },
  { x: 245.833, y: 36.875, height: 162.25, opacity: 0.436794 },
  { x: 270.417, y: 17.2083, height: 201.583, opacity: 0.300003 },
  { x: 295, y: 27.0417, height: 181.917, opacity: 0.439028 },
  { x: 319.583, y: 49.1667, height: 137.667, opacity: 0.72605 },
  { x: 344.167, y: 68.8333, height: 98.3333, opacity: 0.897182 },
  { x: 368.75, y: 34.4167, height: 167.167, opacity: 0.795086 },
  { x: 393.333, y: 12.2917, height: 211.417, opacity: 0.513629 },
  { x: 417.917, y: 31.9583, height: 172.083, opacity: 0.311581 },
  { x: 442.5, y: 54.0833, height: 127.833, opacity: 0.374704 },
  { x: 467.083, y: 73.75, height: 88.5, opacity: 0.644963 },
  { x: 491.667, y: 90.9583, height: 54.0833, opacity: 0.873884 },
  { x: 516.25, y: 76.2083, height: 83.5833, opacity: 0.850997 },
  { x: 540.833, y: 56.5417, height: 122.917, opacity: 0.597345 },
  { x: 565.417, y: 34.4167, height: 167.167, opacity: 0.346134 },
  { x: 590, y: 14.75, height: 206.5, opacity: 0.328326 },
  { x: 614.583, height: 236, opacity: 0.560294 },
  { x: 639.167, y: 19.6667, height: 196.667, opacity: 0.828768 },
] as const;

export const IconWaveform = () => (
  <svg
    className={st.icon_waveform}
    xmlns="http://www.w3.org/2000/svg"
    width="653"
    height="236"
    viewBox="0 0 653 236"
    fill="none"
    aria-hidden
  >
    {BARS.map((bar, index) => (
      <g key={index} className={st.icon_waveform__bar}>
        <rect
          x={'x' in bar ? bar.x : undefined}
          y={'y' in bar ? bar.y : undefined}
          width="12.2917"
          height={bar.height}
          rx="6.14583"
          fill="white"
          fillOpacity={bar.opacity}
        />
      </g>
    ))}
  </svg>
);
