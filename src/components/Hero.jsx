import React from "react";
import { motion, useScroll, useTransform, useMotionValue, useSpring } from "framer-motion";
import { ArrowDown, ArrowUpRight, BarChart3, Code2, Download, Github, Linkedin, Mail } from "lucide-react";
import { personal, socials } from "../data/portfolioData";

/* ─── Typing Role Effect ───────────────────────────────────── */
const ROLES = [
  "CSE Student",
  "Web Developer",
  "React Developer",
  "Data Analyst",
  "Python Developer",
];

function TypingRole() {
  const [idx, setIdx] = React.useState(0);
  const [text, setText] = React.useState("");
  const [phase, setPhase] = React.useState("typing");

  React.useEffect(() => {
    const current = ROLES[idx];
    let t;
    if (phase === "typing") {
      if (text.length < current.length) {
        t = setTimeout(() => setText(current.slice(0, text.length + 1)), 85);
      } else {
        t = setTimeout(() => setPhase("pausing"), 1800);
      }
    } else if (phase === "pausing") {
      t = setTimeout(() => setPhase("deleting"), 80);
    } else {
      if (text.length > 0) {
        t = setTimeout(() => setText(current.slice(0, text.length - 1)), 42);
      } else {
        setIdx((p) => (p + 1) % ROLES.length);
        setPhase("typing");
      }
    }
    return () => clearTimeout(t);
  }, [text, phase, idx]);

  return (
    <span className="typing-wrap">
      <span className="typing-text">{text}</span>
      <span className="typing-cursor" aria-hidden="true">|</span>
    </span>
  );
}

/* ─── Subtle Particle Field ────────────────────────────────── */
const PARTICLES = Array.from({ length: 14 }, (_, i) => ({
  id: i,
  left: `${(i * 7.3 + 4) % 96}%`,
  top: `${(i * 13.7 + 8) % 92}%`,
  size: i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1.5,
  dur: 6 + (i % 5) * 2.2,
  delay: -(i % 6) * 1.3,
}));

