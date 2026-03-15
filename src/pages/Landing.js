import React, { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoFull } from '../components/Logo';
import BackgroundImage from '../components/BackgroundImage';
import useScrollReveal from '../hooks/useScrollReveal';

const styles = {
  page: {
    minHeight: '100vh',
    display: 'flex',
    flexDirection: 'column',
  },

  hero: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    textAlign: 'center',
    padding: '100px 24px 80px',
    position: 'relative',
    margin: '24px 20px',
  },

  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 300,
    letterSpacing: '0.25em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '28px',
  },

  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2rem, 5vw, 3.5rem)',
    fontWeight: 300,
    lineHeight: 1.15,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-cream)',
    marginBottom: '20px',
    maxWidth: '700px',
    textShadow: '0 0 40px rgba(184, 148, 95, 0.05)',
  },

  aiBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#D4B978',
    marginBottom: '28px',
    display: 'inline-block',
  },

  accentLine: {
    width: '40px',
    height: '1px',
    background: 'var(--color-gold)',
    margin: '0 auto 28px',
    opacity: 0.5,
  },

  subtext: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(0.9rem, 2.5vw, 1.1rem)',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream-muted)',
    maxWidth: '460px',
    marginBottom: '56px',
    letterSpacing: '0.02em',
  },

  cta: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    padding: '18px 52px',
    cursor: 'pointer',
  },

  valueSection: {
    padding: '80px 24px 100px',
  },

  valueGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '48px',
    maxWidth: '900px',
    margin: '0 auto',
  },

  valueCard: {
    textAlign: 'center',
    padding: '36px 24px',
  },

  valueIcon: {
    fontSize: '1.5rem',
    color: 'var(--color-gold)',
    marginBottom: '20px',
    display: 'block',
    opacity: 0.6,
  },

  valueTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 500,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-cream)',
    marginBottom: '12px',
    textShadow: '0 0 40px rgba(184, 148, 95, 0.05)',
  },

  valueDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream-muted)',
  },

  aiSection: {
    padding: '60px 24px 40px',
    maxWidth: '600px',
    margin: '0 auto',
    textAlign: 'center',
  },
  aiHeading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 500,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-cream)',
    marginBottom: '28px',
  },
  aiList: {
    display: 'flex',
    flexDirection: 'column',
    gap: '16px',
  },
  aiItem: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream-muted)',
    padding: '0 16px',
    margin: 0,
  },

  footer: {
    padding: '40px 24px',
    textAlign: 'center',
  },

  disclaimer: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream-faint)',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

const valueProps = [
  {
    icon: '\u2714',
    title: 'AI-Guided Inspection',
    desc: 'Our AI walks you through expert-level authentication checkpoints used by professional authenticators.',
  },
  {
    icon: '\u25CE',
    title: 'Reference Photos',
    desc: 'Side-by-side comparisons so you know exactly what to look for.',
  },
  {
    icon: '\u26A1',
    title: 'Works Offline',
    desc: 'Access your checklists anywhere \u2014 no signal required.',
  },
];

function Landing() {
  const navigate = useNavigate();
  const spotlightRef = useRef(null);

  useScrollReveal();

  useEffect(() => {
    if (window.matchMedia('(hover: none)').matches) return;
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const el = spotlightRef.current;
    if (!el) return;

    const handleMove = (e) => {
      el.style.background =
        `radial-gradient(600px circle at ${e.clientX}px ${e.clientY}px, rgba(184, 148, 95, 0.025), transparent 60%)`;
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  return (
    <div style={styles.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920&q=80" opacity={0.20} />
      <div ref={spotlightRef} className="cursor-spotlight" />

      <section className="glass-card" style={styles.hero}>
        <div className="reveal" style={{ transitionDelay: '0ms', position: 'relative', zIndex: 2 }}>
          <LogoFull size={90} animated style={{ marginBottom: '20px' }} />
        </div>
        <h1 className="reveal" style={{ ...styles.heading, transitionDelay: '100ms', position: 'relative', zIndex: 2 }}>
          Know What You're Buying
        </h1>
        <div className="reveal" style={{ transitionDelay: '200ms', position: 'relative', zIndex: 2 }}>
          <div style={styles.accentLine} />
        </div>
        <div className="reveal" style={{ transitionDelay: '250ms', position: 'relative', zIndex: 2 }}>
          <span style={styles.aiBadge}>Powered by AI Analysis</span>
        </div>
        <p className="reveal" style={{ ...styles.subtext, transitionDelay: '350ms', position: 'relative', zIndex: 2 }}>
          The AI-powered authentication checklist for pre-owned luxury goods
        </p>
        <div className="reveal" style={{ transitionDelay: '400ms', position: 'relative', zIndex: 2 }}>
          <button
            className="btn-luxe btn-shimmer glass-btn-primary"
            style={styles.cta}
            onClick={() => navigate('/scan')}
          >
            Start Free Check
          </button>
        </div>
      </section>

      <div className="luxe-divider" style={{ maxWidth: '900px', margin: '0 auto' }} />

      <section style={styles.valueSection}>
        <div style={styles.valueGrid}>
          {valueProps.map((prop, i) => {
            const dir = i % 2 === 0 ? 'reveal-left' : 'reveal-right';
            return (
              <div
                key={prop.title}
                className={`${dir} glass-card`}
                style={{ ...styles.valueCard, transitionDelay: `${i * 150}ms` }}
              >
                <span style={styles.valueIcon}>{prop.icon}</span>
                <h3 style={styles.valueTitle}>{prop.title}</h3>
                <p style={styles.valueDesc}>{prop.desc}</p>
              </div>
            );
          })}
        </div>
      </section>

      {/* How Our AI Works */}
      <div className="luxe-divider" style={{ maxWidth: '900px', margin: '0 auto' }} />
      <section style={styles.aiSection}>
        <h2 className="reveal" style={styles.aiHeading}>How Our AI Works</h2>
        <div className="reveal" style={{ transitionDelay: '100ms' }}>
          <div style={styles.aiList}>
            <p style={styles.aiItem}>LuxeCheck AI is built on extensive research into luxury authentication techniques used by professionals worldwide.</p>
            <p style={styles.aiItem}>Our system covers 30+ luxury brands across bags, watches, shoes, perfumes, and jewelry.</p>
            <p style={styles.aiItem}>We analyze authentication through a weighted checkpoint system — the same markers that professional authenticators check, ranked by how important each one is for spotting counterfeits.</p>
            <p style={styles.aiItem}>Our AI knowledge base is continuously updated as counterfeit techniques evolve.</p>
          </div>
        </div>
      </section>

      <footer style={styles.footer}>
        <p className="reveal" style={styles.disclaimer}>
          LuxeCheck uses AI-powered analysis to guide your luxury authentication. Our AI provides expert-level authentication checkpoints and scoring based on known markers for genuine and counterfeit products. This is an educational tool and does not replace professional hands-on authentication. For high-value purchases, we recommend combining your LuxeCheck AI report with professional verification.
        </p>
      </footer>
    </div>
  );
}

export default Landing;
