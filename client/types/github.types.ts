export interface GitHubProfile {
  login: string;
  name: string;
  avatarUrl: string;
  bio: string;
  publicRepos: number;
  followers: number;
  following: number;
}

export interface GitHubRepo {
  id: number;
  name: string;
  fullName: string;
  description: string | null;
  htmlUrl: string;
  language: string | null;
  size: number;
  stargazersCount: number;
  forksCount: number;
  updatedAt: string;
}

export interface LanguageStat {
  name: string;
  size: number;
  percentage: number;
  color: string;
}

export interface GitHubStatsResponse {
  profile: GitHubProfile;
  repos: GitHubRepo[];
  languages: LanguageStat[];
  totalEstLinesOfCode: number;
}
