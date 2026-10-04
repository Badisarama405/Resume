import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { KeyRound, ArrowRight, ArrowLeft, CheckCircle2 } from 'lucide-react';

export function Screen05ForgotPassword() {
  const { navigateTo } = useApp();
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <div className="container" style={{ paddingTop: '3.5rem', maxWidth: '480px' }}>
      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            width: '52px',
            height: '52px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem auto'
          }}>
            <KeyRound size={26} color="#818cf8" />
          </div>

          <div style={{
            display: 'inline-flex',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(99, 102, 241, 0.12)',
            color: '#a5b4fc',
            fontSize: '0.75rem',
            fontWeight: 600,
            marginBottom: '0.75rem'
          }}>
            SCREEN 05 • FORGOT PASSWORD
          </div>

          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Reset Your Password
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Enter your email and we'll send you secure instructions to restore access.
          </p>
        </div>

        {submitted ? (
          <div style={{ textAlign: 'center' }}>
            <div style={{
              background: 'rgba(16, 185, 129, 0.12)',
              border: '1px solid rgba(16, 185, 129, 0.3)',
              borderRadius: 'var(--radius-md)',
              padding: '1.25rem',
              marginBottom: '1.5rem',
              color: '#34d399',
              fontSize: '0.9rem'
            }}>
              <CheckCircle2 size={24} style={{ margin: '0 auto 0.5rem auto' }} />
              If an account exists with <strong>{email}</strong>, a password reset link has been dispatched.
            </div>

            <button 
              onClick={() => navigateTo('screen-06')}
              className="btn btn-primary btn-full"
              style={{ marginBottom: '1rem' }}
            >
              Simulate Clicking Reset Link (Go to Screen 06) <ArrowRight size={16} />
            </button>
            <button 
              onClick={() => navigateTo('screen-04')}
              className="btn btn-outline btn-full btn-sm"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </button>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">Account Email</label>
              <input 
                type="email" 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full btn-lg"
              style={{ marginBottom: '1.25rem' }}
            >
              Send Password Reset Link <ArrowRight size={18} />
            </button>

            <button 
              type="button"
              onClick={() => navigateTo('screen-04')}
              className="btn btn-outline btn-full btn-sm"
            >
              <ArrowLeft size={14} /> Back to Sign In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
