"use client";

import React, { useEffect, useRef } from "react";
import type { Point, CursorVariantProps } from "./types";
import "./orbit-cursor.css";

const ORBIT_COUNT = 6;
const GHOSTS_PER_ORB = 2;
const FRAME_PADDING = 4;

function getFramePoints(rect: DOMRect): Point[] {
  const left = rect.left - FRAME_PADDING;
  const top = rect.top - FRAME_PADDING;
  const right = rect.right + FRAME_PADDING;
  const bottom = rect.bottom + FRAME_PADDING;
  const midX = (left + right) / 2;

  return [
    { x: left, y: top },
    { x: right, y: top },
    { x: right, y: bottom },
    { x: left, y: bottom },
    { x: midX, y: top },
    { x: midX, y: bottom },
  ];
}

export default function OrbitCursor({
  pointer,
  visible,
  hovered,
  native,
  reduced,
}: CursorVariantProps): React.JSX.Element {
  const layerRef = useRef<HTMLDivElement>(null);
  const headRef = useRef<HTMLDivElement>(null);
  const pulseRef = useRef<HTMLDivElement>(null);
  const orbRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const ghostRefs = useRef<(HTMLSpanElement | null)[]>([]);
  const head = useRef<Point>({ x: 0, y: 0 });
  const orbitCenter = useRef<Point>({ x: 0, y: 0 });
  const hoverBlend = useRef<number>(0);
  const phase = useRef<number>(0);
  const impulse = useRef<number>(0);
  const initialized = useRef<boolean>(false);
  const framePointsRef = useRef<Point[] | null>(null);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    let rafId = 0;
    let previous = performance.now();

    const onPointerDown = (): void => {
      if (reduced.current) return;
      impulse.current = 1;

      if (!pulseRef.current) return;
      const pulse = pulseRef.current;
      pulse.style.transform = `translate3d(${head.current.x}px, ${head.current.y}px, 0)`;
      pulse.animate(
        [
          { transform: `translate3d(${head.current.x}px, ${head.current.y}px, 0) scale(0.35)`, opacity: 0.4 },
          { transform: `translate3d(${head.current.x}px, ${head.current.y}px, 0) scale(2.3)`, opacity: 0 },
        ],
        { duration: 420, easing: "cubic-bezier(0.16, 1, 0.3, 1)" }
      );
    };
    window.addEventListener("pointerdown", onPointerDown, { passive: true });

    const tick = (now: number): void => {
      const dt = Math.min(0.05, Math.max(0.001, (now - previous) / 1000));
      previous = now;

      const layer = layerRef.current;
      const headEl = headRef.current;
      if (!layer || !headEl) {
        rafId = requestAnimationFrame(tick);
        return;
      }

      if (!visible.current || native.current) {
        layer.style.opacity = "0";
        rafId = requestAnimationFrame(tick);
        return;
      }

      layer.style.opacity = "1";
      const target = pointer.current;
      const ease = (current: number, value: number, speed: number): number =>
        current + (value - current) * (1 - Math.exp(-speed * dt));
      const lerp = (from: number, to: number, amount: number): number =>
        from + (to - from) * amount;

      if (!initialized.current) {
        head.current = { x: target.x, y: target.y };
        orbitCenter.current = { x: target.x, y: target.y };
        initialized.current = true;
      }

      head.current.x = reduced.current ? target.x : ease(head.current.x, target.x, 42);
      head.current.y = reduced.current ? target.y : ease(head.current.y, target.y, 42);

      // The cluster trails the head slightly; the head itself stays under the pointer.
      orbitCenter.current.x = reduced.current
        ? head.current.x
        : ease(orbitCenter.current.x, head.current.x, 11);
      orbitCenter.current.y = reduced.current
        ? head.current.y
        : ease(orbitCenter.current.y, head.current.y, 11);

      const isHovering = Boolean(hovered.current);
      hoverBlend.current = ease(hoverBlend.current, isHovering ? 1 : 0, 7);
      const blend = hoverBlend.current;

      // Ease the orbital speed instead of snapping it on hover.
      phase.current += dt * (1 - 0.65 * blend);
      impulse.current *= Math.exp(-5.5 * dt);

      headEl.style.transform = `translate3d(${head.current.x}px, ${head.current.y}px, 0)`;

      const baseRadius = reduced.current
        ? 0
        : lerp(24, 11, blend) + impulse.current * 12;
      const baseOpacity = reduced.current ? 0 : lerp(0.9, 1, blend);
      const activeTarget = hovered.current;

      // Keep the last frame while the blend eases back out, so leaving a
      // target is a transition instead of an instant snap.
      if (activeTarget) {
        framePointsRef.current = getFramePoints(
          activeTarget.getBoundingClientRect()
        );
      }
      const framePoints =
        activeTarget || blend > 0.01 ? framePointsRef.current : null;
      if (!activeTarget && blend < 0.01) {
        framePointsRef.current = null;
      }

      const orbAngles: number[] = [];

      orbRefs.current.forEach((el, index) => {
        if (!el) return;

        const speed = 0.8 + (index % 4) * 0.12;
        const angle =
          phase.current * speed + index * ((Math.PI * 2) / ORBIT_COUNT);
        orbAngles[index] = angle;

        const breathing = Math.sin(now * 0.0007 + index * 1.7) * 1.5 * (1 - blend);
        const radius =
          baseRadius + breathing + (1 - blend) * ((index % 3) * 4.5);
        const orbitX = orbitCenter.current.x + Math.cos(angle) * radius;
        const orbitY = orbitCenter.current.y + Math.sin(angle) * radius * 0.82;
        const framePoint = framePoints?.[index];

        const x = framePoint ? orbitX + (framePoint.x - orbitX) * blend : orbitX;
        const y = framePoint ? orbitY + (framePoint.y - orbitY) * blend : orbitY;

        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${1 + blend * 0.35})`;
        el.style.opacity = String(baseOpacity);
      });

      ghostRefs.current.forEach((el, index) => {
        if (!el) return;

        const orbIndex = Math.floor(index / GHOSTS_PER_ORB);
        const ghostIndex = index % GHOSTS_PER_ORB;
        const angle =
          (orbAngles[orbIndex] ?? 0) - (ghostIndex + 1) * (0.2 + blend * 0.12);
        const radius =
          baseRadius +
          (1 - blend) * ((orbIndex % 3) * 4.5) +
          (ghostIndex + 1) * 1.4;
        const x = orbitCenter.current.x + Math.cos(angle) * radius;
        const y = orbitCenter.current.y + Math.sin(angle) * radius * 0.82;
        const scale = 0.82 - ghostIndex * 0.2;
        const opacity =
          baseOpacity * (ghostIndex === 0 ? 0.34 : 0.17) * (1 - blend);

        el.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%) scale(${scale})`;
        el.style.opacity = String(Math.max(0, opacity));
      });

      rafId = requestAnimationFrame(tick);
    };

    rafId = requestAnimationFrame(tick);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("pointerdown", onPointerDown);
    };
  }, [pointer, visible, hovered, native, reduced]);

  return (
    <div ref={layerRef} className="orbit-layer">
      {Array.from({ length: ORBIT_COUNT * GHOSTS_PER_ORB }).map((_, index) => (
        <span
          key={`ghost-${index}`}
          ref={(el) => {
            ghostRefs.current[index] = el;
          }}
          className="orbit-ghost"
        />
      ))}
      {Array.from({ length: ORBIT_COUNT }).map((_, index) => (
        <span
          key={`orb-${index}`}
          ref={(el) => {
            orbRefs.current[index] = el;
          }}
          className="orbit-orb"
        />
      ))}
      <div ref={headRef} className="orbit-head" />
      <div ref={pulseRef} className="orbit-pulse" />
    </div>
  );
}
