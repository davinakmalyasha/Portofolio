"use client";
import React from "react";
import { motion } from "framer-motion";
import SlideSection3D from "./SlideSection3D";
import { useCopyToClipboard } from "../hooks/useCopyToClipboard";
import { useJakartaTime } from "../hooks/useJakartaTime";

const NETWORKS = [
  { name: "GITHUB", href: "https://github.com/davinakmalyasha" },
  { name: "LINKEDIN", href: "https://www.linkedin.com/in/davin-yasa-974ba82a1" },
  { name: "UPWORK", href: "https://www.upwork.com/freelancers/~01707125094176615a" }
];

export default function SectionContact(): React.JSX.Element {
  const { copied, copyText } = useCopyToClipboard();
  const { time24, time12 } = useJakartaTime();

  const handleCopyEmail = (): void => {
    copyText("davinyasa06@gmail.com");
  };

  return (
    <SlideSection3D id="contact" index={4}>
      <div className="contact-slide-layout">
        <div className="contact-left-col">
          <span className="contact-subtitle">[ LET&apos;S CONNECT ]</span>
          <div className="email-click-area">
            <motion.div
              onClick={handleCopyEmail}
              className="contact-mail-link cursor-target"
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === "Enter" || e.key === " ") {
                  handleCopyEmail();
                }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              DAVINYASA06@GMAIL.COM
            </motion.div>
            <div className="copy-status-indicator">
              <span className={copied ? "copied-text" : "click-to-copy-text"}>
                {copied ? "[ COPIED TO CLIPBOARD! ]" : "[ CLICK EMAIL TO COPY ]"}
              </span>
            </div>
          </div>
        </div>
        <div className="contact-right-col">
          <span className="contact-subtitle">[ LOCAL TIME / WIB ]</span>
          <div className="local-time-card">
            <div className="time-row">
              <span className="status-pulse-dot" />
              <span className="time-display">{time24 || "00:00:00"}</span>
              <span className="global-time-display">/ {time12 || "12:00:00 AM"}</span>
            </div>
            <span className="timezone-label">JAKARTA, INDONESIA (GMT+7)</span>
          </div>
          <span className="contact-subtitle mt-40">[ CONNECT DIRECTLY ]</span>
          <div className="networks-grid">
            {NETWORKS.map((n) => (
              <a
                key={n.name}
                href={n.href}
                target="_blank"
                rel="noopener noreferrer"
                className="network-card cursor-target"
              >
                <span className="network-name">{n.name}</span>
                <span className="network-arrow">↗</span>
              </a>
            ))}
          </div>
        </div>
      </div>
    </SlideSection3D>
  );
}

