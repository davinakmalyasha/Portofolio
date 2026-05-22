"use client";

import React, { useState, memo } from "react";
import { motion } from "framer-motion";
import { Project } from "../types/portfolio.types";
import { getThumbnailUrl } from "../utils/image";

interface WorkCardProps {
  work: Project;
  idx: number;
  onExploreProject: (project: Project) => void;
  isNearActive: boolean;
}

const renderPlaceholderSvg = (work: Project): React.JSX.Element => {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.8 }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background blueprint grid lines */}
      <line x1="0" y1="20" x2="200" y2="20" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="40" x2="200" y2="40" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="60" x2="200" y2="60" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="80" x2="200" y2="80" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="100" x2="200" y2="100" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="40" y1="0" x2="40" y2="120" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="80" y1="0" x2="80" y2="120" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="120" y1="0" x2="120" y2="120" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="160" y1="0" x2="160" y2="120" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />

      {/* Calming glow circle */}
      <circle cx="100" cy="60" r="35" fill="url(#glow)" />

      {/* Outer concentric tech circles */}
      <circle cx="100" cy="60" r="40" fill="none" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="100" cy="60" r="46" fill="none" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.5" />

      {/* Technical crosshair ticks */}
      <line x1="100" y1="14" x2="100" y2="18" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="100" y1="102" x2="100" y2="106" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="54" y1="60" x2="58" y2="60" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="142" y1="60" x2="146" y2="60" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="1" />

      {/* Minimalist flat hammer illustration rotated 45deg */}
      <g transform="translate(100, 60) rotate(45)">
        {/* Hammer Handle */}
        <rect x="-2.5" y="0" width="5" height="32" rx="2" fill="var(--foreground)" fillOpacity="0.45" />
        <rect x="-2.5" y="18" width="5" height="14" rx="1.5" fill="var(--foreground)" fillOpacity="0.75" />
        
        {/* Hammer Head Connection Collar */}
        <rect x="-3.5" y="-2" width="7" height="3" fill="var(--foreground)" fillOpacity="0.65" />

        {/* Hammer Head Main Body */}
        <rect x="-10" y="-11" width="20" height="9" rx="1.5" fill="var(--foreground)" fillOpacity="0.85" />
        
        {/* Claw curve (Left) */}
        <path d="M-10 -11 C-15 -11 -18 -8 -20 -3 L-15 -3 C-13 -7 -10 -7 -10 -7 Z" fill="var(--foreground)" fillOpacity="0.85" />
        
        {/* Striking Face (Right) */}
        <rect x="10" y="-9.5" width="3" height="6" rx="0.5" fill="var(--foreground)" fillOpacity="0.95" />
        <rect x="7" y="-8.5" width="4" height="4" fill="var(--foreground)" fillOpacity="0.85" />
      </g>
    </svg>
  );
};

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
            opacity: isNearActive ? 0 : 1,
            transition: "opacity 0.5s ease",
            pointerEvents: "none"
          }}
        >
          {renderPlaceholderSvg(work)}
        </div>
      </div>

      <div className="work-card-body">
        <h3>{work.title}</h3>
        <p className="work-category">{work.category || "Development"}</p>
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
