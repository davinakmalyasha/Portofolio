"use client";

import React, { useEffect, useRef } from "react";
import OrbitCursor from "./OrbitCursor";
import type { Point } from "./types";
import "./target-cursor.css";

function resolveLabel(target: HTMLElement): string {
  const explicit = target.getAttribute("data-cursor");
  if (explicit) return explicit;

  if (target.matches("a[href^='mailto:']")) return "MAIL";
  if (target.matches("a[href]")) return "VISIT";
  if (target.matches("button")) return "OPEN";
  return "OPEN";
}

export default function TargetCursor(): React.JSX.Element {
  const pointer = useRef<Point>({ x: 0, y: 0 });
  const visible = useRef<boolean>(false);
  const hovered = useRef<HTMLElement | null>(null);
  const native = useRef<boolean>(false);
  const reduced = useRef<boolean>(false);
  const labelSize = useRef({ width: 0, height: 0 });
  const labelRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    reduced.current = query.matches;

    const onChange = (event: MediaQueryListEvent): void => {
      reduced.current = event.matches;
    };
    query.addEventListener("change", onChange);
    return () => query.removeEventListener("change", onChange);
  }, []);

  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches) return;

    document.body.classList.add("custom-cursor-active");

    const positionLabel = (): void => {
      const label = labelRef.current;
      if (!label || !visible.current || native.current || !hovered.current) return;

      const { width, height } = labelSize.current;
      let x = pointer.current.x + 16;
      let y = pointer.current.y + 20;

      if (x + width > window.innerWidth - 10) {
        x = pointer.current.x - width - 16;
      }
      if (y + height > window.innerHeight - 10) {
        y = pointer.current.y - height - 20;
      }

      label.style.transform = `translate3d(${Math.max(10, x)}px, ${Math.max(10, y)}px, 0)`;
    };

    const showLabel = (text: string): void => {
      const label = labelRef.current;
      if (!label) return;
      label.textContent = text;
      label.classList.add("is-visible");
      labelSize.current = { width: label.offsetWidth, height: label.offsetHeight };
      positionLabel();
    };

    const hideLabel = (): void => {
      labelRef.current?.classList.remove("is-visible");
    };

    const onPointerMove = (event: PointerEvent): void => {
      pointer.current.x = event.clientX;
      pointer.current.y = event.clientY;

      if (!visible.current) {
        visible.current = true;
        if (hovered.current) labelRef.current?.classList.add("is-visible");
      }
      positionLabel();
    };

    const onPointerOver = (event: PointerEvent): void => {
      const rawTarget = event.target as HTMLElement | null;

      if (rawTarget?.closest("input, textarea, select, [contenteditable='true']")) {
        native.current = true;
        hovered.current = null;
        hideLabel();
        return;
      }

      native.current = false;
      const target = rawTarget?.closest<HTMLElement>(".cursor-target") ?? null;

      if (!target) {
        if (hovered.current) {
          hovered.current = null;
          hideLabel();
        }
        return;
      }

      if (hovered.current === target) return;
      hovered.current = target;
      showLabel(resolveLabel(target));
    };

    const onPointerOut = (event: PointerEvent): void => {
      const active = hovered.current;
      if (!active) return;

      const next = event.relatedTarget as Node | null;
      if (next && active.contains(next)) return;

      hovered.current = null;
      native.current = false;
      hideLabel();
    };

    const onMouseLeave = (): void => {
      visible.current = false;
      hideLabel();
    };

    const onMouseEnter = (): void => {
      if (!native.current) visible.current = true;
    };

    window.addEventListener("pointermove", onPointerMove, { passive: true });
    document.addEventListener("pointerover", onPointerOver, { passive: true });
    document.addEventListener("pointerout", onPointerOut, { passive: true });
    document.addEventListener("mouseleave", onMouseLeave);
    document.addEventListener("mouseenter", onMouseEnter);

    return () => {
      document.body.classList.remove("custom-cursor-active");
      window.removeEventListener("pointermove", onPointerMove);
      document.removeEventListener("pointerover", onPointerOver);
      document.removeEventListener("pointerout", onPointerOut);
      document.removeEventListener("mouseleave", onMouseLeave);
      document.removeEventListener("mouseenter", onMouseEnter);
    };
  }, []);

  return (
    <>
      <div className="target-cursor-root" aria-hidden="true">
        <OrbitCursor
          pointer={pointer}
          visible={visible}
          hovered={hovered}
          native={native}
          reduced={reduced}
        />
      </div>
      <div ref={labelRef} className="target-cursor-label" aria-hidden="true" />
    </>
  );
}
