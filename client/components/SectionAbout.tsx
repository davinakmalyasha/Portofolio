"use client";

import React, { memo } from "react";
import SlideSection3D from "./SlideSection3D";
import ProfileColumn from "./about/ProfileColumn";
import AboutTab from "./about/AboutTab";

interface SectionAboutProps {
  isNearActive: boolean;
}

const SectionAbout = memo(function SectionAbout({ isNearActive }: SectionAboutProps): React.JSX.Element {
  return (
    <SlideSection3D id="about" index={1}>
      <div className="about-slide-layout">
        {/* Left Side Column: Profile Picture & Core Meta details */}
        <ProfileColumn isNearActive={isNearActive} />

        {/* Right Side Column: Static Content */}
        <div className="about-right-content-area">
          <div className="about-active-tab-panel">
            <AboutTab />
          </div>
        </div>
      </div>
    </SlideSection3D>
  );
});

export default SectionAbout;

