"use client";

import React from "react";

const STATS_ITEMS = [
  { value: "12+", label: "SUCCESSFUL DEPLOYMENTS" },
  { value: "99.98%", label: "MODEL UPTIME RATING" },
  { value: "100K+", label: "API INFERENCE QUERIES" },
  { value: "125 FPS", label: "REAL-TIME DETECTION RATE" }
];

export default function StatsTab(): React.JSX.Element {
  return (
    <div className="stats-tab-content">
      <h3 className="tab-title">Production Telemetry Stats</h3>
      <div className="stats-grid-row">
        {STATS_ITEMS.map((stat, idx) => (
          <div key={idx} className="stat-telemetry-box">
            <span className="stat-value-hud">{stat.value}</span>
            <span className="stat-label-hud">{stat.label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
