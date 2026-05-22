"use client";

import React, { useMemo } from "react";
import { GitHubProfile, LanguageStat } from "../../types/github.types";

interface ProfilePanelProps {
  profile: GitHubProfile;
  languages: LanguageStat[];
  totalEstLinesOfCode: number;
}

export default function ProfilePanel({
  profile,
  languages,
  totalEstLinesOfCode,
}: ProfilePanelProps): React.JSX.Element {
  // Aggregate total stars or forks if we want, but for now we display profile stats
  const formattedLines = useMemo(() => {
    return totalEstLinesOfCode.toLocaleString();
  }, [totalEstLinesOfCode]);

  const topLanguages = useMemo(() => {
    return languages.slice(0, 4);
  }, [languages]);

  return (
    <div className="github-profile-panel">
      {/* HUD corner brackets */}
      <div className="tech-corner tech-top-left" style={{ top: "6px", left: "6px" }} />
      <div className="tech-corner tech-top-right" style={{ top: "6px", right: "6px" }} />
      <div className="tech-corner tech-bottom-left" style={{ bottom: "6px", left: "6px" }} />
      <div className="tech-corner tech-bottom-right" style={{ bottom: "6px", right: "6px" }} />

      <div className="github-user-info">
        <div className="github-avatar-wrapper">
          <img
            src={profile.avatarUrl}
            alt={`${profile.name}'s Avatar`}
            className="github-avatar"
            loading="lazy"
          />
        </div>
        <div className="github-profile-meta">
          <h3>{profile.name}</h3>
          <div className="github-login">@{profile.login}</div>
        </div>
        <p className="github-bio">{profile.bio}</p>
      </div>

      <div className="github-stats-grid">
        <div className="github-stat-card cursor-target">
          <span className="github-stat-value">{profile.publicRepos}</span>
          <span className="github-stat-label">Repos</span>
        </div>
        <div className="github-stat-card cursor-target">
          <span className="github-stat-value">{profile.followers}</span>
          <span className="github-stat-label">Followers</span>
        </div>
        <div className="github-stat-card cursor-target">
          <span className="github-stat-value">3</span> {/* Hardcoded/summed stars proxy */}
          <span className="github-stat-label">Stars Received</span>
        </div>
        <div className="github-stat-card cursor-target" style={{ gridColumn: "span 2" }}>
          <span className="github-stat-value">{formattedLines}</span>
          <span className="github-stat-label">Est. Lines of Code</span>
        </div>
      </div>

      <div className="github-languages-wrapper">
        <span className="github-languages-title">Code Distribution</span>
        
        {/* Progress Bar Segmented Map */}
        <div className="github-languages-bar">
          {languages.map((lang) => (
            <div
              key={lang.name}
              className="github-lang-segment"
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: lang.color,
              }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>

        {/* Chips List */}
        <div className="github-languages-list">
          {topLanguages.map((lang) => (
            <div key={lang.name} className="github-lang-chip">
              <span className="github-lang-dot" style={{ backgroundColor: lang.color }} />
              <span>{lang.name}</span>
              <span className="github-lang-percentage">{lang.percentage}%</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
