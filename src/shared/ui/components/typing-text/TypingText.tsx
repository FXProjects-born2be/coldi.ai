'use client';
import { useEffect, useState } from 'react';

import { motion } from 'framer-motion';

type TypingTextProps = {
  text: string;
  speed?: number;
  delay?: number;
  className?: string;
};

export const TypingText = ({ text, speed = 100, delay = 0, className }: TypingTextProps) => {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTypingComplete, setIsTypingComplete] = useState(false);
  const [hasStarted, setHasStarted] = useState(false);

  useEffect(() => {
    if (!hasStarted) {
      const startTimer = setTimeout(() => {
        setHasStarted(true);
      }, delay);

      return () => clearTimeout(startTimer);
    }
  }, [delay, hasStarted]);

  useEffect(() => {
    if (hasStarted && currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (hasStarted && currentIndex === text.length && !isTypingComplete) {
      // Hide cursor after typing is complete
      const hideCursorTimer = setTimeout(() => {
        setIsTypingComplete(true);
      }, 1000); // Wait 1 second before hiding cursor

      return () => clearTimeout(hideCursorTimer);
    }
  }, [hasStarted, currentIndex, text, speed, isTypingComplete]);

  return (
    <span className={className}>
      {displayedText}
      {!isTypingComplete && hasStarted && (
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
