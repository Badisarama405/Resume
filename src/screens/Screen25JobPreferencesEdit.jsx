import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Sliders, Check, ArrowLeft, ArrowRight, Save } from 'lucide-react';

export function Screen25JobPreferencesEdit() {
  const { preferences, setPreferences, navigateTo } = useApp();

  const [targetTitles, setTargetTitles] = useState(preferences.targetTitles || []);
  const [newTitle, setNewTitle] = useState('');
  const [minSalaryLpa, setMinSalaryLpa] = useState(preferences.minSalaryLpa || 18);
  const [noticePeriodDays, setNoticePeriodDays] = useState(preferences.noticePeriodDays || 30);
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e) => {
    e.preventDefault();
    setPreferences(prev => ({
      ...prev,
      targetTitles,
      minSalaryLpa,
      noticePeriodDays
    }));
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '720px' }}>
      <button 
        onClick={() => navigateTo('screen-14')}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1.25rem' }}
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </button>

      <div className="glass-card">
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
          SCREEN 25 • SEARCH PREFERENCES CONFIGURATION
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Modify Job Search Criteria
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
          Adjust your target roles, CTC threshold, and notice period anytime. Changes immediately update your matches feed.
        </p>

        {savedSuccess && (
          <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <Check size={16} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} /> Preferences saved successfully!
          </div>
        )}

        <form onSubmit={handleSave}>
          <div className="form-group">
            <label className="form-label">Target Role Titles</label>
            <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.6rem' }}>
              {targetTitles.map(t => (
                <span key={t} className="badge badge-indigo" style={{ padding: '0.4rem 0.75rem' }}>
                  {t}
                  <button type="button" onClick={() => setTargetTitles(targetTitles.filter(x => x !== t))} style={{ marginLeft: '0.4rem' }}>×</button>
                </span>
              ))}
            </div>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Add title (e.g. Lead Python Engineer)"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <button 
                type="button" 
                onClick={() => { if (newTitle.trim()) { setTargetTitles([...targetTitles, newTitle.trim()]); setNewTitle(''); } }}
                className="btn btn-secondary btn-sm"
              >
                Add
              </button>
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group">
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.3rem' }}>
                <label className="form-label" style={{ margin: 0 }}>Minimum CTC Expected</label>
                <strong style={{ color: '#34d399' }}>₹{minSalaryLpa} LPA</strong>
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
            </div>

            <div className="form-group">
              <label className="form-label">Notice Period</label>
              <select 
                className="form-input"
                value={noticePeriodDays}
                onChange={(e) => setNoticePeriodDays(Number(e.target.value))}
              >
                <option value={0}>Immediate</option>
                <option value={15}>15 Days</option>
                <option value={30}>30 Days</option>
                <option value={60}>60 Days</option>
                <option value={90}>90 Days</option>
              </select>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '1.5rem' }}>
            <button 
              type="button" 
              onClick={() => navigateTo('screen-15')}
              className="btn btn-outline"
            >
              Go to Feed
            </button>
            <button 
              type="submit" 
              className="btn btn-primary"
            >
              <Save size={16} /> Save Search Preferences
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
