"use client";

import React, { memo } from "react";
import { motion } from "framer-motion";
import { Experience } from "../types/portfolio.types";
import { getThumbnailUrl } from "../utils/image";

interface ExperienceCardProps {
  experience: Experience;
  idx: number;
  onExploreExperience: (exp: Experience) => void;
  isNearActive: boolean;
}

const ExperienceCard = memo(function ExperienceCard({
  experience,
  idx,
  onExploreExperience,
  isNearActive,
}: ExperienceCardProps): React.JSX.Element {
  const [imgSrc, setImgSrc] = React.useState<string>(() =>
    experience.images && experience.images[0] ? getThumbnailUrl(experience.images[0]) : ""
  );

  React.useEffect(() => {
    setImgSrc(experience.images && experience.images[0] ? getThumbnailUrl(experience.images[0]) : "");
  }, [experience.images]);

  return (
    <motion.div
      className="experience-slide-card cursor-target"
      initial={{ opacity: 0, x: 50, y: idx % 2 === 0 ? -15 : 15 }}
      animate={{ opacity: 1, x: 0, y: 0 }}
      transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      onClick={() => onExploreExperience(experience)}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          onExploreExperience(experience);
        }
      }}
    >
      <div className="experience-card-header">
        <span className="experience-number">{experience.num || `0${idx + 1}`}</span>
        <span className="experience-year">[{experience.year || "2024"}]</span>
      </div>
      
      <div className="experience-card-visual" style={{ overflow: "hidden", opacity: 0.8, position: "relative" }}>
        {imgSrc && (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={imgSrc}
            alt={experience.title}
            onError={() => {
              if (experience.images && experience.images[0] && imgSrc !== experience.images[0]) {
                setImgSrc(experience.images[0]);
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
          className="visual-pattern"
          style={{
            width: "100%",
            height: "100%",
            opacity: isNearActive ? 0 : 1,
            transition: "opacity 0.5s ease",
            pointerEvents: "none"
          }}
        />
      </div>

      <div className="experience-card-body">
        <h3 style={{ display: "flex", flexDirection: "column", gap: "4px" }}>
          <span>{experience.title}</span>
          {experience.company && (
            <span style={{ fontSize: "0.95rem", fontWeight: 500, opacity: 0.8, letterSpacing: "normal" }}>
              {experience.company}
            </span>
          )}
        </h3>
        <p className="experience-category">{experience.category || "Experience"}</p>
        {experience.date && (
          <p className="experience-date">{experience.date}</p>
        )}
        <p className="experience-details">{experience.description}</p>
        
        <div className="experience-tech-badges">
          {experience.techStack.slice(0, 3).map((t) => (
            <span key={t} className="tech-badge">{t}</span>
          ))}
        </div>
      </div>

      <div className="experience-card-footer">
        <a
          href={experience.linkGithub || experience.linkDemo || "#"}
          onClick={(e) => {
            e.preventDefault();
            e.stopPropagation();
            onExploreExperience(experience);
          }}
          className="experience-explore-link"
        >
          VIEW DETAILED INFORMATION ↗
        </a>
      </div>
    </motion.div>
  );
});

export default ExperienceCard;
