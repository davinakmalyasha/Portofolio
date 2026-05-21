"use client";

import React from "react";

export default function ProfileColumn(): React.JSX.Element {
  return (
    <div className="profile-column">
      {/* Portrait Image Container */}
      <div className="profile-photo-container">
        <div className="hud-corner hud-top-left" />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="/imgOrIcon/d.jpeg"
          alt="Davin Akmal Yasha"
          className="profile-photo"
        />
      </div>

      {/* Status & Location Row */}
      <div className="profile-details-grid">
        <div className="detail-box">
          <span className="detail-label">STATUS</span>
          <span className="detail-value status-available">
            <span className="status-dot" /> Available
          </span>
        </div>
        <div className="detail-box">
          <span className="detail-label">LOCATION</span>
          <span className="detail-value">🇮🇩 Indonesia</span>
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
