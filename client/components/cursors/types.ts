import type { RefObject } from "react";

export interface Point {
  x: number;
  y: number;
}

export interface CursorVariantProps {
  pointer: RefObject<Point>;
  visible: RefObject<boolean>;
  hovered: RefObject<HTMLElement | null>;
  native: RefObject<boolean>;
  reduced: RefObject<boolean>;
}
