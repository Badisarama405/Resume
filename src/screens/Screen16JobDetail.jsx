import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Building2, MapPin, IndianRupee, Briefcase, Zap, 
  ArrowLeft, ExternalLink, Bookmark, CheckCircle2, AlertCircle, Send, Check, ShieldCheck
} from 'lucide-react';

export function Screen16JobDetail() {
  const { 
    selectedJobId, jobMatches, navigateTo, savedJobIds, 
    toggleSaveJob, applications, candidate 
  } = useApp();

  const job = jobMatches.find(j => j.id === selectedJobId) || jobMatches[0];

  if (!job) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3>No Job Selected</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Please select a job from the jobs feed.</p>
          <button onClick={() => navigateTo('screen-15')} className="btn btn-primary">Go to Job Feed</button>
        </div>
      </div>
    );
  }

  const isSaved = savedJobIds.includes(job.id);
  const isApplied = applications.some(a => a.jobId === job.id);
  const score = job.matchResult?.totalScore ?? 85;

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '960px' }}>
      {/* Back button */}
      <button 
        onClick={() => navigateTo('screen-15')}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1.25rem' }}
      >
        <ArrowLeft size={14} /> Back to Matches Feed (Screen 15)
      </button>

      {/* Main Job Header Card */}
      <div className="glass-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
            <div style={{
              fontSize: '2.2rem',
              width: '56px',
              height: '56px',
              borderRadius: '12px',
              background: 'var(--bg-tertiary)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: '1px solid var(--border-subtle)'
            }}>
              {job.companyLogo}
            </div>

            <div>
              <div style={{
                display: 'inline-flex',
                padding: '0.25rem 0.65rem',
                borderRadius: 'var(--radius-full)',
                background: 'rgba(99, 102, 241, 0.12)',
                color: '#a5b4fc',
                fontSize: '0.72rem',
                fontWeight: 700,
                marginBottom: '0.3rem'
              }}>
                SCREEN 16 • JOB DETAIL SPECIFICATION
              </div>
              <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{job.title}</h1>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.9rem', flexWrap: 'wrap', marginTop: '0.25rem' }}>
                <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{job.company}</span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <MapPin size={14} /> {job.location} ({job.workMode})
                </span>
                <span>•</span>
                <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#34d399', fontWeight: 600 }}>
                  <IndianRupee size={14} /> {job.salaryRange}
                </span>
                <span>•</span>
                <span className="badge badge-cyan" style={{ fontSize: '0.72rem' }}>
                  {job.sourceBadge}
                </span>
              </div>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className={`score-pill ${score >= 75 ? 'score-high' : score >= 50 ? 'score-mid' : 'score-low'}`} style={{ fontSize: '1rem', padding: '0.5rem 1rem' }}>
              <Zap size={16} /> {score}% ATS Match
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {job.matchResult.tier}
            </div>
          </div>
        </div>

        {/* Quick ATS Breakdown Banner */}
        <div style={{
          background: 'rgba(15, 23, 42, 0.6)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem',
          border: '1px solid var(--border-subtle)'
        }}>
          <div>
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c7d2fe' }}>
              ATS Compatibility Snapshot for {candidate.name}:
            </div>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
              {job.matchResult.matchedSkills.length} matching skills, {job.matchResult.missingSkills.length} missing. Experience is a {job.experienceRequired} fit.
            </div>
          </div>

          <button 
            onClick={() => navigateTo('screen-17', { jobId: job.id })}
            className="btn btn-primary btn-sm"
          >
            <Zap size={14} /> View Deep ATS Analysis (Screen 17)
          </button>
        </div>
      </div>

      {/* 2-Column Content: Left Details, Right Company Intel */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.75rem', marginBottom: '3.5rem' }}>
        {/* Left Column: Full Description */}
        <div className="glass-card">
          <h2 style={{ fontSize: '1.25rem', marginBottom: '1rem', borderBottom: '1px solid var(--border-subtle)', paddingBottom: '0.5rem' }}>
            Role Description & Scope
          </h2>
          <p style={{ color: 'var(--text-secondary)', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '1.5rem' }}>
            {job.description}
          </p>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#c7d2fe' }}>
            Key Responsibilities
          </h3>
          <ul style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', lineHeight: 1.6, paddingLeft: '1.25rem', marginBottom: '1.5rem' }}>
            <li>Architect and deploy high-throughput, low-latency microservices handling millions of daily transactions.</li>
            <li>Collaborate with product, QA, and security teams on API specifications, event-driven workflows, and fault tolerance.</li>
            <li>Optimize PostgreSQL query performance, connection pooling, and Redis distributed caching layers.</li>
            <li>Implement automated unit tests, CI/CD pipelines, and infrastructure as code using Docker and AWS.</li>
          </ul>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <CheckCircle2 size={16} /> Required Technical Proficiencies
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {job.requiredSkills.map(skill => (
              <span key={skill} className="badge badge-indigo" style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}>
                {skill}
              </span>
            ))}
          </div>

          <h3 style={{ fontSize: '1.1rem', marginBottom: '0.75rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <AlertCircle size={16} /> Preferred / Bonus Skills
          </h3>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.5rem' }}>
            {job.preferredSkills.map(skill => (
              <span key={skill} className="badge badge-warning" style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem' }}>
                {skill}
              </span>
            ))}
          </div>
        </div>

        {/* Right Column: Company & Portal Verification */}
        <div>
          <div className="glass-card" style={{ marginBottom: '1.5rem' }}>
            <h3 style={{ fontSize: '1.1rem', marginBottom: '1rem' }}>Company Overview</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Company:</strong> {job.company}
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Headquarters:</strong> {job.location}, India
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Experience Range:</strong> {job.experienceRequired}
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Compensation:</strong> {job.salaryRange}
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Source:</strong> {job.portalSource}
              </div>
              <div>
                <strong style={{ color: 'var(--text-primary)' }}>Automation:</strong>{' '}
                {job.autoApplySupported ? (
                  <span className="badge badge-success">Supported</span>
                ) : (
                  <span className="badge badge-warning">Manual Portal</span>
                )}
              </div>
            </div>

            <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
              <a 
                href={job.applyUrl} 
                target="_blank" 
                rel="noreferrer"
                className="btn btn-outline btn-sm btn-full"
                style={{ fontSize: '0.8rem' }}
              >
                Open Original Portal Link <ExternalLink size={12} />
              </a>
            </div>
          </div>

          {/* Action Card */}
          <div className="glass-card" style={{ border: '1px solid var(--border-glow)' }}>
            <h3 style={{ fontSize: '1.05rem', marginBottom: '0.75rem' }}>Take Action</h3>
            <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
              Candidate profile: {candidate.name} ({candidate.experienceYears} yrs)
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {isApplied ? (
                <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '0.75rem', borderRadius: 'var(--radius-md)', textAlign: 'center', color: '#34d399', fontSize: '0.85rem' }}>
                  <Check size={16} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
                  Application recorded in tracker
                </div>
              ) : (
                <button 
                  onClick={() => {
                    if (job.autoApplySupported) {
                      navigateTo('screen-18', { jobId: job.id });
                    } else {
                      navigateTo('screen-20', { jobId: job.id });
                    }
                  }}
                  className="btn btn-primary btn-full"
                >
                  <Send size={15} />
                  {job.autoApplySupported ? 'Auto-Apply (Screen 18)' : 'Manual Portal Assistant (Screen 20)'}
                </button>
              )}

              <button 
                onClick={() => toggleSaveJob(job.id)}
                className={`btn ${isSaved ? 'btn-secondary' : 'btn-outline'} btn-full btn-sm`}
              >
                <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                {isSaved ? 'Saved to Bookmarks' : 'Bookmark Job'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
