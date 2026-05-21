"use client";

import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { Project } from "../../types/portfolio.types";
import ProjectHeader from "./ProjectHeader";
import ProjectCarousel from "./ProjectCarousel";
import ProjectBody from "./ProjectBody";

interface ProjectDetailModalProps {
  project: Project;
  onClose: () => void;
}

export default function ProjectDetailModal({
  project,
  onClose,
}: ProjectDetailModalProps): React.JSX.Element {
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
          <ProjectHeader
            title={project.title}
            category={project.category}
            year={project.year}
            role={project.role}
            linkGithub={project.linkGithub}
            linkDemo={project.linkDemo}
          />

          <ProjectCarousel images={project.images} title={project.title} />

          <ProjectBody
            overview={project.overview}
            techStack={project.techStack}
            challenges={project.challenges}
            solutions={project.solutions}
          />
        </div>
      </motion.div>
    </motion.div>
  );
}
