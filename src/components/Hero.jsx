import React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, BarChart3, Code2, Download, Github, Linkedin, Mail } from "lucide-react";
import { personal, socials } from "../data/portfolioData";

// ─── Profile Avatar ───────────────────────────────────────────
// Displays photo if personal.avatar is set, otherwise shows animated initials.
// To swap your photo: update personal.avatar in src/data/portfolioData.js
function ProfileAvatar() {
  const initials = personal.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="profile-frame-wrap">

      {/* Animated outer ring */}
      <motion.div
        className="profile-ring profile-ring-outer"
        animate={{ rotate: 360 }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Animated inner ring */}
      <motion.div
        className="profile-ring profile-ring-inner"
        animate={{ rotate: -360 }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Profile photo / initials */}
      <div className="profile-frame">
        {personal.avatar ? (
          <img
            src={personal.avatar}
            alt={`${personal.name} — Profile Photo`}
            className="profile-photo"
            onError={(e) => {
              e.currentTarget.style.display = "none";
              const fallback = e.currentTarget.nextSibling;
              if (fallback) fallback.style.display = "flex";
            }}
          />
        ) : null}

        {/* Initials fallback */}
        <div
          className="profile-initials"
          style={{
            display: personal.avatar ? "none" : "flex",
          }}
        >
          {initials}
        </div>
      </div>

      {/* Status badge */}
      <div className="profile-status-badge">
        <span className="pulse" />
        Available
      </div>

    </div>
  );
}

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

function TiltCard({ children, className = "", maxTilt = 8 }) {
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

export default function Hero() {
  const { scrollYProgress } = useScroll();

  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -320]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -180]);
  const orbY3 = useTransform(scrollYProgress, [0, 1], [0, -420]);

  const heroCodeRotateX = useTransform(scrollYProgress, [0, 0.25], [10, 0]);
  const heroCodeRotateY = useTransform(scrollYProgress, [0, 0.25], [-8, 0]);

  return (
    <section id="home" className="hero section">
      <div className="grid-bg" />
      <motion.div className="orb orb-one" style={{ y: orbY1 }} />
      <motion.div className="orb orb-two" style={{ y: orbY2 }} />
      <motion.div className="orb orb-one" style={{ y: orbY3, left: "40%", top: "60%", width: 250, height: 250, opacity: 0.08 }} />

      <div className="container hero-grid">
        <div className="hero-copy">
          <Reveal>
            <div className="eyebrow">
              <span className="pulse" /> AVAILABLE FOR OPPORTUNITIES
            </div>
          </Reveal>

          <Reveal delay={0.08}>
            <p className="hero-kicker">HELLO, I'M</p>
            <h1>
              {personal.name.split(" ")[0]}
              <br />
              <span>{personal.name.split(" ")[1]}.</span>
            </h1>
          </Reveal>

          <Reveal delay={0.16}>
            <p className="hero-role">
              <strong>{personal.title.split("|")[0]}</strong> <span>•</span> {personal.title.split("|")[1]} <span>•</span> {personal.title.split("|")[2]}
            </p>
            <p className="hero-text">
              {personal.shortIntro}
            </p>
          </Reveal>

          <Reveal delay={0.24}>
            <div className="hero-buttons">
              <motion.a className="primary-btn" href="#projects" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                View My Projects <ArrowUpRight size={18} />
              </motion.a>
              <motion.a className="secondary-btn" href={personal.resume} target="_blank" rel="noreferrer" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                Download Resume <Download size={16} />
              </motion.a>
              <motion.a className="secondary-btn" href="#contact" whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.95 }}>
                Contact Me
              </motion.a>
            </div>
          </Reveal>

          <Reveal delay={0.3}>
            <div className="social-row">
              <motion.a href={socials.github} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05, color: "var(--accent)" }}>
                <Github size={18} /> GitHub
              </motion.a>
              <motion.a href={socials.linkedin} target="_blank" rel="noreferrer" whileHover={{ scale: 1.05, color: "var(--accent)" }}>
                <Linkedin size={18} /> LinkedIn
              </motion.a>
              <motion.a href={socials.email} whileHover={{ scale: 1.05, color: "var(--accent)" }}>
                <Mail size={18} /> Email
              </motion.a>
            </div>
          </Reveal>
        </div>

        <div className="hero-visual">
          {/* ── Profile Photo ─────────────────────────────────────── */}
          {/* Replace photo: update personal.avatar in src/data/portfolioData.js  */}
          <motion.div
            className="hero-avatar-wrap"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileAvatar />
          </motion.div>

          <TiltCard className="code-card-wrap">
            <motion.div
              className="code-card"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{ rotateX: heroCodeRotateX, rotateY: heroCodeRotateY }}
              transition={{ duration: 1, delay: 0.3, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="code-top">
                <div className="window-dots"><i /><i /><i /></div>
                <span>avanindra.js</span>
              </div>
              <pre><code><span className="c-purple">const</span> <span className="c-blue">developer</span> = {'{'}{'\n'}
  <span className="c-green">name</span>: <span className="c-yellow">"{personal.name}"</span>,{'\n'}
  <span className="c-green">major</span>: <span className="c-yellow">"CSE Engineering"</span>,{'\n'}
  <span className="c-green">focus</span>: [<span className="c-yellow">"Web App Development"</span>, <span className="c-yellow">"Data Analytics"</span>],{'\n'}
  <span className="c-green">passion</span>: <span className="c-yellow">"Build & Insights"</span>{'\n'}
{'}'}</code></pre>
              <div className="code-status">
                <span className="status-dot" /> building modern web experiences<span className="cursor">_</span>
              </div>
            </motion.div>
          </TiltCard>

          <motion.div className="floating-chip chip-one" animate={{ y: [0, -10, 0] }} transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}>
            <Code2 size={17} /> React.js & Web
          </motion.div>
          <motion.div className="floating-chip chip-two" animate={{ y: [0, 10, 0] }} transition={{ duration: 3.5, repeat: Infinity, ease: "easeInOut" }}>
            <BarChart3 size={17} /> Python Data Analytics
          </motion.div>
        </div>
      </div>

      <a className="scroll-cue" href="#about">
        <span>SCROLL TO EXPLORE</span>
        <ArrowDown size={16} />
      </a>
    </section>
  );
}
