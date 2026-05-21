"use client";

import React, { useEffect, useState, useRef } from "react";
import { useFrame } from "@react-three/fiber";
import { Html } from "@react-three/drei";
import * as THREE from "three";
import { SlideSection3DProps } from "../types/portfolio.types";
import { POD_COORDINATES } from "./SceneController";
import GlassPod3D from "./GlassPod3D";

interface Pod3DProps extends SlideSection3DProps {
  isActive: boolean;
}

export default function Pod3D({ children, id, index, isActive }: Pod3DProps): React.JSX.Element {
  const [isDark, setIsDark] = useState<boolean>(false);
  const groupRef = useRef<THREE.Group>(null);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const updateTheme = (): void => {
      setIsDark(document.documentElement.classList.contains("dark"));
    };
    updateTheme();
    const observer = new MutationObserver(updateTheme);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (sectionRef.current) {
      let parent: HTMLElement | null = sectionRef.current.parentElement;
      while (parent) {
        if (parent.classList.contains("canvas-container")) {
          break;
        }
        if (isActive) {
          parent.style.pointerEvents = "auto";
        } else {
          if (parent.tagName === "DIV") {
            const grandParent: HTMLElement | null = parent.parentElement;
            if (grandParent && !grandParent.classList.contains("canvas-container")) {
              parent.style.pointerEvents = "none";
            } else {
              parent.style.pointerEvents = "auto";
            }
          }
        }
        parent = parent.parentElement;
      }
    }
  }, [isActive]);

  useFrame((state) => {
    if (!groupRef.current) return;

    // Apply interactive 3D parallax tilt to both backing box and HTML overlay together
    const targetRotX = isActive ? state.pointer.y * 0.12 : 0;
    const targetRotY = isActive ? state.pointer.x * 0.12 : 0;

    groupRef.current.rotation.x = THREE.MathUtils.lerp(groupRef.current.rotation.x, targetRotX, 0.08);
    groupRef.current.rotation.y = THREE.MathUtils.lerp(groupRef.current.rotation.y, targetRotY, 0.08);
  });

  const labelText = id.toUpperCase().split("").join(" ");
  const position = POD_COORDINATES[index];

  return (
    <group position={position} visible={true}>
      <group ref={groupRef}>
        {/* Monolithic 3D backing plate with micro-chamfers */}
        {id !== "home" && (
          <GlassPod3D isActive={isActive} isDark={isDark} index={index} />
        )}

        {/* Floating 2D HTML Content overlay perfectly aligned in front of WebGL backdrop */}
        <Html
          transform
          center
          position={[0, 0, 0.05]}
          distanceFactor={2.5}
          className={`html-pod-portal ${isActive ? "active-portal" : "inactive-portal"}`}
        >
          <section 
            ref={sectionRef}
            className={`slide-section ${isActive ? "active" : "inactive"}`} 
            id={id}
            style={{ pointerEvents: isActive ? "auto" : "none" }}
          >
            <div 
              className={`capsule-pod ${isActive ? "capsule-opened" : "capsule-closed"}`}
              style={{ pointerEvents: isActive ? "auto" : "none" }}
            >
              {/* Technical corner brackets forming a high-tech HUD frame */}
              <div className="tech-corner tech-top-left" />
              <div className="tech-corner tech-top-right" />
              <div className="tech-corner tech-bottom-left" />
              <div className="tech-corner tech-bottom-right" />

              {/* Minimalist vertical title for closed slide */}
              <div className="capsule-label">{labelText}</div>

              {/* Content body containing slides */}
              <div className="capsule-content-card">{children}</div>
            </div>
          </section>
        </Html>
      </group>
    </group>
  );
}
