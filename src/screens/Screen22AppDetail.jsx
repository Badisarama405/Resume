import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  ArrowLeft, FileCheck, CheckCircle2, Clock, 
  Building2, MapPin, IndianRupee, Zap, Edit3, ShieldCheck 
} from 'lucide-react';

export function Screen22AppDetail() {
  const { 
    selectedApplicationId, applications, markApplicationStatus, 
    navigateTo, candidate 
  } = useApp();

  const app = applications.find(a => a.id === selectedApplicationId) || applications[0];

  if (!app) {
    return (
      <div className="container" style={{ paddingTop: '3rem', textAlign: 'center' }}>
        <div className="glass-card" style={{ maxWidth: '500px', margin: '0 auto' }}>
          <h3>No Application Found</h3>
          <p style={{ color: 'var(--text-secondary)', margin: '1rem 0' }}>Please select an application from the tracker.</p>
          <button onClick={() => navigateTo('screen-21')} className="btn btn-primary">Go to Applications Tracker</button>
        </div>
      </div>
    );
  }

  const [selectedStage, setSelectedStage] = useState(app?.stage || 'Under Review');
  const [noteInput, setNoteInput] = useState('');
  const [notesList, setNotesList] = useState([
    'Recruiter viewed profile via portal API on Oct 3',
    'Preliminary assessment link received'
  ]);

  const handleUpdateStage = (e) => {
    const newStage = e.target.value;
    setSelectedStage(newStage);
    markApplicationStatus(app.id, app.status, newStage);
  };

  const handleAddNote = () => {
    if (noteInput.trim()) {
      setNotesList([...notesList, `${new Date().toLocaleDateString()}: ${noteInput.trim()}`]);
      setNoteInput('');
    }
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '820px' }}>
      {/* Back button */}
      <button 
        onClick={() => navigateTo('screen-21')}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1.25rem' }}
      >
        <ArrowLeft size={14} /> Back to Tracker (Screen 21)
      </button>

      {/* Header */}
      <div className="glass-card" style={{ marginBottom: '1.75rem' }}>
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
          SCREEN 22 • APPLICATION DETAIL & AUDIT TIMELINE
        </div>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1rem' }}>
          <div>
            <h1 style={{ fontSize: '1.6rem', fontWeight: 800 }}>{app.title}</h1>
            <div style={{ fontSize: '0.95rem', color: '#c7d2fe', marginTop: '0.2rem' }}>
              {app.company} • {app.location || 'Bangalore'} ({app.workMode || 'Hybrid'})
            </div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              Submission Reference: <strong style={{ color: '#34d399', fontFamily: 'monospace' }}>{app.confirmationId || 'N/A (Manual Action)'}</strong>
            </div>
          </div>

          <div style={{ textAlign: 'right' }}>
            <div className="score-pill score-high">
              <Zap size={14} /> {app.matchScore}% ATS Score
            </div>
            <div style={{ marginTop: '0.5rem' }}>
              <span className="badge badge-success">{app.status}</span>
            </div>
          </div>
        </div>

        {/* Stage Updater Dropdown */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1rem', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1rem' }}>
          <div>
            <span style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>Current Recruitment Stage:</span>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#38bdf8' }}>{selectedStage}</div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Update:</span>
            <select 
              className="screen-select-dropdown"
              value={selectedStage}
              onChange={handleUpdateStage}
            >
              <option value="Under Review">Under Review</option>
              <option value="Interview Scheduled">Interview Scheduled</option>
              <option value="Technical Round 1">Technical Round 1</option>
              <option value="Managerial Discussion">Managerial Discussion</option>
              <option value="Offer Received">Offer Received 🎉</option>
              <option value="Position Closed">Position Closed / Rejected</option>
            </select>
          </div>
        </div>
      </div>

      {/* Timeline Section */}
      <div className="glass-card" style={{ marginBottom: '1.75rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <Clock size={18} color="#818cf8" /> Chronological Event Timeline
        </h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
          {(app.timeline || [
            { time: app.appliedAt, text: `Application submitted via ${app.method}` },
            { time: '2026-10-02 10:31 AM', text: `Portal acknowledged receipt with ID: ${app.confirmationId || 'PENDING'}` }
          ]).map((evt, idx) => (
            <div key={idx} style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
              <div style={{
                width: '12px',
                height: '12px',
                borderRadius: '50%',
                background: '#6366f1',
                marginTop: '5px',
                boxShadow: '0 0 8px rgba(99, 102, 241, 0.6)'
              }} />
              <div>
                <div style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>{evt.text}</div>
                <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{evt.time}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Candidate Notes & Follow-ups */}
      <div className="glass-card" style={{ marginBottom: '2.5rem' }}>
        <h3 style={{ fontSize: '1.15rem', marginBottom: '0.75rem' }}>Personal Interview Notes</h3>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem', marginBottom: '1rem' }}>
          {notesList.map((note, idx) => (
            <div key={idx} style={{ background: 'var(--bg-tertiary)', padding: '0.65rem 0.85rem', borderRadius: 'var(--radius-sm)', fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
              • {note}
            </div>
          ))}
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <input 
            type="text" 
            className="form-input" 
            placeholder="Add note (e.g. Spoke with HR Neha on LinkedIn...)"
            value={noteInput}
            onChange={(e) => setNoteInput(e.target.value)}
            onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddNote(); } }}
          />
          <button onClick={handleAddNote} className="btn btn-secondary btn-sm">Add</button>
        </div>
      </div>
    </div>
  );
}
