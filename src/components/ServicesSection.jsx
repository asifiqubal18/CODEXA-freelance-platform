import React, { useState } from 'react';
import { Globe, Smartphone, Figma, Cpu, Cloud, Check, ArrowRight, Sparkles, Clock } from 'lucide-react';
import { servicesData } from '../data/servicesData';
import '../styles/Services.css';

const ICON_MAP = {
  Globe: Globe,
  Smartphone: Smartphone,
  Figma: Figma,
  Cpu: Cpu,
  Cloud: Cloud
};

export const formatCurrency = (amountUSD, currencyCode) => {
  switch (currencyCode) {
    case 'EUR':
      return `€${Math.round(amountUSD * 0.92).toLocaleString()}`;
    case 'GBP':
      return `£${Math.round(amountUSD * 0.79).toLocaleString()}`;
    case 'INR':
      return `₹${Math.round(amountUSD * 83.5).toLocaleString()}`;
    default:
      return `$${amountUSD.toLocaleString()}`;
  }
};

export default function ServicesSection({ currency, onSelectService }) {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeModalService, setActiveModalService] = useState(null);

  const categories = ['All', 'Web Development', 'Mobile App Development', 'UI/UX Design', 'AI & Automation', 'Cloud Architecture'];

  const filteredServices = selectedCategory === 'All' 
    ? servicesData 
    : servicesData.filter(s => s.category === selectedCategory);

  return (
    <section id="services" className="section">
      <div className="container">
        {/* Header */}
        <div className="section-header">
          <div className="section-tag">
            <Sparkles size={14} />
            <span>Our Core Expertise</span>
          </div>
          <h2 className="section-title">
            Tailored Engineering Services <br />
            <span className="text-gradient">For Modern Digital Products</span>
          </h2>
          <p className="section-subtitle">
            From concept to production release, we bring elite software engineering, intuitive product design, and automated backend infrastructure to your projects.
          </p>
        </div>

        {/* Filter Categories */}
        <div className="services-filter-bar">
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

        {/* Services Grid */}
        <div className="grid-3">
          {filteredServices.map((service) => {
            const IconComponent = ICON_MAP[service.iconName] || Globe;
            return (
              <div key={service.id} className="glass-card service-card">
                {service.popular && (
                  <span className="service-badge-popular">Popular</span>
                )}
                
                <div className="service-icon-wrapper">
                  <IconComponent size={28} />
                </div>

                <h3 className="service-title">{service.title}</h3>
                <p className="service-desc">{service.shortDesc}</p>

                {/* Tech Stack Pills */}
                <div className="service-tech-tags">
                  {service.techStack.slice(0, 4).map((tech, idx) => (
                    <span key={idx} className="tech-tag-mini">{tech}</span>
                  ))}
                  {service.techStack.length > 4 && (
                    <span className="tech-tag-mini">+{service.techStack.length - 4} more</span>
                  )}
                </div>

                {/* Features list */}
                <ul className="service-features-list">
                  {service.features.slice(0, 4).map((feat, idx) => (
                    <li key={idx} className="service-feature-item">
                      <Check size={16} />
                      <span>{feat}</span>
                    </li>
                  ))}
                </ul>

                {/* Pricing row */}
                <div className="service-pricing-row">
                  <div>
                    <div className="service-price-label">Starting From</div>
                    <div className="service-price-amount">
                      {formatCurrency(service.basePriceUSD, currency)}
                    </div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div className="service-price-label">Est. Timeline</div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <Clock size={14} /> {service.timeline}
                    </div>
                  </div>
                </div>

                {/* Action CTA */}
                <button 
                  className="btn btn-secondary" 
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={() => onSelectService(service)}
                >
                  <span>Book This Service</span>
                  <ArrowRight size={16} />
                </button>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
