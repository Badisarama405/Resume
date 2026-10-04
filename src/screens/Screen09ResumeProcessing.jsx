import React, { useState, useEffect } from 'react';
import { useApp } from '../context/AppContext';
import { Sparkles, CheckCircle2, ArrowRight, Loader2, Cpu, FileText } from 'lucide-react';

export function Screen09ResumeProcessing() {
  const { navigateTo, candidate, uploadProgress } = useApp();
  const [stepIndex, setStepIndex] = useState(0);

  const steps = [
    { title: 'Uploading document', desc: 'Securely uploading to private storage sandbox' },
    { title: 'Parsing document structure', desc: 'Extracting contact info, sections, and formatting' },
    { title: 'Extracting technical skills & stack', desc: `Found ${candidate.skills?.length || 12} verified tech proficiencies` },
    { title: 'Analyzing experience & seniority', desc: `${candidate.experienceYears || 3.5} years in Software Engineering` },
    { title: 'Generating candidate profile', desc: 'Vectorizing resume for semantic ATS matching' }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setStepIndex((prev) => {
        if (prev < steps.length - 1) {
          return prev + 1;
        } else {
          clearInterval(timer);
          return prev;
        }
      });
    }, 900);

    return () => clearInterval(timer);
  }, []);

  const isCompleted = stepIndex >= steps.length - 1;

  return (
    <div className="container" style={{ paddingTop: '3.5rem', maxWidth: '640px' }}>
      <div className="glass-card" style={{ textAlign: 'center', padding: '2.5rem' }}>
        <div style={{
          display: 'inline-flex',
          padding: '0.35rem 0.85rem',
          borderRadius: 'var(--radius-full)',
          background: 'rgba(99, 102, 241, 0.15)',
          color: '#a5b4fc',
          fontSize: '0.78rem',
          fontWeight: 700,
          marginBottom: '1rem'
        }}>
          SCREEN 09 • AI EXTRACTION PIPELINE
        </div>

        {/* Animated Visual Core */}
        <div style={{
          width: '74px',
          height: '74px',
          borderRadius: '20px',
          background: 'var(--accent-gradient)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          margin: '0 auto 1.5rem auto',
          boxShadow: '0 0 30px rgba(99, 102, 241, 0.5)'
        }}>
          {isCompleted ? (
            <CheckCircle2 size={36} color="#ffffff" />
          ) : (
            <Cpu size={36} color="#ffffff" className="pulse-glow" />
          )}
        </div>

        <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          {isCompleted ? 'Profile Successfully Extracted!' : 'AI Is Analyzing Your Resume...'}
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.92rem', marginBottom: '2rem' }}>
          Document: <strong style={{ color: '#38bdf8' }}>{candidate.resumeFileName || 'Resume.pdf'}</strong>
        </p>

        {/* Multi-Stage Step Progress */}
        <div style={{
          background: 'var(--bg-tertiary)',
          borderRadius: 'var(--radius-lg)',
          padding: '1.25rem',
          textAlign: 'left',
          marginBottom: '2rem',
          border: '1px solid var(--border-subtle)'
        }}>
          {steps.map((step, idx) => {
            const isDone = idx < stepIndex || (idx === stepIndex && isCompleted);
            const isCurrent = idx === stepIndex && !isCompleted;
            return (
              <div 
                key={idx}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '0.75rem 0',
                  borderBottom: idx < steps.length - 1 ? '1px solid var(--border-subtle)' : 'none',
                  opacity: idx <= stepIndex ? 1 : 0.4,
                  transition: 'all 0.3s ease'
                }}
              >
                <div style={{
                  width: '28px',
                  height: '28px',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  background: isDone ? 'rgba(16, 185, 129, 0.2)' : isCurrent ? 'rgba(99, 102, 241, 0.2)' : 'rgba(255, 255, 255, 0.05)',
                  color: isDone ? '#34d399' : isCurrent ? '#818cf8' : 'var(--text-muted)'
                }}>
                  {isDone ? (
                    <CheckCircle2 size={16} />
                  ) : isCurrent ? (
                    <Loader2 size={16} style={{ animation: 'spin 1s linear infinite' }} />
                  ) : (
                    <span style={{ fontSize: '0.75rem' }}>{idx + 1}</span>
                  )}
                </div>

                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: '0.88rem', fontWeight: 600, color: isCurrent ? '#818cf8' : 'var(--text-primary)' }}>
                    {step.title}
                  </div>
                  <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
                    {step.desc}
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        <button 
          id="processing-continue-btn"
          onClick={() => navigateTo('screen-10')}
          className="btn btn-primary btn-lg btn-full"
          disabled={!isCompleted}
          style={{ opacity: isCompleted ? 1 : 0.6 }}
        >
          {isCompleted ? (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              Review Extracted Profile (Trust Screen) <ArrowRight size={18} />
            </span>
          ) : (
            <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Loader2 size={18} style={{ animation: 'spin 1s linear infinite' }} /> Parsing in progress...
            </span>
          )}
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
