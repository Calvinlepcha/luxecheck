import React, { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost, getSavedName, saveName } from '../utils/communityStore';

const POST_TYPES = [
  { key: 'experience', label: 'Experience', color: '#60A5FA' },
  { key: 'advice', label: 'Advice', color: '#B8945F' },
  { key: 'warning', label: 'Warning', color: '#A65D5D' },
  { key: 'success', label: 'Success Story', color: '#5B8C6A' },
  { key: 'question', label: 'Question', color: '#A78BFA' },
];

const CATEGORIES = [
  { key: 'bags', label: 'Bags' },
  { key: 'watches', label: 'Watches' },
  { key: 'shoes', label: 'Shoes' },
  { key: 'perfume', label: 'Perfume' },
  { key: 'jewelry', label: 'Jewelry' },
  { key: 'general', label: 'General' },
];

const KNOWN_BRANDS = [
  'Chanel', 'Louis Vuitton', 'Hermès', 'Gucci', 'Dior', 'Prada',
  'Bottega Veneta', 'Celine', 'Saint Laurent', 'Fendi', 'Balenciaga',
  'Cartier', 'Rolex', 'Omega', 'Burberry', 'Loewe', 'Goyard',
  'Valentino', 'Givenchy', 'Versace', 'Tiffany', 'Bulgari', 'Creed',
];

function CreatePost() {
  const navigate = useNavigate();
  const [author, setAuthor] = useState(getSavedName);
  const [type, setType] = useState('experience');
  const [category, setCategory] = useState('bags');
  const [brand, setBrand] = useState('');
  const [product, setProduct] = useState('');
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [tagsRaw, setTagsRaw] = useState('');
  const [toast, setToast] = useState(false);
  const [showBrandSuggestions, setShowBrandSuggestions] = useState(false);

  const brandSuggestions = brand.trim()
    ? KNOWN_BRANDS.filter((b) => b.toLowerCase().startsWith(brand.toLowerCase().trim()))
    : [];

  const canSubmit = author.trim() && title.trim() && body.trim();

  const handleSubmit = useCallback(() => {
    if (!canSubmit) return;
    saveName(author.trim());
    const tags = tagsRaw.split(',').map((t) => t.trim().toLowerCase()).filter(Boolean);
    createPost({
      author: author.trim(),
      avatar: author.trim().charAt(0),
      type,
      title: title.trim(),
      body: body.trim(),
      brand: brand.trim() || null,
      product: product.trim() || null,
      category,
      tags,
    });
    setToast(true);
    setTimeout(() => navigate('/community'), 1500);
  }, [canSubmit, author, type, category, brand, product, title, body, tagsRaw, navigate]);

  return (
    <div style={s.page}>
      <button style={s.backBtn} onClick={() => navigate('/community')}>&larr; Community</button>

      <h1 style={s.title}>Share Your Story</h1>
      <p style={s.subtitle}>Your experience could help someone avoid a scam or find their dream bag.</p>

      {/* Display Name */}
      <label style={s.label}>Display Name *</label>
      <input
        type="text"
        placeholder="How you'll appear to others"
        value={author}
        onChange={(e) => setAuthor(e.target.value)}
        style={s.input}
        maxLength={30}
      />

      {/* Post Type */}
      <label style={s.label}>Post Type *</label>
      <div style={s.pillGrid}>
        {POST_TYPES.map((t) => (
          <button
            key={t.key}
            style={{
              ...s.pill,
              ...(type === t.key ? { borderColor: t.color, color: t.color, background: `${t.color}15` } : {}),
            }}
            onClick={() => setType(t.key)}
          >
            {t.label}
          </button>
        ))}
      </div>

      {/* Category */}
      <label style={s.label}>Category *</label>
      <div style={s.pillGrid}>
        {CATEGORIES.map((c) => (
          <button
            key={c.key}
            style={{
              ...s.pill,
              ...(category === c.key ? s.pillActive : {}),
            }}
            onClick={() => setCategory(c.key)}
          >
            {c.label}
          </button>
        ))}
      </div>

      {/* Brand */}
      <label style={s.label}>Brand <span style={s.optional}>(optional)</span></label>
      <div style={s.autocompleteWrap}>
        <input
          type="text"
          placeholder="e.g. Chanel, Rolex"
          value={brand}
          onChange={(e) => { setBrand(e.target.value); setShowBrandSuggestions(true); }}
          onFocus={() => setShowBrandSuggestions(true)}
          onBlur={() => setTimeout(() => setShowBrandSuggestions(false), 200)}
          style={s.input}
        />
        {showBrandSuggestions && brandSuggestions.length > 0 && (
          <div style={s.suggestions}>
            {brandSuggestions.slice(0, 5).map((b) => (
              <button
                key={b}
                style={s.suggestionItem}
                onMouseDown={() => { setBrand(b); setShowBrandSuggestions(false); }}
              >
                {b}
              </button>
            ))}
          </div>
        )}
      </div>

      {/* Product */}
      <label style={s.label}>Product <span style={s.optional}>(optional)</span></label>
      <input
        type="text"
        placeholder="e.g. Classic Flap, Submariner"
        value={product}
        onChange={(e) => setProduct(e.target.value)}
        style={s.input}
      />

      {/* Title */}
      <label style={s.label}>Title *</label>
      <input
        type="text"
        placeholder="Give your post a catchy title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        style={s.input}
        maxLength={100}
      />

      {/* Body */}
      <label style={s.label}>Your Story *</label>
      <textarea
        placeholder="Share the details... What happened? What did you learn? What advice would you give?"
        value={body}
        onChange={(e) => setBody(e.target.value)}
        style={s.textarea}
        rows={10}
      />

      {/* Tags */}
      <label style={s.label}>Tags <span style={s.optional}>(comma separated)</span></label>
      <input
        type="text"
        placeholder="e.g. scam, authentication, chanel"
        value={tagsRaw}
        onChange={(e) => setTagsRaw(e.target.value)}
        style={s.input}
      />

      {/* Submit */}
      <button
        className="btn-luxe glass-btn-primary"
        style={{ ...s.submitBtn, opacity: canSubmit ? 1 : 0.4 }}
        onClick={handleSubmit}
        disabled={!canSubmit}
      >
        Post to Community
      </button>

      {/* Toast */}
      {toast && (
        <div style={s.toast}>
          Your post has been shared with the community!
        </div>
      )}
    </div>
  );
}

