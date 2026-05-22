"use client";

import { useState, useEffect } from "react";

// ────────────────────────────────────────────────────────────
// Module-level singleton theme observer.
// ONE MutationObserver shared across all consumers (Pod3D ×6, ParticleWave ×1).
// Works inside R3F <Canvas> reconciler where React Context can't reach.
// ────────────────────────────────────────────────────────────

type ThemeListener = (isDark: boolean) => void;

let currentIsDark = false;
const listeners = new Set<ThemeListener>();
let observer: MutationObserver | null = null;

function readTheme(): boolean {
  if (typeof document === "undefined") return false;
  return document.documentElement.classList.contains("dark");
}

function notifyAll(): void {
  const newValue = readTheme();
  if (newValue === currentIsDark) return;
  currentIsDark = newValue;
  listeners.forEach((fn) => fn(currentIsDark));
}

function ensureObserver(): void {
  if (observer || typeof document === "undefined") return;
  currentIsDark = readTheme();
  observer = new MutationObserver(notifyAll);
  observer.observe(document.documentElement, {
    attributes: true,
    attributeFilter: ["class"],
  });
}

function subscribe(fn: ThemeListener): () => void {
  ensureObserver();
  listeners.add(fn);
  // Immediately fire with current value so the subscriber is in sync
  fn(currentIsDark);
  return () => {
    listeners.delete(fn);
    // Tear down the observer when no subscribers remain
    if (listeners.size === 0 && observer) {
      observer.disconnect();
      observer = null;
    }
  };
}

/**
 * React hook that returns the current `isDark` value.
 * All calls share a single MutationObserver under the hood.
 */
export function useThemeObserver(): boolean {
  const [isDark, setIsDark] = useState<boolean>(readTheme);

  useEffect(() => {
    return subscribe(setIsDark);
  }, []);

  return isDark;
}
