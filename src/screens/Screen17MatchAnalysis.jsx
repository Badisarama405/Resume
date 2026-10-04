import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Zap, CheckCircle2, AlertCircle, ArrowLeft, ArrowRight, 
  Lightbulb, Sparkles, Building2, MapPin, IndianRupee, Send, Check 
} from 'lucide-react';

export function Screen17MatchAnalysis() {
  const { 
    selectedJobId, jobMatches, navigateTo, candidate, 
    applications, addApplication, automationSettings 
  } = useApp();

  const job = jobMatches.find(j => j.id === selectedJobId) || jobMatches[0];

  if (!job) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3>No Job Selected</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Please select a job to see ATS match breakdown.</p>
          <button onClick={() => navigateTo('screen-15')} className="btn btn-primary">Go to Job Feed</button>
        </div>
      </div>
    );
  }

  const { totalScore = 85, tier = 'Strong Match', matchedSkills = [], missingSkills = [], breakdown = {} } = job.matchResult || {};
  const isApplied = applications.some(a => a.jobId === job.id);

  const [activeTab, setActiveTab] = useState('skills'); // 'skills' | 'dimensions' | 'optimization'

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '920px' }}>
      {/* Back button */}
      <button 
        onClick={() => navigateTo('screen-15')}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1.25rem' }}
      >
        <ArrowLeft size={14} /> Back to Job Feed (Screen 15)
      </button>

      {/* Hero Match Score Summary */}
      <div className="glass-card" style={{ marginBottom: '2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{
          display: 'inline-flex',
          padding: '0.3rem 0.75rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.12)',
          color: '#a5b4fc',
          fontSize: '0.75rem',
          fontWeight: 700,
          marginBottom: '0.75rem'
        }}>
          SCREEN 17 • EXPLAINABLE ATS COMPATIBILITY ENGINE
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div>
            <h1 style={{ fontSize: '1.75rem', fontWeight: 800 }}>
              Deep Match Analysis
            </h1>
            <div style={{ fontSize: '1.05rem', color: '#c7d2fe', marginTop: '0.2rem' }}>
              {candidate.name} ({candidate.headline}) ↔ {job.title} at {job.company}
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.5rem', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <MapPin size={13} /> {job.location} ({job.workMode})
              </span>
              <span>•</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', color: '#34d399', fontWeight: 600 }}>
                <IndianRupee size={13} /> {job.salaryRange}
              </span>
              <span>•</span>
              <span>Required: {job.experienceRequired}</span>
            </div>
          </div>

          {/* Big Radial Score Gauge */}
          <div style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--bg-tertiary)',
            padding: '1.25rem 1.75rem',
            borderRadius: 'var(--radius-lg)',
            border: '1px solid var(--border-glow)',
            boxShadow: 'var(--shadow-glow)'
          }}>
            <div style={{ fontSize: '2.5rem', fontWeight: 900, color: totalScore >= 75 ? '#34d399' : totalScore >= 50 ? '#fbbf24' : '#f87171', lineHeight: 1 }}>
              {totalScore}<span style={{ fontSize: '1.1rem', color: 'var(--text-muted)' }}>/100</span>
            </div>
            <div className={`badge ${totalScore >= 75 ? 'badge-success' : totalScore >= 50 ? 'badge-warning' : 'badge-danger'}`} style={{ marginTop: '0.5rem' }}>
              <Zap size={12} /> {tier}
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', borderBottom: '1px solid var(--border-medium)', paddingBottom: '0.5rem' }}>
        <button 
          onClick={() => setActiveTab('skills')}
          className={`btn btn-sm ${activeTab === 'skills' ? 'btn-primary' : 'btn-outline'}`}
        >
          Matched & Missing Skills ({matchedSkills.length}/{missingSkills.length})
        </button>
        <button 
          onClick={() => setActiveTab('dimensions')}
          className={`btn btn-sm ${activeTab === 'dimensions' ? 'btn-primary' : 'btn-outline'}`}
        >
          5-Dimension Score Calculation
        </button>
        <button 
          onClick={() => setActiveTab('optimization')}
          className={`btn btn-sm ${activeTab === 'optimization' ? 'btn-primary' : 'btn-outline'}`}
        >
          💡 ATS Resume Optimization Tips
        </button>
      </div>

      {/* Tab 1: Matched vs Missing Skills */}
      {activeTab === 'skills' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem', marginBottom: '2.5rem' }}>
          {/* Matched Skills */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.15rem', color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <CheckCircle2 size={18} /> Verified Matched Skills ({matchedSkills.length})
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              These skills found in your verified resume match the role's primary requirements:
            </p>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '0.75rem' }}>
              {matchedSkills.map(skill => (
                <div key={skill} style={{
                  background: 'rgba(16, 185, 129, 0.1)',
                  border: '1px solid rgba(16, 185, 129, 0.3)',
                  padding: '0.65rem 0.85rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem'
                }}>
                  <Check size={14} color="#34d399" />
                  <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#ffffff' }}>{skill}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Missing Skills */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.15rem', color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.5rem' }}>
              <AlertCircle size={18} /> Skill Gaps Identified ({missingSkills.length})
            </h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              These competencies are requested in the job description but were not detected in your resume:
            </p>
            {missingSkills.length === 0 ? (
              <div style={{ color: '#34d399', fontSize: '0.9rem' }}>
                🎉 No skill gaps! Your profile covers 100% of the job requirements.
              </div>
            ) : (
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(220px, 1fr))', gap: '0.75rem' }}>
                {missingSkills.map(skill => (
                  <div key={skill} style={{
                    background: 'rgba(245, 158, 11, 0.1)',
                    border: '1px solid rgba(245, 158, 11, 0.3)',
                    padding: '0.65rem 0.85rem',
                    borderRadius: 'var(--radius-md)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between'
                  }}>
                    <span style={{ fontWeight: 600, fontSize: '0.88rem', color: '#fbbf24' }}>{skill}</span>
                    <span className="badge badge-warning" style={{ fontSize: '0.68rem' }}>Gap</span>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Tab 2: 5-Dimension Score Calculation */}
      {activeTab === 'dimensions' && (
        <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
          <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>
            5-Dimension Weighted Calculation Breakdown
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            CareerPilot calculates every score deterministically using clear weights so you always know why you match.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {[
              {
                title: '1. Core Required Skills',
                weight: '40% Weight',
                score: breakdown.requiredSkillsScore,
                max: 40,
                desc: 'Evaluates required foundational technologies against candidate resume keywords.'
              },
              {
                title: '2. Experience Level & Seniority',
                weight: '25% Weight',
                score: breakdown.experienceScore,
                max: 25,
                desc: `Candidate has ${candidate.experienceYears} years vs role requirement of ${job.experienceRequired}.`
              },
              {
                title: '3. Preferred / Good-to-Have Skills',
                weight: '15% Weight',
                score: breakdown.preferredSkillsScore,
                max: 15,
                desc: 'Bonus points awarded for secondary technologies like Kafka, Redis, or Kubernetes.'
              },
              {
                title: '4. Location & Work Mode Fit',
                weight: '10% Weight',
                score: breakdown.locationScore,
                max: 10,
                desc: `Job is ${job.location} (${job.workMode}). Candidate targets ${candidate.targetLocations?.join(', ')}.`
              },
              {
                title: '5. Job Title & Degree Relevance',
                weight: '10% Weight',
                score: breakdown.titleRelevanceScore,
                max: 10,
                desc: 'Semantic alignment between previous titles and target vacancy title.'
              }
            ].map(dim => (
              <div key={dim.title} style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                  <div>
                    <strong style={{ fontSize: '0.92rem' }}>{dim.title}</strong>
                    <span className="badge badge-indigo" style={{ marginLeft: '0.5rem', fontSize: '0.72rem' }}>{dim.weight}</span>
                  </div>
                  <div style={{ fontWeight: 800, fontSize: '1rem', color: '#38bdf8' }}>
                    {dim.score} / {dim.max} pts
                  </div>
                </div>

                <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.6rem' }}>
                  {dim.desc}
                </div>

                <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.08)', borderRadius: '4px', overflow: 'hidden' }}>
                  <div style={{
                    width: `${(dim.score / dim.max) * 100}%`,
                    height: '100%',
                    background: 'var(--accent-gradient)',
                    borderRadius: '4px'
                  }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Tab 3: Resume Optimization Advice */}
      {activeTab === 'optimization' && (
        <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <Lightbulb size={20} color="#fbbf24" />
            <h3 style={{ fontSize: '1.2rem', fontWeight: 700 }}>
              AI ATS Tailoring Recommendations
            </h3>
          </div>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.5rem' }}>
            Small adjustments to your resume phrasing can increase your recruiter callback rate by up to 300%.
          </p>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div style={{ background: 'rgba(99, 102, 241, 0.1)', border: '1px solid rgba(99, 102, 241, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#c7d2fe', marginBottom: '0.35rem' }}>
                1. Add Missing Keyword: "{missingSkills[0] || 'Kafka'}"
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Mention any hands-on exposure, message queues, or event-driven streaming projects using {missingSkills[0] || 'Kafka'} under your recent company experience bullet points.
              </p>
            </div>

            <div style={{ background: 'rgba(6, 182, 212, 0.1)', border: '1px solid rgba(6, 182, 212, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#67e8f9', marginBottom: '0.35rem' }}>
                2. Highlight High-Throughput Metrics
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                {job.company} prioritizes scale. Add bullet points quantifying transaction volumes (e.g. <em>"Handled 2M+ requests/day with &lt;50ms latency using FastAPI"</em>).
              </p>
            </div>

            <div style={{ background: 'rgba(16, 185, 129, 0.1)', border: '1px solid rgba(16, 185, 129, 0.3)', borderRadius: 'var(--radius-md)', padding: '1rem' }}>
              <div style={{ fontWeight: 700, fontSize: '0.92rem', color: '#34d399', marginBottom: '0.35rem' }}>
                3. Primary Tech Stack Title
              </div>
              <p style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', lineHeight: 1.5 }}>
                Ensure your resume header explicitly states <strong>{job.title}</strong> to maximize ATS keyword parse weighting.
              </p>
            </div>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="glass-card" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', border: '1px solid var(--border-glow)' }}>
        <div>
          <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>Ready to proceed with this application?</div>
          <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            Score is {totalScore}% (Threshold: ≥ {automationSettings?.autoApplyThreshold || 75}%)
          </div>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button 
            onClick={() => navigateTo('screen-16', { jobId: job.id })}
            className="btn btn-outline btn-sm"
          >
            Review JD Again
          </button>

          {isApplied ? (
            <span className="badge badge-success" style={{ padding: '0.5rem 1rem' }}>
              <Check size={14} /> Already Applied
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
              <Send size={14} />
              {job.autoApplySupported ? 'Auto-Apply Now (Screen 18)' : 'Open Manual Portal (Screen 20)'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
