import React, { useState } from 'react';
import { X, LogIn, UserPlus, Shield, User, Sparkles, CheckCircle2 } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import '../styles/AuthModal.css';

export default function AuthModal({ isOpen, onClose }) {
  const { login, register, loginAsAdminDemo, loginAsClientDemo } = useAuth();

  const [activeTab, setActiveTab] = useState('login'); // 'login' | 'register'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [toastMessage, setToastMessage] = useState('');

  if (!isOpen) return null;

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    const result = login(email, password);
    if (result.success) {
      setToastMessage(`Welcome back, ${result.user.name}!`);
      setTimeout(() => {
        setToastMessage('');
        onClose();
      }, 1000);
    }
  };

  const handleRegisterSubmit = (e) => {
    e.preventDefault();
    const result = register(name, email, password);
    if (result.success) {
      setToastMessage(`Account created! Welcome, ${result.user.name}!`);
      setTimeout(() => {
        setToastMessage('');
        onClose();
      }, 1000);
    }
  };

  const handleQuickAdmin = () => {
    loginAsAdminDemo();
    setToastMessage('Authenticated as Admin! You now have project management privileges.');
    setTimeout(() => {
      setToastMessage('');
      onClose();
    }, 1200);
  };

  const handleQuickClient = () => {
    loginAsClientDemo();
    setToastMessage('Signed in as Client User.');
    setTimeout(() => {
      setToastMessage('');
      onClose();
    }, 1000);
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" style={{ maxWidth: '480px' }} onClick={(e) => e.stopPropagation()}>
        <button className="modal-close-btn" onClick={onClose}>
          <X size={20} />
        </button>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
          <Shield size={24} color="var(--accent-purple)" />
          <h3 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 800, color: 'var(--text-primary)' }}>
            CODEXA Identity Portal
          </h3>
        </div>
        <p style={{ fontSize: '0.9rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
          Sign in or test with quick demo roles to access client or admin capabilities.
        </p>

        {toastMessage && (
          <div className="toast-success">
            <CheckCircle2 size={18} />
            <span>{toastMessage}</span>
          </div>
        )}

        {/* Quick Demo Login Box */}
        <div className="demo-login-box">
          <div className="demo-login-title">
            <Sparkles size={16} />
            <span>1-Click Quick Demo Sign In</span>
          </div>
          <div className="demo-btns-grid">
            <button 
              type="button" 
              className="btn btn-primary btn-sm" 
              onClick={handleQuickAdmin}
              style={{ background: 'var(--gradient-secondary)' }}
            >
              <Shield size={14} />
              <span>Login as Admin</span>
            </button>
            <button 
              type="button" 
              className="btn btn-secondary btn-sm" 
              onClick={handleQuickClient}
            >
              <User size={14} />
              <span>Login as Client</span>
            </button>
          </div>
        </div>

        {/* Tab Headers */}
        <div className="auth-tabs-row">
          <button 
            className={`auth-tab-btn ${activeTab === 'login' ? 'active' : ''}`}
            onClick={() => setActiveTab('login')}
          >
            Sign In
          </button>
          <button 
            className={`auth-tab-btn ${activeTab === 'register' ? 'active' : ''}`}
            onClick={() => setActiveTab('register')}
          >
            Register Account
          </button>
        </div>

        {activeTab === 'login' ? (
          <form onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="admin@codexa.io or client@example.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              <LogIn size={16} />
              <span>Sign In</span>
            </button>
          </form>
        ) : (
          <form onSubmit={handleRegisterSubmit}>
            <div className="form-group">
              <label className="form-label">Full Name</label>
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
              <label className="form-label">Email Address</label>
              <input 
                type="email" 
                className="form-input" 
                placeholder="you@company.com" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                required 
              />
            </div>
            <div className="form-group">
              <label className="form-label">Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••" 
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
                required 
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ width: '100%', marginTop: '1rem' }}>
              <UserPlus size={16} />
              <span>Create Client Account</span>
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
