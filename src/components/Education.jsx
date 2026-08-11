import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, GraduationCap, Star } from "lucide-react";
import { educationTimeline } from "../data/portfolioData";

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <motion.p
          className="section-label"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
        >
          05 — EDUCATION
        </motion.p>

        <div className="section-heading">
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2>
              Academic<br />
              <span>foundation.</span>
            </h2>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, y: 28 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.65, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p>Building engineering fundamentals through structured learning in computer science and software development.</p>
          </motion.div>
        </div>

        {/* Timeline container */}
        <div className="education-timeline">
          {/* Animated line that draws downward */}
          <motion.div
            className="timeline-track-line"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={{ once: true, amount: 0.1 }}
            style={{ transformOrigin: "top center" }}
            transition={{ duration: 1.4, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          />

          {educationTimeline.map((edu, i) => (
            <motion.div
              key={i}
              className="education-card"
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{ duration: 0.65, delay: i * 0.15 + 0.35, ease: [0.22, 1, 0.36, 1] }}
              whileHover={{ y: -4 }}
            >
              <motion.div
                className="edu-timeline-dot"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ type: "spring", stiffness: 300, damping: 18, delay: i * 0.15 + 0.5 }}
              >
                <GraduationCap size={20} />
              </motion.div>

              <div className="edu-content">
                <div className="edu-top">
                  <div className="edu-badge">
                    {edu.status === "In Progress" ? (
                      <span className="badge-active">IN PROGRESS</span>
                    ) : (
                      <span className="badge-done">COMPLETED</span>
                    )}
                  </div>
                  <div className="edu-year">
                    <Calendar size={14} /> {edu.year}
                  </div>
                </div>

                <motion.h3
                  className="edu-degree"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.6, duration: 0.45 }}
                >
                  {edu.degree}
                </motion.h3>

                <motion.p
                  className="edu-college"
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.15 + 0.7, duration: 0.4 }}
                >
                  <BookOpen size={15} /> {edu.college}
                </motion.p>

                {edu.cgpa && (
                  <div className="edu-details-row">
                    <div className="edu-detail-pill">
                      <Star size={14} /> CGPA: {edu.cgpa}
                    </div>
                  </div>
                )}

                <p className="edu-description">{edu.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
