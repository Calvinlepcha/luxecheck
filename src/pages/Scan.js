import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { brands, getBrandModels } from '../data/bags';
import BackgroundImage from '../components/BackgroundImage';
import BagImage from '../components/BagImage';
import ImageModal from '../components/ImageModal';
import useScrollReveal from '../hooks/useScrollReveal';

const isTouchDevice = () =>
  window.matchMedia('(hover: none)').matches;

// Map brandIds to their product category for filtering
const WATCH_BRANDS = new Set(['rolex', 'cartier', 'omega', 'patek-philippe', 'audemars-piguet', 'tag-heuer']);
const SHOE_BRANDS = new Set(['christian-louboutin', 'jimmy-choo', 'nike', 'adidas-yeezy']);
const getBrandCategory = (brandId) => {
  if (WATCH_BRANDS.has(brandId)) return 'Watches';
  if (SHOE_BRANDS.has(brandId)) return 'Shoes';
  return 'Bags';
};

// ─── Coming Soon Brands (categories without full checklists yet) ──
const COMING_SOON = [
  // Perfume
  { name: 'Tom Ford', category: 'Perfume' },
  { name: 'Creed', category: 'Perfume' },
  { name: 'Maison Francis Kurkdjian', category: 'Perfume' },
  { name: 'Le Labo', category: 'Perfume' },
  { name: 'Byredo', category: 'Perfume' },
  // Jewelry
  { name: 'Tiffany & Co', category: 'Jewelry' },
  { name: 'Van Cleef & Arpels', category: 'Jewelry' },
  { name: 'Bvlgari', category: 'Jewelry' },
  { name: 'Chopard', category: 'Jewelry' },
];

const CATEGORY_TABS = ['All', 'Bags', 'Watches', 'Shoes', 'Perfume', 'Jewelry'];

