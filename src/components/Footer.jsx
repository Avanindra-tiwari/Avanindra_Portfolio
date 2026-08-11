import React from "react";
import { motion } from "framer-motion";
import { ArrowUp, Github, Heart, Linkedin, Mail } from "lucide-react";
import { personal, socials } from "../data/portfolioData";

export default function Footer() {
  const scrollTop = () => window.scrollTo({ top: 0, behavior: "smooth" });

  return (
    <footer className="site-footer">
      <div className="container footer-inner">
        <div className="footer-brand">
          <span className="brand-mark">AT</span>
          <p>Building modern web apps &amp; analytics solutions.</p>
        </div>

        <div className="footer-links">
          {["about", "skills", "projects", "analytics", "education", "contact"].map((link) => (
            <a key={link} href={`#${link}`}>{link}</a>
          ))}
        </div>

        <div className="footer-socials">
          <motion.a href={socials.github} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} aria-label="GitHub">
            <Github size={19} />
          </motion.a>
          <motion.a href={socials.linkedin} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} aria-label="LinkedIn">
            <Linkedin size={19} />
          </motion.a>
          <motion.a href={socials.email} whileHover={{ scale: 1.1 }} aria-label="Email">
            <Mail size={19} />
          </motion.a>
        </div>
      </div>

      <div className="footer-bottom">
        <p>
          © {new Date().getFullYear()} {personal.name}. Crafted with <Heart size={13} className="heart-icon" /> and React.
        </p>
        <motion.button
          className="back-to-top"
          onClick={scrollTop}
          whileHover={{ y: -3 }}
          whileTap={{ scale: 0.9 }}
          aria-label="Back to top"
        >
          <ArrowUp size={18} />
        </motion.button>
      </div>
    </footer>
  );
}
