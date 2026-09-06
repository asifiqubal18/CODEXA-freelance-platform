import React, { useState } from 'react';
import { Briefcase, ExternalLink, PlusCircle, Trash2, Award, ArrowUpRight, Filter } from 'lucide-react';
import ProjectModal from './ProjectModal';
import '../styles/Portfolio.css';

export default function PortfolioSection({ projects, onOpenAddProject, onDeleteProject }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalProject, setActiveModalProject] = useState(null);

  const categories = ['All', 'Web Development', 'Mobile App Development', 'UI/UX Design', 'AI & Automation'];

  const filteredProjects = selectedCategory === 'All'
    ? projects
    : projects.filter(p => p.category === selectedCategory);

  return (
    <section id="portfolio" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Briefcase size={14} />
            <span>Proven Track Record</span>
          </div>
          <h2 className="section-title">
            Featured Projects & Client <br />
            <span className="text-gradient">Case Studies</span>
          </h2>
          <p className="section-subtitle">
            Explore our recent client deliverables across mobile applications, web platforms, and automated cloud workflows.
          </p>
        </div>

        {/* Filter Bar & Admin Add Project Action */}
        <div className="portfolio-filter-row">
          <div className="services-filter-bar" style={{ marginBottom: 0 }}>
            {categories.map((cat) => (
              <button
                key={cat}
                className={`filter-btn ${selectedCategory === cat ? 'active' : ''}`}
                onClick={() => setSelectedCategory(cat)}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Admin Manual Project Trigger */}
          <button className="admin-badge-btn" onClick={onOpenAddProject}>
            <PlusCircle size={16} />
            <span>+ Add Project to Client Showcase</span>
          </button>
        </div>

        {/* Portfolio Grid */}
        <div className="grid-3">
          {filteredProjects.map((proj) => (
            <div key={proj.id} className="glass-card portfolio-card">
              <div className="portfolio-image-wrapper">
                <img src={proj.image} alt={proj.title} className="portfolio-image" />
                <span className="portfolio-badge-category">{proj.category}</span>
                {proj.isCustomAdded && (
                  <span className="portfolio-badge-custom">Added by Admin</span>
                )}
              </div>

              <div className="portfolio-body">
                <div className="portfolio-client-name">{proj.client}</div>
                <h3 className="portfolio-title">{proj.title}</h3>
                <p className="portfolio-desc">{proj.description}</p>

                {proj.metrics && (
                  <div className="portfolio-metrics-pill">
                    <Award size={14} />
                    <span>{proj.metrics}</span>
                  </div>
                )}

                {/* Tags */}
                <div className="portfolio-tags">
                  {proj.tags.map((tag, idx) => (
                    <span key={idx} className="tech-tag-mini">{tag}</span>
                  ))}
                </div>

                {/* Actions */}
                <div className="portfolio-actions">
                  <button 
                    className="btn btn-secondary btn-sm" 
                    style={{ flexGrow: 1 }}
                    onClick={() => setActiveModalProject(proj)}
                  >
                    <span>Read Case Study</span>
                    <ArrowUpRight size={14} />
                  </button>

                  {proj.isCustomAdded && (
                    <button 
                      className="btn btn-outline btn-sm" 
                      style={{ borderColor: 'rgba(255, 0, 122, 0.4)', color: 'var(--accent-magenta)' }}
                      onClick={() => onDeleteProject(proj.id)}
                      title="Remove Custom Project"
                    >
                      <Trash2 size={14} />
                    </button>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Case Study Detail Modal */}
        {activeModalProject && (
          <ProjectModal 
            project={activeModalProject} 
            onClose={() => setActiveModalProject(null)} 
          />
        )}
      </div>
    </section>
  );
}
