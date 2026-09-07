"use client";

import React from "react";
import { motion } from "framer-motion";

const SPEC = [
  { k: "NAME", v: "Davin Akmal Yasha" },
  { k: "ROLE", v: "Software Engineer" },
  { k: "FOCUS", v: "AI Orchestration" },
  { k: "BASE", v: "Jakarta, ID" },
  { k: "STATUS", v: "Open to work" },
];

const TICKER = "SOFTWARE ENGINEERING ✦ AI ORCHESTRATION ✦ FULL-STACK DEVELOPMENT ✦ ";

export default function Hero2D(): React.JSX.Element {
  return (
    <section id="home" className="p2d-section p2d-hero">
      <div className="p2d-hero-grid">
        <div className="p2d-hero-left">
          <motion.span
            className="p2d-kicker"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            ( 00 ) / INTRO — PERSONAL INDEX
          </motion.span>

          <motion.h1
            className="p2d-hero-h1"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.35 }}
          >
            Hi!
          </motion.h1>
          <motion.h1
            className="p2d-hero-h1 p2d-hero-italic"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.5 }}
          >
            I&apos;m Davin
          </motion.h1>

          <motion.p
            className="p2d-hero-lede"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.65 }}
          >
            Building products and systems through AI orchestration —
            full-stack, scalable, monochrome.
          </motion.p>
        </div>

        <motion.div
          className="p2d-spec-sheet"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
        >
          {SPEC.map((row) => (
            <div key={row.k} className="p2d-spec-row">
              <span className="p2d-spec-k">{row.k}</span>
              <span className="p2d-spec-dots" />
              <span className="p2d-spec-v">{row.v}</span>
            </div>
          ))}
        </motion.div>
      </div>

      <div className="p2d-marquee" aria-hidden="true">
        <div className="p2d-marquee-track">
          <span>{TICKER}{TICKER}</span>
          <span>{TICKER}{TICKER}</span>
        </div>
      </div>
    </section>
  );
}
