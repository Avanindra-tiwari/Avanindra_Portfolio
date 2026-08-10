import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";
import { personal } from "../data/portfolioData";

export default function Navbar({ dark, setDark }) {
  const [menu, setMenu] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);

  React.useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const closeMenu = () => setMenu(false);

  const navItems = [
    "about",
    "skills",
    "projects",
    "analytics",
    "education",
    "certifications",
    "contact"
  ];

  return (
    <header className={`nav-wrap ${scrolled ? "scrolled" : ""}`}>
      <nav className="nav">
        <motion.a className="brand" href="#home" onClick={closeMenu} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.97 }}>
          <span className="brand-mark">AT</span>
          <span>AVANINDRA<span className="accent">.</span></span>
        </motion.a>

        <div className={`nav-links ${menu ? "open" : ""}`}>
          {navItems.map((item) => (
            <a key={item} href={`#${item}`} onClick={closeMenu}>
              {item}
            </a>
          ))}
        </div>

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

          <motion.a className="nav-cta" href="#contact" whileHover={{ scale: 1.04 }} whileTap={{ scale: 0.95 }}>
            Let's talk <ArrowUpRight size={16} />
          </motion.a>

          <button className="icon-btn menu-btn" onClick={() => setMenu(!menu)} aria-label="Menu">
            {menu ? <X size={20} /> : <Menu size={20} />}
          </button>
        </div>
      </nav>
    </header>
  );
}