const s = {
  page: { minHeight: '100vh', padding: '24px 16px 60px', maxWidth: '600px', margin: '0 auto' },

  backBtn: {
    fontFamily: 'var(--font-body)', fontSize: '0.85rem', color: 'var(--color-gold)',
    background: 'none', border: 'none', cursor: 'pointer', padding: '8px 0',
    marginBottom: '24px', display: 'inline-block',
  },

  title: {
    fontFamily: 'var(--font-heading)',
    fontSize: 'clamp(1.5rem, 5vw, 2rem)',
    fontWeight: 700, color: 'var(--color-cream)', marginBottom: '8px',
    letterSpacing: '0.15em', textTransform: 'uppercase',
  },
  subtitle: {
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', marginBottom: '32px', lineHeight: 1.5,
  },

  label: {
    fontFamily: 'var(--font-body)', fontSize: '0.8rem', fontWeight: 600,
    color: 'var(--color-cream)', display: 'block', marginBottom: '8px',
    letterSpacing: '0.03em',
  },
  optional: { fontWeight: 300, color: 'var(--color-cream-muted)', opacity: 0.5 },

  input: {
    width: '100%', padding: '13px 16px',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 300, color: 'var(--color-cream)',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px', outline: 'none', marginBottom: '20px', boxSizing: 'border-box',
    transition: 'border-color 0.4s ease',
  },
  textarea: {
    width: '100%', padding: '13px 16px', minHeight: '200px', resize: 'vertical',
    fontFamily: 'var(--font-body)', fontSize: '0.88rem', fontWeight: 300, color: 'var(--color-cream)',
    background: 'rgba(255,255,255,0.02)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px', outline: 'none', marginBottom: '20px', boxSizing: 'border-box',
    lineHeight: 1.6,
  },

  pillGrid: { display: 'flex', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' },
  pill: {
    fontFamily: 'var(--font-body)', fontSize: '0.75rem', fontWeight: 300,
    color: 'var(--color-cream-muted)', background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)', borderRadius: '12px',
    padding: '8px 16px', cursor: 'pointer', transition: 'all 0.4s ease',
  },
  pillActive: {
    color: 'var(--color-gold)', borderColor: 'rgba(184,148,95,0.4)',
    background: 'rgba(184,148,95,0.1)',
  },

  autocompleteWrap: { position: 'relative' },
  suggestions: {
    position: 'absolute', top: '48px', left: 0, right: 0, zIndex: 10,
    background: 'rgba(30,28,26,0.97)', border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px', overflow: 'hidden',
  },
  suggestionItem: {
    width: '100%', padding: '10px 16px', textAlign: 'left',
    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300, color: 'var(--color-cream)',
    background: 'none', border: 'none', borderBottom: '1px solid rgba(255,255,255,0.04)',
    cursor: 'pointer',
  },

  submitBtn: {
    fontFamily: 'var(--font-body)', fontSize: '0.9rem', fontWeight: 700,
    color: 'var(--color-cream)', padding: '14px 32px', cursor: 'pointer',
    letterSpacing: '0.15em', textTransform: 'uppercase',
    display: 'block', width: '100%', textAlign: 'center',
    transition: 'opacity 0.4s ease',
  },

  toast: {
    position: 'fixed', bottom: '100px', left: '50%', transform: 'translateX(-50%)',
    fontFamily: 'var(--font-body)', fontSize: '0.85rem', fontWeight: 300,
    color: 'var(--color-cream)', background: 'rgba(91,140,106,0.2)',
    border: '1px solid rgba(91,140,106,0.3)', borderRadius: '12px',
    padding: '14px 24px', zIndex: 1000, whiteSpace: 'nowrap',
  },
};

export default CreatePost;
