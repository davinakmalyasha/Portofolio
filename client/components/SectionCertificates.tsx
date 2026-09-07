"use client";

import React, { memo } from "react";
import SlideSection3D from "./SlideSection3D";
import { CERTIFICATES_DATA } from "../data/certificates";

const SectionCertificates = memo(function SectionCertificates(): React.JSX.Element {
  return (
    <SlideSection3D id="certificates" index={5}>
      <div className="section-title-wrap">
        <h2>CERTIFICATES</h2>
        <span>Verified Credentials</span>
      </div>

      <div className="certificates-slide-layout">
        {CERTIFICATES_DATA.map((cert) => (
          <article key={cert.id} className="certificate-card">
            <div className="tech-corner tech-top-left" style={{ top: "6px", left: "6px" }} />
            <div className="tech-corner tech-top-right" style={{ top: "6px", right: "6px" }} />
            <div className="tech-corner tech-bottom-left" style={{ bottom: "6px", left: "6px" }} />
            <div className="tech-corner tech-bottom-right" style={{ bottom: "6px", right: "6px" }} />

            <div className="certificate-card-header">
              <span className="certificate-category">[ {cert.category ?? "CERTIFIED"} ]</span>
              <span className="certificate-year">{cert.year}</span>
            </div>

            <h3 className="certificate-title">{cert.title}</h3>
            <span className="certificate-issuer">{cert.issuer}</span>
            <p className="certificate-description">{cert.description}</p>

            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="certificate-link cursor-target"
              >
                VERIFY CREDENTIAL ↗
              </a>
            )}
          </article>
        ))}
      </div>
    </SlideSection3D>
  );
});

export default SectionCertificates;
