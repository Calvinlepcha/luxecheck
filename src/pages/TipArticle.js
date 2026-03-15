import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getTipById, getRelatedTips, CATEGORIES } from '../data/expertTips';

const CATEGORY_COLORS = {
  authentication: { bg: 'rgba(184, 148, 95, 0.15)', color: '#B8945F' },
  'buying-guide': { bg: 'rgba(91, 140, 106, 0.15)', color: '#5B8C6A' },
  'brand-spotlight': { bg: 'rgba(155, 141, 181, 0.15)', color: '#9B8DB5' },
  care: { bg: 'rgba(196, 149, 106, 0.15)', color: '#C4956A' },
  'market-trends': { bg: 'rgba(181, 112, 142, 0.15)', color: '#B5708E' },
  beginner: { bg: 'rgba(123, 155, 181, 0.15)', color: '#7B9BB5' },
};

// ─── Content Block Renderers ─────────────────────────────────

function ParagraphBlock({ text }) {
  return <p style={s.paragraph}>{text}</p>;
}

function HeadingBlock({ text }) {
  return <h2 style={s.contentHeading}>{text}</h2>;
}

function TipBlock({ title, description }) {
  return (
    <div style={s.tipCard}>
      <div style={s.tipHeader}>
        <span style={s.tipIcon}>{'\u2731'}</span>
        <span style={s.tipTitle}>{title}</span>
      </div>
      <p style={s.tipDesc}>{description}</p>
    </div>
  );
}

function WarningBlock({ text }) {
  return (
    <div style={s.warningCard}>
      <div style={s.warningHeader}>
        <span style={s.warningIcon}>{'\u26A0'}</span>
        <span style={s.warningLabel}>Heads Up</span>
      </div>
      <p style={s.warningText}>{text}</p>
    </div>
  );
}

function ComparisonBlock({ real, fake }) {
  return (
    <div style={s.compWrap}>
      <div style={s.compCard}>
        <div style={{ ...s.compHeader, backgroundColor: 'rgba(91, 140, 106, 0.15)' }}>
          <span style={{ ...s.compLabel, color: '#5B8C6A' }}>Authentic</span>
        </div>
        <p style={s.compText}>{real}</p>
      </div>
      <div style={s.compCard}>
        <div style={{ ...s.compHeader, backgroundColor: 'rgba(166, 93, 93, 0.15)' }}>
          <span style={{ ...s.compLabel, color: '#A65D5D' }}>Counterfeit</span>
        </div>
        <p style={s.compText}>{fake}</p>
      </div>
    </div>
  );
}

function ChecklistBlock({ items }) {
  const [checked, setChecked] = useState(() => items.map(() => false));

  const toggle = (i) => {
    setChecked((prev) => {
      const next = [...prev];
      next[i] = !next[i];
      return next;
    });
  };

  return (
    <div style={s.checklistWrap}>
      {items.map((item, i) => (
        <button
          key={i}
          style={{ ...s.checkItem, opacity: checked[i] ? 0.5 : 1 }}
          onClick={() => toggle(i)}
        >
          <span style={{
            ...s.checkBox,
            backgroundColor: checked[i] ? 'rgba(184, 148, 95, 0.3)' : 'transparent',
            borderColor: checked[i] ? 'var(--color-gold)' : 'rgba(255, 255, 255, 0.15)',
          }}>
            {checked[i] && '\u2713'}
          </span>
          <span style={{
            ...s.checkText,
            textDecoration: checked[i] ? 'line-through' : 'none',
          }}>{item}</span>
        </button>
      ))}
    </div>
  );
}

function ContentBlock({ block }) {
  switch (block.type) {
    case 'paragraph': return <ParagraphBlock {...block.data} />;
    case 'heading': return <HeadingBlock {...block.data} />;
    case 'tip': return <TipBlock {...block.data} />;
    case 'warning': return <WarningBlock {...block.data} />;
    case 'comparison': return <ComparisonBlock {...block.data} />;
    case 'checklist': return <ChecklistBlock {...block.data} />;
    default: return null;
  }
}

// ─── Main Component ──────────────────────────────────────────

