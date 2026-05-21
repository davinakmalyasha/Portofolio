"use client";

import React from "react";

const STACKS = [
  { category: "AI & DEEP LEARNING", items: ["Python", "PyTorch", "YOLOv8 / OpenCV", "LangChain / RAG", "OpenAI APIs"] },
  { category: "FRONTEND & WEB", items: ["React.js", "Next.js", "TypeScript", "Three.js / React Three Fiber", "Framer Motion"] },
  { category: "BACKEND & INFRA", items: ["Node.js", "Express / FastAPIs", "PostgreSQL", "Docker", "Git / GitHub Actions"] }
];

export default function StackTab(): React.JSX.Element {
  return (
    <div className="stack-tab-content">
      <h3 className="tab-title">Technical Stacks & Tools</h3>
      <div className="stacks-grid">
        {STACKS.map((stack, idx) => (
          <div key={idx} className="stack-category-card">
            <span className="stack-category-title">{stack.category}</span>
            <div className="stack-items-wrap">
              {stack.items.map((item, itemIdx) => (
                <span key={itemIdx} className="stack-item-tag">{item}</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