const styles = {
  page: {
    minHeight: '100vh',
    padding: '60px 24px 40px',
    maxWidth: '600px',
    margin: '0 auto',
  },

  backButton: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: 'var(--color-gold)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '0',
    marginBottom: '40px',
    display: 'inline-block',
    letterSpacing: '0.05em',
  },

  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '8px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textShadow: '0 0 40px rgba(184, 148, 95, 0.05)',
  },

  brandCount: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 300,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '28px',
    opacity: 0.7,
  },

  grid: {
    display: 'grid',
    gap: '16px',
  },

  card: {
    cursor: 'pointer',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
  },

  cardImageWrap: {
    position: 'relative',
    width: '100%',
    overflow: 'hidden',
  },

  cardImage: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    display: 'block',
    background: 'rgba(255, 255, 255, 0.02)',
  },

  cardContent: {
    padding: '24px',
    flex: 1,
    position: 'relative',
  },

  cardName: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '4px',
  },

  cardTagline: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--color-cream-muted)',
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
  },

  cardDescription: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    lineHeight: 1.7,
    marginTop: '4px',
  },

  checkpointCount: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--color-gold)',
    marginTop: '8px',
    letterSpacing: '0.05em',
  },

  sectionLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    marginBottom: '20px',
    opacity: 0.7,
  },

  aiHint: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 300,
    color: '#D4B978',
    letterSpacing: '0.03em',
    marginBottom: '20px',
    lineHeight: 1.7,
    opacity: 0.8,
  },

  searchWrapper: {
    position: 'relative',
    marginBottom: '20px',
  },

  searchInput: {
    width: '100%',
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    color: 'var(--color-cream)',
    padding: '12px 40px 12px 16px',
    outline: 'none',
    letterSpacing: '0.02em',
    WebkitAppearance: 'none',
  },

  clearBtn: {
    position: 'absolute',
    right: '12px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: 'var(--font-body)',
    fontSize: '1.2rem',
    color: 'var(--color-cream-muted)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '4px',
    lineHeight: 1,
  },

  expandIcon: {
    position: 'absolute',
    top: '10px',
    right: '10px',
    background: 'rgba(0,0,0,0.4)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '50%',
    width: '32px',
    height: '32px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: '#fff',
    fontSize: '0.8rem',
    cursor: 'pointer',
    zIndex: 2,
  },

  // Category filter tabs
  tabsScroll: {
    overflowX: 'auto',
    marginBottom: '20px',
    WebkitOverflowScrolling: 'touch',
  },
  tabs: {
    display: 'flex',
    gap: '6px',
    minWidth: 'max-content',
  },
  tab: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.73rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    background: 'rgba(255,255,255,0.02)',
    border: '1px solid rgba(255,255,255,0.04)',
    borderRadius: '12px',
    padding: '7px 14px',
    cursor: 'pointer',
    whiteSpace: 'nowrap',
    transition: 'all 0.4s ease',
  },
  tabActive: {
    color: 'var(--color-gold)',
    background: 'rgba(184,148,95,0.12)',
    borderColor: 'rgba(184,148,95,0.25)',
  },

  // More brands expand button
  expandBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 600,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    background: 'none',
    border: '1px solid rgba(184,148,95,0.25)',
    borderRadius: '12px',
    padding: '14px 24px',
    cursor: 'pointer',
    width: '100%',
    marginTop: '28px',
    transition: 'all 0.4s ease',
  },

  // Coming soon card (smaller)
  comingSoonGrid: {
    display: 'grid',
    gridTemplateColumns: 'repeat(2, 1fr)',
    gap: '12px',
    marginTop: '16px',
    overflow: 'hidden',
    transition: 'max-height 0.5s ease, opacity 0.4s ease',
  },
  comingSoonCard: {
    cursor: 'pointer',
    padding: '20px 16px',
    textAlign: 'center',
    position: 'relative',
    borderRadius: '12px',
    transition: 'all 0.4s ease',
  },
  comingSoonName: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1rem',
    fontWeight: 500,
    color: 'var(--color-cream)',
    marginBottom: '4px',
    letterSpacing: '0.05em',
  },
  comingSoonCategory: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    fontWeight: 300,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: 'var(--color-cream-muted)',
    opacity: 0.6,
  },
  comingSoonBadge: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.55rem',
    fontWeight: 600,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    opacity: 0.5,
    marginTop: '8px',
    display: 'block',
  },

  // Coming soon modal overlay
  overlay: {
    position: 'fixed',
    inset: 0,
    background: 'rgba(0,0,0,0.7)',
    backdropFilter: 'blur(8px)',
    WebkitBackdropFilter: 'blur(8px)',
    zIndex: 1000,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '24px',
  },
  modal: {
    maxWidth: '380px',
    width: '100%',
    padding: '36px 28px',
    borderRadius: '12px',
    textAlign: 'center',
  },
  modalBrand: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '8px',
    letterSpacing: '0.08em',
  },
  modalText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.88rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream-muted)',
    marginBottom: '24px',
  },
  modalBtnGroup: {
    display: 'flex',
    flexDirection: 'column',
    gap: '10px',
  },
  modalPrimaryBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.85rem',
    fontWeight: 700,
    letterSpacing: '0.08em',
    textTransform: 'uppercase',
    color: 'var(--color-cream)',
    padding: '14px 24px',
    cursor: 'pointer',
    width: '100%',
  },
  modalSecondaryBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 600,
    color: 'var(--color-gold)',
    padding: '12px 24px',
    cursor: 'pointer',
    width: '100%',
  },
  modalNotified: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 300,
    color: 'var(--color-gold)',
    opacity: 0.8,
    marginTop: '4px',
  },
  modalClose: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    color: 'var(--color-cream-muted)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    marginTop: '12px',
    opacity: 0.5,
  },
};

