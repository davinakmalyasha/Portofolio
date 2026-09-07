"use client";

import React from "react";
import { motion } from "framer-motion";

const MINDSETS = [
  { title: "SOFTWARE", subtitle: "ENGINEERING" },
  { title: "AI", subtitle: "ORCHESTRATION" },
  { title: "FULL-STACK", subtitle: "DEVELOPMENT" },
];

const ACTIVITY_LOGS = [
  { index: "A1", name: "STARK" },
  { index: "A2", name: "4C" },
  { index: "A3", name: "DFD AGENCY" },
  { index: "A4", name: "+1 IN PROGRESS" },
];

export default function About2D(): React.JSX.Element {
  return (
    <section id="about" className="p2d-section p2d-about">
      <div className="p2d-head">
        <span className="p2d-head-index">(01)</span>
        <h2 className="p2d-head-title">About</h2>
        <span className="p2d-head-meta">SYSTEM.IDENTITY</span>
        <span className="p2d-head-rule" />
      </div>

      <div className="p2d-about-layout">
        <motion.div
          className="p2d-about-left"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6 }}
        >
          <div className="p2d-photo-frame">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img src="/imgOrIcon/d.avif" alt="Davin Akmal Yasha" className="p2d-photo" />
            <span className="p2d-photo-caption">FIG.01 — PORTRAIT</span>
          </div>

          <div className="p2d-ledger">
            <div className="p2d-ledger-row">
              <span className="p2d-ledger-k">UNIVERSITY</span>
              <span className="p2d-ledger-dots" />
              <span className="p2d-ledger-v">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src="/imgOrIcon/logoTelkom.jpg" alt="Telkom University" className="p2d-university-logo" />
                Telkom University
              </span>
            </div>
            <div className="p2d-ledger-row">
              <span className="p2d-ledger-k">GPA</span>
              <span className="p2d-ledger-dots" />
              <span className="p2d-ledger-v">3.60 / 4.00</span>
            </div>
          </div>

          <div className="p2d-mindset-row">
            {MINDSETS.map((m) => (
              <div key={m.title} className="p2d-mindset-card">
                <span className="p2d-mindset-title">{m.title}</span>
                <span className="p2d-mindset-subtitle">{m.subtitle}</span>
              </div>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="p2d-about-right"
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.6, delay: 0.1 }}
        >
          <h3 className="p2d-about-heading">
            Software Engineer <em>with a focus on</em> AI Orchestration
          </h3>

          <div className="p2d-about-tags">
            <span>SOFTWARE ENGINEERING</span>
            <span>/</span>
            <span>AI ORCHESTRATION</span>
            <span>/</span>
            <span>FULL-STACK DEVELOPMENT</span>
          </div>

          <div className="p2d-about-text">
            <p>
              I&apos;m <strong>Davin Akmal Yasha</strong>, a Software Engineer who likes to build
              solutions by product and system through AI orchestration.
            </p>
            <p>
              I specialize in full-stack development, AI orchestration, and software engineering,
              focusing on designing scalable system architectures and building high-performance
              digital products.
            </p>
          </div>

          <div className="p2d-focus-section">
            <span className="p2d-focus-label">ACTIVITY LOG</span>
            <div className="p2d-log-list">
              {ACTIVITY_LOGS.map((log) => (
                <div key={log.index} className="p2d-log-row">
                  <span className="p2d-log-index">{log.index}</span>
                  <span className="p2d-log-name">{log.name}</span>
                  <span className="p2d-log-bar" />
                  <span className="p2d-log-status">LOGGED</span>
                </div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
