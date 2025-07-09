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

  useEffect(() => {
    if (currentIndex < text.length) {
      const timer = setTimeout(() => {
        setDisplayedText((prev) => prev + text[currentIndex]);
        setCurrentIndex((prev) => prev + 1);
      }, speed);

      return () => clearTimeout(timer);
    } else if (currentIndex === text.length && !isTypingComplete) {
      // Hide cursor after typing is complete
      const hideCursorTimer = setTimeout(() => {
        setIsTypingComplete(true);
      }, 1000); // Wait 1 second before hiding cursor

      return () => clearTimeout(hideCursorTimer);
    }
  }, [currentIndex, text, speed, isTypingComplete]);

  useEffect(() => {
    const startTimer = setTimeout(() => {
      setDisplayedText('');
      setCurrentIndex(0);
      setIsTypingComplete(false);
    }, delay);

    return () => clearTimeout(startTimer);
  }, [delay]);

  return (
    <span className={className}>
      {displayedText}
      {!isTypingComplete && (
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
