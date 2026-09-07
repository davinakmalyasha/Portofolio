"use client";

import React, { useEffect, useState, useCallback, useMemo, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import TopBar from "../components/TopBar";
import TargetCursor from "../components/TargetCursor";
import IntroLoader from "../components/IntroLoader";
import ProjectDetailModal from "../components/project-modal/ProjectDetailModal";
import ExperienceDetailModal from "../components/project-modal/ExperienceDetailModal";
import WebGLErrorBoundary from "../components/WebGLErrorBoundary";
import Fallback2D from "../components/Fallback2D";
import { ViewMode } from "../components/ViewModeToggle";
import { Project, Experience } from "../types/portfolio.types";
import { useLenisScroll, SECTION_IDS } from "../hooks/useLenisScroll";
import dynamic from "next/dynamic";
import "./css/index.css";

// Viewport width below which the 3D canvas is inaccessible — small screens
// are locked to the flowing 2D layout.
const VIEW_MODE_CUTOFF = 768;

const Canvas3D = dynamic(() => import("../components/Canvas3D"), {
  ssr: false,
});

// 2D portfolio is code-split: not shipped on first load, prefetched on hover
// of the view-mode toggle and resolved from cache when the transition fires.
const Portfolio2D = dynamic(
  () => import("../components/portfolio2d/Portfolio2D" /* webpackChunkName: "portfolio-2d" */),
  {
    ssr: false,
    loading: () => null,
  }
);

export default function Home(): React.JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);
  const [visualsVisible, setVisualsVisible] = useState<boolean>(false);
  const [isMobile, setIsMobile] = useState<boolean>(false);
  // SSR starts in 3d; the mount effect below silently corrects small screens
  // to 2d behind the intro loader — keeping server/client markup identical.
  const [viewMode, setViewMode] = useState<ViewMode>("3d");
  const [modeTransitioning, setModeTransitioning] = useState<boolean>(false);
  const [pendingMode, setPendingMode] = useState<ViewMode>("3d");

  const { activeSlide, setActiveSlide, showContent, setShowContent, scrollToSlide } = useLenisScroll(
    selectedProject,
    selectedExperience,
    viewMode
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

  // Responsive mobile view check + forced view-mode follow.
  // Screens ≤768px are locked to 2D; crossing the cutoff in either direction
  // runs the same animated switch as a manual toggle click.
  const viewModeRef = useRef(viewMode);
  useEffect(() => {
    viewModeRef.current = viewMode;
  }, [viewMode]);

  const handleModeSwitchRef = useRef<(mode: ViewMode) => void>((): void => {});

  // First run corrects the SSR default silently; later crossings animate.
  const didMountModeCheck = useRef<boolean>(false);

  useEffect(() => {
    const checkMobile = (): void => {
      const mobile = window.innerWidth <= VIEW_MODE_CUTOFF;
      setIsMobile(mobile);
      const target: ViewMode = mobile ? "2d" : "3d";
      if (viewModeRef.current !== target) {
        if (didMountModeCheck.current) {
          handleModeSwitchRef.current(target);
        } else {
          viewModeRef.current = target;
          setViewMode(target);
        }
      }
    };
    checkMobile();
    didMountModeCheck.current = true;
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

  const handleModeSwitch = useCallback(
    (mode: ViewMode): void => {
      if (mode === viewMode || modeTransitioning) return;
      setPendingMode(mode);
      setModeTransitioning(true);
      window.setTimeout(() => {
        setViewMode(mode);
        window.scrollTo(0, 0);
        if (mode === "3d") {
          scrollToSlide(activeSlide);
        } else {
          setActiveSlide(0);
        }
        setModeTransitioning(false);
      }, 750);
    },
    [viewMode, modeTransitioning, activeSlide, scrollToSlide, setActiveSlide]
  );

  // Keep the resize listener's handle reference fresh without re-subscribing
  useEffect(() => {
    handleModeSwitchRef.current = handleModeSwitch;
  }, [handleModeSwitch]);

  const handleNavClick = useCallback(
    (index: number): void => {
      if (viewMode === "2d") {
        scrollToSlide(index);
        return;
      }
      scrollToSlide(index);
    },
    [viewMode, scrollToSlide]
  );

  const handleSectionChange = useCallback(
    (index: number): void => {
      setActiveSlide(index);
    },
    [setActiveSlide]
  );

  // Warm the 2D chunk when the user hovers the mode toggle — zero cost if
  // they never switch, instant switch if they do.
  const handlePrefetch2D = useCallback((): void => {
    void import("../components/portfolio2d/Portfolio2D").catch(() => {
      // prefetch failure is non-fatal — the dynamic import retries on mount
    });
  }, []);

  const visualLayer = useMemo((): React.JSX.Element => {
    if (viewMode === "2d") {
      return (
        <Portfolio2D
          onExploreProject={setSelectedProject}
          onExploreExperience={setSelectedExperience}
          onSectionChange={handleSectionChange}
        />
      );
    }

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
  }, [
    viewMode,
    webglSupported,
    webglFailed,
    isMobile,
    showContent,
    activeSlide,
    handleWebglError,
    handleSectionChange,
  ]);

  return (
    <div
      className={`app-wrapper ${!showContent ? "loading-locked" : ""} ${
        !visualsVisible ? "visuals-hidden" : ""
      } ${viewMode === "2d" ? "mode-2d" : "mode-3d"}`}
    >
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

      <TopBar
        onNavClick={handleNavClick}
        activeSlide={activeSlide}
        ready={showContent}
        isMobile={isMobile}
        viewMode={viewMode}
        onModeSwitch={handleModeSwitch}
        onPrefetch2D={handlePrefetch2D}
      />

      {isMobile && viewMode === "3d" && showContent && !selectedProject && !selectedExperience && (
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
            onClick={() => scrollToSlide(Math.min(SECTION_IDS.length - 1, activeSlide + 1))}
            className="mobile-scroll-indicator-btn"
            disabled={activeSlide === SECTION_IDS.length - 1}
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
        {modeTransitioning && (
          <motion.div
            className="mode-transition-overlay"
            initial={{ clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={{ clipPath: "inset(100% 0 0 0)" }}
            transition={{ duration: 0.75, ease: [0.76, 0, 0.24, 1] }}
          >
            <span className="mode-transition-label">
              {pendingMode === "2d" ? "ENTERING 2D MODE" : "ENTERING 3D MODE"}
            </span>
            <span className="mode-transition-sub">MONOCHROME AI ORCHESTRATION</span>
          </motion.div>
        )}
      </AnimatePresence>

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
