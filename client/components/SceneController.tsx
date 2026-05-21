"use client";

import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// The wildly scattered physical locations of the 6 pods
export const POD_COORDINATES = [
  new THREE.Vector3(0, 0.5, 0),         // Home: Center, floating normally
  new THREE.Vector3(4.0, 2.0, -5.5),    // About: Far Right, High up
  new THREE.Vector3(-4.5, 3.2, -11.0),  // Works: Far Left, Very High up
  new THREE.Vector3(3.8, 3.6, -16.5),   // Experience: Right, High up
  new THREE.Vector3(-4.2, 4.0, -22.0),  // Services: Left, High up
  new THREE.Vector3(4.5, 4.4, -27.5),   // Contact: Far Right, High up
];

export default function SceneController(): null {
  const { camera } = useThree();

  useFrame(() => {
    // Read the scroll progress from document style property (0 to 4)
    const progressStr = document.documentElement.style.getPropertyValue("--scroll-progress");
    const progress = progressStr ? parseFloat(progressStr) : 0;

    const index = Math.max(0, Math.min(POD_COORDINATES.length - 2, Math.floor(progress)));
    const t = progress - index;
    // Smooth ease-in-out interpolation factor
    const easeT = t < 0.5 ? 2 * t * t : 1 - Math.pow(-2 * t + 2, 2) / 2;

    const startPod = POD_COORDINATES[index];
    const endPod = POD_COORDINATES[index + 1];

    // Interpolate current pod focus
    const currentFocus = new THREE.Vector3().lerpVectors(startPod, endPod, easeT);

    // Camera stands much further back (Z + 4.8) to frame the card elegantly and show the background
    const targetCameraPos = new THREE.Vector3(
      currentFocus.x,
      currentFocus.y,
      currentFocus.z + 4.8
    );

    // Smoothly damp the camera position towards the target
    camera.position.lerp(targetCameraPos, 0.08);

    // Make the camera look at the current focus point
    camera.lookAt(currentFocus);
  });

  return null;
}
