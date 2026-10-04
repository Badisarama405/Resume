import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ShieldCheck, ArrowRight, ArrowLeft, FileText, 
  Building2, MapPin, IndianRupee, Check, AlertCircle 
} from 'lucide-react';

export function Screen18AppConfirmation() {
  const { 
    selectedJobId, jobMatches, navigateTo, candidate, 
    preferences, addApplication 
  } = useApp();

  const job = jobMatches.find(j => j.id === selectedJobId) || jobMatches[0];

  if (!job) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3>No Job Selected</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Please select a job from the jobs feed first.</p>
          <button onClick={() => navigateTo('screen-15')} className="btn btn-primary">Go to Job Feed</button>
        </div>
      </div>
    );
  }

  const [consentChecked, setConsentChecked] = useState(true);
  const [noticePeriod, setNoticePeriod] = useState(preferences?.noticePeriodDays || 30);
  const [expectedCtc, setExpectedCtc] = useState(preferences?.minSalaryLpa || 18);

  const handleConfirmSubmit = () => {
    if (!consentChecked) {
      alert("Please check the consent authorization box.");
      return;
    }
    // Proceed to live execution status
    addApplication(job, 'Automated');
    navigateTo('screen-19', { jobId: job.id });
  };

  return (
    <div className="container" style={{ paddingTop: '3rem', maxWidth: '640px' }}>
      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
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
            SCREEN 18 • APPLICATION CONFIRMATION (CONSENT GATE)
          </div>
          <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
            Confirm Application Submission
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
            Review your submission payload before CareerPilot dispatches it to {job.company}.
          </p>
        </div>

        {/* Target Job Overview */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '1.75rem' }}>{job.companyLogo}</span>
            <div>
              <div style={{ fontWeight: 700, fontSize: '1.1rem' }}>{job.title}</div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {job.company} • {job.location} • <span style={{ color: '#34d399' }}>{job.salaryRange}</span>
              </div>
            </div>
          </div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>
            ATS Compatibility Rating: <strong style={{ color: '#38bdf8' }}>{job.matchResult.totalScore}% ({job.matchResult.tier})</strong>
          </div>
        </div>

        {/* Attached Resume */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.5rem', borderRadius: '8px', color: '#818cf8' }}>
              <FileText size={18} />
            </div>
            <div>
              <div style={{ fontSize: '0.88rem', fontWeight: 600 }}>{candidate.resumeFileName || 'Rahul_Sharma_Resume.pdf'}</div>
              <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>Tailored candidate profile • Verified skills</div>
            </div>
          </div>
          <span className="badge badge-success">Attached</span>
        </div>

        {/* Candidate Form Answers */}
        <div style={{ marginBottom: '1.5rem' }}>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Notice Period</label>
              <select 
                className="form-input"
                value={noticePeriod}
                onChange={(e) => setNoticePeriod(Number(e.target.value))}
              >
                <option value={0}>Immediate</option>
                <option value={15}>15 Days</option>
                <option value={30}>30 Days</option>
                <option value={60}>60 Days</option>
              </select>
            </div>

            <div className="form-group">
              <label className="form-label">Expected CTC (₹ LPA)</label>
              <input 
                type="number" 
                className="form-input" 
                value={expectedCtc}
                onChange={(e) => setExpectedCtc(Number(e.target.value))}
              />
            </div>
          </div>
        </div>

        {/* Mandatory Consent Checkbox */}
        <div style={{
          background: 'rgba(99, 102, 241, 0.08)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.75rem',
          display: 'flex',
          gap: '0.75rem',
          alignItems: 'flex-start'
        }}>
          <input 
            type="checkbox"
            id="consent-check"
            checked={consentChecked}
            onChange={(e) => setConsentChecked(e.target.checked)}
            style={{ accentColor: 'var(--accent-primary)', width: '18px', height: '18px', marginTop: '2px', cursor: 'pointer' }}
          />
          <label htmlFor="consent-check" style={{ fontSize: '0.82rem', color: 'var(--text-primary)', cursor: 'pointer', lineHeight: 1.5 }}>
            I authorize CareerPilot to submit my application, resume, and profile details to <strong>{job.company}</strong> on my behalf in compliance with their career portal terms.
          </label>
        </div>

        {/* Buttons */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
          <button 
            onClick={() => navigateTo('screen-16', { jobId: job.id })}
            className="btn btn-outline"
          >
            <ArrowLeft size={16} /> Cancel
          </button>

          <button 
            id="confirm-submit-btn"
            onClick={handleConfirmSubmit}
            className="btn btn-primary btn-lg"
          >
            Confirm & Dispatch Application <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
