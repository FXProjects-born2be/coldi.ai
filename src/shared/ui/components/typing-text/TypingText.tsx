'use client';
import { useEffect, useMemo, useState } from 'react';

import { motion } from 'framer-motion';

type TypingTextProps = {
  text: string | string[];
  speed?: number;
  delay?: number;
  className?: string;
};

export const TypingText = ({ text, speed = 100, delay = 0, className }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [hasStarted, setHasStarted] = useState(false);
  const [currentTextIndex, setCurrentTextIndex] = useState(0);

  const textArray = useMemo(() => (Array.isArray(text) ? text : [text]), [text]);

  useEffect(() => {
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);

      return () => clearTimeout(startTimer);
    }
  }, [delay, hasStarted]);

  useEffect(() => {
    if (hasStarted && currentIndex < textArray[currentTextIndex].length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + textArray[currentTextIndex][currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (hasStarted && currentIndex === textArray[currentTextIndex].length) {
      // Wait before moving to next text
      const nextTextTimer = setTimeout(() => {
        // Cycle back to first text if we've reached the end
        const nextTextIndex = (currentTextIndex + 1) % textArray.length;
        setCurrentTextIndex(nextTextIndex);
        setCurrentIndex(0);
        setDisplayedText('');
      }, 2000); // Wait 2 seconds before next text

      return () => clearTimeout(nextTextTimer);
    }
  }, [hasStarted, currentIndex, textArray, currentTextIndex, speed]);

  return (
    <span className={className}>
      {displayedText}
      {hasStarted && (
        <motion.span
          animate={{ opacity: [1, 0, 1] }}
          transition={{ duration: 0.8, repeat: Infinity }}
          style={{ display: 'inline-block' }}
        >
          |
        </motion.span>
      )}
    </span>
  );
};
