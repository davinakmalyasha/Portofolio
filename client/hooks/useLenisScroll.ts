"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { Project, Experience } from "../types/portfolio.types";
import { setScrollProgress } from "./scrollProgress";

export const SECTION_IDS = [
  "home",
  "about",
  "works",
  "experience",
  "github",
  "certificates",
  "contact",
];

export type ScrollMode = "3d" | "2d";

interface UseLenisScrollReturn {
  activeSlide: number;
  setActiveSlide: (index: number) => void;
  showContent: boolean;
  setShowContent: (show: boolean) => void;
  scrollToSlide: (index: number) => void;
}

export function useLenisScroll(
  selectedProject: Project | null,
  selectedExperience: Experience | null,
  mode: ScrollMode
): UseLenisScrollReturn {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);
  const modeRef = useRef<ScrollMode>(mode);

  useEffect(() => {
    modeRef.current = mode;
  }, [mode]);

  useEffect(() => {
    if (!showContent) return;

    const lenis = new Lenis({
      orientation: "vertical",
      gestureOrientation: "vertical",
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    });

    lenisRef.current = lenis;

    const handleScroll = (): void => {
      // In 2D mode the page flows freely — no slide mapping, active section
      // is tracked by Portfolio2D via IntersectionObserver.
      if (modeRef.current !== "3d") return;

      const progress = lenis.scroll / window.innerHeight;
      setActiveSlide(Math.round(progress));
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
      setScrollProgress(progress);
    };

    lenis.on("scroll", handleScroll);
    setTimeout(handleScroll, 50);

    let rafId: number;
    const raf = (time: number): void => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    return () => {
      cancelAnimationFrame(rafId);
      lenis.destroy();
    };
  }, [showContent]);

  useEffect(() => {
    if (lenisRef.current) {
      if (selectedProject || selectedExperience) {
        lenisRef.current.stop();
      } else {
        lenisRef.current.start();
      }
    }
  }, [selectedProject, selectedExperience]);

  const scrollToSlide = (index: number): void => {
    if (modeRef.current === "2d") {
      const id = SECTION_IDS[index];
      if (id) {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
      }
      return;
    }

    if (lenisRef.current) {
      lenisRef.current.scrollTo(index * window.innerHeight);
    }
  };

  return {
    activeSlide,
    setActiveSlide,
    showContent,
    setShowContent,
    scrollToSlide,
  };
}
