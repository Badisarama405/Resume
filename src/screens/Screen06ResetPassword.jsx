import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Lock, ArrowRight, CheckCircle2, ShieldCheck } from 'lucide-react';

export function Screen06ResetPassword() {
  const { navigateTo } = useApp();
  const [newPassword, setNewPassword] = useState('NewSecurePass@2026');
  const [confirmPassword, setConfirmPassword] = useState('NewSecurePass@2026');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      alert("Passwords do not match");
      return;
    }
    setIsSuccess(true);
    setTimeout(() => {
      navigateTo('screen-04');
    }, 1200);
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
            <Lock size={26} color="#818cf8" />
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
            SCREEN 06 • NEW PASSWORD
          </div>

          <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Set New Password
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Choose a strong password to protect your job applications and profile data.
          </p>
        </div>

        {isSuccess ? (
          <div style={{
            textAlign: 'center',
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.5rem',
            color: '#34d399'
          }}>
            <CheckCircle2 size={32} style={{ margin: '0 auto 0.5rem auto' }} />
            <h3 style={{ fontSize: '1.1rem', marginBottom: '0.25rem' }}>Password Updated!</h3>
            <p style={{ fontSize: '0.85rem' }}>Redirecting you to sign in...</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit}>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                className="form-input" 
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                required
              />
            </div>

            <div className="form-group">
              <label className="form-label">Confirm New Password</label>
              <input 
                type="password" 
                className="form-input" 
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                required
              />
            </div>

            <button 
              type="submit" 
              className="btn btn-primary btn-full btn-lg"
              style={{ marginBottom: '1.25rem' }}
            >
              Update Password & Sign In <ArrowRight size={18} />
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
