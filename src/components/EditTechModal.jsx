import React, { useState, useEffect } from 'react';
import { X, PlusCircle, CheckCircle2, Layers } from 'lucide-react';
import '../styles/AdminModal.css';

export default function EditTechModal({ isOpen, onClose, onSaveTechItem }) {
  const [name, setName] = useState('');
  const [category, setCategory] = useState('Frontend');
  const [level, setLevel] = useState('Expert');
  const [desc, setDesc] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!name.trim() || !desc.trim()) return;

    onSaveTechItem({
      name,
      cat: category,
      level,
      desc
    });

    setName('');
    setDesc('');
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '500px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="admin-modal-title">
          <Layers size={22} color="var(--accent-cyan)" />
          <span>Admin: Add/Edit Tech Stack Item</span>
        </div>
        <p className="admin-modal-subtitle">
          Add a new technology or framework to your agency's tech stack matrix.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Tech / Framework Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Next.js 14" 
                value={name} 
                onChange={(e) => setName(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Category *</label>
              <select 
                className="form-select" 
                value={category} 
                onChange={(e) => setCategory(e.target.value)}
              >
                <option value="Frontend">Frontend</option>
                <option value="Mobile">Mobile</option>
                <option value="Backend & DB">Backend & DB</option>
                <option value="AI & Machine Learning">AI & Machine Learning</option>
                <option value="Cloud & DevOps">Cloud & DevOps</option>
              </select>
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Proficiency Level</label>
            <select 
              className="form-select" 
              value={level} 
              onChange={(e) => setLevel(e.target.value)}
            >
              <option value="Expert">Expert</option>
              <option value="Advanced">Advanced</option>
              <option value="Intermediate">Intermediate</option>
            </select>
          </div>

          <div className="form-group">
            <label className="form-label">Short Description *</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. SSR, App Router & Server Actions" 
              value={desc} 
              onChange={(e) => setDesc(e.target.value)} 
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={16} />
              <span>Add Tech Item</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
