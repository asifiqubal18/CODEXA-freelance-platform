import React, { useState, useEffect } from 'react';
import { X, Edit3, CheckCircle2, DollarSign, Clock, Sparkles } from 'lucide-react';
import '../styles/AdminModal.css';

export default function EditServiceModal({ isOpen, service, onClose, onSaveService }) {
  const [title, setTitle] = useState('');
  const [basePriceUSD, setBasePriceUSD] = useState(2499);
  const [timeline, setTimeline] = useState('');
  const [shortDesc, setShortDesc] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  useEffect(() => {
    if (service) {
      setTitle(service.title || '');
      setBasePriceUSD(service.basePriceUSD || 2000);
      setTimeline(service.timeline || '');
      setShortDesc(service.shortDesc || '');
    }
  }, [service]);

  if (!isOpen || !service) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    const updatedService = {
      ...service,
      title,
      basePriceUSD: Number(basePriceUSD),
      timeline,
      shortDesc
    };

    onSaveService(updatedService);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '540px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="admin-modal-title">
          <Edit3 size={22} color="var(--accent-cyan)" />
          <span>Admin: Edit Service Price & Scope</span>
        </div>
        <p className="admin-modal-subtitle">
          Update the starting base rate (USD), timeline, or description for <strong>{service.category}</strong>.
        </p>

        {showSuccessToast && (
          <div className="toast-success">
            <CheckCircle2 size={18} />
            <span>Service price & details updated successfully!</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Service Title</label>
            <input 
              type="text" 
              className="form-input" 
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              required 
            />
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Base Price (USD $)</label>
              <input 
                type="number" 
                className="form-input" 
                value={basePriceUSD} 
                onChange={(e) => setBasePriceUSD(e.target.value)} 
                min="100" 
                step="50" 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Est. Timeline</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. 2-4 Weeks" 
                value={timeline} 
                onChange={(e) => setTimeline(e.target.value)} 
                required 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Service Description</label>
            <textarea 
              className="form-textarea" 
              value={shortDesc} 
              onChange={(e) => setShortDesc(e.target.value)} 
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>Save & Publish Changes</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
