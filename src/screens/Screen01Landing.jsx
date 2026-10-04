import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, ArrowRight, UploadCloud, CheckCircle2, AlertCircle, 
  ShieldCheck, Zap, TrendingUp, Building2, MapPin, IndianRupee, Eye, Check
} from 'lucide-react';

export function Screen01Landing() {
  const { navigateTo } = useApp();
  const [showSampleDetail, setShowSampleDetail] = useState(false);

  return (
    <div className="container" style={{ paddingTop: '2.5rem' }}>
      {/* Hero Section */}
      <div style={{ textAlign: 'center', maxWidth: '840px', margin: '0 auto 3.5rem auto' }}>
        <div style={{
          display: 'inline-flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.4rem 1rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.12)',
          border: '1px solid rgba(99, 102, 241, 0.3)',
          marginBottom: '1.25rem'
        }}>
          <Sparkles size={16} color="#818cf8" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#c7d2fe' }}>
            Built for Indian IT Professionals • 2–5 Years Experience
          </span>
        </div>

        <h1 style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 800, letterSpacing: '-0.03em', marginBottom: '1.25rem' }}>
          Find Jobs That <span className="gradient-text">Actually Match</span> Your Skills.
        </h1>

        <p style={{ fontSize: '1.15rem', color: 'var(--text-secondary)', lineHeight: 1.6, marginBottom: '2rem' }}>
          Stop blind-applying on Naukri and LinkedIn. CareerPilot extracts your resume, calculates your verified ATS compatibility score (0–100), and auto-applies or delivers 1-click verified job links.
        </p>

        <div style={{ display: 'flex', gap: '0.85rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <button 
            id="hero-cta-upload"
            onClick={() => navigateTo('screen-08')}
            className="btn btn-primary btn-lg"
          >
            <UploadCloud size={20} />
            Upload Resume & Find Jobs
          </button>
          <button 
            id="hero-cta-signup"
            onClick={() => navigateTo('screen-02')}
            className="btn btn-secondary btn-lg"
          >
            Create Free Account <ArrowRight size={18} />
          </button>
          <button 
            id="hero-cta-signin"
            onClick={() => navigateTo('screen-04')}
            className="btn btn-outline btn-lg"
          >
            Sign In
          </button>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '1.5rem', marginTop: '1.5rem', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
          <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <ShieldCheck size={16} color="#10b981" /> 100% Private & Consent-Driven
          </span>
          <span>•</span>
          <span>Free Plan — No Credit Card Required</span>
          <span>•</span>
          <span>Bangalore, Hyderabad, Pune, NCR</span>
        </div>
      </div>

      {/* 3-Step Visual Process */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>How CareerPilot Works</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            From PDF resume to confirmed job interviews in 3 transparent steps
          </p>
        </div>

        <div className="grid-3">
          <div className="glass-card">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(99, 102, 241, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#818cf8',
              fontWeight: 700,
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              1
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Upload Resume</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Drop your PDF/DOCX resume. Our AI extracts your core tech stack, years of experience, current compensation, and target roles in under 5 seconds.
            </p>
          </div>

          <div className="glass-card">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(6, 182, 212, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#22d3ee',
              fontWeight: 700,
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              2
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Discover Matching Jobs</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              We ingest verified jobs across top company career portals and job feeds. Each job gets an explainable 0–100 ATS compatibility breakdown.
            </p>
          </div>

          <div className="glass-card">
            <div style={{
              width: '44px',
              height: '44px',
              borderRadius: '12px',
              background: 'rgba(16, 185, 129, 0.15)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#34d399',
              fontWeight: 700,
              fontSize: '1.1rem',
              marginBottom: '1rem'
            }}>
              3
            </div>
            <h3 style={{ fontSize: '1.2rem', marginBottom: '0.5rem' }}>Apply / Get Notified</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Jobs meeting your auto-application threshold (e.g. ≥75%) are automatically submitted where supported, or dispatched to your inbox with 1-click links.
            </p>
          </div>
        </div>
      </div>

      {/* Interactive Sample Job Card Preview */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '1.5rem' }}>
          <span className="badge badge-indigo" style={{ marginBottom: '0.5rem' }}>
            Interactive Demo Sample
          </span>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>See How Explainable ATS Matching Works</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            No black-box scores. Candidates see exactly why they scored 87% and what skills are missing.
          </p>
        </div>

        <div style={{ maxWidth: '780px', margin: '0 auto' }}>
          <div className="glass-card" style={{ border: '1px solid var(--border-glow)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.35rem' }}>
                  <span style={{ fontSize: '1.5rem' }}>💳</span>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700 }}>Senior Backend Engineer (Python/FastAPI)</h3>
                </div>
                <div style={{ display: 'flex', gap: '1rem', color: 'var(--text-secondary)', fontSize: '0.85rem' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <Building2 size={14} /> Razorpay
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                    <MapPin size={14} /> Bangalore (Hybrid)
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', color: '#34d399', fontWeight: 600 }}>
                    <IndianRupee size={14} /> ₹22 – 32 LPA
                  </span>
                </div>
              </div>

              <div style={{ textAlign: 'right' }}>
                <div className="score-pill score-high">
                  <Zap size={14} /> 87% ATS Match
                </div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                  Verified Compatibility
                </div>
              </div>
            </div>

            {/* Why You Match Breakdown */}
            <div style={{ background: 'rgba(15, 23, 42, 0.6)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.25rem' }}>
              <div style={{ marginBottom: '0.75rem' }}>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#34d399', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <CheckCircle2 size={14} /> Matched Requirements (6/7):
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  {['Python (Expert)', 'FastAPI', 'PostgreSQL', 'Docker', 'AWS', '3.5 yrs Experience'].map(skill => (
                    <span key={skill} className="badge badge-success">
                      <Check size={10} /> {skill}
                    </span>
                  ))}
                </div>
              </div>

              <div>
                <div style={{ fontSize: '0.8rem', fontWeight: 600, color: '#fbbf24', display: 'flex', alignItems: 'center', gap: '0.4rem', marginBottom: '0.4rem' }}>
                  <AlertCircle size={14} /> Missing / Bonus Skills (1):
                </div>
                <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                  <span className="badge badge-warning">
                    Kafka (Event Streaming)
                  </span>
                </div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.75rem' }}>
              <button 
                onClick={() => setShowSampleDetail(!showSampleDetail)}
                className="btn btn-outline btn-sm"
              >
                <Eye size={14} /> {showSampleDetail ? 'Hide Scoring Logic' : 'View Explainable Scoring Logic'}
              </button>
              <button 
                onClick={() => navigateTo('screen-02')}
                className="btn btn-primary btn-sm"
              >
                Match My Resume Against Jobs <ArrowRight size={14} />
              </button>
            </div>

            {showSampleDetail && (
              <div style={{ marginTop: '1.25rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-subtle)', fontSize: '0.85rem' }}>
                <h4 style={{ fontSize: '0.95rem', marginBottom: '0.5rem', color: '#c7d2fe' }}>
                  Detailed 5-Dimension Score Calculation:
                </h4>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '0.75rem' }}>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Core Skills (40%)</div>
                    <div style={{ fontWeight: 700, color: '#34d399' }}>36 / 40</div>
                  </div>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Experience (25%)</div>
                    <div style={{ fontWeight: 700, color: '#34d399' }}>25 / 25</div>
                  </div>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Preferred Skills (15%)</div>
                    <div style={{ fontWeight: 700, color: '#fbbf24' }}>8 / 15</div>
                  </div>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Location Match (10%)</div>
                    <div style={{ fontWeight: 700, color: '#34d399' }}>10 / 10</div>
                  </div>
                  <div style={{ background: 'var(--bg-tertiary)', padding: '0.5rem 0.75rem', borderRadius: 'var(--radius-sm)' }}>
                    <div style={{ color: 'var(--text-muted)', fontSize: '0.75rem' }}>Title Alignment (10%)</div>
                    <div style={{ fontWeight: 700, color: '#34d399' }}>8 / 10</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Free Tier vs Pro Summary */}
      <div style={{ marginBottom: '4rem' }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.8rem', fontWeight: 700 }}>Transparent Pricing Built for Job Seekers</h2>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            Start 100% free. Upgrade only when you want automated bulk submissions.
          </p>
        </div>

        <div className="grid-2" style={{ maxWidth: '850px', margin: '0 auto' }}>
          {/* Free Tier */}
          <div className="glass-card">
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>Free Plan</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              Ideal for exploring and targeted manual applications
            </p>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              ₹0 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ forever</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> 1 Resume Profile</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> 10 Job Matches / day</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> Basic ATS Compatibility Scoring</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> 5 Automatic Applications / month</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> Daily Email Digest & Alerts</li>
            </ul>
            <button 
              onClick={() => navigateTo('screen-02')}
              className="btn btn-outline btn-full"
            >
              Get Started Free
            </button>
          </div>

          {/* Pro Tier */}
          <div className="glass-card" style={{ border: '1px solid var(--accent-primary)', position: 'relative' }}>
            <div style={{
              position: 'absolute',
              top: '-12px',
              right: '20px',
              background: 'var(--accent-gradient)',
              color: '#ffffff',
              fontSize: '0.75rem',
              fontWeight: 700,
              padding: '0.2rem 0.6rem',
              borderRadius: 'var(--radius-full)'
            }}>
              RECOMMENDED
            </div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '0.25rem' }}>Pro Job Switcher</h3>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
              For active candidates applying to 20–30 jobs daily
            </p>
            <div style={{ fontSize: '2rem', fontWeight: 800, marginBottom: '1.25rem' }}>
              ₹499 <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
            </div>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.7rem', fontSize: '0.88rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> Up to 3 Resume Profiles (e.g. Backend / Fullstack)</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> 100 Job Matches / day</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> Detailed ATS Gap Analysis & Keyword Optimizer</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> 100 Automatic Applications / month</li>
              <li style={{ display: 'flex', gap: '0.5rem' }}><Check size={16} color="#10b981" /> Real-time instant job alerts & 90-day history</li>
            </ul>
            <button 
              onClick={() => navigateTo('screen-02')}
              className="btn btn-primary btn-full"
            >
              Start 7-Day Free Trial
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
