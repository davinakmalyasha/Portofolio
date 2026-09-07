"use client";

import React from "react";
import { motion } from "framer-motion";
import { EXPERIENCES_DATA } from "../../data/experiences";
import { Experience } from "../../types/portfolio.types";

interface Experience2DProps {
  onExploreExperience: (experience: Experience) => void;
}

export default function Experience2D({ onExploreExperience }: Experience2DProps): React.JSX.Element {
  return (
    <section id="experience" className="p2d-section p2d-experience">
      <div className="p2d-head">
        <span className="p2d-head-index">(03)</span>
        <h2 className="p2d-head-title">Experience</h2>
        <span className="p2d-head-meta">PROFESSIONAL LOG</span>
        <span className="p2d-head-rule" />
      </div>

      <div className="p2d-timeline">
        {EXPERIENCES_DATA.map((exp, i) => (
          <motion.article
            key={exp.id}
            className="p2d-timeline-item"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: i * 0.08 }}
          >
            <div className="p2d-timeline-rail">
              <span className="p2d-timeline-date">{exp.date ?? exp.year}</span>
              <span className="p2d-timeline-dot" />
              <span className="p2d-timeline-line" />
            </div>

            <div className="p2d-timeline-card">
              <div className="p2d-timeline-top">
                <span className="p2d-timeline-num">{exp.num ?? String(exp.id).padStart(2, "0")}</span>
                <span className="p2d-timeline-category">{exp.category}</span>
              </div>

              <h3 className="p2d-timeline-title">
                {exp.title} <em>@ {exp.company}</em>
              </h3>

              <p className="p2d-timeline-desc">{exp.description}</p>

              <div className="p2d-timeline-tech">
                {exp.techStack.slice(0, 6).map((tech, idx) => (
                  <span key={tech}>{idx > 0 && " / "}{tech}</span>
                ))}
              </div>

              <button
                onClick={() => onExploreExperience(exp)}
                className="p2d-explore-link cursor-target"
              >
                VIEW DETAILS <span aria-hidden="true">↗</span>
              </button>
            </div>
          </motion.article>
        ))}
      </div>
    </section>
  );
}
