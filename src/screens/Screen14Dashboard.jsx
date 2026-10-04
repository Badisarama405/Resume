import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Briefcase, Send, AlertTriangle, Zap, CheckCircle2, 
  ArrowRight, TrendingUp, Sparkles, Building2, MapPin, IndianRupee, Bell, Crown 
} from 'lucide-react';

export function Screen14Dashboard() {
  const { 
    user, candidate, jobMatches, applications, 
    automationSettings, navigateTo 
  } = useApp();

  const strongMatches = jobMatches.filter(j => j.matchResult.totalScore >= (automationSettings.autoApplyThreshold || 75));
  const actionRequiredApps = applications.filter(a => a.status === 'Action Required');
  const appliedCount = applications.filter(a => a.status === 'Applied').length;

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      {/* Welcome & Persona Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '2rem' }}>
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
            SCREEN 14 • JOB COMMAND CENTER
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Good Afternoon, {candidate.name.split(' ')[0]} 👋
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            {candidate.headline} • Bangalore / Hyderabad / Remote
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => navigateTo('screen-28')}
            className="btn btn-outline btn-sm"
          >
            <Crown size={14} color="#f59e0b" />
            {user.plan === 'pro' ? 'Pro Member' : 'Upgrade to Pro (₹499/mo)'}
          </button>
          <button 
            onClick={() => navigateTo('screen-15')}
            className="btn btn-primary btn-sm"
          >
            <Briefcase size={14} /> Explore All Jobs Feed
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', marginBottom: '2rem' }}>
        {/* KPI 1: New Jobs Today */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>New Jobs Ingested</span>
            <div style={{ background: 'rgba(6, 182, 212, 0.15)', padding: '0.4rem', borderRadius: '8px', color: '#22d3ee' }}>
              <TrendingUp size={16} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#ffffff' }}>47</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Collected today from 4 verified portals
          </div>
        </div>

        {/* KPI 2: Strong Matches */}
        <div className="glass-card" style={{ padding: '1.25rem', border: '1px solid rgba(99, 102, 241, 0.4)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Strong ATS Matches</span>
            <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.4rem', borderRadius: '8px', color: '#818cf8' }}>
              <Zap size={16} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>{strongMatches.length}</div>
          <div style={{ fontSize: '0.75rem', color: '#34d399', marginTop: '0.2rem' }}>
            ≥ {automationSettings.autoApplyThreshold}% compatibility threshold
          </div>
        </div>

        {/* KPI 3: Applications Dispatched */}
        <div className="glass-card" style={{ padding: '1.25rem' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Applications Sent</span>
            <div style={{ background: 'rgba(16, 185, 129, 0.15)', padding: '0.4rem', borderRadius: '8px', color: '#34d399' }}>
              <Send size={16} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#10b981' }}>{appliedCount}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            1 interview invitation active!
          </div>
        </div>

        {/* KPI 4: Action Required */}
        <div className="glass-card" style={{ padding: '1.25rem', border: actionRequiredApps.length > 0 ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.5rem' }}>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-muted)' }}>Action Required</span>
            <div style={{ background: 'rgba(245, 158, 11, 0.15)', padding: '0.4rem', borderRadius: '8px', color: '#fbbf24' }}>
              <AlertTriangle size={16} />
            </div>
          </div>
          <div style={{ fontSize: '2rem', fontWeight: 800, color: '#fbbf24' }}>{actionRequiredApps.length}</div>
          <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
            Manual portal verification needed
          </div>
        </div>
      </div>

      {/* Action Required Banner if any */}
      {actionRequiredApps.length > 0 && (
        <div style={{
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem 1.5rem',
          marginBottom: '2rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '1rem'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
            <AlertTriangle size={24} color="#fbbf24" />
            <div>
              <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#fbbf24' }}>
                Manual Action Required: {actionRequiredApps[0].company} ({actionRequiredApps[0].title})
              </div>
              <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                {actionRequiredApps[0].notes || 'Company requires direct candidate security verification on their portal.'}
              </div>
            </div>
          </div>

          <button 
            onClick={() => navigateTo('screen-20', { jobId: actionRequiredApps[0].jobId })}
            className="btn btn-warning btn-sm"
            style={{ background: '#f59e0b', color: '#000000', fontWeight: 700 }}
          >
            Open Assistant (Screen 20) <ArrowRight size={14} />
          </button>
        </div>
      )}

      {/* 2-Column Content: High Match Feed vs Quota & Settings */}
      <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '1.75rem', marginBottom: '3rem' }}>
        {/* Top Matches Feed */}
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem' }}>
            <h2 style={{ fontSize: '1.25rem', fontWeight: 700 }}>Top Recommended Matches Today</h2>
            <button 
              onClick={() => navigateTo('screen-15')}
              style={{ fontSize: '0.82rem', color: '#818cf8', textDecoration: 'underline' }}
            >
              View all ({jobMatches.length}) →
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {strongMatches.slice(0, 4).map(job => (
              <div key={job.id} className="glass-card" style={{ padding: '1.1rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.65rem' }}>
                    <span style={{ fontSize: '1.5rem' }}>{job.companyLogo}</span>
                    <div>
                      <h3 
                        onClick={() => navigateTo('screen-16', { jobId: job.id })}
                        style={{ fontSize: '1.05rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        {job.title}
                      </h3>
                      <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>
                        {job.company} • {job.location} • <span style={{ color: '#34d399' }}>{job.salaryRange}</span>
                      </div>
                    </div>
                  </div>

                  <div className="score-pill score-high">
                    <Zap size={12} /> {job.matchResult.totalScore}%
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.75rem', paddingTop: '0.75rem', borderTop: '1px solid var(--border-subtle)' }}>
                  <div style={{ display: 'flex', gap: '0.35rem', flexWrap: 'wrap' }}>
                    {job.matchResult.matchedSkills.slice(0, 3).map(s => (
                      <span key={s} className="badge badge-indigo" style={{ fontSize: '0.7rem' }}>{s}</span>
                    ))}
                  </div>

                  <button 
                    onClick={() => navigateTo('screen-16', { jobId: job.id })}
                    className="btn btn-outline btn-sm"
                    style={{ fontSize: '0.78rem', padding: '0.3rem 0.65rem' }}
                  >
                    View Details →
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Right Column: Quota & System Health */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
          {/* Monthly Quota Meter */}
          <div className="glass-card">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>Plan Usage & Limits</h3>
              <span className={`badge ${user.plan === 'pro' ? 'badge-success' : 'badge-warning'}`}>
                {user.plan.toUpperCase()}
              </span>
            </div>

            <div style={{ marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Daily Job Matches</span>
                <strong>{user.dailyMatchesUsed} / {user.dailyMatchQuota}</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px' }}>
                <div style={{ width: `${(user.dailyMatchesUsed / user.dailyMatchQuota) * 100}%`, height: '100%', background: 'var(--accent-gradient)', borderRadius: '3px' }} />
              </div>
            </div>

            <div style={{ marginBottom: '1.5rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                <span style={{ color: 'var(--text-secondary)' }}>Monthly Auto-Applies</span>
                <strong>{user.monthlyAutoAppliesUsed} / {user.monthlyAutoApplyQuota}</strong>
              </div>
              <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px' }}>
                <div style={{ width: `${(user.monthlyAutoAppliesUsed / user.monthlyAutoApplyQuota) * 100}%`, height: '100%', background: '#10b981', borderRadius: '3px' }} />
              </div>
            </div>

            <button 
              onClick={() => navigateTo('screen-28')}
              className="btn btn-primary btn-sm btn-full"
            >
              <Crown size={14} /> Upgrade to Pro (₹499/mo)
            </button>
          </div>

          {/* Quick Automation Safeguard Card */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '0.5rem' }}>Automation Rules</h3>
            <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
              <div>• Auto-Apply Threshold: <strong>≥ {automationSettings.autoApplyThreshold}%</strong></div>
              <div>• Execution Mode: <strong>{automationSettings.applicationMode === 'ask' ? 'Ask Me Before Applying' : automationSettings.applicationMode}</strong></div>
              <div>• Daily Digest: <strong>8:00 AM IST</strong></div>
            </div>

            <button 
              onClick={() => navigateTo('screen-26')}
              className="btn btn-outline btn-sm btn-full"
            >
              Modify Rules (Screen 26)
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
