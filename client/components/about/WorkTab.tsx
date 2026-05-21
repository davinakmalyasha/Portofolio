"use client";

import React from "react";

const WORK_EXPERIENCES = [
  {
    role: "AI & Full-Stack Engineer",
    company: "Freelance / Independent Contracts",
    period: "2024 - PRESENT",
    desc: "Developing custom AI agents, custom Computer Vision inference APIs, and building responsive full-stack Next.js dashboards."
  },
  {
    role: "Machine Learning Associate",
    company: "Tech Systems Lab",
    period: "2023 - 2024",
    desc: "Worked on automated object classification pipelines and deployed localized deep learning model weights to cloud servers."
  },
  {
    role: "Creative Web Developer",
    company: "Digital Studio Corp",
    period: "2021 - 2023",
    desc: "Crafted interactive web animations and implemented WebGL-based product customizers."
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
