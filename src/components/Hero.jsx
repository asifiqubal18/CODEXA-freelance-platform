import React from 'react';
import { ArrowRight, Code2, Smartphone, Sparkles, ShieldCheck, Cpu, Cloud, Award } from 'lucide-react';
import '../styles/Hero.css';

export default function Hero({ onOpenAddProject }) {
  return (
    <section className="hero-section">
      <div className="hero-glow-bg"></div>
      
      <div className="container hero-content">
        {/* Availability Badge */}
        <div className="hero-badge animate-float">
          <span className="pulse-dot"></span>
          <span>CODEXA Agency — Accepting Q3/Q4 Web & Mobile Projects</span>
        </div>

        {/* Hero Title */}
        <h1 className="hero-title">
          Engineering High-Performance <br />
          <span className="text-gradient">Web & Mobile Products</span>
        </h1>

        {/* Hero Subtitle */}
        <p className="hero-subtitle">
          We are a full-cycle software studio. From custom web platforms & mobile applications to cloud infrastructure and AI automation, we turn ambitious ideas into scalable market leaders.
        </p>

        {/* Action Buttons */}
        <div className="hero-actions">
          <a href="#estimator" className="btn btn-primary">
            <span>Instant Project Estimator</span>
            <ArrowRight size={18} />
          </a>
          <a href="#portfolio" className="btn btn-secondary">
            <span>Explore Portfolio</span>
          </a>
        </div>

        {/* Tech Stack Floating Badges */}
        <div className="hero-tech-pills">
          <div className="tech-pill">
            <Code2 size={14} color="var(--accent-cyan)" /> React & Next.js 14
          </div>
          <div className="tech-pill">
            <Smartphone size={14} color="var(--accent-purple)" /> iOS & Android (React Native/Flutter)
          </div>
          <div className="tech-pill">
            <Cpu size={14} color="var(--accent-emerald)" /> OpenAI & AI Integration
          </div>
          <div className="tech-pill">
            <Cloud size={14} color="var(--accent-magenta)" /> AWS & Cloud Architecture
          </div>
        </div>

        {/* Stats Grid */}
        <div className="hero-stats-grid">
          <div className="glass-card stat-card">
            <div className="stat-number text-gradient">150+</div>
            <div className="stat-label">Web & Mobile Apps Delivered</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-number text-gradient-secondary">99.8%</div>
            <div className="stat-label">Client Retention & Satisfaction</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-number text-gradient">15+</div>
            <div className="stat-label">Senior Tech Specialists</div>
          </div>
          <div className="glass-card stat-card">
            <div className="stat-number text-gradient-secondary">&lt; 24h</div>
            <div className="stat-label">Discovery & Quote Turnaround</div>
          </div>
        </div>
      </div>
    </section>
  );
}
