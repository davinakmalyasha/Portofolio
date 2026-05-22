"use client";

import React, { useRef, useMemo, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { useThemeObserver } from "../hooks/useThemeObserver";
import { vertexShader, fragmentShader } from "./StarFieldShaders";

export default function StarField(): React.JSX.Element {
  const isDark = useThemeObserver();
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const currentParallax = useRef({ x: 0, y: 0 });

  const starColor = useMemo(() => new THREE.Color(isDark ? "#fafafa" : "#000000"), [isDark]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent): void => {
      mouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
      mouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", handleMouseMove, { passive: true });
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);
  const count = 500;
  const { positions, sizes, phases, speeds } = useMemo(() => {
    // Pure stateless hash function for deterministic random-like values (no mutations/closure reassignment)
    const random = (idx: number, offset: number): number => {
      const value = Math.sin(idx * 12.9898 + offset * 78.233) * 43758.5453123;
      return value - Math.floor(value);
    };

    const pos = new Float32Array(count * 3);
    const sz = new Float32Array(count);
    const ph = new Float32Array(count);
    const sp = new Float32Array(count);

    for (let i = 0; i < count; i++) {
      const x = (random(i, 1) - 0.5) * 52;
      const absX = Math.abs(x);
      // Slope minY down on the outer sides to fill the lower blank space without mixing with the sea wave
      const minY = absX > 7.0 ? 3.8 - Math.min(1.0, (absX - 7.0) / 19.0) * 5.6 : 3.8;

      pos[i * 3] = x;
      pos[i * 3 + 1] = minY + random(i, 2) * (11.8 - minY);
      pos[i * 3 + 2] = -16 - random(i, 3) * 10;

      sz[i] = 0.12 + random(i, 4) * 0.35;
      ph[i] = random(i, 5) * Math.PI * 2;
      // Slower speed values (ranges from 0.3 to 1.0)
      sp[i] = 0.3 + random(i, 6) * 0.7;
    }
    return { positions: pos, sizes: sz, phases: ph, speeds: sp };
  }, []);
  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uColor: { value: starColor },
    uOpacity: { value: isDark ? 0.75 : 1.3 },
    uMouseParallaxX: { value: 0 },
    uMouseParallaxY: { value: 0 }
  }), [starColor, isDark]);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    if (materialRef.current) {
      materialRef.current.uniforms.uTime.value = t;
      materialRef.current.uniforms.uColor.value = starColor;
      materialRef.current.uniforms.uOpacity.value = isDark ? 0.75 : 1.3;

      currentParallax.current.x = THREE.MathUtils.lerp(
        currentParallax.current.x,
        mouse.current.x * -1.8,
        0.04
      );
      currentParallax.current.y = THREE.MathUtils.lerp(
        currentParallax.current.y,
        mouse.current.y * -1.2,
        0.04
      );

      materialRef.current.uniforms.uMouseParallaxX.value = currentParallax.current.x;
      materialRef.current.uniforms.uMouseParallaxY.value = currentParallax.current.y;
    }
  });

  return (
    <points>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
        <bufferAttribute attach="attributes-aSize" args={[sizes, 1]} />
        <bufferAttribute attach="attributes-aPhase" args={[phases, 1]} />
        <bufferAttribute attach="attributes-aSpeed" args={[speeds, 1]} />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={vertexShader}
        fragmentShader={fragmentShader}
        uniforms={uniforms}
        transparent={true}
        depthWrite={false}
      />
    </points>
  );
}
