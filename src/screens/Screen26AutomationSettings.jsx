import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Shield, Zap, Check, ArrowLeft, Save, AlertCircle } from 'lucide-react';

export function Screen26AutomationSettings() {
  const { automationSettings, setAutomationSettings, navigateTo } = useApp();

  const [threshold, setThreshold] = useState(automationSettings.autoApplyThreshold || 75);
  const [mode, setMode] = useState(automationSettings.applicationMode || 'ask');
  const [maxDaily, setMaxDaily] = useState(automationSettings.maxDailyAutoApplications || 5);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setAutomationSettings(prev => ({
      ...prev,
      autoApplyThreshold: threshold,
      applicationMode: mode,
      maxDailyAutoApplications: maxDaily
    }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '720px' }}>
      <button 
        onClick={() => navigateTo('screen-14')}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1.25rem' }}
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </button>

      <div className="glass-card">
        <div style={{
          display: 'inline-flex',
          padding: '0.3rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.12)',
          color: '#a5b4fc',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '0.5rem'
        }}>
          SCREEN 26 • AUTOMATION & THRESHOLD SAFEGUARDS
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Automation Safety Controls
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
          Define exact eligibility thresholds, consent gates, and daily submission limits.
        </p>

        {saved && (
          <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <Check size={16} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} /> Automation settings saved successfully!
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Threshold Slider */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                <Zap size={18} color="#818cf8" />
                <label className="form-label" style={{ margin: 0 }}>Auto-Application ATS Threshold</label>
              </div>
              <span className="score-pill score-high">≥ {threshold}% Match</span>
            </div>

            <input 
              type="range"
              min="50"
              max="95"
              step="5"
              value={threshold}
              onChange={(e) => setThreshold(Number(e.target.value))}
              style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
            />
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.3rem' }}>
              <span>50% (Loose)</span>
              <span style={{ color: '#818cf8' }}>75% (Recommended)</span>
              <span>95% (Strict)</span>
            </div>
          </div>

          {/* Mode Selector */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
              <Shield size={18} color="#34d399" />
              <label className="form-label" style={{ margin: 0 }}>Application Execution Mode</label>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                { id: 'ask', title: 'Ask Me Before Applying (Consent Gate)', desc: 'Prepares packet, requests your 1-click confirmation before sending.' },
                { id: 'auto', title: 'Fully Automatic', desc: 'Dispatches instantly if match score meets or exceeds threshold.' },
                { id: 'manual', title: 'Manual Only', desc: 'Saves jobs and provides deep portal links without auto-applying.' }
              ].map(m => (
                <div 
                  key={m.id}
                  onClick={() => setMode(m.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: mode === m.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: mode === m.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div>
                    <div style={{ fontWeight: 700, fontSize: '0.88rem', color: mode === m.id ? '#ffffff' : 'var(--text-secondary)' }}>{m.title}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{m.desc}</div>
                  </div>
                  <div style={{
                    width: '18px',
                    height: '18px',
                    borderRadius: '50%',
                    border: mode === m.id ? '5px solid var(--accent-primary)' : '2px solid var(--border-medium)',
                    background: mode === m.id ? '#ffffff' : 'transparent'
                  }} />
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <button 
              type="button"
              onClick={() => navigateTo('screen-28')}
              className="btn btn-outline"
            >
              View Plan Quota (Screen 28)
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              <Save size={16} /> Save Automation Safeguards
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
