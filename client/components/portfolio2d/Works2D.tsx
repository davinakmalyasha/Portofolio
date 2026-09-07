"use client";

import React from "react";
import { motion } from "framer-motion";
import { PROJECTS_DATA } from "../../data/projects";
import { Project } from "../../types/portfolio.types";

interface Works2DProps {
  onExploreProject: (project: Project) => void;
}

export default function Works2D({ onExploreProject }: Works2DProps): React.JSX.Element {
  return (
    <section id="works" className="p2d-section p2d-section--invert p2d-works">
      <div className="p2d-head">
        <span className="p2d-head-index">(02)</span>
        <h2 className="p2d-head-title">Selected Works</h2>
        <span className="p2d-head-meta">PROJECT ARCHIVE</span>
        <span className="p2d-head-rule" />
      </div>

      <div className="p2d-works-list">
        {PROJECTS_DATA.map((project, i) => (
          <motion.article
            key={project.id}
            className="p2d-work-row"
            onClick={() => onExploreProject(project)}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <span className="p2d-work-index">{project.num ?? String(project.id).padStart(2, "0")}</span>

            <div className="p2d-work-body">
              <h3 className="p2d-work-title">{project.title}</h3>
              <p className="p2d-work-desc">{project.description}</p>
              <div className="p2d-work-tech">
                {project.techStack.slice(0, 5).map((tech, idx) => (
                  <span key={tech}>{idx > 0 && " / "}{tech}</span>
                ))}
              </div>
            </div>

            <div className="p2d-work-meta">
              <span className="p2d-work-category">{project.category}</span>
              <span className="p2d-work-year">{project.year}</span>
              <span className={`p2d-work-status p2d-status-${(project.status ?? "development").toLowerCase()}`}>
                {project.status ?? "DEVELOPMENT"}
              </span>
            </div>

            <span className="p2d-work-arrow" aria-hidden="true">↗</span>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
