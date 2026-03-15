import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';

const faqs = [
  {
    q: 'Is this a real authentication?',
    a: 'LuxeCheck is an educational reference tool that guides your own visual inspection. It does not replace a professional authentication service. For high-value purchases, we always recommend consulting a certified authenticator.',
  },
  {
    q: 'Can I get a refund?',
    a: 'Yes — we offer a full refund within 7 days of purchase, no questions asked. Contact us and we\u2019ll process it immediately.',
  },
  {
    q: 'What brands do you cover?',
    a: 'Currently Louis Vuitton, Chanel, and Gucci with detailed checkpoint databases. Herm\u00e8s, Dior, and Prada are coming soon.',
  },
];

function Pricing() {
  const navigate = useNavigate();
  const [openFaq, setOpenFaq] = useState(null);

  const handleBuy = () => {
    // ──────────────────────────────────────────────────────────
    // TODO: Replace with Stripe Checkout integration
    // Use Stripe.redirectToCheckout() or create a checkout session
    // via your backend, then redirect the user.
    // On success callback, set localStorage flag:
    //   localStorage.setItem('luxecheck_paid', 'true');
    // ──────────────────────────────────────────────────────────
    try { localStorage.setItem('luxecheck_paid', 'true'); } catch {}
    alert('Payment coming soon \u2014 enjoy free access during beta!');
    navigate(-1);
  };

  const handleSubscribe = () => {
    // ──────────────────────────────────────────────────────────
    // TODO: Replace with Stripe Subscription Checkout
    // Create a subscription checkout session via your backend.
    // On success callback, set both localStorage flags:
    //   localStorage.setItem('luxecheck_paid', 'true');
    //   localStorage.setItem('luxecheck_subscribed', 'true');
    // ──────────────────────────────────────────────────────────
    try {
      localStorage.setItem('luxecheck_paid', 'true');
      localStorage.setItem('luxecheck_subscribed', 'true');
    } catch {}
    alert('Payment coming soon \u2014 enjoy free access during beta!');
    navigate(-1);
  };

  return (
    <div style={s.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1706164965907-f0ca4b16f7e4?w=1920&q=80" opacity={0.20} />
      <button style={s.backBtn} onClick={() => navigate(-1)}>
        &larr; Back
      </button>

      <div style={s.headerSection}>
        <span style={s.eyebrow}>Pricing</span>
        <h1 style={s.heading}>Unlock the Full Experience</h1>
        <p style={s.subtext}>
          Choose the plan that fits how you shop.
        </p>
      </div>

      {/* Pricing cards */}
      <div style={s.cardGrid} data-pricing-grid="">
        {/* Single Report */}
        <div className="glass-card" style={s.card}>
          <div style={s.cardInner}>
            <span style={s.tierLabel}>Single Report</span>
            <div style={s.priceRow}>
              <span style={s.price}>$6.99</span>
              <span style={s.priceSuffix}>one-time</span>
            </div>
            <p style={s.goodFor}>Good for: Verifying a luxury item before you buy</p>
            <ul style={s.featureList}>
              <li style={s.featureItem}><span style={s.check}>{'\u2713'}</span> Full details on all checkpoints</li>
              <li style={s.featureItem}><span style={s.check}>{'\u2713'}</span> Downloadable PDF report</li>
              <li style={s.featureItem}><span style={s.check}>{'\u2713'}</span> Reference photo comparisons</li>
            </ul>
            <button className="btn-luxe glass-btn-secondary" style={s.buyBtn} onClick={handleBuy}>
              Buy Report
            </button>
          </div>
        </div>

        {/* Unlimited */}
        <div className="glass-card" style={{ ...s.card, ...s.featuredCard }}>
          <div style={s.popularBadge}>Most Popular</div>
          <div style={s.cardInner}>
            <span style={s.tierLabel}>Unlimited</span>
            <div style={s.priceRow}>
              <span style={s.price}>$3.99</span>
              <span style={s.priceSuffix}>/ month</span>
            </div>
            <p style={s.goodFor}>Good for: Resellers and collectors</p>
            <ul style={s.featureList}>
              <li style={s.featureItem}><span style={s.check}>{'\u2713'}</span> Everything in Single Report</li>
              <li style={s.featureItem}><span style={s.check}>{'\u2713'}</span> Unlimited authenticity checks</li>
              <li style={s.featureItem}><span style={s.check}>{'\u2713'}</span> Collection portfolio tracker</li>
              <li style={s.featureItem}><span style={s.check}>{'\u2713'}</span> New brands added monthly</li>
            </ul>
            <button className="btn-luxe glass-btn-primary" style={s.subscribeBtn} onClick={handleSubscribe}>
              Subscribe
            </button>
          </div>
        </div>
      </div>

      {/* Guarantee */}
      <p style={s.guarantee}>
        {'\u26E8'} 7-day money-back guarantee on all plans
      </p>

      {/* FAQ */}
      <div style={s.faqSection}>
        <h2 style={s.faqHeading}>Frequently Asked Questions</h2>
        {faqs.map((faq, i) => (
          <div key={i} style={s.faqItem}>
            <button
              style={s.faqQuestion}
              onClick={() => setOpenFaq(openFaq === i ? null : i)}
            >
              <span>{faq.q}</span>
              <span style={s.faqToggle}>{openFaq === i ? '\u2212' : '+'}</span>
            </button>
            {openFaq === i && (
              <p style={s.faqAnswer}>{faq.a}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s = {
  page: {
    minHeight: '100vh',
    padding: '24px 16px 60px',
    maxWidth: '700px',
    margin: '0 auto',
  },

  backBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: 'var(--color-gold)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    marginBottom: '40px',
    display: 'inline-block',
    letterSpacing: '0.03em',
  },

  headerSection: {
    textAlign: 'center',
    marginBottom: '48px',
  },

  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    display: 'block',
    marginBottom: '16px',
  },

  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.75rem, 5vw, 2.5rem)',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '12px',
    lineHeight: 1.15,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textShadow: '0 0 40px rgba(184, 148, 95, 0.05)',
  },

  subtext: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.7,
  },

  // Card grid
  cardGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
    gap: '20px',
    alignItems: 'start',
    marginBottom: '24px',
  },

  card: {
    position: 'relative',
    overflow: 'hidden',
    borderRadius: '12px',
  },

  featuredCard: {
    border: '2px solid rgba(184, 148, 95, 0.3)',
    transform: 'scale(1.02)',
    boxShadow: '0 8px 32px rgba(0, 0, 0, 0.4), 0 0 24px rgba(184, 148, 95, 0.08)',
    borderRadius: '12px',
  },

  popularBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-bg)',
    backgroundColor: 'var(--color-gold)',
    textAlign: 'center',
    padding: '6px 0',
  },

  cardInner: {
    padding: '32px 28px 28px',
    lineHeight: 1.7,
  },

  tierLabel: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    display: 'block',
    marginBottom: '12px',
  },

  priceRow: {
    display: 'flex',
    alignItems: 'baseline',
    gap: '6px',
    marginBottom: '8px',
  },

  price: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2.5rem',
    fontWeight: 700,
    color: 'var(--color-cream)',
    lineHeight: 1,
  },

  priceSuffix: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--color-cream-muted)',
  },

  goodFor: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-gold)',
    fontStyle: 'italic',
    marginBottom: '24px',
    opacity: 0.8,
    lineHeight: 1.7,
  },

  featureList: {
    listStyle: 'none',
    padding: 0,
    margin: '0 0 28px 0',
  },

  featureItem: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    padding: '6px 0',
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    lineHeight: 1.7,
  },

  check: {
    color: 'var(--color-gold)',
    fontSize: '0.85rem',
    flexShrink: 0,
  },

  buyBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    padding: '14px 0',
    width: '100%',
    cursor: 'pointer',
  },

  subscribeBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-cream)',
    padding: '14px 0',
    width: '100%',
    cursor: 'pointer',
  },

  // Guarantee
  guarantee: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    textAlign: 'center',
    marginBottom: '60px',
    opacity: 0.7,
    lineHeight: 1.7,
  },

  // FAQ
  faqSection: {
    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
    paddingTop: '40px',
  },

  faqHeading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '24px',
    textAlign: 'center',
  },

  faqItem: {
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
  },

  faqQuestion: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    background: 'none',
    border: 'none',
    width: '100%',
    textAlign: 'left',
    padding: '18px 0',
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    gap: '16px',
  },

  faqToggle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1.25rem',
    color: 'var(--color-gold)',
    flexShrink: 0,
    width: '20px',
    textAlign: 'center',
  },

  faqAnswer: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream-muted)',
    paddingBottom: '18px',
    paddingRight: '36px',
  },
};

export default Pricing;
