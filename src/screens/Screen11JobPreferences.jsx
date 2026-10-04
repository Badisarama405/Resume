import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sliders, ArrowRight, ArrowLeft, Check, IndianRupee, Briefcase, MapPin, Clock } from 'lucide-react';

export function Screen11JobPreferences() {
  const { navigateTo, preferences, setPreferences } = useApp();

  const [targetTitles, setTargetTitles] = useState(preferences.targetTitles || ['Backend Engineer', 'Python Developer']);
  const [newTitleInput, setNewTitleInput] = useState('');

  const [workModes, setWorkModes] = useState(preferences.workModes || ['Remote', 'Hybrid']);
  const [minSalaryLpa, setMinSalaryLpa] = useState(preferences.minSalaryLpa || 18);
  const [noticePeriodDays, setNoticePeriodDays] = useState(preferences.noticePeriodDays || 30);
  const [experienceYears, setExperienceYears] = useState(preferences.experienceYears || 3.5);

  const toggleWorkMode = (mode) => {
    if (workModes.includes(mode)) {
      if (workModes.length > 1) {
        setWorkModes(workModes.filter(m => m !== mode));
      }
    } else {
      setWorkModes([...workModes, mode]);
    }
  };

  const handleAddTitle = () => {
    if (newTitleInput.trim() && !targetTitles.includes(newTitleInput.trim())) {
      setTargetTitles([...targetTitles, newTitleInput.trim()]);
      setNewTitleInput('');
    }
  };

  const handleRemoveTitle = (titleToRemove) => {
    if (targetTitles.length > 1) {
      setTargetTitles(targetTitles.filter(t => t !== titleToRemove));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPreferences({
      targetTitles,
      workModes,
      minSalaryLpa,
      noticePeriodDays,
      experienceYears
    });
    navigateTo('screen-12'); // Proceed to Application Preferences
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', maxWidth: '720px' }}>
      {/* 3-Step Stepper Header */}
      <div className="stepper">
        <div className="step-item step-completed">
          <div className="step-circle"><Check size={16} /></div>
          <span className="step-label">Resume Parsed</span>
        </div>
        <div className="step-item step-active">
          <div className="step-circle">2</div>
          <span className="step-label">Job Preferences</span>
        </div>
        <div className="step-item">
          <div className="step-circle">3</div>
          <span className="step-label">First Matches</span>
        </div>
      </div>

      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <div style={{
            display: 'inline-flex',
            padding: '0.35rem 0.85rem',
            borderRadius: 'var(--radius-full)',
            background: 'rgba(99, 102, 241, 0.15)',
            color: '#a5b4fc',
            fontSize: '0.78rem',
            fontWeight: 700,
            marginBottom: '0.75rem'
          }}>
            SCREEN 11 • SEARCH CRITERIA
          </div>
          <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Job Search Preferences
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Filter noise. We only match roles meeting your exact career expectations.
          </p>
        </div>

        <form onSubmit={handleSubmit}>
          {/* Target Job Titles */}
          <div className="form-group">
            <label className="form-label">Target Job Titles (Roles you want to be matched with)</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
              {targetTitles.map((t) => (
                <span key={t} className="badge badge-indigo" style={{ padding: '0.4rem 0.75rem', fontSize: '0.82rem' }}>
                  {t}
                  <button type="button" onClick={() => handleRemoveTitle(t)} style={{ marginLeft: '0.4rem', color: '#c7d2fe' }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '420px' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="e.g. SDE II, Lead Backend, Cloud Architect"
                value={newTitleInput}
                onChange={(e) => setNewTitleInput(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddTitle(); } }}
              />
              <button type="button" onClick={handleAddTitle} className="btn btn-secondary btn-sm">Add</button>
            </div>
          </div>

          {/* Work Mode Checkboxes */}
          <div className="form-group">
            <label className="form-label">Preferred Work Mode (Select all that apply)</label>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              {['Remote', 'Hybrid', 'On-site'].map((mode) => {
                const isSelected = workModes.includes(mode);
                return (
                  <div 
                    key={mode}
                    onClick={() => toggleWorkMode(mode)}
                    style={{
                      flex: 1,
                      minWidth: '120px',
                      padding: '0.85rem 1rem',
                      borderRadius: 'var(--radius-md)',
                      background: isSelected ? 'rgba(99, 102, 241, 0.15)' : 'var(--bg-tertiary)',
                      border: isSelected ? '1px solid var(--accent-primary)' : '1px solid var(--border-medium)',
                      cursor: 'pointer',
                      textAlign: 'center',
                      transition: 'all 0.2s ease'
                    }}
                  >
                    <div style={{ fontWeight: 700, color: isSelected ? '#ffffff' : 'var(--text-secondary)' }}>
                      {mode}
                    </div>
                    <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                      {mode === 'Remote' ? 'Work from anywhere' : mode === 'Hybrid' ? '2-3 days office' : 'Full office'}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Salary Expectations & Notice Period */}
          <div className="grid-2">
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Minimum Expected CTC</label>
                <span style={{ fontWeight: 700, color: '#34d399', fontSize: '0.95rem' }}>
                  ₹{minSalaryLpa} LPA
                </span>
              </div>
              <input 
                type="range"
                min="6"
                max="50"
                step="1"
                value={minSalaryLpa}
                onChange={(e) => setMinSalaryLpa(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
              />
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.72rem', color: 'var(--text-muted)' }}>
                <span>₹6 LPA</span>
                <span>₹25 LPA</span>
                <span>₹50 LPA</span>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Official Notice Period</label>
              <select 
                className="form-input"
                value={noticePeriodDays}
                onChange={(e) => setNoticePeriodDays(Number(e.target.value))}
              >
                <option value={0}>Immediate Joiner / Serving Notice</option>
                <option value={15}>15 Days</option>
                <option value={30}>30 Days (Standard)</option>
                <option value={60}>60 Days</option>
                <option value={90}>90 Days</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
            <button 
              type="button"
              onClick={() => navigateTo('screen-10')}
              className="btn btn-outline"
            >
              <ArrowLeft size={16} /> Back to Profile
            </button>

            <button 
              id="preferences-submit-btn"
              type="submit" 
              className="btn btn-primary btn-lg"
            >
              Configure Automation (Step 3) <ArrowRight size={18} />
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
