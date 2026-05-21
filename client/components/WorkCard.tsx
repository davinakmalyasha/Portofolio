"use client";

import React from "react";
import { motion } from "framer-motion";
import { Project } from "../types/portfolio.types";

interface WorkCardProps {
  work: Project;
  idx: number;
  onExploreProject: (project: Project) => void;
}

export default function WorkCard({ work, idx, onExploreProject }: WorkCardProps): React.JSX.Element {
  return (
    <motion.div
      className="work-slide-card cursor-target"
      initial={{ opacity: 0, x: 50, y: idx % 2 === 0 ? -15 : 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      onClick={() => {
        console.log("WorkCard: Clicked project card:", work.title);
        onExploreProject(work);
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          console.log("WorkCard: KeyPressed project card:", work.title, e.key);
          onExploreProject(work);
        }
      }}
    >
      <div className="work-card-header">
        <span className="work-number">{work.num || `0${idx + 1}`}</span>
        <span className="work-year">[{work.year || "2024"}]</span>
      </div>
      
      <div className="work-card-visual" style={{ overflow: "hidden", opacity: 0.8 }}>
        {work.images && work.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={work.images[0]}
            alt={work.title}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "5px",
              filter: "grayscale(100%) contrast(110%)"
            }}
          />
        ) : (
          <div className="visual-pattern" />
        )}
      </div>

      <div className="work-card-body">
        <h3>{work.title}</h3>
        <p className="work-category">{work.category || "Development"}</p>
        <p className="work-details">{work.description}</p>
        
        <div className="work-tech-badges">
          {work.techStack.slice(0, 3).map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </div>

      <div className="work-card-footer">
        <a
          href={work.linkGithub}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            console.log("WorkCard: Clicked View Detailed Info link:", work.title);
            onExploreProject(work);
          }}
          className="work-explore-link"
        >
          VIEW DETAILED INFORMATION ↗
        </a>
      </div>
    </motion.div>
  );
}
