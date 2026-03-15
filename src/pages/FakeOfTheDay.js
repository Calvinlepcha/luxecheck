import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { getTodayEntry, getRecentEntries, recordVisit } from '../data/fakeOfTheDay';
import { createFOTDChallenge, encodeChallenge } from '../utils/challengeCodec';
import BackgroundImage from '../components/BackgroundImage';

const SEVERITY_COLORS = {
  critical: { bg: 'rgba(239, 68, 68, 0.12)', border: 'rgba(239, 68, 68, 0.25)', text: '#F87171', label: 'Critical' },
  moderate: { bg: 'rgba(251, 191, 36, 0.12)', border: 'rgba(251, 191, 36, 0.25)', text: '#FBBF24', label: 'Moderate' },
  minor: { bg: 'rgba(156, 163, 175, 0.12)', border: 'rgba(156, 163, 175, 0.25)', text: '#9CA3AF', label: 'Minor' },
};

const DIFFICULTY_COLORS = {
  easy: { bg: 'rgba(91, 140, 106, 0.15)', text: '#5B8C6A' },
  medium: { bg: 'rgba(251, 191, 36, 0.15)', text: '#FBBF24' },
  hard: { bg: 'rgba(239, 68, 68, 0.15)', text: '#F87171' },
};

const CATEGORY_ICONS = {
  bags: '\uD83D\uDC5C',
  watches: '\u231A',
  shoes: '\uD83D\uDC5F',
  perfume: '\uD83C\uDF38',
  jewelry: '\uD83D\uDC8E',
};

function formatDate(daysAgo) {
  const d = new Date();
  d.setDate(d.getDate() - daysAgo);
  return d.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
}

function todayFormatted() {
  return new Date().toLocaleDateString('en-US', {
    weekday: 'long',
    month: 'long',
    day: 'numeric',
  });
}

// ─── Clue Card ─────────────────────────────────────────────────
function ClueCard({ clue, index, visible }) {
  const sev = SEVERITY_COLORS[clue.severity] || SEVERITY_COLORS.moderate;

  return (
    <div
      className="glass-card"
      style={{
        ...st.clueCard,
        borderLeft: `3px solid ${sev.border}`,
        opacity: visible ? 1 : 0,
        transform: visible ? 'translateX(0)' : 'translateX(40px)',
        transition: `opacity 0.4s ease ${index * 300}ms, transform 0.4s ease ${index * 300}ms`,
      }}
    >
      <div style={st.clueHeader}>
        <span style={{ ...st.clueSeverity, color: sev.text, background: sev.bg }}>
          {sev.label}
        </span>
        <span style={st.clueMarker}>{clue.marker}</span>
      </div>
      <p style={st.clueDesc}>{clue.description}</p>
    </div>
  );
}

// ─── Feedback buttons ──────────────────────────────────────────
function FeedbackSection({ entry }) {
  const [response, setResponse] = useState(null);
  const navigate = useNavigate();

  const feedbackMap = {
    yes: 'Sharp eye! You caught all the tells. You\'re getting really good at this!',
    some: 'Keep practicing! Spotting fakes gets easier the more you study the details.',
    none: 'Don\'t worry — even experienced resellers miss these sometimes. That\'s why we\'re all learning together!',
  };

  const handleChallenge = useCallback(() => {
    const challenge = createFOTDChallenge(entry);
    const encoded = encodeChallenge(challenge);
    navigate(`/challenge?data=${encoded}`);
  }, [entry, navigate]);

  if (response) {
    return (
      <div style={st.feedbackResult}>
        <p style={st.feedbackText}>{feedbackMap[response]}</p>
        <button className="btn-luxe glass-btn-primary" style={st.challengeBtn} onClick={handleChallenge}>
          {'\u2694'} Challenge a Friend
        </button>
      </div>
    );
  }

  return (
    <div style={st.feedbackWrap}>
      <p style={st.feedbackPrompt}>Did you catch all of them?</p>
      <div style={st.feedbackBtns}>
        <button className="btn-luxe glass-btn-pass" style={st.feedbackBtn} onClick={() => setResponse('yes')}>
          Yes {'\u2713'}
        </button>
        <button className="btn-luxe glass-btn-unsure" style={st.feedbackBtn} onClick={() => setResponse('some')}>
          Some
        </button>
        <button className="btn-luxe glass-btn-fail" style={st.feedbackBtn} onClick={() => setResponse('none')}>
          None {'\u2717'}
        </button>
      </div>
    </div>
  );
}

