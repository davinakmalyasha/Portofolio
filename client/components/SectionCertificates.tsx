"use client";

import React, { memo, useState } from "react";
import SlideSection3D from "./SlideSection3D";
import CertificateLightbox from "./certificates/CertificateLightbox";
import CertificateThumb from "./certificates/CertificateThumb";
import { CERTIFICATES_DATA } from "../data/certificates";
import { Certificate } from "../types/portfolio.types";

const SectionCertificates = memo(function SectionCertificates(): React.JSX.Element {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <SlideSection3D id="certificates" index={5}>
      <div className="section-title-wrap">
        <h2>CERTIFICATES</h2>
        <span>05 / Verified Credentials</span>
      </div>

      <div className="certificates-slide-layout">
        {CERTIFICATES_DATA.map((cert, index) => (
          <article
            key={cert.id}
            className="certificate-card cursor-target"
            data-cursor="VIEW"
            role="button"
            tabIndex={0}
            aria-label={`Open ${cert.title} credential`}
            onClick={() => setActive(cert)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                setActive(cert);
              }
            }}
          >
            <div className="tech-corner tech-top-left" style={{ top: "6px", left: "6px" }} />
            <div className="tech-corner tech-top-right" style={{ top: "6px", right: "6px" }} />
            <div className="tech-corner tech-bottom-left" style={{ bottom: "6px", left: "6px" }} />
            <div className="tech-corner tech-bottom-right" style={{ bottom: "6px", right: "6px" }} />

            <div className="certificate-card-header">
              <span className="certificate-index">FIG. {String(index + 1).padStart(2, "0")}</span>
              <span className="certificate-category">[ {cert.category ?? "CERTIFIED"} ]</span>
              <span className="certificate-year">{cert.year}</span>
            </div>

            <div className="certificate-card-main">
              <CertificateThumb src={cert.image} title={cert.title} />

              <div className="certificate-card-body">
                <h3 className="certificate-title">{cert.title}</h3>
                <span className="certificate-issuer">{cert.issuer}</span>
                <p className="certificate-description">{cert.description}</p>
              </div>
            </div>

            <div className="certificate-card-foot">
              {cert.credentialUrl ? (
                <a
                  href={cert.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="certificate-link cursor-target"
                  data-cursor="VERIFY"
                  onClick={(event) => event.stopPropagation()}
                >
                  VERIFY CREDENTIAL ↗
                </a>
              ) : (
                <span className="certificate-status">CREDENTIAL ON FILE</span>
              )}
              <span className="certificate-open-hint">OPEN DOCUMENT</span>
            </div>
          </article>
        ))}
      </div>

      <CertificateLightbox certificate={active} onClose={() => setActive(null)} />
    </SlideSection3D>
  );
});

export default SectionCertificates;
