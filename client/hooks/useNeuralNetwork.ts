"use client";

import { useMemo } from "react";

export interface NeuralNetworkData {
  particleCount: number;
  packetCount: number;
  basePositions: Float32Array;
  scatterOffsets: Float32Array;
  initialPositions: Float32Array;
  connectionPairs: number[][];
  linePositions: Float32Array;
  packetInitialPositions: Float32Array;
}

// A helper function defined outside the hook to generate bases and scatters deterministically.
// Because it is defined outside the hook, it doesn't trigger React's hook/render immutability or purity warnings.
const PARTICLE_COUNT = 50;
const PACKET_COUNT = 6;

function generateBasesAndScatters(particleCount: number): [Float32Array, Float32Array] {
  let seed = 42;
  const random = (): number => {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    return seed / 4294967296;
  };

  const bases = new Float32Array(particleCount * 3);
  const scatters = new Float32Array(particleCount * 3);

  const radius = 12.0;
  const thetaStart = Math.PI * 1.425;
  const thetaLength = Math.PI * 0.15;

  for (let i = 0; i < particleCount; i++) {
    const idx = i * 3;

    let y = 0;
    let theta = 0;

    // Distribute points strictly along the 4 edges of the curved cylinder slice (capsule borders)
    const segment = Math.floor(random() * 4);
    const t = random();

    if (segment === 0) {
      // Top edge
      y = 0.5;
      theta = thetaStart + t * thetaLength;
    } else if (segment === 1) {
      // Bottom edge
      y = -0.5;
      theta = thetaStart + t * thetaLength;
    } else if (segment === 2) {
      // Left edge
      y = -0.5 + t * 1.0;
      theta = thetaStart;
    } else {
      // Right edge
      y = -0.5 + t * 1.0;
      theta = thetaStart + thetaLength;
    }

    // Base capsule target coordinates
    bases[idx] = radius * Math.cos(theta);
    bases[idx + 1] = y;
    bases[idx + 2] = radius * Math.sin(theta) + 12.0;

    // Scattered vectors: Inactive particles dissolve outwards to form a soft, organic stardust cloud
    scatters[idx] = (random() - 0.5) * 2.5;
    scatters[idx + 1] = (random() - 0.5) * 2.0;
    scatters[idx + 2] = (random() - 0.5) * 1.5;
  }

  return [bases, scatters];
}

// Compute the static base coordinates and scatter offsets once at load time
const [SHARED_BASE_POSITIONS, SHARED_SCATTER_OFFSETS] = generateBasesAndScatters(PARTICLE_COUNT);

// Compute the static connection pairs once at load time
const SHARED_CONNECTION_PAIRS = (() => {
  const pairs: number[][] = [];
  const threshold = 0.70; // distance threshold in base units
  const thresholdSq = threshold * threshold; // squared threshold avoids Math.sqrt

  for (let i = 0; i < PARTICLE_COUNT; i++) {
    const idxI = i * 3;
    const xi = SHARED_BASE_POSITIONS[idxI];
    const yi = SHARED_BASE_POSITIONS[idxI + 1];
    const zi = SHARED_BASE_POSITIONS[idxI + 2];

    for (let j = i + 1; j < PARTICLE_COUNT; j++) {
      const idxJ = j * 3;
      const xj = SHARED_BASE_POSITIONS[idxJ];
      const yj = SHARED_BASE_POSITIONS[idxJ + 1];
      const zj = SHARED_BASE_POSITIONS[idxJ + 2];

      const dx = xi - xj;
      const dy = yi - yj;
      const dz = zi - zj;
      const distSq = dx * dx + dy * dy + dz * dz;

      if (distSq < thresholdSq) {
        pairs.push([i, j]);
      }
    }
  }

  // Cap at a maximum of 100 connections to keep rendering fast and elegant
  return pairs.slice(0, 100);
})();

export function useNeuralNetwork(): NeuralNetworkData {
  const initialPositions = useMemo((): Float32Array => new Float32Array(PARTICLE_COUNT * 3), []);
  const packetInitialPositions = useMemo((): Float32Array => new Float32Array(PACKET_COUNT * 3), []);

  const linePositions = useMemo((): Float32Array => {
    return new Float32Array(SHARED_CONNECTION_PAIRS.length * 2 * 3);
  }, []);

  return {
    particleCount: PARTICLE_COUNT,
    packetCount: PACKET_COUNT,
    basePositions: SHARED_BASE_POSITIONS,
    scatterOffsets: SHARED_SCATTER_OFFSETS,
    initialPositions,
    connectionPairs: SHARED_CONNECTION_PAIRS,
    linePositions,
    packetInitialPositions,
  };
}
