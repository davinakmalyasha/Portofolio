"use client";

import React, { Suspense, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleWave from "./ParticleWave";
import StarField from "./StarField";
import SceneController from "./SceneController";
import Pod3D from "./Pod3D";
import SectionHome from "./SectionHome";
import SectionWorks from "./SectionWorks";
import SectionAbout from "./SectionAbout";
import SectionExperience from "./SectionExperience";
import SectionGitHub from "./SectionGitHub";
import SectionContact from "./SectionContact";
import { Project, Experience } from "../types/portfolio.types";

interface Canvas3DProps {
  showContent: boolean;
  activeSlide: number;
  onExploreProject: (project: Project) => void;
  onExploreExperience: (experience: Experience) => void;
}

export default function Canvas3D({ showContent, activeSlide, onExploreProject, onExploreExperience }: Canvas3DProps): React.JSX.Element {
  const isNear = useCallback(
    (index: number): boolean => Math.abs(activeSlide - index) <= 1,
    [activeSlide]
  );

  const slides = useMemo(() => [
    { id: "home", component: <SectionHome ready={showContent} /> },
    { id: "about", component: <SectionAbout isNearActive={isNear(1)} /> },
    { id: "works", component: <SectionWorks onExploreProject={onExploreProject} isNearActive={isNear(2)} /> },
    { id: "experience", component: <SectionExperience onExploreExperience={onExploreExperience} isNearActive={isNear(3)} /> },
    { id: "github", component: <SectionGitHub /> },
    { id: "contact", component: <SectionContact /> },
  ], [showContent, isNear, onExploreProject, onExploreExperience]);

  return (
    <div className="canvas-container" style={{ pointerEvents: "auto", zIndex: 10 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true, powerPreference: "high-performance" }}
      >
        <Suspense fallback={null}>
          {/* Advanced Studio Lighting for Glass Refraction & Highlights */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 15, 5]} intensity={1.2} />
          <pointLight position={[-8, 5, 3]} intensity={1.8} color="#00e5ff" /> {/* Cool cyan rim light */}
          <pointLight position={[8, -5, 4]} intensity={1.5} color="#ff9100" />  {/* Warm amber rim light */}

          <ParticleWave />
          <StarField />
          <SceneController />
          {slides.map((slide, index) => (
            <Pod3D
              key={slide.id}
              id={slide.id}
              index={index}
              isActive={activeSlide === index}
              isNearActive={isNear(index)}
              activeSlide={activeSlide}
            >
              {slide.component}
            </Pod3D>
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
