"use client";

import React from "react";
import { useCopyToClipboard } from "../../hooks/useCopyToClipboard";
import { useJakartaTime } from "../../hooks/useJakartaTime";

const NETWORKS = [
  { name: "GITHUB", href: "https://github.com/davinakmalyasha" },
  { name: "LINKEDIN", href: "https://www.linkedin.com/in/davin-yasa-974ba82a1" },
  { name: "UPWORK", href: "https://www.upwork.com/freelancers/~01707125094176615a" },
];

export default function Contact2D(): React.JSX.Element {
  const { copied, copyText } = useCopyToClipboard();
  const { time24, time12 } = useJakartaTime();

  const handleCopyEmail = (): void => {
    copyText("davinyasa06@gmail.com");
  };

  return (
    <section id="contact" className="p2d-section p2d-section--invert p2d-contact">
      <div className="p2d-head">
        <span className="p2d-head-index">(06)</span>
        <h2 className="p2d-head-title">Contact</h2>
        <span className="p2d-head-meta">ESTABLISH LINK</span>
        <span className="p2d-head-rule" />
      </div>

      <div className="p2d-contact-layout">
        <div className="p2d-contact-left">
          <button
            onClick={handleCopyEmail}
            className="p2d-email-link cursor-target"
          >
            davinyasa06@gmail.com
          </button>
          <span className="p2d-copy-status">
            {copied ? "[ COPIED TO CLIPBOARD! ]" : "[ CLICK EMAIL TO COPY ]"}
          </span>

          <div className="p2d-contact-networks">
            <span className="p2d-contact-subtitle">CONNECT DIRECTLY</span>
            <div className="p2d-network-grid">
              {NETWORKS.map((n) => (
                <a
                  key={n.name}
                  href={n.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p2d-network-link cursor-target"
                >
                  <span>{n.name}</span>
                  <span aria-hidden="true">↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="p2d-contact-right">
          <span className="p2d-contact-subtitle">LOCAL TIME / WIB</span>
          <div className="p2d-time-card">
            <div className="p2d-time-row">
              <span className="p2d-pulse-dot" />
              <span className="p2d-time-display">{time24 || "00:00:00"}</span>
              <span className="p2d-time-global">/ {time12 || "12:00:00 AM"}</span>
            </div>
            <span className="p2d-timezone-label">JAKARTA, INDONESIA (GMT+7)</span>
          </div>

          <div className="p2d-contact-note">
            <span className="p2d-contact-subtitle">AVAILABILITY</span>
            <p>
              Open to internships, freelance work, and AI-orchestration driven
              engineering projects. Response time: under 24 hours.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
