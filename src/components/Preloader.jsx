import React from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Preloader({ onComplete }) {
  const [progress, setProgress] = React.useState(0);
  const [exiting, setExiting] = React.useState(false);

  React.useEffect(() => {
    let raf;
    let startTime = null;
    const totalDuration = 2400;

    const animate = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const elapsed = timestamp - startTime;
      const rawPct = Math.min(elapsed / totalDuration, 1);
      // Ease-in-out quad
      const eased = rawPct < 0.5
        ? 2 * rawPct * rawPct
        : 1 - Math.pow(-2 * rawPct + 2, 2) / 2;
      setProgress(Math.round(eased * 100));

      if (rawPct < 1) {
        raf = requestAnimationFrame(animate);
      } else {
        setProgress(100);
        setTimeout(() => {
          setExiting(true);
          setTimeout(() => onComplete(), 800);
        }, 350);
      }
    };

    raf = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(raf);
  }, [onComplete]);

  const name = "AVANINDRA TIWARI";

  return (
    <AnimatePresence>
      {!exiting && (
        <motion.div
          className="preloader"
          exit={{ opacity: 0, scale: 1.04 }}
          transition={{ duration: 0.75, ease: [0.22, 1, 0.36, 1] }}
        >
          {/* Background glows */}
          <div className="pl-glow pl-glow-1" />
          <div className="pl-glow pl-glow-2" />

          <div className="pl-content">
            {/* Logo mark */}
            <motion.div
              className="pl-logo"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.65, ease: [0.34, 1.56, 0.64, 1] }}
            >
              <span>AT</span>
              <motion.div
                className="pl-logo-ring"
                initial={{ scale: 0.6, opacity: 0 }}
                animate={{ scale: 1.35, opacity: 0 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "easeOut" }}
              />
            </motion.div>

            {/* Character stagger name reveal */}
            <div className="pl-name" aria-label={name}>
              {name.split("").map((char, i) => (
                <motion.span
                  key={i}
                  initial={{ opacity: 0, y: 18 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{
                    delay: i * 0.045 + 0.35,
                    duration: 0.4,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  style={{ display: char === " " ? "inline" : "inline-block" }}
                >
                  {char === " " ? "\u00A0" : char}
                </motion.span>
              ))}
            </div>

            {/* Subtitle */}
            <motion.p
              className="pl-subtitle"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.3, duration: 0.5 }}
            >
              CSE Student &nbsp;·&nbsp; Web Developer &nbsp;·&nbsp; Data Analyst
            </motion.p>

            {/* Progress */}
            <motion.div
              className="pl-progress"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.4 }}
            >
              <div className="pl-bar-track">
                <motion.div
                  className="pl-bar-fill"
                  animate={{ width: `${progress}%` }}
                  transition={{ duration: 0.25, ease: "easeOut" }}
                />
              </div>
              <span className="pl-pct">{progress}%</span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
