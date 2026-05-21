import React from "react";

export interface Project {
  id: number;
  title: string;
  description: string;
  techStack: string[];
  images: string[];
  linkGithub: string;
  linkDemo: string;
  category?: string;
  year?: string;
  num?: string;
  role?: string;
  overview?: string;
  challenges?: string[];
  solutions?: string[];
}

export interface Experience {
  id: number;
  title: string;
  company: string;
  description: string;
  techStack: string[];
  images: string[];
  linkGithub?: string;
  linkDemo?: string;
  category?: string;
  year?: string;
  num?: string;
  role?: string;
  overview?: string;
  challenges?: string[];
  solutions?: string[];
}

export interface SlideSection3DProps {
  children: React.ReactNode;
  id: string;
  index: number;
}

export interface Coordinate3D {
  x: number;
  y: number;
  z: number;
  ry: number;
}

export interface CameraTransform {
  x: number;
  y: number;
  z: number;
  ry: number;
}

export interface GlassPod3DProps {
  isActive: boolean;
  isDark: boolean;
  index: number;
}

