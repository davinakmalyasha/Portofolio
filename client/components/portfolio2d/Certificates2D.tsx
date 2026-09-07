"use client";

import React from "react";
import { motion } from "framer-motion";
import { CERTIFICATES_DATA } from "../../data/certificates";

export default function Certificates2D(): React.JSX.Element {
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
            className="p2d-cert-row"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: i * 0.05 }}
          >
            <span className="p2d-cert-index">{String(cert.id).padStart(2, "0")}</span>
            <span className="p2d-cert-tag">[ {cert.category ?? "CERTIFIED"} ]</span>

            <div className="p2d-cert-body">
              <h3 className="p2d-cert-title">{cert.title}</h3>
              <p className="p2d-cert-desc">{cert.description}</p>
            </div>

            <div className="p2d-cert-meta">
              <span className="p2d-cert-issuer">{cert.issuer}</span>
              <span className="p2d-cert-year">{cert.year}</span>
            </div>

            {cert.credentialUrl && (
              <a
                href={cert.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="p2d-cert-link cursor-target"
                aria-label={`Verify ${cert.title} credential`}
              >
                VERIFY ↗
              </a>
            )}
          </motion.article>
        ))}
      </div>
    </section>
  );
}
