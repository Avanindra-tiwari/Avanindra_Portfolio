import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const NAV_ITEMS = ["about", "skills", "projects", "analytics", "education", "certifications", "contact"];

export default function Navbar({ dark, setDark }) {
  const [menu, setMenu] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const [activeSection, setActiveSection] = React.useState("home");

  // Scroll state
  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 48);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Active section via IntersectionObserver
  React.useEffect(() => {
    const ids = ["home", ...NAV_ITEMS];
    const observers = ids.map((id) => {
      const el = document.getElementById(id);
      if (!el) return null;
      const obs = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActiveSection(id); },
        { threshold: 0.25, rootMargin: "-60px 0px -40% 0px" }
      );
      obs.observe(el);
      return obs;
    });
    return () => observers.forEach((o) => o?.disconnect());
  }, []);

  // Lock body scroll when mobile menu is open
  React.useEffect(() => {
    document.body.style.overflow = menu ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menu]);

  // ESC closes menu
  React.useEffect(() => {
    const onKey = (e) => { if (e.key === "Escape") setMenu(false); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, []);

  const closeMenu = () => setMenu(false);

  return (
    <header className={`nav-wrap ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav">
        {/* Brand */}
        <motion.a
          className="brand"
          href="#home"
          onClick={closeMenu}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
        >
          <span className="brand-mark">AT</span>
          <span>AVANINDRA<span className="accent">.</span></span>
        </motion.a>

        {/* Desktop nav links */}
        <div className="nav-links-desktop">
          {NAV_ITEMS.map((item) => (
            <a
              key={item}
              href={`#${item}`}
              className={`nav-link ${activeSection === item ? "nav-link-active" : ""}`}
            >
              {item}
              {activeSection === item && (
                <motion.span
                  className="nav-active-dot"
                  layoutId="nav-active-dot"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                />
              )}
            </a>
          ))}
        </div>

        {/* Actions */}
        <div className="nav-actions">
          <motion.button
            className="icon-btn"
            onClick={() => setDark(!dark)}
            aria-label="Toggle theme"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={dark ? "dark" : "light"}
                initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
                animate={{ opacity: 1, rotate: 0, scale: 1 }}
                exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", placeItems: "center" }}
              >
                {dark ? <Sun size={18} /> : <Moon size={18} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>

          <motion.a
            className="nav-cta"
            href="#contact"
            whileHover={{ scale: 1.04, boxShadow: "0 0 22px var(--accent-glow)" }}
            whileTap={{ scale: 0.95 }}
          >
            Let's talk <ArrowUpRight size={16} />
          </motion.a>

          <motion.button
            className="icon-btn menu-btn"
            onClick={() => setMenu((v) => !v)}
            aria-label={menu ? "Close menu" : "Open menu"}
            aria-expanded={menu}
            whileTap={{ scale: 0.9 }}
          >
            <AnimatePresence mode="wait" initial={false}>
              <motion.div
                key={menu ? "close" : "open"}
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.2 }}
                style={{ display: "grid", placeItems: "center" }}
              >
                {menu ? <X size={20} /> : <Menu size={20} />}
              </motion.div>
            </AnimatePresence>
          </motion.button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {menu && (
          <motion.div
            className="mobile-menu"
            initial={{ opacity: 0, y: -16 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -12 }}
            transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
          >
            <nav className="mobile-nav-links">
              {NAV_ITEMS.map((item, i) => (
                <motion.a
                  key={item}
                  href={`#${item}`}
                  onClick={closeMenu}
                  className={`mobile-nav-link ${activeSection === item ? "mobile-nav-active" : ""}`}
                  initial={{ opacity: 0, x: -18 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.055, duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                >
                  <span className="mobile-nav-num">{String(i + 1).padStart(2, "0")}</span>
                  {item}
                </motion.a>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
