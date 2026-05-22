"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import PlaceholderSvg from "./PlaceholderSvg";

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

export default function ProjectCarousel({ images, title }: ProjectCarouselProps): React.JSX.Element {
  const [index, setIndex] = useState<number>(0);
  const [imgErrors, setImgErrors] = useState<Record<number, boolean>>({});

  useEffect(() => {
    if (!images || images.length === 0) return;
    images.forEach((src, idx) => {
      const img = new window.Image();
      img.src = src;
      img.onerror = () => setImgErrors((prev) => ({ ...prev, [idx]: true }));
    });
  }, [images]);

  if (!images || images.length === 0) {
    return <div className="pm-carousel-empty">No screenshots available</div>;
  }

  const allFailed = images.every((_, idx) => imgErrors[idx]);
  const handleNext = (): void => { if (!allFailed) setIndex((prev) => (prev + 1) % images.length); };
  const handlePrev = (): void => { if (!allFailed) setIndex((prev) => (prev - 1 + images.length) % images.length); };
  const showControls = images.length > 1 && !allFailed;

  const slideProps = {
    initial: { opacity: 0, scale: 0.98 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.98 },
    transition: { duration: 0.3, ease: "easeInOut" as const },
    drag: "x" as const,
    dragConstraints: { left: 0, right: 0 },
    dragElastic: 0.2,
    onDragEnd: (_: unknown, info: { offset: { x: number } }) => {
      if (info.offset.x < -50) handleNext();
      if (info.offset.x > 50) handlePrev();
    }
  };

  const centerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px",
    width: "100%",
    height: "100%"
  };

  return (
    <div className="pm-carousel-container">
      <div className="pm-carousel-slider">
        <AnimatePresence mode="wait">
          {allFailed ? (
            <motion.div key="static-placeholder" className="pm-carousel-image" style={centerStyle} {...slideProps} drag={false}>
              <PlaceholderSvg />
            </motion.div>
          ) : !imgErrors[index] ? (
            <motion.img
              key={`img-${index}`}
              src={images[index]}
              alt={`${title} screenshot ${index + 1}`}
              className="pm-carousel-image"
              onError={() => setImgErrors((prev) => ({ ...prev, [index]: true }))}
              {...slideProps}
            />
          ) : (
            <motion.div key={`placeholder-${index}`} className="pm-carousel-image" style={centerStyle} {...slideProps}>
              <PlaceholderSvg />
            </motion.div>
          )}
        </AnimatePresence>
        {showControls && (
          <>
            <button onClick={handlePrev} className="pm-carousel-btn prev-btn" aria-label="Previous Slide">⟨</button>
            <button onClick={handleNext} className="pm-carousel-btn next-btn" aria-label="Next Slide">⟩</button>
          </>
        )}
      </div>
      {showControls && (
        <div className="pm-carousel-dots">
          {images.map((_, i) => (
            <button
              key={i}
              onClick={() => setIndex(i)}
              className={`pm-carousel-dot ${i === index ? "active" : ""}`}
              aria-label={`Go to slide ${i + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
}

