import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, ArrowRight, ShieldCheck, Check, Upload, Lock, Mail, User } from 'lucide-react';

export function Screen02Signup() {
  const { navigateTo, loginUser } = useApp();
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    resumeAttached: false
  });

  const [passwordStrength, setPasswordStrength] = useState('Medium');

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser({
      fullName: formData.fullName || (formData.email ? formData.email.split('@')[0] : 'Member'),
      email: formData.email
    });
    // Proceed to Step 1 of onboarding: Screen 07 Welcome or Screen 08 Resume Upload
    navigateTo('screen-07');
  };

  const handleDemoFill = () => {
    setFormData({
      fullName: 'Rahul Sharma',
      email: 'rahul.sharma@example.com',
      password: 'Password@2026',
      resumeAttached: true
    });
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '520px' }}>
      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            padding: '0.4rem 0.8rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(99, 102, 241, 0.15)',
            color: '#a5b4fc',
            fontSize: '0.78rem',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}>
            SCREEN 02 • REGISTRATION
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Create Your Job Search
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Free plan — no credit card required. Match jobs in under 60 seconds.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <div style={{ position: 'relative' }}>
              <input 
                id="signup-name"
                type="text" 
                className="form-input" 
                placeholder="Rahul Sharma"
                value={formData.fullName}
                onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                required
              />
            </div>
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              id="signup-email"
              type="email" 
              className="form-input" 
              placeholder="rahul.sharma@example.com"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <span style={{ fontSize: '0.75rem', color: '#10b981', fontWeight: 600 }}>
                Strength: {passwordStrength}
              </span>
            </div>
            <input 
              id="signup-password"
              type="password" 
              className="form-input" 
              placeholder="••••••••••••"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              required
            />
            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '0.5rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Check size={12} /> 8+ chars
              </span>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Check size={12} /> Number
              </span>
              <span style={{ color: '#10b981', display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                <Check size={12} /> Symbol
              </span>
            </div>
          </div>

          {/* Quick Resume Upload during Signup friction reducer */}
          <div style={{
            background: 'rgba(26, 34, 52, 0.6)',
            border: '1px dashed var(--border-medium)',
            borderRadius: 'var(--radius-md)',
            padding: '1rem',
            marginBottom: '1.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            gap: '1rem'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.5rem', borderRadius: '8px' }}>
                <Upload size={18} color="#818cf8" />
              </div>
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Resume Ready</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Rahul_Sharma_Resume_2026.pdf
                </div>
              </div>
            </div>
            <span className="badge badge-success">Attached</span>
          </div>

          <button 
            id="signup-submit-btn"
            type="submit" 
            className="btn btn-primary btn-full btn-lg"
            style={{ marginBottom: '1.25rem' }}
          >
            Create My Job Search <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Already have an account?{' '}
          <button 
            onClick={() => navigateTo('screen-04')}
            style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'underline' }}
          >
            Sign In
          </button>
        </div>

        <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'center', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
          <ShieldCheck size={14} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
          By signing up, you agree to our Terms. We never apply to jobs without your explicit consent.
        </div>
      </div>
    </div>
  );
}
