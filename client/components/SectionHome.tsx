"use client";

import React, { memo } from "react";
import { motion, Variants } from "framer-motion";
import SlideSection3D from "./SlideSection3D";

interface SectionHomeProps {
  ready: boolean;
}

const lineVariants: Variants = {
  hidden: {},
  show: (delay: number) => ({
    transition: {
      staggerChildren: 0.032,
      delayChildren: delay,
    },
  }),
};

const letterVariants: Variants = {
  hidden: { opacity: 0, y: 16 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] },
  },
};

interface SplitLineProps {
  text: string;
  delay: number;
  ready: boolean;
  className: string;
}

function SplitLine({ text, delay, ready, className }: SplitLineProps): React.JSX.Element {
  return (
    <motion.h1
      className={className}
      aria-label={text}
      variants={lineVariants}
      custom={delay}
      initial="hidden"
      animate={ready ? "show" : "hidden"}
    >
      {Array.from(text).map((char, index) => (
        <motion.span
          key={`${char}-${index}`}
          aria-hidden="true"
          variants={letterVariants}
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {char}
        </motion.span>
      ))}
    </motion.h1>
  );
}

const SectionHome = memo(function SectionHome({ ready }: SectionHomeProps): React.JSX.Element {
  return (
    <SlideSection3D id="home" index={0}>
      <div className="home-slide-content">
        <div className="home-titles">
          <SplitLine text="HI!" delay={0.2} ready={ready} className="" />
          <SplitLine
            text="IM DAVIN"
            delay={0.32}
            ready={ready}
            className="fontOutline"
          />
        </div>
      </div>

      <motion.div
        className="scroll-indicator-horizontal cursor-target"
        data-cursor="SCROLL"
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
});

export default SectionHome;
