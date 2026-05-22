import React from "react";

export default function PlaceholderSvg(): React.JSX.Element {
  return (
    <svg
      width="100%"
      height="100%"
      viewBox="0 0 200 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ opacity: 0.8, maxWidth: "320px" }}
    >
      <defs>
        <radialGradient id="glow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="var(--foreground)" stopOpacity="0.08" />
          <stop offset="100%" stopColor="var(--foreground)" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background blueprint grid lines */}
      <line x1="0" y1="20" x2="200" y2="20" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="40" x2="200" y2="40" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="60" x2="200" y2="60" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="80" x2="200" y2="80" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="0" y1="100" x2="200" y2="100" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="40" y1="0" x2="40" y2="120" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="80" y1="0" x2="80" y2="120" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="120" y1="0" x2="120" y2="120" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />
      <line x1="160" y1="0" x2="160" y2="120" stroke="var(--foreground)" strokeOpacity="0.04" strokeWidth="0.5" />

      {/* Calming glow circle */}
      <circle cx="100" cy="60" r="35" fill="url(#glow)" />

      {/* Outer concentric tech circles */}
      <circle cx="100" cy="60" r="40" fill="none" stroke="var(--foreground)" strokeOpacity="0.12" strokeWidth="1" strokeDasharray="3 3" />
      <circle cx="100" cy="60" r="46" fill="none" stroke="var(--foreground)" strokeOpacity="0.06" strokeWidth="0.5" />

      {/* Technical crosshair ticks */}
      <line x1="100" y1="14" x2="100" y2="18" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="100" y1="102" x2="100" y2="106" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="54" y1="60" x2="58" y2="60" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="1" />
      <line x1="142" y1="60" x2="146" y2="60" stroke="var(--foreground)" strokeOpacity="0.25" strokeWidth="1" />

      {/* Minimalist flat hammer illustration rotated 45deg */}
      <g transform="translate(100, 60) rotate(45)">
        {/* Hammer Handle */}
        <rect x="-2.5" y="0" width="5" height="32" rx="2" fill="var(--foreground)" fillOpacity="0.45" />
        <rect x="-2.5" y="18" width="5" height="14" rx="1.5" fill="var(--foreground)" fillOpacity="0.75" />
        
        {/* Hammer Head Connection Collar */}
        <rect x="-3.5" y="-2" width="7" height="3" fill="var(--foreground)" fillOpacity="0.65" />

        {/* Hammer Head Main Body */}
        <rect x="-10" y="-11" width="20" height="9" rx="1.5" fill="var(--foreground)" fillOpacity="0.85" />
        
        {/* Claw curve (Left) */}
        <path d="M-10 -11 C-15 -11 -18 -8 -20 -3 L-15 -3 C-13 -7 -10 -7 -10 -7 Z" fill="var(--foreground)" fillOpacity="0.85" />
        
        {/* Striking Face (Right) */}
        <rect x="10" y="-9.5" width="3" height="6" rx="0.5" fill="var(--foreground)" fillOpacity="0.95" />
        <rect x="7" y="-8.5" width="4" height="4" fill="var(--foreground)" fillOpacity="0.85" />
      </g>
    </svg>
  );
}
