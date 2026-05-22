"use client";

import React, { memo } from "react";
import SlideSection3D from "./SlideSection3D";
import useGitHubData from "../hooks/useGitHubData";
import ProfilePanel from "./github/ProfilePanel";
import RepoGrid from "./github/RepoGrid";
import GithubSkeleton from "./github/GithubSkeleton";

const SectionGitHub = memo(function SectionGitHub(): React.JSX.Element {
  const { data, loading, error } = useGitHubData();

  const renderContent = (): React.JSX.Element => {
    if (loading) {
      return <GithubSkeleton />;
    }

    if (error && !data) {
      return (
        <div style={{ textAlign: "center", padding: "40px", color: "var(--text-muted)", width: "100%" }}>
          <p>Unable to retrieve live statistics. Connection error captured.</p>
        </div>
      );
    }

    if (!data) {
      return <GithubSkeleton />;
    }

    return (
      <div className="github-slide-layout">
        <ProfilePanel
          profile={data.profile}
          languages={data.languages}
          totalEstLinesOfCode={data.totalEstLinesOfCode}
        />
        <RepoGrid repos={data.repos} />
      </div>
    );
  };

  return (
    <SlideSection3D id="github" index={4}>
      <div className="section-title-wrap">
        <h2>GITHUB STATS</h2>
        <span>Open Source Telemetry</span>
      </div>

      {renderContent()}
    </SlideSection3D>
  );
});

export default SectionGitHub;
