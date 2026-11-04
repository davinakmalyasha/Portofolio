import React from "react";

interface PlaceholderFigureProps {
  label?: string;
  caption?: string;
}

export default function PlaceholderFigure({
  label = "FIG",
  caption = "PREVIEW PENDING"
}: PlaceholderFigureProps): React.JSX.Element {
  return (
    <div className="ph-figure" role="img" aria-label={`${label} preview placeholder`}>
      <span className="ph-figure-mark">{label}</span>
      <span className="ph-figure-caption">{caption}</span>
    </div>
  );
}
