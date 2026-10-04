import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { User, Lock, Download, Trash2, Check, ArrowLeft, Shield } from 'lucide-react';

export function Screen29AccountSettings() {
  const { user, setUser, logoutUser, navigateTo } = useApp();

  const [name, setName] = useState(user.fullName || 'Rahul Sharma');
  const [email, setEmail] = useState(user.email || 'rahul.sharma@example.com');
  const [currentPass, setCurrentPass] = useState('');
  const [newPass, setNewPass] = useState('');
  const [saved, setSaved] = useState(false);

  const handleUpdate = (e) => {
    e.preventDefault();
    setUser(prev => ({ ...prev, fullName: name, email }));
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  const handleExportData = () => {
    alert("Candidate data export generated in JSON format (resumes, matches, application history).");
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
          SCREEN 29 • ACCOUNT & SECURITY SETTINGS
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Account Settings
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '1.75rem' }}>
          Manage your personal credentials, password, and security preferences.
        </p>

        {saved && (
          <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
            <Check size={16} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} /> Account details updated!
          </div>
        )}

        <form onSubmit={handleUpdate} style={{ marginBottom: '2rem' }}>
          <div className="form-group">
            <label className="form-label">Full Name</label>
            <input 
              type="text" 
              className="form-input" 
              value={name}
              onChange={(e) => setName(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <label className="form-label">Email Address</label>
            <input 
              type="email" 
              className="form-input" 
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="btn btn-primary btn-sm">
            Save Profile Info
          </button>
        </form>

        {/* Change Password */}
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.25rem', borderRadius: 'var(--radius-md)', marginBottom: '1.75rem', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.05rem', fontWeight: 700, marginBottom: '1rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Lock size={16} color="#818cf8" /> Change Password
          </h3>
          <div className="grid-2">
            <div className="form-group">
              <label className="form-label">Current Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={currentPass}
                onChange={(e) => setCurrentPass(e.target.value)}
              />
            </div>
            <div className="form-group">
              <label className="form-label">New Password</label>
              <input 
                type="password" 
                className="form-input" 
                placeholder="••••••••"
                value={newPass}
                onChange={(e) => setNewPass(e.target.value)}
              />
            </div>
          </div>
          <button 
            type="button" 
            onClick={() => { alert("Password updated successfully."); setCurrentPass(''); setNewPass(''); }}
            className="btn btn-secondary btn-sm"
          >
            Update Password
          </button>
        </div>

        {/* Data & Privacy Actions */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)' }}>
          <button 
            type="button"
            onClick={handleExportData}
            className="btn btn-outline btn-sm"
          >
            <Download size={14} /> Export My Data (JSON)
          </button>

          <button 
            type="button"
            onClick={logoutUser}
            className="btn btn-outline btn-sm"
            style={{ color: '#f87171', borderColor: 'rgba(239, 68, 68, 0.3)' }}
          >
            Sign Out of CareerPilot
          </button>
        </div>
      </div>
    </div>
  );
}
