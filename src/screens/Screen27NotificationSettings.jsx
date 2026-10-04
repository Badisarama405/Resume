import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Mail, Clock, Check, ArrowLeft, Save } from 'lucide-react';

export function Screen27NotificationSettings() {
  const { automationSettings, setAutomationSettings, user, navigateTo } = useApp();

  const [frequency, setFrequency] = useState(automationSettings.notificationFrequency || 'digest');
  const [emailAlerts, setEmailAlerts] = useState(automationSettings.emailAlertsEnabled ?? true);
  const [interviewAlerts, setInterviewAlerts] = useState(true);
  const [saved, setSaved] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setAutomationSettings(prev => ({
      ...prev,
      notificationFrequency: frequency,
      emailAlertsEnabled: emailAlerts
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
          SCREEN 27 • NOTIFICATION & ALERT PREFERENCES
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Notification Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
          Avoid notification fatigue. Choose how and when CareerPilot updates you on matches and applications.
        </p>

        {saved && (
          <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <Check size={16} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} /> Notification preferences saved!
          </div>
        )}

        <form onSubmit={handleSave}>
          {/* Notification Cadence */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
            <label className="form-label">Delivery Schedule</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              {[
                { id: 'digest', title: 'Daily Morning Digest (Recommended for Free)', desc: '1 clean summary email delivered at 8:00 AM IST with today\'s matches & applications.' },
                { id: 'instant', title: 'Real-Time Immediate Alerts', desc: 'Instant email notification the moment a job matching ≥ threshold is discovered.' },
                { id: 'important_only', title: 'Action Required & Interviews Only', desc: 'Only alert when manual portal intervention or interview invitation occurs.' }
              ].map(item => (
                <div 
                  key={item.id}
                  onClick={() => setFrequency(item.id)}
                  style={{
                    padding: '0.85rem 1rem',
                    borderRadius: 'var(--radius-md)',
                    background: frequency === item.id ? 'rgba(99, 102, 241, 0.15)' : 'rgba(255, 255, 255, 0.02)',
                    border: frequency === item.id ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ fontWeight: 700, fontSize: '0.88rem', color: frequency === item.id ? '#ffffff' : 'var(--text-secondary)' }}>
                    {item.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {item.desc}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Email Channel Toggles */}
          <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
            <label className="form-label">Notification Channels</label>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginTop: '0.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Email Updates to {user.email}</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Application submission receipts and portal responses</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={emailAlerts} 
                  onChange={(e) => setEmailAlerts(e.target.checked)}
                  style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingTop: '0.5rem', borderTop: '1px solid var(--border-subtle)' }}>
                <div>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>Recruiter Interview Requests</div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Urgent alert when recruiter reaches out for interview scheduling</div>
                </div>
                <input 
                  type="checkbox" 
                  checked={interviewAlerts} 
                  onChange={(e) => setInterviewAlerts(e.target.checked)}
                  style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px' }}
                />
              </div>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <button 
              type="button" 
              onClick={() => navigateTo('screen-32')}
              className="btn btn-outline"
            >
              Open Notification Inbox (Screen 32)
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              <Save size={16} /> Save Notification Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
