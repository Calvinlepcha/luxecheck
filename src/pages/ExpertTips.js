import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAllTips, getFeaturedTips, CATEGORIES, searchTips, getTipsByCategory } from '../data/expertTips';
import BackgroundImage from '../components/BackgroundImage';

const CATEGORY_COLORS = {
  authentication: { bg: 'rgba(184, 148, 95, 0.15)', color: '#B8945F' },
  'buying-guide': { bg: 'rgba(91, 140, 106, 0.15)', color: '#5B8C6A' },
  'brand-spotlight': { bg: 'rgba(155, 141, 181, 0.15)', color: '#9B8DB5' },
  care: { bg: 'rgba(196, 149, 106, 0.15)', color: '#C4956A' },
  'market-trends': { bg: 'rgba(181, 112, 142, 0.15)', color: '#B5708E' },
  beginner: { bg: 'rgba(123, 155, 181, 0.15)', color: '#7B9BB5' },
};

function CategoryBadge({ category }) {
  const cat = CATEGORIES.find((c) => c.key === category);
  const colors = CATEGORY_COLORS[category] || CATEGORY_COLORS.authentication;
  return (
    <span style={{ ...s.badge, backgroundColor: colors.bg, color: colors.color }}>
      {cat?.label || category}
    </span>
  );
}

