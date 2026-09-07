"use client";

import React from "react";

const WORK_EXPERIENCES = [
  {
    role: "IT Development Intern",
    company: "PT LEN Industri (Persero) | Bandung, Indonesia",
    period: "FEB 2026 - AUG 2026",
    desc: "Architected multi-agent SDLC automation (LangChain, LangGraph) and procurement BPM proofs-of-concept (Camunda, Formsflow.ai, React); benchmarked Jules and Antigravity + SPARC agents."
  },
  {
    role: "Freelance Agentic Software Engineer",
    company: "Centrum Badminton | Bandung, Indonesia",
    period: "AUG 2026 - PRESENT",
    desc: "Building multi-tenant Golang + Supabase/PostgreSQL backend with multi-persona AI agents (customer, staff, owner) and automated Excel financial reports."
  }
];

export default function WorkTab(): React.JSX.Element {
  return (
    <div className="work-tab-content">
      <h3 className="tab-title">Professional Work Experience</h3>
      <div className="work-timeline-list">
        {WORK_EXPERIENCES.map((exp, idx) => (
          <div key={idx} className="work-timeline-item">
            <div className="work-item-header">
              <h4 className="work-item-role">{exp.role}</h4>
              <span className="work-item-period">{exp.period}</span>
            </div>
            <span className="work-item-company">{exp.company}</span>
            <p className="work-item-desc">{exp.desc}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
