"use client";

import React from "react";

interface ProfileColumnProps {
  isNearActive: boolean;
}

export default function ProfileColumn({ isNearActive }: ProfileColumnProps): React.JSX.Element {
  return (
    <div className="profile-column">
      {/* Portrait Image Container */}
      <div className="profile-photo-container">
        <div className="hud-corner hud-top-left" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/imgOrIcon/d.avif"
          alt="Davin Akmal Yasha"
          className="profile-photo"
          style={{
            opacity: isNearActive ? 1 : 0.05,
            transition: "opacity 0.5s ease"
          }}
        />
      </div>

      {/* University & GPA Row */}
      <div className="profile-details-grid">
        <div className="detail-box">
          <span className="detail-label">UNIVERSITY</span>
          <span className="detail-value">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src="/imgOrIcon/logoTelkom.jpg"
              alt="Telkom University"
              className="university-logo"
            />
            <span className="university-name">Telkom University</span>
          </span>
        </div>
        <div className="detail-box">
          <span className="detail-label">GPA</span>
          <span className="detail-value">
            3.55 <span className="gpa-scale">/ 4.00</span>
          </span>
        </div>
      </div>

      {/* Mini Mindset Cards */}
      <div className="profile-mindset-row">
        <div className="mindset-card">
          <span className="mindset-title">SOFTWARE</span>
          <span className="mindset-subtitle">ENGINEERING</span>
        </div>
        <div className="mindset-card">
          <span className="mindset-title">AI</span>
          <span className="mindset-subtitle">ORCHESTRATION</span>
        </div>
        <div className="mindset-card">
          <span className="mindset-title">FULL-STACK</span>
          <span className="mindset-subtitle">DEVELOPMENT</span>
        </div>
      </div>
    </div>
  );
}
