"use client";

import React from "react";

const SKILLS_ITEMS = [
  { name: "DEEP LEARNING & COMPUTER VISION", percentage: 92 },
  { name: "LLM ORCHESTRATION & RAG", percentage: 88 },
  { name: "FULL-STACK PRODUCT DEVELOPMENT", percentage: 85 },
  { name: "API DESIGN & DATABASE ARCHITECTURE", percentage: 90 }
];

export default function SkillsTab(): React.JSX.Element {
  return (
    <div className="skills-tab-content">
      <h3 className="tab-title">Technical Skill Indices</h3>
      <div className="skills-meter-list">
        {SKILLS_ITEMS.map((skill, idx) => (
          <div key={idx} className="skill-meter-row">
            <div className="skill-meter-header">
              <span className="skill-meter-name">{skill.name}</span>
              <span className="skill-meter-percent">{skill.percentage}%</span>
            </div>
            <div className="skill-meter-track">
              <div 
                className="skill-meter-fill" 
                style={{ width: `${skill.percentage}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
