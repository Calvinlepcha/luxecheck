import React, { useState, useCallback } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import { LogoMark } from '../components/Logo';
import { createChecklistChallenge, encodeChallenge } from '../utils/challengeCodec';
import generatePremiumPDF from '../utils/pdfReport';

function getVerdict(percentage) {
  if (percentage >= 80)
    return {
      label: 'Strong Indicators of Authenticity',
      color: '#5B8C6A',
      colorRgb: '91, 140, 106',
      rec: 'Your inspection found strong authenticity markers. For full peace of mind on high-value items, consider a professional authentication service.',
    };
  if (percentage >= 50)
    return {
      label: 'Mixed Results \u2014 Investigate Further',
      color: '#C4956A',
      colorRgb: '196, 149, 106',
      rec: 'Several markers need closer inspection. We recommend having this item reviewed by a professional before purchasing.',
    };
  return {
    label: 'Multiple Warning Signs Detected',
    color: '#A65D5D',
    colorRgb: '166, 93, 93',
    rec: 'Multiple markers raised concerns. We strongly recommend professional authentication before purchasing this item.',
  };
}

const answerIcons = {
  pass: { icon: '\u2713', color: '#5B8C6A', text: 'Pass' },
  fail: { icon: '\u2717', color: '#A65D5D', text: 'Fail' },
  unsure: { icon: '?', color: '#9B9285', text: 'Unsure' },
};

function isPaid() {
  try { return localStorage.getItem('luxecheck_paid') === 'true'; }
  catch { return false; }
}

function isSubscribed() {
  try { return localStorage.getItem('luxecheck_subscribed') === 'true'; }
  catch { return false; }
}

function fmtCurrency(n) {
  return n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 });
}

// ─── Share ───────────────────────────────────────────────────
async function shareResults(bag, percentage, verdict) {
  const text = `LuxeCheck Report: ${bag.brand} ${bag.model} \u2014 ${percentage}% (${verdict.label})`;
  if (navigator.share) {
    try { await navigator.share({ title: 'LuxeCheck Report', text }); } catch {}
  } else {
    try { await navigator.clipboard.writeText(text); return true; } catch {}
  }
  return false;
}

