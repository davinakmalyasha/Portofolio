"use client";

import React, { useRef, useMemo, useEffect, useLayoutEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import {
  Plane,
  Points,
  PointsMaterial,
  Raycaster,
  Vector2,
  Vector3,
  NormalBlending,
} from "three";
import { POD_COORDINATES } from "./SceneController";
import { scrollProgress } from "../hooks/scrollProgress";
import { useThemeObserver } from "../hooks/useThemeObserver";

// Module-level cached objects to avoid per-frame GC allocation
const _waveFocus = new Vector3();
const _wavePlane = new Plane();
const _waveRaycaster = new Raycaster();
const _waveHit = new Vector3();
const _waveNormal = new Vector3(0, 1, 0);
const _pointerNdc = new Vector2();

const WAVE_VERTEX_INJECTION = /* glsl */ `
  float waveBx = position.x;
  float waveBz = position.z;

  // Combine the two overlapping waves entirely on the GPU.
  float waveSinX = sin(waveBx * 0.45 + uTime * 1.3) * 0.28;
  float waveCosZ = cos(waveBz * 0.45 + uTime * 0.9) * 0.28;
  float waveY = waveSinX + waveCosZ;
  float waveFinalX = waveBx;

  // Pod gravity trench: clear a direct visual path from the camera to the card.
  float waveDz = (waveBz - 14.0) - uFocus.y;
  float waveAbsDz = abs(waveDz);
  if (waveAbsDz < 2.4) {
    float waveMaxDxAtZ = sqrt(5.76 - waveAbsDz * waveAbsDz) / 0.48;
    float waveDx = waveBx - uFocus.x;
    float waveAbsDx = abs(waveDx);

    if (waveAbsDx < waveMaxDxAtZ) {
      float waveRepelForce = 1.0 - (waveAbsDx / waveMaxDxAtZ);
      float waveEaseForce = pow(waveRepelForce, 0.35);
      float wavePushDist = (waveMaxDxAtZ - waveAbsDx) * waveEaseForce;
      float waveDirX = waveDx >= 0.0 ? 1.0 : -1.0;

      waveFinalX += waveDirX * wavePushDist;
      waveY -= waveEaseForce * 1.2;
    }
  }

  // Interactive mouse distortion (squared-distance early bailout).
  float waveDxm = waveFinalX - uMouse.x;
  float waveDzm = waveBz - uMouse.y;
  float waveDistSqMouse = waveDxm * waveDxm + waveDzm * waveDzm;
  if (waveDistSqMouse < 4.84) {
    float waveDistToMouse = sqrt(waveDistSqMouse);
    float waveForce = (1.0 - (waveDistToMouse / 2.2)) * 0.65;
    waveY += sin(waveDistToMouse * 3.5 - uTime * 4.0) * waveForce * 0.4;
  }

  transformed = vec3(waveFinalX, waveY, waveBz);
`;

export default function ParticleWave(): React.JSX.Element {
  const { camera } = useThree();
  const pointsRef = useRef<Points>(null);
  const materialRef = useRef<PointsMaterial>(null);
  const mouse = useRef({ x: 0, y: 0 });
  const isDark = useThemeObserver();
  const color = useMemo((): string => (isDark ? "#fafafa" : "#0e0e0e"), [isDark]);

  const countX = 65;
  const countZ = 240;
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

  // Static grid. The wave displacement now happens in the vertex shader, so
  // this buffer is uploaded once and never touched again.
  const positions = useMemo(() => {
    const arr = new Float32Array(countX * countZ * 3);
    for (let i = 0; i < countX; i++) {
      for (let j = 0; j < countZ; j++) {
        const idx = (i * countZ + j) * 3;
        arr[idx] = i * spacing - offsetX;
        arr[idx + 1] = 0;
        arr[idx + 2] = j * spacing - offsetZ;
      }
    }
    return arr;
  }, [countX, countZ, spacing, offsetX, offsetZ]);

  useLayoutEffect(() => {
    const material = materialRef.current;
    if (!material) return;

    material.onBeforeCompile = (shader) => {
      shader.uniforms.uTime = { value: 0 };
      shader.uniforms.uFocus = { value: new Vector2(0, 0) };
      shader.uniforms.uMouse = { value: new Vector2(0, 0) };

      shader.vertexShader = `
        uniform float uTime;
        uniform vec2 uFocus;
        uniform vec2 uMouse;
      ` + shader.vertexShader;

      shader.vertexShader = shader.vertexShader.replace(
        "#include <begin_vertex>",
        `#include <begin_vertex>\n${WAVE_VERTEX_INJECTION}`
      );

      material.userData.shader = shader;
    };

    // Keep one compiled program for every instance/theme.
    material.customProgramCacheKey = () => "particle-wave-v1";
    material.needsUpdate = true;
  }, []);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();

    const progress = scrollProgress;
    const activeIndex = Math.max(
      0,
      Math.min(POD_COORDINATES.length - 2, Math.floor(progress))
    );
    const scrollT = progress - activeIndex;
    const easeT =
      scrollT < 0.5
        ? 2 * scrollT * scrollT
        : 1 - Math.pow(-2 * scrollT + 2, 2) / 2;

    _waveFocus.lerpVectors(
      POD_COORDINATES[activeIndex],
      POD_COORDINATES[activeIndex + 1],
      easeT
    );

    const shader = materialRef.current?.userData.shader as
      | {
          uniforms: {
            uTime: { value: number };
            uFocus: { value: Vector2 };
            uMouse: { value: Vector2 };
          };
        }
      | undefined;

    if (shader) {
      // R3F shader uniforms are intentionally mutable every frame.
      // eslint-disable-next-line react-hooks/immutability
      shader.uniforms.uTime.value = t;
      shader.uniforms.uFocus.value.set(_waveFocus.x, _waveFocus.z);
    }

    if (pointsRef.current && shader) {
      // Gentle idle tilt for organic feel. The camera creates the travel.
      const points = pointsRef.current;
      points.rotation.x = 0.15 + Math.sin(t * 0.15) * 0.04;
      points.rotation.z = Math.cos(t * 0.1) * 0.03;
      points.updateMatrixWorld();

      // Project the pointer onto the wave's local y=0 plane instead of using
      // a naive NDC-to-local mapping. This keeps the ripple under the cursor
      // regardless of camera distance or the wave's rotation.
      _waveNormal.set(0, 1, 0).applyQuaternion(points.quaternion);
      _wavePlane.setFromNormalAndCoplanarPoint(_waveNormal, points.position);

      camera.updateMatrixWorld();
      _pointerNdc.set(mouse.current.x, mouse.current.y);
      _waveRaycaster.setFromCamera(_pointerNdc, camera);

      if (_waveRaycaster.ray.intersectPlane(_wavePlane, _waveHit)) {
        points.worldToLocal(_waveHit);
        shader.uniforms.uMouse.value.set(_waveHit.x, _waveHit.z);
      }
    }
  });

  return (
    <points ref={pointsRef} position={[0, -0.6, -14]}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial
        ref={materialRef}
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