// ─── Previous Day Card ─────────────────────────────────────────
function PreviousDayCard({ entry, daysAgo }) {
  const [expanded, setExpanded] = useState(false);
  const diff = DIFFICULTY_COLORS[entry.difficulty] || DIFFICULTY_COLORS.medium;
  const icon = CATEGORY_ICONS[entry.category] || '';

  return (
    <div
      className="glass-card"
      style={st.prevCard}
      onClick={() => setExpanded(!expanded)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => { if (e.key === 'Enter') setExpanded(!expanded); }}
    >
      <div style={st.prevCardHeader}>
        <div style={st.prevCardLeft}>
          <span style={st.prevIcon}>{icon}</span>
          <div>
            <div style={st.prevBrand}>{entry.brand} {entry.model}</div>
            <div style={st.prevDate}>{formatDate(daysAgo)}</div>
          </div>
        </div>
        <span style={{ ...st.prevDiff, color: diff.text, background: diff.bg }}>
          {entry.difficulty}
        </span>
      </div>
      <div style={st.prevTitle}>{entry.title}</div>

      {expanded && (
        <div style={st.prevExpanded}>
          <p style={st.prevStory}>{entry.story}</p>
          {entry.clues.map((clue, i) => {
            const sev = SEVERITY_COLORS[clue.severity] || SEVERITY_COLORS.moderate;
            return (
              <div key={i} style={{ ...st.prevClue, borderLeftColor: sev.border }}>
                <span style={{ ...st.prevClueLabel, color: sev.text }}>{clue.marker}</span>
                <span style={st.prevClueDesc}>{clue.description}</span>
              </div>
            );
          })}
        </div>
      )}

      <div style={st.prevExpandHint}>
        {expanded ? '\u25B2 Collapse' : '\u25BC Tap to expand'}
      </div>
    </div>
  );
}

