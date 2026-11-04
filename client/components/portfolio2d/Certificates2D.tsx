"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { CERTIFICATES_DATA } from "../../data/certificates";
import { Certificate } from "../../types/portfolio.types";
import CertificateLightbox from "../certificates/CertificateLightbox";
import CertificateThumb from "../certificates/CertificateThumb";

export default function Certificates2D(): React.JSX.Element {
  const [active, setActive] = useState<Certificate | null>(null);

  return (
    <section id="certificates" className="p2d-section p2d-certificates">
      <div className="p2d-head">
        <span className="p2d-head-index">(05)</span>
        <h2 className="p2d-head-title">Certificates</h2>
        <span className="p2d-head-meta">VERIFIED CREDENTIALS</span>
        <span className="p2d-head-rule" />
      </div>

      <div className="p2d-cert-list">
        {CERTIFICATES_DATA.map((cert, i) => (
          <motion.article
            key={cert.id}
            className="p2d-cert-row cursor-target"
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
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <span className="p2d-cert-index">{String(cert.id).padStart(2, "0")}</span>
            <span className="p2d-cert-tag">[ {cert.category ?? "CERTIFIED"} ]</span>

            {cert.image && (
              <CertificateThumb src={cert.image} title={cert.title} className="p2d-cert-thumb" />
            )}

            <div className="p2d-cert-body">
              <h3 className="p2d-cert-title">{cert.title}</h3>
              <p className="p2d-cert-desc">{cert.description}</p>
            </div>

            <div className="p2d-cert-meta">
              <span className="p2d-cert-issuer">{cert.issuer}</span>
              <span className="p2d-cert-year">{cert.year}</span>
            </div>

            {cert.credentialUrl ? (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p2d-cert-link cursor-target"
                data-cursor="VERIFY"
                aria-label={`Verify ${cert.title} credential`}
                onClick={(event) => event.stopPropagation()}
              >
                VERIFY ↗
              </a>
            ) : (
              <span className="p2d-cert-link p2d-cert-link--muted">ON FILE</span>
            )}
          </motion.article>
        ))}
      </div>

      <CertificateLightbox certificate={active} onClose={() => setActive(null)} />
    </section>
  );
}
