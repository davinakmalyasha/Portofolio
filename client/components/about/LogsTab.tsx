"use client";

import React from "react";

const LOG_ENTRIES = [
  { time: "2026-09-01", event: "AUTHORED 68-PAGE STARK AGENTIC AI ARCHITECTURE WHITEPAPER" },
  { time: "2026-08-01", event: "STARTED FREELANCE AGENTIC ROLE @ CENTRUM BADMINTON" },
  { time: "2026-07-01", event: "EARNED GOOGLE AI PROFESSIONAL CERTIFICATE" },
  { time: "2026-05-20", event: "AUTHORED 4C MOBILE ECOSYSTEM CAPSTONE THESIS PAPER" },
  { time: "2026-05-01", event: "EARNED IBM AI ENGINEERING PROFESSIONAL CERTIFICATE" },
  { time: "2026-02-01", event: "STARTED IT DEVELOPMENT INTERNSHIP @ PT LEN INDUSTRI" }
];

export default function LogsTab(): React.JSX.Element {
  return (
    <div className="logs-tab-content">
      <h3 className="tab-title">System Activity Logs</h3>
      <div className="terminal-logs-container">
        <div className="terminal-header">
          <span className="terminal-dot red" />
          <span className="terminal-dot yellow" />
          <span className="terminal-dot green" />
          <span className="terminal-title">system_activity.log</span>
        </div>
        <div className="terminal-body">
          {LOG_ENTRIES.map((entry, idx) => (
            <div key={idx} className="terminal-line">
              <span className="log-timestamp">[{entry.time}]</span>
              <span className="log-action"> {entry.event}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
