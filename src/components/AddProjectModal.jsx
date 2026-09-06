import React, { useState } from 'react';
import { X, PlusCircle, Sparkles, Image, ExternalLink, CheckCircle2, Wand2 } from 'lucide-react';
import '../styles/AdminModal.css';

const PRESET_IMAGES = [
  { label: 'FinTech Mobile', url: 'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=800&q=80' },
  { label: 'SaaS Analytics', url: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80' },
  { label: 'HealthTech App', url: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?auto=format&fit=crop&w=800&q=80' },
  { label: 'E-Commerce Store', url: 'https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80' }
];

export default function AddProjectModal({ isOpen, onClose, onAddProject }) {
  const [title, setTitle] = useState('');
  const [category, setCategory] = useState('Web Development');
  const [client, setClient] = useState('');
  const [tagsInput, setTagsInput] = useState('');
  const [metrics, setMetrics] = useState('');
  const [imageUrl, setImageUrl] = useState(PRESET_IMAGES[0].url);
  const [liveUrl, setLiveUrl] = useState('');
  const [description, setDescription] = useState('');
  const [showSuccessToast, setShowSuccessToast] = useState(false);

  if (!isOpen) return null;

  const handlePreFillSample = () => {
    setTitle('NovaPay - AI Merchant Gateway');
    setCategory('Web Development');
    setClient('Nova Payments Ltd.');
    setTagsInput('React, Next.js, Node.js, OpenAI, Stripe');
    setMetrics('+450% Transaction Speed Boost');
    setImageUrl(PRESET_IMAGES[1].url);
    setLiveUrl('https://novapay-demo.codexa.io');
    setDescription('High-throughput payment gateway with automated AI fraud detection algorithms and multi-currency settlement.');
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title.trim() || !client.trim() || !description.trim()) {
      alert('Please fill out all required project fields.');
      return;
    }

    const tagsArray = tagsInput
      .split(',')
      .map(t => t.trim())
      .filter(t => t.length > 0);

    const newProject = {
      id: `custom-proj-${Date.now()}`,
      title,
      category,
      client,
      description,
      image: imageUrl || PRESET_IMAGES[0].url,
      tags: tagsArray.length > 0 ? tagsArray : ['React', 'Custom Code'],
      metrics: metrics || 'Client Approved Production Build',
      liveUrl: liveUrl || '#',
      featured: true,
      isCustomAdded: true,
      createdAt: new Date().toISOString().split('T')[0]
    };

    onAddProject(newProject);
    setShowSuccessToast(true);

    setTimeout(() => {
      setShowSuccessToast(false);
      // Reset form
      setTitle('');
      setClient('');
      setTagsInput('');
      setMetrics('');
      setDescription('');
      onClose();
    }, 1200);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div className="admin-modal-title">
          <PlusCircle size={22} color="var(--accent-cyan)" />
          <span>Add Custom Portfolio Project</span>
        </div>
        <p className="admin-modal-subtitle">
          Manually register a completed or active client project. It will immediately show up in the client portfolio gallery.
        </p>

        {showSuccessToast && (
          <div className="toast-success">
            <CheckCircle2 size={18} />
            <span>Project successfully added to portfolio showcase!</span>
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Pre-fill Sample Button */}
          <div style={{ marginBottom: '1.25rem', textAlign: 'right' }}>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm" 
              onClick={handlePreFillSample}
              style={{ fontSize: '0.8rem' }}
            >
              <Wand2 size={14} color="var(--accent-cyan)" />
              <span>Auto-Fill Sample Project</span>
            </button>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Project Title *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. ApexPay Mobile Wallet" 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
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
                <option value="Web Development">Web Development</option>
                <option value="Mobile App Development">Mobile App Development</option>
                <option value="UI/UX Design">UI/UX Design</option>
                <option value="AI & Automation">AI & Automation</option>
                <option value="Cloud Architecture">Cloud Architecture</option>
              </select>
            </div>
          </div>

          <div className="form-row-2">
            <div className="form-group">
              <label className="form-label">Client Name *</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. Apex Financial Corp" 
                value={client} 
                onChange={(e) => setClient(e.target.value)} 
                required 
              />
            </div>

            <div className="form-group">
              <label className="form-label">Key Impact / Metric</label>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. +340% Conversions in 30 Days" 
                value={metrics} 
                onChange={(e) => setMetrics(e.target.value)} 
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Tech Stack (comma separated)</label>
            <input 
              type="text" 
              className="form-input" 
              placeholder="e.g. React, Next.js, Node.js, AWS, Tailwind" 
              value={tagsInput} 
              onChange={(e) => setTagsInput(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Cover Image URL</label>
            <input 
              type="url" 
              className="form-input" 
              placeholder="https://..." 
              value={imageUrl} 
              onChange={(e) => setImageUrl(e.target.value)} 
            />
            
            {/* Quick Image Presets */}
            <div className="image-presets-grid">
              {PRESET_IMAGES.map((preset, idx) => (
                <div 
                  key={idx} 
                  className={`preset-thumbnail ${imageUrl === preset.url ? 'selected' : ''}`}
                  onClick={() => setImageUrl(preset.url)}
                  title={`Select ${preset.label}`}
                >
                  <img src={preset.url} alt={preset.label} />
                </div>
              ))}
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Live Project Link</label>
            <input 
              type="url" 
              className="form-input" 
              placeholder="https://client-demo.com" 
              value={liveUrl} 
              onChange={(e) => setLiveUrl(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label className="form-label">Project Description / Case Summary *</label>
            <textarea 
              className="form-textarea" 
              placeholder="Explain the problem, solution, features built, and results delivered to the client..." 
              value={description} 
              onChange={(e) => setDescription(e.target.value)} 
              required 
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '1rem', marginTop: '1.5rem' }}>
            <button type="button" className="btn btn-secondary" onClick={onClose}>
              Cancel
            </button>
            <button type="submit" className="btn btn-primary">
              <PlusCircle size={16} />
              <span>Save & Publish to Portfolio</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
