import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Code2, Cpu } from "lucide-react";
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

/* ─── Animated Counter ─────────────────────────────────────── */
function AnimatedCounter({ target, suffix = "", duration = 1600 }) {
  const [count, setCount] = React.useState(0);
  const [started, setStarted] = React.useState(false);
  const ref = React.useRef(null);

  React.useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setStarted(true); },
      { threshold: 0.5 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  React.useEffect(() => {
    if (!started || target === 0) return;
    let raf;
    const startTime = performance.now();
    const animate = (now) => {
      const elapsed = now - startTime;
      const progress = Math.min(elapsed / duration, 1);
      // Ease out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(eased * target));
      if (progress < 1) raf = requestAnimationFrame(animate);
      else setCount(target);
    };
    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [started, target, duration]);

  return (
    <strong ref={ref} className="stat-number">
      {count}{suffix}
    </strong>
  );
}

const STATS = [
  { target: 3, suffix: "+", label: "Projects Completed" },
  { target: 13, suffix: "+", label: "Technologies" },
  { target: 4, suffix: "+", label: "Analytics Tools" },
  { target: null, text: "CSE", label: "Engineering Major" },
];

const PILLARS = [
  {
    Icon: Cpu,
    title: "Computer Science Engineering",
    description: "Rigorous foundation in core CS principles, algorithm design, software architecture, and problem-solving.",
  },
  {
    Icon: Code2,
    title: "Web Development",
    description: "Building fast, responsive web apps using React.js, modern JavaScript, and clean CSS design systems.",
  },
  {
    Icon: BarChart3,
    title: "Data Analytics",
    description: "Analyzing data with Python, Pandas, Matplotlib, Power BI, and Tableau to surface actionable insights.",
  },
];

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal><p className="section-label">01 — ABOUT ME</p></Reveal>

        <div className="about-grid">
          <Reveal className="section-title-wrap">
            <h2>
              Curious mind.<br />
              <span>Builder's heart.</span>
            </h2>
          </Reveal>

          <Reveal delay={0.1}>
            <p className="lead">
              I'm <strong>{personal.name}</strong>, a Computer Science Engineering student passionate about building clean, high-performance web applications and unlocking actionable meaning from data.
            </p>
            <p className="muted">
              My engineering journey combines modern frontend development skills with quantitative data analysis. I enjoy designing practical software solutions that solve real-world challenges while maintaining high aesthetic and performance standards.
            </p>

            {/* Animated stat counters */}
            <div className="about-stats">
              {STATS.map((stat, i) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ y: -4, scale: 1.03 }}
                  transition={{ duration: 0.25 }}
                >
                  {stat.target !== null ? (
                    <AnimatedCounter target={stat.target} suffix={stat.suffix} />
                  ) : (
                    <strong className="stat-number stat-text">{stat.text}</strong>
                  )}
                  <span>{stat.label}</span>
                </motion.div>
              ))}
            </div>
          </Reveal>
        </div>

        {/* Pillar cards with stagger */}
        <div className="pillar-cards-grid">
          {PILLARS.map(({ Icon, title, description }, i) => (
            <Reveal key={title} delay={i * 0.1}>
              <motion.div
                className="pillar-card"
                whileHover={{ y: -7, boxShadow: "0 20px 50px rgba(0,0,0,0.35)" }}
                transition={{ duration: 0.28 }}
              >
                <motion.div
                  className="pillar-icon"
                  whileHover={{ scale: 1.15, rotate: 6 }}
                  transition={{ type: "spring", stiffness: 300, damping: 16 }}
                >
                  <Icon size={24} />
                </motion.div>
                <h3>{title}</h3>
                <p>{description}</p>
              </motion.div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
