"use client";

import React from "react";
import { motion } from "framer-motion";
import { Experience } from "../types/portfolio.types";

interface ExperienceCardProps {
  experience: Experience;
  idx: number;
  onExploreExperience: (exp: Experience) => void;
}

export default function ExperienceCard({
  experience,
  idx,
  onExploreExperience,
}: ExperienceCardProps): React.JSX.Element {
  return (
    <motion.div
      className="experience-slide-card cursor-target"
      initial={{ opacity: 0, x: 50, y: idx % 2 === 0 ? -15 : 15 }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.25, 1, 0.5, 1] }}
      onClick={() => {
        console.log("ExperienceCard: Clicked experience card:", experience.title);
        onExploreExperience(experience);
      }}
      tabIndex={0}
      onKeyDown={(e) => {
        if (e.key === "Enter" || e.key === " ") {
          e.preventDefault();
          console.log("ExperienceCard: KeyPressed experience card:", experience.title, e.key);
          onExploreExperience(experience);
        }
      }}
    >
      <div className="experience-card-header">
        <span className="experience-number">{experience.num || `0${idx + 1}`}</span>
        <span className="experience-year">[{experience.year || "2024"}]</span>
      </div>
      
      <div className="experience-card-visual" style={{ overflow: "hidden", opacity: 0.8 }}>
        {experience.images && experience.images[0] ? (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            src={experience.images[0]}
            alt={experience.title}
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

      <div className="experience-card-body">
        <h3>{experience.title}</h3>
        <p className="experience-category">{experience.category || "Experience"}</p>
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
            console.log("ExperienceCard: Clicked View Detailed Info link:", experience.title);
            onExploreExperience(experience);
          }}
          className="experience-explore-link"
        >
          VIEW DETAILED INFORMATION ↗
        </a>
      </div>
    </motion.div>
  );
}
