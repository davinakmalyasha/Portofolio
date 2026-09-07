"use client";

import React, { useEffect } from "react";
import Hero2D from "./Hero2D";
import About2D from "./About2D";
import Works2D from "./Works2D";
import Experience2D from "./Experience2D";
import GitHub2D from "./GitHub2D";
import Certificates2D from "./Certificates2D";
import Contact2D from "./Contact2D";
import { Project, Experience } from "../../types/portfolio.types";
import { SECTION_IDS } from "../../hooks/useLenisScroll";

interface Portfolio2DProps {
  onExploreProject: (project: Project) => void;
  onExploreExperience: (experience: Experience) => void;
  onSectionChange: (index: number) => void;
}

export default function Portfolio2D({
  onExploreProject,
  onExploreExperience,
  onSectionChange,
}: Portfolio2DProps): React.JSX.Element {
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = SECTION_IDS.indexOf(entry.target.id);
            if (index !== -1) onSectionChange(index);
          }
        });
      },
      { rootMargin: "-45% 0px -45% 0px", threshold: 0 }
    );

    SECTION_IDS.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [onSectionChange]);

  return (
    <div className="portfolio-2d">
      <span className="p2d-watermark" aria-hidden="true">Davin</span>

      <Hero2D />
      <About2D />
      <Works2D onExploreProject={onExploreProject} />
      <Experience2D onExploreExperience={onExploreExperience} />
      <GitHub2D />
      <Certificates2D />
      <Contact2D />

      <footer className="p2d-footer">
        <span>© 2026 DAVIN AKMAL YASHA</span>
        <span className="p2d-footer-mid">[ NEXT.JS / REACT / TYPESCRIPT / THREE.JS ]</span>
        <span className="p2d-footer-hint">RETURN TO 3D MODE<span className="p2d-blink">▌</span></span>
      </footer>
    </div>
  );
}