function TipArticle() {
  const { tipId } = useParams();
  const navigate = useNavigate();
  const tip = getTipById(tipId);
  const [feedback, setFeedback] = useState(null);
  const [shared, setShared] = useState(false);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [tipId]);

  // Load saved feedback
  useEffect(() => {
    if (!tip) return;
    try {
      const saved = localStorage.getItem(`luxecheck_tip_fb_${tip.id}`);
      if (saved) setFeedback(saved);
    } catch {}
  }, [tip]);

  const handleFeedback = useCallback((type) => {
    if (!tip) return;
    setFeedback(type);
    try {
      localStorage.setItem(`luxecheck_tip_fb_${tip.id}`, type);
      const countKey = `luxecheck_tip_${type}_${tip.id}`;
      const current = parseInt(localStorage.getItem(countKey) || '0', 10);
      localStorage.setItem(countKey, String(current + 1));
    } catch {}
  }, [tip]);

  const handleShare = useCallback(async () => {
    if (!tip) return;
    const url = window.location.href;
    const text = `${tip.title} — ${tip.subtitle}`;
    if (navigator.share) {
      try { await navigator.share({ title: tip.title, text, url }); } catch {}
    } else {
      try {
        await navigator.clipboard.writeText(`${text}\n${url}`);
        setShared(true);
        setTimeout(() => setShared(false), 2000);
      } catch {}
    }
  }, [tip]);

  if (!tip) {
    return (
      <div style={s.page}>
        <div style={{ textAlign: 'center', paddingTop: '100px' }}>
          <h1 style={s.errorTitle}>Article Not Found</h1>
          <p style={s.errorText}>This article may have been moved or removed.</p>
          <button
            className="btn-luxe glass-btn-primary"
            style={s.errorBtn}
            onClick={() => navigate('/tips')}
          >
            Browse All Tips
          </button>
        </div>
      </div>
    );
  }

  const related = getRelatedTips(tip, 3);
  const catLabel = CATEGORIES.find((c) => c.key === tip.category)?.label || tip.category;
  const catColors = CATEGORY_COLORS[tip.category] || CATEGORY_COLORS.authentication;

  return (
    <div style={s.page}>
      {/* Back */}
      <button style={s.backBtn} onClick={() => navigate('/tips')}>
        &larr; All Tips
      </button>

      {/* Article Header */}
      <div style={s.articleHeader}>
        <span style={{ ...s.catBadge, backgroundColor: catColors.bg, color: catColors.color }}>
          {catLabel}
        </span>
        <h1 style={s.articleTitle}>{tip.title}</h1>
        <p style={s.articleSubtitle}>{tip.subtitle}</p>
        <div style={s.metaRow}>
          <span style={s.readTimeMeta}>{tip.readTime}</span>
          {tip.brand && <span style={s.brandMeta}>{tip.brand}</span>}
        </div>
      </div>

      {/* Divider */}
      <div style={s.divider} />

      {/* Content */}
      <article style={s.article}>
        {tip.content.map((block, i) => (
          <ContentBlock key={i} block={block} />
        ))}
      </article>

      {/* Divider */}
      <div style={s.divider} />

      {/* Feedback + Share */}
      <div style={s.feedbackSection}>
        <p style={s.feedbackQ}>Was this helpful?</p>
        <div style={s.feedbackBtns}>
          <button
            style={{
              ...s.fbBtn,
              ...(feedback === 'up' ? s.fbBtnActive : {}),
            }}
            onClick={() => handleFeedback('up')}
          >
            {'\u25B2'} Yes
          </button>
          <button
            style={{
              ...s.fbBtn,
              ...(feedback === 'down' ? { ...s.fbBtnActive, borderColor: '#A65D5D', color: '#A65D5D' } : {}),
            }}
            onClick={() => handleFeedback('down')}
          >
            {'\u25BC'} Not really
          </button>
        </div>
        <button style={s.shareBtn} onClick={handleShare}>
          {shared ? 'Copied!' : 'Share this article'}
        </button>
      </div>

      {/* Related Tips */}
      {related.length > 0 && (
        <>
          <div style={s.divider} />
          <h3 style={s.relatedTitle}>Related Articles</h3>
          <div style={s.relatedGrid}>
            {related.map((r) => {
              const rc = CATEGORY_COLORS[r.category] || CATEGORY_COLORS.authentication;
              return (
                <button
                  key={r.id}
                  className="glass-card"
                  style={s.relatedCard}
                  onClick={() => navigate(`/tips/${r.id}`)}
                >
                  <span style={{ ...s.catBadgeSmall, backgroundColor: rc.bg, color: rc.color }}>
                    {CATEGORIES.find((c) => c.key === r.category)?.label}
                  </span>
                  <span style={s.relatedCardTitle}>{r.title}</span>
                  <span style={s.relatedReadTime}>{r.readTime}</span>
                </button>
              );
            })}
          </div>
        </>
      )}
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
    fontSize: '0.85rem',
    color: 'var(--color-gold)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    marginBottom: '24px',
    display: 'inline-block',
    letterSpacing: '0.03em',
  },

  // Article Header
  articleHeader: { marginBottom: '28px' },
  catBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '5px 12px',
    borderRadius: '8px',
    display: 'inline-block',
    marginBottom: '16px',
  },
  articleTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    fontWeight: 700,
    color: 'var(--color-cream)',
    lineHeight: 1.25,
    marginBottom: '12px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textShadow: '0 0 40px rgba(184, 148, 95, 0.05)',
  },
  articleSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.7,
    marginBottom: '16px',
  },
  metaRow: { display: 'flex', alignItems: 'center', gap: '16px' },
  readTimeMeta: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--color-cream-muted)',
    opacity: 0.6,
  },
  brandMeta: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
    opacity: 0.7,
  },

  divider: {
    height: '1px',
    background: 'rgba(184, 148, 95, 0.1)',
    margin: '32px 0',
  },

  // Article Body
  article: {},
  paragraph: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream)',
    marginBottom: '20px',
    opacity: 0.88,
  },
  contentHeading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.25rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
    marginTop: '36px',
    marginBottom: '16px',
  },

  // Tip Card
  tipCard: {
    background: 'rgba(184, 148, 95, 0.06)',
    borderLeft: '3px solid var(--color-gold)',
    borderRadius: '0 12px 12px 0',
    padding: '24px',
    marginBottom: '20px',
  },
  tipHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  tipIcon: { fontSize: '0.9rem', color: 'var(--color-gold)' },
  tipTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--color-gold)',
    letterSpacing: '0.02em',
  },
  tipDesc: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream)',
    margin: 0,
    opacity: 0.85,
  },

  // Warning Card
  warningCard: {
    background: 'rgba(166, 93, 93, 0.06)',
    borderLeft: '3px solid #A65D5D',
    borderRadius: '0 12px 12px 0',
    padding: '24px',
    marginBottom: '20px',
  },
  warningHeader: { display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '8px' },
  warningIcon: { fontSize: '0.9rem', color: '#A65D5D' },
  warningLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: '#A65D5D',
    letterSpacing: '0.02em',
  },
  warningText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream)',
    margin: 0,
    opacity: 0.85,
  },

  // Comparison
  compWrap: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '20px',
  },
  compCard: {
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
    overflow: 'hidden',
  },
  compHeader: { padding: '10px 14px' },
  compLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
  },
  compText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.82rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream)',
    padding: '14px',
    margin: 0,
    opacity: 0.85,
  },

  // Checklist
  checklistWrap: { marginBottom: '20px' },
  checkItem: {
    display: 'flex',
    alignItems: 'flex-start',
    gap: '12px',
    padding: '10px 0',
    borderBottom: '1px solid rgba(255, 255, 255, 0.04)',
    background: 'none',
    border: 'none',
    borderBottomStyle: 'solid',
    borderBottomWidth: '1px',
    borderBottomColor: 'rgba(255, 255, 255, 0.04)',
    cursor: 'pointer',
    textAlign: 'left',
    width: '100%',
    transition: 'opacity var(--transition-luxury)',
    WebkitTapHighlightColor: 'transparent',
  },
  checkBox: {
    width: '20px',
    height: '20px',
    borderRadius: '6px',
    border: '1.5px solid',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexShrink: 0,
    fontSize: '0.7rem',
    color: 'var(--color-gold)',
    marginTop: '2px',
    transition: 'all var(--transition-luxury)',
  },
  checkText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream)',
    opacity: 0.85,
    transition: 'text-decoration var(--transition-luxury)',
  },

  // Feedback
  feedbackSection: { textAlign: 'center' },
  feedbackQ: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 300,
    color: 'var(--color-cream)',
    marginBottom: '14px',
  },
  feedbackBtns: { display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '20px' },
  fbBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--color-cream-muted)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
    padding: '10px 20px',
    cursor: 'pointer',
    transition: 'all var(--transition-luxury)',
  },
  fbBtnActive: {
    borderColor: 'var(--color-gold)',
    color: 'var(--color-gold)',
    background: 'rgba(184, 148, 95, 0.1)',
  },
  shareBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
    background: 'none',
    border: '1px solid rgba(184, 148, 95, 0.25)',
    borderRadius: '12px',
    padding: '10px 24px',
    cursor: 'pointer',
    transition: 'all var(--transition-luxury)',
  },

  // Related
  relatedTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.1rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '16px',
  },
  relatedGrid: { display: 'flex', flexDirection: 'column', gap: '10px' },
  relatedCard: {
    padding: '24px',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
    display: 'flex',
    alignItems: 'center',
    gap: '14px',
    width: '100%',
    textAlign: 'left',
    transition: 'border-color var(--transition-luxury)',
  },
  catBadgeSmall: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.55rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '3px 8px',
    borderRadius: '6px',
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },
  relatedCardTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    flex: 1,
    lineHeight: 1.35,
  },
  relatedReadTime: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    color: 'var(--color-cream-muted)',
    opacity: 0.5,
    whiteSpace: 'nowrap',
    flexShrink: 0,
  },

  // Error
  errorTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.75rem',
    color: 'var(--color-cream)',
    marginBottom: '12px',
  },
  errorText: {
    fontFamily: 'var(--font-body)',
    fontSize: '1rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    marginBottom: '24px',
    lineHeight: 1.7,
  },
  errorBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 700,
    color: 'var(--color-cream)',
    padding: '14px 28px',
    cursor: 'pointer',
  },
};

export default TipArticle;
