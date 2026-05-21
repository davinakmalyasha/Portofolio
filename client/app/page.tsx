"use client";

import React, { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import TopBar from "../components/TopBar";
import TargetCursor from "../components/TargetCursor";
import IntroLoader from "../components/IntroLoader";
import ProjectDetailModal from "../components/project-modal/ProjectDetailModal";
import ExperienceDetailModal from "../components/project-modal/ExperienceDetailModal";
import WebGLErrorBoundary from "../components/WebGLErrorBoundary";
import Fallback2D from "../components/Fallback2D";
import Canvas3D from "../components/Canvas3D";
import { Project, Experience } from "../types/portfolio.types";
import { useLenisScroll } from "../hooks/useLenisScroll";
import "./css/index.css";

export default function Home(): React.JSX.Element {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [selectedExperience, setSelectedExperience] = useState<Experience | null>(null);

  const { activeSlide, showContent, setShowContent, scrollToSlide } = useLenisScroll(
    selectedProject,
    selectedExperience
  );

  const [webglSupported, setWebglSupported] = useState<boolean>(true);
  const [webglFailed, setWebglFailed] = useState<boolean>(false);

  useEffect(() => {
    // Proactive capability check
    try {
      const canvas = document.createElement("canvas");
      const supported = !!(
        window.WebGLRenderingContext &&
        (canvas.getContext("webgl") || canvas.getContext("experimental-webgl"))
      );
      if (!supported) {
        console.warn("WebGL not supported by browser. Falling back to 2D layout.");
        setWebglSupported(false);
      }
    } catch (e) {
      console.error("Failed to check WebGL capabilities:", e);
      setWebglSupported(false);
    }

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

  const renderVisualLayer = (): React.JSX.Element => {
    if (webglSupported && !webglFailed) {
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
          onError={() => setWebglFailed(true)}
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
  };

  return (
    <div className={`app-wrapper ${!showContent ? "loading-locked" : ""}`}>
      <IntroLoader onComplete={() => setShowContent(true)} />
      <div className="noise-grain" />

      <div className="bg-grid-lines">
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
        <div className="grid-line" />
      </div>

      {renderVisualLayer()}

      <TargetCursor spinDuration={2} hideDefaultCursor={true} parallaxOn={true} hoverDuration={0.2} />

      <TopBar onNavClick={scrollToSlide} activeSlide={activeSlide} ready={showContent} />

      <div className="vertical-scroll-height" />

      <AnimatePresence>
        {selectedProject && (
          <ProjectDetailModal project={selectedProject} onClose={() => setSelectedProject(null)} />
        )}
        {selectedExperience && (
          <ExperienceDetailModal experience={selectedExperience} onClose={() => setSelectedExperience(null)} />
        )}
      </AnimatePresence>
    </div>
  );
}
