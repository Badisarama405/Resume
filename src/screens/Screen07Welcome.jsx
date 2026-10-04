import React from 'react';
import { useApp } from '../context/AppContext';
import { FileText, Sliders, Zap, ArrowRight, Clock, ShieldCheck, CheckCircle2 } from 'lucide-react';

export function Screen07Welcome() {
  const { navigateTo, user } = useApp();

  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '680px' }}>
      {/* 3-Step Stepper Header */}
      <div className="stepper">
        <div className="step-item step-active">
          <div className="step-circle">1</div>
          <span className="step-label">Resume</span>
        </div>
        <div className="step-item">
          <div className="step-circle">2</div>
          <span className="step-label">Preferences</span>
        </div>
        <div className="step-item">
          <div className="step-circle">3</div>
          <span className="step-label">Job Matches</span>
        </div>
      </div>

      <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem 2rem' }}>
        <div style={{
          display: 'inline-flex',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#a5b4fc',
          fontSize: '0.78rem',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          SCREEN 07 • ONBOARDING PROGRESS (STEP 1 OF 3)
        </div>

        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.75rem', letterSpacing: '-0.02em' }}>
          Let's Build Your <span className="gradient-text">Job-Search Profile</span>
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', lineHeight: 1.6, maxWidth: '520px', margin: '0 auto 2rem auto' }}>
          In the next 60 seconds, CareerPilot will parse your experience, calculate your ATS readiness, and find live matching roles across top Indian tech companies.
        </p>

        {/* 3 Steps Overview Cards */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem', textAlign: 'left', marginBottom: '2.25rem' }}>
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-glow)' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: '#818cf8' }}>
              <FileText size={18} />
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>1. Resume</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Extract skills, experience, and target roles.</div>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ background: 'rgba(6, 182, 212, 0.2)', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: '#22d3ee' }}>
              <Sliders size={18} />
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>2. Preferences</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Set locations, salary floor, and auto-apply rules.</div>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1.1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
            <div style={{ background: 'rgba(16, 185, 129, 0.2)', width: '36px', height: '36px', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '0.75rem', color: '#34d399' }}>
              <Zap size={18} />
            </div>
            <div style={{ fontSize: '0.9rem', fontWeight: 700, marginBottom: '0.2rem' }}>3. First Matches</div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>Immediate ATS scores for live open vacancies.</div>
          </div>
        </div>

        <button 
          id="welcome-next-btn"
          onClick={() => navigateTo('screen-08')}
          className="btn btn-primary btn-lg"
          style={{ width: '100%', maxWidth: '360px', margin: '0 auto 1.5rem auto' }}
        >
          Upload Resume (Step 1) <ArrowRight size={18} />
        </button>

        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '1.5rem', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <Clock size={14} /> Takes ~45 seconds
          </span>
          <span>•</span>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={14} color="#10b981" /> No credit card needed
          </span>
        </div>
      </div>
    </div>
  );
}
