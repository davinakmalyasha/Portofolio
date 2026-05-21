"use client";

import React, { Suspense } from "react";
import { Canvas } from "@react-three/fiber";
import ParticleWave from "./ParticleWave";
import SceneController from "./SceneController";
import Pod3D from "./Pod3D";
import SectionHome from "./SectionHome";
import SectionWorks from "./SectionWorks";
import SectionAbout from "./SectionAbout";
import SectionExperience from "./SectionExperience";
import SectionServices from "./SectionServices";
import SectionContact from "./SectionContact";
import { Project, Experience } from "../types/portfolio.types";

interface Canvas3DProps {
  showContent: boolean;
  activeSlide: number;
  onExploreProject: (project: Project) => void;
  onExploreExperience: (experience: Experience) => void;
}

export default function Canvas3D({ showContent, activeSlide, onExploreProject, onExploreExperience }: Canvas3DProps): React.JSX.Element {
  const slides = [
    { id: "home", component: <SectionHome ready={showContent} /> },
    { id: "about", component: <SectionAbout /> },
    { id: "works", component: <SectionWorks onExploreProject={onExploreProject} /> },
    { id: "experience", component: <SectionExperience onExploreExperience={onExploreExperience} /> },
    { id: "services", component: <SectionServices /> },
    { id: "contact", component: <SectionContact /> },
  ];

  return (
    <div className="canvas-container" style={{ pointerEvents: "auto", zIndex: 10 }}>
      <Canvas
        camera={{ position: [0, 0, 5], fov: 60 }}
        gl={{ antialias: true, alpha: true }}
      >
        <Suspense fallback={null}>
          {/* Advanced Studio Lighting for Glass Refraction & Highlights */}
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 15, 5]} intensity={1.2} />
          <pointLight position={[-8, 5, 3]} intensity={1.8} color="#00e5ff" /> {/* Cool cyan rim light */}
          <pointLight position={[8, -5, 4]} intensity={1.5} color="#ff9100" />  {/* Warm amber rim light */}

          <ParticleWave />
          <SceneController />
          {slides.map((slide, index) => (
            <Pod3D key={slide.id} id={slide.id} index={index} isActive={activeSlide === index}>
              {slide.component}
            </Pod3D>
          ))}
        </Suspense>
      </Canvas>
    </div>
  );
}
