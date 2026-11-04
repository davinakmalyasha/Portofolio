"use client";

import React, { useMemo } from "react";
import Image from "next/image";
import { GitHubProfile, LanguageStat } from "../../types/github.types";

interface ProfilePanelProps {
  profile: GitHubProfile;
  languages: LanguageStat[];
  totalStars: number;
}

export default function ProfilePanel({
  profile,
  languages,
  totalStars,
}: ProfilePanelProps): React.JSX.Element {
  const topLanguages = useMemo(() => {
    return languages.slice(0, 4);
  }, [languages]);

  const topLanguage = topLanguages[0]?.name ?? "N/A";

  return (
    <div className="github-profile-panel">
      {/* HUD corner brackets */}
      <div className="tech-corner tech-top-left" style={{ top: "6px", left: "6px" }} />
      <div className="tech-corner tech-top-right" style={{ top: "6px", right: "6px" }} />
      <div className="tech-corner tech-bottom-left" style={{ bottom: "6px", left: "6px" }} />
      <div className="tech-corner tech-bottom-right" style={{ bottom: "6px", right: "6px" }} />

      <div className="github-user-info">
        <div className="github-avatar-wrapper">
          <Image
            src={profile.avatarUrl}
            alt={`${profile.name}'s Avatar`}
            className="github-avatar"
            width={90}
            height={90}
            sizes="90px"
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
        <div className="github-stat-card">
          <span className="github-stat-value">{profile.publicRepos}</span>
          <span className="github-stat-label">Repos</span>
        </div>
        <div className="github-stat-card">
          <span className="github-stat-value">{profile.followers}</span>
          <span className="github-stat-label">Followers</span>
        </div>
        <div className="github-stat-card">
          <span className="github-stat-value">{totalStars}</span>
          <span className="github-stat-label">Stars Received</span>
        </div>
        <div className="github-stat-card">
          <span className="github-stat-value github-stat-value--text">{topLanguage}</span>
          <span className="github-stat-label">Top Language</span>
        </div>
      </div>

      <div className="github-languages-wrapper">
        <span className="github-languages-title">Code Distribution</span>
        
        {/* Progress Bar Segmented Map */}
        <div className="github-languages-bar">
          {languages.map((lang, index) => (
            <div
              key={lang.name}
              className="github-lang-segment"
              style={{
                width: `${lang.percentage}%`,
                backgroundColor: "var(--foreground)",
                opacity: 0.18 + Math.min(index * 0.16, 0.62),
              }}
              title={`${lang.name}: ${lang.percentage}%`}
            />
          ))}
        </div>

        {/* Chips List */}
        <div className="github-languages-list">
          {topLanguages.map((lang, index) => (
            <div key={lang.name} className="github-lang-chip">
              <span
                className="github-lang-dot"
                style={{
                  backgroundColor: "var(--foreground)",
                  opacity: 0.28 + Math.min(index * 0.16, 0.6),
                }}
              />
              <span>{lang.name}</span>
              <span className="github-lang-percentage">{lang.percentage}%</span>
            </div>
          ))}
        </div>

        <span className="github-source-note">LIVE DATA / GITHUB API / 1H CACHE</span>
      </div>
    </div>
  );
}
