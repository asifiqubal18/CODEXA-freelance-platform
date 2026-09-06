import React from 'react';
import { X, ExternalLink, Award, Check, Layers, Calendar, UserCheck } from 'lucide-react';

export default function ProjectModal({ project, onClose }) {
  if (!project) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '750px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        {/* Cover image */}
        <div style={{ width: '100%', height: '280px', borderRadius: 'var(--radius-md)', overflow: 'hidden', marginBottom: '1.5rem', position: 'relative' }}>
          <img src={project.image} alt={project.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
          <span className="portfolio-badge-category">{project.category}</span>
        </div>

        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
              Client: <strong style={{ color: 'var(--text-primary)' }}>{project.client}</strong>
            </div>
            <h2 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)' }}>
              {project.title}
            </h2>
          </div>

          {project.liveUrl && project.liveUrl !== '#' && (
            <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">
              <span>View Live Demo</span>
              <ExternalLink size={14} />
            </a>
          )}
        </div>

        {/* Metric banner */}
        {project.metrics && (
          <div style={{ padding: '0.75rem 1rem', background: 'rgba(0, 255, 157, 0.1)', border: '1px solid rgba(0, 255, 157, 0.3)', borderRadius: 'var(--radius-md)', color: 'var(--accent-emerald)', fontSize: '0.9rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem' }}>
            <Award size={18} />
            <span>Key Outcome: {project.metrics}</span>
          </div>
        )}

        {/* Case Description */}
        <div style={{ marginBottom: '1.5rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>Project Overview</h4>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.95rem' }}>
            {project.description}
          </p>
        </div>

        {/* Tech Stack */}
        <div style={{ marginBottom: '2rem' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.75rem' }}>Technologies Used</h4>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
            {project.tags.map((tag, idx) => (
              <span key={idx} className="tech-tag-mini" style={{ padding: '0.35rem 0.8rem', fontSize: '0.85rem', color: 'var(--accent-cyan)', borderColor: 'rgba(0, 240, 255, 0.3)' }}>
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div style={{ display: 'flex', justifyContent: 'flex-end' }}>
          <button className="btn btn-secondary" onClick={onClose}>
            Close Case Study
          </button>
        </div>
      </div>
    </div>
  );
}
