"use client";

import { useSyncExternalStore } from "react";

// ────────────────────────────────────────────────────────────
// Module-level singleton theme observer.
// ONE MutationObserver shared across all consumers (Pod3D ×6, ParticleWave ×1).
// Works inside R3F <Canvas> reconciler where React Context can't reach.
// ────────────────────────────────────────────────────────────

type ThemeListener = () => void;

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
  listeners.forEach((listener) => listener());
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

function subscribe(listener: ThemeListener): () => void {
  ensureObserver();
  listeners.add(listener);
  return () => {
    listeners.delete(listener);
    if (listeners.size === 0 && observer) {
      observer.disconnect();
      observer = null;
    }
  };
}

function getSnapshot(): boolean {
  return readTheme();
}

function getServerSnapshot(): boolean {
  return false;
}

/**
 * React hook that returns the current `isDark` value.
 * Backed by useSyncExternalStore so all calls share one MutationObserver
 * and stay consistent with concurrent rendering.
 */
export function useThemeObserver(): boolean {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
