import React, { useState, useEffect } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Clock, Calendar, Sparkles, Edit3 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { submitInquiryToDB } from '../lib/dataService';
import '../styles/Contact.css';

export default function ContactSection({ contactInfo, selectedService, prefilledEstimate, onEditContact }) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [serviceType, setServiceType] = useState('Web Development');
  const [budgetRange, setBudgetRange] = useState('$5k - $10k');
  const [message, setMessage] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const { isAdmin } = useAuth();

  useEffect(() => {
    if (selectedService) {
      setServiceType(selectedService.category);
      setMessage(`Interested in: ${selectedService.title}\nEst. Timeline: ${selectedService.timeline}`);
    }
  }, [selectedService]);

  useEffect(() => {
    if (prefilledEstimate) {
      setServiceType(prefilledEstimate.platform);
      setMessage(`Calculator Estimate: ${prefilledEstimate.estimatedPrice}\nEst. Duration: ~${prefilledEstimate.estimatedDays} days\nDesign Tier: ${prefilledEstimate.design}`);
    }
  }, [prefilledEstimate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitted(true);

    await submitInquiryToDB({
      name,
      email,
      serviceType,
      budgetRange,
      message
    });
  };


  const info = contactInfo || {
    email: 'hello@codexa.io',
    phone: '+1 (800) 555-CODEXA',
    guarantee: 'Within 4 Business Hours',
    availability: 'Available for Q3/Q4 Project Bookings'
  };

  return (
    <section id="contact" className="section">
      <div className="container">
        <div className="section-header">
          <div className="section-tag">
            <Mail size={14} />
            <span>Get In Touch</span>
          </div>
          <h2 className="section-title">
            Let's Build Something <br />
            <span className="text-gradient">Extraordinary Together</span>
          </h2>
          <p className="section-subtitle">
            Have a project in mind? Send us a message or schedule a 30-minute discovery call with our tech lead.
          </p>
        </div>

        <div className="contact-grid">
          {/* Left Info Card */}
          <div className="glass-card contact-info-card" style={{ position: 'relative' }}>
            {isAdmin && (
              <button 
                className="btn btn-outline btn-sm" 
                style={{ position: 'absolute', top: '1.5rem', right: '1.5rem', fontSize: '0.8rem', borderColor: 'var(--accent-purple)', color: 'var(--accent-purple)' }}
                onClick={onEditContact}
                title="Admin: Edit Contact Details"
              >
                <Edit3 size={13} />
                <span>Edit Contact</span>
              </button>
            )}

            <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '1rem' }}>
              CODEXA Studio
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', marginBottom: '2rem', lineHeight: 1.6 }}>
              We collaborate with founders, product leads, and growth teams globally to engineer high-impact digital solutions.
            </p>

            <div className="contact-method-item">
              <div className="contact-icon-box">
                <Mail size={20} />
              </div>
              <div>
                <div className="contact-method-title">Direct Email</div>
                <div className="contact-method-detail">{info.email}</div>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon-box">
                <Phone size={20} />
              </div>
              <div>
                <div className="contact-method-title">Call / WhatsApp</div>
                <div className="contact-method-detail">{info.phone}</div>
              </div>
            </div>

            <div className="contact-method-item">
              <div className="contact-icon-box">
                <Clock size={20} />
              </div>
              <div>
                <div className="contact-method-title">Response Guarantee</div>
                <div className="contact-method-detail">{info.guarantee}</div>
              </div>
            </div>

            <div style={{ marginTop: 'auto', paddingTop: '1.5rem', borderTop: '1px solid var(--border-color)' }}>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Calendar size={16} color="var(--accent-emerald)" />
                <span>{info.availability}</span>
              </div>
            </div>
          </div>


          {/* Right Form */}
          <div className="glass-card" style={{ padding: '2.5rem' }}>
            {submitted ? (
              <div style={{ textAlign: 'center', padding: '3rem 1rem' }}>
                <CheckCircle2 size={56} color="var(--accent-emerald)" style={{ marginBottom: '1rem' }} />
                <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem' }}>
                  Inquiry Received!
                </h3>
                <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
                  Thank you for reaching out to CODEXA. Our team has received your project details and will email you an official proposal scope within 4 hours.
                </p>
                <button className="btn btn-secondary" onClick={() => setSubmitted(false)}>
                  Send Another Inquiry
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Your Name *</label>
                    <input 
                      type="text" 
                      className="form-input" 
                      placeholder="John Doe" 
                      value={name} 
                      onChange={(e) => setName(e.target.value)} 
                      required 
                    />
                  </div>

                  <div className="form-group">
                    <label className="form-label">Email Address *</label>
                    <input 
                      type="email" 
                      className="form-input" 
                      placeholder="john@company.com" 
                      value={email} 
                      onChange={(e) => setEmail(e.target.value)} 
                      required 
                    />
                  </div>
                </div>

                <div className="form-row-2">
                  <div className="form-group">
                    <label className="form-label">Service Type</label>
                    <select 
                      className="form-select" 
                      value={serviceType} 
                      onChange={(e) => setServiceType(e.target.value)}
                    >
                      <option value="Web Development">Web Development</option>
                      <option value="Mobile App Development">Mobile App Development</option>
                      <option value="UI/UX Design">UI/UX Design</option>
                      <option value="AI & Automation">AI & Automation</option>
                      <option value="Cloud Architecture">Cloud Architecture</option>
                    </select>
                  </div>

                  <div className="form-group">
                    <label className="form-label">Budget Range</label>
                    <div className="budget-pills-row">
                      {['$2k-$5k', '$5k-$10k', '$10k-$25k', '$25k+'].map((b) => (
                        <div 
                          key={b} 
                          className={`budget-pill ${budgetRange === b ? 'selected' : ''}`}
                          onClick={() => setBudgetRange(b)}
                        >
                          {b}
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Project Details / Goals *</label>
                  <textarea 
                    className="form-textarea" 
                    placeholder="Tell us about your product goals, timeline, and key requirements..." 
                    value={message} 
                    onChange={(e) => setMessage(e.target.value)} 
                    required 
                  />
                </div>

                <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
                  <Send size={18} />
                  <span>Submit Inquiry & Book Call</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
