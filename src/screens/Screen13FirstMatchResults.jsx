import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, CheckCircle2, AlertCircle, ArrowRight, Zap, 
  Building2, MapPin, IndianRupee, ExternalLink, Check, Eye, Filter, Send
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function Screen13FirstMatchResults() {
  const { navigateTo, candidate, jobMatches, automationSettings, addApplication } = useApp();
  
  const [selectedFilter, setSelectedFilter] = useState('all'); // 'all' | 'strong' | 'remote'
  const [selectedJobForModal, setSelectedJobForModal] = useState(null);
  const [appliedJobIds, setAppliedJobIds] = useState([]);

  useEffect(() => {
    // Fire celebratory confetti on mount
    try {
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    } catch (e) {
      // safe fallback if canvas-confetti has restrictions
    }
  }, []);

  const strongMatchesCount = jobMatches.filter(j => j.matchResult.totalScore >= (automationSettings.autoApplyThreshold || 75)).length;

  const filteredJobs = jobMatches.filter(j => {
    if (selectedFilter === 'strong') return j.matchResult.totalScore >= 75;
    if (selectedFilter === 'remote') return j.workMode.toLowerCase() === 'remote';
    return true;
  });

  const handleApply = (job) => {
    addApplication(job, job.autoApplySupported ? 'Automated' : 'Manual');
    setAppliedJobIds(prev => [...prev, job.id]);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
      {/* Celebration Aha Banner */}
      <div style={{
        background: 'linear-gradient(135deg, rgba(99, 102, 241, 0.2) 0%, rgba(6, 182, 212, 0.15) 100%)',
        border: '1px solid var(--border-glow)',
        borderRadius: 'var(--radius-lg)',
        padding: '2rem',
        textAlign: 'center',
        marginBottom: '2.5rem',
        boxShadow: 'var(--shadow-glow)'
      }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.4rem',
          padding: '0.3rem 0.8rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.3)',
          color: '#ffffff',
          fontSize: '0.78rem',
          fontWeight: 700,
          marginBottom: '0.75rem'
        }}>
          <Sparkles size={14} /> SCREEN 13 • THE 60-SECOND AHA MOMENT
        </div>

        <h1 style={{ fontSize: 'clamp(1.8rem, 4vw, 2.5rem)', fontWeight: 800, marginBottom: '0.5rem' }}>
          🎉 You Have <span className="gradient-text">{strongMatchesCount} Strong Matches</span> Ready Right Now!
        </h1>

        <p style={{ color: 'var(--text-secondary)', fontSize: '1rem', maxWidth: '640px', margin: '0 auto 1.5rem auto' }}>
          CareerPilot evaluated your verified profile ({candidate.name} • {candidate.experienceYears} yrs exp) against 140+ active Indian tech positions.
        </p>

        {/* Quick Candidate Snapshot Chips */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '0.6rem', flexWrap: 'wrap', fontSize: '0.82rem' }}>
          <span className="badge badge-indigo">
            Candidate: {candidate.name}
          </span>
          <span className="badge badge-cyan">
            {candidate.skills?.length || 12} Verified Skills
          </span>
          <span className="badge badge-success">
            Auto-Apply Threshold: ≥ {automationSettings.autoApplyThreshold}%
          </span>
          <span className="badge badge-warning">
            Target: Bangalore / Hyderabad / Remote
          </span>
        </div>
      </div>

      {/* Filter Bar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => setSelectedFilter('all')}
            className={`btn btn-sm ${selectedFilter === 'all' ? 'btn-primary' : 'btn-outline'}`}
          >
            All Live Matches ({jobMatches.length})
          </button>
          <button 
            onClick={() => setSelectedFilter('strong')}
            className={`btn btn-sm ${selectedFilter === 'strong' ? 'btn-primary' : 'btn-outline'}`}
          >
            Strong Matches ≥ 75% ({strongMatchesCount})
          </button>
          <button 
            onClick={() => setSelectedFilter('remote')}
            className={`btn btn-sm ${selectedFilter === 'remote' ? 'btn-primary' : 'btn-outline'}`}
          >
            Remote Only
          </button>
        </div>

        <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
          Showing <strong>{filteredJobs.length}</strong> matching vacancies
        </div>
      </div>

      {/* Ranked Job Matches Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem', marginBottom: '3rem' }}>
        {filteredJobs.map((job) => {
          const score = job.matchResult.totalScore;
          const isApplied = appliedJobIds.includes(job.id);
          const isEligibleForAuto = score >= (automationSettings.autoApplyThreshold || 75);

          return (
            <div 
              key={job.id}
              className="glass-card"
              style={{
                border: isEligibleForAuto ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-subtle)',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.4rem' }}>
                    <span style={{ fontSize: '1.75rem' }}>{job.companyLogo}</span>
                    <div>
                      <h3 style={{ fontSize: '1.25rem', fontWeight: 700 }}>{job.title}</h3>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem', flexWrap: 'wrap' }}>
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
                        <span className="badge badge-cyan" style={{ fontSize: '0.7rem' }}>
                          {job.sourceBadge}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div style={{ textAlign: 'right' }}>
                  <div className={`score-pill ${score >= 75 ? 'score-high' : score >= 50 ? 'score-mid' : 'score-low'}`}>
                    <Zap size={14} /> {score}% ATS Score
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.25rem' }}>
                    {job.matchResult.tier}
                  </div>
                </div>
              </div>

              {/* Explainable Why You Match Section */}
              <div style={{
                background: 'rgba(15, 23, 42, 0.65)',
                borderRadius: 'var(--radius-md)',
                padding: '0.9rem 1.1rem',
                marginBottom: '1rem',
                fontSize: '0.85rem'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                  <span style={{ fontWeight: 600, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                    <CheckCircle2 size={15} /> Why You Match ({job.matchResult.matchedSkills.length} skills):
                  </span>
                  <span style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>
                    Experience fit: {job.experienceRequired} ({candidate.experienceYears} yrs profile)
                  </span>
                </div>

                <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
                  {job.matchResult.matchedSkills.map((skill) => (
                    <span key={skill} className="badge badge-success">
                      <Check size={11} /> {skill}
                    </span>
                  ))}
                </div>

                {job.matchResult.missingSkills.length > 0 && (
                  <div>
                    <span style={{ fontWeight: 600, color: '#fbbf24', display: 'inline-flex', alignItems: 'center', gap: '0.35rem', marginBottom: '0.3rem', fontSize: '0.8rem' }}>
                      <AlertCircle size={13} /> Missing / Desired:
                    </span>
                    <div style={{ display: 'inline-flex', gap: '0.4rem', flexWrap: 'wrap', marginLeft: '0.5rem' }}>
                      {job.matchResult.missingSkills.map((skill) => (
                        <span key={skill} className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {/* Actions & Eligibility Status */}
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                  <button 
                    onClick={() => setSelectedJobForModal(job)}
                    className="btn btn-outline btn-sm"
                  >
                    <Eye size={14} /> Full ATS Breakdown
                  </button>

                  {job.autoApplySupported ? (
                    <span className="badge badge-indigo" style={{ fontSize: '0.75rem' }}>
                      ⚡ 1-Click Auto-Apply Supported
                    </span>
                  ) : (
                    <span className="badge badge-warning" style={{ fontSize: '0.75rem' }}>
                      Manual Portal Form
                    </span>
                  )}
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {isApplied ? (
                    <span className="badge badge-success" style={{ padding: '0.5rem 1rem', fontSize: '0.85rem' }}>
                      <CheckCircle2 size={16} /> Application Recorded!
                    </span>
                  ) : (
                    <button 
                      onClick={() => handleApply(job)}
                      className="btn btn-primary btn-sm"
                    >
                      <Send size={14} />
                      {job.autoApplySupported ? 'Auto-Apply Now' : 'Apply on Portal'}
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Explainable ATS Breakdown Modal */}
      {selectedJobForModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '620px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div>
                <h3 style={{ fontSize: '1.25rem' }}>{selectedJobForModal.title}</h3>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  {selectedJobForModal.company} • {selectedJobForModal.location}
                </div>
              </div>
              <button 
                onClick={() => setSelectedJobForModal(null)}
                className="btn btn-outline btn-sm"
              >
                Close (×)
              </button>
            </div>

            <div style={{ textAlign: 'center', marginBottom: '1.5rem', background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
              <div style={{ fontSize: '2rem', fontWeight: 800, color: '#38bdf8' }}>
                {selectedJobForModal.matchResult.totalScore} / 100
              </div>
              <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
                Overall ATS Compatibility Score ({selectedJobForModal.matchResult.tier})
              </div>
            </div>

            <h4 style={{ fontSize: '0.95rem', marginBottom: '0.75rem', color: '#c7d2fe' }}>
              5-Dimension Weight Breakdown:
            </h4>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
              {[
                { name: 'Core Required Skills', score: selectedJobForModal.matchResult.breakdown.requiredSkillsScore, max: 40, weight: '40%' },
                { name: 'Experience & Seniority Fit', score: selectedJobForModal.matchResult.breakdown.experienceScore, max: 25, weight: '25%' },
                { name: 'Preferred / Good-to-Have Skills', score: selectedJobForModal.matchResult.breakdown.preferredSkillsScore, max: 15, weight: '15%' },
                { name: 'Location & Work Mode Alignment', score: selectedJobForModal.matchResult.breakdown.locationScore, max: 10, weight: '10%' },
                { name: 'Job Title & Degree Relevance', score: selectedJobForModal.matchResult.breakdown.titleRelevanceScore, max: 10, weight: '10%' }
              ].map(dim => (
                <div key={dim.name} style={{ background: 'rgba(255, 255, 255, 0.03)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.82rem', marginBottom: '0.3rem' }}>
                    <span>{dim.name} ({dim.weight})</span>
                    <strong style={{ color: '#34d399' }}>{dim.score} / {dim.max}</strong>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(dim.score / dim.max) * 100}%`,
                      height: '100%',
                      background: 'var(--accent-gradient)',
                      borderRadius: '3px'
                    }} />
                  </div>
                </div>
              ))}
            </div>

            <div style={{ background: 'rgba(99, 102, 241, 0.1)', padding: '0.85rem', borderRadius: 'var(--radius-md)', border: '1px solid rgba(99, 102, 241, 0.25)', fontSize: '0.8rem', color: '#c7d2fe', marginBottom: '1.25rem' }}>
              💡 <strong>AI ATS Tip:</strong> Adding keywords like <em>"{selectedJobForModal.matchResult.missingSkills.join(', ') || 'Docker'}"</em> to your project descriptions could increase your score to {Math.min(98, selectedJobForModal.matchResult.totalScore + 6)}%.
            </div>

            <button 
              onClick={() => {
                handleApply(selectedJobForModal);
                setSelectedJobForModal(null);
              }}
              className="btn btn-primary btn-full"
            >
              Apply to {selectedJobForModal.company} Now
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
