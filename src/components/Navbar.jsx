import React, { useState } from 'react';
import { Sun, Moon, Zap, PlusCircle, Menu, X, Calculator, LogIn, LogOut, Shield, User } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/Navbar.css';

export default function Navbar({ theme, toggleTheme, currency, setCurrency, onOpenAddProject }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user, isAdmin, logout, setIsAuthModalOpen } = useAuth();

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
  };

  const handleAddProjectClick = () => {
    if (!isAdmin) {
      alert('Access Denied: Only authenticated Admin users can add portfolio projects. Please sign in as Admin.');
      setIsAuthModalOpen(true);
      return;
    }
    onOpenAddProject();
  };

  return (
    <header className="navbar">
      <div className="container navbar-inner">
        {/* Brand Logo */}
        <a href="#" className="brand-logo">
          <div className="brand-icon">
            <Zap size={22} />
          </div>
          <span>CODEXA<span className="text-gradient">.</span></span>
        </a>

        {/* Desktop Nav Items */}
        <nav className={`nav-menu ${mobileMenuOpen ? 'open' : ''}`}>
          <a href="#services" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Services</a>
          <a href="#estimator" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Cost Calculator</a>
          <a href="#portfolio" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Portfolio</a>
          <a href="#process" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Workflow</a>
          <a href="#tech-stack" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Tech Stack</a>
          <a href="#contact" className="nav-link" onClick={() => setMobileMenuOpen(false)}>Contact</a>
        </nav>

        {/* Action Controls */}
        <div className="nav-actions">
          {/* Currency Switcher */}
          <select 
            className="currency-select" 
            value={currency} 
            onChange={handleCurrencyChange}
            title="Change Currency"
          >
            <option value="USD">$ USD</option>
            <option value="EUR">€ EUR</option>
            <option value="GBP">£ GBP</option>
            <option value="INR">₹ INR</option>
          </select>

          {/* Theme Switcher */}
          <button 
            className="theme-toggle-btn" 
            onClick={toggleTheme} 
            title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`}
          >
            {theme === 'dark' ? <Sun size={18} /> : <Moon size={18} />}
          </button>

          {/* Admin Add Project Button (Protected) */}
          {isAdmin ? (
            <button 
              className="admin-badge-btn" 
              onClick={handleAddProjectClick} 
              title="Admin: Manually add project to showcase"
            >
              <PlusCircle size={16} />
              <span>+ Add Project</span>
            </button>
          ) : (
            <button 
              className="admin-badge-btn" 
              style={{ opacity: 0.7 }}
              onClick={handleAddProjectClick}
              title="Admin Privilege Required"
            >
              <Shield size={14} />
              <span>Admin Portal</span>
            </button>
          )}

          {/* User Auth Profile / Login Button */}
          {user ? (
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <div 
                style={{ 
                  display: 'flex', 
                  alignItems: 'center', 
                  gap: '0.4rem', 
                  padding: '0.35rem 0.75rem', 
                  background: 'var(--bg-card)', 
                  border: '1px solid var(--border-color)', 
                  borderRadius: 'var(--radius-full)',
                  fontSize: '0.85rem'
                }}
              >
                <img 
                  src={user.avatar} 
                  alt={user.name} 
                  style={{ width: 22, height: 22, borderRadius: '50%', objectFit: 'cover' }} 
                />
                <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>
                  {user.name.split(' ')[0]} {isAdmin && <span style={{ color: 'var(--accent-cyan)', fontSize: '0.75rem' }}>(Admin)</span>}
                </span>
              </div>
              <button 
                className="theme-toggle-btn" 
                onClick={logout} 
                title="Sign Out" 
                style={{ width: 34, height: 34 }}
              >
                <LogOut size={16} color="var(--accent-magenta)" />
              </button>
            </div>
          ) : (
            <button 
              className="btn btn-secondary btn-sm" 
              onClick={() => setIsAuthModalOpen(true)}
            >
              <LogIn size={15} />
              <span>Sign In</span>
            </button>
          )}

          {/* Mobile Menu Toggle */}
          <button 
            className="mobile-toggle" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>
    </header>
  );
}

