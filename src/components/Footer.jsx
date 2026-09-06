import React from 'react';
import { Zap, Send, Github, Twitter, Linkedin, Heart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Footer.css';

export default function Footer({ onOpenAddProject }) {
  const { isAdmin, setIsAuthModalOpen } = useAuth();

  const handleAddClick = () => {
    if (!isAdmin) {
      alert('Access Denied: Only authenticated Admin users can add portfolio projects. Please sign in as Admin.');
      setIsAuthModalOpen(true);
      return;
    }
    onOpenAddProject();
  };

  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          {/* Brand Info */}
          <div>
            <div className="footer-brand-title">
              CODEXA<span className="text-gradient">.</span>
            </div>
            <p className="footer-text">
              High-performance web applications, native & cross-platform mobile apps, cloud architecture, and custom AI engineering solutions.
            </p>
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              <a href="#" className="btn btn-secondary btn-sm" style={{ padding: '0.5rem' }} title="GitHub">
                <Github size={16} />
              </a>
              <a href="#" className="btn btn-secondary btn-sm" style={{ padding: '0.5rem' }} title="Twitter">
                <Twitter size={16} />
              </a>
              <a href="#" className="btn btn-secondary btn-sm" style={{ padding: '0.5rem' }} title="LinkedIn">
                <Linkedin size={16} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="footer-heading">Services</h4>
            <ul className="footer-links-list">
              <li><a href="#services">Full-Stack Web Engineering</a></li>
              <li><a href="#services">iOS & Android App Dev</a></li>
              <li><a href="#services">UI/UX Product Design</a></li>
              <li><a href="#services">AI Agent Integration</a></li>
              <li><a href="#services">AWS Cloud & DevOps</a></li>
            </ul>
          </div>

          {/* Platform Navigation */}
          <div>
            <h4 className="footer-heading">Platform</h4>
            <ul className="footer-links-list">
              <li><a href="#estimator">Cost Calculator</a></li>
              <li><a href="#portfolio">Client Portfolio</a></li>
              <li><a href="#process">Agile Workflow</a></li>
              <li><a href="#tech-stack">Tech Stack</a></li>
              <li>
                <button 
                  onClick={handleAddClick} 
                  style={{ background: 'none', border: 'none', color: isAdmin ? 'var(--accent-purple)' : 'var(--text-muted)', cursor: 'pointer', fontSize: '0.9rem', textAlign: 'left', fontWeight: 600 }}
                >
                  {isAdmin ? '+ Add Project (Admin)' : 'Admin Portal'}
                </button>
              </li>
            </ul>
          </div>


          {/* Newsletter / Contact */}
          <div>
            <h4 className="footer-heading">Stay Informed</h4>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Subscribe for technical insights, modern UI patterns, and case studies.
            </p>
            <form onSubmit={(e) => { e.preventDefault(); alert('Subscribed to CODEXA Insights!'); }} style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="email" 
                placeholder="email@company.com" 
                className="chat-input" 
                required 
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Send size={14} />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="footer-bottom-bar">
          <div>
            © {new Date().getFullYear()} CODEXA Digital Engineering Studio. All rights reserved.
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--accent-emerald)' }}>
            <span className="pulse-dot" style={{ width: 8, height: 8 }}></span>
            <span>All Systems Operational — Accepting New Projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
