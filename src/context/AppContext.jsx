import React, { createContext, useContext, useState, useEffect } from 'react';
import { SAMPLE_CANDIDATES, MOCK_JOBS, calculateAtsMatchScore } from '../data/mockData';

const AppContext = createContext(null);

export function AppProvider({ children }) {
  // Screen state - default to Screen 01 or hash/query param if specified
  const getInitialScreen = () => {
    try {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('screen-')) return hash;
      const params = new URLSearchParams(window.location.search);
      const s = params.get('screen');
      if (s && s.startsWith('screen-')) return s;
    } catch (e) {}
    return 'screen-01';
  };

  const [currentScreen, setCurrentScreen] = useState(getInitialScreen);
  
  // Selected job for detail / match analysis views
  const [selectedJobId, setSelectedJobId] = useState('job-101');
  const [selectedApplicationId, setSelectedApplicationId] = useState('app-01');

  // Auth & Plan state
  const [user, setUser] = useState({
    id: 'user-001',
    fullName: 'Rahul Sharma',
    email: 'rahul.sharma@example.com',
    isAuthenticated: true, // set authenticated so core product screens work immediately
    plan: 'free', // 'free' | 'pro'
    dailyMatchQuota: 10,
    dailyMatchesUsed: 4,
    monthlyAutoApplyQuota: 5,
    monthlyAutoAppliesUsed: 2,
    proExpiresAt: null
  });

  // Candidate Profile (parsed from resume)
  const [candidate, setCandidate] = useState(SAMPLE_CANDIDATES[0]);

  // Multiple Resumes (for Pro feature - Screen 24)
  const [resumes, setResumes] = useState([
    {
      id: 'res-1',
      title: 'Rahul Sharma - Backend Specialist (Primary)',
      fileName: 'Rahul_Sharma_Resume_Backend_2026.pdf',
      uploadedAt: '2026-10-01',
      isPrimary: true,
      roleTarget: 'Backend & Distributed Systems',
      skillsCount: 13
    },
    {
      id: 'res-2',
      title: 'Rahul Sharma - Fullstack & Cloud Engineer',
      fileName: 'Rahul_Sharma_Fullstack_AWS_2026.pdf',
      uploadedAt: '2026-10-03',
      isPrimary: false,
      roleTarget: 'Full Stack & Cloud',
      skillsCount: 16
    }
  ]);

  // Upload progress state
  const [uploadProgress, setUploadProgress] = useState({
    file: null,
    isProcessing: false,
    currentStep: 0,
    statusText: 'Ready'
  });

  // Saved / Bookmarked jobs
  const [savedJobIds, setSavedJobIds] = useState(['job-102']);

  // User's Job Preferences
  const [preferences, setPreferences] = useState({
    targetTitles: ['Backend Engineer', 'Python Developer', 'SDE-2 Backend'],
    targetLocations: ['Bangalore', 'Hyderabad', 'Remote'],
    workModes: ['Remote', 'Hybrid'],
    minSalaryLpa: 18,
    noticePeriodDays: 30,
    experienceYears: 3.5,
    preferredIndustries: ['Fintech', 'Foodtech', 'E-commerce', 'SaaS'],
    companiesToAvoid: []
  });

  // Automation & Application Preferences
  const [automationSettings, setAutomationSettings] = useState({
    autoApplyThreshold: 75,
    applicationMode: 'ask', // 'auto' | 'ask' | 'manual'
    notificationFrequency: 'digest', // 'instant' | 'digest' | 'important_only'
    emailAlertsEnabled: true,
    maxDailyAutoApplications: 5
  });

  // Tracked Applications (5 MVP statuses: Discovered, Saved, Action Required, Applied, Failed)
  const [applications, setApplications] = useState([
    {
      id: 'app-01',
      jobId: 'job-101',
      company: 'Razorpay',
      title: 'Senior Backend Engineer (Python/FastAPI)',
      location: 'Bangalore',
      workMode: 'Hybrid',
      matchScore: 91,
      appliedAt: '2026-10-02 10:30 AM',
      status: 'Applied',
      method: 'Automated via Career Portal API',
      confirmationId: 'RZP-APP-98214',
      stage: 'Under Review',
      timeline: [
        { time: '2026-10-02 10:28 AM', text: 'ATS Compatibility verified at 91%' },
        { time: '2026-10-02 10:30 AM', text: 'Application submitted via Razorpay Career API' },
        { time: '2026-10-02 10:31 AM', text: 'Confirmation received: RZP-APP-98214' }
      ]
    },
    {
      id: 'app-02',
      jobId: 'job-104',
      company: 'PhonePe',
      title: 'Software Engineer - Payments Gateway',
      location: 'Hyderabad',
      workMode: 'Hybrid',
      matchScore: 81,
      appliedAt: '2026-10-03 04:15 PM',
      status: 'Action Required',
      method: 'Manual Portal Redirection Required',
      confirmationId: null,
      stage: 'Action Required',
      notes: 'Portal requires direct candidate verification captcha',
      timeline: [
        { time: '2026-10-03 04:10 PM', text: 'Job matched at 81% ATS score' },
        { time: '2026-10-03 04:15 PM', text: 'Manual action required: Portal security verification' }
      ]
    },
    {
      id: 'app-03',
      jobId: 'job-102',
      company: 'Swiggy',
      title: 'SDE-2 (Backend Services)',
      location: 'Bangalore',
      workMode: 'Remote',
      matchScore: 88,
      appliedAt: '2026-10-01 02:45 PM',
      status: 'Applied',
      method: 'Automated Carrier API',
      confirmationId: 'SWG-88192-IND',
      stage: 'Interview Scheduled',
      timeline: [
        { time: '2026-10-01 02:40 PM', text: 'Auto-applied (Score 88% ≥ 75% threshold)' },
        { time: '2026-10-03 11:00 AM', text: 'Recruiter screened resume' },
        { time: '2026-10-04 09:30 AM', text: 'Technical round 1 invitation received' }
      ]
    }
  ]);

  // System Activity Audit Trail (Screen 31)
  const [activityLogs, setActivityLogs] = useState([
    { id: 'log-1', timestamp: '2026-10-04 14:15', event: 'Job Discovery Sync', details: 'Ingested 47 new jobs from LinkedIn & Naukri feeds' },
    { id: 'log-2', timestamp: '2026-10-04 14:20', event: 'ATS Scoring Batch', details: 'Calculated compatibility scores for 8 high-relevance vacancies' },
    { id: 'log-3', timestamp: '2026-10-03 16:15', event: 'Application Alert', details: 'Dispatched manual action alert for PhonePe Payments role' },
    { id: 'log-4', timestamp: '2026-10-02 10:31', event: 'Auto-Apply Submission', details: 'Successfully submitted application to Razorpay (ID: RZP-APP-98214)' }
  ]);

  // Notification Inbox (Screen 32)
  const [notifications, setNotifications] = useState([
    { id: 1, title: '8 New High Matches', text: '8 new jobs matched your profile today with score ≥75%.', time: '10m ago', unread: true, category: 'matches' },
    { id: 2, title: 'Application Confirmed', text: 'Application successfully sent to Razorpay Careers Portal (RZP-APP-98214).', time: '2d ago', unread: false, category: 'application' },
    { id: 3, title: 'Action Required: PhonePe', text: 'PhonePe requires manual completion of security check on career page.', time: '1d ago', unread: true, category: 'action_required' },
    { id: 4, title: 'Interview Scheduled: Swiggy', text: 'Swiggy talent team requested availability for Technical Round 1.', time: '3h ago', unread: true, category: 'interview' }
  ]);

  // Job Source Status (Screen 30)
  const [sources, setSources] = useState([
    { id: 'src-1', name: 'LinkedIn Jobs API', status: 'Healthy', lastSync: '12 mins ago', jobsToday: 128, rateLimit: '42%' },
    { id: 'src-2', name: 'Naukri.com Portal Feed', status: 'Healthy', lastSync: '25 mins ago', jobsToday: 214, rateLimit: '68%' },
    { id: 'src-3', name: 'Instahire Fast-Track Feed', status: 'Healthy', lastSync: '40 mins ago', jobsToday: 65, rateLimit: '25%' },
    { id: 'src-4', name: 'Direct Company Career APIs (Razorpay, Swiggy, CRED, etc.)', status: 'Active', lastSync: '5 mins ago', jobsToday: 82, rateLimit: '30%' }
  ]);

  // Dynamic Matches helper
  const computeMatches = (cand) => {
    return MOCK_JOBS.map(job => {
      const matchResult = calculateAtsMatchScore(cand, job);
      return {
        ...job,
        matchResult
      };
    }).sort((a, b) => b.matchResult.totalScore - a.matchResult.totalScore);
  };

  // Synchronously initialize jobMatches so no screen renders with an empty list
  const [jobMatches, setJobMatches] = useState(() => computeMatches(candidate));

  useEffect(() => {
    setJobMatches(computeMatches(candidate));
  }, [candidate]);

  // Synchronize hash changes (back/forward navigation)
  useEffect(() => {
    const handleHashChange = () => {
      const hash = window.location.hash.replace('#', '');
      if (hash && hash.startsWith('screen-')) {
        setCurrentScreen(hash);
      }
    };
    window.addEventListener('hashchange', handleHashChange);
    return () => window.removeEventListener('hashchange', handleHashChange);
  }, []);

  const navigateTo = (screenId, params = {}) => {
    if (params.jobId) setSelectedJobId(params.jobId);
    if (params.applicationId) setSelectedApplicationId(params.applicationId);
    setCurrentScreen(screenId);
    try {
      if (window.location.hash !== `#${screenId}`) {
        window.history.pushState(null, '', `#${screenId}`);
      }
    } catch (e) {}
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const loginUser = (email = 'rahul.sharma@example.com') => {
    setUser(prev => ({ ...prev, email, isAuthenticated: true }));
  };

  const logoutUser = () => {
    setUser(prev => ({ ...prev, isAuthenticated: false }));
    navigateTo('screen-01');
  };

  const toggleSaveJob = (jobId) => {
    setSavedJobIds(prev => 
      prev.includes(jobId) ? prev.filter(id => id !== jobId) : [...prev, jobId]
    );
  };

  const upgradeToPro = () => {
    setUser(prev => ({
      ...prev,
      plan: 'pro',
      dailyMatchQuota: 100,
      monthlyAutoApplyQuota: 100,
      proExpiresAt: '2026-11-04'
    }));
    setActivityLogs(prev => [
      { id: `log-${Date.now()}`, timestamp: new Date().toLocaleString(), event: 'Plan Upgrade', details: 'Upgraded to Pro Job Switcher (₹499/month)' },
      ...prev
    ]);
  };

  const addApplication = (job, method = 'Automated') => {
    const isManual = method === 'Manual';
    const confId = isManual ? null : `CP-${Math.floor(100000 + Math.random() * 900000)}`;
    const newApp = {
      id: `app-${Date.now()}`,
      jobId: job.id,
      company: job.company,
      title: job.title,
      location: job.location,
      workMode: job.workMode,
      matchScore: job.matchResult?.totalScore || 85,
      appliedAt: new Date().toLocaleString(),
      status: isManual ? 'Action Required' : 'Applied',
      method: isManual ? 'Manual Portal Application' : 'Automated Carrier API',
      confirmationId: confId,
      stage: isManual ? 'Action Required' : 'Under Review',
      timeline: [
        { time: new Date().toLocaleString(), text: isManual ? 'Manual action required link generated' : `Application dispatched with ID: ${confId}` }
      ]
    };

    setApplications(prev => [newApp, ...prev]);
    setUser(prev => ({
      ...prev,
      monthlyAutoAppliesUsed: prev.monthlyAutoAppliesUsed + 1
    }));
    setActivityLogs(prev => [
      { id: `log-${Date.now()}`, timestamp: new Date().toLocaleString(), event: isManual ? 'Manual Alert' : 'Application Submitted', details: `${job.title} at ${job.company}` },
      ...prev
    ]);
  };

  const markApplicationStatus = (appId, newStatus, newStage) => {
    setApplications(prev => prev.map(app => {
      if (app.id === appId) {
        return {
          ...app,
          status: newStatus,
          stage: newStage || app.stage,
          timeline: [
            ...app.timeline,
            { time: new Date().toLocaleString(), text: `Status updated to ${newStatus} (${newStage || newStatus})` }
          ]
        };
      }
      return app;
    }));
  };

  return (
    <AppContext.Provider
      value={{
        currentScreen,
        setCurrentScreen,
        navigateTo,
        selectedJobId,
        setSelectedJobId,
        selectedApplicationId,
        setSelectedApplicationId,
        user,
        setUser,
        loginUser,
        logoutUser,
        candidate,
        setCandidate,
        resumes,
        setResumes,
        uploadProgress,
        setUploadProgress,
        preferences,
        setPreferences,
        automationSettings,
        setAutomationSettings,
        applications,
        addApplication,
        markApplicationStatus,
        savedJobIds,
        toggleSaveJob,
        upgradeToPro,
        activityLogs,
        notifications,
        sources,
        setSources,
        jobMatches
      }}
    >
      {children}
    </AppContext.Provider>
  );
}

export function useApp() {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error('useApp must be used within an AppProvider');
  }
  return context;
}
