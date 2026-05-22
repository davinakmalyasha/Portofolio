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
    bio: "Creative Developer & IT Specialist",
    publicRepos: 9,
    followers: 5,
    following: 7,
  },
  repos: [
    {
      id: 1140354549,
      name: "Portofolio",
      fullName: "davinakmalyasha/Portofolio",
      description: "Interactive 3D Portfolio built with Next.js, Three.js, React Three Fiber, and Framer Motion.",
      htmlUrl: "https://github.com/davinakmalyasha/Portofolio",
      language: "TypeScript",
      size: 33277,
      stargazersCount: 1,
      forksCount: 0,
      updatedAt: "2026-05-21T18:05:34Z",
    },
    {
      id: 939176342,
      name: "4Ceria-4C-",
      fullName: "davinakmalyasha/4Ceria-4C-",
      description: "End-to-end Construction Ecosystem for managing projects, tenders, and property sales. Built with Laravel & MySQL.",
      htmlUrl: "https://github.com/davinakmalyasha/4Ceria-4C-",
      language: "TypeScript",
      size: 2562,
      stargazersCount: 2,
      forksCount: 0,
      updatedAt: "2026-05-20T16:28:27Z",
    },
    {
      id: 1145271274,
      name: "MindEase",
      fullName: "davinakmalyasha/MindEase",
      description: "A secure, resilient mental health app platform using modern web technologies.",
      htmlUrl: "https://github.com/davinakmalyasha/MindEase",
      language: "TypeScript",
      size: 6222,
      stargazersCount: 1,
      forksCount: 0,
      updatedAt: "2026-02-24T07:41:03Z",
    },
    {
      id: 1206626592,
      name: "LaptopProcurement",
      fullName: "davinakmalyasha/LaptopProcurement",
      description: "Laravel-based procurement tool built to analyze different workflow management engines.",
      htmlUrl: "https://github.com/davinakmalyasha/LaptopProcurement",
      language: "PHP",
      size: 200,
      stargazersCount: 0,
      forksCount: 0,
      updatedAt: "2026-04-10T05:25:11Z",
    },
    {
      id: 1185955501,
      name: "DFDAgencyWebsite",
      fullName: "davinakmalyasha/DFDAgencyWebsite",
      description: "Modern landing website for a design and creative agency.",
      htmlUrl: "https://github.com/davinakmalyasha/DFDAgencyWebsite",
      language: "HTML",
      size: 107582,
      stargazersCount: 0,
      forksCount: 0,
      updatedAt: "2026-03-25T09:58:37Z",
    },
  ],
  languages: [
    { name: "TypeScript", size: 42061, percentage: 28.0, color: "#3178c6" },
    { name: "HTML", size: 107582, percentage: 71.7, color: "#e34c26" },
    { name: "PHP", size: 200, percentage: 0.1, color: "#4f5d95" },
    { name: "JavaScript", size: 300, percentage: 0.2, color: "#f1e05a" },
  ],
  totalEstLinesOfCode: 3002860,
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

    // 4. Estimate Lines of Code (assuming ~20 lines per KB of codebase size)
    const totalEstLinesOfCode = Math.round(totalSize * 20);

    const responseData: GitHubStatsResponse = {
      profile,
      repos,
      languages,
      totalEstLinesOfCode,
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
