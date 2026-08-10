import React from "react";
import { motion } from "framer-motion";
import { BarChart3, Clock, MapPin, TrendingUp, Users } from "lucide-react";
import { analyticsData } from "../data/portfolioData";

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

const insightIcons = [Clock, MapPin, TrendingUp, BarChart3];

export default function Analytics() {
  return (
    <section id="analytics" className="section section-alt">
      <div className="container">
        <Reveal><p className="section-label">04 — DATA ANALYTICS SHOWCASE</p></Reveal>

        <div className="section-heading">
          <Reveal>
            <h2>Turning raw data<br /><span>into real insight.</span></h2>
          </Reveal>
          <Reveal delay={0.1}>
            <p>{analyticsData.subtitle}</p>
          </Reveal>
        </div>

        {/* Metrics Row */}
        <div className="analytics-metrics">
          {analyticsData.metrics.map((metric, i) => (
            <Reveal key={metric.label} delay={i * 0.07}>
              <motion.div className="metric-card" whileHover={{ y: -5 }}>
                <div className="metric-icon">
                  <BarChart3 size={22} />
                </div>
                <strong className="metric-value">{metric.value}</strong>
                <span className="metric-label">{metric.label}</span>
                <small className="metric-change">{metric.change}</small>
              </motion.div>
            </Reveal>
          ))}
        </div>

        {/* Insights Grid */}
        <div className="analytics-insights">
          {analyticsData.insights.map((insight, i) => {
            const IconComp = insightIcons[i % insightIcons.length];
            return (
              <Reveal key={insight.title} delay={i * 0.09}>
                <motion.div className="insight-card" whileHover={{ y: -4 }}>
                  <div className="insight-icon-wrap">
                    <IconComp size={20} />
                  </div>
                  <h4>{insight.title}</h4>
                  <div className="insight-value">{insight.value}</div>
                  <p>{insight.desc}</p>
                </motion.div>
              </Reveal>
            );
          })}
        </div>

        {/* Visual Bar Chart Mockup */}
        <Reveal delay={0.15}>
          <div className="chart-showcase">
            <div className="chart-header">
              <Users size={18} />
              <span>Hourly Trip Volume Distribution — Uber NYC Dataset</span>
            </div>
            <div className="bar-chart-wrap">
              {[
                { hour: "6AM", pct: 28 }, { hour: "8AM", pct: 62 },
                { hour: "10AM", pct: 45 }, { hour: "12PM", pct: 55 },
                { hour: "2PM", pct: 48 }, { hour: "4PM", pct: 70 },
                { hour: "6PM", pct: 100 }, { hour: "8PM", pct: 85 },
                { hour: "10PM", pct: 60 }, { hour: "12AM", pct: 42 }
              ].map((bar, i) => (
                <div key={bar.hour} className="bar-item">
                  <motion.div
                    className={`bar-fill ${bar.pct === 100 ? "bar-peak" : ""}`}
                    initial={{ height: 0 }}
                    whileInView={{ height: `${bar.pct}%` }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: i * 0.06, ease: [0.22, 1, 0.36, 1] }}
                  />
                  <span className="bar-label">{bar.hour}</span>
                </div>
              ))}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
