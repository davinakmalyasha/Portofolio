"use client";

import React from "react";

export default function GithubSkeleton(): React.JSX.Element {
  return (
    <div className="github-slide-layout">
      {/* Profile Skeleton Panel */}
      <div className="github-profile-panel">
        <div className="github-user-info">
          <div className="github-skeleton-avatar github-shimmer" />
          <div className="github-skeleton-text title github-shimmer" style={{ margin: "0 auto 12px" }} />
          <div className="github-skeleton-text short github-shimmer" style={{ margin: "0 auto" }} />
        </div>

        <div className="github-stats-grid" style={{ marginTop: "15px" }}>
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="github-stat-card github-shimmer"
              style={{
                height: "60px",
                border: "none",
                gridColumn: idx === 3 ? "span 2" : "auto",
              }}
            />
          ))}
        </div>

        <div className="github-languages-wrapper" style={{ marginTop: "15px" }}>
          <div className="github-skeleton-text short github-shimmer" />
          <div className="github-languages-bar github-shimmer" style={{ height: "8px", marginTop: "5px" }} />
          <div style={{ display: "flex", gap: "10px", marginTop: "10px" }}>
            <div className="github-shimmer" style={{ height: "14px", width: "50px", borderRadius: "3px" }} />
            <div className="github-shimmer" style={{ height: "14px", width: "60px", borderRadius: "3px" }} />
            <div className="github-shimmer" style={{ height: "14px", width: "45px", borderRadius: "3px" }} />
          </div>
        </div>
      </div>

      {/* Repos Skeleton Section */}
      <div className="github-repos-section">
        <div className="github-skeleton-text short github-shimmer" style={{ width: "200px" }} />
        <div className="github-repos-grid">
          {Array.from({ length: 4 }).map((_, idx) => (
            <div
              key={idx}
              className="github-repo-card github-shimmer"
              style={{ height: "165px", border: "none" }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
