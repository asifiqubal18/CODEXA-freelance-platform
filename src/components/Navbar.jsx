import React, { useState } from 'react';
import { Sun, Moon, Zap, PlusCircle, Menu, X, DollarSign, Calculator } from 'lucide-react';
import '../styles/Navbar.css';

export default function Navbar({ theme, toggleTheme, currency, setCurrency, onOpenAddProject }) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCurrencyChange = (e) => {
    setCurrency(e.target.value);
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

          {/* Admin Add Project Button */}
          <button 
            className="admin-badge-btn" 
            onClick={onOpenAddProject} 
            title="Admin: Manually add a project to client showcase"
          >
            <PlusCircle size={16} />
            <span>Add Project</span>
          </button>

          {/* CTA Link */}
          <a href="#estimator" className="btn btn-primary btn-sm">
            <Calculator size={15} />
            <span>Estimate</span>
          </a>

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
