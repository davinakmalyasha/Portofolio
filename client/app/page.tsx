"use client";

import React, { useEffect, useState, useCallback, useMemo } from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "../components/TopBar";
import TargetCursor from "../components/TargetCursor";
import IntroLoader from "../components/IntroLoader";
import ProjectDetailModal from "../components/project-modal/ProjectDetailModal";
import ExperienceDetailModal from "../components/project-modal/ExperienceDetailModal";
import WebGLErrorBoundary from "../components/WebGLErrorBoundary";
import Fallback2D from "../components/Fallback2D";
import { Project, Experience } from "../types/portfolio.types";
import { useLenisScroll } from "../hooks/useLenisScroll";
import dynamic from "next/dynamic";
import "./css/index.css";

const Canvas3D = dynamic(() => import("../components/Canvas3D"), {
  ssr: false,
});

export default function Home(): React.JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [visualsVisible, setVisualsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);

  const { activeSlide, showContent, setShowContent, scrollToSlide } = useLenisScroll(
    selectedProject,
    selectedExperience
  );

  const [webglSupported] = useState<boolean>(() => {
    if (typeof window === "undefined") return true;
    try {
      const canvas = document.createElement("canvas");
      return !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
    } catch (e) {
      console.error("Failed to check WebGL capabilities during state initialization:", e);
      return false;
    }
  });
  const [webglFailed, setWebglFailed] = useState<boolean>(false);

  // Responsive mobile view check
  useEffect(() => {
    const checkMobile = (): void => {
      setIsMobile(window.innerWidth <= 768);
    };
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  // Stable callback refs — prevents child re-renders from new closure identity each cycle
  const handleIntroReady = useCallback((): void => {
    setVisualsVisible(true);
    setShowContent(true);
  }, [setShowContent]);

  const handleCloseProject = useCallback((): void => {
    setSelectedProject(null);
  }, []);

  const handleCloseExperience = useCallback((): void => {
    setSelectedExperience(null);
  }, []);

  const handleWebglError = useCallback((): void => {
    setWebglFailed(true);
  }, []);

  useEffect(() => {
    // Reactive context loss/GPU crash handler
    const handleContextLost = (event: Event): void => {
      console.error("WebGL context lost event captured at root window:", event);
      event.preventDefault();
      setWebglFailed(true);
    };

    window.addEventListener("webglcontextlost", handleContextLost, true);
    return () => {
      window.removeEventListener("webglcontextlost", handleContextLost, true);
    };
  }, []);

  const visualLayer = useMemo((): React.JSX.Element => {
    const useFallback = !webglSupported || webglFailed || isMobile;

    if (!useFallback) {
      return (
        <WebGLErrorBoundary
          fallback={
            <Fallback2D
              showContent={showContent}
              activeSlide={activeSlide}
              onExploreProject={setSelectedProject}
              onExploreExperience={setSelectedExperience}
            />
          }
          onError={handleWebglError}
        >
          <Canvas3D
            showContent={showContent}
            activeSlide={activeSlide}
            onExploreProject={setSelectedProject}
            onExploreExperience={setSelectedExperience}
          />
        </WebGLErrorBoundary>
      );
    }

    return (
      <Fallback2D
        showContent={showContent}
        activeSlide={activeSlide}
        onExploreProject={setSelectedProject}
        onExploreExperience={setSelectedExperience}
      />
    );
  }, [webglSupported, webglFailed, isMobile, showContent, activeSlide, handleWebglError]);

  return (
    <div className={`app-wrapper ${!showContent ? "loading-locked" : ""} ${!visualsVisible ? "visuals-hidden" : ""}`}>
      <IntroLoader
        onExitStart={handleIntroReady}
        onComplete={handleIntroReady}
      />
      <div className="noise-grain" />

      <div className="bg-grid-lines">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      {visualLayer}

      <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} hoverDuration={0.2} />

      <TopBar onNavClick={scrollToSlide} activeSlide={activeSlide} ready={showContent} />

      {isMobile && showContent && !selectedProject && !selectedExperience && (
        <div className="mobile-scroll-indicator-control">
          <button
            onClick={() => scrollToSlide(Math.max(0, activeSlide - 1))}
            className="mobile-scroll-indicator-btn"
            disabled={activeSlide === 0}
            aria-label="Scroll Up"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="18 15 12 9 6 15" />
            </svg>
          </button>
          <button
            onClick={() => scrollToSlide(Math.min(5, activeSlide + 1))}
            className="mobile-scroll-indicator-btn"
            disabled={activeSlide === 5}
            aria-label="Scroll Down"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
              <polyline points="6 9 12 15 18 9" />
            </svg>
          </button>
        </div>
      )}

      <div className="vertical-scroll-height" />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={handleCloseProject} />
        )}
        {selectedExperience && (
          <ExperienceDetailModal experience={selectedExperience} onClose={handleCloseExperience} />
        )}
      </AnimatePresence>
    </div>
  );
}
