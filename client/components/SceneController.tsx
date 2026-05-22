"use client";

import { useFrame, useThree } from "@react-three/fiber";
import { Vector3 } from "three";
import { scrollProgress } from "../hooks/scrollProgress";

// The wildly scattered physical locations of the 6 pods
export const POD_COORDINATES = [
  new Vector3(0, 0.5, 0),         // Home: Center, floating normally
  new Vector3(4.0, 2.0, -5.5),    // About: Far Right, High up
  new Vector3(-4.5, 3.2, -11.0),  // Works: Far Left, Very High up
  new Vector3(3.8, 3.6, -16.5),   // Experience: Right, High up
  new Vector3(-4.2, 4.0, -22.0),  // Services: Left, High up
  new Vector3(4.5, 4.4, -27.5),   // Contact: Far Right, High up
];

// Cached Vector3 instances reused every frame to avoid GC pressure (120 allocs/sec eliminated)
const _currentFocus = new Vector3();
const _targetCameraPos = new Vector3();

export default function SceneController(): null {
  const { camera } = useThree();

  useFrame(() => {
    // Read scroll progress from shared JS variable (avoids DOM read every frame)
    const progress = scrollProgress;

    const index = Math.max(0, Math.min(POD_COORDINATES.length - 2, Math.floor(progress)));
    const t = progress - index;
    // Smooth ease-in-out interpolation factor
    const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const startPod = POD_COORDINATES[index];
    const endPod = POD_COORDINATES[index + 1];

    // Interpolate current pod focus (reuse cached Vector3)
    _currentFocus.lerpVectors(startPod, endPod, easeT);

    // Camera stands much further back (Z + 4.8) to frame the card elegantly and show the background
    _targetCameraPos.set(
      _currentFocus.x,
      _currentFocus.y,
      _currentFocus.z + 4.8
    );

    // Smoothly damp the camera position towards the target
    camera.position.lerp(_targetCameraPos, 0.08);

    // Make the camera look at the current focus point
    camera.lookAt(_currentFocus);
  });

  return null;
}
