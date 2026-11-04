import { Certificate } from "../types/portfolio.types";

export const CERTIFICATES_DATA: Certificate[] = [
  {
    id: 1,
    title: "IBM AI Engineering",
    issuer: "IBM · Coursera",
    year: "Jul 2026",
    category: "AI · 13 Courses",
    description:
      "Professional certificate covering supervised and unsupervised learning in Python, deep learning with Keras, PyTorch and TensorFlow, transfer learning, and instruction tuning for GPT, LLaMA and BERT. Capstone: a retrieval-augmented generation application built with LangChain.",
    credentialUrl: "https://www.coursera.org/verify/professional-cert/1FGSGAKYL0E4",
    image: "/imgOrIcon/certificates/ibm-ai-engineering.png"
  },
  {
    id: 2,
    title: "IBM RAG and Agentic AI",
    issuer: "IBM · Coursera",
    year: "Jul 2026",
    category: "AI · 10 Courses",
    description:
      "Professional certificate on generative AI applications built with retrieval-augmented generation and agentic design: prompt engineering and function calling with LangChain, plus multi-agent systems built with CrewAI and LangGraph, including MCP and multi-agentic cognitive pipelines.",
    credentialUrl: "https://www.coursera.org/verify/professional-cert/M8MTB4M2G",
    image: "/imgOrIcon/certificates/ibm-rag-agentic-ai.png"
  },
  {
    id: 3,
    title: "AI Agent Developer",
    issuer: "Vanderbilt University · Coursera",
    year: "Jul 2026",
    category: "AI · 6 Courses",
    description:
      "Specialization on designing, building and deploying tool-using AI agents in Python: agent architecture, memory systems, custom GPT development, prompt engineering and trustworthy AI practices for production-grade agent workflows.",
    credentialUrl: "https://www.coursera.org/verify/specialization/DBQTE84W8T7Y4",
    image: "/imgOrIcon/certificates/vanderbilt-ai-agent-developer.png"
  },
  {
    id: 4,
    title: "EPRT | 513 / 700",
    issuer: "Telkom University",
    year: "Jan 2026",
    category: "Language",
    credentialId: "No. 1585/SPI3-A/BHS/2026",
    validUntil: "Valid until Jan 2028",
    description:
      "Telkom University English Proficiency Test score 513: professional working proficiency in technical communication, academic writing and listening comprehension. Listening 52, grammar 53, reading 49.",
    image: "/imgOrIcon/certificates/eprt-telkom.png"
  }
];
