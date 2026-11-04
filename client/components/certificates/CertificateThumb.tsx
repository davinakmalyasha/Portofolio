"use client";

import React, { useState } from "react";

interface CertificateThumbProps {
  src?: string;
  title: string;
  className?: string;
}

export default function CertificateThumb({
  src,
  title,
  className = "certificate-thumb"
}: CertificateThumbProps): React.JSX.Element {
  const [failed, setFailed] = useState(false);

  if (!src || failed) {
    const mark = title
      .replace(/[^A-Za-z0-9 ]/g, " ")
      .split(/\s+/)
      .filter(Boolean)[0]
      ?.slice(0, 4)
      .toUpperCase();

    return (
      <div className={`${className} ${className}--empty`} aria-hidden="true">
        <span className="certificate-thumb-mark">{mark ?? "DOC"}</span>
        <span className="certificate-thumb-caption">SCAN PENDING</span>
      </div>
    );
  }

  return (
    <div className={className}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={`${title} certificate preview`}
        loading="lazy"
        onError={() => setFailed(true)}
      />
    </div>
  );
}
