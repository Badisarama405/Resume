import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileText, Upload, Plus, Check, Star, 
  Trash2, Crown, ArrowRight, ShieldCheck 
} from 'lucide-react';

export function Screen24ResumeManager() {
  const { resumes, setResumes, user, navigateTo } = useApp();
  const maxResumes = user.plan === 'pro' ? 3 : 1;

  const handleSetPrimary = (id) => {
    setResumes(prev => prev.map(r => ({
      ...r,
      isPrimary: r.id === id
    })));
  };

  const handleSimulateAddResume = () => {
    if (resumes.length >= maxResumes) {
      navigateTo('screen-28');
      return;
    }
    const newRes = {
      id: `res-${Date.now()}`,
      title: 'Rahul Sharma - Cloud & DevOps Tailored',
      fileName: 'Rahul_DevOps_AWS_2026.pdf',
      uploadedAt: new Date().toISOString().split('T')[0],
      isPrimary: false,
      roleTarget: 'DevOps & Cloud Architecture',
      skillsCount: 14
    };
    setResumes([...resumes, newRes]);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '820px' }}>
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
            SCREEN 24 • RESUME MANAGER & VERSIONS
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Manage Resume Profiles</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Tailor distinct resumes for Backend, Fullstack, or DevOps roles. (Used: {resumes.length} / {maxResumes} allowed)
          </p>
        </div>

        <button 
          onClick={handleSimulateAddResume}
          className="btn btn-primary btn-sm"
        >
          <Plus size={14} /> Add Tailored Resume Profile
        </button>
      </div>

      {user.plan === 'free' && resumes.length >= 1 && (
        <div style={{
          background: 'rgba(245, 158, 11, 0.12)',
          border: '1px solid rgba(245, 158, 11, 0.3)',
          borderRadius: 'var(--radius-md)',
          padding: '1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          gap: '1rem',
          flexWrap: 'wrap'
        }}>
          <div style={{ fontSize: '0.85rem', color: '#fbbf24' }}>
            <Crown size={16} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} />
            Free plan allows 1 resume. Upgrade to Pro (₹499/mo) to maintain up to 3 specialized resume profiles.
          </div>
          <button 
            onClick={() => navigateTo('screen-28')}
            className="btn btn-warning btn-sm"
            style={{ background: '#f59e0b', color: '#000000', fontWeight: 700 }}
          >
            Upgrade to Pro
          </button>
        </div>
      )}

      {/* Resume Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2.5rem' }}>
        {resumes.map(res => (
          <div 
            key={res.id}
            className="glass-card"
            style={{
              border: res.isPrimary ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)',
              padding: '1.25rem'
            }}
          >
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
                <div style={{
                  width: '44px',
                  height: '44px',
                  borderRadius: '10px',
                  background: res.isPrimary ? 'rgba(99, 102, 241, 0.2)' : 'var(--bg-tertiary)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: res.isPrimary ? '#818cf8' : 'var(--text-muted)'
                }}>
                  <FileText size={22} />
                </div>

                <div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>{res.title}</h3>
                    {res.isPrimary && <span className="badge badge-indigo">PRIMARY ACTIVE</span>}
                  </div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                    Target: {res.roleTarget} • {res.skillsCount} skills parsed • Uploaded {res.uploadedAt}
                  </div>
                </div>
              </div>

              <div style={{ display: 'flex', gap: '0.5rem' }}>
                {!res.isPrimary && (
                  <button 
                    onClick={() => handleSetPrimary(res.id)}
                    className="btn btn-outline btn-sm"
                  >
                    <Star size={13} /> Make Primary
                  </button>
                )}
                <button 
                  onClick={() => navigateTo('screen-10')}
                  className="btn btn-secondary btn-sm"
                >
                  Review Skills (Screen 10)
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
