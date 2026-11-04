import { NextResponse } from "next/server";
import { GitHubProfile, GitHubRepo, LanguageStat, GitHubStatsResponse } from "../../../types/github.types";

// Configuration
const GITHUB_USERNAME = "davinakmalyasha";
const CACHE_DURATION = 3600 * 1000; // 1 hour in milliseconds

// Language to brand color mapping
const LANGUAGE_COLORS: { [key: string]: string } = {
  TypeScript: "#3178c6",
  JavaScript: "#f1e05a",
  CSS: "#563d7c",
  HTML: "#e34c26",
  PHP: "#4f5d95",
  Python: "#3572A5",
  SCSS: "#c6538c",
  Vue: "#41b883",
  Go: "#00add8",
  Ruby: "#701516",
  "C++": "#f34b7d",
  "C#": "#178600",
  Java: "#b07219",
  Shell: "#89e051",
  Rust: "#dea584",
};

const DEFAULT_COLOR = "#858585";

// Static/offline fallback in case of rate limit or network error
const OFFLINE_FALLBACK: GitHubStatsResponse = {
  profile: {
    login: "davinakmalyasha",
    name: "Davin Akmal Yasha",
    avatarUrl: "https://avatars.githubusercontent.com/u/145950808?v=4",
    bio: "Passionate about Agentic Software Development | Automation",
    publicRepos: 16,
    followers: 1,
    following: 2,
  },
  repos: [
    {
      id: 1145271274,
      name: "MindEase",
      fullName: "davinakmalyasha/MindEase",
      description: "Mental-health telehealth platform: Go API and WebSocket hub, Next.js 16 web app, MySQL and Redis.",
      htmlUrl: "https://github.com/davinakmalyasha/MindEase",
      language: "TypeScript",
      size: 27441,
      stargazersCount: 1,
      forksCount: 0,
      updatedAt: "2026-10-31T00:00:00Z",
    },
    {
      id: 939176342,
      name: "4Ceria-4C-",
      fullName: "davinakmalyasha/4Ceria-4C-",
      description: "Contract-bound payment coordination for Indonesian construction: seven licensed roles bid on one project, every payment moves through a milestone escrow ledger.",
      htmlUrl: "https://github.com/davinakmalyasha/4Ceria-4C-",
      language: "TypeScript",
      size: 32549,
      stargazersCount: 2,
      forksCount: 0,
      updatedAt: "2026-10-25T00:00:00Z",
    },
    {
      id: 1366017621,
      name: "HRAgents",
      fullName: "davinakmalyasha/HRAgents",
      description: "Open-source virtual HR team: LLM agents extract, deterministic code decides, humans gate every consequential decision.",
      htmlUrl: "https://github.com/davinakmalyasha/HRAgents",
      language: "Python",
      size: 10283,
      stargazersCount: 1,
      forksCount: 0,
      updatedAt: "2026-10-30T00:00:00Z",
    },
    {
      id: 1333749294,
      name: "AllStuff",
      fullName: "davinakmalyasha/AllStuff",
      description: "Self-hostable business directory and storefront platform with document-backed trust and a published ranking formula.",
      htmlUrl: "https://github.com/davinakmalyasha/AllStuff",
      language: "Go",
      size: 2599,
      stargazersCount: 1,
      forksCount: 0,
      updatedAt: "2026-10-31T00:00:00Z",
    },
    {
      id: 1339420967,
      name: "CentrumBadminton",
      fullName: "davinakmalyasha/CentrumBadminton",
      description: "Landing page plus management PWA for Centrum Badminton Arena (Next.js 16, AgentsProxy backend).",
      htmlUrl: "https://github.com/davinakmalyasha/CentrumBadminton",
      language: "TypeScript",
      size: 8073,
      stargazersCount: 0,
      forksCount: 0,
      updatedAt: "2026-10-31T00:00:00Z",
    },
    {
      id: 1140354549,
      name: "Stark_PersonalAgents",
      fullName: "davinakmalyasha/Stark_PersonalAgents",
      description: "Multi-agent AI desktop workspace: Rust core of ten crates with Tauri 2, React 19 and sandboxed tool execution.",
      htmlUrl: "https://github.com/davinakmalyasha/Stark_PersonalAgents",
      language: "Rust",
      size: 6753,
      stargazersCount: 1,
      forksCount: 0,
      updatedAt: "2026-11-01T00:00:00Z",
    },
  ],
  languages: [
    { name: "TypeScript", size: 2860000, percentage: 38.0, color: "#3178c6" },
    { name: "Go", size: 2100000, percentage: 28.0, color: "#00add8" },
    { name: "Rust", size: 1508000, percentage: 20.0, color: "#dea584" },
    { name: "Python", size: 900000, percentage: 12.0, color: "#3572A5" },
    { name: "PHP", size: 150000, percentage: 2.0, color: "#4f5d95" },
  ],
  totalStars: 10,
};

