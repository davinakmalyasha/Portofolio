"use client";

import { PROJECTS_DATA } from "../data/projects";
import { EXPERIENCES_DATA } from "../data/experiences";
import { getThumbnailUrl } from "../utils/image";
import { prefetchGitHubData } from "./useGitHubData";

// Collect image URLs that render during the main scroll experience.
// Only the profile photo and downscaled thumbnails need to be pre-decoded for smooth scrolling.
function getAllImageUrls(): string[] {
  const urls: string[] = ["/imgOrIcon/d.avif"];

  PROJECTS_DATA.forEach((work) => {
    if (work.images && work.images[0]) {
      const thumb = getThumbnailUrl(work.images[0]);
      if (thumb) {
        urls.push(thumb);
      }
    }
  });

  EXPERIENCES_DATA.forEach((exp) => {
    if (exp.images && exp.images[0]) {
      const thumb = getThumbnailUrl(exp.images[0]);
      if (thumb) {
        urls.push(thumb);
      }
    }
  });

  return urls;
}

/**
 * Waits for all web fonts (Google Fonts etc.) to finish loading.
 * Returns a promise that resolves when fonts are ready.
 */
function preloadFonts(): Promise<void> {
  if (typeof document !== "undefined" && document.fonts) {
    return document.fonts.ready.then(() => undefined);
  }
  return Promise.resolve();
}

/**
 * Preloads and force-decodes all portfolio images into browser cache.
 * Uses Image.decode() API to ensure pixels are GPU-ready before the user scrolls.
 * Reports progress (0-100) via onProgress callback.
 * Returns a promise that resolves when all images are decoded.
 */
export function preloadAllImages(
  onProgress: (percent: number) => void
): Promise<void> {
  const urls = getAllImageUrls();
  const total = urls.length;

  if (total === 0) {
    onProgress(100);
    return Promise.resolve();
  }

  let loaded = 0;

  const promises = urls.map((url) => {
    return new Promise<void>((resolve) => {
      const img = new Image();
      img.src = url;

      img.onload = (): void => {
        if (typeof img.decode === "function") {
          img.decode()
            .then(() => {
              loaded++;
              onProgress(Math.round((loaded / total) * 100));
              resolve();
            })
            .catch(() => {
              loaded++;
              onProgress(Math.round((loaded / total) * 100));
              resolve();
            });
        } else {
          loaded++;
          onProgress(Math.round((loaded / total) * 100));
          resolve();
        }
      };

      img.onerror = (): void => {
        loaded++;
        onProgress(Math.round((loaded / total) * 100));
        resolve();
      };
    });
  });

  return Promise.all(promises).then(() => undefined);
}

/**
 * Preloads ALL critical assets: fonts + images + GPU decoding.
 * Also fires off the GitHub API prefetch so data is cached by the time
 * the user scrolls to the GitHub section.
 * Fonts count as 20% of progress, images count as 80%.
 * This ensures the loading screen has real work to do.
 */
export function preloadAllAssets(
  onProgress: (percent: number) => void
): Promise<void> {
  // Fire-and-forget: start GitHub API fetch early so data is cached
  // by the time the user scrolls to the GitHub section
  prefetchGitHubData();

  let fontDone = false;
  let imagePercent = 0;

  const reportCombined = (): void => {
    const fontWeight = fontDone ? 20 : 0;
    const imageWeight = Math.round(imagePercent * 0.8);
    onProgress(Math.min(fontWeight + imageWeight, 100));
  };

  const fontPromise = preloadFonts().then(() => {
    fontDone = true;
    reportCombined();
  });

  const imagePromise = preloadAllImages((percent) => {
    imagePercent = percent;
    reportCombined();
  });

  return Promise.all([fontPromise, imagePromise]).then(() => {
    onProgress(100);
  });
}
