import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { decodeChallenge, encodeChallenge } from '../utils/challengeCodec';
import BackgroundImage from '../components/BackgroundImage';

// ─── Confetti / sparkle burst on perfect score ─────────────────
function SparkleOverlay() {
  const particles = useMemo(() => {
    const p = [];
    for (let i = 0; i < 40; i++) {
      p.push({
        id: i,
        left: Math.random() * 100,
        delay: Math.random() * 600,
        duration: 800 + Math.random() * 1200,
        size: 4 + Math.random() * 6,
        angle: Math.random() * 360,
        distance: 60 + Math.random() * 200,
        color: ['#B8945F', '#FFD700', '#FFF8DC', '#DAA520', '#F5DEB3'][Math.floor(Math.random() * 5)],
      });
    }
    return p;
  }, []);

  return (
    <div style={cs.sparkleOverlay}>
      {particles.map((p) => (
        <div
          key={p.id}
          style={{
            position: 'absolute',
            left: `${p.left}%`,
            top: '50%',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: p.color,
            animation: `sparkleFloat ${p.duration}ms ease-out ${p.delay}ms forwards`,
            opacity: 0,
            '--angle': `${p.angle}deg`,
            '--distance': `${p.distance}px`,
          }}
        />
      ))}
      <style>{`
        @keyframes sparkleFloat {
          0% { opacity: 1; transform: translate(0, 0) scale(1); }
          100% {
            opacity: 0;
            transform: translate(
              calc(cos(var(--angle)) * var(--distance)),
              calc(sin(var(--angle)) * var(--distance) - 100px)
            ) scale(0);
          }
        }
      `}</style>
    </div>
  );
}

// ─── Marker card (during quiz) ─────────────────────────────────
function MarkerOption({ marker, selected, onToggle, disabled }) {
  return (
    <button
      className={`glass-card ${selected ? '' : ''}`}
      style={{
        ...cs.markerCard,
        borderColor: selected ? 'var(--color-gold)' : 'transparent',
        background: selected ? 'rgba(184, 148, 95, 0.08)' : undefined,
      }}
      onClick={() => !disabled && onToggle(marker.name)}
      disabled={disabled}
    >
      <div style={cs.markerCheck}>
        {selected ? (
          <span style={cs.markerCheckActive}>{'\u2713'}</span>
        ) : (
          <span style={cs.markerCheckEmpty} />
        )}
      </div>
      <span style={cs.markerName}>{marker.name}</span>
    </button>
  );
}

// ─── Result marker (after submit) ──────────────────────────────
function MarkerResult({ marker, wasSelected, index }) {
  const isCorrect = marker.isFlaw ? wasSelected : !wasSelected;
  const color = isCorrect ? '#5B8C6A' : '#A65D5D';
  const icon = isCorrect ? '\u2713' : '\u2717';

  return (
    <div
      className="glass-card"
      style={{
        ...cs.resultCard,
        borderLeft: `3px solid ${color}`,
        opacity: 0,
        animation: `slideReveal 0.4s ease ${index * 200}ms forwards`,
      }}
    >
      <div style={cs.resultTop}>
        <span style={{ ...cs.resultIcon, color }}>{icon}</span>
        <span style={cs.resultName}>{marker.name}</span>
        <span style={{ ...cs.resultTag, color, background: color + '20' }}>
          {marker.isFlaw ? 'FLAW' : 'AUTHENTIC'}
        </span>
      </div>
      <p style={cs.resultExplanation}>{marker.explanation}</p>
      {marker.isFlaw && !wasSelected && (
        <p style={cs.resultMissed}>You missed this one!</p>
      )}
      {!marker.isFlaw && wasSelected && (
        <p style={cs.resultMissed}>This was actually fine!</p>
      )}
    </div>
  );
}

