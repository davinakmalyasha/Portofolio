"use client";

import React from "react";

const STACKS = [
  { category: "AI & AGENTS", items: ["Python", "Pydantic-AI", "LangChain / LangGraph", "MCP", "Hugging Face"] },
  { category: "FRONTEND & WEB", items: ["React 19", "Next.js", "TypeScript", "Tailwind CSS", "Three.js / R3F"] },
  { category: "BACKEND & INFRA", items: ["Golang", "Laravel 13", "PostgreSQL / Supabase", "Redis / SQLite", "FastAPI / FrankenPHP"] }
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
