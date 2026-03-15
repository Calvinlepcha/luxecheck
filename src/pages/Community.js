import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { getPosts, formatDate, getAvatarColor } from '../utils/communityStore';
import BackgroundImage from '../components/BackgroundImage';
import { LogoMark } from '../components/Logo';

const TYPE_META = {
  experience: { label: 'Experience', color: '#7B9BB5', bg: 'rgba(123, 155, 181, 0.15)' },
  advice:     { label: 'Advice',     color: '#B8945F', bg: 'rgba(184, 148, 95, 0.15)' },
  warning:    { label: 'Warning',    color: '#A65D5D', bg: 'rgba(166, 93, 93, 0.15)' },
  success:    { label: 'Success',    color: '#5B8C6A', bg: 'rgba(91, 140, 106, 0.15)' },
  question:   { label: 'Question',   color: '#9B8DB5', bg: 'rgba(155, 141, 181, 0.15)' },
};

const TYPE_TABS = [
  { key: 'all', label: 'All' },
  { key: 'experience', label: 'Experiences' },
  { key: 'advice', label: 'Advice' },
  { key: 'warning', label: 'Warnings' },
  { key: 'success', label: 'Success' },
  { key: 'question', label: 'Questions' },
];

const CAT_TABS = [
  { key: 'all', label: 'All' },
  { key: 'bags', label: 'Bags' },
  { key: 'watches', label: 'Watches' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'perfume', label: 'Perfume' },
  { key: 'jewelry', label: 'Jewelry' },
];

const SORT_OPTIONS = [
  { key: 'newest', label: 'Newest' },
  { key: 'likes', label: 'Most Liked' },
  { key: 'discussed', label: 'Most Discussed' },
];

