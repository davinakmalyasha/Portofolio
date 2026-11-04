"use client";

import React from "react";

export default function AboutTab(): React.JSX.Element {
  return (
    <div className="about-tab-content">
      <span className="section-kicker">01 / Profile</span>

      <div className="about-header-group">
        <h2 className="about-title">Software Engineer</h2>
        <h4 className="about-subtitle-text">with a Focus on AI Orchestration</h4>
      </div>

      <div className="about-tags-row">
        <span>SOFTWARE ENGINEERING</span>
        <span className="separator">/</span>
        <span>AI ORCHESTRATION</span>
        <span className="separator">/</span>
        <span>FULL-STACK DEVELOPMENT</span>
      </div>

      <div className="about-meta-row">
        <div className="meta-item">
          <span className="meta-label">Location</span>
          <span className="meta-value">Bandung, ID</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Status</span>
          <span className="meta-value">Open to work</span>
        </div>
        <div className="meta-item">
          <span className="meta-label">Focus</span>
          <span className="meta-value">AI orchestration</span>
        </div>
      </div>

      <div className="about-description">
        <p>
          I&apos;m <strong>Davin Akmal Yasha</strong>, a Software Engineer who likes to build 
          solutions by product and system through AI orchestration.
        </p>
        <p>
          I specialize in full-stack development, AI orchestration, and software engineering, 
          focusing on designing scalable system architectures and building high-performance digital products.
        </p>
      </div>

      <div className="about-focus-section">
        <span className="focus-label">ACTIVITY LOGS</span>
        <div className="focus-cards-grid activity-logs-grid">
          <div className="focus-card">
            <span className="focus-card-title">STARK</span>
            <span className="focus-card-meta">Agentic desktop · 2026</span>
          </div>
          <div className="focus-card">
            <span className="focus-card-title">4C</span>
            <span className="focus-card-meta">Construction ecosystem · 2026</span>
          </div>
          <div className="focus-card">
            <span className="focus-card-title">MINDEASE</span>
            <span className="focus-card-meta">Health platform · 2026</span>
          </div>
          <div className="focus-card more-card">
            <span className="focus-card-title">+7</span>
            <span className="focus-card-meta">More selected work</span>
          </div>
        </div>
      </div>
    </div>
  );
}
