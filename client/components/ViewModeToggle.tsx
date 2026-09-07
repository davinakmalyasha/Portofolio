"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export type ViewMode = "3d" | "2d";

interface ViewModeToggleProps {
  mode: ViewMode;
  onSwitch: (mode: ViewMode) => void;
  onPrefetch2D: () => void;
  disabled?: boolean;
}

export default function ViewModeToggle({ mode, onSwitch, onPrefetch2D, disabled }: ViewModeToggleProps): React.JSX.Element {
  const [spinKey, setSpinKey] = useState<number>(0);
  const target: ViewMode = mode === "3d" ? "2d" : "3d";

  const handleClick = (): void => {
    if (disabled) return;
    setSpinKey((k) => k + 1);
    onSwitch(target);
  };

  const handleHover = (): void => {
    if (mode === "3d") {
      onPrefetch2D();
    }
  };

  return (
    <div className="view-mode-control">
      <motion.span
        key={`label-${target}`}
        className="view-mode-label"
        data-text={target === "2d" ? "2D MODE>" : "3D MODE>"}
        aria-hidden="true"
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.8 }}
        transition={{ duration: 0.3, delay: 0.15 }}
      >
        {target === "2d" ? "2D MODE>" : "3D MODE>"}
      </motion.span>

      <motion.button
        key={spinKey}
        onClick={handleClick}
        onMouseEnter={handleHover}
        className="view-mode-toggle-btn cursor-target"
      aria-label={`Switch to ${target === "3d" ? "3D" : "2D"} mode`}
      title={`Switch to ${target === "3d" ? "3D" : "2D"} mode`}
      initial={{ rotateY: 0, opacity: 1 }}
      animate={{ rotateY: 360, opacity: 1 }}
      transition={{ duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      whileHover={{ scale: 1.08 }}
      whileTap={{ scale: 0.92 }}
    >
      <AnimatePresence mode="wait" initial={false}>
        <motion.span
          key={target}
          className="view-mode-icon"
          initial={{ rotateY: 90, opacity: 0 }}
          animate={{ rotateY: 0, opacity: 1 }}
          exit={{ rotateY: -90, opacity: 0 }}
          transition={{ duration: 0.35, ease: "easeOut" }}
          style={{ transformStyle: "preserve-3d" }}
        >
          {target === "2d" ? (
            <svg
              className="view-mode-svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="square"
            >
              <rect x="3.5" y="3.5" width="17" height="17" />
              <line x1="3.5" y1="8.5" x2="20.5" y2="8.5" />
              <line x1="3.5" y1="13" x2="20.5" y2="13" />
              <line x1="9" y1="3.5" x2="9" y2="20.5" />
              <line x1="15" y1="3.5" x2="15" y2="20.5" />
            </svg>
          ) : (
            <svg
              className="view-mode-svg-icon"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="square"
            >
              <path d="M12 2.8 L20.5 7.4 V16.6 L12 21.2 L3.5 16.6 V7.4 Z" />
              <line x1="12" y1="2.8" x2="12" y2="21.2" />
              <line x1="3.5" y1="7.4" x2="20.5" y2="7.4" />
              <line x1="3.5" y1="16.6" x2="20.5" y2="16.6" />
              <line x1="8" y1="5.1" x2="8" y2="10.5" />
              <line x1="16" y1="5.1" x2="16" y2="10.5" />
            </svg>
          )}
        </motion.span>
      </AnimatePresence>
      </motion.button>
    </div>
  );
}
