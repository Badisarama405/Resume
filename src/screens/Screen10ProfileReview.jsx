import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, CheckCircle2, Edit3, Plus, X, ArrowRight, 
  Briefcase, GraduationCap, MapPin, Award, Check, User, Mail, Phone, Building2 
} from 'lucide-react';

export function Screen10ProfileReview() {
  const { navigateTo, candidate, setCandidate, setUser } = useApp();

  // All extracted fields made 100% editable
  const [name, setName] = useState(candidate.name || 'Rahul Sharma');
  const [headline, setHeadline] = useState(candidate.headline || 'Backend Engineer / Python & Cloud Specialist');
  const [email, setEmail] = useState(candidate.email || 'rahul.sharma@example.com');
  const [phone, setPhone] = useState(candidate.phone || '+91 98765 43210');
  const [currentCompany, setCurrentCompany] = useState(candidate.currentCompany || 'Accenture India');
  const [currentRole, setCurrentRole] = useState(candidate.currentRole || 'Software Engineer');

  const [summary, setSummary] = useState(candidate.summary || '');
  const [skills, setSkills] = useState(candidate.skills || []);
  const [newSkillInput, setNewSkillInput] = useState('');

  const [experienceYears, setExperienceYears] = useState(candidate.experienceYears || 3.5);
  const [education, setEducation] = useState(candidate.education || 'B.Tech in Computer Science, 2021');
  
  const [locations, setLocations] = useState(candidate.targetLocations || ['Bangalore', 'Hyderabad', 'Remote']);
  const [newLocationInput, setNewLocationInput] = useState('');

  const handleAddSkill = () => {
    if (newSkillInput.trim() && !skills.includes(newSkillInput.trim())) {
      const updated = [...skills, newSkillInput.trim()];
      setSkills(updated);
      setNewSkillInput('');
    }
  };

  const handleRemoveSkill = (skillToRemove) => {
    setSkills(skills.filter(s => s !== skillToRemove));
  };

  const handleAddLocation = () => {
    if (newLocationInput.trim() && !locations.includes(newLocationInput.trim())) {
      setLocations([...locations, newLocationInput.trim()]);
      setNewLocationInput('');
    }
  };

  const handleRemoveLocation = (locToRemove) => {
    setLocations(locations.filter(l => l !== locToRemove));
  };

  const handleConfirmProfile = () => {
    const updatedCandidate = {
      ...candidate,
      name,
      headline,
      email,
      phone,
      currentCompany,
      currentRole,
      summary,
      skills,
      experienceYears: Number(experienceYears),
      education,
      targetLocations: locations
    };

    setCandidate(updatedCandidate);
    
    // Propagate to global user state as well
    setUser(prev => ({
      ...prev,
      fullName: name,
      email: email
    }));

    navigateTo('screen-11'); // Proceed to Job Preferences (Step 2)
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', maxWidth: '860px' }}>
      {/* 3-Step Stepper Header */}
      <div className="stepper">
        <div className="step-item step-completed">
          <div className="step-circle"><Check size={16} /></div>
          <span className="step-label">Resume Parsed</span>
        </div>
        <div className="step-item step-active">
          <div className="step-circle">2</div>
          <span className="step-label">Review Profile</span>
        </div>
        <div className="step-item">
          <div className="step-circle">3</div>
          <span className="step-label">Preferences</span>
        </div>
      </div>

      <div className="glass-card">
        {/* Screen Header & Trust Banner */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.75rem' }}>
          <div>
            <div style={{
              display: 'inline-flex',
              padding: '0.35rem 0.85rem',
              borderRadius: 'var(--radius-full)',
              background: 'rgba(99, 102, 241, 0.15)',
              color: '#a5b4fc',
              fontSize: '0.78rem',
              fontWeight: 700,
              marginBottom: '0.5rem'
            }}>
              SCREEN 10 • AI PROFILE REVIEW (TRUST SCREEN)
            </div>
            <h1 style={{ fontSize: '1.9rem', fontWeight: 800 }}>
              Verify & Edit Extracted Details
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
              Extracted from: <strong style={{ color: '#38bdf8' }}>{candidate.resumeFileName || 'Resume.pdf'}</strong>. Edit any field below to ensure 100% accuracy before matching jobs.
            </p>
          </div>

          <div style={{
            background: 'rgba(16, 185, 129, 0.12)',
            border: '1px solid rgba(16, 185, 129, 0.3)',
            padding: '0.5rem 0.85rem',
            borderRadius: 'var(--radius-md)',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#34d399',
            fontSize: '0.82rem',
            fontWeight: 600
          }}>
            <CheckCircle2 size={16} /> All Fields Editable
          </div>
        </div>

        {/* Section 1: Candidate Identity (Name, Headline, Contact) */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-glow)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <User size={18} color="#818cf8" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Personal Identity & Contact</h3>
          </div>

          <div className="grid-2" style={{ marginBottom: '1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Full Name</label>
              <input 
                id="edit-candidate-name"
                type="text" 
                className="form-input" 
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Candidate Full Name"
                style={{ fontWeight: 700, fontSize: '0.95rem' }}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Professional Headline / Target Role</label>
              <input 
                id="edit-candidate-headline"
                type="text" 
                className="form-input" 
                value={headline}
                onChange={(e) => setHeadline(e.target.value)}
                placeholder="e.g. SDE-2 Backend / Python Specialist"
              />
            </div>
          </div>

          <div className="grid-2">
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Email Address</label>
              <input 
                id="edit-candidate-email"
                type="email" 
                className="form-input" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Phone Number</label>
              <input 
                id="edit-candidate-phone"
                type="text" 
                className="form-input" 
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>
        </div>

        {/* Section 2: Current Company & Professional Summary */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '1rem' }}>
            <Building2 size={18} color="#22d3ee" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Current Employment & Summary</h3>
          </div>

          <div className="grid-2" style={{ marginBottom: '1rem' }}>
            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Current Company / Organization</label>
              <input 
                id="edit-current-company"
                type="text" 
                className="form-input" 
                value={currentCompany}
                onChange={(e) => setCurrentCompany(e.target.value)}
                placeholder="e.g. Infosys, TCS, Razorpay, Startup..."
              />
            </div>

            <div className="form-group" style={{ margin: 0 }}>
              <label className="form-label">Current Designation / Role</label>
              <input 
                id="edit-current-role"
                type="text" 
                className="form-input" 
                value={currentRole}
                onChange={(e) => setCurrentRole(e.target.value)}
                placeholder="e.g. Software Engineer, SDE II..."
              />
            </div>
          </div>

          <div className="form-group" style={{ margin: 0 }}>
            <label className="form-label">Professional Summary</label>
            <textarea
              id="edit-candidate-summary"
              className="form-input"
              rows={3}
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              style={{ width: '100%', resize: 'vertical', lineHeight: 1.5 }}
              placeholder="Brief summary of your technical background..."
            />
          </div>
        </div>

        {/* Section 3: Verified Skills Tags (Interactive Add / Remove) */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '1.5rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.6rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <Award size={18} color="#34d399" />
              <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>
                Verified Skills & Technologies ({skills.length})
              </h3>
            </div>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Click (×) to remove or add missing skills
            </span>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            {skills.map((skill) => (
              <span 
                key={skill}
                className="badge badge-indigo"
                style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                {skill}
                <button 
                  type="button"
                  onClick={() => handleRemoveSkill(skill)}
                  style={{ color: '#c7d2fe', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                  title="Remove skill"
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          {/* Add Skill Input */}
          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '420px' }}>
            <input 
              id="add-skill-input"
              type="text"
              className="form-input"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
              placeholder="Add skill (e.g. Kafka, Redis, Kubernetes, React)"
              value={newSkillInput}
              onChange={(e) => setNewSkillInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddSkill(); } }}
            />
            <button 
              type="button"
              onClick={handleAddSkill}
              className="btn btn-secondary btn-sm"
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Section 4: Experience & Education */}
        <div className="grid-2" style={{ marginBottom: '1.5rem' }}>
          <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <Briefcase size={16} color="#818cf8" />
              <label className="form-label" style={{ margin: 0 }}>Total Experience (Years)</label>
            </div>
            <input 
              id="edit-experience-years"
              type="number"
              step="0.5"
              min="0"
              max="40"
              className="form-input"
              value={experienceYears}
              onChange={(e) => setExperienceYears(e.target.value)}
            />
          </div>

          <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', border: '1px solid var(--border-subtle)' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
              <GraduationCap size={16} color="#34d399" />
              <label className="form-label" style={{ margin: 0 }}>Education / Degree</label>
            </div>
            <input 
              id="edit-education"
              type="text"
              className="form-input"
              value={education}
              onChange={(e) => setEducation(e.target.value)}
              placeholder="e.g. B.Tech / B.E. / MCA"
            />
          </div>
        </div>

        {/* Section 5: Target Locations */}
        <div style={{ background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', padding: '1.25rem', marginBottom: '2rem', border: '1px solid var(--border-subtle)' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <MapPin size={18} color="#f59e0b" />
            <h3 style={{ fontSize: '1.1rem', fontWeight: 700 }}>Preferred Locations</h3>
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
            {locations.map((loc) => (
              <span 
                key={loc}
                className="badge badge-cyan"
                style={{ fontSize: '0.82rem', padding: '0.35rem 0.75rem', display: 'inline-flex', alignItems: 'center', gap: '0.4rem' }}
              >
                {loc}
                <button 
                  type="button"
                  onClick={() => handleRemoveLocation(loc)}
                  style={{ color: '#67e8f9', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                >
                  <X size={12} />
                </button>
              </span>
            ))}
          </div>

          <div style={{ display: 'flex', gap: '0.5rem', maxWidth: '360px' }}>
            <input 
              id="add-location-input"
              type="text"
              className="form-input"
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.85rem' }}
              placeholder="Add location (e.g. Pune, Gurgaon, Mumbai)"
              value={newLocationInput}
              onChange={(e) => setNewLocationInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter') { e.preventDefault(); handleAddLocation(); } }}
            />
            <button 
              type="button"
              onClick={handleAddLocation}
              className="btn btn-secondary btn-sm"
            >
              <Plus size={14} /> Add
            </button>
          </div>
        </div>

        {/* Action Button */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' }}>
          <button 
            type="button"
            onClick={() => navigateTo('screen-08')}
            className="btn btn-outline"
          >
            ← Upload Different Resume
          </button>

          <button 
            id="profile-confirm-btn"
            type="button"
            onClick={handleConfirmProfile}
            className="btn btn-primary btn-lg"
          >
            Confirm My Profile & Set Preferences <ArrowRight size={18} />
          </button>
        </div>
      </div>
    </div>
  );
}
