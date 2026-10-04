import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  CheckCircle2, Loader2, ArrowRight, FileCheck, 
  ExternalLink, Sparkles, Building2, MapPin, IndianRupee 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function Screen19AppStatus() {
  const { selectedJobId, jobMatches, applications, navigateTo } = useApp();
  const job = jobMatches.find(j => j.id === selectedJobId) || jobMatches[0];

  if (!job) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3>No Application In Progress</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Please select a job from the jobs feed first.</p>
          <button onClick={() => navigateTo('screen-15')} className="btn btn-primary">Go to Job Feed</button>
        </div>
      </div>
    );
  }

  const latestApp = applications.find(a => a.jobId === job.id) || applications[0];

  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    'Checking anti-duplicate application rules...',
    'Formatting candidate ATS resume & portfolio...',
    `Establishing connection to ${job.company} Career Portal...`,
    'Dispatching candidate payload...',
    'Application Accepted! Official receipt generated.'
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex(prev => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          try {
            confetti({ particleCount: 50, spread: 60, origin: { y: 0.6 } });
          } catch (e) {}
          return prev;
        }
      });
    }, 700);

    return () => clearInterval(timer);
  }, []);

  const isComplete = stepIndex >= steps.length - 1;

  return (
    <div className="container" style={{ paddingTop: '3.5rem', maxWidth: '640px' }}>
      <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          padding: '0.3rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.12)',
          color: '#a5b4fc',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          SCREEN 19 • APPLICATION EXECUTION STATUS
        </div>

        {/* Animated Icon */}
        <div style={{
          width: '72px',
          height: '72px',
          borderRadius: '50%',
          background: isComplete ? 'rgba(16, 185, 129, 0.2)' : 'rgba(99, 102, 241, 0.2)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          color: isComplete ? '#34d399' : '#818cf8',
          border: isComplete ? '2px solid #10b981' : '2px solid #6366f1'
        }}>
          {isComplete ? (
            <CheckCircle2 size={40} />
          ) : (
            <Loader2 size={36} style={{ animation: 'spin 1s linear infinite' }} />
          )}
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {isComplete ? 'Application Successfully Submitted!' : 'Submitting Your Application...'}
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '2rem' }}>
          {job.title} at <strong style={{ color: 'var(--text-primary)' }}>{job.company}</strong>
        </p>

        {/* Step-by-Step Execution Feed */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', textAlign: 'left', marginBottom: '2rem', border: '1px solid var(--border-subtle)' }}>
          {steps.map((stepText, idx) => {
            const isDone = idx < stepIndex || (idx === stepIndex && isComplete);
            const isCurrent = idx === stepIndex && !isComplete;
            return (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.75rem',
                  padding: '0.5rem 0',
                  opacity: idx <= stepIndex ? 1 : 0.35,
                  fontSize: '0.85rem'
                }}
              >
                {isDone ? (
                  <CheckCircle2 size={16} color="#34d399" />
                ) : isCurrent ? (
                  <Loader2 size={16} color="#818cf8" style={{ animation: 'spin 1s linear infinite' }} />
                ) : (
                  <div style={{ width: '16px', height: '16px', borderRadius: '50%', border: '1px solid var(--border-medium)' }} />
                )}
                <span style={{ color: isDone ? '#ffffff' : isCurrent ? '#818cf8' : 'var(--text-muted)', fontWeight: isCurrent ? 600 : 400 }}>
                  {stepText}
                </span>
              </div>
            );
          })}
        </div>

        {/* Confirmation Details Card */}
        {isComplete && (
          <div style={{
            background: 'rgba(16, 185, 129, 0.1)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            borderRadius: 'var(--radius-md)',
            padding: '1.25rem',
            marginBottom: '2rem',
            textAlign: 'left'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Confirmation ID:</span>
              <strong style={{ color: '#34d399', fontFamily: 'monospace' }}>{latestApp.confirmationId || 'RZP-APP-98214'}</strong>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Submitted At:</span>
              <span style={{ fontSize: '0.85rem', color: '#ffffff' }}>{latestApp.appliedAt || new Date().toLocaleString()}</span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Current Lifecycle Stage:</span>
              <span className="badge badge-success">Under Review</span>
            </div>
          </div>
        )}

        {/* Actions */}
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            id="status-tracker-btn"
            onClick={() => navigateTo('screen-21')}
            className="btn btn-primary"
            disabled={!isComplete}
          >
            <FileCheck size={16} /> Open Application Tracker (Screen 21)
          </button>

          <button 
            onClick={() => navigateTo('screen-15')}
            className="btn btn-outline"
            disabled={!isComplete}
          >
            Find More Matches (Screen 15)
          </button>
        </div>
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
