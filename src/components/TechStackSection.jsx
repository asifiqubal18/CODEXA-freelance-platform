import React, { useState } from 'react';
import { Cpu, Code2, Smartphone, Database, Cloud, Layers } from 'lucide-react';

export default function TechStackSection() {
  const [activeTab, setActiveTab] = useState('All');

  const stackCategories = ['All', 'Frontend', 'Mobile', 'Backend & DB', 'AI & Machine Learning', 'Cloud & DevOps'];

  const techItems = [
    { name: 'React.js', cat: 'Frontend', level: 'Expert', desc: 'Component architecture & Web Vitals' },
    { name: 'Next.js 14', cat: 'Frontend', level: 'Expert', desc: 'SSR, App Router & Server Actions' },
    { name: 'TypeScript', cat: 'Frontend', level: 'Expert', desc: 'Type-safe enterprise applications' },
    { name: 'React Native', cat: 'Mobile', level: 'Expert', desc: 'Cross-platform native iOS & Android' },
    { name: 'Flutter & Dart', cat: 'Mobile', level: 'Advanced', desc: 'High-performance 60fps mobile UI' },
    { name: 'Swift & Kotlin', cat: 'Mobile', level: 'Advanced', desc: 'Native device hardware modules' },
    { name: 'Node.js & Express', cat: 'Backend & DB', level: 'Expert', desc: 'RESTful & GraphQL microservices' },
    { name: 'Python & FastAPI', cat: 'Backend & DB', level: 'Expert', desc: 'High-speed AI backends & data APIs' },
    { name: 'PostgreSQL & Redis', cat: 'Backend & DB', level: 'Expert', desc: 'Relational data & high-speed caching' },
    { name: 'OpenAI API & GPT-4', cat: 'AI & Machine Learning', level: 'Expert', desc: 'LLM fine-tuning & prompt engineering' },
    { name: 'LangChain & Pinecone', cat: 'AI & Machine Learning', level: 'Advanced', desc: 'RAG vector databases & AI Agents' },
    { name: 'AWS & Serverless', cat: 'Cloud & DevOps', level: 'Expert', desc: 'Lambda, S3, CloudFront & ECS' },
    { name: 'Docker & Kubernetes', cat: 'Cloud & DevOps', level: 'Advanced', desc: 'Microservice containerization' },
    { name: 'GitHub Actions', cat: 'Cloud & DevOps', level: 'Expert', desc: 'Automated CI/CD pipelines' }
  ];

  const filteredTech = activeTab === 'All' 
    ? techItems 
    : techItems.filter(t => t.cat === activeTab);

  return (
    <section id="tech-stack" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Layers size={14} />
            <span>Modern Tech Stack</span>
          </div>
          <h2 className="section-title">
            Engineered With <br />
            <span className="text-gradient">Battle-Tested Technologies</span>
          </h2>
          <p className="section-subtitle">
            We leverage modern frameworks, cloud architectures, and AI toolkits to ensure your product is fast, secure, and future-proof.
          </p>
        </div>

        {/* Tab Filters */}
        <div className="services-filter-bar" style={{ marginBottom: '2.5rem' }}>
          {stackCategories.map((cat) => (
            <button
              key={cat}
              className={`filter-btn ${activeTab === cat ? 'active' : ''}`}
              onClick={() => setActiveTab(cat)}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Tech Grid */}
        <div className="grid-4">
          {filteredTech.map((t, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.5rem', textAlign: 'left' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t.name}
                </h4>
                <span className="tech-tag-mini" style={{ color: 'var(--accent-cyan)' }}>{t.cat}</span>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
