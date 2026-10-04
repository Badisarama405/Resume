import React from 'react';
import { useApp } from '../context/AppContext';
import { 
  Sparkles, Layers, LayoutDashboard, Briefcase, FileCheck, User, 
  Settings, Database, Bell, Crown, LogOut 
} from 'lucide-react';

const ALL_SCREENS = [
  // Phase 1: Pre-auth & Onboarding (01–13)
  { id: 'screen-01', num: '01', name: 'Landing Page', phase: 'Phase 1' },
  { id: 'screen-02', num: '02', name: 'Signup', phase: 'Phase 1' },
  { id: 'screen-03', num: '03', name: 'Email Verification', phase: 'Phase 1' },
  { id: 'screen-04', num: '04', name: 'Login', phase: 'Phase 1' },
  { id: 'screen-05', num: '05', name: 'Forgot Password', phase: 'Phase 1' },
  { id: 'screen-06', num: '06', name: 'Reset Password', phase: 'Phase 1' },
  { id: 'screen-07', num: '07', name: 'Welcome / Setup Progress', phase: 'Phase 1' },
  { id: 'screen-08', num: '08', name: 'Resume Upload', phase: 'Phase 1' },
  { id: 'screen-09', num: '09', name: 'Resume Processing', phase: 'Phase 1' },
  { id: 'screen-10', num: '10', name: 'AI Profile Review', phase: 'Phase 1' },
  { id: 'screen-11', num: '11', name: 'Job Preferences', phase: 'Phase 1' },
  { id: 'screen-12', num: '12', name: 'Application Preferences', phase: 'Phase 1' },
  { id: 'screen-13', num: '13', name: 'First Match Results (Aha Moment)', phase: 'Phase 1' },

  // Phase 2: Catalog & Ingestion (15, 16, 30)
  { id: 'screen-15', num: '15', name: 'Job Matches & Feed', phase: 'Phase 2' },
  { id: 'screen-16', num: '16', name: 'Job Detail View', phase: 'Phase 2' },
  { id: 'screen-30', num: '30', name: 'Job Source Status & Health', phase: 'Phase 2' },

  // Phase 3: ATS Matching Engine (17)
  { id: 'screen-17', num: '17', name: 'Deep Match & ATS Analysis', phase: 'Phase 3' },

  // Phase 4: Command Center & Automation Tracker (14, 18, 19, 20, 21, 22)
  { id: 'screen-14', num: '14', name: 'Dashboard / Job Command Center', phase: 'Phase 4' },
  { id: 'screen-18', num: '18', name: 'Application Confirmation Modal', phase: 'Phase 4' },
  { id: 'screen-19', num: '19', name: 'Application Execution & Status', phase: 'Phase 4' },
  { id: 'screen-20', num: '20', name: 'Manual Application Assistant', phase: 'Phase 4' },
  { id: 'screen-21', num: '21', name: 'Application Tracker', phase: 'Phase 4' },
  { id: 'screen-22', num: '22', name: 'Application Detail & Timeline', phase: 'Phase 4' },

  // Phase 5: Profile, Quota & Tier Management, Settings (23–29, 31–33)
  { id: 'screen-23', num: '23', name: 'Candidate Profile Manager', phase: 'Phase 5' },
  { id: 'screen-24', num: '24', name: 'Resume Manager (Multi-profile)', phase: 'Phase 5' },
  { id: 'screen-25', num: '25', name: 'Job Search Preferences', phase: 'Phase 5' },
  { id: 'screen-26', num: '26', name: 'Automation Settings', phase: 'Phase 5' },
  { id: 'screen-27', num: '27', name: 'Notification Settings', phase: 'Phase 5' },
  { id: 'screen-28', num: '28', name: 'Subscription & Usage (Free vs Pro)', phase: 'Phase 5' },
  { id: 'screen-29', num: '29', name: 'Account & Security Settings', phase: 'Phase 5' },
  { id: 'screen-31', num: '31', name: 'Application Activity Audit Log', phase: 'Phase 5' },
  { id: 'screen-32', num: '32', name: 'Notifications Center', phase: 'Phase 5' },
  { id: 'screen-33', num: '33', name: 'Help & Support FAQ', phase: 'Phase 5' }
];

