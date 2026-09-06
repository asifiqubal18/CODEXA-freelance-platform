import React, { useState } from 'react';
import { Calculator, CheckSquare, Square, Clock, ShieldCheck, Send, Sparkles, Sliders, Edit3 } from 'lucide-react';
import { formatCurrency } from './ServicesSection';
import { useAuth } from '../context/AuthContext';
import '../styles/Estimator.css';

export default function ProjectEstimator({ currency, estimatorConfig, onBookEstimate, onEditEstimatorClick }) {
  // State options
  const [platform, setPlatform] = useState('web-app');
  const [designLevel, setDesignLevel] = useState('premium');
  const [selectedFeatures, setSelectedFeatures] = useState(['auth', 'payments', 'admin']);
  const [urgency, setUrgency] = useState('standard');
  const { isAdmin } = useAuth();

  const cfgPlatforms = estimatorConfig?.platforms || {};
  const cfgFeatures = estimatorConfig?.features || {};

  const platforms = [
    { id: 'web-app', name: 'Web Application', basePrice: cfgPlatforms['web-app'] || 2400, days: 18, desc: 'React/Next.js dynamic web platform' },
    { id: 'mobile-app', name: 'Mobile App (iOS/Android)', basePrice: cfgPlatforms['mobile-app'] || 3200, days: 25, desc: 'React Native or Flutter mobile application' },
    { id: 'ecommerce', name: 'E-Commerce Storefront', basePrice: cfgPlatforms['ecommerce'] || 2800, days: 20, desc: 'Headless storefront with Stripe integration' },
    { id: 'ai-automation', name: 'AI & Bot Integration', basePrice: cfgPlatforms['ai-automation'] || 3000, days: 21, desc: 'Custom OpenAI/LLM bot & RAG system' },
    { id: 'full-platform', name: 'Full Web + Mobile Suite', basePrice: cfgPlatforms['full-platform'] || 5500, days: 38, desc: 'Complete web portal + mobile app ecosystem' }
  ];

  const designLevels = [
    { id: 'standard', name: 'Clean Standard UI', multiplier: 1.0, desc: 'Modern responsive design' },
    { id: 'premium', name: 'Custom Premium UI/UX', multiplier: 1.25, desc: 'Bespoke Figma design & micro-animations' },
    { id: 'deluxe', name: 'Luxury 3D & Interactive', multiplier: 1.5, desc: 'WebGL/Three.js interactive web design' }
  ];

  const featuresList = [
    { id: 'auth', name: 'User Auth & Role Management', price: cfgFeatures['auth'] || 400 },
    { id: 'payments', name: 'Payment Gateway (Stripe/PayPal)', price: cfgFeatures['payments'] || 500 },
    { id: 'admin', name: 'CMS & Admin Dashboard', price: cfgFeatures['admin'] || 650 },
    { id: 'realtime', name: 'Real-time Chat & WebSockets', price: 600 },
    { id: 'ai', name: 'OpenAI / LLM Bot Features', price: cfgFeatures['ai'] || 800 },
    { id: 'cloud', name: 'AWS Cloud & Automated CI/CD', price: 550 },
    { id: 'seo', name: 'Advanced SEO & Analytics', price: 350 },
    { id: 'multi-lang', name: 'Multi-Language Localization', price: 400 }
  ];


  const urgencyLevels = [
    { id: 'standard', name: 'Standard Timeline', multiplier: 1.0, label: 'Normal Pace' },
    { id: 'fast', name: 'Fast Track (2x Team)', multiplier: 1.25, label: '+25% Priority' },
    { id: 'rush', name: 'Rush Emergency Sprint', multiplier: 1.5, label: '+50% Urgent' }
  ];

  // Toggle Feature
  const toggleFeature = (id) => {
    if (selectedFeatures.includes(id)) {
      setSelectedFeatures(selectedFeatures.filter(f => f !== id));
    } else {
      setSelectedFeatures([...selectedFeatures, id]);
    }
  };

  // Calculation Logic
  const selectedPlatformObj = platforms.find(p => p.id === platform) || platforms[0];
  const selectedDesignObj = designLevels.find(d => d.id === designLevel) || designLevels[1];
  const selectedUrgencyObj = urgencyLevels.find(u => u.id === urgency) || urgencyLevels[0];

  const featuresTotal = selectedFeatures.reduce((acc, featId) => {
    const f = featuresList.find(item => item.id === featId);
    return acc + (f ? f.price : 0);
  }, 0);

  const rawBase = (selectedPlatformObj.basePrice + featuresTotal) * selectedDesignObj.multiplier;
  const finalPriceUSD = Math.round(rawBase * selectedUrgencyObj.multiplier);

  const baseDays = selectedPlatformObj.days;
  const calculatedDays = Math.round(baseDays / selectedUrgencyObj.multiplier);

  const handleBookClick = () => {
    onBookEstimate({
      platform: selectedPlatformObj.name,
      design: selectedDesignObj.name,
      featuresCount: selectedFeatures.length,
      estimatedPrice: formatCurrency(finalPriceUSD, currency),
      estimatedDays: calculatedDays
    });
  };

  return (
    <section id="estimator" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Calculator size={14} />
            <span>Interactive Cost Calculator</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1rem', flexWrap: 'wrap' }}>
            <h2 className="section-title" style={{ margin: 0 }}>
              Calculate Your Project Estimate <br />
              <span className="text-gradient">In Seconds</span>
            </h2>
          </div>
          <p className="section-subtitle" style={{ marginTop: '1rem' }}>
            Customize project scope, features, design level, and urgency to get an instant cost and timeline estimate.
          </p>
          {isAdmin && (
            <div style={{ marginTop: '1.25rem' }}>
              <button 
                className="admin-badge-btn" 
                onClick={onEditEstimatorClick}
                title="Admin: Edit Platform & Feature Rates"
              >
                <Edit3 size={15} />
                <span>Admin: Edit Pricing Matrix</span>
              </button>
            </div>
          )}
        </div>


        <div className="estimator-card glass-card">
          <div className="estimator-grid">
            {/* Left Controls */}
            <div className="estimator-steps">
              {/* Step 1: Select Platform */}
              <div>
                <div className="step-group-title">
                  <Sliders size={18} color="var(--accent-cyan)" />
                  <span>1. Select Platform & Product Type</span>
                </div>
                <div className="option-cards-grid">
                  {platforms.map(p => (
                    <div 
                      key={p.id} 
                      className={`option-card ${platform === p.id ? 'selected' : ''}`}
                      onClick={() => setPlatform(p.id)}
                    >
                      <div className="option-title">{p.name}</div>
                      <div className="option-subtitle">{p.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 2: Select Design Level */}
              <div>
                <div className="step-group-title">
                  <Sparkles size={18} color="var(--accent-purple)" />
                  <span>2. Choose UI/UX Design Level</span>
                </div>
                <div className="option-cards-grid">
                  {designLevels.map(d => (
                    <div 
                      key={d.id} 
                      className={`option-card ${designLevel === d.id ? 'selected' : ''}`}
                      onClick={() => setDesignLevel(d.id)}
                    >
                      <div className="option-title">{d.name}</div>
                      <div className="option-subtitle">{d.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Step 3: Add Features */}
              <div>
                <div className="step-group-title">
                  <CheckSquare size={18} color="var(--accent-emerald)" />
                  <span>3. Include Key Features & Integrations</span>
                </div>
                <div className="features-checkbox-grid">
                  {featuresList.map(f => {
                    const isChecked = selectedFeatures.includes(f.id);
                    return (
                      <div 
                        key={f.id} 
                        className={`checkbox-card ${isChecked ? 'selected' : ''}`}
                        onClick={() => toggleFeature(f.id)}
                      >
                        {isChecked ? <CheckSquare size={18} color="var(--accent-purple)" /> : <Square size={18} color="var(--text-muted)" />}
                        <span>{f.name}</span>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Step 4: Urgency */}
              <div>
                <div className="step-group-title">
                  <Clock size={18} color="var(--accent-magenta)" />
                  <span>4. Delivery Urgency</span>
                </div>
                <div className="option-cards-grid">
                  {urgencyLevels.map(u => (
                    <div 
                      key={u.id} 
                      className={`option-card ${urgency === u.id ? 'selected' : ''}`}
                      onClick={() => setUrgency(u.id)}
                    >
                      <div className="option-title">{u.name}</div>
                      <div className="option-subtitle">{u.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Summary Box */}
            <div>
              <div className="estimator-summary-box">
                <div className="summary-header">
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Estimated Cost</div>
                  <div className="summary-price-display text-gradient">
                    {formatCurrency(finalPriceUSD, currency)}
                  </div>
                </div>

                <div className="summary-details-list">
                  <div className="summary-item">
                    <span className="summary-label">Selected Platform:</span>
                    <span className="summary-value">{selectedPlatformObj.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Design Tier:</span>
                    <span className="summary-value">{selectedDesignObj.name}</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Add-on Features:</span>
                    <span className="summary-value">{selectedFeatures.length} Selected</span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Est. Turnaround:</span>
                    <span className="summary-value" style={{ color: 'var(--accent-cyan)' }}>
                      ~{calculatedDays} Working Days
                    </span>
                  </div>
                  <div className="summary-item">
                    <span className="summary-label">Support Included:</span>
                    <span className="summary-value">30-Day Guarantee</span>
                  </div>
                </div>

                <button 
                  className="btn btn-primary" 
                  style={{ width: '100%', marginTop: 'auto' }}
                  onClick={handleBookClick}
                >
                  <Send size={18} />
                  <span>Lock In Quote & Book Call</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
