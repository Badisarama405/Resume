import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  FileCheck, Zap, Building2, MapPin, Clock, 
  ExternalLink, ArrowRight, Eye, CheckCircle2, AlertTriangle, XCircle 
} from 'lucide-react';

export function Screen21AppTracker() {
  const { applications, navigateTo } = useApp();
  const [selectedStatusTab, setSelectedStatusTab] = useState('all');

  const filteredApps = applications.filter(app => {
    if (selectedStatusTab === 'all') return true;
    return app.status.toLowerCase().replace(' ', '_') === selectedStatusTab;
  });

  return (
    <div className="container" style={{ paddingTop: '2rem' }}>
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
            SCREEN 21 • APPLICATION LIFECYCLE TRACKER
          </div>
          <h1 style={{ fontSize: '2rem', fontWeight: 800 }}>
            Application Tracker
          </h1>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
            Monitor and manage all candidate submissions across the 5 MVP statuses.
          </p>
        </div>

        <button 
          onClick={() => navigateTo('screen-15')}
          className="btn btn-primary btn-sm"
        >
          Find More Jobs to Apply (Screen 15)
        </button>
      </div>

      {/* 5 Status Filter Tabs */}
      <div style={{ display: 'flex', gap: '0.5rem', marginBottom: '1.5rem', overflowX: 'auto', paddingBottom: '0.5rem' }}>
        {[
          { id: 'all', label: `All (${applications.length})` },
          { id: 'applied', label: `Applied (${applications.filter(a => a.status === 'Applied').length})` },
          { id: 'action_required', label: `Action Required (${applications.filter(a => a.status === 'Action Required').length})` },
          { id: 'saved', label: `Saved (${applications.filter(a => a.status === 'Saved').length})` },
          { id: 'failed', label: `Failed (${applications.filter(a => a.status === 'Failed').length})` }
        ].map(tab => (
          <button 
            key={tab.id}
            onClick={() => setSelectedStatusTab(tab.id)}
            className={`btn btn-sm ${selectedStatusTab === tab.id ? 'btn-primary' : 'btn-outline'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Applications Table / Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '3.5rem' }}>
        {filteredApps.length === 0 ? (
          <div className="glass-card" style={{ textAlign: 'center', padding: '3rem' }}>
            <p style={{ color: 'var(--text-secondary)', marginBottom: '1rem' }}>
              No applications currently found in this category.
            </p>
            <button 
              onClick={() => setSelectedStatusTab('all')}
              className="btn btn-secondary btn-sm"
            >
              View All Applications
            </button>
          </div>
        ) : (
          filteredApps.map(app => {
            const isApplied = app.status === 'Applied';
            const isActionReq = app.status === 'Action Required';

            return (
              <div 
                key={app.id}
                className="glass-card"
                style={{
                  border: isActionReq ? '1px solid rgba(245, 158, 11, 0.4)' : '1px solid var(--border-subtle)',
                  padding: '1.25rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                  <div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', flexWrap: 'wrap' }}>
                      <h3 
                        onClick={() => navigateTo('screen-22', { applicationId: app.id, jobId: app.jobId })}
                        style={{ fontSize: '1.15rem', fontWeight: 700, cursor: 'pointer' }}
                      >
                        {app.title}
                      </h3>
                      <span className={`badge ${isApplied ? 'badge-success' : isActionReq ? 'badge-warning' : 'badge-danger'}`}>
                        {app.status}
                      </span>
                      {app.stage && (
                        <span className="badge badge-indigo">
                          Stage: {app.stage}
                        </span>
                      )}
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', color: 'var(--text-secondary)', fontSize: '0.85rem', marginTop: '0.35rem', flexWrap: 'wrap' }}>
                      <span style={{ fontWeight: 600, color: 'var(--text-primary)' }}>{app.company}</span>
                      <span>•</span>
                      <span>{app.location || 'Bangalore'} ({app.workMode || 'Hybrid'})</span>
                      <span>•</span>
                      <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                        <Clock size={12} /> {app.appliedAt}
                      </span>
                    </div>

                    <div style={{ fontSize: '0.78rem', color: 'var(--text-muted)', marginTop: '0.4rem' }}>
                      Method: <strong>{app.method}</strong> 
                      {app.confirmationId && <span> • Confirmation: <span style={{ fontFamily: 'monospace', color: '#34d399' }}>{app.confirmationId}</span></span>}
                    </div>
                  </div>

                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div className="score-pill score-high">
                      <Zap size={13} /> {app.matchScore}% Match
                    </div>

                    <button 
                      onClick={() => navigateTo('screen-22', { applicationId: app.id, jobId: app.jobId })}
                      className="btn btn-outline btn-sm"
                    >
                      <Eye size={13} /> View Audit Timeline (Screen 22)
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        )}
      </div>
    </div>
  );
}
