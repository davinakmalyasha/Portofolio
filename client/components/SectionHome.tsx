"use client";

import React from "react";
import { motion } from "framer-motion";
import SlideSection3D from "./SlideSection3D";

interface SectionHomeProps {
  ready: boolean;
}

export default function SectionHome({ ready }: SectionHomeProps): React.JSX.Element {
  return (
    <SlideSection3D id="home" index={0}>
      <div className="home-slide-content">
        <div className="home-titles">
          <motion.h1
            className="cursor-target"
            initial={{ opacity: 0, y: 35 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            HI!
          </motion.h1>
          <motion.h1
            className="fontOutline cursor-target"
            initial={{ opacity: 0, y: 35 }}
            animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 35 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            IM DAVIN
          </motion.h1>
        </div>
      </div>


      <motion.div
        className="scroll-indicator-horizontal"
        initial={{ opacity: 0, y: 15 }}
        animate={ready ? { opacity: 1, y: 0 } : { opacity: 0, y: 15 }}
        transition={{ duration: 0.6, delay: 0.6 }}
      >
        <span>SCROLL TO EXPLORE</span>
        <div className="scroll-indicator-bar">
          <motion.div
            className="scroll-indicator-dot"
            animate={{ x: [0, 40, 0] }}
            transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
          />
        </div>
      </motion.div>
    </SlideSection3D>
  );
}
