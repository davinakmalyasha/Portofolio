"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Project } from "../types/portfolio.types";
import { getThumbnailUrl } from "../utils/image";
import PlaceholderFigure from "./project-modal/PlaceholderFigure";
import { getInitials } from "../utils/initials";

interface WorkCardProps {
  work: Project;
  idx: number;
  onExploreProject: (project: Project) => void;
  isNearActive: boolean;
}

const WorkCard = memo(function WorkCard({ work, idx, onExploreProject, isNearActive }: WorkCardProps): React.JSX.Element {
  const [imgSrc, setImgSrc] = useState<string>(() =>
    work.images && work.images[0] ? getThumbnailUrl(work.images[0]) : ""
  );
  const [imgError, setImgError] = useState(false);

  React.useEffect(() => {
    setImgSrc(work.images && work.images[0] ? getThumbnailUrl(work.images[0]) : "");
    setImgError(false);
  }, [work.images]);

  return (
    <motion.div
      className="work-slide-card cursor-target"
      data-cursor="OPEN"
      initial={{ opacity: 0, x: 50, y: idx % 2 === 0 ? -15 : 15 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      onClick={() => onExploreProject(work)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExploreProject(work);
        }
      }}
    >
      <div className="work-card-header">
        <span className="work-number">{work.num || `0${idx + 1}`}</span>
        <div style={{ display: "flex", alignItems: "center", gap: "6px" }}>
          {work.status && (
            <>
              <span className={`work-status-badge status-${work.status.toLowerCase()}`}>
                {work.status}
              </span>
              <span style={{ opacity: 0.3, fontSize: "0.7rem" }}>|</span>
            </>
          )}
          <span className="work-year">{work.year || "2024"}</span>
        </div>
      </div>
      
      <div className="work-card-visual" style={{ overflow: "hidden", opacity: 0.8, position: "relative" }}>
        {imgSrc && !imgError && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={work.title}
            onError={() => {
              if (work.images && work.images[0] && imgSrc !== work.images[0]) {
                setImgSrc(work.images[0]);
              } else {
                setImgError(true);
              }
            }}
            style={{
              width: "100%",
              height: "100%",
              objectFit: "cover",
              borderRadius: "5px",
              opacity: isNearActive ? 1 : 0,
              transition: "opacity 0.5s ease",
              position: "absolute",
              inset: 0,
              zIndex: 2
            }}
          />
        )}
        <div
          style={{
            width: "100%",
            height: "100%",
            opacity: isNearActive && imgSrc && !imgError ? 0 : 1,
            transition: "opacity 0.5s ease",
            pointerEvents: "none"
          }}
        >
          <PlaceholderFigure label={getInitials(work.title)} />
        </div>
      </div>

      <div className="work-card-body">
        <h3>{work.title}</h3>
        <p className="work-category">{work.category || "Development"}</p>
        {work.role && <span className="work-role">{work.role}</span>}
        <p className="work-details">{work.description}</p>
        
        <div className="work-tech-badges">
          {work.techStack.slice(0, 3).map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
          {work.techStack.length > 3 && (
            <span className="tech-badge" style={{ opacity: 0.6, borderStyle: "dashed" }}>
              +{work.techStack.length - 3}
            </span>
          )}
        </div>
      </div>

      <div className="work-card-footer">
        <a
          href={work.linkGithub}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onExploreProject(work);
          }}
          className="work-explore-link"
        >
          VIEW DETAILED INFORMATION ↗
        </a>
      </div>
    </motion.div>
  );
});

export default WorkCard;