function Scan() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const [categoryFilter, setCategoryFilter] = useState('All');
  const [expanded, setExpanded] = useState(() => {
    try { return sessionStorage.getItem('luxecheck_brands_expanded') === 'true'; }
    catch { return false; }
  });
  const [comingSoonModal, setComingSoonModal] = useState(null);
  const [notified, setNotified] = useState(false);
  const touchRef = useRef(isTouchDevice());

  const allModels = selectedBrand ? getBrandModels(selectedBrand.id) : [];
  const models = searchQuery
    ? allModels.filter((bag) => bag.model.toLowerCase().includes(searchQuery.toLowerCase()))
    : allModels;

  // Filter brands by search and category
  const filteredFeaturedBrands = brands.filter((b) => {
    if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (categoryFilter !== 'All' && getBrandCategory(b.id) !== categoryFilter) return false;
    return true;
  });

  const filteredComingSoon = COMING_SOON.filter((b) => {
    if (searchQuery && !b.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    if (categoryFilter !== 'All' && b.category !== categoryFilter) return false;
    return true;
  });

  useEffect(() => {
    try { sessionStorage.setItem('luxecheck_brands_expanded', expanded ? 'true' : 'false'); }
    catch {}
  }, [expanded]);

  useScrollReveal([selectedBrand?.id, categoryFilter, expanded]);

  const handleCardMove = (e) => {
    if (touchRef.current) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 6;
    const rotateY = (x - 0.5) * 6;
    card.style.transition = 'border-color 0.4s ease, box-shadow 0.4s ease';
    card.style.transform = `perspective(800px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  };

  const handleCardEnter = (e) => {
    e.currentTarget.style.borderColor = 'var(--color-gold)';
  };

  const handleCardLeave = (e) => {
    const card = e.currentTarget;
    card.style.transition = 'transform 0.4s ease, border-color 0.4s ease, box-shadow 0.4s ease';
    card.style.transform = '';
    card.style.borderColor = 'var(--color-border)';
  };

  const handleNotify = (brandName) => {
    try {
      const existing = JSON.parse(localStorage.getItem('luxecheck_notify_brands') || '[]');
      if (!existing.includes(brandName)) {
        existing.push(brandName);
        localStorage.setItem('luxecheck_notify_brands', JSON.stringify(existing));
      }
    } catch {}
    setNotified(true);
  };

  const handleChatWithExpert = (brandName) => {
    setComingSoonModal(null);
    // Dispatch custom event to open chatbot with pre-filled message
    window.dispatchEvent(new CustomEvent('luxecheck-open-chat', {
      detail: { message: `Tell me about authenticating ${brandName} products` },
    }));
  };

  return (
    <div style={styles.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1564842505181-8862a3b9b173?w=1920&q=80" opacity={0.20} />
      {modalImage && (
        <ImageModal src={modalImage.src} alt={modalImage.alt} onClose={() => setModalImage(null)} />
      )}

      {/* Coming Soon Modal */}
      {comingSoonModal && (
        <div style={styles.overlay} onClick={() => { setComingSoonModal(null); setNotified(false); }}>
          <div className="glass-card" style={styles.modal} onClick={(e) => e.stopPropagation()}>
            <div style={styles.modalBrand}>{comingSoonModal.name}</div>
            <p style={styles.modalText}>
              {comingSoonModal.name} authentication checklist coming soon!
              In the meantime, ask our AI Expert chatbot for authentication tips on {comingSoonModal.name}.
            </p>
            <div style={styles.modalBtnGroup}>
              <button
                className="btn-luxe glass-btn-primary"
                style={styles.modalPrimaryBtn}
                onClick={() => handleChatWithExpert(comingSoonModal.name)}
              >
                Chat with Expert
              </button>
              <button
                className="btn-luxe glass-btn-secondary"
                style={styles.modalSecondaryBtn}
                onClick={() => handleNotify(comingSoonModal.name)}
              >
                {notified ? '\u2713 Saved' : 'Notify Me'}
              </button>
              {notified && (
                <span style={styles.modalNotified}>We'll let you know when it's ready</span>
              )}
            </div>
            <button style={styles.modalClose} onClick={() => { setComingSoonModal(null); setNotified(false); }}>
              Close
            </button>
          </div>
        </div>
      )}

      {selectedBrand ? (
        <>
          <button
            className="btn-luxe"
            style={styles.backButton}
            onClick={() => { setSelectedBrand(null); setSearchQuery(''); }}
          >
            &larr; All Brands
          </button>
          <h1 style={styles.heading}>{selectedBrand.name}</h1>
          <p style={{ ...styles.sectionLabel, marginBottom: '16px' }}>
            Select a model
          </p>
          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search models..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
              style={styles.searchInput}
            />
            {searchQuery && (
              <button style={styles.clearBtn} onClick={() => setSearchQuery('')}>
                {'\u00d7'}
              </button>
            )}
          </div>
          <p style={styles.aiHint}>AI analysis will guide you through authentication checkpoints for each item</p>
          <div style={styles.grid}>
            {models.map((bag, i) => (
              <div
                key={bag.id}
                className="tilt-card reveal glass-card"
                style={{ ...styles.card, transitionDelay: `${i * 100}ms` }}
                onClick={() => navigate(`/checklist/${bag.brandId}/${bag.modelId}`)}
                onMouseMove={handleCardMove}
                onMouseEnter={handleCardEnter}
                onMouseLeave={handleCardLeave}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/checklist/${bag.brandId}/${bag.modelId}`);
                }}
              >
                <div className="card-zoom-wrap" style={styles.cardImageWrap}>
                  <BagImage
                    src={bag.image}
                    alt={bag.model}
                    fallbackText={bag.model}
                    style={styles.cardImage}
                    className="scan-card-img card-zoom-img"
                  />
                  <button
                    style={styles.expandIcon}
                    onClick={(e) => {
                      e.stopPropagation();
                      setModalImage({ src: bag.image, alt: bag.model });
                    }}
                    title="View full image"
                  >
                    {'\u26F6'}
                  </button>
                </div>
                <div style={styles.cardContent}>
                  <div style={styles.cardName}>{bag.model}</div>
                  <div style={styles.cardDescription}>{bag.description}</div>
                  <div style={styles.checkpointCount}>
                    {bag.checkpoints.length} checkpoints
                  </div>
                </div>
              </div>
            ))}
          </div>
        </>
      ) : (
        <>
          <h1 style={styles.heading}>Select Brand</h1>
          <div style={styles.brandCount}>30+ luxury brands covered</div>

          <div style={styles.searchWrapper}>
            <input
              type="text"
              placeholder="Search brands..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="glass-input"
              style={styles.searchInput}
            />
            {searchQuery && (
              <button style={styles.clearBtn} onClick={() => setSearchQuery('')}>
                {'\u00d7'}
              </button>
            )}
          </div>

          {/* Category filter tabs */}
          <div style={styles.tabsScroll}>
            <div style={styles.tabs}>
              {CATEGORY_TABS.map((tab) => (
                <button
                  key={tab}
                  style={{ ...styles.tab, ...(categoryFilter === tab ? styles.tabActive : {}) }}
                  onClick={() => setCategoryFilter(tab)}
                >
                  {tab}
                </button>
              ))}
            </div>
          </div>

          {/* Featured brands (with full cards + images) */}
          {filteredFeaturedBrands.length > 0 && (
            <>
              <div style={styles.sectionLabel}>Featured brands</div>
              <div style={styles.grid}>
                {filteredFeaturedBrands.map((brand, i) => (
                  <div
                    key={brand.id}
                    className="tilt-card reveal glass-card"
                    style={{ ...styles.card, transitionDelay: `${i * 100}ms` }}
                    onClick={() => { setSelectedBrand(brand); setSearchQuery(''); setCategoryFilter('All'); }}
                    onMouseMove={handleCardMove}
                    onMouseEnter={handleCardEnter}
                    onMouseLeave={handleCardLeave}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') setSelectedBrand(brand);
                    }}
                  >
                    <div className="card-zoom-wrap" style={styles.cardImageWrap}>
                      <BagImage
                        src={brand.image}
                        alt={brand.name}
                        fallbackText={brand.name}
                        style={styles.cardImage}
                        className="scan-card-img card-zoom-img"
                      />
                      <button
                        style={styles.expandIcon}
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalImage({ src: brand.image, alt: brand.name });
                        }}
                        title="View full image"
                      >
                        {'\u26F6'}
                      </button>
                    </div>
                    <div style={styles.cardContent}>
                      <div style={styles.cardName}>{brand.name}</div>
                      <div style={styles.cardTagline}>{brand.tagline}</div>
                    </div>
                  </div>
                ))}
              </div>
            </>
          )}

          {/* Expand / collapse more brands */}
          {(categoryFilter === 'All' && !searchQuery) ? (
            <button
              style={styles.expandBtn}
              onClick={() => setExpanded(!expanded)}
            >
              {expanded ? 'Show Less' : 'Explore All 30+ Brands'}
            </button>
          ) : null}

          {/* Coming soon brands grid */}
          {(expanded || categoryFilter !== 'All' || searchQuery) && filteredComingSoon.length > 0 && (
            <>
              {!searchQuery && categoryFilter === 'All' && (
                <div style={{ ...styles.sectionLabel, marginTop: '28px' }}>More brands</div>
              )}
              {(searchQuery || categoryFilter !== 'All') && filteredFeaturedBrands.length === 0 && filteredComingSoon.length > 0 && (
                <div style={{ ...styles.sectionLabel, marginTop: '8px' }}>Coming soon</div>
              )}
              <div style={styles.comingSoonGrid}>
                {filteredComingSoon.map((brand) => (
                  <div
                    key={brand.name}
                    className="glass-card"
                    style={styles.comingSoonCard}
                    onClick={() => { setComingSoonModal(brand); setNotified(false); }}
                    role="button"
                    tabIndex={0}
                    onKeyDown={(e) => {
                      if (e.key === 'Enter') { setComingSoonModal(brand); setNotified(false); }
                    }}
                  >
                    <div style={styles.comingSoonName}>{brand.name}</div>
                    <div style={styles.comingSoonCategory}>{brand.category}</div>
                    <span style={styles.comingSoonBadge}>Coming Soon</span>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

export default Scan;
