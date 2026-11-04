"use client";

import React, { Suspense, useCallback, useMemo } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleWave from "./ParticleWave";
import StarField from "./StarField";
import SceneController from "./SceneController";
import SceneAtmosphere from "./SceneAtmosphere";
import Pod3D from "./Pod3D";
import SectionHome from "./SectionHome";
import SectionWorks from "./SectionWorks";
import SectionAbout from "./SectionAbout";
import SectionExperience from "./SectionExperience";
import SectionGitHub from "./SectionGitHub";
import SectionCertificates from "./SectionCertificates";
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
    { id: "certificates", component: <SectionCertificates /> },
    { id: "contact", component: <SectionContact /> },
  ], [showContent, isNear, onExploreProject, onExploreExperience]);

  return (
    <div className="canvas-container" style={{ pointerEvents: "auto", zIndex: 10 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{
          antialias: true,
          alpha: true,
          stencil: false,
          powerPreference: "high-performance",
        }}
      >
        <Suspense fallback={null}>
          <SceneAtmosphere />
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
