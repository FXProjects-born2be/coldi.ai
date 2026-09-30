import { type CSSProperties } from 'react';

import st from '../IconWaveform/IconWaveform.module.scss';

const BARS = [
  {
    x: 1.66992,
    y: 7.21875,
    height: 111.562,
    opacity: 0.372959,
    scales: [0.84, 0.692, 0.496, 0.6, 0.703, 0.749, 0.53, 0.482],
  },
  {
    x: 14.7949,
    y: 0.65625,
    height: 124.688,
    opacity: 0.312323,
    scales: [0.8, 0.433, 0.513, 0.705, 0.683, 0.594, 0.438, 0.682],
  },
  {
    x: 27.9199,
    y: 5.25,
    height: 115.5,
    opacity: 0.516175,
    scales: [0.47, 0.375, 0.763, 0.707, 0.461, 0.487, 0.578, 0.802],
  },
  {
    x: 41.0449,
    y: 15.75,
    height: 94.5,
    opacity: 0.797096,
    scales: [0.327, 0.578, 0.833, 0.395, 0.443, 0.572, 0.729, 0.594],
  },
  {
    x: 54.1699,
    y: 24.9375,
    height: 76.125,
    opacity: 0.896807,
    scales: [0.454, 0.889, 0.441, 0.294, 0.651, 0.751, 0.465, 0.388],
  },
  {
    x: 67.2949,
    y: 34.125,
    height: 57.75,
    opacity: 0.723636,
    scales: [0.806, 0.588, 0.244, 0.482, 0.887, 0.396, 0.403, 0.44],
  },
  {
    x: 80.4199,
    y: 19.6875,
    height: 86.625,
    opacity: 0.436794,
    scales: [0.51, 0.315, 0.343, 0.905, 0.448, 0.249, 0.528, 0.724],
  },
  {
    x: 93.5449,
    y: 9.1875,
    height: 107.625,
    opacity: 0.300003,
    scales: [0.399, 0.324, 0.708, 0.612, 0.197, 0.406, 0.757, 0.438],
  },
  {
    x: 106.67,
    y: 14.4375,
    height: 97.125,
    opacity: 0.439028,
    scales: [0.419, 0.604, 0.593, 0.276, 0.258, 0.826, 0.49, 0.245],
  },
  {
    x: 119.795,
    y: 26.25,
    height: 73.5,
    opacity: 0.72605,
    scales: [0.627, 0.516, 0.432, 0.235, 0.615, 0.661, 0.193, 0.358],
  },
  {
    x: 132.92,
    y: 36.75,
    height: 52.5,
    opacity: 0.897182,
    scales: [0.562, 0.284, 0.336, 0.497, 0.705, 0.276, 0.208, 0.741],
  },
  {
    x: 146.045,
    y: 18.375,
    height: 89.25,
    opacity: 0.795086,
    scales: [0.232, 0.344, 0.51, 0.622, 0.461, 0.183, 0.538, 0.732],
  },
  {
    x: 159.17,
    y: 6.5625,
    height: 112.875,
    opacity: 0.513629,
    scales: [0.199, 0.625, 0.657, 0.362, 0.289, 0.413, 0.833, 0.315],
  },
  {
    x: 172.295,
    y: 17.0625,
    height: 91.875,
    opacity: 0.311581,
    scales: [0.485, 0.814, 0.31, 0.366, 0.42, 0.745, 0.504, 0.176],
  },
  {
    x: 185.42,
    y: 28.875,
    height: 68.25,
    opacity: 0.374704,
    scales: [0.965, 0.388, 0.233, 0.535, 0.763, 0.47, 0.282, 0.361],
  },
  {
    x: 198.545,
    y: 39.375,
    height: 47.25,
    opacity: 0.644963,
    scales: [0.571, 0.211, 0.464, 0.802, 0.419, 0.422, 0.366, 0.773],
  },
  {
    x: 211.67,
    y: 48.5625,
    height: 28.875,
    opacity: 0.873884,
    scales: [0.315, 0.348, 0.899, 0.486, 0.305, 0.479, 0.682, 0.598],
  },
  {
    x: 224.795,
    y: 40.6875,
    height: 44.625,
    opacity: 0.850997,
    scales: [0.353, 0.718, 0.655, 0.287, 0.475, 0.711, 0.545, 0.496],
  },
  {
    x: 237.92,
    y: 30.1875,
    height: 65.625,
    opacity: 0.597345,
    scales: [0.63, 0.73, 0.384, 0.374, 0.816, 0.599, 0.407, 0.463],
  },
  {
    x: 251.045,
    y: 18.375,
    height: 89.25,
    opacity: 0.346134,
    scales: [0.677, 0.556, 0.382, 0.689, 0.746, 0.392, 0.517, 0.653],
  },
  {
    x: 264.17,
    y: 7.875,
    height: 110.25,
    opacity: 0.328326,
    scales: [0.528, 0.487, 0.611, 0.853, 0.48, 0.436, 0.751, 0.715],
  },
  {
    x: 277.295,
    y: 0,
    height: 126,
    opacity: 0.560294,
    scales: [0.585, 0.632, 0.8, 0.635, 0.448, 0.689, 0.834, 0.517],
  },
] as const;

const barStyle = (scales: readonly number[]) =>
  ({
    '--wf-0': scales[0],
    '--wf-1': scales[1],
    '--wf-2': scales[2],
    '--wf-3': scales[3],
    '--wf-4': scales[4],
    '--wf-5': scales[5],
    '--wf-6': scales[6],
    '--wf-7': scales[7],
  }) as CSSProperties;

type IconHearWaveformProps = {
  active?: boolean;
};

export const IconHearWaveform = ({ active }: IconHearWaveformProps) => (
  <svg
    className={st.icon_waveform}
    xmlns="http://www.w3.org/2000/svg"
    width="288"
    height="126"
    viewBox="0 0 288 126"
    fill="none"
    aria-hidden
  >
    {BARS.map((bar, index) => (
      <g
        key={index}
        className={active ? st.icon_waveform__bar : undefined}
        style={active ? barStyle(bar.scales) : undefined}
      >
        <rect
          x={bar.x}
          y={bar.y}
          width="6.5625"
          height={bar.height}
          rx="3.28125"
          fill="#4268FF"
          fillOpacity={bar.opacity}
        />
      </g>
    ))}
  </svg>
);
