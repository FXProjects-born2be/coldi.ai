'use client';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

type CounterProps = {
  start: number;
  end: number;
  duration?: number;
  delay?: number;
  suffix?: string;
  className?: string;
};

export const Counter = ({
  start,
  end,
  duration = 2,
  delay = 0,
  suffix = '',
  className,
}: CounterProps) => {
  const [count, setCount] = useState(start);
  const [isInView, setIsInView] = useState(false);

  useEffect(() => {
    if (isInView) {
      const startTime = Date.now();
      const totalChange = end - start;

      const animate = () => {
        const elapsed = Date.now() - startTime;
        const progress = Math.min(elapsed / (duration * 1000), 1);

        // Easing function for smooth animation
        const easeOut = 1 - Math.pow(1 - progress, 3);
        const currentCount = Math.round(start + totalChange * easeOut);

        setCount(currentCount);

        if (progress < 1) {
          requestAnimationFrame(animate);
        }
      };

      const timer = setTimeout(() => {
        requestAnimationFrame(animate);
      }, delay * 1000);

      return () => clearTimeout(timer);
    }
  }, [isInView, start, end, duration, delay]);

  return (
    <motion.span
      className={className}
      onViewportEnter={() => setIsInView(true)}
      viewport={{ once: true }}
    >
      {count}
      {suffix}
    </motion.span>
  );
};
