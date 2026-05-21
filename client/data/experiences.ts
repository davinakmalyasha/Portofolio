import { Experience } from "../types/portfolio.types";

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: 1,
    title: "IT Development Intern",
    company: "PT LEN Industri (Persero)",
    category: "Internship",
    year: "6 Months",
    num: "01",
    description: "Researched and built a laptop procurement system using five different development paradigms, from manual coding to asynchronous agentic orchestration.",
    techStack: ["Camunda", "Formsflow.ai", "SPARC Framework", "Jules AI", "React", "TypeScript", "Python"],
    images: ["/imgOrIcon/1769180001217.png"],
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
