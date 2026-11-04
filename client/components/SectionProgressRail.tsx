"use client";

import React from "react";
import { SECTION_IDS } from "../hooks/useLenisScroll";
import { ViewMode } from "./ViewModeToggle";

interface SectionProgressRailProps {
  activeSlide: number;
  viewMode: ViewMode;
}

/**
 * Bare-bones HUD rail for the 3D journey. Decorative only — the top
 * navigation remains the single interactive control.
 */
export default function SectionProgressRail({
  activeSlide,
  viewMode,
}: SectionProgressRailProps): React.JSX.Element | null {
  if (viewMode !== "3d") return null;

  return (
    <div className="section-rail" aria-hidden="true">
      <span className="section-rail-index">
        {String(activeSlide + 1).padStart(2, "0")}
      </span>

      <div className="section-rail-track">
        {SECTION_IDS.map((id, index) => (
          <span
            key={id}
            className={`section-rail-tick ${index === activeSlide ? "is-active" : ""} ${
              index < activeSlide ? "is-past" : ""
            }`}
          />
        ))}
      </div>

      <span className="section-rail-name">{SECTION_IDS[activeSlide]}</span>
    </div>
  );
}
