import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Code2, Cpu } from "lucide-react";
import { aboutStats, personal } from "../data/portfolioData";

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

export default function About() {
  const pillarCards = [
    {
      title: "Computer Science Engineering",
      icon: Cpu,
      description: "Rigorous foundation in computer science core principles, algorithm design, software architecture, and problem-solving."
    },
    {
      title: "Web Development",
      icon: Code2,
      description: "Crafting fast, responsive, and intuitive web applications using React.js, modern JavaScript, and clean CSS design systems."
    },
    {
      title: "Data Analytics",
      icon: BarChart3,
      description: "Analyzing trip logs, business metrics, and raw data with Python, Pandas, Matplotlib, Power BI, and Tableau to drive insights."
    }
  ];

  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal><p className="section-label">01 — ABOUT ME</p></Reveal>

        <div className="about-grid">
          <Reveal className="section-title-wrap">
            <h2>Curious mind.<br /><span>Builder's heart.</span></h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="lead">
              I'm <strong>{personal.name}</strong>, a Computer Science Engineering student passionate about building clean, high-performance web applications and unlocking actionable meaning from data.
            </p>
            <p className="muted">
              My engineering journey combines modern frontend development skills with quantitative data analysis. I enjoy designing practical software solutions that solve real-world challenges while maintaining high aesthetic and performance standards.
            </p>

            <div className="about-stats">
              {aboutStats.map((stat, i) => (
                <motion.div key={i} whileHover={{ y: -4 }}>
                  <strong>{stat.value}</strong>
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        <div className="pillar-cards-grid">
          {pillarCards.map((card, i) => {
            const IconComponent = card.icon;
            return (
              <Reveal key={card.title} delay={i * 0.1}>
                <motion.div className="pillar-card" whileHover={{ y: -6 }}>
                  <div className="pillar-icon">
                    <IconComponent size={24} />
                  </div>
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
