import React from "react";
import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { ArrowUpRight, BarChart3, Code2, ExternalLink, Github, Info, Zap } from "lucide-react";
import { projects } from "../data/portfolioData";
import ProjectModal from "./ProjectModal";

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

function TiltCard({ children, className = "", maxTilt = 5 }) {
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

export default function Projects() {
  const [selectedProject, setSelectedProject] = React.useState(null);

  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal><p className="section-label">03 — SELECTED WORK</p></Reveal>

        <div className="section-heading projects-heading">
          <Reveal>
            <h2>Projects that turn<br /><span>ideas into reality.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>A selection of academic and personal work showcasing modern web applications, frontend builds, and data analytics pipelines.</p>
          </Reveal>
        </div>

        <div className="project-list">
          {projects.map((project, i) => (
            <Reveal key={project.id} delay={i * 0.08}>
              <TiltCard maxTilt={4}>
                <article className="project-card">
                  <div className="project-number">{project.number}</div>

                  <div className="project-image-wrap">
                    <img className="project-image" src={project.image} alt={project.title} loading="lazy" />
                  </div>

                  <div className="project-main">
                    <div className="project-icon">
                      {project.icon === "chart" ? <BarChart3 size={20} /> : project.icon === "zap" ? <Zap size={20} /> : <Code2 size={20} />}
                    </div>
                    <p className="project-category">{project.category}</p>
                    <h3>{project.title}</h3>
                    <p className="project-description">{project.shortDescription}</p>

                    <div className="tag-row">
                      {project.tags.map((tag) => (
                        <span key={tag}>{tag}</span>
                      ))}
                    </div>
                  </div>

                  <div className="project-actions-column">
                    <motion.button
                      className="details-btn"
                      onClick={() => setSelectedProject(project)}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Info size={14} /> View Details
                    </motion.button>

                    <div className="project-icon-row">
                      <motion.a
                        className="icon-link-btn"
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        aria-label="GitHub Repository"
                        whileHover={{ scale: 1.1 }}
                      >
                        <Github size={16} />
                      </motion.a>

                      {project.liveUrl && project.liveUrl !== "#" && (
                        <motion.a
                          className="icon-link-btn"
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          aria-label="Live Demo"
                          whileHover={{ scale: 1.1 }}
                        >
                          <ExternalLink size={16} />
                        </motion.a>
                      )}
                    </div>
                  </div>
                </article>
              </TiltCard>
            </Reveal>
          ))}
        </div>
      </div>

      {selectedProject && (
        <ProjectModal project={selectedProject} onClose={() => setSelectedProject(null)} />
      )}
    </section>
  );
}
