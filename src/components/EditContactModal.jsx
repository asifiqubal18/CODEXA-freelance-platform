import React, { useState, useEffect } from 'react';
import { X, Edit3, CheckCircle2, Mail, Phone, Clock, Calendar } from 'lucide-react';
import '../styles/AdminModal.css';

export default function EditContactModal({ isOpen, contactInfo, onClose, onSaveContact }) {
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [guarantee, setGuarantee] = useState('');
  const [availability, setAvailability] = useState('');

  useEffect(() => {
    if (contactInfo) {
      setEmail(contactInfo.email || 'hello@codexa.io');
      setPhone(contactInfo.phone || '+1 (800) 555-CODEXA');
      setGuarantee(contactInfo.guarantee || 'Within 4 Business Hours');
      setAvailability(contactInfo.availability || 'Available for Q3/Q4 Project Bookings');
    }
  }, [contactInfo]);

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSaveContact({
      email,
      phone,
      guarantee,
      availability
    });
    onClose();
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '520px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="admin-modal-title">
          <Edit3 size={22} color="var(--accent-cyan)" />
          <span>Admin: Edit Contact & Studio Details</span>
        </div>
        <p className="admin-modal-subtitle">
          Update contact information displayed to clients in the contact section.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Direct Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Phone / WhatsApp Number</label>
            <input 
              type="text" 
              className="form-input" 
              value={phone} 
              onChange={(e) => setPhone(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Response Time Guarantee</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Within 4 Business Hours" 
              value={guarantee} 
              onChange={(e) => setGuarantee(e.target.value)} 
              required 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Availability Status Badge</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. Available for Q3/Q4 Project Bookings" 
              value={availability} 
              onChange={(e) => setAvailability(e.target.value)} 
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <CheckCircle2 size={16} />
              <span>Save Contact Info</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
