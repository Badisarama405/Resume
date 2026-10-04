import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { ArrowRight, Lock, Mail, Sparkles, CheckCircle2 } from 'lucide-react';

export function Screen04Login() {
  const { navigateTo, loginUser } = useApp();
  const [email, setEmail] = useState('rahul.sharma@example.com');
  const [password, setPassword] = useState('Password@2026');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e) => {
    e.preventDefault();
    loginUser(email);
    navigateTo('screen-13'); // Proceed to First Matches or Dashboard
  };

  const handleDemoLogin = () => {
    loginUser('rahul.sharma@example.com');
    navigateTo('screen-13');
  };

  return (
    <div className="container" style={{ paddingTop: '3.5rem', maxWidth: '480px' }}>
      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
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
            SCREEN 04 • AUTHENTICATION
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Welcome Back
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Access your job matches, ATS analyses, and application tracker.
          </p>
        </div>

        {/* 1-Click Demo Login Banner */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.1)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.75rem'
        }}>
          <div>
            <div style={{ fontSize: '0.82rem', fontWeight: 700, color: '#c7d2fe' }}>
              ⚡ 1-Click Demo Login
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
              Rahul Sharma (SDE-2 • 3.5 Yrs)
            </div>
          </div>
          <button 
            id="login-demo-btn"
            onClick={handleDemoLogin}
            className="btn btn-primary btn-sm"
          >
            Sign In Now
          </button>
        </div>

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              id="login-email"
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <label className="form-label">Password</label>
              <button 
                type="button"
                onClick={() => navigateTo('screen-05')}
                style={{ fontSize: '0.78rem', color: '#818cf8', textDecoration: 'underline' }}
              >
                Forgot Password?
              </button>
            </div>
            <input 
              id="login-password"
              type="password" 
              className="form-input" 
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <input 
              type="checkbox" 
              id="remember" 
              checked={rememberMe} 
              onChange={(e) => setRememberMe(e.target.checked)}
              style={{ accentColor: 'var(--accent-primary)', width: '16px', height: '16px' }}
            />
            <label htmlFor="remember" style={{ cursor: 'pointer' }}>Remember me for 30 days</label>
          </div>

          <button 
            id="login-submit-btn"
            type="submit" 
            className="btn btn-primary btn-full btn-lg"
            style={{ marginBottom: '1.25rem' }}
          >
            Sign In to CareerPilot <ArrowRight size={18} />
          </button>
        </form>

        <div style={{ textAlign: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Don't have an account yet?{' '}
          <button 
            onClick={() => navigateTo('screen-02')}
            style={{ color: '#818cf8', fontWeight: 600, textDecoration: 'underline' }}
          >
            Create Free Account
          </button>
        </div>
      </div>
    </div>
  );
}
