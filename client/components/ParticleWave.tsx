"use client";

import React, { useRef, useMemo, useEffect, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { POD_COORDINATES } from "./SceneController";

export default function ParticleWave(): React.JSX.Element {
  const pointsRef = useRef<THREE.Points>(null);
  const countX = 65; // Keep horizontal width the same
  const countZ = 140; // Greatly increase depth (length) to cover the longer journey
  const mouse = useRef({ x: 0, y: 0 });
  const [color, setColor] = useState("#0e0e0e");

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove);

    // Watch classList on documentElement for light/dark theme toggles
    const updateThemeColor = (): void => {
      const isDark = document.documentElement.classList.contains("dark");
      setColor(isDark ? "#fafafa" : "#0e0e0e");
    };
    updateThemeColor();
    const observer = new MutationObserver(updateThemeColor);
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      observer.disconnect();
    };
  }, []);

  // Initialize flat grid array once
  const positions = useMemo(() => {
    const arr = new Float32Array(countX * countZ * 3);
    const spacing = 0.28;
    const offsetX = (countX * spacing) / 2;
    const offsetZ = (countZ * spacing) / 2;
    for (let i = 0; i < countX; i++) {
      for (let j = 0; j < countZ; j++) {
        const idx = (i * countZ + j) * 3;
        arr[idx] = i * spacing - offsetX;
        arr[idx + 1] = 0; // Dynamic height Y
        arr[idx + 2] = j * spacing - offsetZ;
      }
    }
    return arr;
  }, [countX, countZ]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Track vertical scroll progress from document custom property
    const progressStr = document.documentElement.style.getPropertyValue("--scroll-progress");
    const progress = progressStr ? parseFloat(progressStr) : 0;

    // Calculate current pod focus point (gravity well center)
    const activeIndex = Math.max(0, Math.min(POD_COORDINATES.length - 2, Math.floor(progress)));
    const scrollT = progress - activeIndex;
    const easeT = scrollT < 0.5 ? 2 * scrollT * scrollT : 1 - Math.pow(-2 * scrollT + 2, 2) / 2;
    
    const startPod = POD_COORDINATES[activeIndex];
    const endPod = POD_COORDINATES[activeIndex + 1];
    const currentFocus = new THREE.Vector3().lerpVectors(startPod, endPod, easeT);

    const spacing = 0.28;
    const offsetX = (countX * spacing) / 2;
    const offsetZ = (countZ * spacing) / 2;

    // Precompute cosZ array of size 140 outside the nested loops (only 140 Math.cos calls per frame)
    const cosZ = new Float32Array(countZ);
    for (let j = 0; j < countZ; j++) {
      const baseZ = j * spacing - offsetZ;
      cosZ[j] = Math.cos(baseZ * 0.45 + t * 0.9) * 0.28;
    }

    // Localized wave heights and gravity well computation
    for (let i = 0; i < countX; i++) {
      const baseX = i * spacing - offsetX;
      // Precompute sinX in the outer loop (only 65 Math.sin calls per frame)
      const sinX = Math.sin(baseX * 0.45 + t * 1.3) * 0.28;

      for (let j = 0; j < countZ; j++) {
        const idx = (i * countZ + j) * 3;
        const baseZ = j * spacing - offsetZ;

        const worldX = baseX;
        // Shift wave further back in Z so it covers the increased gap between cards
        const worldZ = baseZ - 6; 
        const podX = currentFocus.x;
        const podZ = currentFocus.z;

        const dx = worldX - podX;
        const dz = worldZ - podZ;

        let finalX = baseX;
        let finalZ = baseZ;
        
        // Combine two overlapping waves (precomputed sinX and cosZ[j] - 0 heavy trig calls inside this inner loop!)
        let y = sinX + cosZ[j];

        // Pod gravity trench: clear a direct visual path from the camera to the card
        const bubbleRadius = 2.4; // Reduced from 3.6 since cards are floating higher
        const absDz = Math.abs(dz);
        
        // Only affect particles within the front-to-back depth of the bubble radius
        if (absDz < bubbleRadius) {
          // Calculate the X-boundary of the oval at this exact Z-depth
          // Equation: (x * 0.48)^2 + dz^2 = R^2
          const maxDxAtZ = Math.sqrt(bubbleRadius ** 2 - absDz ** 2) / 0.48;
          const absDx = Math.abs(dx);
          
          if (absDx < maxDxAtZ) {
            const repelForce = 1 - (absDx / maxDxAtZ);
            
            // Power < 1.0 creates a stark, steep wall at the edge (aggressive repel)
            const easeForce = Math.pow(repelForce, 0.35); 
            
            // Push strictly left or right to "part the sea"!
            const pushDist = (maxDxAtZ - absDx) * easeForce;
            const dirX = dx >= 0 ? 1 : -1;
            
            finalX += dirX * pushDist;
            
            // Sink them gently to create a softer floor for the trench
            y -= easeForce * 1.2;
          }
        }

        // Interactive mouse distortion
        const targetX = mouse.current.x * 6;
        const targetZ = -mouse.current.y * 6;
        const distToMouse = Math.sqrt((finalX - targetX) ** 2 + (finalZ - targetZ) ** 2);
        if (distToMouse < 2.2) {
          const force = (1 - distToMouse / 2.2) * 0.65;
          y += Math.sin(distToMouse * 3.5 - t * 4) * force * 0.4;
        }

        arr[idx] = finalX;
        arr[idx + 1] = y;
        arr[idx + 2] = finalZ;
      }
    }
    posAttr.needsUpdate = true;

    // The SceneController handles camera flight, so the wave stays rooted.
    // Just add a gentle idle tilt for organic feel
    pointsRef.current.rotation.x = 0.15 + Math.sin(t * 0.15) * 0.04;
    pointsRef.current.rotation.z = Math.cos(t * 0.1) * 0.03;
  });

  return (
    <points ref={pointsRef} position={[0, -0.6, -6]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        color={color}
        size={0.06}
        sizeAttenuation={true}
        transparent={true}
        opacity={0.38}
        blending={THREE.NormalBlending}
      />
    </points>
  );
}

