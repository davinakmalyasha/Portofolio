"use client";

import React from "react";

interface ExperienceHeaderProps {
  title: string;
  company: string;
  category?: string;
  year?: string;
  date?: string;
  role?: string;
  linkGithub?: string;
  linkDemo?: string;
}

export default function ExperienceHeader({
  title,
  company,
  category,
  year,
  date,
  role,
  linkGithub,
  linkDemo,
}: ExperienceHeaderProps): React.JSX.Element {
  return (
    <div className="pm-header">
      <div className="pm-title-section">
        <h1>{title}</h1>
        <div style={{ display: "flex", gap: "10px", alignItems: "center", marginTop: "5px" }}>
          {category && <span className="pm-category-label">{category}</span>}
          <span style={{ fontSize: "0.85rem", fontWeight: 700, color: "var(--text-muted)", textTransform: "uppercase" }}>
            @ {company}
          </span>
        </div>
      </div>

      <div className="pm-header-meta-actions">
        <div className="pm-meta-grid">
          <div className="pm-meta-box">
            <span className="pm-meta-lbl">ROLE</span>
            <span className="pm-meta-val">{role || "Participant"}</span>
          </div>
          <div className="pm-meta-box">
            <span className="pm-meta-lbl">TIMELINE</span>
            <span className="pm-meta-val">{date || year || "2024"}</span>
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
              VIEW RELEVANT CODE ↗
            </a>
          )}
          {linkDemo && (
            <a
              href={linkDemo}
              target="_blank"
              rel="noopener noreferrer"
              className="pm-action-btn demo"
            >
              VIEW WEBSITE / CREDENTIAL ↗
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
