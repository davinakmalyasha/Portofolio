"use client";

import React from "react";

interface ProjectHeaderProps {
  title: string;
  category?: string;
  year?: string;
  role?: string;
  linkGithub?: string;
  linkDemo?: string;
}

export default function ProjectHeader({
  title,
  category,
  year,
  role,
  linkGithub,
  linkDemo,
}: ProjectHeaderProps): React.JSX.Element {
  return (
    <div className="pm-header">
      <div className="pm-title-section">
        <h1>{title}</h1>
        {category && <span className="pm-category-label">{category}</span>}
      </div>

      <div className="pm-header-meta-actions">
        <div className="pm-meta-grid">
          <div className="pm-meta-box">
            <span className="pm-meta-lbl">ROLE</span>
            <span className="pm-meta-val">{role || "Lead Developer"}</span>
          </div>
          <div className="pm-meta-box">
            <span className="pm-meta-lbl">TIMELINE</span>
            <span className="pm-meta-val">{year || "2024"}</span>
          </div>
        </div>

        <div className="pm-actions-group">
          {linkGithub && (
            <a
              href={linkGithub}
              target="_blank"
              rel="noopener noreferrer"
              className="pm-action-btn github"
            >
              VIEW GITHUB CODEBASE ↗
            </a>
          )}
          {linkDemo && (
            <a
              href={linkDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="pm-action-btn demo"
            >
              LAUNCH LIVE APPLICATION ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
