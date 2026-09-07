import { Project } from "../types/portfolio.types";

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "4Ceria (4C) - Construction Tech / PropTech Platform",
    category: "Construction & Bidding Platform",
    year: "2026",
    num: "01",
    status: "Development",
    description: "Centralized web app integrating property marketplaces, professional recruitment, and construction tender bidding across 3 user roles.",
    techStack: ["Laravel 13", "React 19", "TypeScript", "Tailwind CSS", "Sanctum RBAC", "Redis", "FrankenPHP"],
    images: [
      "/imgOrIcon/4CProject/4CProject_content1.avif",
      "/imgOrIcon/4CProject/4CProject_content2.avif",
      "/imgOrIcon/4CProject/4CProject_content3.avif",
      "/imgOrIcon/4CProject/4CProject_content4.avif"
    ],
    linkGithub: "https://github.com/davinakmalyasha/4Ceria-4C-",
    linkDemo: "https://github.com/davinakmalyasha/4Ceria-4C-",
    role: "Lead Fullstack Developer",
    overview: "Engineered a centralized web application integrating property marketplaces, professional recruitment (architects & contractors), and construction tender bidding across 3 distinct user roles, with modular RESTful APIs supporting cross-platform mobile synchronization (Android adaptation final project).",
    challenges: [
      "Integrating property marketplaces, recruitment, and tender bidding into one ecosystem with 3 distinct user roles.",
      "Eliminating information asymmetry for clients during tender evaluation.",
      "Supporting cross-platform mobile synchronization, real-time daily progress logging, milestone approvals, and role-based document vaults."
    ],
    solutions: [
      "Engineered a full-stack ecosystem architecture with Laravel Sanctum RBAC and Redis.",
      "Implemented a Weighted Scoring Algorithm (60% proposal price / 40% vendor reputation rating) to automate tender evaluation.",
      "Built modular RESTful APIs with Laravel Sanctum authentication for mobile sync, progress logging, and document vaults."
    ]
  },
  {
    id: 2,
    title: "DFD Agency — AI Automation & Multi-Tenant SaaS Engine",
    category: "AI Automation & SaaS",
    year: "2026",
    num: "02",
    status: "Deployed",
    description: "Web platform and multi-tenant backend for AI automation workflows with automated client intake, scoping, and delivery.",
    techStack: ["Golang", "PostgreSQL", "Supabase", "Next.js", "TypeScript", "Tailwind CSS"],
    images: [
      "/imgOrIcon/DFDAgency/dfdagency_content1.avif",
      "/imgOrIcon/DFDAgency/dfdagency_content2.avif",
      "/imgOrIcon/DFDAgency/dfdagency_content3.avif"
    ],
    linkGithub: "https://github.com/davinakmalyasha/DFDAgencyWebsite",
    linkDemo: "https://github.com/davinakmalyasha/DFDAgencyWebsite",
    role: "Agentic Software Engineer",
    overview: "Built a web platform and dashboard to streamline client intake, automated project scoping, and digital service delivery for AI automation workflows, backed by a high-performance Golang and PostgreSQL/Supabase multi-tenant infrastructure.",
    challenges: [
      "Streamlining agency operations: client intake, project scoping, and service delivery.",
      "Dispatching real-time tasks and automating client communications with operational status updates.",
      "Scaling multiple client instances under a single codebase with zero overhead."
    ],
    solutions: [
      "Built agency operations and client portal dashboards for intake, scoping, and delivery.",
      "Integrated backend API endpoints and automated agent bridges (dfd_bridge) for real-time dispatching and communications.",
      "Engineered Golang + PostgreSQL/Supabase multi-tenant infrastructure with database isolation and instant provisioning."
    ]
  },
  {
    id: 3,
    title: "Portofolio Website",
    category: "Personal Portfolio",
    year: "2026",
    num: "03",
    status: "Deployed",
    description: "Futuristic 3D portfolio showcase with glassmorphic cards and scroll camera animations.",
    techStack: ["React", "Next.js", "Three.js", "TypeScript", "TailwindCSS", "Lenis", "GSAP & Framer Motion"],
    images: [
      "/imgOrIcon/1769551128774.avif"
    ],
    linkGithub: "https://github.com/davinakmalyasha/Portofolio",
    linkDemo: "https://www.portofoliodavin.vercel.app",
    role: "Creative Technologist",
    overview: "The Portofolio Website is a futuristic 3D showcase featuring a monochromatic color palette, glassmorphism, and smooth scroll interpolation. By mounting HTML layouts onto a Three.js canvas using react-three-fiber, it bridges immersive 3D graphics with highly readable, fully accessible textual content.",
    challenges: [
      "Synchronizing WebGL camera translation vectors with Lenis vertical scroll events.",
      "Maintaining 60 FPS while rendering multiple glass refractive panels in real-time.",
      "Achieving perfect backdrop-blur styling across different web browsers."
    ],
    solutions: [
      "Created custom lerped interpolation vectors driven by custom CSS variables.",
      "Optimized custom shaders, lighting counts, and geometry vertex counts in Three.js.",
      "Rendered critical elements in normal DOM space outside of the WebGL canvas to guarantee proper filter operation."
    ]
  },
  {
    id: 4,
    title: "Stark - Personal Scalable MultiAgents Architecture",
    category: "Agentic AI Platform",
    year: "2026",
    num: "04",
    status: "Development",
    description: "Self-hosted agentic platform with multi-workspace isolation, MCP delegation, and real-time voice pipeline.",
    techStack: ["Python 3.14", "Pydantic-AI", "FastAPI", "SQLite", "JSONL", "MCP", "React 19", "Electron"],
    images: [],
    linkGithub: "https://github.com/davinakmalyasha",
    linkDemo: "https://www.portofoliodavin.vercel.app",
    role: "AI Systems Architect",
    overview: "Architected a self-hosted agentic platform featuring strict multi-workspace isolation (Developer, Personal, House, Agency) with Model Context Protocol (MCP), dynamic tool registries, and a low-latency interactive Live Mode voice pipeline.",
    challenges: [
      "Preventing cross-domain tool ambiguity and context leaks across Developer, Personal, House, and Agency workspaces.",
      "Offloading heavy compute tasks from primary workspace agents without breaking orchestration.",
      "Enabling hands-free, voice-driven execution and iteration with low latency."
    ],
    solutions: [
      "Built strict multi-workspace isolation architecture for the agentic platform.",
      "Integrated Model Context Protocol (MCP) and dynamic tool registries with delegation to specialized execution sub-agents.",
      "Engineered a low-latency interactive Live Mode with streaming STT/TTS engines."
    ]
  }
];
