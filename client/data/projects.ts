import { Project } from "../types/portfolio.types";

export const PROJECTS_DATA: Project[] = [
  {
    id: 1,
    title: "4C Construction Web",
    category: "Construction & Bidding Platform",
    year: "2024",
    num: "01",
    description: "All-in-one platform for property listing, professional hiring, and construction project bidding.",
    techStack: ["Laravel", "PHP", "MySQL", "HTML", "CSS"],
    images: [
      "/imgOrIcon/1769550926438.png",
      "/imgOrIcon/1769550926443.png",
      "/imgOrIcon/1769550926446.png",
      "/imgOrIcon/1769550926449.png",
      "/imgOrIcon/1769550926454.png"
    ],
    linkGithub: "https://github.com/davinakmalyasha/4Ceria-4C-",
    linkDemo: "https://github.com/davinakmalyasha/4Ceria-4C-",
    role: "Lead Fullstack Developer",
    overview: "4C Construction Web is a comprehensive web-based platform built to streamline property transactions and construction bidding processes. It enables property owners to list their properties, hiring managers to connect with professionals, and contractors to submit competitive bids for construction projects.",
    challenges: [
      "Managing complex bidding state transitions and concurrently active auctions in real-time.",
      "Ensuring secure data flow between buyers, contractors, and administrators.",
      "Responsive card grid and 3D visual preview representations across various viewports."
    ],
    solutions: [
      "Designed a normalized database model and active controller states in Laravel to process bids sequentially.",
      "Implemented Laravel policies and strict input validation rules to secure user roles and financial bids.",
      "Engineered fluid CSS Grid layouts with custom media queries and optimized images to load instantly."
    ]
  },
  {
    id: 2,
    title: "MINDEASE",
    category: "Mental Health Platform",
    year: "2024",
    num: "02",
    description: "A comprehensive mental health website designed to track wellness and improve cognitive health.",
    techStack: ["React", "TypeScript", "TailwindCSS", "Framer Motion"],
    images: [
      "/imgOrIcon/1769547129586.png",
      "/imgOrIcon/1769547129614.png",
      "/imgOrIcon/1769547129625.png",
      "/imgOrIcon/1769547129628.png"
    ],
    linkGithub: "https://github.com/davinakmalyasha/MindEase",
    linkDemo: "https://github.com/davinakmalyasha/MindEase",
    role: "Frontend UI/UX Developer",
    overview: "MindEase is an immersive mental wellness application aiming to provide users with tools to log mood shifts, practice mindfulness, and improve overall cognitive health. The project features visually calming aesthetics, smooth animations to alleviate anxiety, and personalized tracker analytics.",
    challenges: [
      "Creating highly smooth, comforting transitions that load instantly without layout shifting.",
      "Structuring complex local state for weekly mood charts and daily task checklists.",
      "Ensuring accessible design for users experiencing high stress or visual sensitivity."
    ],
    solutions: [
      "Utilized Framer Motion for hardware-accelerated animations and micro-interactions.",
      "Designed lightweight custom hooks to manage transient mood logs and client-side history.",
      "Adopted a curated soft monochrome/pastel color scheme with high readability and screen reader compliance."
    ]
  },
  {
    id: 3,
    title: "DFD AGENCY",
    category: "Agency Website",
    year: "2024",
    num: "03",
    description: "A professional and modern agency website built to showcase digital services and brand identity.",
    techStack: ["Next.js", "Framer Motion", "React", "CSS"],
    images: [
      "/imgOrIcon/1769550828466.png",
      "/imgOrIcon/1769550828468.png",
      "/imgOrIcon/1769550828473.png",
      "/imgOrIcon/1769550828475.png",
      "/imgOrIcon/1769550828478.png"
    ],
    linkGithub: "https://github.com/davinakmalyasha/DFDAgencyWebsite",
    linkDemo: "https://github.com/davinakmalyasha/DFDAgencyWebsite",
    role: "Creative Frontend Developer",
    overview: "DFD Agency is a high-end corporate presentation website designed to attract premium clients. With bespoke typography, modern scroll triggers, and dynamic layout structure, it presents the agency's portfolio, core service offerings, and contact channels in an elite, minimal presentation.",
    challenges: [
      "Implementing advanced interactive scroll-linked animations while maintaining high performance.",
      "Achieving search engine optimization and fast first-contentful-paint (FCP) on image-heavy pages.",
      "Ensuring fully responsive behavior on modern ultrawide screens as well as mobile devices."
    ],
    solutions: [
      "Used GSAP and Framer Motion to handle scroll-bound animations efficiently.",
      "Integrated Next.js native Image component optimization and server-side static page generation.",
      "Developed using flexible flexbox and grid layouts, testing extensively across diverse aspect ratios."
    ]
  },
  {
    id: 4,
    title: "Portofolio Website",
    category: "Personal Portfolio",
    year: "2026",
    num: "04",
    description: "Futuristic 3D portfolio showcase with glassmorphic cards and scroll camera animations.",
    techStack: ["React", "Next.js", "Three.js", "TypeScript", "TailwindCSS"],
    images: [
      "/imgOrIcon/1769551128774.png"
    ],
    linkGithub: "https://github.com/davinakmalyasha/Portofolio",
    linkDemo: "https://github.com/davinakmalyasha/Portofolio",
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
  }
];