// ─── Main Page ─────────────────────────────────────────────────
export default function FakeOfTheDay() {
  const [revealed, setRevealed] = useState(false);
  const [streak, setStreak] = useState(0);
  const entry = getTodayEntry();
  const recentEntries = getRecentEntries(7);
  const diff = DIFFICULTY_COLORS[entry.difficulty] || DIFFICULTY_COLORS.medium;
  const icon = CATEGORY_ICONS[entry.category] || '';

  useEffect(() => {
    const s = recordVisit();
    setStreak(s);
  }, []);

  const handleReveal = useCallback(() => {
    setRevealed(true);
  }, []);

  return (
    <div style={st.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1657495183151-0a0d86fb130c?w=1920&q=80" opacity={0.20} />

      {/* Header */}
      <div style={st.headerRow}>
        <div>
          <h1 style={st.heading}>Fake of the Day</h1>
          <p style={st.dateLabel}>{todayFormatted()}</p>
        </div>
        {streak > 0 && (
          <div style={st.streakBadge}>
            <span style={st.streakFire}>{'\uD83D\uDD25'}</span>
            <span style={st.streakNum}>{streak}</span>
            <span style={st.streakLabel}>day{streak !== 1 ? 's' : ''}</span>
          </div>
        )}
      </div>

      {/* Today's Entry — Main Card */}
      <div className="glass-card" style={st.mainCard}>
        {/* Category & difficulty */}
        <div style={st.mainCardTop}>
          <span style={st.categoryBadge}>
            {icon} {entry.category}
          </span>
          <span style={{ ...st.diffBadge, color: diff.text, background: diff.bg }}>
            {entry.difficulty}
          </span>
        </div>

        {/* Brand / model */}
        <div style={st.brandLine}>
          {entry.brand} — {entry.model}
        </div>

        {/* Title */}
        <h2 style={st.mainTitle}>{entry.title}</h2>

        {/* Story */}
        <p style={st.story}>{entry.story}</p>

        {/* Image placeholder */}
        <div style={st.imagePlaceholder}>
          <div style={st.imagePlaceholderInner}>
            <span style={st.imagePlaceholderIcon}>{icon}</span>
            <span style={st.imagePlaceholderText}>{entry.revealImage}</span>
          </div>
        </div>

        {/* Reveal section */}
        {!revealed ? (
          <div style={st.revealSection}>
            <p style={st.revealPrompt}>Can you spot the flaws?</p>
            <button className="btn-luxe glass-btn-primary" style={st.revealBtn} onClick={handleReveal}>
              Reveal Clues
            </button>
          </div>
        ) : (
          <div style={st.cluesSection}>
            <p style={st.cluesHeading}>
              {entry.clues.length} authentication markers found:
            </p>
            {entry.clues.map((clue, i) => (
              <ClueCard key={i} clue={clue} index={i} visible={revealed} />
            ))}
            <FeedbackSection entry={entry} />
          </div>
        )}
      </div>

      {/* Previous Days */}
      <div style={st.prevSection}>
        <h3 style={st.prevHeading}>Previous Days</h3>
        {recentEntries.map(({ entry: e, daysAgo }) => (
          <PreviousDayCard key={e.id + '-' + daysAgo} entry={e} daysAgo={daysAgo} />
        ))}
      </div>
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const st = {
  page: {
    minHeight: '100vh',
    padding: '60px 24px 40px',
    maxWidth: '600px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },

  headerRow: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: '28px',
  },

  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '4px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },

  dateLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--color-cream-muted)',
    letterSpacing: '0.03em',
  },

  streakBadge: {
    display: 'flex',
    alignItems: 'center',
    gap: '4px',
    background: 'rgba(251, 191, 36, 0.12)',
    border: '1px solid rgba(251, 191, 36, 0.25)',
    borderRadius: '20px',
    padding: '6px 14px',
    flexShrink: 0,
  },

  streakFire: {
    fontSize: '1rem',
  },

  streakNum: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: 700,
    color: '#FBBF24',
  },

  streakLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    color: 'var(--color-cream-muted)',
  },

  // ─── Main Card ──────────────────────────────────
  mainCard: {
    padding: '28px 24px',
    marginBottom: '36px',
  },

  mainCardTop: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },

  categoryBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-cream-muted)',
  },

  diffBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '4px 12px',
    borderRadius: '12px',
  },

  brandLine: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '8px',
  },

  mainTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.4rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    lineHeight: 1.35,
    marginBottom: '16px',
  },

  story: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.7,
    marginBottom: '20px',
  },

  imagePlaceholder: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(184, 148, 95, 0.1)',
    borderRadius: '12px',
    padding: '24px 20px',
    marginBottom: '24px',
    textAlign: 'center',
  },

  imagePlaceholderInner: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    gap: '8px',
  },

  imagePlaceholderIcon: {
    fontSize: '2rem',
    opacity: 0.4,
  },

  imagePlaceholderText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--color-cream-muted)',
    opacity: 0.5,
    fontStyle: 'italic',
    lineHeight: 1.5,
  },

  // ─── Reveal ─────────────────────────────────────
  revealSection: {
    textAlign: 'center',
    padding: '8px 0',
  },

  revealPrompt: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '16px',
  },

  revealBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    padding: '14px 40px',
    borderRadius: 'var(--glass-radius, 12px)',
    cursor: 'pointer',
    letterSpacing: '0.04em',
  },

  // ─── Clues ──────────────────────────────────────
  cluesSection: {
    padding: '4px 0',
  },

  cluesHeading: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 500,
    color: 'var(--color-gold)',
    letterSpacing: '0.05em',
    marginBottom: '16px',
  },

  clueCard: {
    padding: '16px 18px',
    marginBottom: '12px',
    borderRadius: '12px',
  },

  clueHeader: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '8px',
  },

  clueSeverity: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: '6px',
    flexShrink: 0,
  },

  clueMarker: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
  },

  clueDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.6,
    margin: 0,
  },

  // ─── Feedback ───────────────────────────────────
  feedbackWrap: {
    textAlign: 'center',
    padding: '20px 0 8px',
  },

  feedbackPrompt: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '14px',
  },

  feedbackBtns: {
    display: 'flex',
    gap: '10px',
    justifyContent: 'center',
  },

  feedbackBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 600,
    padding: '10px 20px',
    borderRadius: 'var(--glass-radius, 12px)',
    cursor: 'pointer',
    letterSpacing: '0.02em',
    color: 'var(--color-cream)',
  },

  feedbackResult: {
    textAlign: 'center',
    padding: '20px 0 8px',
  },

  feedbackText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 300,
    color: 'var(--color-gold)',
    lineHeight: 1.6,
    fontStyle: 'italic',
  },

  challengeBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.82rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    padding: '12px 28px',
    borderRadius: 'var(--glass-radius, 12px)',
    cursor: 'pointer',
    marginTop: '16px',
    letterSpacing: '0.03em',
  },

  // ─── Previous Days ──────────────────────────────
  prevSection: {
    marginTop: '8px',
  },

  prevHeading: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 300,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '16px',
    opacity: 0.7,
  },

  prevCard: {
    padding: '16px 18px',
    marginBottom: '12px',
    cursor: 'pointer',
  },

  prevCardHeader: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '8px',
  },

  prevCardLeft: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
  },

  prevIcon: {
    fontSize: '1.2rem',
  },

  prevBrand: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
  },

  prevDate: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    color: 'var(--color-cream-muted)',
  },

  prevDiff: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    padding: '3px 10px',
    borderRadius: '12px',
    flexShrink: 0,
  },

  prevTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.5,
  },

  prevExpanded: {
    marginTop: '14px',
    paddingTop: '14px',
    borderTop: '1px solid rgba(255, 255, 255, 0.04)',
  },

  prevStory: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.6,
    marginBottom: '12px',
  },

  prevClue: {
    padding: '8px 12px',
    marginBottom: '8px',
    borderLeft: '2px solid',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '0 6px 6px 0',
  },

  prevClueLabel: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.75rem',
    fontWeight: 600,
    display: 'block',
    marginBottom: '2px',
  },

  prevClueDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.72rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.5,
  },

  prevExpandHint: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    color: 'var(--color-cream-muted)',
    opacity: 0.4,
    textAlign: 'center',
    marginTop: '8px',
  },
};
