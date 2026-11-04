"use client";

import { useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import { CatmullRomCurve3, MathUtils, PerspectiveCamera, Vector3 } from "three";
import { scrollProgress } from "../hooks/scrollProgress";

// The wildly scattered physical locations of the 7 pods
export const POD_COORDINATES = [
  new Vector3(0, 0.5, 0),          // Home: Center, floating normally
  new Vector3(4.5, 2.0, -7.0),     // About: Right, higher
  new Vector3(-5.0, 3.2, -14.0),   // Works: Left, higher
  new Vector3(4.8, 3.6, -21.0),    // Experience: Right, higher
  new Vector3(-5.2, 4.0, -28.0),   // GitHub: Left, higher
  new Vector3(5.0, 4.6, -35.0),    // Certificates: Right, higher
  new Vector3(-5.2, 5.2, -42.0),   // Contact: Left, lifted above the wave
];

// A gentle arc between pods instead of dead-straight segments. Centripetal
// Catmull-Rom still passes exactly through every pod coordinate, so the
// resting framing at each section is unchanged.
const CAMERA_PATH = new CatmullRomCurve3(POD_COORDINATES, false, "centripetal");

const BASE_FOV = 60;
const CAMERA_BACK = 4.8;
const MAX_EXTRA_FOV = 4;
const MAX_ROLL = 0.022;

// Cached instances reused every frame to avoid GC pressure.
const _focus = new Vector3();
const _targetCameraPos = new Vector3();
const _lookTarget = new Vector3(POD_COORDINATES[0].x, POD_COORDINATES[0].y, POD_COORDINATES[0].z);
const _previousFocus = new Vector3(POD_COORDINATES[0].x, POD_COORDINATES[0].y, POD_COORDINATES[0].z);
const _desiredUp = new Vector3(0, 1, 0);

export default function SceneController(): null {
  const { camera } = useThree();
  const previousProgress = useRef<number>(0);
  const smoothedSpeed = useRef<number>(0);
  const smoothedRoll = useRef<number>(0);

  // R3F camera objects are intentionally mutable by design.
  // eslint-disable-next-line react-hooks/immutability
  useFrame((_, delta) => {
    // Clamp delta so a background tab does not slingshot the camera on return.
    const dt = Math.min(delta, 0.05);
    const progress = MathUtils.clamp(scrollProgress, 0, POD_COORDINATES.length - 1);
    const pathT = progress / (POD_COORDINATES.length - 1);

    CAMERA_PATH.getPoint(pathT, _focus);
    _targetCameraPos.set(_focus.x, _focus.y, _focus.z + CAMERA_BACK);

    // Frame-rate independent damping (the old fixed 0.08 lerp was tuned for 60fps)
    const positionAlpha = 1 - Math.exp(-6 * dt);
    camera.position.lerp(_targetCameraPos, positionAlpha);
    if (camera.position.distanceToSquared(_targetCameraPos) < 1e-8) {
      camera.position.copy(_targetCameraPos);
    }

    // A softer look-target keeps turns smooth without delaying the framing.
    _lookTarget.lerp(_focus, 1 - Math.exp(-10 * dt));

    // Scroll speed drives a subtle FOV stretch; it eases back to 60 at rest.
    const instantSpeed = Math.abs(progress - previousProgress.current) / Math.max(dt, 1e-4);
    smoothedSpeed.current = MathUtils.lerp(
      smoothedSpeed.current,
      instantSpeed,
      1 - Math.exp(-10 * dt)
    );

    if (camera instanceof PerspectiveCamera) {
      const targetFov = BASE_FOV + Math.min(MAX_EXTRA_FOV, smoothedSpeed.current * 1.6);
      const nextFov = MathUtils.lerp(camera.fov, targetFov, 1 - Math.exp(-5 * dt));
      if (Math.abs(nextFov - camera.fov) > 0.002) {
        // eslint-disable-next-line react-hooks/immutability
        camera.fov = nextFov;
        camera.updateProjectionMatrix();
      }
    }

    // Bank very slightly into lateral motion; at rest the horizon is level again.
    const lateralSpeed = (_focus.x - _previousFocus.x) / Math.max(dt, 1e-4);
    const targetRoll = MathUtils.clamp(-lateralSpeed * 0.012, -MAX_ROLL, MAX_ROLL);
    smoothedRoll.current = MathUtils.lerp(
      smoothedRoll.current,
      targetRoll,
      1 - Math.exp(-8 * dt)
    );
    _desiredUp.set(Math.sin(smoothedRoll.current), Math.cos(smoothedRoll.current), 0);
    camera.up.lerp(_desiredUp, 1 - Math.exp(-10 * dt)).normalize();

    camera.lookAt(_lookTarget);

    previousProgress.current = progress;
    _previousFocus.copy(_focus);
  });

  return null;
}
