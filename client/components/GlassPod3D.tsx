"use client";

import React, { useRef, useEffect, useMemo } from "react";
import { useFrame } from "@react-three/fiber";
import { Points, LineSegments, Vector3, MathUtils, PointsMaterial, LineBasicMaterial, BufferGeometry, BufferAttribute } from "three";
import { GlassPod3DProps } from "../types/portfolio.types";
import { useNeuralNetwork } from "../hooks/useNeuralNetwork";

export default function GlassPod3D({ isActive, isDark, index, activeSlide }: GlassPod3DProps): React.JSX.Element {
  const pointsRef = useRef<Points>(null);
  const linesRef = useRef<LineSegments>(null);
  const packetPointsRef = useRef<Points>(null);

  const {
    particleCount,
    packetCount,
    basePositions,
    scatterOffsets,
    initialPositions,
    connectionPairs,
    linePositions,
    packetInitialPositions,
  } = useNeuralNetwork();

  const progressRef = useRef<number>(isActive ? 1.0 : 0.0);
  const cachedScaleRef = useRef<Vector3>(new Vector3());

  // Pre-compute per-particle driftSpeed constants once (avoids 36,000 redundant calcs/sec)
  const driftSpeeds = useMemo((): Float32Array => {
    const speeds = new Float32Array(particleCount);
    for (let i = 0; i < particleCount; i++) {
      speeds[i] = 0.5 + (i % 4) * 0.15;
    }
    return speeds;
  }, [particleCount]);

  const packetsRef = useRef<{
    connectionIndex: number;
    progress: number;
    speed: number;
  }[]>([]);

  // Initialize data packets
  useEffect(() => {
    if (connectionPairs.length > 0 && packetsRef.current.length === 0) {
      const initialPackets = [];
      for (let k = 0; k < packetCount; k++) {
        initialPackets.push({
          connectionIndex: Math.floor(Math.random() * connectionPairs.length),
          progress: Math.random(),
          speed: 0.35 + Math.random() * 0.45,
        });
      }
      packetsRef.current = initialPackets;
    }
  }, [connectionPairs, packetCount]);

  useFrame((state, frameDelta) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const clampedDelta = Math.min(0.03, frameDelta);

    // Smoothly lerp transition progress (1.0 = active/capsule shape, 0.0 = inactive/scattered constellation)
    progressRef.current = MathUtils.lerp(
      progressRef.current,
      isActive ? 1.0 : 0.0,
      0.08
    );
    const p = progressRef.current;

    // Synchronize scale transformations for particles, lines, and packets (reuse cached Vector3)
    const targetScale = cachedScaleRef.current.set(
      isActive ? 1.86 : 0.55,
      isActive ? 6.0 : 2.0,
      1.0
    );
    pointsRef.current.scale.lerp(targetScale, 0.08);

    if (linesRef.current) {
      linesRef.current.scale.copy(pointsRef.current.scale);
    }
    if (packetPointsRef.current) {
      packetPointsRef.current.scale.copy(pointsRef.current.scale);
    }

    const distance = Math.abs(activeSlide - index);
    const baseOpacity = Math.max(0.5, 1.0 - distance * 0.1);

    // Smoothly fade points material opacity (crisp active dots vs soft background glowing dots)
    const pointsMat = pointsRef.current.material as PointsMaterial;
    if (pointsMat) {
      const targetPointsOpacity = (isActive ? 0.85 : 0.32) * baseOpacity;
      pointsMat.opacity = MathUtils.lerp(pointsMat.opacity, targetPointsOpacity, 0.08);
    }

    // Smoothly fade line connections with high-tech glitchy flicker
    if (linesRef.current) {
      const linesMat = linesRef.current.material as LineBasicMaterial;
      if (linesMat) {
        const baseLineOpacity = isActive ? 0.35 : 0.12;
        const noise = Math.sin(t * 12.0) * 0.05 + Math.cos(t * 22.0) * 0.03;
        const isGlitching = Math.random() < 0.015;
        const glitchFactor = isGlitching ? 0.25 : 1.0;
        const targetLinesOpacity = ((baseLineOpacity + noise) * baseOpacity) * glitchFactor;
        linesMat.opacity = MathUtils.lerp(
          linesMat.opacity,
          targetLinesOpacity,
          0.1
        );
      }
    }

    // Update particle positions buffer attribute inside WebGL pipeline
    const geom = pointsRef.current.geometry as BufferGeometry;
    const posAttr = geom.attributes.position as BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      const baseX = basePositions[idx];
      const baseY = basePositions[idx + 1];
      const baseZ = basePositions[idx + 2];

      const scatX = scatterOffsets[idx];
      const scatY = scatterOffsets[idx + 1];
      const scatZ = scatterOffsets[idx + 2];

      // Calculate organic breathing wave drift unique to each particle (precomputed driftSpeed lookup)
      const ds = driftSpeeds[i];
      const driftX = Math.sin(t * ds + i) * 0.38;
      const driftY = Math.cos(t * ds * 0.95 + i) * 0.38;
      const driftZ = Math.sin(t * ds * 1.1 + i) * 0.38;

      // Lerp position: Clustered capsule configuration (active) vs scattered floating constellation (inactive)
      arr[idx] = MathUtils.lerp(baseX + scatX + driftX, baseX, p);
      arr[idx + 1] = MathUtils.lerp(baseY + scatY + driftY, baseY, p);
      arr[idx + 2] = MathUtils.lerp(baseZ + scatZ + driftZ, baseZ, p);
    }
    posAttr.needsUpdate = true;

    // Update line segment positions to match particle positions
    if (linesRef.current && connectionPairs.length > 0) {
      const lineGeom = linesRef.current.geometry as BufferGeometry;
      const linePosAttr = lineGeom.attributes.position as BufferAttribute;
      const lineArr = linePosAttr.array as Float32Array;

      for (let k = 0; k < connectionPairs.length; k++) {
        const pair = connectionPairs[k];
        const idxI = pair[0] * 3;
        const idxJ = pair[1] * 3;
        const lineIdx = k * 6;

        // Vertex 1
        lineArr[lineIdx] = arr[idxI];
        lineArr[lineIdx + 1] = arr[idxI + 1];
        lineArr[lineIdx + 2] = arr[idxI + 2];

        // Vertex 2
        lineArr[lineIdx + 3] = arr[idxJ];
        lineArr[lineIdx + 4] = arr[idxJ + 1];
        lineArr[lineIdx + 5] = arr[idxJ + 2];
      }
      linePosAttr.needsUpdate = true;
    }

    // Update traversing data packet positions
    if (packetPointsRef.current && packetsRef.current.length > 0 && connectionPairs.length > 0) {
      const packetGeom = packetPointsRef.current.geometry as BufferGeometry;
      const packetPosAttr = packetGeom.attributes.position as BufferAttribute;
      const packetArr = packetPosAttr.array as Float32Array;

      for (let k = 0; k < packetCount; k++) {
        const packet = packetsRef.current[k];
        packet.progress += clampedDelta * packet.speed;
        if (packet.progress >= 1.0) {
          packet.progress = 0.0;
          packet.connectionIndex = Math.floor(Math.random() * connectionPairs.length);
          packet.speed = 0.35 + Math.random() * 0.45;
        }

        const pair = connectionPairs[packet.connectionIndex];
        const idxI = pair[0] * 3;
        const idxJ = pair[1] * 3;
        const pIdx = k * 3;

        const s = packet.progress;
        packetArr[pIdx] = MathUtils.lerp(arr[idxI], arr[idxJ], s);
        packetArr[pIdx + 1] = MathUtils.lerp(arr[idxI + 1], arr[idxJ + 1], s);
        packetArr[pIdx + 2] = MathUtils.lerp(arr[idxI + 2], arr[idxJ + 2], s);
      }
      packetPosAttr.needsUpdate = true;

      const packetMat = packetPointsRef.current.material as PointsMaterial;
      if (packetMat) {
        const targetPacketOpacity = (isActive ? 0.95 : 0.6) * baseOpacity;
        packetMat.opacity = MathUtils.lerp(packetMat.opacity, targetPacketOpacity, 0.08);
      }
    }
  });

  return (
    <group>
      {/* Neural Particle Constellation points */}
      <points ref={pointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[initialPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={isDark ? "#ffffff" : "#000000"}
          size={0.075}
          sizeAttenuation={true}
          transparent={true}
          opacity={(isActive ? 0.85 : 0.32) * Math.max(0.5, 1.0 - Math.abs(activeSlide - index) * 0.1)}
        />
      </points>

      {/* Glitchy/pulsing neural connection lines */}
      <lineSegments ref={linesRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[linePositions, 3]}
          />
        </bufferGeometry>
        <lineBasicMaterial
          color={isDark ? "#ffffff" : "#000000"}
          transparent={true}
          opacity={(isActive ? 0.35 : 0.12) * Math.max(0.5, 1.0 - Math.abs(activeSlide - index) * 0.1)}
          depthWrite={false}
        />
      </lineSegments>

      {/* Traversing data packets */}
      <points ref={packetPointsRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            args={[packetInitialPositions, 3]}
          />
        </bufferGeometry>
        <pointsMaterial
          color={isDark ? "#ffffff" : "#000000"}
          size={0.15}
          sizeAttenuation={true}
          transparent={true}
          opacity={(isActive ? 0.95 : 0.6) * Math.max(0.5, 1.0 - Math.abs(activeSlide - index) * 0.1)}
        />
      </points>
    </group>
  );
}
