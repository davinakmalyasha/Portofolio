"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface ProjectCarouselProps {
  images: string[];
  title: string;
}

export default function ProjectCarousel({ images, title }: ProjectCarouselProps): React.JSX.Element {
  const [index, setIndex] = useState<number>(0);

  if (!images || images.length === 0) {
    return <div className="pm-carousel-empty">No screenshots available</div>;
  }

  const handleNext = (): void => {
    setIndex((prev) => (prev + 1) % images.length);
  };

  const handlePrev = (): void => {
    setIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="pm-carousel-container">
      <div className="pm-carousel-slider">
        <AnimatePresence mode="wait">
          <motion.img
            key={index}
            src={images[index]}
            alt={`${title} screenshot ${index + 1}`}
            className="pm-carousel-image"
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.98 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            drag="x"
            dragConstraints={{ left: 0, right: 0 }}
            dragElastic={0.2}
            onDragEnd={(_, info) => {
              if (info.offset.x < -50) handleNext();
              if (info.offset.x > 50) handlePrev();
            }}
          />
        </AnimatePresence>

        {images.length > 1 && (
          <>
            <button onClick={handlePrev} className="pm-carousel-btn prev-btn" aria-label="Previous Slide">
              ⟨
            </button>
            <button onClick={handleNext} className="pm-carousel-btn next-btn" aria-label="Next Slide">
              ⟩
            </button>
          </>
        )}
      </div>

      {images.length > 1 && (
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
