"use client";

import React from "react";

const LOG_ENTRIES = [
  { time: "2026-05-20", event: "INITIALIZED NEW 3D CYBER-ARCH LAYOUT CONSOLE" },
  { time: "2026-04-18", event: "DEPLOYED EMBEDDED OBJECT SEGMENTATION MODEL (YOLOv8)" },
  { time: "2026-03-05", event: "INTEGRATED RAG PIPELINE WITH VECTOR DATABASE STORAGE" },
  { time: "2026-01-22", event: "COMPLETED AGENTIC LLM CHATBOT DEV WORKFLOWS" },
  { time: "2025-11-10", event: "MIGRATED DIGITAL ARCHITECTURES TO NEXT.JS & R3F" },
  { time: "2025-08-14", event: "IMPLEMENTED FULL-STACK DATABASE ORCHESTRATION LAYER" }
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
