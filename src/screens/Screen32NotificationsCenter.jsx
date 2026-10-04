import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { Bell, Check, Clock, ArrowRight, ArrowLeft } from 'lucide-react';

export function Screen32NotificationsCenter() {
  const { notifications, navigateTo } = useApp();
  const [filter, setFilter] = useState('all');

  const filteredNotifs = notifications.filter(n => {
    if (filter === 'unread') return n.unread;
    if (filter === 'all') return true;
    return n.category === filter;
  });

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '820px' }}>
      <button 
        onClick={() => navigateTo('screen-14')}
        className="btn btn-outline btn-sm"
        style={{ marginBottom: '1.25rem' }}
      >
        <ArrowLeft size={14} /> Back to Dashboard
      </button>

      <div className="glass-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
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
              SCREEN 32 • NOTIFICATIONS INBOX
            </div>
            <h1 style={{ fontSize: '1.8rem', fontWeight: 800 }}>Notification Center</h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem' }}>
              Real-time alerts for high-matching vacancies, portal responses, and interview requests.
            </p>
          </div>

          <div style={{ display: 'flex', gap: '0.4rem' }}>
            {['all', 'unread', 'interview', 'action_required'].map(cat => (
              <button 
                key={cat}
                onClick={() => setFilter(cat)}
                className={`btn btn-sm ${filter === cat ? 'btn-primary' : 'btn-outline'}`}
                style={{ textTransform: 'capitalize' }}
              >
                {cat.replace('_', ' ')}
              </button>
            ))}
          </div>
        </div>

        {/* Notifications List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem', marginBottom: '1.5rem' }}>
          {filteredNotifs.map(n => (
            <div 
              key={n.id}
              style={{
                background: n.unread ? 'rgba(99, 102, 241, 0.12)' : 'var(--bg-tertiary)',
                border: n.unread ? '1px solid rgba(99, 102, 241, 0.4)' : '1px solid var(--border-subtle)',
                borderRadius: 'var(--radius-md)',
                padding: '1rem',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                gap: '1rem'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.2rem' }}>
                  <strong style={{ fontSize: '0.92rem', color: n.unread ? '#ffffff' : 'var(--text-secondary)' }}>
                    {n.title}
                  </strong>
                  {n.unread && <span className="badge badge-indigo" style={{ fontSize: '0.68rem' }}>NEW</span>}
                </div>
                <div style={{ fontSize: '0.82rem', color: 'var(--text-secondary)' }}>
                  {n.text}
                </div>
                <div style={{ fontSize: '0.72rem', color: 'var(--text-muted)', marginTop: '0.3rem', display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                  <Clock size={11} /> {n.time}
                </div>
              </div>

              <button 
                onClick={() => {
                  if (n.category === 'action_required') navigateTo('screen-20');
                  else if (n.category === 'interview' || n.category === 'application') navigateTo('screen-21');
                  else navigateTo('screen-15');
                }}
                className="btn btn-outline btn-sm"
                style={{ fontSize: '0.75rem' }}
              >
                View →
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
