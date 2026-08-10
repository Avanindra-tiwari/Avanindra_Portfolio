import React from "react";
import { motion } from "framer-motion";
import { Award, ExternalLink } from "lucide-react";
import { certifications } from "../data/portfolioData";

function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.15 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export default function Certifications() {
  return (
    <section id="certifications" className="section section-alt">
      <div className="container">
        <Reveal><p className="section-label">06 — CERTIFICATIONS</p></Reveal>

        <div className="section-heading">
          <Reveal>
            <h2>Verified<br /><span>credentials.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>Professional certifications validating expertise in web development, data science, and business intelligence.</p>
          </Reveal>
        </div>

        <div className="cert-grid">
          {certifications.map((cert, i) => (
            <Reveal key={cert.title} delay={i * 0.1}>
              <motion.div className="cert-card" whileHover={{ y: -6 }}>
                <div className="cert-icon">
                  <Award size={22} />
                </div>

                <div className="cert-body">
                  <h4>{cert.title}</h4>
                  <p className="cert-org">{cert.organization}</p>
                  <p className="cert-date">{cert.date}</p>
                </div>

                {cert.credentialUrl && cert.credentialUrl !== "#" && (
                  <motion.a
                    className="cert-credential-btn"
                    href={cert.credentialUrl}
                    target="_blank"
                    rel="noreferrer"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    View Credential <ExternalLink size={13} />
                  </motion.a>
                )}
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
