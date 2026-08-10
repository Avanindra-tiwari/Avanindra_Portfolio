import React from "react";
import { motion } from "framer-motion";
import { BookOpen, Calendar, GraduationCap, Star } from "lucide-react";
import { educationTimeline } from "../data/portfolioData";

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

export default function Education() {
  return (
    <section id="education" className="section">
      <div className="container">
        <Reveal><p className="section-label">05 — EDUCATION</p></Reveal>

        <div className="section-heading">
          <Reveal>
            <h2>Academic<br /><span>foundation.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>Building engineering fundamentals through structured learning in computer science and software development.</p>
          </Reveal>
        </div>

        <div className="education-timeline">
          {educationTimeline.map((edu, i) => (
            <Reveal key={i} delay={i * 0.1}>
              <motion.div className="education-card" whileHover={{ y: -4 }}>
                <div className="edu-timeline-dot">
                  <GraduationCap size={20} />
                </div>

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
                      <Calendar size={14} />
                      {edu.year}
                    </div>
                  </div>

                  <h3 className="edu-degree">{edu.degree}</h3>
                  <p className="edu-college"><BookOpen size={15} /> {edu.college}</p>

                  <div className="edu-details-row">
                    {edu.cgpa && (
                      <div className="edu-detail-pill">
                        <Star size={14} /> CGPA: {edu.cgpa}
                      </div>
                    )}
                  </div>

                  <p className="edu-description">{edu.description}</p>
                </div>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