function ParticleField() {
  return (
    <div className="particle-field" aria-hidden="true">
      {PARTICLES.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            top: p.top,
            width: p.size,
            height: p.size,
            animationDuration: `${p.dur}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
}

/* ─── Profile Avatar ───────────────────────────────────────── */
function ProfileAvatar() {
  const initials = personal.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <div className="profile-frame-wrap">
      <motion.div
        className="profile-ring profile-ring-outer"
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
      />
      <motion.div
        className="profile-ring profile-ring-inner"
        animate={{ rotate: -360 }}
        transition={{ duration: 14, repeat: Infinity, ease: "linear" }}
      />
      <div className="profile-frame">
        {personal.avatar ? (
          <img
            src={personal.avatar}
            alt={`${personal.name} — Profile Photo`}
            className="profile-photo"
            onError={(e) => {
              e.target.style.display = "none";
              e.target.nextSibling.style.display = "flex";
            }}
          />
        ) : null}
        <div
          className="profile-initials"
          style={{ display: personal.avatar ? "none" : "flex" }}
        >
          {initials}
        </div>
      </div>
      <div className="profile-status-badge">
        <span className="pulse" /> Available
      </div>
    </div>
  );
}

/* ─── 3D Tilt Card ─────────────────────────────────────────── */
function TiltCard({ children, className = "", maxTilt = 8 }) {
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const rotX = useSpring(useTransform(y, [-0.5, 0.5], [maxTilt, -maxTilt]), { stiffness: 220, damping: 18 });
  const rotY = useSpring(useTransform(x, [-0.5, 0.5], [-maxTilt, maxTilt]), { stiffness: 220, damping: 18 });

  const onMove = (e) => {
    const r = e.currentTarget.getBoundingClientRect();
    x.set((e.clientX - r.left) / r.width - 0.5);
    y.set((e.clientY - r.top) / r.height - 0.5);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  return (
    <motion.div
      className={className}
      style={{ rotateX: rotX, rotateY: rotY }}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
    >
      {children}
    </motion.div>
  );
}

/* ─── Reveal Wrapper ───────────────────────────────────────── */
function Reveal({ children, delay = 0, className = "" }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.65, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

/* ─── Hero ─────────────────────────────────────────────────── */
export default function Hero() {
  const { scrollYProgress } = useScroll();
  const orbY1 = useTransform(scrollYProgress, [0, 1], [0, -300]);
  const orbY2 = useTransform(scrollYProgress, [0, 1], [0, -160]);

  return (
    <section id="home" className="hero section">
      {/* Grid + particles */}
      <div className="grid-bg" />
      <ParticleField />

      {/* Parallax orbs */}
      <motion.div className="orb orb-one" style={{ y: orbY1 }} />
      <motion.div className="orb orb-two" style={{ y: orbY2 }} />

      <div className="container hero-grid">

        {/* ── LEFT / TOP: Copy column ─────────────────────────── */}
        <div className="hero-copy">
          <Reveal delay={0.05}>
            <div className="eyebrow">
              <span className="pulse" /> AVAILABLE FOR OPPORTUNITIES
            </div>
          </Reveal>

          <Reveal delay={0.12}>
            <p className="hero-kicker">HELLO, I'M</p>
            <h1>
              {personal.name.split(" ")[0]}
              <br />
              <span>{personal.name.split(" ")[1]}.</span>
            </h1>
          </Reveal>

          {/*
           * MOBILE AVATAR — shows between name and buttons on mobile.
           * Hidden on desktop (>860px) via CSS — the right-column avatar shows there.
           */}
          <motion.div
            className="hero-avatar-mobile"
            initial={{ opacity: 0, scale: 0.85 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileAvatar />
          </motion.div>

          {/* Typing role */}
          <Reveal delay={0.2}>
            <p className="hero-role-typing">
              <TypingRole />
            </p>
            <p className="hero-text">{personal.shortIntro}</p>
          </Reveal>

          {/* CTA buttons */}
          <Reveal delay={0.28}>
            <div className="hero-buttons">
              {[
                { href: "#projects", label: "View My Projects", icon: <ArrowUpRight size={17} />, primary: true },
                { href: personal.resume, label: "Download Resume", icon: <Download size={16} />, primary: false, download: true },
                { href: "#contact", label: "Contact Me", primary: false },
              ].map((btn, i) => (
                <motion.a
                  key={btn.label}
                  className={btn.primary ? "primary-btn" : "secondary-btn"}
                  href={btn.href}
                  target={btn.download ? "_blank" : undefined}
                  rel={btn.download ? "noreferrer" : undefined}
                  whileHover={{ scale: 1.04, y: -2 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0, y: 14 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.32 + i * 0.07, duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
                >
                  {btn.label} {btn.icon}
                </motion.a>
              ))}
            </div>
          </Reveal>

          {/* Social row */}
          <Reveal delay={0.44}>
            <div className="social-row">
              {[
                { href: socials.github, icon: <Github size={17} />, label: "GitHub" },
                { href: socials.linkedin, icon: <Linkedin size={17} />, label: "LinkedIn" },
                { href: socials.email, icon: <Mail size={17} />, label: "Email" },
              ].map((s) => (
                <motion.a
                  key={s.label}
                  href={s.href}
                  target={s.label !== "Email" ? "_blank" : undefined}
                  rel={s.label !== "Email" ? "noreferrer" : undefined}
                  className="social-link"
                  aria-label={s.label}
                  whileHover={{ scale: 1.08, color: "var(--accent)", y: -2 }}
                  whileTap={{ scale: 0.92 }}
                >
                  {s.icon} {s.label}
                </motion.a>
              ))}
            </div>
          </Reveal>
        </div>

        {/* ── RIGHT / BOTTOM (desktop only): Visual column ────── */}
        <div className="hero-visual">
          {/* Desktop avatar — hidden on mobile via CSS */}
          <motion.div
            className="hero-avatar-desktop"
            initial={{ opacity: 0, scale: 0.82 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          >
            <ProfileAvatar />
          </motion.div>

          {/* Code Card */}
          <TiltCard className="code-card-wrap">
            <motion.div
              className="code-card"
              initial={{ opacity: 0, y: 24, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.9, delay: 0.32, ease: [0.22, 1, 0.36, 1] }}
            >
              <div className="code-top">
                <div className="window-dots"><i /><i /><i /></div>
                <span>avanindra.js</span>
              </div>
              <pre><code>
                <span className="c-purple">const</span>{" "}
                <span className="c-blue">developer</span> = {"{\n"}
{"  "}<span className="c-green">name</span>:{" "}
                <span className="c-yellow">"{personal.name}"</span>,{"\n"}
{"  "}<span className="c-green">major</span>:{" "}
                <span className="c-yellow">"CSE Engineering"</span>,{"\n"}
{"  "}<span className="c-green">focus</span>: [<span className="c-yellow">"Web Dev"</span>,{" "}
                <span className="c-yellow">"Data Analytics"</span>],{"\n"}
{"  "}<span className="c-green">passion</span>:{" "}
                <span className="c-yellow">"Build &amp; Insights"</span>{"\n"}
{"}"}</code></pre>
              <div className="code-status">
                <span className="status-dot" /> building modern web experiences
                <span className="cursor">_</span>
              </div>
            </motion.div>
          </TiltCard>

          {/* Floating tech chips */}
          <motion.div
            className="floating-chip chip-one"
            animate={{ y: [0, -10, 0] }}
            transition={{ duration: 3.2, repeat: Infinity, ease: "easeInOut" }}
          >
            <Code2 size={16} /> React.js & Web
          </motion.div>
          <motion.div
            className="floating-chip chip-two"
            animate={{ y: [0, 11, 0] }}
            transition={{ duration: 3.8, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <BarChart3 size={16} /> Python Analytics
          </motion.div>
        </div>
      </div>

      {/* Scroll cue */}
      <motion.a
        className="scroll-cue"
        href="#about"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2 }}
      >
        <span>SCROLL</span>
        <motion.div
          animate={{ y: [0, 5, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
        >
          <ArrowDown size={16} />
        </motion.div>
      </motion.a>
    </section>
  );
}
