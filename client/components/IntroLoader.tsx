"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { preloadAllAssets } from "../hooks/useImagePreloader";

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

/** Minimum time (ms) the loader stays visible so the animation is appreciated */
const MIN_DISPLAY_MS = 2000;

/** Pause (ms) after counter reaches 100% before the curtain rises */
const PAUSE_AFTER_COMPLETE_MS = 600;

/** Interval (ms) between each counter tick — lower = faster feeling */
const TICK_INTERVAL_MS = 40;

interface IntroLoaderProps {
  onComplete: () => void;
  onExitStart?: () => void;
}

// Global state to track preloading status across mounts (e.g. Strict Mode or re-renders)
let globalPreloadTargetPercent = 0;
let globalPreloadDone = false;
let globalPreloadPromise: Promise<void> | null = null;

export default function IntroLoader({ onComplete, onExitStart }: IntroLoaderProps): React.JSX.Element {
  const [count, setCount] = useState(0);
  const [langIndex, setLangIndex] = useState(0);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const startTime = Date.now();

    // Language switching animation (purely visual)
    const langInterval = setInterval(() => {
      setLangIndex((prev) => (prev + 1) % LANGUAGES.length);
    }, 220);

    // Initialize preloading singleton if not already started
    if (!globalPreloadPromise) {
      globalPreloadPromise = preloadAllAssets((percent) => {
        globalPreloadTargetPercent = percent;
      }).then(() => {
        globalPreloadDone = true;
      });
    }

    let currentPercent = count;
    const progressTimer = setInterval(() => {
      if (currentPercent < 100) {
        // Slow, deliberate steps: 1% per tick normally, 2% when finishing
        const maxStep = globalPreloadDone ? 2 : 1;
        // Cap at 10% ahead of real progress to prevent the counter from
        // sitting at 100% before assets are actually loaded
        const limit = globalPreloadDone ? 100 : Math.max(globalPreloadTargetPercent, 10);

        if (currentPercent < limit) {
          currentPercent = Math.min(currentPercent + maxStep, limit);
          setCount(currentPercent);
        }
      } else {
        // Counter reached 100% — enforce minimum display time
        clearInterval(progressTimer);

        const elapsed = Date.now() - startTime;
        const remainingMinDisplay = Math.max(0, MIN_DISPLAY_MS - elapsed);

        // Wait for minimum display time, then pause for a beat before exit
        setTimeout(() => {
          setTimeout(() => {
            setIsLoaded(true);
            if (onExitStart) onExitStart();
          }, PAUSE_AFTER_COMPLETE_MS);
        }, remainingMinDisplay);
      }
    }, TICK_INTERVAL_MS);

    return () => {
      clearInterval(langInterval);
      clearInterval(progressTimer);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [onExitStart]);

  return (
    <AnimatePresence onExitComplete={onComplete}>
      {!isLoaded && (
        <motion.div
          className="intro-loader-container"
          initial={{ y: "0%" }}
          exit={{
            y: "-100%",
            transition: { duration: 1.4, ease: [0.65, 0, 0.35, 1] }
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
