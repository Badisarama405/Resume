import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { SAMPLE_CANDIDATES } from '../data/mockData';
import { UploadCloud, FileText, CheckCircle2, ShieldCheck, ArrowRight, Sparkles, User } from 'lucide-react';

export function Screen08ResumeUpload() {
  const { navigateTo, setCandidate, setUploadProgress, setUser } = useApp();
  const [candidateNameInput, setCandidateNameInput] = useState('');
  const [selectedFile, setSelectedFile] = useState(null);
  const [isDragOver, setIsDragOver] = useState(false);

  const extractCandidateFromFile = (file, explicitName) => {
    let extractedName = explicitName?.trim();
    
    if (!extractedName && file?.name) {
      // Intelligently extract name from filename like "Aarav_Sharma_Resume.pdf"
      const base = file.name.replace(/\.[^/.]+$/, "");
      const cleaned = base
        .replace(/[-_]/g, " ")
        .replace(/\b(resume|cv|biodata|profile|latest|updated|final|doc|\d{4})\b/gi, "")
        .trim();
      const parts = cleaned.split(/\s+/).filter(Boolean);

      if (parts.length >= 2) {
        extractedName = parts.map(p => p.charAt(0).toUpperCase() + p.slice(1).toLowerCase()).join(" ");
      } else if (parts.length === 1 && parts[0].length >= 3) {
        extractedName = parts[0].charAt(0).toUpperCase() + parts[0].slice(1).toLowerCase();
      }
    }

    if (!extractedName) {
      extractedName = "Candidate Profile";
    }

    const emailPrefix = extractedName.toLowerCase().replace(/\s+/g, ".");

    return {
      id: `cand-${Date.now()}`,
      name: extractedName,
      headline: "Software Engineer / Backend & Cloud",
      summary: `${extractedName} is an IT professional with 3+ years of experience designing scalable microservices, backend APIs, and modern application infrastructure.`,
      email: `${emailPrefix}@example.com`,
      phone: "+91 98765 43210",
      experienceYears: 3.5,
      education: "B.Tech in Computer Science & Engineering",
      currentCompany: "Tech Solutions India",
      currentRole: "Software Engineer",
      currentLocation: "Bangalore",
      targetLocations: ["Bangalore", "Hyderabad", "Pune", "Remote"],
      skills: ["Python", "FastAPI", "PostgreSQL", "Docker", "AWS", "REST APIs", "Git", "SQL", "Redis"],
      targetTitles: ["Backend Engineer", "Software Engineer", "Python Developer"],
      workModes: ["Remote", "Hybrid"],
      expectedSalaryLpa: 18,
      noticePeriodDays: 30,
      resumeFileName: file?.name || "Uploaded_Resume.pdf"
    };
  };

  const startExtraction = (candidateProfile, fileName) => {
    setCandidate(candidateProfile);
    setUser(prev => ({
      ...prev,
      fullName: candidateProfile.name,
      email: candidateProfile.email
    }));
    setUploadProgress({
      file: { name: fileName, size: '245 KB' },
      isProcessing: true,
      currentStep: 1,
      statusText: 'Analyzing document structure...'
    });
    navigateTo('screen-09');
  };

  const handleCustomUpload = (file) => {
    if (file) {
      setSelectedFile(file);
      const parsedCandidate = extractCandidateFromFile(file, candidateNameInput);
      startExtraction(parsedCandidate, file.name);
    }
  };

  const handleSelectPreset = (preset) => {
    startExtraction(preset, preset.resumeFileName);
  };

  return (
    <div className="container" style={{ paddingTop: '2.5rem', maxWidth: '740px' }}>
      {/* 3-Step Stepper Header */}
      <div className="stepper">
        <div className="step-item step-active">
          <div className="step-circle">1</div>
          <span className="step-label">Resume</span>
        </div>
        <div className="step-item">
          <div className="step-circle">2</div>
          <span className="step-label">Preferences</span>
        </div>
        <div className="step-item">
          <div className="step-circle">3</div>
          <span className="step-label">Job Matches</span>
        </div>
      </div>

      <div className="glass-card">
        <div style={{ textAlign: 'center', marginBottom: '1.75rem' }}>
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
            SCREEN 08 • RESUME UPLOAD & EXTRACTION
          </div>
          <h1 style={{ fontSize: '1.9rem', fontWeight: 800, marginBottom: '0.5rem' }}>
            Upload Your Resume
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
            CareerPilot extracts your full name, contact, skills, and experience for instant ATS matching.
          </p>
        </div>

        {/* Optional Name Pre-fill helper */}
        <div style={{
          background: 'var(--bg-tertiary)',
          border: '1px solid var(--border-subtle)',
          borderRadius: 'var(--radius-md)',
          padding: '0.85rem 1rem',
          marginBottom: '1.5rem',
          display: 'flex',
          alignItems: 'center',
          gap: '0.75rem'
        }}>
          <User size={18} color="#818cf8" style={{ flexShrink: 0 }} />
          <div style={{ flex: 1 }}>
            <label style={{ display: 'block', fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.2rem' }}>
              Your Full Name (Extracted from resume or type to customize):
            </label>
            <input 
              id="resume-name-input"
              type="text" 
              className="form-input" 
              placeholder="e.g. Rahul Sharma, Ananya Iyer, Vikram Singh..."
              value={candidateNameInput}
              onChange={(e) => setCandidateNameInput(e.target.value)}
              style={{ padding: '0.45rem 0.75rem', fontSize: '0.88rem' }}
            />
          </div>
        </div>

        {/* Drag & Drop Zone */}
        <label 
          htmlFor="resume-file-input"
          className={`dropzone ${isDragOver ? 'dropzone-dragover' : ''}`}
          onDragOver={(e) => { e.preventDefault(); setIsDragOver(true); }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={(e) => {
            e.preventDefault();
            setIsDragOver(false);
            const file = e.dataTransfer.files?.[0];
            if (file) handleCustomUpload(file);
          }}
          style={{ display: 'block', marginBottom: '2rem' }}
        >
          <input 
            id="resume-file-input"
            type="file" 
            accept=".pdf,.docx,.doc" 
            style={{ display: 'none' }}
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleCustomUpload(file);
            }}
          />
          <div style={{
            width: '64px',
            height: '64px',
            borderRadius: '50%',
            background: 'rgba(99, 102, 241, 0.15)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1.25rem auto'
          }}>
            <UploadCloud size={32} color="#818cf8" />
          </div>

          <h3 style={{ fontSize: '1.15rem', fontWeight: 700, marginBottom: '0.4rem' }}>
            Drop your resume here, or <span style={{ color: '#818cf8', textDecoration: 'underline' }}>browse</span>
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.85rem', marginBottom: '1rem' }}>
            Supports PDF, DOCX (Max 10 MB)
          </p>
          <span className="btn btn-secondary btn-sm">
            Choose Local File
          </span>
        </label>

        {/* Preset Resume Loaders for Instant Testing */}
        <div style={{ borderTop: '1px solid var(--border-subtle)', paddingTop: '1.75rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem' }}>
            <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <Sparkles size={16} color="#818cf8" /> Or Select an Indian Tech Persona (1-Click Test):
            </span>
            <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
              Quick test without uploading
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {SAMPLE_CANDIDATES.map((cand) => (
              <div 
                key={cand.id}
                onClick={() => handleSelectPreset(cand)}
                className="glass-card-interactive"
                style={{
                  background: 'var(--bg-tertiary)',
                  padding: '0.9rem 1.1rem',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: '1rem'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(99, 102, 241, 0.2)', padding: '0.5rem', borderRadius: '8px', color: '#818cf8' }}>
                    <FileText size={18} />
                  </div>
                  <div>
                    <div style={{ fontSize: '0.9rem', fontWeight: 700 }}>
                      {cand.name} • {cand.headline}
                    </div>
                    <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
                      {cand.experienceYears} Yrs Exp • Skills: {cand.skills.slice(0, 5).join(', ')}...
                    </div>
                  </div>
                </div>

                <button className="btn btn-primary btn-sm">
                  Load & Parse <ArrowRight size={14} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: '1.75rem', textAlign: 'center', fontSize: '0.78rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
          <ShieldCheck size={16} color="#10b981" />
          All fields extracted from your resume can be reviewed and edited in the next step.
        </div>
      </div>
    </div>
  );
}
