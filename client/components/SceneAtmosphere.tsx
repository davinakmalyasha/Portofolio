"use client";

import { useEffect } from "react";
import { useThree } from "@react-three/fiber";
import { Color, Fog } from "three";
import { useThemeObserver } from "../hooks/useThemeObserver";

const FOG_NEAR = 20;
const FOG_FAR = 46;

const fogColor = new Color();

/**
 * Adds a long, theme-matched fog so pods and particles melt into the page
 * background as they travel away from the camera. The active pod always sits
 * ~4.8 units from the camera, so its framing and contrast are untouched.
 */
export default function SceneAtmosphere(): null {
  const { scene } = useThree();
  const isDark = useThemeObserver();

  useEffect(() => {
    fogColor.set(isDark ? "#080808" : "#fcfcfc");

    if (scene.fog instanceof Fog) {
      scene.fog.color.copy(fogColor);
    } else {
      // R3F scene objects are intentionally mutable by design.
      // eslint-disable-next-line react-hooks/immutability
      scene.fog = new Fog(fogColor, FOG_NEAR, FOG_FAR);
    }
  }, [scene, isDark]);

  useEffect(() => {
    return () => {
      scene.fog = null;
    };
  }, [scene]);

  return null;
}
