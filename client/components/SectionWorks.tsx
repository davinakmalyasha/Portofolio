"use client";

import React, { useRef, useState, useEffect, memo } from "react";
import SlideSection3D from "./SlideSection3D";
import { PROJECTS_DATA } from "../data/projects";
import { Project } from "../types/portfolio.types";
import WorkCard from "./WorkCard";

interface SectionWorksProps {
  onExploreProject: (project: Project) => void;
  isNearActive: boolean;
}

const SectionWorks = memo(function SectionWorks({ onExploreProject, isNearActive }: SectionWorksProps): React.JSX.Element {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [scrollOffset, setScrollOffset] = useState<number>(0);
  const [maxScroll, setMaxScroll] = useState<number>(0);
  
  const checkScroll = (): void => {
    if (scrollRef.current) {
      const cardWidth = 370 + 30;
      const totalWidth = PROJECTS_DATA.length * cardWidth;
      const visibleWidth = scrollRef.current.clientWidth;
      const max = Math.max(0, totalWidth - visibleWidth + 30);
      setMaxScroll(max);
    }
  };

  useEffect(() => {
    checkScroll();
    const timer = setTimeout(checkScroll, 150);
    window.addEventListener("resize", checkScroll);
    return () => {
      window.removeEventListener("resize", checkScroll);
      clearTimeout(timer);
    };
  }, [isNearActive]);

  const showLeftBtn = scrollOffset > 0;
  const showRightBtn = scrollOffset < maxScroll;

  const handleScroll = (direction: "left" | "right"): void => {
    const cardWidth = 370 + 30; // Card width + gap
    setScrollOffset((prev) => {
      if (direction === "left") {
        return Math.max(0, prev - cardWidth);
      } else {
        return Math.min(maxScroll, prev + cardWidth);
      }
    });
  };

  return (
    <SlideSection3D id="works" index={2}>
      <div className="section-title-wrap">
        <h2>MY PROJECT</h2>
        <span>Creative Showcases</span>
      </div>

      <button
        className={`works-scroll-btn works-scroll-btn-left cursor-target ${showLeftBtn ? "visible" : ""}`}
        onClick={() => handleScroll("left")}
        aria-label="Scroll left"
        disabled={!showLeftBtn}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="19" y1="12" x2="5" y2="12" />
          <polyline points="12 19 5 12 12 5" />
        </svg>
      </button>

      <button
        className={`works-scroll-btn works-scroll-btn-right cursor-target ${showRightBtn ? "visible" : ""}`}
        onClick={() => handleScroll("right")}
        aria-label="Scroll right"
        disabled={!showRightBtn}
      >
        <svg width="26" height="26" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <line x1="5" y1="12" x2="19" y2="12" />
          <polyline points="12 5 19 12 12 19" />
        </svg>
      </button>

      <div ref={scrollRef} className="works-scroll-container">
        <div 
          className="works-cards-wrapper" 
          style={{ 
            transform: `translateX(-${scrollOffset}px)`,
            transition: 'transform 0.5s cubic-bezier(0.25, 1, 0.5, 1)'
          }}
        >
          {PROJECTS_DATA.map((work, idx) => (
            <WorkCard
              key={work.id}
              work={work}
              idx={idx}
              onExploreProject={onExploreProject}
              isNearActive={isNearActive}
            />
          ))}
        </div>
      </div>
    </SlideSection3D>
  );
});

export default SectionWorks;
