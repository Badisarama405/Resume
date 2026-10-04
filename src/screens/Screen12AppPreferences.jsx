import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sliders, ArrowRight, ArrowLeft, Shield, Bell, Check, Zap, Info } from 'lucide-react';

export function Screen12AppPreferences() {
  const { navigateTo, automationSettings, setAutomationSettings } = useApp();

  const [threshold, setThreshold] = useState(automationSettings.autoApplyThreshold || 75);
  const [mode, setMode] = useState(automationSettings.applicationMode || 'ask');
  const [notification, setNotification] = useState(automationSettings.notificationFrequency || 'digest');

  const handleSubmit = (e) => {
    e.preventDefault();
    setAutomationSettings({
      autoApplyThreshold: threshold,
      applicationMode: mode,
      notificationFrequency: notification,
      emailAlertsEnabled: true
    });
    // Triggers the 60-second Aha moment!
    navigateTo('screen-13');
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', maxWidth: '720px' }}>
      {/* 3-Step Stepper Header */}
      <div className="stepper">
        <div className="step-item step-completed">
          <div className="step-circle"><Check size={16} /></div>
          <span className="step-label">Resume</span>
        </div>
        <div className="step-item step-completed">
          <div className="step-circle"><Check size={16} /></div>
          <span className="step-label">Preferences</span>
        </div>
        <div className="step-item step-active">
          <div className="step-circle">3</div>
          <span className="step-label">Automation Rules</span>
        </div>
      </div>

      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(99, 102, 241, 0.15)',
            color: '#a5b4fc',
            fontSize: '0.78rem',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}>
            SCREEN 12 • AUTOMATION SAFEGUARDS
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Application & Automation Rules
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            You maintain 100% control over how and when CareerPilot submits applications.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Rule 1: ATS Compatibility Threshold */}
          <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={18} color="#818cf8" />
                <label className="form-label" style={{ margin: 0 }}>
                  Auto-Application ATS Score Threshold
                </label>
              </div>
              <span className="score-pill score-high" style={{ fontSize: '0.95rem' }}>
                ≥ {threshold}% Match
              </span>
            </div>

            <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              Only jobs scoring at or above this compatibility rating will be eligible for automated processing.
            </p>

            <input 
              id="threshold-slider"
              type="range"
              min="50"
              max="95"
              step="5"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />

            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              <span>50% (Loose Match)</span>
              <span style={{ color: '#818cf8', fontWeight: 600 }}>75% (Default Recommended)</span>
              <span>95% (Exact Match)</span>
            </div>
          </div>

          {/* Rule 2: Application Execution Mode */}
          <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
              <Shield size={18} color="#34d399" />
              <label className="form-label" style={{ margin: 0 }}>
                Application Execution Mode
              </label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.75rem' }}>
              {[
                {
                  id: 'ask',
                  title: 'Ask Me Before Applying (Recommended)',
                  desc: 'CareerPilot prepares the application packet and notifies you for 1-click consent.'
                },
                {
                  id: 'auto',
                  title: 'Fully Automatic',
                  desc: 'Instantly submit applications as soon as a job meets the score threshold (subject to portal terms).'
                },
                {
                  id: 'manual',
                  title: 'Manual Only',
                  desc: 'Never auto-apply. Simply discover jobs, show ATS match breakdowns, and provide direct portal links.'
                }
              ].map((item) => (
                <div 
                  key={item.id}
                  onClick={() => setMode(item.id)}
                  style={{
                    padding: '0.9rem 1.1rem',
                    borderRadius: 'var(--radius-md)',
                    background: mode === item.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: mode === item.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '1rem',
                    transition: 'all 0.2s ease'
                  }}
                >
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700, color: mode === item.id ? '#ffffff' : 'var(--text-secondary)' }}>
                      {item.title}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
                      {item.desc}
                    </div>
                  </div>
                  <div style={{
                    width: '20px',
                    height: '20px',
                    borderRadius: '50%',
                    border: mode === item.id ? '6px solid var(--accent-primary)' : '2px solid var(--border-medium)',
                    background: mode === item.id ? '#ffffff' : 'transparent'
                  }} />
                </div>
              ))}
            </div>
          </div>

          {/* Rule 3: Notification Preference */}
          <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '2rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Bell size={18} color="#f59e0b" />
              <label className="form-label" style={{ margin: 0 }}>
                Notification Cadence
              </label>
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '1rem' }}>
              <div 
                onClick={() => setNotification('digest')}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: notification === 'digest' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: notification === 'digest' ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Daily Morning Digest</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  1 clean email daily with top matches and submitted applications.
                </div>
              </div>

              <div 
                onClick={() => setNotification('instant')}
                style={{
                  padding: '0.85rem',
                  borderRadius: 'var(--radius-md)',
                  background: notification === 'instant' ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                  border: notification === 'instant' ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                  cursor: 'pointer'
                }}
              >
                <div style={{ fontWeight: 700, fontSize: '0.88rem' }}>Real-time Instant Alerts</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  Immediate email whenever a job matches ≥ {threshold}%.
                </div>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <button 
              type="button"
              onClick={() => navigateTo('screen-11')}
              className="btn btn-outline"
            >
              <ArrowLeft size={16} /> Back to Preferences
            </button>

            <button 
              id="automation-submit-btn"
              type="submit" 
              className="btn btn-primary btn-lg"
            >
              Calculate Matching Jobs & Launch Search <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
