import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { MailCheck, ArrowRight, RefreshCw, CheckCircle2 } from 'lucide-react';

export function Screen03EmailVerify() {
  const { navigateTo, user } = useApp();
  const [code, setCode] = useState(['7', '2', '9', '4', '1', '0']);
  const [isVerified, setIsVerified] = useState(false);

  const handleVerify = (e) => {
    e.preventDefault();
    setIsVerified(true);
    setTimeout(() => {
      navigateTo('screen-07');
    }, 800);
  };

  return (
    <div className="container" style={{ paddingTop: '3.5rem', maxWidth: '480px' }}>
      <div className="glass-card" style={{ textAlign: 'center' }}>
        <div style={{
          width: '56px',
          height: '56px',
          borderRadius: '50%',
          background: 'rgba(99, 102, 241, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.25rem auto'
        }}>
          <MailCheck size={28} color="#818cf8" />
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
          SCREEN 03 • EMAIL VERIFICATION
        </div>

        <h1 style={{ fontSize: '1.7rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Verify Your Email
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '1.75rem' }}>
          We sent a 6-digit verification code to <br />
          <strong style={{ color: 'var(--text-primary)' }}>{user.email || 'rahul.sharma@example.com'}</strong>
        </p>

        <form onSubmit={handleVerify}>
          <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', marginBottom: '1.5rem' }}>
            {code.map((digit, idx) => (
              <input
                key={idx}
                type="text"
                maxLength="1"
                value={digit}
                onChange={(e) => {
                  const newCode = [...code];
                  newCode[idx] = e.target.value;
                  setCode(newCode);
                }}
                style={{
                  width: '46px',
                  height: '52px',
                  textAlign: 'center',
                  fontSize: '1.3rem',
                  fontWeight: 700,
                  borderRadius: 'var(--radius-md)',
                  background: 'var(--bg-tertiary)',
                  border: '1px solid var(--border-medium)',
                  color: '#ffffff'
                }}
              />
            ))}
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-full btn-lg"
            style={{ marginBottom: '1rem' }}
          >
            {isVerified ? (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <CheckCircle2 size={18} /> Verified! Redirecting...
              </span>
            ) : (
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                Verify & Continue <ArrowRight size={18} />
              </span>
            )}
          </button>
        </form>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <RefreshCw size={14} /> Resend code in 45s
          </span>
          <button 
            onClick={() => navigateTo('screen-07')}
            style={{ color: '#818cf8', textDecoration: 'underline', fontSize: '0.8rem' }}
          >
            Skip for demo
          </button>
        </div>
      </div>
    </div>
  );
}
