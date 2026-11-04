import { SITE_URL } from "../constants/site";
import { Project } from "../types/portfolio.types";

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "4Ceria — Construction Ecosystem",
    category: "Construction & Proptech",
    year: "2026",
    num: "01",
    status: "Deployed",
    description:
      "Contract-bound construction ecosystem where seven licensed professional roles bid on one project and every payment moves through a milestone escrow ledger.",
    techStack: ["Golang", "Next.js", "TypeScript", "PostgreSQL", "Redis", "Docker"],
    images: [
      "/imgOrIcon/4CProject/4CProject_content1.avif",
      "/imgOrIcon/4CProject/4CProject_content2.avif",
      "/imgOrIcon/4CProject/4CProject_content3.avif",
      "/imgOrIcon/4CProject/4CProject_content4.avif"
    ],
    linkGithub: "https://github.com/davinakmalyasha/4Ceria-4C-",
    linkDemo: "https://4construction.vercel.app/",
    role: "Lead Fullstack Engineer",
    overview:
      "A construction ecosystem, not a listing site: an owner publishes a project, seven separately licensed roles (architect, contractor, notary, interior, structural, MEP, project manager) bid, negotiate their own contract, and get a payment schedule backed by a milestone escrow ledger. Go services own the money and contract graph, Next.js owns the role-aware frontend. The agentic layer — automated tender matching, document review, and progress verification — is the next milestone.",
    challenges: [
      "Coordinating seven independently licensed roles, each with its own bid table, fee model, negotiation thread, contract and payment schedule.",
      "Making money release conditional: milestones gate payment, disputes freeze it, and handover closes it.",
      "Replacing the WhatsApp-and-notebook workflow with one shared, auditable record of what was agreed."
    ],
    solutions: [
      "Modelled the platform as a contract-bound payment graph on Go services with PostgreSQL and Redis.",
      "Implemented per-role contracts with a milestone escrow ledger that blocks release while a quality dispute is open.",
      "Built a role-aware Next.js frontend with typed API contracts and Docker-based deployment."
    ]
  },
  {
    id: 2,
    title: "MindEase — Telehealth Platform",
    category: "Health Tech",
    year: "2026",
    num: "02",
    status: "Development",
    description:
      "Mental-health telehealth platform: booking, in-browser video, longitudinal clinical records, and a triage queue where a self-harm disclosure reaches a named clinician.",
    techStack: ["Go", "Next.js 16", "TypeScript", "MySQL", "Redis", "WebSockets", "Docker"],
    images: [
      "/imgOrIcon/projects/mindease/mindease_content1.avif",
      "/imgOrIcon/projects/mindease/mindease_content2.avif"
    ],
    linkGithub: "https://github.com/davinakmalyasha/MindEase",
    linkDemo: "",
    role: "Fullstack Engineer",
    overview:
      "A mental-health telehealth product built around one safety property: a disclosure of thoughts of self-harm must reach a named clinician, and the code says out loud when it cannot. It pairs a Go API and WebSocket hub with a Next.js 16 web app, MySQL for clinical records, and Redis for sessions and queues.",
    challenges: [
      "Routing risk disclosures to a specific clinician reliably, including the failure path when routing is impossible.",
      "Keeping video sessions, clinical notes and the triage queue consistent across a Go API and a realtime hub.",
      "Testing a safety-critical workflow rather than only the happy path."
    ],
    solutions: [
      "Modelled triage as an explicit queue with named-clinician assignment and surfaced failure states.",
      "Split responsibilities between a Go REST API, a Go WebSocket service and the Next.js client.",
      "Added CI, security workflows and an end-to-end seeded demo stack behind Docker."
    ]
  },
  {
    id: 3,
    title: "Stark — Multi-Agent AI Desktop Workspace",
    category: "Agentic AI",
    year: "2026",
    num: "03",
    status: "Deployed",
    description:
      "Desktop workspace for multi-agent work with a Rust core, sandboxed tool execution, provider routing and signed auto-updates.",
    techStack: ["Rust", "Tauri 2", "React 19", "TypeScript", "Axum", "Tailwind CSS"],
    images: [],
    linkGithub: "https://github.com/davinakmalyasha/Stark_PersonalAgents",
    linkDemo: "https://github.com/davinakmalyasha/Stark_Releases",
    role: "AI Systems Architect",
    overview:
      "Stark is a multi-agent AI desktop workspace. A Rust workspace of ten crates (contract, config, policy, providers, tools, sandbox, store, core, server, voice) runs the agent runtime, policy and sandbox, while a React 19 + Tauri 2 frontend provides the workspace UI. Releases ship through a separate public update feed.",
    challenges: [
      "Running untrusted model-generated tool calls without giving the model unrestricted machine access.",
      "Supporting multiple model providers behind one contract while keeping streaming and cancellation predictable.",
      "Shipping a desktop app with updates that cannot be tampered with."
    ],
    solutions: [
      "Separated policy, tool and sandbox crates so permissions are enforced outside the model loop.",
      "Abstracted providers behind a single Rust contract with streaming and tool-call handling.",
      "Built a signed Tauri auto-update feed backed by a dedicated public release repository."
    ]
  },
  {
    id: 4,
    title: "HRAgents — Virtual HR Team",
    category: "AI Agents & HR Tech",
    year: "2026",
    num: "04",
    status: "Development",
    description:
      "Open-source virtual HR team: LLM agents extract and draft, deterministic code decides, and humans gate every consequential decision.",
    techStack: ["Python 3.14", "FastAPI", "MCP", "PostgreSQL", "Docker", "Apache-2.0"],
    images: ["/imgOrIcon/projects/hragents/hragents_content1.avif"],
    linkGithub: "https://github.com/davinakmalyasha/HRAgents",
    linkDemo: "https://davinakmalyasha.github.io/HRAgents/",
    role: "Creator & Maintainer",
    overview:
      "A virtual HR team for the HR department of one. Five agents read, chase, calculate and draft, while deterministic code owns every decision and humans approve anything consequential. Published under Apache-2.0 with a documented API surface, an MCP layer with approval-backed write tools, and a hiring dashboard.",
    challenges: [
      "Keeping consequential HR decisions out of the model while still letting agents do the reading and drafting.",
      "Exposing agent capabilities over MCP without letting a write tool bypass human approval.",
      "Maintaining a test suite and coverage gate large enough to trust the automation."
    ],
    solutions: [
      "Split work into extraction (agents) and decisioning (deterministic code) with human approval gates.",
      "Implemented read tools plus approval-backed write tools in the MCP layer.",
      "Enforced coverage in CI and published the open-source image for self-hosting."
    ]
  },
  {
    id: 5,
    title: "AllStuff — Business Directory Platform",
    category: "Marketplace Platform",
    year: "2026",
    num: "05",
    status: "Development",
    description:
      "Self-hostable directory and storefront platform with document-backed trust badges, a published ranking formula and fairness slots for new businesses.",
    techStack: ["Go", "Next.js 16", "PostgreSQL", "Redis", "TypeScript", "Docker"],
    images: [
      "/imgOrIcon/projects/allstuff/allstuff_content1.avif",
      "/imgOrIcon/projects/allstuff/allstuff_content2.avif",
      "/imgOrIcon/projects/allstuff/allstuff_content3.avif"
    ],
    linkGithub: "https://github.com/davinakmalyasha/AllStuff",
    linkDemo: "",
    role: "Creator",
    overview:
      "A self-hostable business directory and storefront platform. Owners build a storefront without a developer; visitors find businesses through search, a map and published rankings. Trust is document-backed and audited, ranking is a published formula with a fairness floor, and the whole stack is one Go binary plus PostgreSQL and Redis.",
    challenges: [
      "Making verification trustworthy: documents stay private, and every view must be audited.",
      "Ranking businesses without letting paid plans buy rank.",
      "Giving new and small businesses guaranteed visibility in a ranking system."
    ],
    solutions: [
      "Encrypted verification documents at rest with sandboxed viewing and an audit row per open.",
      "Published the ranking formula and weights, with paid plans excluded from the top tier.",
      "Added a Rising tier that reserves visibility slots for new businesses, with a tracked KPI."
    ]
  },
  {
    id: 6,
    title: "VinCommerce — Multi-Vendor Marketplace",
    category: "E-Commerce Platform",
    year: "2026",
    num: "06",
    status: "Development",
    description:
      "Multi-vendor marketplace with storefront, seller center and admin console, an explicit order state machine and payment webhooks.",
    techStack: ["Go", "PostgreSQL", "Redis", "React 19", "Vite", "Tailwind CSS", "Midtrans"],
    images: [],
    linkGithub: "https://github.com/davinakmalyasha/VinCommerce",
    linkDemo: "",
    role: "Fullstack Engineer",
    overview:
      "A multi-vendor commerce platform built as a Go + React monorepo: a Go API with a background worker, PostgreSQL for transactional data and full-text search, Redis for caching, rate limits and pub/sub, and a React 19 storefront with separate seller and admin consoles.",
    challenges: [
      "Keeping order state consistent across payments, timeouts and seller actions.",
      "Isolating seller and admin capabilities with real RBAC on every endpoint.",
      "Processing payment webhooks without duplicating or losing money movement."
    ],
    solutions: [
      "Implemented an explicit order state machine with worker-driven timeouts and sweeps.",
      "Added JWT auth with rotating refresh tokens, RBAC middleware and audit logging.",
      "Used a gateway adapter pattern so sandbox and Midtrans webhooks share one path."
    ]
  },
  {
    id: 7,
    title: "Centrum Badminton — Venue Platform",
    category: "Client Work · Venue",
    year: "2026",
    num: "07",
    status: "Deployed",
    description:
      "Landing page plus management PWA for a badminton arena: realtime slot availability, cash/QRIS payments, reports and an AI assistant.",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "PWA", "Web Push", "Go"],
    images: ["/imgOrIcon/projects/centrum/centrum_content1.avif"],
    linkGithub: "https://github.com/davinakmalyasha/CentrumBadminton",
    linkDemo: "https://centrum-badminton.vercel.app",
    role: "Freelance Engineer",
    overview:
      "A public landing page and an internal management PWA for GOR Centrum Badminton Arena. Visitors see live slot availability and prices and book over WhatsApp; staff manage bookings, payments, the canteen, expenses and reports from an installable app. Every request is authenticated through the Next.js server and proxied to a Go backend.",
    challenges: [
      "Showing slot availability that stays accurate while several staff members edit the same schedule.",
      "Handling cash and QRIS payments plus daily financial reporting in one place.",
      "Shipping a mobile-first tool staff actually use on the floor."
    ],
    solutions: [
      "Polled availability every five seconds and paused polling when the tab is inactive.",
      "Built booking, payment, canteen, expense and report flows into a PWA with CSV/XLSX exports.",
      "Kept session cookies httpOnly server-side and funnelled all backend calls through one proxy layer."
    ]
  },
  {
    id: 8,
    title: "Faby Cion — Makeup Artist Landing Page",
    category: "Client Work · Landing Page",
    year: "2026",
    num: "08",
    status: "Deployed",
    description:
      "Single-page site for a Jakarta makeup artist with a filterable portfolio, lightbox, rate card and WhatsApp booking flow.",
    techStack: ["Next.js 16", "TypeScript", "Tailwind CSS", "JSON-LD", "Vercel"],
    images: ["/imgOrIcon/projects/mua/mua_content1.avif"],
    linkGithub: "https://github.com/davinakmalyasha/MUALanding-FabyCion-",
    linkDemo: "https://muafabycion.vercel.app/",
    role: "Freelance Engineer",
    overview:
      "A one-page marketing site for a professional makeup artist. All copy lives in typed content files rather than components, so rates, portfolio entries, process steps and FAQs can change without touching UI code. SEO is handled with the Metadata API, JSON-LD, a sitemap and a generated OG image.",
    challenges: [
      "Letting a non-technical owner update prices, gallery and FAQ without breaking the page.",
      "Making a visual portfolio feel premium while staying fast and accessible.",
      "Getting local-business SEO right for a service business."
    ],
    solutions: [
      "Moved all editable content into typed config modules, with self-hiding sections.",
      "Built a filterable gallery with lightbox and WhatsApp CTAs on Next.js 16 + Tailwind v4.",
      "Wired FAQ, services and portfolio into structured data so SEO updates with the content."
    ]
  },
  {
    id: 9,
    title: "DFD Agency — Digital Agency Platform",
    category: "Agency Platform",
    year: "2026",
    num: "09",
    status: "Deployed",
    description:
      "Decoupled agency site and dashboard with shared type-safe contracts, automated client intake and edge-cached delivery.",
    techStack: ["Next.js", "Express", "Prisma", "MySQL", "Zod", "TypeScript"],
    images: [
      "/imgOrIcon/DFDAgency/dfdagency_content1.avif",
      "/imgOrIcon/DFDAgency/dfdagency_content2.avif",
      "/imgOrIcon/DFDAgency/dfdagency_content3.avif"
    ],
    linkGithub: "https://github.com/davinakmalyasha/DFDAgencyWebsite",
    linkDemo: "https://dfdagency.vercel.app/",
    role: "Founder & Engineer",
    overview:
      "The DFD digital agency platform: a statically generated Next.js frontend on Vercel and an Express API on Railway, sharing Zod schemas and TypeScript interfaces through a workspace package so requests are validated against the same contract that builds the UI.",
    challenges: [
      "Keeping frontend and backend contracts from drifting across two deploys.",
      "Handling client intake and notifications without a heavy CMS.",
      "Hardening admin sessions and public form ingress."
    ],
    solutions: [
      "Extracted shared Zod schemas into a workspace package used by both sides.",
      "Automated intake, notifications and WhatsApp messaging through the Express API.",
      "Used HttpOnly, Secure, SameSite=Strict cookies and strict payload validation."
    ]
  },
  {
    id: 10,
    title: "Portfolio — 3D Journey",
    category: "Personal Portfolio",
    year: "2026",
    num: "10",
    status: "Deployed",
    description:
      "This site: a scroll-driven 3D journey with glass pods mounted in WebGL, a GPU particle wave and a full 2D fallback.",
    techStack: ["Next.js 16", "React 19", "Three.js", "TypeScript", "Lenis", "Framer Motion", "Tailwind CSS"],
    images: ["/imgOrIcon/projects/portfolio/portfolio_content1.avif"],
    linkGithub: "https://github.com/davinakmalyasha/Portofolio",
    linkDemo: SITE_URL,
    role: "Designer & Engineer",
    overview:
      "A monochrome 3D portfolio where DOM content is mounted onto a Three.js canvas as glass pods, driven by Lenis scroll interpolation over an extended camera path. A GPU particle wave reacts to the pointer through a camera raycast, and a separate 2D mode provides a fully static, accessible alternative.",
    challenges: [
      "Synchronising WebGL camera translation with smooth scroll without drift.",
      "Keeping frame rate stable while rendering many glass panels and a dense particle field.",
      "Making the pointer ripple land under the cursor at every camera distance."
    ],
    solutions: [
      "Mapped scroll progress to pod coordinates with eased, proportionally spaced waypoints.",
      "Moved wave displacement into a GPU shader and kept per-frame work allocation-free.",
      "Projected the pointer onto the wave plane with a raycast and converted to local space."
    ]
  }
];
