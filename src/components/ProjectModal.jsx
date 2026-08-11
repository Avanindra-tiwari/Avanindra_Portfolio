import React from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowUpRight, Github, X } from "lucide-react";

export default function ProjectModal({ project, onClose }) {
  React.useEffect(() => {
    if (!project) return;
    const handleKeyDown = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleKeyDown);
    const originalStyle = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
      document.body.style.overflow = originalStyle;
    };
  }, [project, onClose]);

  if (!project) return null;

  return (
    <AnimatePresence>
      <div className="modal-backdrop" onClick={onClose}>
        <motion.div
          className="modal-card"
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          onClick={(e) => e.stopPropagation()}
        >
          <button className="modal-close-btn" onClick={onClose} aria-label="Close modal">
            <X size={20} />
          </button>

          <div className="modal-image-wrap">
            <img src={project.image} alt={project.title} />
          </div>

          <div className="modal-body">
            <div className="modal-header">
              <span className="project-category">{project.category}</span>
              <h2>{project.title}</h2>
              <p className="modal-lead">{project.shortDescription}</p>
            </div>

            <div className="modal-grid">
              <div className="modal-section">
                <h4>Problem Statement</h4>
                <p>{project.details?.problem || "Describing core problem and objectives."}</p>
              </div>

              <div className="modal-section">
                <h4>Solution Architecture</h4>
                <p>{project.details?.solution || "Engineered solution."}</p>
              </div>
            </div>

            {project.details?.features && (
              <div className="modal-section">
                <h4>Key Features</h4>
                <ul className="modal-features">
                  {project.details.features.map((feat, idx) => (
                    <li key={idx}>{feat}</li>
                  ))}
                </ul>
              </div>
            )}

            <div className="modal-footer-meta">
              <div className="modal-meta-item">
                <small>MY ROLE</small>
                <strong>{project.details?.role || "Developer"}</strong>
              </div>

              <div className="modal-meta-item">
                <small>TECHNOLOGIES</small>
                <div className="tag-row">
                  {project.tags.map((t) => (
                    <span key={t}>{t}</span>
                  ))}
                </div>
              </div>
            </div>

            <div className="modal-actions">
              <motion.a
                className="primary-btn"
                href={project.githubUrl}
                target="_blank"
                rel="noreferrer"
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.95 }}
              >
                <Github size={18} /> View on GitHub
              </motion.a>

              {project.liveUrl && project.liveUrl !== "#" && (
                <motion.a
                  className="secondary-btn"
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Live Demo <ArrowUpRight size={16} />
                </motion.a>
              )}
            </div>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
