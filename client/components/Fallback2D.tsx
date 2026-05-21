"use client";

import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import SectionHome from "./SectionHome";
import SectionAbout from "./SectionAbout";
import SectionWorks from "./SectionWorks";
import SectionExperience from "./SectionExperience";
import SectionServices from "./SectionServices";
import SectionContact from "./SectionContact";
import { Project, Experience } from "../types/portfolio.types";

interface Fallback2DProps {
  showContent: boolean;
  activeSlide: number;
  onExploreProject: (project: Project) => void;
  onExploreExperience: (experience: Experience) => void;
}

export default function Fallback2D({
  showContent,
  activeSlide,
  onExploreProject,
  onExploreExperience,
}: Fallback2DProps): React.JSX.Element {
  const slides = [
    { id: "home", component: <SectionHome ready={showContent} /> },
    { id: "about", component: <SectionAbout /> },
    { id: "works", component: <SectionWorks onExploreProject={onExploreProject} /> },
    { id: "experience", component: <SectionExperience onExploreExperience={onExploreExperience} /> },
    { id: "services", component: <SectionServices /> },
    { id: "contact", component: <SectionContact /> },
  ];

  return (
    <div className="fallback-2d-container fallback-2d">
      <AnimatePresence mode="wait">
        {slides.map((slide, index) => {
          if (index !== activeSlide) return null;

          return (
            <motion.div
              key={slide.id}
              initial={{ opacity: 0, scale: 0.96, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.96, y: -15 }}
              transition={{ duration: 0.45, ease: [0.25, 1, 0.3, 1] }}
              className="fallback-slide-wrapper"
            >
              <section className="slide-section active" id={slide.id}>
                <div className="capsule-pod capsule-opened">
                  <div className="tech-corner tech-top-left" />
                  <div className="tech-corner tech-top-right" />
                  <div className="tech-corner tech-bottom-left" />
                  <div className="tech-corner tech-bottom-right" />
                  <div className="capsule-content-card" style={{ pointerEvents: "auto" }}>
                    {slide.component}
                  </div>
                </div>
              </section>
            </motion.div>
          );
        })}
      </AnimatePresence>
    </div>
  );
}
