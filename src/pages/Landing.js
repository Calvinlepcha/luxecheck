import React from 'react';
import { useNavigate } from 'react-router-dom';
import { LogoFull } from '../components/Logo';
import BackgroundImage from '../components/BackgroundImage';

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
    padding: '80px 24px 60px',
  },

  eyebrow: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '24px',
  },

  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(2.5rem, 8vw, 4.5rem)',
    fontWeight: 600,
    lineHeight: 1.1,
    color: 'var(--color-cream)',
    marginBottom: '24px',
    maxWidth: '700px',
  },

  subtext: {
    fontFamily: 'var(--font-body)',
    fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
    fontWeight: 400,
    lineHeight: 1.6,
    color: 'var(--color-cream-muted)',
    maxWidth: '500px',
    marginBottom: '48px',
  },

  cta: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-bg)',
    backgroundColor: 'var(--color-gold)',
    border: 'none',
    borderRadius: '0',
    padding: '18px 48px',
    cursor: 'pointer',
    transition: 'all 0.3s ease',
  },

  valueSection: {
    padding: '60px 24px 80px',
    borderTop: '1px solid var(--color-border)',
  },

  valueGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
    gap: '40px',
    maxWidth: '900px',
    margin: '0 auto',
  },

  valueCard: {
    textAlign: 'center',
    padding: '0 16px',
  },

  valueIcon: {
    fontSize: '2rem',
    marginBottom: '16px',
    display: 'block',
  },

  valueTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '8px',
  },

  valueDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    lineHeight: 1.6,
    color: 'var(--color-cream-muted)',
  },

  footer: {
    borderTop: '1px solid var(--color-border)',
    padding: '32px 24px',
    textAlign: 'center',
  },

  disclaimer: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    lineHeight: 1.7,
    color: 'var(--color-cream-muted)',
    maxWidth: '600px',
    margin: '0 auto',
  },
};

const valueProps = [
  {
    icon: '\u2714',
    title: '12-Point Expert Checklist',
    desc: 'Comprehensive verification steps developed with professional authenticators.',
  },
  {
    icon: '\u25CE',
    title: 'Real vs Fake Reference Photos',
    desc: 'Side-by-side comparisons so you know exactly what to look for.',
  },
  {
    icon: '\u26A1',
    title: 'Works Offline',
    desc: 'Access your checklists anywhere — no signal required.',
  },
];

function Landing() {
  const navigate = useNavigate();

  return (
    <div style={styles.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=1920" opacity={0.1} />
      <section style={styles.hero}>
        <LogoFull style={{ marginBottom: '16px' }} />
        <h1 style={styles.heading}>Know What You're Buying</h1>
        <p style={styles.subtext}>
          The expert-backed authentication checklist for pre-owned luxury bags
        </p>
        <button
          style={styles.cta}
          onClick={() => navigate('/scan')}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-gold-hover)';
            e.currentTarget.style.transform = 'translateY(-2px)';
            e.currentTarget.style.boxShadow = '0 8px 30px rgba(201, 168, 76, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'var(--color-gold)';
            e.currentTarget.style.transform = 'translateY(0)';
            e.currentTarget.style.boxShadow = 'none';
          }}
        >
          Start Free Check
        </button>
      </section>

      <section style={styles.valueSection}>
        <div style={styles.valueGrid}>
          {valueProps.map((prop) => (
            <div key={prop.title} style={styles.valueCard}>
              <span style={styles.valueIcon}>{prop.icon}</span>
              <h3 style={styles.valueTitle}>{prop.title}</h3>
              <p style={styles.valueDesc}>{prop.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <footer style={styles.footer}>
        <p style={styles.disclaimer}>
          LuxeCheck is an educational reference tool. It does not guarantee
          authenticity. Always consult a professional authenticator for
          high-value purchases.
        </p>
      </footer>
    </div>
  );
}

export default Landing;
