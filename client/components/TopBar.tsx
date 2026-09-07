"use client";

import React from "react";
import { motion } from "framer-motion";
import ThemeToggle from "./ThemeToggle";
import ViewModeToggle, { ViewMode } from "./ViewModeToggle";

interface TopBarProps {
  onNavClick: (slideIndex: number) => void;
  activeSlide: number;
  ready: boolean;
  isMobile: boolean;
  viewMode: ViewMode;
  onModeSwitch: (mode: ViewMode) => void;
  onPrefetch2D: () => void;
}

const MENU_ITEMS = [
  { label: "HOME", index: 0 },
  { label: "ABOUT", index: 1 },
  { label: "WORKS", index: 2 },
  { label: "EXPERIENCE", index: 3 },
  { label: "GITHUB", index: 4 },
  { label: "CERTIFICATES", index: 5 },
  { label: "CONTACT", index: 6 }
];

export default function TopBar({ onNavClick, activeSlide, ready, isMobile, viewMode, onModeSwitch, onPrefetch2D }: TopBarProps): React.JSX.Element {
  return (
    <motion.header
      className="topBar"
      initial={{ y: -40, opacity: 0 }}
      animate={ready ? { y: 0, opacity: 1 } : { y: -40, opacity: 0 }}
      transition={{ duration: 0.7, ease: [0.25, 1, 0.5, 1], delay: 0.1 }}
    >
      <div />

      <div className="nav-container">
        <nav>
          <ul className="navMenu">
            {MENU_ITEMS.map((item) => (
              <li
                key={item.index}
                className={`cursor-target ${activeSlide === item.index ? "active" : ""}`}
                onClick={() => onNavClick(item.index)}
                onKeyDown={(e) => {
                  if (e.key === "Enter" || e.key === " ") {
                    e.preventDefault();
                    onNavClick(item.index);
                  }
                }}
                tabIndex={0}
                role="button"
              >
                {item.label}
              </li>
            ))}
          </ul>
        </nav>
        {/* 3D access is disabled on small screens — mode is locked to 2D there */}
        {!isMobile && (
          <ViewModeToggle mode={viewMode} onSwitch={onModeSwitch} onPrefetch2D={onPrefetch2D} />
        )}
        <ThemeToggle />
      </div>
    </motion.header>
  );
}


