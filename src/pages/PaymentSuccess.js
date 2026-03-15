import React from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import { LogoMark } from '../components/Logo';

function PaymentSuccess() {
  const navigate = useNavigate();
  const [params] = useSearchParams();
  const type = params.get('type'); // 'single' or 'subscription'

  const paymentId =
    type === 'subscription'
      ? localStorage.getItem('luxecheck_subscription_id')
      : localStorage.getItem('luxecheck_payment_id');

  const isSub = type === 'subscription';

  return (
    <div style={s.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1706164965907-f0ca4b16f7e4?w=1920&q=80" opacity={0.20} />

      <div style={s.content}>
        {/* Animated gold checkmark */}
        <div style={s.checkCircle}>
          <svg width="48" height="48" viewBox="0 0 48 48" fill="none">
            <circle cx="24" cy="24" r="23" stroke="#B8945F" strokeWidth="2" className="success-circle" />
            <path d="M14 24L21 31L34 18" stroke="#B8945F" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="success-check" />
          </svg>
        </div>

        <style>{`
          @keyframes drawSuccessCircle {
            from { stroke-dashoffset: 145; }
            to { stroke-dashoffset: 0; }
          }
          @keyframes drawSuccessCheck {
            from { stroke-dashoffset: 40; }
            to { stroke-dashoffset: 0; }
          }
          .success-circle {
            stroke-dasharray: 145;
            stroke-dashoffset: 145;
            animation: drawSuccessCircle 0.6s ease-out 0.2s forwards;
          }
          .success-check {
            stroke-dasharray: 40;
            stroke-dashoffset: 40;
            animation: drawSuccessCheck 0.4s ease-out 0.7s forwards;
          }
        `}</style>

        <h1 style={s.heading}>Payment Successful!</h1>

        <div style={s.seal}>
          <LogoMark size={32} color="#B8945F" />
        </div>

        <p style={s.message}>
          {isSub
            ? 'Welcome to LuxeCheck Unlimited! You now have unlimited checks, full reports, and collection tracking.'
            : 'Your full report is now unlocked. Go back to see all checkpoint details, red flags, and resale value.'}
        </p>

        {paymentId && (
          <div style={s.receiptBox}>
            <span style={s.receiptLabel}>Receipt Reference</span>
            <span style={s.receiptId}>{paymentId}</span>
          </div>
        )}

        <div style={s.btnGroup}>
          <button
            className="btn-luxe glass-btn-primary"
            style={s.primaryBtn}
            onClick={() => navigate('/results')}
          >
            View My Report
          </button>
          <button
            className="btn-luxe glass-btn-secondary"
            style={s.secondaryBtn}
            onClick={() => navigate('/scan')}
          >
            Check Another Item
          </button>
        </div>
      </div>
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    padding: '24px 16px 60px',
    maxWidth: '500px',
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  content: {
    textAlign: 'center',
    width: '100%',
  },
  checkCircle: {
    marginBottom: '28px',
    display: 'inline-block',
  },
  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '16px',
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
  },
  seal: {
    marginBottom: '24px',
    opacity: 0.5,
  },
  message: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream-muted)',
    marginBottom: '28px',
    maxWidth: '380px',
    margin: '0 auto 28px',
  },
  receiptBox: {
    display: 'flex',
    flexDirection: 'column',
    gap: '4px',
    padding: '16px 20px',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(184, 148, 95, 0.15)',
    borderRadius: '12px',
    marginBottom: '32px',
  },
  receiptLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-cream-muted)',
    opacity: 0.6,
  },
  receiptId: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 400,
    color: 'var(--color-gold)',
    letterSpacing: '0.05em',
    wordBreak: 'break-all',
  },
  btnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  primaryBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-cream)',
    padding: '16px 24px',
    cursor: 'pointer',
    width: '100%',
  },
  secondaryBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.05em',
    color: 'var(--color-gold)',
    padding: '14px 24px',
    cursor: 'pointer',
    width: '100%',
  },
};

export default PaymentSuccess;
