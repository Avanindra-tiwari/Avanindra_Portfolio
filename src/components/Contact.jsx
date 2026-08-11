import React from "react";
import { motion } from "framer-motion";
import { CheckCircle, Copy, Github, Linkedin, Mail, MapPin, Phone, Send } from "lucide-react";
import { personal, socials } from "../data/portfolioData";

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

export default function Contact() {
  const [form, setForm] = React.useState({ name: "", email: "", subject: "", message: "" });
  const [errors, setErrors] = React.useState({});
  const [submitted, setSubmitted] = React.useState(false);
  const [copied, setCopied] = React.useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validate = () => {
    const errs = {};
    if (!form.name.trim()) errs.name = "Name is required";
    if (!form.email.trim()) errs.email = "Email is required";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Enter a valid email";
    if (!form.message.trim()) errs.message = "Message is required";
    return errs;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length > 0) {
      setErrors(errs);
      return;
    }
    setSubmitted(true);
  };

  const copyEmail = () => {
    navigator.clipboard.writeText(personal.email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2500);
  };

  const contactInfo = [
    { icon: Mail, label: "Email", value: personal.email, href: `mailto:${personal.email}` },
    { icon: Phone, label: "Phone", value: personal.phone, href: `tel:${personal.phone}` },
    { icon: MapPin, label: "Location", value: personal.location, href: null }
  ];

  return (
    <section id="contact" className="section section-alt">
      <div className="container">
        <Reveal><p className="section-label">07 — GET IN TOUCH</p></Reveal>

        <div className="section-heading">
          <Reveal>
            <h2>Let's build<br /><span>something great.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>Whether you have a project in mind, an opportunity to discuss, or just want to connect — my inbox is always open.</p>
          </Reveal>
        </div>

        <div className="contact-layout">
          {/* Left Panel */}
          <Reveal delay={0.08}>
            <div className="contact-info-panel">
              <h3>Contact Information</h3>

              <div className="contact-info-list">
                {contactInfo.map((info) => {
                  const IconComp = info.icon;
                  return (
                    <div key={info.label} className="contact-info-item">
                      <div className="contact-info-icon">
                        <IconComp size={18} />
                      </div>
                      <div>
                        <small>{info.label}</small>
                        {info.href ? (
                          <a href={info.href} className="contact-info-val">{info.value}</a>
                        ) : (
                          <p className="contact-info-val">{info.value}</p>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>

              <button className="copy-email-btn" onClick={copyEmail}>
                {copied ? <CheckCircle size={16} /> : <Copy size={16} />}
                {copied ? "Email copied!" : "Copy email address"}
              </button>

              <div className="contact-socials">
                <motion.a href={socials.github} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} aria-label="GitHub">
                  <Github size={20} />
                </motion.a>
                <motion.a href={socials.linkedin} target="_blank" rel="noreferrer" whileHover={{ scale: 1.1 }} aria-label="LinkedIn">
                  <Linkedin size={20} />
                </motion.a>
                <motion.a href={socials.email} whileHover={{ scale: 1.1 }} aria-label="Email">
                  <Mail size={20} />
                </motion.a>
              </div>
            </div>
          </Reveal>

          {/* Right Panel - Form */}
          <Reveal delay={0.14}>
            <div className="contact-form-panel">
              {submitted ? (
                <motion.div
                  className="form-success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <CheckCircle size={48} />
                  <h3>Message sent!</h3>
                  <p>Thank you for reaching out. I'll get back to you soon.</p>
                  <button className="primary-btn" onClick={() => { setSubmitted(false); setForm({ name: "", email: "", subject: "", message: "" }); }}>
                    Send another message
                  </button>
                </motion.div>
              ) : (
                <form onSubmit={handleSubmit} className="contact-form" noValidate>
                  <div className="form-row">
                    <div className={`form-field ${errors.name ? "has-error" : ""}`}>
                      <label htmlFor="contact-name">Full Name</label>
                      <input
                        id="contact-name"
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleChange}
                        placeholder="Avanindra Tiwari"
                      />
                      {errors.name && <span className="field-error">{errors.name}</span>}
                    </div>

                    <div className={`form-field ${errors.email ? "has-error" : ""}`}>
                      <label htmlFor="contact-email">Email Address</label>
                      <input
                        id="contact-email"
                        type="email"
                        name="email"
                        value={form.email}
                        onChange={handleChange}
                        placeholder="email@example.com"
                      />
                      {errors.email && <span className="field-error">{errors.email}</span>}
                    </div>
                  </div>

                  <div className="form-field">
                    <label htmlFor="contact-subject">Subject</label>
                    <input
                      id="contact-subject"
                      type="text"
                      name="subject"
                      value={form.subject}
                      onChange={handleChange}
                      placeholder="Project collaboration / Internship opportunity"
                    />
                  </div>

                  <div className={`form-field ${errors.message ? "has-error" : ""}`}>
                    <label htmlFor="contact-message">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={5}
                      value={form.message}
                      onChange={handleChange}
                      placeholder="Hello Avanindra, I'd love to discuss..."
                    />
                    {errors.message && <span className="field-error">{errors.message}</span>}
                  </div>

                  <motion.button
                    type="submit"
                    className="primary-btn submit-btn"
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Send size={17} /> Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
