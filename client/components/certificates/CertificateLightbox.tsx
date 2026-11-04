"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Certificate } from "../../types/portfolio.types";

interface CertificateLightboxProps {
  certificate: Certificate | null;
  onClose: () => void;
}

export default function CertificateLightbox({
  certificate,
  onClose
}: CertificateLightboxProps): React.JSX.Element {
  const [failedId, setFailedId] = useState<number | null>(null);
  const showImage = Boolean(certificate?.image) && failedId !== certificate?.id;

  useEffect(() => {
    if (!certificate) return;

    const onKeyDown = (event: KeyboardEvent): void => {
      if (event.key === "Escape") onClose();
    };

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", onKeyDown);
    };
  }, [certificate, onClose]);

  return (
    <AnimatePresence>
      {certificate && (
        <motion.div
          className="cert-lightbox-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          role="dialog"
          aria-modal="true"
          aria-label={`${certificate.title} credential`}
        >
          <motion.div
            className="cert-lightbox-panel"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 12, scale: 0.98 }}
            transition={{ duration: 0.28, ease: [0.25, 1, 0.5, 1] }}
            onClick={(event) => event.stopPropagation()}
          >
            <div className="cert-lightbox-head">
              <div className="cert-lightbox-heading">
                <span className="detail-caption">Credential document</span>
                <h3>{certificate.title}</h3>
                <span className="cert-lightbox-meta">
                  {certificate.issuer} · {certificate.year}
                </span>
              </div>

              <button
                type="button"
                className="cert-lightbox-close cursor-target"
                data-cursor="CLOSE"
                onClick={onClose}
                aria-label="Close credential document"
              >
                ✕
              </button>
            </div>

            <div className="cert-lightbox-figure">
              {showImage ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={certificate.image}
                  alt={`${certificate.title} certificate`}
                  onError={() => setFailedId(certificate.id)}
                />
              ) : (
                <div className="cert-lightbox-empty">
                  <span className="detail-caption">DOCUMENT PENDING</span>
                  <p>The credential scan for this certificate will be available shortly.</p>
                </div>
              )}
            </div>

            <div className="cert-lightbox-foot">
              <div className="cert-lightbox-ids">
                {certificate.credentialId && (
                  <span className="meta-item">
                    <span className="meta-label">Credential ID</span>
                    <span className="meta-value">{certificate.credentialId}</span>
                  </span>
                )}
                {certificate.validUntil && (
                  <span className="meta-item">
                    <span className="meta-label">Validity</span>
                    <span className="meta-value">{certificate.validUntil}</span>
                  </span>
                )}
              </div>

              {certificate.credentialUrl && (
                <a
                  href={certificate.credentialUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="cert-lightbox-verify cursor-target"
                  data-cursor="VERIFY"
                >
                  VERIFY CREDENTIAL ↗
                </a>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
