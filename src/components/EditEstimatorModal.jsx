import React, { useState, useEffect } from 'react';
import { X, Sliders, CheckCircle2, DollarSign } from 'lucide-react';
import '../styles/AdminModal.css';

export default function EditEstimatorModal({ isOpen, estimatorConfig, onClose, onSaveConfig }) {
  const [webPrice, setWebPrice] = useState(2400);
  const [mobilePrice, setMobilePrice] = useState(3200);
  const [ecomPrice, setEcomPrice] = useState(2800);
  const [aiPrice, setAiPrice] = useState(3000);
  const [fullPrice, setFullPrice] = useState(5500);

  const [authPrice, setAuthPrice] = useState(400);
  const [paymentsPrice, setPaymentsPrice] = useState(500);
  const [adminPrice, setAdminPrice] = useState(650);
  const [aiFeaturePrice, setAiFeaturePrice] = useState(800);

  useEffect(() => {
    if (estimatorConfig) {
      if (estimatorConfig.platforms) {
        setWebPrice(estimatorConfig.platforms['web-app'] || 2400);
        setMobilePrice(estimatorConfig.platforms['mobile-app'] || 3200);
        setEcomPrice(estimatorConfig.platforms['ecommerce'] || 2800);
        setAiPrice(estimatorConfig.platforms['ai-automation'] || 3000);
        setFullPrice(estimatorConfig.platforms['full-platform'] || 5500);
      }
      if (estimatorConfig.features) {
        setAuthPrice(estimatorConfig.features['auth'] || 400);
        setPaymentsPrice(estimatorConfig.features['payments'] || 500);
        setAdminPrice(estimatorConfig.features['admin'] || 650);
        setAiFeaturePrice(estimatorConfig.features['ai'] || 800);
      }
    }
  }, [estimatorConfig]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveConfig({
      platforms: {
        'web-app': Number(webPrice),
        'mobile-app': Number(mobilePrice),
        'ecommerce': Number(ecomPrice),
        'ai-automation': Number(aiPrice),
        'full-platform': Number(fullPrice)
      },
      features: {
        'auth': Number(authPrice),
        'payments': Number(paymentsPrice),
        'admin': Number(adminPrice),
        'ai': Number(aiFeaturePrice)
      }
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '620px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="admin-modal-title">
          <Sliders size={22} color="var(--accent-cyan)" />
          <span>Admin: Cost Calculator Pricing Matrix</span>
        </div>
        <p className="admin-modal-subtitle">
          Manually adjust platform starting rates and add-on module costs used in client estimates.
        </p>

        <form onSubmit={handleSubmit}>
          <h4 style={{ color: 'var(--accent-cyan)', marginBottom: '0.75rem', fontSize: '0.95rem' }}>1. Platform Starting Rates (USD $)</h4>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Web Application</label>
              <input type="number" className="form-input" value={webPrice} onChange={(e) => setWebPrice(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Mobile App (iOS/Android)</label>
              <input type="number" className="form-input" value={mobilePrice} onChange={(e) => setMobilePrice(e.target.value)} required />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">E-Commerce Storefront</label>
              <input type="number" className="form-input" value={ecomPrice} onChange={(e) => setEcomPrice(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">AI & Bot Integration</label>
              <input type="number" className="form-input" value={aiPrice} onChange={(e) => setAiPrice(e.target.value)} required />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Full Web + Mobile Suite</label>
            <input type="number" className="form-input" value={fullPrice} onChange={(e) => setFullPrice(e.target.value)} required />
          </div>

          <h4 style={{ color: 'var(--accent-purple)', margin: '1.25rem 0 0.75rem 0', fontSize: '0.95rem' }}>2. Add-On Feature Module Rates (USD $)</h4>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">User Auth & Roles</label>
              <input type="number" className="form-input" value={authPrice} onChange={(e) => setAuthPrice(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">Stripe Payments</label>
              <input type="number" className="form-input" value={paymentsPrice} onChange={(e) => setPaymentsPrice(e.target.value)} required />
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Admin Dashboard</label>
              <input type="number" className="form-input" value={adminPrice} onChange={(e) => setAdminPrice(e.target.value)} required />
            </div>
            <div className="form-group">
              <label className="form-label">OpenAI / LLM Module</label>
              <input type="number" className="form-input" value={aiFeaturePrice} onChange={(e) => setAiFeaturePrice(e.target.value)} required />
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>Save Calculator Matrix</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
