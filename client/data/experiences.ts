import { Experience } from "../types/portfolio.types";

export const EXPERIENCES_DATA: Experience[] = [
  {
    id: 1,
    title: "IT Development Intern",
    company: "PT LEN Industri (Persero) | Bandung, Indonesia",
    category: "Internship",
    year: "2026",
    date: "February 2026 - August 2026",
    num: "01",
    description: "Architected multi-agent SDLC automation and procurement BPM proofs-of-concept using LangChain, LangGraph, Camunda, and Formsflow.ai.",
    techStack: ["Python", "LangChain", "LangGraph", "Camunda", "Formsflow.ai", "React"],
    images: ["/imgOrIcon/internship_len_itdev_6months.avif"],
    role: "IT Development Intern | LangChain & LangGraph, Camunda, Formsflow.ai",
    overview: "Architected a multi-agent system with stateful cyclic graphs to automate cross-functional SDLC workflows (SA, BA, Dev, SDET, DevSecOps and Analytics), and built procurement BPM proofs-of-concept modeling BPMN 2.0 workflows connected via REST APIs.",
    challenges: [
      "Automating cross-functional SDLC workflows (SA, BA, Dev, SDET, DevSecOps and Analytics) with stateful agent orchestration.",
      "Modeling BPMN 2.0 procurement workflows with Camunda and Formsflow.ai connected via REST APIs to React.",
      "Benchmarking autonomous coding agents and repository workflows for executive IT leadership."
    ],
    solutions: [
      "Built a multi-agent system using Python, LangChain, and LangGraph with stateful cyclic graphs.",
      "Delivered procurement BPM proofs-of-concept using Camunda, Formsflow.ai, and React.",
      "Evaluated autonomous coding agents (Jules, Antigravity with SPARC framework) to benchmark repository workflows."
    ]
  },
  {
    id: 2,
    title: "Freelance Agentic Software Engineer",
    company: "Centrum Badminton | Bandung, Indonesia",
    category: "Freelance",
    year: "2026",
    date: "August 2026 - Now",
    num: "02",
    description: "Building multi-tenant Golang + Supabase backend with multi-persona AI agents across customer, staff, and owner tiers.",
    techStack: ["Pydantic AI", "Golang", "PostgreSQL", "Supabase", "Next.js"],
    images: [],
    role: "Freelance Agentic Software Engineer | Pydantic AI, Golang, PostgreSQL, Next.JS",
    overview: "Built a multi-tenant backend in Golang and Supabase/PostgreSQL with database isolation logic for instant client provisioning, plus role-specific AI features for 3 user tiers with automated Excel financial reports.",
    challenges: [
      "Eliminating infrastructure overhead while serving multiple tenants under a single codebase.",
      "Serving 3 distinct user tiers: customer inquiry chatbots, staff operations, and owner executive dashboards.",
      "Enabling rapid tenant provisioning to lower delivery time and software pricing."
    ],
    solutions: [
      "Built a multi-tenant backend in Golang and Supabase/PostgreSQL, reducing cloud hosting costs to zero for initial usage tiers.",
      "Engineered multi-persona AI features with automated Excel financial reports for owners.",
      "Designed modular database isolation logic to instantly deploy client instances."
    ]
  }
];