// Simple in-memory cache
let cachedData: GitHubStatsResponse | null = null;
let lastFetchTime = 0;

export async function GET(): Promise<NextResponse> {
  const now = Date.now();

  // Return cached data if available and fresh
  if (cachedData && now - lastFetchTime < CACHE_DURATION) {
    return NextResponse.json(cachedData);
  }

  try {
    // 1. Fetch GitHub User Profile
    const profileUrl = `https://api.github.com/users/${GITHUB_USERNAME}`;
    const userRes = await fetch(profileUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "nextjs-portfolio-client",
      },
      next: { revalidate: 3600 }, // Fetch-level Next.js caching
    });

    if (!userRes.ok) {
      throw new Error(`Failed to fetch user profile: ${userRes.statusText}`);
    }

    const userData = await userRes.json();

    const profile: GitHubProfile = {
      login: userData.login,
      name: userData.name || userData.login,
      avatarUrl: userData.avatar_url,
      bio: userData.bio || "",
      publicRepos: userData.public_repos,
      followers: userData.followers,
      following: userData.following,
    };

    // 2. Fetch GitHub Repositories
    const reposUrl = `https://api.github.com/users/${GITHUB_USERNAME}/repos?sort=pushed&direction=desc&per_page=100`;
    const reposRes = await fetch(reposUrl, {
      headers: {
        Accept: "application/vnd.github+json",
        "User-Agent": "nextjs-portfolio-client",
      },
      next: { revalidate: 3600 },
    });

    if (!reposRes.ok) {
      throw new Error(`Failed to fetch repos: ${reposRes.statusText}`);
    }

    const reposData = await reposRes.json();

    if (!Array.isArray(reposData)) {
      throw new Error("Invalid repos payload from GitHub");
    }

    // Filter out forks and map fields
    const ownRepos = reposData.filter((r: any) => !r.fork);
    
    const repos: GitHubRepo[] = ownRepos.slice(0, 6).map((r: any) => ({
      id: r.id,
      name: r.name,
      fullName: r.full_name,
      description: r.description || null,
      htmlUrl: r.html_url,
      language: r.language || null,
      size: r.size,
      stargazersCount: r.stargazers_count,
      forksCount: r.forks_count,
      updatedAt: r.updated_at,
    }));

    // 3. Process Language Stats
    const langVolume: { [key: string]: number } = {};
    let totalSize = 0;

    ownRepos.forEach((r: any) => {
      const lang = r.language;
      if (lang) {
        langVolume[lang] = (langVolume[lang] || 0) + r.size;
        totalSize += r.size;
      }
    });

    const languages: LanguageStat[] = Object.entries(langVolume)
      .map(([name, size]) => ({
        name,
        size,
        percentage: totalSize > 0 ? parseFloat(((size / totalSize) * 100).toFixed(1)) : 0,
        color: LANGUAGE_COLORS[name] || DEFAULT_COLOR,
      }))
      .sort((a, b) => b.size - a.size);

    const totalStars = ownRepos.reduce(
      (sum: number, repo: any) => sum + (repo.stargazers_count || 0),
      0
    );

    const responseData: GitHubStatsResponse = {
      profile,
      repos,
      languages,
      totalStars,
    };

    // Update in-memory cache
    cachedData = responseData;
    lastFetchTime = now;

    return NextResponse.json(responseData);
  } catch (error) {
    console.error("Error fetching live GitHub data:", error);

    // Resilient fallback: Return previous cache if exists, otherwise offline mock fallback
    if (cachedData) {
      console.warn("Serving stale cached data due to API error.");
      return NextResponse.json(cachedData);
    }

    console.warn("Serving static offline fallback data due to API error.");
    return NextResponse.json(OFFLINE_FALLBACK);
  }
}
