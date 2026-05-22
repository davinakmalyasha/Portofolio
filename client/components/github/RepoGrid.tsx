"use client";

import React from "react";
import { GitHubRepo } from "../../types/github.types";

interface RepoGridProps {
  repos: GitHubRepo[];
}

export default function RepoGrid({ repos }: RepoGridProps): React.JSX.Element {
  return (
    <div className="github-repos-section">
      <span className="github-section-subtitle">LATEST OPEN SOURCE WORK</span>
      <div className="github-repos-grid">
        {repos.map((repo) => (
          <a
            key={repo.id}
            href={repo.htmlUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="github-repo-card cursor-target"
          >
            {/* HUD corner highlights */}
            <div className="tech-corner tech-top-left" style={{ top: "6px", left: "6px" }} />
            <div className="tech-corner tech-top-right" style={{ top: "6px", right: "6px" }} />
            <div className="tech-corner tech-bottom-left" style={{ bottom: "6px", left: "6px" }} />
            <div className="tech-corner tech-bottom-right" style={{ bottom: "6px", right: "6px" }} />

            <div className="github-repo-header">
              <h4 className="github-repo-title">{repo.name}</h4>
              <span className="github-repo-icon">
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                  <polyline points="15 3 21 3 21 9" />
                  <line x1="10" y1="14" x2="21" y2="3" />
                </svg>
              </span>
            </div>

            <p className="github-repo-desc">{repo.description || "No description provided."}</p>

            <div className="github-repo-footer">
              <span className="github-repo-lang">
                {repo.language && (
                  <>
                    <span 
                      className="github-lang-dot" 
                      style={{ 
                        backgroundColor: 
                          repo.language === "TypeScript" ? "#3178c6" :
                          repo.language === "JavaScript" ? "#f1e05a" :
                          repo.language === "PHP" ? "#4f5d95" :
                          repo.language === "HTML" ? "#e34c26" : "#858585"
                      }} 
                    />
                    <span>{repo.language}</span>
                  </>
                )}
              </span>

              <div className="github-repo-telemetry">
                <span className="github-telemetry-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
                  </svg>
                  <span>{repo.stargazersCount}</span>
                </span>
                <span className="github-telemetry-item">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
                    <circle cx="18" cy="18" r="3" />
                    <circle cx="6" cy="6" r="3" />
                    <circle cx="6" cy="18" r="3" />
                    <path d="M18 15V9a4 4 0 0 0-4-4H9" />
                    <line x1="6" y1="9" x2="6" y2="15" />
                  </svg>
                  <span>{repo.forksCount}</span>
                </span>
              </div>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
