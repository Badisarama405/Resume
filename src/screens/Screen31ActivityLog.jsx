import React from 'react';
import { useApp } from '../context/AppContext';
import { Activity, Clock, ShieldCheck, ArrowLeft, ArrowRight } from 'lucide-react';

export function Screen31ActivityLog() {
  const { activityLogs, navigateTo } = useApp();

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '820px' }}>
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
          SCREEN 31 • SYSTEM AUDIT LOG & COMPLIANCE
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Activity & Audit Log
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
          Immutable record of all background syncs, ATS scoring calculations, and application dispatches.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
          {activityLogs.map((log) => (
            <div 
              key={log.id}
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '0.85rem 1.1rem',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                flexWrap: 'wrap',
                gap: '0.75rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <span className="badge badge-indigo" style={{ fontSize: '0.72rem' }}>
                    {log.event}
                  </span>
                  <span style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                    {log.details}
                  </span>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                <Clock size={12} /> {log.timestamp}
              </div>
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-subtle)', paddingTop: '1rem' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
            <ShieldCheck size={14} color="#10b981" /> Retained for 90 days in compliance with DPDP India regulations
          </span>
          <button 
            onClick={() => navigateTo('screen-21')}
            className="btn btn-outline btn-sm"
          >
            Go to Tracker (Screen 21)
          </button>
        </div>
      </div>
    </div>
  );
}
