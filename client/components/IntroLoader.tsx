"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const LANGUAGES = [
  "HELLO",
  "BONJOUR",
  "HOLA",
  "CIAO",
  "HALLO",
  "KONNICHIWA",
  "NAMASTE",
  "STUDIO"
];

interface IntroLoaderProps {
  onComplete: () => void;
}

export default function IntroLoader({ onComplete }: IntroLoaderProps): React.JSX.Element {
  const [count, setCount] = useState(0);
  const [langIndex, setLangIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    // 1. Counting logic from 00 to 100
    const countInterval = setInterval(() => {
      setCount((prev) => {
        if (prev >= 100) {
          clearInterval(countInterval);
          setIsLoaded(true);
          return 100;
        }
        return prev + 1;
      });
    }, 20);

    // 2. Language switching logic
    const langInterval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % LANGUAGES.length);
    }, 250);

    return () => {
      clearInterval(countInterval);
      clearInterval(langInterval);
    };
  }, []);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isLoaded && (
        <motion.div
          className="intro-loader-container"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: { duration: 0.85, ease: [0.76, 0, 0.24, 1] }
          }}
        >
          <div className="intro-loader-content">
            <AnimatePresence mode="wait">
              <motion.h2
                key={langIndex}
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 0.9 }}
                exit={{ y: -20, opacity: 0 }}
                transition={{ duration: 0.18, ease: "easeOut" }}
                className="intro-language"
              >
                {LANGUAGES[langIndex]}
              </motion.h2>
            </AnimatePresence>

            <div className="intro-counter-wrapper">
              <motion.div
                className="intro-progress-bar"
                style={{ width: `${count}%` }}
              />
              <span className="intro-percentage">{count}%</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
