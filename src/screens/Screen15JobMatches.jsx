import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Search, Filter, Bookmark, Zap, MapPin, IndianRupee, 
  Building2, CheckCircle2, AlertCircle, ArrowRight, Eye, Send, Check 
} from 'lucide-react';

export function Screen15JobMatches() {
  const { 
    jobMatches, navigateTo, savedJobIds, toggleSaveJob, 
    automationSettings, applications 
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedScoreTier, setSelectedScoreTier] = useState('all'); // 'all' | 'strong' | 'potential'
  const [selectedLocation, setSelectedLocation] = useState('all');
  const [selectedWorkMode, setSelectedWorkMode] = useState('all');
  const [selectedSource, setSelectedSource] = useState('all');
  const [sortBy, setSortBy] = useState('score'); // 'score' | 'recent' | 'salary'

  const appliedJobIds = applications.map(a => a.jobId);

  const filteredJobs = jobMatches.filter(job => {
    // Search query filter
    const q = searchQuery.toLowerCase();
    const matchesSearch = !q || 
      job.title.toLowerCase().includes(q) || 
      job.company.toLowerCase().includes(q) || 
      (job.requiredSkills || []).some(s => s.toLowerCase().includes(q));

    if (!matchesSearch) return false;

    // Score Tier filter
    const score = job.matchResult.totalScore;
    if (selectedScoreTier === 'strong' && score < 75) return false;
    if (selectedScoreTier === 'potential' && (score < 50 || score >= 75)) return false;

    // Location filter
    if (selectedLocation !== 'all' && !job.location.toLowerCase().includes(selectedLocation.toLowerCase())) return false;

    // Work Mode filter
    if (selectedWorkMode !== 'all' && job.workMode.toLowerCase() !== selectedWorkMode.toLowerCase()) return false;

    // Source filter
    if (selectedSource !== 'all' && !job.portalSource.toLowerCase().includes(selectedSource.toLowerCase())) return false;

    return true;
  }).sort((a, b) => {
    if (sortBy === 'score') return b.matchResult.totalScore - a.matchResult.totalScore;
    if (sortBy === 'salary') return b.salaryRange.localeCompare(a.salaryRange);
    return a.id.localeCompare(b.id);
  });

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
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
            SCREEN 15 • JOB FEED & DISCOVERY
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Matched Job Openings
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Live deduplicated positions ranked by ATS compatibility against your active resume.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => navigateTo('screen-30')}
            className="btn btn-outline btn-sm"
          >
            Live Feeds Health (Screen 30)
          </button>
          <button 
            onClick={() => navigateTo('screen-21')}
            className="btn btn-secondary btn-sm"
          >
            View Tracked Applications ({applications.length})
          </button>
        </div>
      </div>

      {/* Search & Multi-Faceted Filters */}
      <div className="glass-card" style={{ padding: '1.25rem', marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '1rem', flexWrap: 'wrap' }}>
          <div style={{ flex: 1, minWidth: '260px', position: 'relative' }}>
            <Search size={16} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
            <input 
              id="job-search-input"
              type="text" 
              className="form-input" 
              placeholder="Search by title, company, or tech stack (e.g. Python, FastAPI, Docker)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{ paddingLeft: '2.4rem' }}
            />
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
            <select 
              className="screen-select-dropdown"
              value={selectedScoreTier}
              onChange={(e) => setSelectedScoreTier(e.target.value)}
            >
              <option value="all">All Match Scores</option>
              <option value="strong">Strong Match (≥75%)</option>
              <option value="potential">Potential (50–74%)</option>
            </select>

            <select 
              className="screen-select-dropdown"
              value={selectedWorkMode}
              onChange={(e) => setSelectedWorkMode(e.target.value)}
            >
              <option value="all">All Work Modes</option>
              <option value="remote">Remote</option>
              <option value="hybrid">Hybrid</option>
              <option value="on-site">On-site</option>
            </select>

            <select 
              className="screen-select-dropdown"
              value={selectedLocation}
              onChange={(e) => setSelectedLocation(e.target.value)}
            >
              <option value="all">All Locations</option>
              <option value="bangalore">Bangalore</option>
              <option value="hyderabad">Hyderabad</option>
              <option value="pune">Pune</option>
              <option value="gurgaon">Gurgaon</option>
            </select>

            <select 
              className="screen-select-dropdown"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="score">Sort: Highest Match Score</option>
              <option value="salary">Sort: Compensation</option>
              <option value="recent">Sort: Discovery Date</option>
            </select>
          </div>
        </div>

        {/* Quick Filter Tag Badges */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', fontSize: '0.8rem', color: 'var(--text-muted)' }}>
          <span>Active Filters:</span>
          {selectedScoreTier !== 'all' && <span className="badge badge-indigo">Score: {selectedScoreTier}</span>}
          {selectedWorkMode !== 'all' && <span className="badge badge-cyan">Mode: {selectedWorkMode}</span>}
          {selectedLocation !== 'all' && <span className="badge badge-warning">City: {selectedLocation}</span>}
          {searchQuery && <span className="badge badge-indigo">Query: "{searchQuery}"</span>}
          {(selectedScoreTier !== 'all' || selectedWorkMode !== 'all' || selectedLocation !== 'all' || searchQuery) && (
            <button 
              onClick={() => { setSelectedScoreTier('all'); setSelectedWorkMode('all'); setSelectedLocation('all'); setSearchQuery(''); }}
              style={{ color: '#f87171', fontSize: '0.78rem', textDecoration: 'underline', marginLeft: '0.4rem' }}
            >
              Reset Filters
            </button>
          )}
        </div>
      </div>

      {/* Results Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1rem', fontSize: '0.88rem', color: 'var(--text-secondary)' }}>
        <div>
          Showing <strong>{filteredJobs.length}</strong> verified positions
        </div>
        <div style={{ fontSize: '0.78rem' }}>
          Auto-apply threshold active: <strong style={{ color: '#38bdf8' }}>≥ {automationSettings.autoApplyThreshold}%</strong>
        </div>
      </div>

      {/* Jobs List */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3.5rem' }}>
        {filteredJobs.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              No jobs found matching your current filter criteria.
            </p>
            <button 
              onClick={() => { setSelectedScoreTier('all'); setSelectedWorkMode('all'); setSelectedLocation('all'); setSearchQuery(''); }}
              className="btn btn-secondary btn-sm"
            >
              Clear All Filters
            </button>
          </div>
        ) : (
          filteredJobs.map((job) => {
            const score = job.matchResult.totalScore;
            const isSaved = savedJobIds.includes(job.id);
            const isApplied = appliedJobIds.includes(job.id);

            return (
              <div 
                key={job.id} 
                className="glass-card"
                style={{
                  border: score >= 75 ? '1px solid rgba(99, 102, 241, 0.35)' : '1px solid var(--border-subtle)'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '0.75rem' }}>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                    <div style={{
                      fontSize: '1.75rem',
                      width: '46px',
                      height: '46px',
                      borderRadius: '10px',
                      background: 'var(--bg-tertiary)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      border: '1px solid var(--border-subtle)'
                    }}>
                      {job.companyLogo}
                    </div>

                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                        <h3 
                          onClick={() => navigateTo('screen-16', { jobId: job.id })}
                          style={{ fontSize: '1.2rem', fontWeight: 700, cursor: 'pointer', hover: { color: '#818cf8' } }}
                        >
                          {job.title}
                        </h3>
                        <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                          {job.sourceBadge}
                        </span>
                      </div>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem', flexWrap: 'wrap', marginTop: '0.2rem' }}>
                        <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{job.company}</span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
                          <MapPin size={13} /> {job.location} ({job.workMode})
                        </span>
                        <span>•</span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: '0.2rem', color: '#34d399', fontWeight: 600 }}>
                          <IndianRupee size={13} /> {job.salaryRange}
                        </span>
                        <span>•</span>
                        <span>{job.experienceRequired}</span>
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <button 
                      onClick={() => toggleSaveJob(job.id)}
                      className={`btn btn-sm ${isSaved ? 'btn-primary' : 'btn-outline'}`}
                      style={{ padding: '0.35rem 0.65rem' }}
                      title={isSaved ? 'Saved to bookmarks' : 'Save job'}
                    >
                      <Bookmark size={14} fill={isSaved ? 'currentColor' : 'none'} />
                    </button>

                    <div className={`score-pill ${score >= 75 ? 'score-high' : score >= 50 ? 'score-mid' : 'score-low'}`}>
                      <Zap size={14} /> {score}% ATS Score
                    </div>
                  </div>
                </div>

                {/* Matched & Missing Skills Snippet */}
                <div style={{ background: 'rgba(15, 23, 42, 0.55)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', marginBottom: '1rem', fontSize: '0.82rem' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.35rem' }}>
                    <span style={{ fontWeight: 600, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                      <CheckCircle2 size={13} /> Matched:
                    </span>
                    {job.matchResult.matchedSkills.slice(0, 5).map(s => (
                      <span key={s} className="badge badge-success" style={{ fontSize: '0.72rem' }}>
                        {s}
                      </span>
                    ))}
                    {job.matchResult.matchedSkills.length > 5 && (
                      <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                        +{job.matchResult.matchedSkills.length - 5} more
                      </span>
                    )}
                  </div>

                  {job.matchResult.missingSkills.length > 0 && (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <AlertCircle size={13} /> Desired:
                      </span>
                      {job.matchResult.missingSkills.slice(0, 3).map(s => (
                        <span key={s} className="badge badge-warning" style={{ fontSize: '0.72rem' }}>
                          {s}
                        </span>
                      ))}
                    </div>
                  )}
                </div>

                {/* Bottom Card Actions */}
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                  <div style={{ display: 'flex', gap: '0.5rem' }}>
                    <button 
                      onClick={() => navigateTo('screen-16', { jobId: job.id })}
                      className="btn btn-outline btn-sm"
                    >
                      <Eye size={13} /> View Full Description (Screen 16)
                    </button>
                    <button 
                      onClick={() => navigateTo('screen-17', { jobId: job.id })}
                      className="btn btn-outline btn-sm"
                    >
                      <Zap size={13} /> ATS Deep Analysis (Screen 17)
                    </button>
                  </div>

                  <div>
                    {isApplied ? (
                      <span className="badge badge-success" style={{ padding: '0.45rem 0.85rem' }}>
                        <Check size={14} /> Applied
                      </span>
                    ) : (
                      <button 
                        onClick={() => {
                          if (job.autoApplySupported) {
                            navigateTo('screen-18', { jobId: job.id });
                          } else {
                            navigateTo('screen-20', { jobId: job.id });
                          }
                        }}
                        className="btn btn-primary btn-sm"
                      >
                        <Send size={13} /> 
                        {job.autoApplySupported ? 'Auto-Apply' : 'Manual Portal'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