// ─── Share screen ──────────────────────────────────────────────
function ShareScreen({ challenge, onClose }) {
  const [copied, setCopied] = useState(false);
  const encoded = encodeChallenge(challenge);
  const url = `${window.location.origin}/challenge?data=${encoded}`;

  const handleCopy = useCallback(async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    } catch {
      // Fallback
      const ta = document.createElement('textarea');
      ta.value = url;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  }, [url]);

  const handleWebShare = useCallback(async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: 'LuxeCheck Challenge',
          text: `Can you spot why this ${challenge.brand} ${challenge.model} is fake? Take the LuxeCheck challenge!`,
          url,
        });
      } catch { /* cancelled */ }
    }
  }, [url, challenge.brand, challenge.model]);

  return (
    <div style={cs.shareOverlay} onClick={onClose}>
      <div style={cs.sharePanel} onClick={(e) => e.stopPropagation()}>
        <button style={cs.shareClose} onClick={onClose}>{'\u00d7'}</button>
        <div className="glass-card" style={cs.sharePreview}>
          <div style={cs.sharePreviewLabel}>LUXECHECK CHALLENGE</div>
          <div style={cs.sharePreviewBrand}>{challenge.brand}</div>
          <div style={cs.sharePreviewTitle}>
            Can you spot why this {challenge.model} is fake?
          </div>
          <div style={cs.sharePreviewCount}>
            {challenge.markers.filter((m) => m.isFlaw).length} hidden flaws to find
          </div>
        </div>
        <div style={cs.shareBtns}>
          <button className="btn-luxe glass-btn-primary" style={cs.shareBtn} onClick={handleCopy}>
            {copied ? '\u2713 Copied!' : '\u2398 Copy Link'}
          </button>
          {typeof navigator !== 'undefined' && navigator.share && (
            <button className="btn-luxe glass-btn-secondary" style={cs.shareBtn} onClick={handleWebShare}>
              {'\u2B06'} Share
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

// ─── Main Challenge Page ───────────────────────────────────────
export default function Challenge() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const [selected, setSelected] = useState(new Set());
  const [submitted, setSubmitted] = useState(false);
  const [showShare, setShowShare] = useState(false);

  const challenge = useMemo(() => {
    const data = searchParams.get('data');
    if (!data) return null;
    return decodeChallenge(data);
  }, [searchParams]);

  const [resultRevealed, setResultRevealed] = useState(false);
  useEffect(() => {
    if (submitted) {
      const timer = setTimeout(() => setResultRevealed(true), 300);
      return () => clearTimeout(timer);
    }
  }, [submitted]);

  if (!challenge) {
    return (
      <div style={cs.page}>
        <BackgroundImage url="https://images.unsplash.com/photo-1657495183151-0a0d86fb130c?w=1920&q=80" opacity={0.20} />
        <div style={cs.errorCard}>
          <h2 style={cs.errorTitle}>Challenge not found</h2>
          <p style={cs.errorText}>This challenge link may be expired or invalid.</p>
          <button className="btn-luxe glass-btn-primary" style={cs.ctaBtn} onClick={() => navigate('/')}>
            Explore LuxeCheck
          </button>
        </div>
      </div>
    );
  }

  const toggleMarker = (name) => {
    setSelected((prev) => {
      const next = new Set(prev);
      if (next.has(name)) next.delete(name);
      else next.add(name);
      return next;
    });
  };

  const flawCount = challenge.markers.filter((m) => m.isFlaw).length;
  const correctFlaws = challenge.markers.filter((m) => m.isFlaw && selected.has(m.name)).length;
  const falsePositives = challenge.markers.filter((m) => !m.isFlaw && selected.has(m.name)).length;
  const isPerfect = correctFlaws === flawCount && falsePositives === 0;

  const handleSubmit = () => {
    setSubmitted(true);
  };

  // Build a new challenge for "Create Your Own"
  const handleCreateOwn = () => {
    navigate('/daily');
  };

  return (
    <div style={cs.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1657495183151-0a0d86fb130c?w=1920&q=80" opacity={0.20} />

      {submitted && isPerfect && <SparkleOverlay />}

      {showShare && (
        <ShareScreen challenge={challenge} onClose={() => setShowShare(false)} />
      )}

      {!submitted ? (
        /* ─── Quiz Mode ─── */
        <>
          <div style={cs.challengeHeader}>
            <span style={cs.challengeLabel}>LUXECHECK CHALLENGE</span>
            <h1 style={cs.heading}>Your friend challenged you!</h1>
          </div>

          <div className="glass-card" style={cs.quizCard}>
            <div style={cs.quizBrand}>
              {challenge.brand} — {challenge.model}
            </div>
            <h2 style={cs.quizTitle}>{challenge.title}</h2>
            <p style={cs.quizPrompt}>
              This item has <strong style={{ color: 'var(--color-gold)' }}>{flawCount} hidden flaws</strong>.
              Select the markers you think are fake:
            </p>
          </div>

          <div style={cs.markersGrid}>
            {challenge.markers.map((marker) => (
              <MarkerOption
                key={marker.name}
                marker={marker}
                selected={selected.has(marker.name)}
                onToggle={toggleMarker}
                disabled={false}
              />
            ))}
          </div>

          <div style={cs.submitWrap}>
            <p style={cs.selectedCount}>
              {selected.size} marker{selected.size !== 1 ? 's' : ''} selected
            </p>
            <button
              className="btn-luxe glass-btn-primary"
              style={{ ...cs.submitBtn, opacity: selected.size > 0 ? 1 : 0.5 }}
              onClick={handleSubmit}
              disabled={selected.size === 0}
            >
              Submit Answer
            </button>
          </div>
        </>
      ) : (
        /* ─── Results Mode ─── */
        <>
          <div style={cs.resultsHeader}>
            <span style={cs.challengeLabel}>CHALLENGE RESULTS</span>
            <h1 style={cs.heading}>
              {isPerfect ? 'Perfect Score!' : correctFlaws === 0 ? 'Better luck next time!' : 'Nice work!'}
            </h1>
          </div>

          <div className="glass-card" style={cs.scoreCard}>
            <div style={cs.scoreBig}>
              <span style={cs.scoreNum}>{correctFlaws}</span>
              <span style={cs.scoreSlash}>/</span>
              <span style={cs.scoreTotal}>{flawCount}</span>
            </div>
            <p style={cs.scoreLabel}>flaws spotted correctly</p>
            {falsePositives > 0 && (
              <p style={cs.falsePositiveNote}>
                {falsePositives} false alarm{falsePositives !== 1 ? 's' : ''} (selected authentic markers as flaws)
              </p>
            )}
            {challenge.creatorScore != null && (
              <div style={cs.creatorScore}>
                Your friend scored {challenge.creatorScore}% on their check
              </div>
            )}
          </div>

          <p style={cs.markersLabel}>Full breakdown:</p>

          {resultRevealed && challenge.markers.map((marker, i) => (
            <MarkerResult
              key={marker.name}
              marker={marker}
              wasSelected={selected.has(marker.name)}
              index={i}
            />
          ))}

          <style>{`
            @keyframes slideReveal {
              from { opacity: 0; transform: translateX(30px); }
              to { opacity: 1; transform: translateX(0); }
            }
          `}</style>

          {/* CTAs */}
          <div style={cs.ctaSection}>
            <div className="glass-card" style={cs.ctaCard}>
              <h3 style={cs.ctaTitle}>Want to check your own luxury items?</h3>
              <p style={cs.ctaText}>
                LuxeCheck helps you authenticate bags, watches, shoes, perfumes,
                and jewelry from 30+ luxury brands — for free.
              </p>
              <button className="btn-luxe glass-btn-primary" style={cs.ctaBtn} onClick={() => navigate('/')}>
                Try LuxeCheck Free
              </button>
            </div>

            <div style={cs.ctaRow}>
              <button className="btn-luxe glass-btn-secondary" style={cs.ctaSecondary} onClick={handleCreateOwn}>
                Create Your Own Challenge
              </button>
              <button className="btn-luxe glass-btn-secondary" style={cs.ctaSecondary} onClick={() => setShowShare(true)}>
                Share This Challenge
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}

// ─── Styles ────────────────────────────────────────────────────
const cs = {
  page: {
    minHeight: '100vh',
    padding: '60px 24px 40px',
    maxWidth: '600px',
    margin: '0 auto',
    position: 'relative',
    zIndex: 1,
  },

  // Header
  challengeHeader: { marginBottom: '24px' },
  resultsHeader: { marginBottom: '24px' },

  challengeLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 600,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    display: 'block',
    marginBottom: '8px',
  },

  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.8rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    lineHeight: 1.3,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },

  // Quiz card
  quizCard: { padding: '24px', marginBottom: '24px' },

  quizBrand: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '8px',
  },

  quizTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.2rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    lineHeight: 1.35,
    marginBottom: '14px',
  },

  quizPrompt: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.6,
    margin: 0,
  },

  // Markers grid
  markersGrid: {
    display: 'grid',
    gap: '10px',
    marginBottom: '24px',
  },

  markerCard: {
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    padding: '16px 18px',
    cursor: 'pointer',
    textAlign: 'left',
    border: '2px solid transparent',
    transition: 'border-color 0.4s ease, background 0.4s ease',
  },

  markerCheck: {
    width: '24px',
    height: '24px',
    flexShrink: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  markerCheckEmpty: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    border: '2px solid rgba(184, 148, 95, 0.3)',
    display: 'block',
  },

  markerCheckActive: {
    width: '20px',
    height: '20px',
    borderRadius: '4px',
    background: 'var(--color-gold)',
    color: '#0A0A0A',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '0.75rem',
    fontWeight: 700,
  },

  markerName: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
  },

  // Submit
  submitWrap: { textAlign: 'center', marginBottom: '40px' },

  selectedCount: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--color-cream-muted)',
    marginBottom: '12px',
  },

  submitBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    padding: '14px 48px',
    borderRadius: 'var(--glass-radius, 12px)',
    cursor: 'pointer',
    letterSpacing: '0.04em',
  },

  // Score card
  scoreCard: {
    padding: '32px 24px',
    textAlign: 'center',
    marginBottom: '28px',
  },

  scoreBig: {
    display: 'flex',
    alignItems: 'baseline',
    justifyContent: 'center',
    gap: '4px',
    marginBottom: '8px',
  },

  scoreNum: {
    fontFamily: 'var(--font-heading)',
    fontSize: '3.5rem',
    fontWeight: 700,
    color: 'var(--color-gold)',
    lineHeight: 1,
  },

  scoreSlash: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    color: 'var(--color-cream-muted)',
    opacity: 0.4,
  },

  scoreTotal: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: 600,
    color: 'var(--color-cream-muted)',
  },

  scoreLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    margin: 0,
  },

  falsePositiveNote: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 300,
    color: '#A65D5D',
    marginTop: '8px',
  },

  creatorScore: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--color-cream-muted)',
    background: 'rgba(255, 255, 255, 0.02)',
    borderRadius: '12px',
    padding: '8px 16px',
    marginTop: '14px',
    display: 'inline-block',
  },

  markersLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 500,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '14px',
    opacity: 0.7,
  },

  // Result cards
  resultCard: {
    padding: '16px 18px',
    marginBottom: '12px',
    borderRadius: '12px',
  },

  resultTop: {
    display: 'flex',
    alignItems: 'center',
    gap: '10px',
    marginBottom: '6px',
  },

  resultIcon: {
    fontSize: '1rem',
    fontWeight: 700,
    flexShrink: 0,
  },

  resultName: {
    fontFamily: 'var(--font-heading)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    flex: 1,
  },

  resultTag: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.55rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: '6px',
    flexShrink: 0,
  },

  resultExplanation: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.5,
    margin: 0,
  },

  resultMissed: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 300,
    color: '#A65D5D',
    fontStyle: 'italic',
    marginTop: '4px',
    marginBottom: 0,
  },

  // CTA section
  ctaSection: { marginTop: '32px' },

  ctaCard: {
    padding: '28px 24px',
    textAlign: 'center',
    marginBottom: '16px',
    borderColor: 'rgba(184, 148, 95, 0.2)',
  },

  ctaTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.2rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '10px',
  },

  ctaText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.82rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.6,
    marginBottom: '18px',
  },

  ctaBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    padding: '14px 40px',
    borderRadius: 'var(--glass-radius, 12px)',
    cursor: 'pointer',
    letterSpacing: '0.04em',
  },

  ctaRow: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '10px',
  },

  ctaSecondary: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.78rem',
    fontWeight: 500,
    color: 'var(--color-cream)',
    padding: '12px 16px',
    borderRadius: 'var(--glass-radius, 12px)',
    cursor: 'pointer',
    textAlign: 'center',
  },

  // Share overlay
  shareOverlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0, 0, 0, 0.7)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 9999,
    padding: '24px',
  },

  sharePanel: {
    width: '100%',
    maxWidth: '380px',
    position: 'relative',
  },

  shareClose: {
    position: 'absolute',
    top: '-12px',
    right: '-12px',
    width: '32px',
    height: '32px',
    borderRadius: '50%',
    background: 'rgba(255, 255, 255, 0.1)',
    border: '1px solid rgba(255, 255, 255, 0.15)',
    color: 'var(--color-cream)',
    fontSize: '1.2rem',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },

  sharePreview: {
    padding: '32px 24px',
    textAlign: 'center',
    marginBottom: '16px',
    borderColor: 'rgba(184, 148, 95, 0.25)',
  },

  sharePreviewLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.6rem',
    fontWeight: 600,
    letterSpacing: '0.25em',
    color: 'var(--color-gold)',
    marginBottom: '14px',
  },

  sharePreviewBrand: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.8rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '8px',
  },

  sharePreviewTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.5,
    marginBottom: '14px',
  },

  sharePreviewCount: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--color-gold)',
    opacity: 0.7,
  },

  shareBtns: {
    display: 'flex',
    gap: '10px',
  },

  shareBtn: {
    flex: 1,
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    padding: '14px',
    borderRadius: 'var(--glass-radius, 12px)',
    cursor: 'pointer',
    textAlign: 'center',
  },

  // Error
  errorCard: {
    textAlign: 'center',
    padding: '60px 24px',
  },

  errorTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    color: 'var(--color-cream)',
    marginBottom: '12px',
  },

  errorText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    marginBottom: '24px',
  },

  // Sparkle
  sparkleOverlay: {
    position: 'fixed',
    inset: 0,
    pointerEvents: 'none',
    zIndex: 9998,
    overflow: 'hidden',
  },
};
