import { Experience } from "../types/portfolio.types";

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: 1,
    title: "IT Development",
    company: "PT Len Industri (persero)",
    category: "Internship",
    year: "6 Months",
    date: "9 Februari 2026 - 1 August 2026",
    num: "01",
    description: "Researched and built a laptop procurement system using five different development paradigms, from manual coding to asynchronous agentic orchestration.",
    techStack: ["Camunda", "Formsflow.ai", "SPARC Framework", "Jules AI", "React", "TypeScript", "Laravel"],
    images: ["/imgOrIcon/internship_len_itdev_6months.avif"],
    role: "IT Developer",
    overview: "Conducted research and developed a laptop procurement system to analyze, compare, and benchmark five distinct software development methodologies for enterprise workflows.",
    challenges: [
      "Integrating and configuring visual workflow engines (Camunda & Formsflow.ai) with React and TypeScript.",
      "Implementing AI agentic coding using SPARC framework and asynchronous orchestration with Jules.",
      "Comparing development efficiency, maintainability, and code quality across five different approaches."
    ],
    solutions: [
      "Built custom REST API connectors and form handlers to bridge frontend systems with workflow engines.",
      "Leveraged prompt-based agent architectures and asynchronous message queues to build stable agentic coding loops.",
      "Created a comprehensive benchmark report evaluating development time, complexity, and performance for each paradigm."
    ]
  }
];
