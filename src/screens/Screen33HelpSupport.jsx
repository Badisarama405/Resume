import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { HelpCircle, ChevronDown, ChevronUp, Mail, Send, CheckCircle2, ArrowLeft } from 'lucide-react';

export function Screen33HelpSupport() {
  const { navigateTo } = useApp();
  const [openFaq, setOpenFaq] = useState(0);
  const [supportMessage, setSupportMessage] = useState('');
  const [messageSent, setMessageSent] = useState(false);

  const faqs = [
    {
      q: "How does CareerPilot calculate my ATS Compatibility Score (0–100)?",
      a: "Our ATS engine compares your verified resume against each JD across 5 transparent dimensions: Core Required Skills (40%), Experience & Seniority (25%), Preferred / Bonus Skills (15%), Location & Work Mode Fit (10%), and Title Relevance (10%). No mysterious black-box scores."
    },
    {
      q: "Will CareerPilot submit applications without my permission?",
      a: "Never. You can choose 'Ask Me Before Applying' mode (default), which alerts you for 1-click confirmation, or set strict threshold rules. We also enforce anti-duplicate submission safeguards so you never apply to the same role twice."
    },
    {
      q: "What is the difference between Automatic and Manual Action Required?",
      a: "When a company portal exposes an API or permitted webhook (e.g. Razorpay, Swiggy careers), CareerPilot can automate submission. Where portals require CAPTCHAs, SSO logins, or phone OTPs (e.g. some Naukri/PhonePe forms), CareerPilot provides 1-click portal links and copy-paste clipboard helpers."
    },
    {
      q: "What is included in the Pro Plan (₹499/month)?",
      a: "Pro expands your daily matching quota from 10 to 100 jobs/day, monthly automated applications from 5 to 100/month, unlocks up to 3 specialized resume profiles, provides detailed ATS keyword optimization tips, and gives 90-day application audit history."
    }
  ];

  const handleSendSupport = (e) => {
    e.preventDefault();
    if (supportMessage.trim()) {
      setMessageSent(true);
      setTimeout(() => {
        setSupportMessage('');
        setMessageSent(false);
      }, 3000);
    }
  };

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
          SCREEN 33 • HELP & CANDIDATE SUPPORT
        </div>

        <h1 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Frequently Asked Questions
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.88rem', marginBottom: '2rem' }}>
          Everything you need to know about AI ATS scoring, consent gates, and Indian IT career automation.
        </p>

        {/* FAQs Accordion */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2.5rem' }}>
          {faqs.map((faq, idx) => (
            <div 
              key={idx}
              style={{
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-md)',
                border: '1px solid var(--border-subtle)',
                overflow: 'hidden'
              }}
            >
              <div 
                onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                style={{
                  padding: '1rem 1.25rem',
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  cursor: 'pointer',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  color: 'var(--text-primary)'
                }}
              >
                <span>{faq.q}</span>
                {openFaq === idx ? <ChevronUp size={18} color="#818cf8" /> : <ChevronDown size={18} color="var(--text-muted)" />}
              </div>

              {openFaq === idx && (
                <div style={{ padding: '0 1.25rem 1rem 1.25rem', fontSize: '0.85rem', color: 'var(--text-secondary)', lineHeight: 1.6, borderTop: '1px solid rgba(255, 255, 255, 0.04)', paddingTop: '0.75rem' }}>
                  {faq.a}
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact Support Form */}
        <div style={{ background: 'var(--bg-tertiary)', padding: '1.5rem', borderRadius: 'var(--radius-md)', border: '1px solid var(--border-subtle)' }}>
          <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.35rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
            <Mail size={16} color="#818cf8" /> Contact Candidate Success Team
          </h3>
          <p style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Have a question about an application or career portal integration? We respond within 4 hours.
          </p>

          {messageSent ? (
            <div style={{ background: 'var(--success-bg)', border: '1px solid var(--success-border)', padding: '0.75rem 1rem', borderRadius: 'var(--radius-md)', color: '#34d399', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircle2 size={16} /> Support ticket created! Our team will reach out to your registered email.
            </div>
          ) : (
            <form onSubmit={handleSendSupport}>
              <textarea 
                className="form-input"
                rows={3}
                placeholder="Describe your issue or feature suggestion..."
                value={supportMessage}
                onChange={(e) => setSupportMessage(e.target.value)}
                style={{ width: '100%', marginBottom: '0.75rem', resize: 'vertical' }}
                required
              />
              <button type="submit" className="btn btn-primary btn-sm">
                <Send size={14} /> Submit Query
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
