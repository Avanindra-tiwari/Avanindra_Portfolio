import React from "react";
import { motion, AnimatePresence, useMotionValue, useTransform, useSpring } from "framer-motion";
import { BarChart3, Code2, Cpu, Database, FileSpreadsheet, Layers, PieChart, Table, Zap } from "lucide-react";
import { skills } from "../data/portfolioData";

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

function SkillBadgeIcon({ icon, color }) {
  switch (icon) {
    case "html":
      return <Code2 size={20} style={{ color }} />;
    case "css":
      return <Zap size={20} style={{ color }} />;
    case "javascript":
      return <Cpu size={20} style={{ color }} />;
    case "react":
      return (
        <motion.div animate={{ rotate: 360 }} transition={{ duration: 10, repeat: Infinity, ease: "linear" }}>
          <Zap size={20} style={{ color }} />
        </motion.div>
      );
    case "python":
      return <Database size={20} style={{ color }} />;
    case "pandas":
      return <Table size={20} style={{ color }} />;
    case "numpy":
      return <Layers size={20} style={{ color }} />;
    case "matplotlib":
      return <BarChart3 size={20} style={{ color }} />;
    case "seaborn":
      return <PieChart size={20} style={{ color }} />;
    case "tableau":
      return <BarChart3 size={20} style={{ color }} />;
    case "powerbi":
      return <BarChart3 size={20} style={{ color }} />;
    case "excel":
      return <FileSpreadsheet size={20} style={{ color }} />;
    case "sheets":
      return <FileSpreadsheet size={20} style={{ color }} />;
    default:
      return <Code2 size={20} style={{ color }} />;
  }
}

function TiltCard({ children, className = "", maxTilt = 6 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const rotateXRaw = useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]);
  const rotateYRaw = useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]);

  const rotateX = useSpring(rotateXRaw, { stiffness: 220, damping: 18 });
  const rotateY = useSpring(rotateYRaw, { stiffness: 220, damping: 18 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    x.set(mouseX / width - 0.5);
    y.set(mouseY / height - 0.5);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  return (
    <motion.div
      className={className}
      style={{ rotateX, rotateY }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {children}
    </motion.div>
  );
}

export default function Skills() {
  const [activeCategory, setActiveCategory] = React.useState("ALL");

  const categories = ["ALL", "FRONTEND", "PROGRAMMING & DATA", "BUSINESS INTELLIGENCE", "PRODUCTIVITY"];

  const filteredSkills = activeCategory === "ALL"
    ? skills
    : skills.filter(s => s.category === activeCategory);

  return (
    <section id="skills" className="section section-alt">
      <div className="container">
        <Reveal><p className="section-label">02 — SKILLS & TECHNOLOGIES</p></Reveal>

        <div className="section-heading">
          <Reveal>
            <h2>Tools I use to<br /><span>make things happen.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>From modern web interfaces to quantitative data pipelines, I work across frontend stacks and analytics frameworks.</p>
          </Reveal>
        </div>

        <Reveal delay={0.15}>
          <div className="skill-tabs">
            {categories.map((cat) => (
              <button
                key={cat}
                className={`skill-tab ${activeCategory === cat ? "active" : ""}`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>
        </Reveal>

        <motion.div className="skills-grid" layout>
          <AnimatePresence mode="popLayout">
            {filteredSkills.map((skill, i) => (
              <motion.div
                key={skill.name}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.3, delay: (i % 4) * 0.03 }}
                style={{ "--skill-color": skill.color }}
              >
                <TiltCard maxTilt={6}>
                  <div className="skill-card">
                    <div className="skill-head">
                      <div className="skill-info">
                        <div className="skill-icon-box">
                          <SkillBadgeIcon icon={skill.icon} color={skill.color} />
                        </div>
                        <div className="skill-name-wrap">
                          <span>{skill.name}</span>
                          <small>{skill.category}</small>
                        </div>
                      </div>
                      <span className="skill-pct">{skill.level}%</span>
                    </div>

                    <div className="skill-bar">
                      <motion.span
                        initial={{ width: 0 }}
                        whileInView={{ width: `${skill.level}%` }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.9, delay: 0.15 }}
                      />
                    </div>
                  </div>
                </TiltCard>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
}
