import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  User, Briefcase, GraduationCap, MapPin, 
  Award, Edit3, Check, Plus, X, ArrowRight, ShieldCheck, Mail, Phone, Building2 
} from 'lucide-react';

export function Screen23CandidateProfile() {
  const { candidate, setCandidate, setUser, navigateTo } = useApp();

  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(candidate.name || 'Rahul Sharma');
  const [headline, setHeadline] = useState(candidate.headline || '');
  const [email, setEmail] = useState(candidate.email || 'rahul.sharma@example.com');
  const [phone, setPhone] = useState(candidate.phone || '+91 98765 43210');
  const [currentCompany, setCurrentCompany] = useState(candidate.currentCompany || 'Accenture India');
  const [currentRole, setCurrentRole] = useState(candidate.currentRole || 'Software Engineer');
  const [experienceYears, setExperienceYears] = useState(candidate.experienceYears || 3.5);
  const [education, setEducation] = useState(candidate.education || 'B.Tech in Computer Science');
  const [skills, setSkills] = useState(candidate.skills || []);
  const [newSkill, setNewSkill] = useState('');
  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = () => {
    const updated = {
      ...candidate,
      name,
      headline,
      email,
      phone,
      currentCompany,
      currentRole,
      experienceYears: Number(experienceYears),
      education,
      skills
    };
    setCandidate(updated);
    setUser(prev => ({
      ...prev,
      fullName: name,
      email: email
    }));
    setIsEditing(false);
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 2500);
  };

  const handleAddSkill = () => {
    if (newSkill.trim() && !skills.includes(newSkill.trim())) {
      setSkills([...skills, newSkill.trim()]);
      setNewSkill('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '840px' }}>
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
            SCREEN 23 • CANDIDATE PROFILE MANAGER
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>Candidate Profile</h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            The master profile used to calculate ATS compatibility against all open Indian IT vacancies.
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          <button 
            onClick={() => navigateTo('screen-24')}
            className="btn btn-outline btn-sm"
          >
            Manage Resumes (Screen 24)
          </button>
          <button 
            id="profile-toggle-edit-btn"
            onClick={() => setIsEditing(!isEditing)}
            className="btn btn-primary btn-sm"
          >
            <Edit3 size={14} /> {isEditing ? 'Cancel Editing' : 'Edit All Fields'}
          </button>
        </div>
      </div>

      {savedSuccess && (
        <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          <Check size={16} style={{ verticalAlign: 'middle', marginRight: '0.3rem' }} /> Candidate profile updated across all screens!
        </div>
      )}

      {/* Main Profile Card */}
      <div className="glass-card" style={{ marginBottom: '1.75rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.5rem',
            fontWeight: 800,
            color: '#ffffff',
            boxShadow: 'var(--shadow-glow)'
          }}>
            {name.charAt(0) || 'C'}
          </div>

          <div style={{ flex: 1 }}>
            {isEditing ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Full Name</label>
                  <input 
                    id="profile-edit-name"
                    type="text" 
                    className="form-input" 
                    value={name} 
                    onChange={(e) => setName(e.target.value)}
                    style={{ fontWeight: 700 }}
                  />
                </div>
                <div className="form-group" style={{ margin: 0 }}>
                  <label className="form-label">Headline / Target Role</label>
                  <input 
                    id="profile-edit-headline"
                    type="text" 
                    className="form-input" 
                    value={headline} 
                    onChange={(e) => setHeadline(e.target.value)}
                  />
                </div>
              </div>
            ) : (
              <div>
                <h2 style={{ fontSize: '1.5rem', fontWeight: 800 }}>{name}</h2>
                <div style={{ color: '#38bdf8', fontSize: '0.95rem', fontWeight: 600 }}>
                  {headline}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
                  {email} • {phone} • {candidate.currentLocation || 'Bangalore'}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Contact Info (if editing) */}
        {isEditing && (
          <div className="grid-2" style={{ marginBottom: '1.25rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Email</label>
              <input 
                type="email" 
                className="form-input" 
                value={email} 
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Phone</label>
              <input 
                type="text" 
                className="form-input" 
                value={phone} 
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        )}

        {/* Detailed Fields */}
        <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Current Organization</div>
            {isEditing ? (
              <input 
                type="text" 
                className="form-input" 
                value={currentCompany} 
                onChange={(e) => setCurrentCompany(e.target.value)}
                style={{ marginTop: '0.3rem' }}
              />
            ) : (
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.2rem' }}>{currentCompany}</div>
            )}
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Role: {currentRole}</div>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Experience (Years)</div>
            {isEditing ? (
              <input 
                type="number" 
                step="0.5"
                className="form-input" 
                value={experienceYears} 
                onChange={(e) => setExperienceYears(e.target.value)}
                style={{ marginTop: '0.3rem' }}
              />
            ) : (
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.2rem' }}>{experienceYears} Years</div>
            )}
            <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>Mid-Senior Level</div>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Education</div>
            {isEditing ? (
              <input 
                type="text" 
                className="form-input" 
                value={education} 
                onChange={(e) => setEducation(e.target.value)}
                style={{ marginTop: '0.3rem' }}
              />
            ) : (
              <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.2rem' }}>{education}</div>
            )}
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)' }}>Target Locations</div>
            <div style={{ fontWeight: 700, fontSize: '0.95rem', marginTop: '0.2rem' }}>
              {candidate.targetLocations?.join(', ') || 'Bangalore, Hyderabad, Remote'}
            </div>
          </div>
        </div>

        {/* Skills */}
        <div style={{ marginBottom: '1.25rem' }}>
          <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.6rem' }}>
            Verified Technical Skills ({skills.length})
          </div>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: isEditing ? '0.75rem' : 0 }}>
            {skills.map(skill => (
              <span key={skill} className="badge badge-indigo" style={{ padding: '0.35rem 0.75rem', fontSize: '0.82rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}>
                {skill}
                {isEditing && (
                  <button type="button" onClick={() => handleRemoveSkill(skill)} style={{ color: '#c7d2fe', cursor: 'pointer' }}>
                    <X size={12} />
                  </button>
                )}
              </span>
            ))}
          </div>

          {isEditing && (
            <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '360px', marginTop: '0.5rem' }}>
              <input 
                type="text" 
                className="form-input" 
                placeholder="Add skill (e.g. Kafka, React, AWS)"
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
              />
              <button type="button" onClick={handleAddSkill} className="btn btn-secondary btn-sm">Add</button>
            </div>
          )}
        </div>

        {isEditing && (
          <div style={{ marginTop: '1.5rem', paddingTop: '1rem', borderTop: '1px solid var(--border-subtle)', textAlign: 'right' }}>
            <button 
              id="profile-save-btn"
              onClick={handleSave} 
              className="btn btn-primary"
            >
              <Check size={16} /> Save Profile Changes
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
