"use client";

import React, { useRef, useEffect } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";
import { GlassPod3DProps } from "../types/portfolio.types";
import { useNeuralNetwork } from "../hooks/useNeuralNetwork";

export default function GlassPod3D({ isActive, isDark }: GlassPod3DProps): React.JSX.Element {
  const pointsRef = useRef<THREE.Points>(null);
  const linesRef = useRef<THREE.LineSegments>(null);
  const packetPointsRef = useRef<THREE.Points>(null);

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

  useFrame((state) => {
    if (!pointsRef.current) return;

    const t = state.clock.getElapsedTime();
    const delta = Math.min(0.03, state.clock.getDelta ? state.clock.getDelta() : 0.016);

    // Smoothly lerp transition progress (1.0 = active/capsule shape, 0.0 = inactive/scattered constellation)
    progressRef.current = THREE.MathUtils.lerp(
      progressRef.current,
      isActive ? 1.0 : 0.0,
      0.08
    );
    const p = progressRef.current;

    // Synchronize scale transformations for particles, lines, and packets
    const targetScale = new THREE.Vector3(
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

    // Smoothly fade points material opacity (crisp active dots vs soft background glowing dots)
    const pointsMat = pointsRef.current.material as THREE.PointsMaterial;
    if (pointsMat) {
      const targetPointsOpacity = isActive ? 0.85 : 0.32;
      pointsMat.opacity = THREE.MathUtils.lerp(pointsMat.opacity, targetPointsOpacity, 0.08);
    }

    // Smoothly fade line connections with high-tech glitchy flicker
    if (linesRef.current) {
      const linesMat = linesRef.current.material as THREE.LineBasicMaterial;
      if (linesMat) {
        const baseLineOpacity = isActive ? 0.35 : 0.12;
        const noise = Math.sin(t * 12.0) * 0.05 + Math.cos(t * 22.0) * 0.03;
        const isGlitching = Math.random() < 0.015;
        const glitchFactor = isGlitching ? 0.25 : 1.0;
        linesMat.opacity = THREE.MathUtils.lerp(
          linesMat.opacity,
          (baseLineOpacity + noise) * glitchFactor,
          0.1
        );
      }
    }

    // Update particle positions buffer attribute inside WebGL pipeline
    const geom = pointsRef.current.geometry as THREE.BufferGeometry;
    const posAttr = geom.attributes.position as THREE.BufferAttribute;
    const arr = posAttr.array as Float32Array;

    for (let i = 0; i < particleCount; i++) {
      const idx = i * 3;

      const baseX = basePositions[idx];
      const baseY = basePositions[idx + 1];
      const baseZ = basePositions[idx + 2];

      const scatX = scatterOffsets[idx];
      const scatY = scatterOffsets[idx + 1];
      const scatZ = scatterOffsets[idx + 2];

      // Calculate organic breathing wave drift unique to each particle
      const driftSpeed = 0.5 + (i % 4) * 0.15;
      const driftAmp = 0.38;
      const driftX = Math.sin(t * driftSpeed + i) * driftAmp;
      const driftY = Math.cos(t * driftSpeed * 0.95 + i) * driftAmp;
      const driftZ = Math.sin(t * driftSpeed * 1.1 + i) * driftAmp;

      // Lerp position: Clustered capsule configuration (active) vs scattered floating constellation (inactive)
      arr[idx] = THREE.MathUtils.lerp(baseX + scatX + driftX, baseX, p);
      arr[idx + 1] = THREE.MathUtils.lerp(baseY + scatY + driftY, baseY, p);
      arr[idx + 2] = THREE.MathUtils.lerp(baseZ + scatZ + driftZ, baseZ, p);
    }
    posAttr.needsUpdate = true;

    // Update line segment positions to match particle positions
    if (linesRef.current && connectionPairs.length > 0) {
      const lineGeom = linesRef.current.geometry as THREE.BufferGeometry;
      const linePosAttr = lineGeom.attributes.position as THREE.BufferAttribute;
      const lineArr = linePosAttr.array as Float32Array;

      for (let k = 0; k < connectionPairs.length; k++) {
        const [i, j] = connectionPairs[k];
        const idxI = i * 3;
        const idxJ = j * 3;
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
      const packetGeom = packetPointsRef.current.geometry as THREE.BufferGeometry;
      const packetPosAttr = packetGeom.attributes.position as THREE.BufferAttribute;
      const packetArr = packetPosAttr.array as Float32Array;

      for (let k = 0; k < packetCount; k++) {
        const packet = packetsRef.current[k];
        packet.progress += delta * packet.speed;
        if (packet.progress >= 1.0) {
          packet.progress = 0.0;
          packet.connectionIndex = Math.floor(Math.random() * connectionPairs.length);
          packet.speed = 0.35 + Math.random() * 0.45;
        }

        const [i, j] = connectionPairs[packet.connectionIndex];
        const idxI = i * 3;
        const idxJ = j * 3;
        const pIdx = k * 3;

        const s = packet.progress;
        packetArr[pIdx] = THREE.MathUtils.lerp(arr[idxI], arr[idxJ], s);
        packetArr[pIdx + 1] = THREE.MathUtils.lerp(arr[idxI + 1], arr[idxJ + 1], s);
        packetArr[pIdx + 2] = THREE.MathUtils.lerp(arr[idxI + 2], arr[idxJ + 2], s);
      }
      packetPosAttr.needsUpdate = true;

      const packetMat = packetPointsRef.current.material as THREE.PointsMaterial;
      if (packetMat) {
        const targetPacketOpacity = isActive ? 0.95 : 0.6;
        packetMat.opacity = THREE.MathUtils.lerp(packetMat.opacity, targetPacketOpacity, 0.08);
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
          opacity={isActive ? 0.85 : 0.32}
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
          opacity={isActive ? 0.35 : 0.12}
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
          opacity={isActive ? 0.95 : 0.6}
        />
      </points>
    </group>
  );
}
