import React from 'react';
import { useApp } from './context/AppContext';
import { HeaderNav } from './components/HeaderNav';

// Phase 1: Pre-Auth & Onboarding (01–13)
import { Screen01Landing } from './screens/Screen01Landing';
import { Screen02Signup } from './screens/Screen02Signup';
import { Screen03EmailVerify } from './screens/Screen03EmailVerify';
import { Screen04Login } from './screens/Screen04Login';
import { Screen05ForgotPassword } from './screens/Screen05ForgotPassword';
import { Screen06ResetPassword } from './screens/Screen06ResetPassword';
import { Screen07Welcome } from './screens/Screen07Welcome';
import { Screen08ResumeUpload } from './screens/Screen08ResumeUpload';
import { Screen09ResumeProcessing } from './screens/Screen09ResumeProcessing';
import { Screen10ProfileReview } from './screens/Screen10ProfileReview';
import { Screen11JobPreferences } from './screens/Screen11JobPreferences';
import { Screen12AppPreferences } from './screens/Screen12AppPreferences';
import { Screen13FirstMatchResults } from './screens/Screen13FirstMatchResults';

// Phase 2: Catalog & Ingestion (15, 16, 30)
import { Screen15JobMatches } from './screens/Screen15JobMatches';
import { Screen16JobDetail } from './screens/Screen16JobDetail';
import { Screen30JobSourceStatus } from './screens/Screen30JobSourceStatus';

// Phase 3: ATS Matching Engine (17)
import { Screen17MatchAnalysis } from './screens/Screen17MatchAnalysis';

// Phase 4: Command Center & Automation Tracker (14, 18, 19, 20, 21, 22)
import { Screen14Dashboard } from './screens/Screen14Dashboard';
import { Screen18AppConfirmation } from './screens/Screen18AppConfirmation';
import { Screen19AppStatus } from './screens/Screen19AppStatus';
import { Screen20ManualApp } from './screens/Screen20ManualApp';
import { Screen21AppTracker } from './screens/Screen21AppTracker';
import { Screen22AppDetail } from './screens/Screen22AppDetail';

// Phase 5: Profile, Quota & Tier Management, Settings (23–29, 31–33)
import { Screen23CandidateProfile } from './screens/Screen23CandidateProfile';
import { Screen24ResumeManager } from './screens/Screen24ResumeManager';
import { Screen25JobPreferencesEdit } from './screens/Screen25JobPreferencesEdit';
import { Screen26AutomationSettings } from './screens/Screen26AutomationSettings';
import { Screen27NotificationSettings } from './screens/Screen27NotificationSettings';
import { Screen28SubscriptionUsage } from './screens/Screen28SubscriptionUsage';
import { Screen29AccountSettings } from './screens/Screen29AccountSettings';
import { Screen31ActivityLog } from './screens/Screen31ActivityLog';
import { Screen32NotificationsCenter } from './screens/Screen32NotificationsCenter';
import { Screen33HelpSupport } from './screens/Screen33HelpSupport';

import { ErrorBoundary } from './components/ErrorBoundary';

export function App() {
  const { currentScreen, navigateTo } = useApp();

  const renderScreen = () => {
    switch (currentScreen) {
      // Phase 1
      case 'screen-01': return <Screen01Landing />;
      case 'screen-02': return <Screen02Signup />;
      case 'screen-03': return <Screen03EmailVerify />;
      case 'screen-04': return <Screen04Login />;
      case 'screen-05': return <Screen05ForgotPassword />;
      case 'screen-06': return <Screen06ResetPassword />;
      case 'screen-07': return <Screen07Welcome />;
      case 'screen-08': return <Screen08ResumeUpload />;
      case 'screen-09': return <Screen09ResumeProcessing />;
      case 'screen-10': return <Screen10ProfileReview />;
      case 'screen-11': return <Screen11JobPreferences />;
      case 'screen-12': return <Screen12AppPreferences />;
      case 'screen-13': return <Screen13FirstMatchResults />;

      // Phase 2
      case 'screen-15': return <Screen15JobMatches />;
      case 'screen-16': return <Screen16JobDetail />;
      case 'screen-30': return <Screen30JobSourceStatus />;

      // Phase 3
      case 'screen-17': return <Screen17MatchAnalysis />;

      // Phase 4
      case 'screen-14': return <Screen14Dashboard />;
      case 'screen-18': return <Screen18AppConfirmation />;
      case 'screen-19': return <Screen19AppStatus />;
      case 'screen-20': return <Screen20ManualApp />;
      case 'screen-21': return <Screen21AppTracker />;
      case 'screen-22': return <Screen22AppDetail />;

      // Phase 5
      case 'screen-23': return <Screen23CandidateProfile />;
      case 'screen-24': return <Screen24ResumeManager />;
      case 'screen-25': return <Screen25JobPreferencesEdit />;
      case 'screen-26': return <Screen26AutomationSettings />;
      case 'screen-27': return <Screen27NotificationSettings />;
      case 'screen-28': return <Screen28SubscriptionUsage />;
      case 'screen-29': return <Screen29AccountSettings />;
      case 'screen-31': return <Screen31ActivityLog />;
      case 'screen-32': return <Screen32NotificationsCenter />;
      case 'screen-33': return <Screen33HelpSupport />;

      default: return <Screen01Landing />;
    }
  };

  return (
    <div className="app-container">
      <HeaderNav />
      <main className="main-content">
        <ErrorBoundary key={currentScreen} onReset={() => navigateTo('screen-01')}>
          {renderScreen()}
        </ErrorBoundary>
      </main>

      {/* Persistent SaaS Footer */}
      <footer style={{
        borderTop: '1px solid var(--border-subtle)',
        padding: '2rem 1.5rem',
        textAlign: 'center',
        color: 'var(--text-muted)',
        fontSize: '0.82rem',
        background: 'rgba(11, 15, 25, 0.95)'
      }}>
        <div style={{ marginBottom: '0.4rem', fontWeight: 700, color: 'var(--text-primary)' }}>
          CareerPilot • Complete 33-Screen Architecture for Indian IT Job Matching & Automation
        </div>
        <div style={{ color: 'var(--text-secondary)' }}>
          Bangalore • Hyderabad • Pune • Delhi NCR | Built with 5-Dimension Explainable ATS Scoring (0–100) & DPDP Consent Compliance
        </div>
      </footer>
    </div>
  );
}
