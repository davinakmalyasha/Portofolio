"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Experience } from "../../types/portfolio.types";
import ExperienceHeader from "./ExperienceHeader";
import ProjectCarousel from "./ProjectCarousel";
import ExperienceBody from "./ExperienceBody";

interface ExperienceDetailModalProps {
  experience: Experience;
  onClose: () => void;
}

export default function ExperienceDetailModal({
  experience,
  onClose,
}: ExperienceDetailModalProps): React.JSX.Element {
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent): void => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>): void => {
    if (e.target === e.currentTarget) onClose();
  };

  return (
    <motion.div
      className="pm-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.3 }}
      onClick={handleBackdropClick}
    >
      <motion.div
        className="pm-modal-box"
        initial={{ opacity: 0, y: 30, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        exit={{ opacity: 0, y: 30, scale: 0.98 }}
        transition={{ duration: 0.4, ease: [0.25, 1, 0.5, 1] }}
      >
        <button onClick={onClose} className="pm-close-btn" aria-label="Close Modal">
          ✕
        </button>

        <div className="pm-scrollable-content" data-lenis-prevent>
          <ExperienceHeader
            title={experience.title}
            company={experience.company}
            category={experience.category}
            year={experience.year}
            date={experience.date}
            role={experience.role}
            linkGithub={experience.linkGithub}
            linkDemo={experience.linkDemo}
          />

          <ProjectCarousel images={experience.images} title={experience.title} />

          <ExperienceBody
            overview={experience.overview}
            techStack={experience.techStack}
            challenges={experience.challenges}
            solutions={experience.solutions}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
