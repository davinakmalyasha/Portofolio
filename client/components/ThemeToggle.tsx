"use client";

import React, { useEffect, useState } from "react";

export default function ThemeToggle(): React.JSX.Element {
  const [isDark, setIsDark] = useState(false);

  useEffect(() => {
    const root = document.documentElement;
    const resetTheme = localStorage.getItem("theme-reset-v1");
    
    if (!resetTheme) {
      // Force reset to light mode on first load of the updated app
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      localStorage.setItem("theme-reset-v1", "true");
      return;
    }

    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      root.classList.add("dark");
      // Defer state update to next tick to avoid synchronous setState inside useEffect warning
      setTimeout(() => {
        setIsDark(true);
      }, 0);
    } else {
      root.classList.remove("dark");
    }
  }, []);

  const toggleTheme = (): void => {
    const root = document.documentElement;
    if (isDark) {
      root.classList.remove("dark");
      localStorage.setItem("theme", "light");
      setIsDark(false);
    } else {
      root.classList.add("dark");
      localStorage.setItem("theme", "dark");
      setIsDark(true);
    }
  };

  return (
    <button
      onClick={toggleTheme}
      className="theme-toggle-btn cursor-target"
      aria-label="Toggle Theme"
    >
      <span className="theme-icon">
        {isDark ? (
          <svg
            className="theme-svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <circle cx="12" cy="12" r="5"></circle>
            <line x1="12" y1="1" x2="12" y2="3"></line>
            <line x1="12" y1="21" x2="12" y2="23"></line>
            <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
            <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
            <line x1="1" y1="12" x2="3" y2="12"></line>
            <line x1="21" y1="12" x2="23" y2="12"></line>
            <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
            <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
          </svg>
        ) : (
          <svg
            className="theme-svg-icon"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          >
            <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
          </svg>
        )}
      </span>
    </button>
  );
}

