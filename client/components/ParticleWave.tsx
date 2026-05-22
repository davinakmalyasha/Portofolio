"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import { Vector3, Points, BufferAttribute, NormalBlending } from "three";
import { POD_COORDINATES } from "./SceneController";
import { scrollProgress } from "../hooks/scrollProgress";
import { useThemeObserver } from "../hooks/useThemeObserver";

// Module-level cached Vector3 to avoid per-frame GC allocation
const _waveFocus = new Vector3();

export default function ParticleWave(): React.JSX.Element {
  const pointsRef = useRef<Points>(null);
  const countX = 65; // Keep horizontal width the same
  const countZ = 140; // Greatly increase depth (length) to cover the longer journey
  const mouse = useRef({ x: 0, y: 0 });
  const cosZRef = useRef<Float32Array>(new Float32Array(countZ));
  const baseZRef = useRef<Float32Array>(new Float32Array(countZ));
  const absDzRef = useRef<Float32Array>(new Float32Array(countZ));
  const maxDxAtZRef = useRef<Float32Array>(new Float32Array(countZ));
  const inBubbleDepthRef = useRef<Uint8Array>(new Uint8Array(countZ));
  const isDark = useThemeObserver();
  const color = useMemo((): string => isDark ? "#fafafa" : "#0e0e0e", [isDark]);

  // Precompute constant spacing values once (never change)
  const spacing = 0.28;
  const offsetX = (countX * spacing) / 2;
  const offsetZ = (countZ * spacing) / 2;

  // Track cursor coordinates
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  // Initialize flat grid array once
  const positions = useMemo(() => {
    const arr = new Float32Array(countX * countZ * 3);
    for (let i = 0; i < countX; i++) {
      for (let j = 0; j < countZ; j++) {
        const idx = (i * countZ + j) * 3;
        arr[idx] = i * spacing - offsetX;
        arr[idx + 1] = 0; // Dynamic height Y
        arr[idx + 2] = j * spacing - offsetZ;
      }
    }
    return arr;
  }, [countX, countZ, spacing, offsetX, offsetZ]);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const t = state.clock.getElapsedTime();
    const posAttr = pointsRef.current.geometry.attributes.position as BufferAttribute;
    const arr = posAttr.array as Float32Array;

    // Read scroll progress from shared JS variable (avoids DOM read + parseFloat every frame)
    const progress = scrollProgress;

    // Calculate current pod focus point (gravity well center)
    const activeIndex = Math.max(0, Math.min(POD_COORDINATES.length - 2, Math.floor(progress)));
    const scrollT = progress - activeIndex;
    const easeT = scrollT < 0.5 ? 2 * scrollT * scrollT : 1 - Math.pow(-2 * scrollT + 2, 2) / 2;
    
    const startPod = POD_COORDINATES[activeIndex];
    const endPod = POD_COORDINATES[activeIndex + 1];
    _waveFocus.lerpVectors(startPod, endPod, easeT);

    // Reuse cached Float32Arrays / Uint8Arrays to avoid per-frame GC allocations
    const cosZ = cosZRef.current;
    const baseZArr = baseZRef.current;
    const absDzArr = absDzRef.current;
    const maxDxAtZArr = maxDxAtZRef.current;
    const inBubbleDepth = inBubbleDepthRef.current;

    // Hoist constants out of 9,100-iteration inner loop
    const podX = _waveFocus.x;
    const podZ = _waveFocus.z;
    const targetX = mouse.current.x * 6;
    const targetZ = -mouse.current.y * 6;
    const bubbleRadius = 2.4;
    const bubbleRadiusSq = 5.76; // 2.4 * 2.4 precomputed
    const mouseRadiusSq = 4.84; // 2.2 * 2.2 precomputed

    // Precompute row-specific (depth-specific) calculations (only 140 iterations per frame)
    for (let j = 0; j < countZ; j++) {
      const bz = j * spacing - offsetZ;
      baseZArr[j] = bz;
      cosZ[j] = Math.cos(bz * 0.45 + t * 0.9) * 0.28;

      const dz = (bz - 6) - podZ;
      const absDz = Math.abs(dz);
      absDzArr[j] = absDz;

      if (absDz < bubbleRadius) {
        inBubbleDepth[j] = 1;
        maxDxAtZArr[j] = Math.sqrt(bubbleRadiusSq - absDz * absDz) / 0.48;
      } else {
        inBubbleDepth[j] = 0;
      }
    }

    // Localized wave heights and gravity well computation
    for (let i = 0; i < countX; i++) {
      const baseX = i * spacing - offsetX;
      // Precompute sinX in the outer loop (only 65 Math.sin calls per frame)
      const sinX = Math.sin(baseX * 0.45 + t * 1.3) * 0.28;
      // Precompute dx and absDx in the outer loop (only 65 calculations instead of 9,100 per frame)
      const dx = baseX - podX;
      const absDx = Math.abs(dx);

      for (let j = 0; j < countZ; j++) {
        const idx = (i * countZ + j) * 3;
        const baseZ = baseZArr[j];

        let finalX = baseX;
        
        // Combine two overlapping waves (precomputed sinX and cosZ[j] - 0 heavy trig calls inside this inner loop!)
        let y = sinX + cosZ[j];

        // Pod gravity trench: clear a direct visual path from the camera to the card
        if (inBubbleDepth[j] === 1) {
          const maxDxAtZ = maxDxAtZArr[j];
          
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

        // Interactive mouse distortion (squared-distance early bailout: 9,100 sqrt → ~80)
        const dxm = finalX - targetX;
        const dzm = baseZ - targetZ;
        const distSqMouse = dxm * dxm + dzm * dzm;
        if (distSqMouse < mouseRadiusSq) {
          const distToMouse = Math.sqrt(distSqMouse);
          const force = (1 - distToMouse / 2.2) * 0.65;
          y += Math.sin(distToMouse * 3.5 - t * 4) * force * 0.4;
        }

        arr[idx] = finalX;
        arr[idx + 1] = y;
        arr[idx + 2] = baseZ;
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
        blending={NormalBlending}
      />
    </points>
  );
}

