"use client";

import { useEffect, useState, useRef } from "react";
import Lenis from "lenis";
import { Project, Experience } from "../types/portfolio.types";

interface UseLenisScrollReturn {
  activeSlide: number;
  showContent: boolean;
  setShowContent: (show: boolean) => void;
  scrollToSlide: (index: number) => void;
}

export function useLenisScroll(
  selectedProject: Project | null,
  selectedExperience: Experience | null
): UseLenisScrollReturn {
  const [activeSlide, setActiveSlide] = useState<number>(0);
  const [showContent, setShowContent] = useState<boolean>(false);
  const lenisRef = useRef<Lenis | null>(null);

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
      const progress = lenis.scroll / window.innerHeight;
      setActiveSlide(Math.round(progress));
      document.documentElement.style.setProperty("--scroll-progress", progress.toFixed(4));
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
    if (lenisRef.current) {
      lenisRef.current.scrollTo(index * window.innerHeight);
    }
  };

  return {
    activeSlide,
    showContent,
    setShowContent,
    scrollToSlide,
  };
}
