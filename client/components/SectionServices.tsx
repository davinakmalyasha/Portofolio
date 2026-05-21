"use client";

import React from "react";
import { motion } from "framer-motion";
import SlideSection3D from "./SlideSection3D";

const SERVICES = [
  {
    num: "01",
    name: "WEBGL & 3D INTERACTIVE",
    desc: "Physics-based R3F simulations.",
    deliverables: ["Shader Programming (GLSL)", "Camera Rig Animation", "Physical Translucency Glass"]
  },
  {
    num: "02",
    name: "CREATIVE DEV & SPEED",
    desc: "Optimized Next.js structures.",
    deliverables: ["Lenis Kinetic Smooth Scroll", "Asymmetric Layout Grids", "Bundle Size Compaction"]
  },
  {
    num: "03",
    name: "BRAND ENGINEERING",
    desc: "Awwwards-level interactive designs.",
    deliverables: ["Dynamic Micro-Interactions", "Custom Cursor System", "Interactive Accordions"]
  }
];

export default function SectionServices(): React.JSX.Element {
  return (
    <SlideSection3D id="services" index={3}>
      <div className="section-title-wrap">
        <h2>DISCIPLINES</h2>
        <span>Services & Frameworks</span>
      </div>

      <div className="services-grid-wrapper">
        {SERVICES.map((srv, idx) => (
          <motion.div
            key={srv.num}
            className="service-card cursor-target"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.15, duration: 0.5 }}
          >
            <div className="service-header">
              <span className="service-number">{srv.num}</span>
              <div className="service-bullet-spin" />
            </div>
            
            <div className="service-body">
              <h3>{srv.name}</h3>
              <p className="service-desc">{srv.desc}</p>
              
              <ul className="service-deliverables">
                {srv.deliverables.map((del) => (
                  <li key={del}>✦ {del}</li>
                ))}
              </ul>
            </div>
          </motion.div>
        ))}
      </div>
    </SlideSection3D>
  );
}
