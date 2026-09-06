import React from 'react';
import { Search, Compass, Code, Rocket, CheckCircle } from 'lucide-react';
import '../styles/Process.css';

export default function ProcessSection() {
  const steps = [
    {
      num: '01',
      icon: Search,
      title: '1. Discovery & Architecture',
      text: 'We analyze your business requirements, define key technical milestones, choose the optimal stack, and map out scalable database schemas.'
    },
    {
      num: '02',
      icon: Compass,
      title: '2. UI/UX Figma Design',
      text: 'Our design team crafts intuitive wireframes, responsive UI components, interactive prototypes, and high-contrast dark/light design systems.'
    },
    {
      num: '03',
      icon: Code,
      title: '3. Agile Engineering',
      text: 'Clean, test-driven code execution with bi-weekly client demo sprints, automated CI/CD staging builds, and real-time project transparency.'
    },
    {
      num: '04',
      icon: Rocket,
      title: '4. QA & Production Release',
      text: 'Rigorous end-to-end security audits, load testing, App Store / Vercel cloud deployment, and 30-day post-launch warranty support.'
    }
  ];

  return (
    <section id="process" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <CheckCircle size={14} />
            <span>How We Build</span>
          </div>
          <h2 className="section-title">
            Our Proven 4-Step <br />
            <span className="text-gradient">Engineering Process</span>
          </h2>
          <p className="section-subtitle">
            A structured agile workflow designed to deliver enterprise-grade web and mobile applications on time and within budget.
          </p>
        </div>

        <div className="process-timeline">
          {steps.map((s, idx) => {
            const IconComp = s.icon;
            return (
              <div key={idx} className="glass-card process-card">
                <span className="process-number">{s.num}</span>
                <div className="process-icon-box">
                  <IconComp size={24} />
                </div>
                <h3 className="process-title">{s.title}</h3>
                <p className="process-text">{s.text}</p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