function Community() {
  const navigate = useNavigate();
  const [typeFilter, setTypeFilter] = useState('all');
  const [catFilter, setCatFilter] = useState('all');
  const [sort, setSort] = useState('newest');
  const posts = useMemo(() => {
    let list = getPosts();
    if (typeFilter !== 'all') list = list.filter((p) => p.type === typeFilter);
    if (catFilter !== 'all') list = list.filter((p) => p.category === catFilter);
    list = [...list];
    if (sort === 'likes') list.sort((a, b) => b.likes - a.likes);
    else if (sort === 'discussed') list.sort((a, b) => b.replies.length - a.replies.length);
    else list.sort((a, b) => b.date - a.date);
    return list;
  }, [typeFilter, catFilter, sort]);

  return (
    <div style={s.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1638704730800-1fb05a35325c?w=1920&q=80" opacity={0.20} />
      {/* Header */}
      <div style={s.header}>
        <h1 style={s.title}>Community</h1>
        <p style={s.subtitle}>Real experiences from real luxury buyers</p>
        <button
          className="btn-luxe glass-btn-primary"
          style={s.ctaBtn}
          onClick={() => navigate('/community/post')}
        >
          Share Your Story
        </button>
      </div>

      {/* Type Tabs */}
      <div style={s.tabsScroll}>
        <div style={s.tabs}>
          {TYPE_TABS.map((t) => (
            <button
              key={t.key}
              style={{ ...s.tab, ...(typeFilter === t.key ? s.tabActive : {}) }}
              onClick={() => setTypeFilter(t.key)}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Category + Sort row */}
      <div style={s.filterRow}>
        <div style={s.catPills}>
          {CAT_TABS.map((c) => (
            <button
              key={c.key}
              style={{ ...s.catPill, ...(catFilter === c.key ? s.catPillActive : {}) }}
              onClick={() => setCatFilter(c.key)}
            >
              {c.label}
            </button>
          ))}
        </div>
        <select
          style={s.sortSelect}
          value={sort}
          onChange={(e) => setSort(e.target.value)}
        >
          {SORT_OPTIONS.map((o) => (
            <option key={o.key} value={o.key}>{o.label}</option>
          ))}
        </select>
      </div>

      {/* Feed */}
      <div style={s.feed}>
        {posts.map((post) => {
          const meta = TYPE_META[post.type] || TYPE_META.experience;
          const avatarBg = getAvatarColor(post.author);
          const isHot = post.likes >= 10;
          const isPopular = post.replies.length >= 5;
          const glowBorder =
            post.type === 'warning' ? 'rgba(166, 93, 93, 0.25)' :
            post.type === 'success' ? 'rgba(91, 140, 106, 0.25)' :
            'rgba(255, 255, 255, 0.04)';

          const preview = post.body.split('\n').filter(Boolean).slice(0, 2).join(' ');
          const trimmed = preview.length > 160 ? preview.slice(0, 157) + '...' : preview;

          return (
            <button
              key={post.id}
              className="glass-card"
              style={{ ...s.card, borderColor: glowBorder }}
              onClick={() => navigate(`/community/${post.id}`)}
            >
              {/* Top row: avatar, name, date */}
              <div style={s.cardTopRow}>
                <div style={{ ...s.avatar, backgroundColor: avatarBg }}>
                  {post.author.charAt(0).toUpperCase()}
                </div>
                <span style={s.authorName}>{post.author}</span>
                <span style={s.cardDate}>{formatDate(post.date)}</span>
              </div>

              {/* Badges */}
              <div style={s.badgeRow}>
                <span style={{ ...s.typeBadge, backgroundColor: meta.bg, color: meta.color }}>
                  {meta.label}
                </span>
                {isHot && <span style={s.hotBadge}>Hot</span>}
                {isPopular && <span style={s.popularBadge}>Popular</span>}
              </div>

              {/* Title + preview */}
              <h3 style={s.cardTitle}>{post.title}</h3>
              <p style={s.cardPreview}>{trimmed}</p>

              {/* Tags */}
              <div style={s.tagRow}>
                {post.brand && <span style={s.brandChip}>{post.brand}</span>}
                {post.product && <span style={s.productChip}>{post.product}</span>}
              </div>

              {/* Footer */}
              <div style={s.cardFooter}>
                <span style={s.stat}>{'\u2661'} {post.likes}</span>
                <span style={s.stat}>{'\u2709'} {post.replies.length} {post.replies.length === 1 ? 'reply' : 'replies'}</span>
                <span style={s.verifiedBadge}>
                  <LogoMark size={12} />
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {posts.length === 0 && (
        <div style={s.empty}>
          <p style={s.emptyText}>No posts match your filters.</p>
          <button style={s.emptyBtn} onClick={() => { setTypeFilter('all'); setCatFilter('all'); }}>
            View all posts
          </button>
        </div>
      )}

      {/* Bottom CTA */}
      <div style={s.bottomCta}>
        <p style={s.bottomCtaText}>Have your own story? The community learns from every experience.</p>
        <button
          className="btn-luxe glass-btn-primary"
          style={s.ctaBtn}
          onClick={() => navigate('/community/post')}
        >
          Share Your Story
        </button>
      </div>
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', padding: '24px 16px 60px', maxWidth: '700px', margin: '0 auto' },

  header: { textAlign: 'center', marginBottom: '28px', paddingTop: '8px' },
  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.75rem, 5vw, 2.25rem)',
    fontWeight: 700,
    color: 'var(--color-cream)',
    marginBottom: '8px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    opacity: 0.7,
    marginBottom: '20px',
    lineHeight: 1.7,
  },
  ctaBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 700,
    color: 'var(--color-cream)',
    padding: '12px 28px',
    cursor: 'pointer',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },

  // Tabs
  tabsScroll: { overflowX: 'auto', marginBottom: '16px', WebkitOverflowScrolling: 'touch' },
  tabs: { display: 'flex', gap: '6px', minWidth: 'max-content' },
  tab: {
    fontFamily: 'var(--font-body)', fontSize: '0.73rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px',
    padding: '7px 14px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.4s ease',
  },
  tabActive: {
    color: 'var(--color-gold)', background: 'rgba(184,148,95,0.12)',
    borderColor: 'rgba(184,148,95,0.25)',
  },

  // Filters row
  filterRow: {
    display: 'flex', alignItems: 'center', justifyContent: 'space-between',
    gap: '12px', marginBottom: '24px', flexWrap: 'wrap',
  },
  catPills: { display: 'flex', gap: '5px', overflowX: 'auto', flex: 1 },
  catPill: {
    fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', background: 'none',
    border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px',
    padding: '5px 10px', cursor: 'pointer', whiteSpace: 'nowrap', transition: 'all 0.4s ease',
  },
  catPillActive: {
    color: 'var(--color-gold)', borderColor: 'rgba(184,148,95,0.3)',
    background: 'rgba(184,148,95,0.08)',
  },
  sortSelect: {
    fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 300, color: 'var(--color-cream-muted)',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px', padding: '6px 10px', cursor: 'pointer', flexShrink: 0,
  },

  // Feed
  feed: { display: 'flex', flexDirection: 'column', gap: '12px' },
  card: {
    padding: '24px', textAlign: 'left', cursor: 'pointer', width: '100%',
    border: '1px solid', borderRadius: '12px', display: 'flex',
    flexDirection: 'column', gap: '10px', transition: 'border-color 0.4s ease',
  },
  cardTopRow: { display: 'flex', alignItems: 'center', gap: '10px' },
  avatar: {
    width: '30px', height: '30px', borderRadius: '50%',
    display: 'flex', alignItems: 'center', justifyContent: 'center',
    fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 700,
    color: '#fff', flexShrink: 0,
  },
  authorName: {
    fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 300,
    color: 'var(--color-cream)', flex: 1,
  },
  cardDate: {
    fontFamily: 'var(--font-body)', fontSize: '0.7rem', fontWeight: 300,
    color: 'var(--color-cream-faint)', flexShrink: 0,
  },

  badgeRow: { display: 'flex', gap: '6px', alignItems: 'center', flexWrap: 'wrap' },
  typeBadge: {
    fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    padding: '3px 9px', borderRadius: '12px',
  },
  hotBadge: {
    fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    padding: '3px 9px', borderRadius: '12px',
    backgroundColor: 'rgba(196, 149, 106, 0.15)', color: '#C4956A',
  },
  popularBadge: {
    fontFamily: 'var(--font-body)', fontSize: '0.6rem', fontWeight: 700,
    letterSpacing: '0.06em', textTransform: 'uppercase',
    padding: '3px 9px', borderRadius: '12px',
    backgroundColor: 'rgba(139, 127, 181, 0.15)', color: '#8B7FB5',
  },

  cardTitle: {
    fontFamily: 'var(--font-heading)', fontSize: '1.05rem', fontWeight: 600,
    color: 'var(--color-cream)', lineHeight: 1.35, margin: 0,
  },
  cardPreview: {
    fontFamily: 'var(--font-body)', fontSize: '0.82rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', lineHeight: 1.7, margin: 0,
  },

  tagRow: { display: 'flex', gap: '6px', flexWrap: 'wrap' },
  brandChip: {
    fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 600,
    color: 'var(--color-gold)', background: 'rgba(184,148,95,0.1)',
    padding: '2px 8px', borderRadius: '12px',
  },
  productChip: {
    fontFamily: 'var(--font-body)', fontSize: '0.65rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', background: 'rgba(255,255,255,0.02)',
    padding: '2px 8px', borderRadius: '12px',
  },

  cardFooter: { display: 'flex', gap: '16px', paddingTop: '4px', alignItems: 'center' },
  stat: {
    fontFamily: 'var(--font-body)', fontSize: '0.72rem', fontWeight: 300,
    color: 'var(--color-cream-faint)',
  },
  verifiedBadge: { marginLeft: 'auto', opacity: 0.4, display: 'flex', alignItems: 'center' },

  // Empty
  empty: { textAlign: 'center', padding: '48px 16px' },
  emptyText: { fontFamily: 'var(--font-body)', fontSize: '0.95rem', fontWeight: 300, color: 'var(--color-cream-muted)', marginBottom: '16px', lineHeight: 1.7 },
  emptyBtn: {
    fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-gold)',
    background: 'none', border: '1px solid rgba(184,148,95,0.3)',
    borderRadius: '12px', padding: '10px 20px', cursor: 'pointer',
  },

  // Bottom CTA
  bottomCta: {
    textAlign: 'center', marginTop: '40px', padding: '32px 16px',
    borderTop: '1px solid rgba(184,148,95,0.08)',
  },
  bottomCtaText: {
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', marginBottom: '16px', lineHeight: 1.7,
  },
};

export default Community;
