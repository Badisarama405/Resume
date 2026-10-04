import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Database, RefreshCw, CheckCircle2, AlertTriangle, ShieldCheck, 
  ArrowRight, Activity, Clock, Globe 
} from 'lucide-react';

export function Screen30JobSourceStatus() {
  const { sources, setSources, navigateTo } = useApp();
  const [isSyncing, setIsSyncing] = useState(false);
  const [lastSyncDone, setLastSyncDone] = useState(false);

  const handleSyncAll = () => {
    setIsSyncing(true);
    setLastSyncDone(false);
    setTimeout(() => {
      setIsSyncing(false);
      setLastSyncDone(true);
      setSources(prev => prev.map(s => ({
        ...s,
        lastSync: 'Just now',
        jobsToday: s.jobsToday + Math.floor(Math.random() * 8 + 2)
      })));
    }, 1500);
  };

  const totalJobsToday = sources.reduce((acc, s) => acc + s.jobsToday, 0);

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '880px' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
        <div>
          <div style={{
            display: 'inline-flex',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(99, 102, 241, 0.12)',
            color: '#a5b4fc',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '0.4rem'
          }}>
            SCREEN 30 • SYSTEM MONITORS & INGESTION
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800 }}>
            Job Source Health & Sync Status
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Real-time telemetry on active Indian job boards, scrapers, APIs, and rate limit health.
          </p>
        </div>

        <button 
          onClick={handleSyncAll}
          disabled={isSyncing}
          className="btn btn-primary btn-sm"
        >
          <RefreshCw size={14} style={{ animation: isSyncing ? 'spin 1s linear infinite' : 'none' }} />
          {isSyncing ? 'Syncing Feeds...' : 'Trigger Live Sync Now'}
        </button>
      </div>

      {lastSyncDone && (
        <div style={{
          background: 'var(--success-bg)',
          border: '1px solid var(--success-border)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1.25rem',
          color: '#34d399',
          fontSize: '0.88rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem'
        }}>
          <CheckCircle2 size={18} /> Feeds synced successfully! Updated job catalog with latest postings.
        </div>
      )}

      {/* KPI Tiles */}
      <div className="grid-3" style={{ marginBottom: '2rem' }}>
        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Active Feeds</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#38bdf8' }}>4 / 4 Online</div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.2rem' }}>100% Uptime</div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>New Jobs Collected Today</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#10b981' }}>{totalJobsToday}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Deduplicated & indexed</div>
        </div>

        <div className="glass-card">
          <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '0.35rem' }}>Average Processing Latency</div>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#a5b4fc' }}>1.2s / JD</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>OpenAI + pgvector</div>
        </div>
      </div>

      {/* Detailed Source List */}
      <div className="glass-card" style={{ marginBottom: '2rem' }}>
        <h2 style={{ fontSize: '1.2rem', marginBottom: '1.25rem' }}>Connected Ingestion Pipelines</h2>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          {sources.map(src => (
            <div 
              key={src.id}
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                padding: '1.1rem',
                border: '1px solid var(--border-subtle)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '1rem'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{
                  width: '40px',
                  height: '40px',
                  borderRadius: '10px',
                  background: 'rgba(99, 102, 241, 0.15)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#818cf8'
                }}>
                  <Globe size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>{src.name}</div>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', display: 'flex', alignItems: 'center', gap: '0.5rem', marginTop: '0.2rem' }}>
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <Clock size={12} /> Last synced: {src.lastSync}
                    </span>
                    <span>•</span>
                    <span>API Quota Used: {src.rateLimit}</span>
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '1.5rem' }}>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--text-primary)' }}>
                    +{src.jobsToday}
                  </div>
                  <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>jobs today</div>
                </div>

                <span className="badge badge-success">
                  <CheckCircle2 size={12} /> {src.status}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <button 
          onClick={() => navigateTo('screen-15')}
          className="btn btn-outline"
        >
          View Ingested Jobs Feed (Screen 15)
        </button>
        <button 
          onClick={() => navigateTo('screen-14')}
          className="btn btn-secondary"
        >
          Go to Job Command Center (Screen 14) <ArrowRight size={14} />
        </button>
      </div>

      <style>{`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  );
}
