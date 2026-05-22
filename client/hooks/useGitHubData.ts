"use client";

import { useState, useEffect } from "react";
import { GitHubStatsResponse } from "../types/github.types";

/* ── Module-level prefetch cache ──────────────────────────────── */
let cachedPromise: Promise<GitHubStatsResponse | null> | null = null;
let cachedData: GitHubStatsResponse | null = null;

/** Call during the intro loader to fire the API request early. */
export function prefetchGitHubData(): void {
  if (cachedPromise) return;
  cachedPromise = fetch("/api/github")
    .then((res) => {
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      return res.json() as Promise<GitHubStatsResponse>;
    })
    .then((data: GitHubStatsResponse) => {
      cachedData = data;
      return data;
    })
    .catch(() => {
      cachedPromise = null;
      return null;
    });
}

/* ── Hook ─────────────────────────────────────────────────────── */
interface UseGitHubDataResult {
  data: GitHubStatsResponse | null;
  loading: boolean;
  error: string | null;
}

export function useGitHubData(): UseGitHubDataResult {
  const [data, setData] = useState<GitHubStatsResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let isMounted = true;

    async function fetchStats(): Promise<void> {
      try {
        setLoading(true);

        // 1. Use already-resolved prefetch cache
        if (cachedData) {
          if (isMounted) {
            setData(cachedData);
            setError(null);
            setLoading(false);
          }
          return;
        }

        // 2. Prefetch in-flight — await it
        if (cachedPromise) {
          const result = await cachedPromise;
          if (isMounted && result) {
            setData(result);
            setError(null);
          }
          if (isMounted) setLoading(false);
          return;
        }

        // 3. Fallback: fetch directly
        const response = await fetch("/api/github");
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const result = await response.json();
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err: unknown) {
        if (isMounted) {
          const errorMessage = err instanceof Error ? err.message : "Failed to fetch GitHub stats";
          setError(errorMessage);
          console.error("useGitHubData fetch error:", err);
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    }

    fetchStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { data, loading, error };
}
export default useGitHubData;
