import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ExternalLink, Copy, Check, ArrowLeft, ArrowRight, 
  AlertTriangle, ShieldCheck, FileCheck, CheckCircle2 
} from 'lucide-react';

export function Screen20ManualApp() {
  const { selectedJobId, jobMatches, candidate, addApplication, navigateTo } = useApp();
  const job = jobMatches.find(j => j.id === selectedJobId) || jobMatches[3] || jobMatches[0];
  
  if (!job) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3>No Job Selected</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Please select a job requiring manual action from the tracker.</p>
          <button onClick={() => navigateTo('screen-21')} className="btn btn-primary">Go to Applications Tracker</button>
        </div>
      </div>
    );
  }

  const [copiedKey, setCopiedKey] = useState(null);
  const [markedApplied, setMarkedApplied] = useState(false);

  const copyToClipboard = (key, text) => {
    navigator.clipboard.writeText(text);
    setCopiedKey(key);
    setTimeout(() => setCopiedKey(null), 2000);
  };

  const handleMarkAsApplied = () => {
    addApplication(job, 'Manual');
    setMarkedApplied(true);
  };

  const coverNoteText = `Dear ${job.company} Hiring Team,\n\nI am writing to express my strong interest in the ${job.title} role. With ${candidate?.experienceYears || 3.5} years of experience designing scalable services with ${(candidate?.skills || []).slice(0, 4).join(', ')}, I am confident in delivering immediate value to your engineering team.\n\nBest regards,\n${candidate?.name || 'Rahul Sharma'}\n${candidate?.email || 'rahul.sharma@example.com'} | ${candidate?.phone || '+91 98765 43210'}`;

  return (
    <div className="container" style={{ paddingTop: '2.5rem', maxWidth: '780px' }}>
      {/* Back button */}
      <button 
        onClick={() => navigateTo('screen-15')}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1.25rem' }}
      >
        <ArrowLeft size={14} /> Back to Job Feed (Screen 15)
      </button>

      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
          <div style={{
            display: 'inline-flex',
            padding: '0.3rem 0.75rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(245, 158, 11, 0.15)',
            color: '#fbbf24',
            fontSize: '0.75rem',
            fontWeight: 700,
            marginBottom: '0.5rem'
          }}>
            SCREEN 20 • MANUAL APPLICATION ASSISTANT
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>
            Apply Directly on {job.company} Portal
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {job.title} • {job.location} • <span style={{ color: '#34d399' }}>{job.salaryRange}</span>
          </p>
        </div>

        {/* Why manual notice */}
        <div style={{
          background: 'rgba(245, 158, 11, 0.1)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem 1.25rem',
          marginBottom: '1.5rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'center'
        }}>
          <AlertTriangle size={22} color="#fbbf24" style={{ flexShrink: 0 }} />
          <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <strong style={{ color: '#fbbf24' }}>Why is manual action required?</strong>{' '}
            {job.company} uses proprietary career forms with mandatory phone OTP / anti-bot verification. We provide one-click links and quick clipboard helpers to complete it in under 60 seconds.
          </div>
        </div>

        {/* Step 1: Open Portal */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.05rem', color: 'var(--text-primary)' }}>
                Step 1: Open Official Career Page
              </div>
              <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                Direct official link: <span style={{ fontFamily: 'monospace', color: '#38bdf8' }}>{job.applyUrl}</span>
              </div>
            </div>

            <a 
              href={job.applyUrl}
              target="_blank"
              rel="noreferrer"
              className="btn btn-primary btn-sm"
            >
              Open Application Page <ExternalLink size={14} />
            </a>
          </div>
        </div>

        {/* Step 2: 1-Click Clipboard Helpers */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.5rem' }}>
            Step 2: Copy-Paste Application Helpers
          </div>
          <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Quickly paste your tailored details into the portal's form fields:
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {/* Helper 1: Tailored Cover Note */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c7d2fe' }}>Tailored Quick Note / Summary:</span>
                <button 
                  onClick={() => copyToClipboard('note', coverNoteText)}
                  className="btn btn-outline btn-sm"
                  style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
                >
                  {copiedKey === 'note' ? <><Check size={12} color="#10b981" /> Copied!</> : <><Copy size={12} /> Copy Note</>}
                </button>
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', whiteSpace: 'pre-line', maxHeight: '70px', overflowY: 'auto' }}>
                {coverNoteText}
              </div>
            </div>

            {/* Helper 2: Skills String */}
            <div style={{ background: 'rgba(255, 255, 255, 0.02)', padding: '0.85rem', borderRadius: 'var(--radius-sm)', border: '1px solid var(--border-subtle)', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div>
                <span style={{ fontSize: '0.82rem', fontWeight: 600, color: '#c7d2fe' }}>Comma-Separated Skills:</span>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                  {candidate.skills.join(', ')}
                </div>
              </div>
              <button 
                onClick={() => copyToClipboard('skills', candidate.skills.join(', '))}
                className="btn btn-outline btn-sm"
                style={{ padding: '0.2rem 0.6rem', fontSize: '0.75rem' }}
              >
                {copiedKey === 'skills' ? <><Check size={12} color="#10b981" /> Copied!</> : <><Copy size={12} /> Copy Skills</>}
              </button>
            </div>
          </div>
        </div>

        {/* Step 3: Mark as Applied */}
        <div style={{
          background: 'rgba(16, 185, 129, 0.08)',
          border: '1px solid rgba(16, 185, 129, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '1.25rem',
          textAlign: 'center'
        }}>
          <div style={{ fontWeight: 700, fontSize: '1.05rem', color: '#34d399', marginBottom: '0.35rem' }}>
            Step 3: Keep Your Tracker Updated
          </div>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Once you submit on {job.company}'s portal, click below so CareerPilot records the application and tracks follow-ups.
          </p>

          {markedApplied ? (
            <div>
              <div style={{ color: '#34d399', fontWeight: 700, marginBottom: '0.75rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                <CheckCircle2 size={18} /> Marked as Applied! Application recorded.
              </div>
              <button 
                onClick={() => navigateTo('screen-21')}
                className="btn btn-primary btn-sm"
              >
                Open Application Tracker (Screen 21) <ArrowRight size={14} />
              </button>
            </div>
          ) : (
            <button 
              id="mark-applied-btn"
              onClick={handleMarkAsApplied}
              className="btn btn-primary btn-lg"
            >
              <Check size={18} /> Mark as Applied on Portal
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