export function HeaderNav() {
  const { currentScreen, navigateTo, user, logoutUser, candidate, applications } = useApp();

  const activeScreenObj = ALL_SCREENS.find(s => s.id === currentScreen) || ALL_SCREENS[0];

  return (
    <>
      {/* Top 33-Screen Quick Navigator Bar */}
      <div className="phase-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flexWrap: 'wrap' }}>
          <span className="phase-badge">
            <Sparkles size={12} /> {activeScreenObj.phase}
          </span>
          <span style={{ color: 'var(--text-muted)', fontSize: '0.8rem' }}>
            Jump to screen (1–33):
          </span>
          <select 
            id="screen-navigator-select"
            className="screen-select-dropdown"
            value={currentScreen}
            onChange={(e) => navigateTo(e.target.value)}
          >
            {['Phase 1', 'Phase 2', 'Phase 3', 'Phase 4', 'Phase 5'].map(phase => (
              <optgroup key={phase} label={`--- ${phase} ---`}>
                {ALL_SCREENS.filter(s => s.phase === phase).map(s => (
                  <option key={s.id} value={s.id}>
                    Screen {s.num}: {s.name}
                  </option>
                ))}
              </optgroup>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
          <button 
            onClick={() => navigateTo('screen-28')}
            className={`badge ${user.plan === 'pro' ? 'badge-success' : 'badge-warning'}`}
            style={{ cursor: 'pointer' }}
          >
            <Crown size={12} /> {user.plan === 'pro' ? 'Pro Member' : 'Free Plan (Upgrade ₹499)'}
          </button>
          
          <button 
            onClick={() => navigateTo('screen-32')}
            className="btn btn-outline btn-sm"
            style={{ padding: '0.2rem 0.5rem', position: 'relative' }}
            title="Notifications"
          >
            <Bell size={13} />
            <span style={{
              position: 'absolute',
              top: '-3px',
              right: '-3px',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              background: '#ef4444'
            }} />
          </button>

          <span style={{ fontSize: '0.78rem', color: 'var(--text-secondary)' }}>
            {candidate?.name || user?.fullName || 'Candidate'}
          </span>
        </div>
      </div>

      {/* Main Brand Navigation Bar */}
      <nav style={{
        background: 'rgba(11, 15, 25, 0.88)',
        backdropFilter: 'blur(16px)',
        borderBottom: '1px solid var(--border-subtle)',
        padding: '0.75rem 1.5rem',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        flexWrap: 'wrap',
        gap: '0.75rem'
      }}>
        {/* Brand Logo */}
        <div 
          onClick={() => navigateTo('screen-01')}
          style={{ display: 'flex', alignItems: 'center', gap: '0.65rem', cursor: 'pointer' }}
        >
          <div style={{
            width: '36px',
            height: '36px',
            borderRadius: '10px',
            background: 'var(--accent-gradient)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 15px rgba(99, 102, 241, 0.4)'
          }}>
            <Sparkles size={18} color="#ffffff" />
          </div>
          <div>
            <div style={{ fontWeight: 800, fontSize: '1.15rem', letterSpacing: '-0.02em', lineHeight: 1.1 }}>
              Career<span className="gradient-text">Pilot</span>
            </div>
            <div style={{ fontSize: '0.62rem', color: 'var(--text-muted)', fontWeight: 500, letterSpacing: '0.04em' }}>
              AI JOB ENGINE FOR INDIA
            </div>
          </div>
        </div>

        {/* 5 Core Primary Product Navigation Destinations */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', flexWrap: 'wrap' }}>
          <button 
            id="nav-dashboard"
            onClick={() => navigateTo('screen-14')}
            className={`btn btn-sm ${currentScreen === 'screen-14' ? 'btn-primary' : 'btn-outline'}`}
          >
            <LayoutDashboard size={14} /> Dashboard
          </button>

          <button 
            id="nav-jobs"
            onClick={() => navigateTo('screen-15')}
            className={`btn btn-sm ${currentScreen === 'screen-15' || currentScreen === 'screen-16' || currentScreen === 'screen-17' ? 'btn-primary' : 'btn-outline'}`}
          >
            <Briefcase size={14} /> Jobs Feed
          </button>

          <button 
            id="nav-tracker"
            onClick={() => navigateTo('screen-21')}
            className={`btn btn-sm ${currentScreen === 'screen-21' || currentScreen === 'screen-22' ? 'btn-primary' : 'btn-outline'}`}
          >
            <FileCheck size={14} /> Applications ({applications?.length || 0})
          </button>

          <button 
            id="nav-profile"
            onClick={() => navigateTo('screen-23')}
            className={`btn btn-sm ${currentScreen === 'screen-23' || currentScreen === 'screen-24' ? 'btn-primary' : 'btn-outline'}`}
          >
            <User size={14} /> Profile & Resumes
          </button>

          <button 
            id="nav-settings"
            onClick={() => navigateTo('screen-26')}
            className={`btn btn-sm ${currentScreen.startsWith('screen-2') && !['screen-21', 'screen-22', 'screen-23', 'screen-24'].includes(currentScreen) ? 'btn-primary' : 'btn-outline'}`}
          >
            <Settings size={14} /> Settings
          </button>

          <button 
            id="nav-sources"
            onClick={() => navigateTo('screen-30')}
            className={`btn btn-sm ${currentScreen === 'screen-30' ? 'btn-primary' : 'btn-outline'}`}
            title="Job Source Feeds Status"
          >
            <Database size={14} /> Sources
          </button>
        </div>
      </nav>
    </>
  );
}
