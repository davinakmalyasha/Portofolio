"use client";

import React from "react";
import useGitHubData from "../../hooks/useGitHubData";

export default function GitHub2D(): React.JSX.Element {
  const { data, loading, error } = useGitHubData();

  const renderContent = (): React.JSX.Element => {
    if (loading || !data) {
      return (
        <div className="p2d-github-loading">
          <div className="p2d-shimmer p2d-shimmer-avatar" />
          <div className="p2d-shimmer p2d-shimmer-line" />
          <div className="p2d-shimmer p2d-shimmer-line short" />
          <div className="p2d-shimmer p2d-shimmer-line" />
          <div className="p2d-shimmer p2d-shimmer-line" />
        </div>
      );
    }

    if (error) {
      return <p className="p2d-github-error">Unable to retrieve live statistics. Connection error captured.</p>;
    }

    return (
      <div className="p2d-github-layout">
        <div className="p2d-github-profile">
          <div className="p2d-github-user">
            <div className="p2d-github-avatar-wrap">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img src={data.profile.avatarUrl} alt={`${data.profile.name}'s Avatar`} className="p2d-github-avatar" loading="lazy" />
            </div>
            <div>
              <h3 className="p2d-github-name">{data.profile.name}</h3>
              <span className="p2d-github-login">@{data.profile.login}</span>
            </div>
          </div>

          <p className="p2d-github-bio">{data.profile.bio}</p>

          <div className="p2d-github-ledger">
            <div className="p2d-ledger-row">
              <span className="p2d-ledger-k">REPOS</span>
              <span className="p2d-ledger-dots" />
              <span className="p2d-ledger-v">{data.profile.publicRepos}</span>
            </div>
            <div className="p2d-ledger-row">
              <span className="p2d-ledger-k">FOLLOWERS</span>
              <span className="p2d-ledger-dots" />
              <span className="p2d-ledger-v">{data.profile.followers}</span>
            </div>
            <div className="p2d-ledger-row">
              <span className="p2d-ledger-k">EST. LINES</span>
              <span className="p2d-ledger-dots" />
              <span className="p2d-ledger-v">{data.totalEstLinesOfCode.toLocaleString()}</span>
            </div>
          </div>

          <div className="p2d-github-languages">
            <span className="p2d-github-lang-title">CODE DISTRIBUTION</span>
            {data.languages.map((lang) => (
              <div key={lang.name} className="p2d-lang-row">
                <span className="p2d-lang-name">{lang.name}</span>
                <span className="p2d-lang-bar">
                  <span
                    className="p2d-lang-fill"
                    style={{ width: `${lang.percentage}%`, opacity: 0.25 + (lang.percentage / 100) * 0.75 }}
                  />
                </span>
                <span className="p2d-lang-pct">{lang.percentage}%</span>
              </div>
            ))}
          </div>
        </div>

        <div className="p2d-github-repos">
          {data.repos.slice(0, 6).map((repo, i) => (
            <a
              key={repo.id}
              href={repo.htmlUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="p2d-repo-row cursor-target"
            >
              <span className="p2d-repo-index">{String(i + 1).padStart(2, "0")}</span>
              <div className="p2d-repo-body">
                <span className="p2d-repo-name">{repo.name}</span>
                <span className="p2d-repo-desc">{repo.description ?? "No description available."}</span>
              </div>
              <div className="p2d-repo-meta">
                {repo.language && <span className="p2d-repo-lang">{repo.language}</span>}
                <span className="p2d-repo-telemetry">★ {repo.stargazersCount} ⑂ {repo.forksCount}</span>
              </div>
              <span className="p2d-repo-arrow" aria-hidden="true">↗</span>
            </a>
          ))}
        </div>
      </div>
    );
  };

  return (
    <section id="github" className="p2d-section p2d-github">
      <div className="p2d-head">
        <span className="p2d-head-index">(04)</span>
        <h2 className="p2d-head-title">GitHub</h2>
        <span className="p2d-head-meta">OPEN SOURCE TELEMETRY</span>
        <span className="p2d-head-rule" />
      </div>

      {renderContent()}
    </section>
  );
}
