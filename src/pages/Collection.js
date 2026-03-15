import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import BackgroundImage from '../components/BackgroundImage';
import BagImage from '../components/BagImage';
import { getBag } from '../data/bags';
import useScrollReveal from '../hooks/useScrollReveal';

function getColor(pct) {
  if (pct >= 80) return { hex: '#5B8C6A', rgb: '91, 140, 106' };
  if (pct >= 50) return { hex: '#C4956A', rgb: '196, 149, 106' };
  return { hex: '#A65D5D', rgb: '166, 93, 93' };
}

function getLabel(pct) {
  if (pct >= 80) return 'Strong';
  if (pct >= 50) return 'Mixed';
  return 'Warning';
}

function loadCollection() {
  try {
    return JSON.parse(localStorage.getItem('luxecheck_collection') || '[]');
  } catch {
    return [];
  }
}

function Collection() {
  const navigate = useNavigate();
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(loadCollection());
  }, []);

  useScrollReveal([items.length]);

  const totalCount = items.length;
  const avgScore = totalCount > 0
    ? Math.round(items.reduce((sum, it) => sum + it.percentage, 0) / totalCount)
    : 0;

  const handleTap = (item) => {
    navigate('/results', {
      state: {
        bag: {
          brand: item.brand,
          model: item.model,
          brandId: item.brandId,
          modelId: item.modelId,
          commonFakes: item.commonFakes,
          yearVariations: item.yearVariations,
          resaleRange: item.resaleRange,
        },
        details: item.details,
        earned: item.earned,
        max: item.max,
        percentage: item.percentage,
      },
    });
  };

  const handleDelete = (id, e) => {
    e.stopPropagation();
    const updated = items.filter((it) => it.id !== id);
    setItems(updated);
    try { localStorage.setItem('luxecheck_collection', JSON.stringify(updated)); } catch {}
  };

  return (
    <div style={s.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1618236444721-4a8dba415c15?w=1920&q=80" opacity={0.20} />
      <button style={s.backBtn} onClick={() => navigate('/')}>&larr; Home</button>

      <div className="reveal" style={s.headerRow}>
        <div>
          <h1 style={s.heading}>My Collection</h1>
          <p style={s.subtitle}>Your authentication history</p>
        </div>
        <button className="btn-luxe glass-btn-primary" style={s.scanBtn} onClick={() => navigate('/scan')}>+ Scan New Bag</button>
      </div>

      {totalCount > 0 && (
        <div className="reveal" style={{ ...s.statsRow, transitionDelay: '80ms' }}>
          <div className="glass-card" style={s.statCard}>
            <span style={s.statNumber}>{totalCount}</span>
            <span style={s.statLabel}>{totalCount === 1 ? 'Bag Checked' : 'Bags Checked'}</span>
          </div>
          <div className="glass-card" style={s.statCard}>
            <span style={{ ...s.statNumber, color: getColor(avgScore).hex }}>{avgScore}%</span>
            <span style={s.statLabel}>Avg. Score</span>
          </div>
        </div>
      )}

      {totalCount === 0 ? (
        <div className="reveal" style={s.emptyState}>
          <div style={s.emptyIcon}>{'\u25CE'}</div>
          <h2 style={s.emptyTitle}>Your collection is empty</h2>
          <p style={s.emptyText}>Check your first bag to get started!</p>
          <button className="btn-luxe glass-btn-primary" style={s.emptyCta} onClick={() => navigate('/scan')}>Start Free Check</button>
        </div>
      ) : (
        <div style={s.grid} data-collection-grid="">
          {items.map((item, i) => {
            const color = getColor(item.percentage);
            const label = getLabel(item.percentage);
            const dateStr = new Date(item.date).toLocaleDateString('en-US', {
              month: 'short', day: 'numeric', year: 'numeric',
            });
            return (
              <div
                key={item.id}
                className="tilt-card reveal glass-card"
                style={{ ...s.card, transitionDelay: `${i * 80}ms` }}
                onClick={() => handleTap(item)}
                onMouseEnter={(e) => { e.currentTarget.style.borderColor = 'var(--color-gold)'; }}
                onMouseLeave={(e) => { e.currentTarget.style.borderColor = 'var(--color-border)'; }}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => { if (e.key === 'Enter') handleTap(item); }}
              >
                <BagImage
                  src={getBag(item.brandId, item.modelId)?.image}
                  alt={`${item.brand} ${item.model}`}
                  fallbackText={item.model}
                  style={s.cardImg}
                />
                <div style={s.cardTop}>
                  <span className="glass-badge" style={{ ...s.scoreBadge, backgroundColor: `rgba(${color.rgb}, 0.2)`, boxShadow: `0 0 12px rgba(${color.rgb}, 0.15)`, color: color.hex }}>{item.percentage}%</span>
                  <button
                    style={s.deleteBtn}
                    onClick={(e) => handleDelete(item.id, e)}
                    title="Remove from collection"
                  >
                    {'\u00d7'}
                  </button>
                </div>
                <div style={s.cardBrand}>{item.brand}</div>
                <div style={s.cardModel}>{item.model}</div>
                <div style={s.cardBottom}>
                  <span style={{ ...s.cardLabel, color: color.hex }}>{label}</span>
                  <span style={s.cardDate}>{dateStr}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', padding: '24px 16px 60px', maxWidth: '700px', margin: '0 auto' },

  backBtn: { fontFamily: 'var(--font-body)', fontSize: '0.875rem', color: 'var(--color-gold)', background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0', marginBottom: '32px', display: 'inline-block', letterSpacing: '0.03em' },

  headerRow: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '28px', gap: '16px', flexWrap: 'wrap' },

  heading: { fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 600, color: 'var(--color-cream)', marginBottom: '4px', letterSpacing: '0.15em', textTransform: 'uppercase', textShadow: '0 0 40px rgba(184, 148, 95, 0.05)' },
  subtitle: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 300, color: 'var(--color-cream-muted)', opacity: 0.6, lineHeight: 1.7 },

  scanBtn: { fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 700, color: 'var(--color-cream)', padding: '10px 20px', cursor: 'pointer', letterSpacing: '0.05em', whiteSpace: 'nowrap', flexShrink: 0 },

  // Stats
  statsRow: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '32px' },
  statCard: { padding: '24px', textAlign: 'center', display: 'flex', flexDirection: 'column', gap: '4px', borderRadius: '12px' },
  statNumber: { fontFamily: 'var(--font-heading)', fontSize: '2rem', fontWeight: 700, color: 'var(--color-cream)', lineHeight: 1 },
  statLabel: { fontFamily: 'var(--font-body)', fontSize: '0.7rem', letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--color-cream-muted)' },

  // Empty state
  emptyState: { textAlign: 'center', padding: '80px 20px' },
  emptyIcon: { fontSize: '2.5rem', color: 'var(--color-gold)', opacity: 0.3, marginBottom: '20px' },
  emptyTitle: { fontFamily: 'var(--font-heading)', fontSize: '1.5rem', fontWeight: 600, color: 'var(--color-cream)', marginBottom: '8px' },
  emptyText: { fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300, color: 'var(--color-cream-muted)', marginBottom: '32px', lineHeight: 1.7 },
  emptyCta: { fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--color-cream)', padding: '14px 36px', cursor: 'pointer', letterSpacing: '0.05em' },

  // Grid
  grid: { display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: '12px' },

  // Card
  card: { padding: '0', cursor: 'pointer', transition: 'border-color 0.4s ease', position: 'relative', display: 'flex', flexDirection: 'column', gap: '0', overflow: 'hidden', borderRadius: '12px' },

  cardImg: { width: '100%', height: '180px', objectFit: 'cover', display: 'block' },

  cardTop: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '4px', padding: '12px 14px 0' },

  scoreBadge: { fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 700, color: '#fff', padding: '3px 8px', letterSpacing: '0.03em', borderRadius: '12px' },

  deleteBtn: { fontFamily: 'var(--font-body)', fontSize: '1.1rem', color: 'var(--color-cream-muted)', background: 'none', border: 'none', cursor: 'pointer', padding: '0 4px', opacity: 0.3, lineHeight: 1, transition: 'opacity 0.4s ease' },

  cardBrand: { fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 300, letterSpacing: '0.15em', textTransform: 'uppercase', color: 'var(--color-cream-muted)', opacity: 0.6, padding: '0 14px' },

  cardModel: { fontFamily: 'var(--font-heading)', fontSize: '1.1rem', fontWeight: 600, color: 'var(--color-cream)', lineHeight: 1.2, padding: '0 14px' },

  cardBottom: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: 'auto', paddingTop: '8px', padding: '8px 14px 14px' },

  cardLabel: { fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase' },

  cardDate: { fontFamily: 'var(--font-body)', fontSize: '0.7rem', color: 'var(--color-cream-muted)', opacity: 0.5 },
};

export default Collection;
