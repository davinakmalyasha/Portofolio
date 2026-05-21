"use client";

import React from "react";

interface ExperienceBodyProps {
  overview?: string;
  techStack: string[];
  challenges?: string[];
  solutions?: string[];
}

export default function ExperienceBody({
  overview,
  techStack,
  challenges = [],
  solutions = [],
}: ExperienceBodyProps): React.JSX.Element {
  return (
    <div className="pm-body-grid">
      <div className="pm-body-col left-col">
        <h3>ROLE OVERVIEW</h3>
        <p className="pm-overview-text">{overview || "No overview provided."}</p>

        <h3>SKILLS & TOOL INDEX</h3>
        <div className="pm-tech-grid">
          {techStack.map((tech) => (
            <span key={tech} className="pm-tech-badge">
              {tech}
            </span>
          ))}
        </div>
      </div>

      <div className="pm-body-col right-col">
        <h3>RESPONSIBILITIES & CONTRIBUTIONS</h3>
        {challenges.length === 0 ? (
          <p className="pm-muted-text">No role responsibilities recorded.</p>
        ) : (
          <div className="pm-challenges-list">
            {challenges.map((challenge, idx) => (
              <div key={idx} className="pm-challenge-card">
                <div className="pm-challenge-header">
                  <span className="pm-icon-tag challenge-icon">▲</span>
                  <h4>RESPONSIBILITY 0{idx + 1}</h4>
                </div>
                <p className="pm-challenge-desc">{challenge}</p>
                
                {solutions[idx] && (
                  <div className="pm-solution-block">
                    <div className="pm-solution-header">
                      <span className="pm-icon-tag solution-icon">◆</span>
                      <h5>KEY ACHIEVEMENT</h5>
                    </div>
                    <p className="pm-solution-desc">{solutions[idx]}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
