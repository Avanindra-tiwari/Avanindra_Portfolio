import React from "react";
import { motion } from "framer-motion";
import { Download, Eye } from "lucide-react";
import { personal } from "../data/portfolioData";

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

export default function ResumeSection() {
  return (
    <section id="resume" className="section">
      <div className="container">
        <Reveal>
          <div className="resume-card">
            <div className="resume-card-bg" />
            <div className="resume-card-content">
              <p className="section-label" style={{ margin: 0 }}>MY RESUME</p>
              <h2>Ready to collaborate<br /><span>on your next project?</span></h2>
              <p>Download my latest resume for a detailed overview of my education, technical skills, project experience, and certifications.</p>

              <div className="resume-actions">
                <motion.a
                  className="primary-btn"
                  href={personal.resume}
                  download
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Download size={18} /> Download Resume
                </motion.a>

                <motion.a
                  className="secondary-btn"
                  href={personal.resume}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Eye size={16} /> Preview Resume
                </motion.a>
              </div>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
