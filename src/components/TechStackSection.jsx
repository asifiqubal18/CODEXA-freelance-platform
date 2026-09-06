import React, { useState } from 'react';
import { Cpu, Code2, Smartphone, Database, Cloud, Layers, PlusCircle, Trash2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function TechStackSection({ techItems, onAddTechClick, onDeleteTech }) {
  const [activeTab, setActiveTab] = useState('All');
  const { isAdmin } = useAuth();

  const stackCategories = ['All', 'Frontend', 'Mobile', 'Backend & DB', 'AI & Machine Learning', 'Cloud & DevOps'];

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

        {/* Tab Filters & Admin Add Tech Item */}
        <div className="portfolio-filter-row" style={{ marginBottom: '2.5rem' }}>
          <div className="services-filter-bar" style={{ marginBottom: 0 }}>
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

          {isAdmin && (
            <button className="admin-badge-btn" onClick={onAddTechClick}>
              <PlusCircle size={16} />
              <span>+ Add Tech Item</span>
            </button>
          )}
        </div>

        {/* Tech Grid */}
        <div className="grid-4">
          {filteredTech.map((t, idx) => (
            <div key={idx} className="glass-card" style={{ padding: '1.5rem', textAlign: 'left', position: 'relative' }}>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                  {t.name}
                </h4>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                  <span className="tech-tag-mini" style={{ color: 'var(--accent-cyan)' }}>{t.cat}</span>
                  {isAdmin && (
                    <button 
                      style={{ background: 'none', border: 'none', color: 'var(--accent-magenta)', cursor: 'pointer', padding: '0.2rem' }}
                      onClick={() => onDeleteTech(t.name)}
                      title="Admin: Delete Tech Item"
                    >
                      <Trash2 size={13} />
                    </button>
                  )}
                </div>
              </div>
              <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>{t.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

