import React, { useState } from 'react';
import { useApp } from '../context/AppContext';
import { 
  Crown, Check, Zap, ArrowRight, ShieldCheck, 
  IndianRupee, CreditCard, Sparkles, CheckCircle2 
} from 'lucide-react';
import confetti from 'canvas-confetti';

export function Screen28SubscriptionUsage() {
  const { user, upgradeToPro, navigateTo } = useApp();
  const [showCheckoutModal, setShowCheckoutModal] = useState(false);
  const [isProcessingPayment, setIsProcessingPayment] = useState(false);
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  const handleSimulatePayment = () => {
    setIsProcessingPayment(true);
    setTimeout(() => {
      setIsProcessingPayment(false);
      setPaymentSuccess(true);
      upgradeToPro();
      try {
        confetti({ particleCount: 70, spread: 80, origin: { y: 0.5 } });
      } catch (e) {}
    }, 1200);
  };

  return (
    <div className="container" style={{ paddingTop: '2rem', maxWidth: '880px' }}>
      {/* Header */}
      <div style={{ textAlign: 'center', marginBottom: '2.5rem' }}>
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
          SCREEN 28 • SUBSCRIPTION & METERED USAGE
        </div>
        <h1 style={{ fontSize: '2.1rem', fontWeight: 800, marginBottom: '0.5rem' }}>
          Subscription & Usage Quotas
        </h1>
        <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem' }}>
          Real-time visibility into your monthly applications and daily matching allowance.
        </p>
      </div>

      {/* Current Plan Status Card */}
      <div className="glass-card" style={{ marginBottom: '2.5rem', border: user.plan === 'pro' ? '1px solid var(--accent-primary)' : '1px solid var(--border-subtle)' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem', marginBottom: '1.5rem' }}>
          <div>
            <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)' }}>Active Membership</div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              {user.plan === 'pro' ? (
                <>Pro Job Switcher <span className="badge badge-success"><Crown size={12} /> Active</span></>
              ) : (
                <>Free Candidate Tier <span className="badge badge-warning">Basic</span></>
              )}
            </div>
          </div>

          {user.plan !== 'pro' ? (
            <button 
              id="upgrade-pro-btn"
              onClick={() => setShowCheckoutModal(true)}
              className="btn btn-primary btn-sm"
            >
              <Crown size={14} /> Upgrade to Pro — ₹499/month
            </button>
          ) : (
            <div style={{ color: '#34d399', fontSize: '0.85rem', fontWeight: 600 }}>
              Renewal Date: Nov 04, 2026
            </div>
          )}
        </div>

        {/* Meters */}
        <div className="grid-2">
          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span>Daily Job Matches (Reset in 9 hrs)</span>
              <strong>{user.dailyMatchesUsed} / {user.dailyMatchQuota} used</strong>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${(user.dailyMatchesUsed / user.dailyMatchQuota) * 100}%`, height: '100%', background: 'var(--accent-gradient)', borderRadius: '4px' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {user.dailyMatchQuota - user.dailyMatchesUsed} matches remaining today
            </div>
          </div>

          <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.4rem' }}>
              <span>Monthly Automatic Applications</span>
              <strong>{user.monthlyAutoAppliesUsed} / {user.monthlyAutoApplyQuota} used</strong>
            </div>
            <div style={{ width: '100%', height: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '4px', overflow: 'hidden' }}>
              <div style={{ width: `${(user.monthlyAutoAppliesUsed / user.monthlyAutoApplyQuota) * 100}%`, height: '100%', background: '#10b981', borderRadius: '4px' }} />
            </div>
            <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.35rem' }}>
              {user.monthlyAutoApplyQuota - user.monthlyAutoAppliesUsed} automatic submissions remaining this cycle
            </div>
          </div>
        </div>
      </div>

      {/* Free vs Pro Comparison */}
      <div className="grid-2" style={{ marginBottom: '3rem' }}>
        <div className="glass-card">
          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Free Plan</h3>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem' }}>₹0 / month</div>
          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> 1 Resume Profile</li>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> 10 Job Matches / day</li>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> Basic ATS Compatibility Scoring</li>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> 5 Automatic Applications / month</li>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> Daily Morning Digest email</li>
          </ul>
        </div>

        <div className="glass-card" style={{ border: '1px solid var(--accent-primary)', position: 'relative' }}>
          <div style={{
            position: 'absolute',
            top: '-12px',
            right: '20px',
            background: 'var(--accent-gradient)',
            color: '#ffffff',
            fontSize: '0.72rem',
            fontWeight: 700,
            padding: '0.2rem 0.6rem',
            borderRadius: 'var(--radius-full)'
          }}>
            RECOMMENDED FOR ACTIVE SWITCHERS
          </div>

          <h3 style={{ fontSize: '1.25rem', marginBottom: '0.25rem' }}>Pro Plan</h3>
          <div style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '1rem', color: '#38bdf8' }}>
            ₹499 <span style={{ fontSize: '0.85rem', color: 'var(--text-muted)', fontWeight: 400 }}>/ month</span>
          </div>

          <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.65rem', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> Up to 3 Tailored Resume Profiles</li>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> 100 Job Matches / day</li>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> Detailed ATS Gap Analysis & Keyword Optimizer</li>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> 100 Automatic Applications / month</li>
            <li style={{ display: 'flex', gap: '0.4rem' }}><Check size={16} color="#10b981" /> Real-time Instant Alerts & 90-day history</li>
          </ul>

          {user.plan !== 'pro' && (
            <button 
              onClick={() => setShowCheckoutModal(true)}
              className="btn btn-primary btn-full"
            >
              Upgrade Now (₹499/mo)
            </button>
          )}
        </div>
      </div>

      {/* Simulated Razorpay Checkout Modal */}
      {showCheckoutModal && (
        <div style={{
          position: 'fixed',
          inset: 0,
          background: 'rgba(0, 0, 0, 0.75)',
          backdropFilter: 'blur(8px)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          zIndex: 999,
          padding: '1rem'
        }}>
          <div className="glass-card" style={{ maxWidth: '440px', width: '100%', textAlign: 'center' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.25rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontWeight: 800, fontSize: '1rem' }}>
                <CreditCard size={18} color="#818cf8" /> Razorpay Test Gateway
              </div>
              <button onClick={() => setShowCheckoutModal(false)} className="btn btn-outline btn-sm">×</button>
            </div>

            {paymentSuccess ? (
              <div style={{ padding: '1rem 0' }}>
                <CheckCircle2 size={48} color="#10b981" style={{ margin: '0 auto 1rem auto' }} />
                <h3 style={{ fontSize: '1.3rem', marginBottom: '0.35rem' }}>Payment Successful!</h3>
                <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1.5rem' }}>
                  Welcome to <strong>Pro Member</strong>! Quota expanded to 100 matches/day & 100 auto-applications/month.
                </p>
                <button 
                  onClick={() => {
                    setShowCheckoutModal(false);
                    setPaymentSuccess(false);
                  }}
                  className="btn btn-primary btn-full"
                >
                  Return to Dashboard
                </button>
              </div>
            ) : (
              <div>
                <div style={{ background: 'var(--bg-tertiary)', padding: '1rem', borderRadius: 'var(--radius-md)', marginBottom: '1.5rem', textAlign: 'left' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span>Pro Job Switcher Plan:</span>
                    <strong>₹499.00</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.35rem' }}>
                    <span>GST (18%):</span>
                    <strong>₹0.00 (Test Sandbox)</strong>
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1rem', fontWeight: 800, borderTop: '1px solid var(--border-subtle)', paddingTop: '0.5rem', marginTop: '0.5rem' }}>
                    <span>Total Amount:</span>
                    <span style={{ color: '#34d399' }}>₹499.00</span>
                  </div>
                </div>

                <div style={{ fontSize: '0.8rem', color: 'var(--text-muted)', marginBottom: '1.5rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.4rem' }}>
                  <ShieldCheck size={16} color="#10b981" /> 256-bit Encrypted Simulated Sandbox
                </div>

                <button 
                  id="razorpay-pay-btn"
                  onClick={handleSimulatePayment}
                  disabled={isProcessingPayment}
                  className="btn btn-primary btn-full btn-lg"
                >
                  {isProcessingPayment ? 'Authorizing with Bank...' : 'Pay ₹499 (Test Sandbox)'}
                </button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