function ExpertTips() {
  const navigate = useNavigate();
  const [activeCategory, setActiveCategory] = useState('all');
  const [search, setSearch] = useState('');

  const featured = getFeaturedTips();

  const tips = useMemo(() => {
    if (search.trim()) return searchTips(search);
    return getTipsByCategory(activeCategory);
  }, [search, activeCategory]);

  const nonFeatured = useMemo(() => {
    if (search.trim()) return tips;
    return tips.filter((t) => !t.featured);
  }, [tips, search]);

  return (
    <div style={s.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1621944190272-ec775aad58d0?w=1920&q=80" opacity={0.20} />
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.title}>Expert Tips</h1>
        <p style={s.subtitle}>Your luxury authentication education</p>
      </div>

      {/* Search */}
      <div style={s.searchWrap}>
        <input
          type="text"
          placeholder="Search articles..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={s.searchInput}
        />
        {search && (
          <button style={s.searchClear} onClick={() => setSearch('')}>&times;</button>
        )}
      </div>

      {/* Category Tabs */}
      <div style={s.tabsWrap}>
        <div style={s.tabs}>
          {CATEGORIES.map((cat) => (
            <button
              key={cat.key}
              style={{
                ...s.tab,
                ...(activeCategory === cat.key && !search ? s.tabActive : {}),
              }}
              onClick={() => { setActiveCategory(cat.key); setSearch(''); }}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Featured Hero */}
      {!search && activeCategory === 'all' && featured.length > 0 && (
        <div style={s.featuredSection}>
          {featured.map((tip) => (
            <button
              key={tip.id}
              className="glass-card"
              style={s.heroCard}
              onClick={() => navigate(`/tips/${tip.id}`)}
            >
              <CategoryBadge category={tip.category} />
              <h2 style={s.heroTitle}>{tip.title}</h2>
              <p style={s.heroSubtitle}>{tip.subtitle}</p>
              <div style={s.heroMeta}>
                <span style={s.readTime}>{tip.readTime}</span>
                {tip.brand && <span style={s.brandTag}>{tip.brand}</span>}
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Search Results Count */}
      {search && (
        <p style={s.resultCount}>
          {tips.length} {tips.length === 1 ? 'article' : 'articles'} found
        </p>
      )}

      {/* Article Grid */}
      <div style={s.grid}>
        {nonFeatured.map((tip) => (
          <button
            key={tip.id}
            className="glass-card"
            style={s.card}
            onClick={() => navigate(`/tips/${tip.id}`)}
          >
            <div style={s.cardTop}>
              <CategoryBadge category={tip.category} />
              <span style={s.readTime}>{tip.readTime}</span>
            </div>
            <h3 style={s.cardTitle}>{tip.title}</h3>
            <p style={s.cardSubtitle}>{tip.subtitle}</p>
            {tip.brand && <span style={s.brandTag}>{tip.brand}</span>}
          </button>
        ))}
      </div>

      {tips.length === 0 && (
        <div style={s.empty}>
          <p style={s.emptyText}>No articles match your search.</p>
          <button style={s.emptyBtn} onClick={() => { setSearch(''); setActiveCategory('all'); }}>
            View all articles
          </button>
        </div>
      )}
    </div>
  );
}

const s = {
  page: {
    minHeight: '100vh',
    padding: '24px 16px 60px',
    maxWidth: '800px',
    margin: '0 auto',
  },

  // Header
  header: { textAlign: 'center', marginBottom: '28px', paddingTop: '8px' },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
    fontWeight: 700,
    color: 'var(--color-cream)',
    marginBottom: '8px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textShadow: '0 0 40px rgba(184, 148, 95, 0.05)',
  },
  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    opacity: 0.7,
    letterSpacing: '0.04em',
    lineHeight: 1.7,
  },

  // Search
  searchWrap: { position: 'relative', marginBottom: '20px' },
  searchInput: {
    width: '100%',
    padding: '14px 44px 14px 18px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--color-cream)',
    fontWeight: 300,
    lineHeight: 1.7,
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(184, 148, 95, 0.15)',
    borderRadius: '12px',
    outline: 'none',
    boxSizing: 'border-box',
    transition: 'border-color var(--transition-luxury)',
  },
  searchClear: {
    position: 'absolute',
    right: '14px',
    top: '50%',
    transform: 'translateY(-50%)',
    background: 'none',
    border: 'none',
    color: 'var(--color-cream-muted)',
    fontSize: '1.2rem',
    cursor: 'pointer',
    padding: '4px',
  },

  // Tabs
  tabsWrap: { overflowX: 'auto', marginBottom: '28px', WebkitOverflowScrolling: 'touch' },
  tabs: { display: 'flex', gap: '6px', minWidth: 'max-content', paddingBottom: '4px' },
  tab: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 600,
    color: 'var(--color-cream-muted)',
    background: 'rgba(255, 255, 255, 0.02)',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
    padding: '8px 16px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all var(--transition-luxury)',
    letterSpacing: '0.03em',
  },
  tabActive: {
    color: 'var(--color-gold)',
    background: 'rgba(184, 148, 95, 0.12)',
    borderColor: 'rgba(184, 148, 95, 0.25)',
  },

  // Featured
  featuredSection: { marginBottom: '32px', display: 'flex', flexDirection: 'column', gap: '16px' },
  heroCard: {
    padding: '32px 24px',
    textAlign: 'left',
    cursor: 'pointer',
    border: '1px solid rgba(184, 148, 95, 0.15)',
    borderRadius: '12px',
    background: 'rgba(184, 148, 95, 0.02)',
    display: 'block',
    width: '100%',
    transition: 'border-color var(--transition-luxury)',
  },
  heroTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.25rem, 4vw, 1.5rem)',
    fontWeight: 700,
    color: 'var(--color-cream)',
    marginTop: '12px',
    marginBottom: '8px',
    lineHeight: 1.3,
  },
  heroSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.7,
    marginBottom: '12px',
  },
  heroMeta: { display: 'flex', alignItems: 'center', gap: '12px' },

  // Cards
  grid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
    gap: '14px',
  },
  card: {
    padding: '24px',
    textAlign: 'left',
    cursor: 'pointer',
    border: '1px solid rgba(255, 255, 255, 0.04)',
    borderRadius: '12px',
    display: 'flex',
    flexDirection: 'column',
    gap: '8px',
    width: '100%',
    transition: 'border-color var(--transition-luxury)',
  },
  cardTop: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: '8px',
  },
  cardTitle: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.05rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    lineHeight: 1.35,
    margin: 0,
  },
  cardSubtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.7,
    margin: 0,
    flex: 1,
  },

  // Shared
  badge: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 700,
    letterSpacing: '0.06em',
    textTransform: 'uppercase',
    padding: '4px 10px',
    borderRadius: '8px',
    whiteSpace: 'nowrap',
  },
  readTime: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    color: 'var(--color-cream-muted)',
    opacity: 0.6,
    whiteSpace: 'nowrap',
  },
  brandTag: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
    opacity: 0.7,
  },

  // Empty
  empty: { textAlign: 'center', padding: '48px 16px' },
  emptyText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.95rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    marginBottom: '16px',
    lineHeight: 1.7,
  },
  emptyBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    color: 'var(--color-gold)',
    background: 'none',
    border: '1px solid rgba(184, 148, 95, 0.3)',
    borderRadius: '12px',
    padding: '10px 20px',
    cursor: 'pointer',
  },

  resultCount: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    marginBottom: '20px',
    opacity: 0.6,
    lineHeight: 1.7,
  },
};

export default ExpertTips;