// ─── Component ───────────────────────────────────────────────
function Results() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const paid = isPaid();
  const subscribed = isSubscribed();
  const [copiedMsg, setCopiedMsg] = useState(false);
  const [pdfLoading, setPdfLoading] = useState(false);

  const bag = state?.bag;
  const details = state?.details;
  const earned = state?.earned;
  const max = state?.max;
  const percentage = state?.percentage;
  const verdict = percentage != null ? getVerdict(percentage) : null;

  const handleShare = useCallback(async () => {
    if (!bag || !verdict) return;
    const copied = await shareResults(bag, percentage, verdict);
    if (copied) {
      setCopiedMsg(true);
      setTimeout(() => setCopiedMsg(false), 2000);
    }
  }, [bag, percentage, verdict]);

  if (!details) {
    return (
      <div style={s.page}>
        <div style={{ textAlign: 'center', paddingTop: '120px' }}>
          <h1 style={s.heading}>No Results</h1>
          <p style={s.muted}>Complete a checklist first to see your results.</p>
          <button className="btn-luxe glass-btn-primary" style={s.ctaBtn} onClick={() => navigate('/scan')}>Start a Check</button>
        </div>
      </div>
    );
  }

  const paidSections = [
    { icon: '\u26A0', title: 'Top Red Flags', desc: `${bag.commonFakes?.length || 0} model-specific fake tells` },
    { icon: '\u25F4', title: 'Model-Year Variations', desc: 'Know what changed and when' },
    { icon: '\u2713', title: 'Detailed Checkpoint Breakdown', desc: 'Why each marker matters' },
    { icon: '$', title: 'Resale Value Estimate', desc: 'Current market pricing' },
  ];

  return (
    <div style={s.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1603739592262-e66a6708e141?w=1920&q=80" opacity={0.20} />
      {/* Header */}
      <button style={s.backBtn} onClick={() => navigate('/scan')}>&larr; New Check</button>
      <div style={s.subtitle}>{bag.brand} &middot; {bag.model}</div>

      {/* ─── Score + Verdict ──────────────────────────────── */}
      <div style={s.scoreSection}>
        <div style={s.scoreWithSeal}>
          <div style={{ ...s.scoreCircle, borderColor: verdict.color }}>
            <span style={s.scoreNumber}>{percentage}</span>
            <span style={s.scorePercent}>%</span>
          </div>
          <div style={s.sealBadge}>
            <LogoMark size={28} color="var(--color-gold)" />
            <span style={s.sealText}>Verified Check</span>
          </div>
        </div>
        <span style={s.aiLabel}>AI Analysis</span>
        <div className="glass-badge" style={{ ...s.verdictBadge, backgroundColor: `rgba(${verdict.colorRgb}, 0.15)`, color: verdict.color, boxShadow: `0 0 16px rgba(${verdict.colorRgb}, 0.12)` }}>{verdict.label}</div>
        <p style={s.scoreBreakdown}>{earned} / {max} points across {details.length} checkpoints</p>
      </div>

      <div style={s.inspectionDisclaimer}>
        This AI-generated assessment is based on your visual inspection matched against our authentication database of known markers across hundreds of luxury products.
      </div>

      {/* ─── FREE: Simple checkpoint list ─────────────────── */}
      <div style={s.sectionDivider} />
      <h3 style={s.sectionTitle}>Checkpoint Results</h3>
      {details.map((cp) => {
        const ans = answerIcons[cp.answer] || answerIcons.unsure;
        return (
          <div key={cp.id} style={s.simpleRow}>
            <span style={{ ...s.simpleIcon, color: ans.color }}>{ans.icon}</span>
            <span style={s.simpleName}>{cp.name}</span>
          </div>
        );
      })}

      {/* ─── FREE: Preview card (what paid includes) ──────── */}
      {!paid && (
        <>
          <div className="glass-card" style={s.previewCard}>
            <h3 style={s.previewTitle}>Your full report includes 4 exclusive sections</h3>
            <div style={s.previewList}>
              {paidSections.map((sec) => (
                <div key={sec.title} style={s.previewItem}>
                  <span style={s.previewIcon}>{sec.icon}</span>
                  <div>
                    <div style={s.previewItemTitle}>{sec.title}</div>
                    <div style={s.previewItemDesc}>{sec.desc}</div>
                  </div>
                  <span style={s.previewLock}>{'\u26BF'}</span>
                </div>
              ))}
            </div>
            <button className="btn-luxe glass-btn-primary" style={s.upgradeBtn} onClick={() => navigate('/pricing')}>
              Unlock Full Report &mdash; $6.99
            </button>
          </div>

          {/* Recommendation (free users still see this) */}
          <div style={s.sectionDivider} />
          <h3 style={s.sectionTitle}>Recommendation</h3>
          <p style={s.recText}>{verdict.rec}</p>
        </>
      )}

      {/* ─── PAID: Full report ────────────────────────────── */}
      {paid && (
        <>
          {/* Red Flags */}
          {bag.commonFakes && bag.commonFakes.length > 0 && (
            <>
              <div style={{ ...s.sectionDivider, marginTop: '32px' }} />
              <h3 style={s.sectionTitle}>
                <span style={s.sectionIcon}>{'\u26A0'}</span>
                Top Red Flags for {bag.model}
              </h3>
              <div style={s.redFlagList}>
                {bag.commonFakes.map((flag, i) => (
                  <div key={i} style={s.redFlagItem}>
                    <span style={s.redFlagBullet}>{'\u2022'}</span>
                    <span style={s.redFlagText}>{flag}</span>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Year Variations */}
          {bag.yearVariations && bag.yearVariations.length > 0 && (
            <>
              <div style={s.sectionDivider} />
              <h3 style={s.sectionTitle}>
                <span style={s.sectionIcon}>{'\u25F4'}</span>
                Know Your Model Year
              </h3>
              {bag.yearVariations.map((v, i) => (
                <div key={i} style={s.yearRow}>
                  <span style={s.yearLabel}>{v.year}</span>
                  <span style={s.yearDetail}>{v.detail}</span>
                </div>
              ))}
            </>
          )}

          {/* Full Checkpoint Breakdown */}
          <div style={{ ...s.sectionDivider, marginTop: '28px' }} />
          <h3 style={s.sectionTitle}>
            <span style={s.sectionIcon}>{'\u2713'}</span>
            Detailed Checkpoint Breakdown
          </h3>
          {details.map((cp) => {
            const ans = answerIcons[cp.answer] || answerIcons.unsure;
            const descText = cp.answer === 'pass' ? cp.passDescription
              : cp.answer === 'fail' ? cp.failDescription
              : 'You were unsure about this checkpoint.';
            return (
              <div key={cp.id} className="glass-card" style={s.detailCard}>
                <div style={s.cardHeader}>
                  <span style={{ ...s.cardIconWrap, color: ans.color }}>{ans.icon}</span>
                  <span style={s.cardName}>{cp.name}</span>
                  <span style={{ ...s.answerBadge, color: ans.color, borderColor: ans.color }}>{ans.text}</span>
                </div>
                <p style={s.cardDesc}>{descText}</p>
                <div style={s.cardMeta}>
                  <span style={s.categoryLabel}>{cp.category}</span>
                  <span>Weight: {cp.weight}/10</span>
                  <span style={s.pointsLabel}>+{cp.points} pts</span>
                </div>
                {cp.whyItMatters && (
                  <div style={s.whyBox}>
                    <span style={s.whyLabel}>Why it matters:</span> {cp.whyItMatters}
                  </div>
                )}
              </div>
            );
          })}

          {/* Resale Value */}
          {bag.resaleRange && (
            <>
              <div style={s.sectionDivider} />
              <div className="glass-card" style={s.resaleCard}>
                <span style={s.resaleLabel}>Estimated Resale Value</span>
                <span style={s.resaleValue}>
                  {fmtCurrency(bag.resaleRange.low)} &ndash; {fmtCurrency(bag.resaleRange.high)}
                </span>
                <span style={s.resaleCondition}>{bag.resaleRange.condition}</span>
              </div>
            </>
          )}

          {/* Recommendation */}
          <div style={s.sectionDivider} />
          <h3 style={s.sectionTitle}>Recommendation</h3>
          <p style={s.recText}>{verdict.rec}</p>

          {/* PDF */}
          <button
            className="btn-luxe glass-btn-secondary"
            style={s.pdfBtn}
            disabled={pdfLoading}
            onClick={async () => {
              setPdfLoading(true);
              try {
                await generatePremiumPDF(bag, details, earned, max, percentage, verdict);
              } catch (e) {
                console.error('PDF generation failed:', e);
              }
              setPdfLoading(false);
            }}
          >
            {pdfLoading ? (
              <span style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px' }}>
                <span className="luxe-dots"><span /><span /><span /></span>
                Preparing your report...
              </span>
            ) : (
              '\u2193 Download PDF Report'
            )}
          </button>
        </>
      )}

      {/* ─── Bottom ───────────────────────────────────────── */}
      <div style={s.disclaimer}>
        LuxeCheck is an educational reference tool. It does not guarantee
        authenticity. Always consult a professional authenticator for
        high-value purchases.
      </div>

      <div style={s.actionGrid}>
        <button className="btn-luxe glass-btn-secondary" style={s.actionBtn} onClick={() => navigate('/scan')}>Check Another Bag</button>
        <button className="btn-luxe glass-btn-secondary" style={s.actionBtn} onClick={() => {
          if (!subscribed) { navigate('/pricing'); return; }
          try {
            const existing = JSON.parse(localStorage.getItem('luxecheck_collection') || '[]');
            const entry = {
              id: `${bag.brandId}-${bag.modelId}-${Date.now()}`,
              brand: bag.brand, model: bag.model, brandId: bag.brandId, modelId: bag.modelId,
              commonFakes: bag.commonFakes, yearVariations: bag.yearVariations, resaleRange: bag.resaleRange,
              percentage, earned, max, date: new Date().toISOString(), details,
            };
            existing.unshift(entry);
            localStorage.setItem('luxecheck_collection', JSON.stringify(existing));
          } catch {}
          navigate('/collection');
        }}>Save to Collection</button>
        <button className="btn-luxe glass-btn-secondary" style={s.actionBtn} onClick={() => {
          const challenge = createChecklistChallenge(bag, details, percentage);
          const encoded = encodeChallenge(challenge);
          navigate(`/challenge?data=${encoded}`);
        }}>Challenge a Friend</button>
        <button className="btn-luxe glass-btn-primary" style={{ ...s.actionBtn, ...s.actionBtnFull }} onClick={handleShare}>
          {copiedMsg ? 'Copied to clipboard!' : 'Share Results'}
        </button>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s = {
  page: { minHeight: '100vh', padding: '24px 16px 60px', maxWidth: '600px', margin: '0 auto' },

  backBtn: { fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-gold)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', marginBottom: '24px', display: 'inline-block', letterSpacing: '0.03em' },

  subtitle: { fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.2em', textTransform: 'uppercase', color: 'var(--color-cream-muted)', marginBottom: '32px', opacity: 0.6 },

  heading: { fontFamily: 'var(--font-heading)', fontSize: '2rem', color: 'var(--color-cream)', marginBottom: '12px', letterSpacing: '0.15em', textTransform: 'uppercase' },
  muted: { fontFamily: 'var(--font-body)', fontSize: '1rem', fontWeight: 300, color: 'var(--color-cream-muted)', marginBottom: '32px' },

  // Score
  scoreSection: { textAlign: 'center', marginBottom: '20px' },
  scoreWithSeal: { display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '24px' },
  scoreCircle: { width: '140px', height: '140px', borderRadius: '50%', border: '4px solid', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '2px', background: 'rgba(255, 255, 255, 0.02)', transition: 'all 0.4s ease' },
  sealBadge: { display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px', opacity: 0.7 },
  sealText: { fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 500, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-gold)' },
  scoreNumber: { fontFamily: 'var(--font-heading)', fontSize: '3rem', fontWeight: 700, color: 'var(--color-cream)', lineHeight: 1 },
  scorePercent: { fontFamily: 'var(--font-body)', fontSize: '1.25rem', color: 'var(--color-cream-muted)', alignSelf: 'flex-start', marginTop: '12px' },
  verdictBadge: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--color-cream)', display: 'inline-block', padding: '8px 20px', marginBottom: '12px', borderRadius: '12px', transition: 'all 0.4s ease' },
  aiLabel: { fontFamily: 'var(--font-body)', fontSize: '10px', fontWeight: 500, letterSpacing: '0.12em', textTransform: 'uppercase', color: '#D4B978', marginBottom: '8px' },
  scoreBreakdown: { fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, color: 'var(--color-cream-muted)' },

  inspectionDisclaimer: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.5, color: 'var(--color-cream-muted)', textAlign: 'center', fontStyle: 'italic', padding: '16px 20px', marginBottom: '32px', borderLeft: '2px solid var(--color-border)', borderRight: '2px solid var(--color-border)', opacity: 0.7 },

  sectionDivider: { height: '1px', background: 'rgba(184, 148, 95, 0.08)', marginBottom: '24px' },
  sectionTitle: { fontFamily: 'var(--font-heading)', fontSize: '1.125rem', fontWeight: 600, color: 'var(--color-cream)', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px', letterSpacing: '0.15em', textTransform: 'uppercase' },
  sectionIcon: { fontSize: '0.9rem', color: 'var(--color-gold)' },

  // Simple checkpoint list (free)
  simpleRow: { display: 'flex', alignItems: 'center', gap: '12px', padding: '10px 0', borderBottom: '1px solid rgba(184, 148, 95, 0.08)' },
  simpleIcon: { fontSize: '1rem', width: '20px', textAlign: 'center', flexShrink: 0 },
  simpleName: { fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-cream)' },

  // Preview card (free)
  previewCard: { margin: '32px 0', padding: '28px 24px', textAlign: 'center', borderRadius: '12px' },
  previewTitle: { fontFamily: 'var(--font-heading)', fontSize: '1.15rem', fontWeight: 600, color: 'var(--color-cream)', marginBottom: '20px', letterSpacing: '0.15em', textTransform: 'uppercase' },
  previewList: { textAlign: 'left', marginBottom: '24px' },
  previewItem: { display: 'flex', alignItems: 'center', gap: '14px', padding: '12px 0', borderBottom: '1px solid var(--color-border)' },
  previewIcon: { fontSize: '1rem', color: 'var(--color-gold)', width: '24px', textAlign: 'center', flexShrink: 0 },
  previewItemTitle: { fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 600, color: 'var(--color-cream)', marginBottom: '2px' },
  previewItemDesc: { fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 300, color: 'var(--color-cream-muted)' },
  previewLock: { marginLeft: 'auto', fontSize: '0.9rem', color: 'var(--color-gold)', opacity: 0.4, flexShrink: 0 },
  upgradeBtn: { fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-cream)', padding: '14px 36px', cursor: 'pointer', letterSpacing: '0.05em' },

  // Red flags (paid)
  redFlagList: { marginBottom: '28px' },
  redFlagItem: { display: 'flex', gap: '10px', padding: '8px 0', alignItems: 'flex-start' },
  redFlagBullet: { color: '#A65D5D', fontSize: '1.1rem', lineHeight: 1.5, flexShrink: 0 },
  redFlagText: { fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-cream-muted)' },

  // Year variations (paid)
  yearRow: { display: 'flex', gap: '16px', padding: '12px 0', borderBottom: '1px solid rgba(184, 148, 95, 0.08)', alignItems: 'flex-start' },
  yearLabel: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-gold)', minWidth: '72px', flexShrink: 0 },
  yearDetail: { fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.55, color: 'var(--color-cream-muted)' },

  // Detail cards (paid)
  detailCard: { padding: '18px 20px', marginBottom: '12px', borderRadius: '12px', transition: 'all 0.4s ease' },
  cardHeader: { display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' },
  cardIconWrap: { fontSize: '1.1rem', width: '22px', textAlign: 'center', flexShrink: 0 },
  cardName: { fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 600, color: 'var(--color-cream)', flex: 1 },
  answerBadge: { fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600, letterSpacing: '0.05em', textTransform: 'uppercase', padding: '3px 8px', border: '1px solid', whiteSpace: 'nowrap', flexShrink: 0, borderRadius: '12px', transition: 'all 0.4s ease' },
  cardDesc: { fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, lineHeight: 1.6, color: 'var(--color-cream-muted)', marginBottom: '10px', paddingLeft: '32px' },
  cardMeta: { display: 'flex', gap: '16px', paddingLeft: '32px', fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 300, color: 'var(--color-cream-muted)', marginBottom: '10px' },
  categoryLabel: { textTransform: 'capitalize' },
  pointsLabel: { color: 'var(--color-gold)' },
  whyBox: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 300, lineHeight: 1.55, color: 'var(--color-cream-muted)', paddingLeft: '32px', borderLeft: '2px solid var(--color-gold)', marginLeft: '32px', paddingTop: '2px', paddingBottom: '2px', opacity: 0.8 },
  whyLabel: { fontWeight: 600, color: 'var(--color-gold)' },

  // Resale value (paid)
  resaleCard: { padding: '24px', textAlign: 'center', marginBottom: '28px', display: 'flex', flexDirection: 'column', gap: '6px', borderRadius: '12px' },
  resaleLabel: { fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 500, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-cream-muted)' },
  resaleValue: { fontFamily: 'var(--font-heading)', fontSize: '1.75rem', fontWeight: 700, color: 'var(--color-cream)' },
  resaleCondition: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', color: 'var(--color-gold)', fontStyle: 'italic' },

  // Recommendation
  recText: { fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, lineHeight: 1.65, color: 'var(--color-cream-muted)', marginBottom: '28px' },

  // PDF
  pdfBtn: { fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 600, color: 'var(--color-gold)', padding: '14px 24px', cursor: 'pointer', letterSpacing: '0.05em', display: 'block', width: '100%', textAlign: 'center', marginBottom: '28px' },

  // Disclaimer
  disclaimer: { borderTop: '1px solid var(--color-border)', paddingTop: '20px', marginBottom: '28px', fontFamily: 'var(--font-body)', fontSize: '0.75rem', lineHeight: 1.7, color: 'var(--color-cream-muted)', opacity: 0.6, textAlign: 'center' },

  // Actions
  actionGrid: { display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(140px, 1fr))', gap: '10px' },
  actionBtn: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600, color: 'var(--color-cream)', padding: '14px 12px', cursor: 'pointer', letterSpacing: '0.03em', textAlign: 'center' },
  actionBtnFull: { gridColumn: '1 / -1', borderColor: 'rgba(184, 148, 95, 0.3)', color: 'var(--color-gold)' },

  ctaBtn: { fontFamily: 'var(--font-body)', fontSize: '0.875rem', fontWeight: 700, color: 'var(--color-cream)', padding: '14px 16px', cursor: 'pointer', letterSpacing: '0.03em' },
};

export default Results;
