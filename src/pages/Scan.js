import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { brands, getBrandModels } from '../data/bags';
import BackgroundImage from '../components/BackgroundImage';
import BagImage from '../components/BagImage';
import ImageModal from '../components/ImageModal';
import useScrollReveal from '../hooks/useScrollReveal';

const isTouchDevice = () =>
  window.matchMedia('(hover: none)').matches;

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
    marginBottom: '12px',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    textShadow: '0 0 40px rgba(184, 148, 95, 0.05)',
  },

  comingSoon: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    color: 'var(--color-gold)',
    marginBottom: '40px',
    fontStyle: 'italic',
    opacity: 0.8,
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
};

function Scan() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [modalImage, setModalImage] = useState(null);
  const touchRef = useRef(isTouchDevice());
  const allModels = selectedBrand ? getBrandModels(selectedBrand.id) : [];
  const models = searchQuery
    ? allModels.filter((bag) => bag.model.toLowerCase().includes(searchQuery.toLowerCase()))
    : allModels;
  const filteredBrands = searchQuery
    ? brands.filter((b) => b.name.toLowerCase().includes(searchQuery.toLowerCase()))
    : brands;

  useScrollReveal([selectedBrand?.id]);

  // 3D tilt on mousemove (desktop only)
  const handleCardMove = (e) => {
    if (touchRef.current) return;
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width;
    const y = (e.clientY - rect.top) / rect.height;
    const rotateX = (0.5 - y) * 6;  // ±3 degrees
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

  return (
    <div style={styles.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1564842505181-8862a3b9b173?w=1920&q=80" opacity={0.20} />
      {modalImage && (
        <ImageModal src={modalImage.src} alt={modalImage.alt} onClose={() => setModalImage(null)} />
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
          <p style={styles.comingSoon}>
            More brands coming soon — Herm&egrave;s, Dior, Prada
          </p>
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
          <div style={styles.sectionLabel}>Available brands</div>
          <div style={styles.grid}>
            {filteredBrands.map((brand, i) => (
              <div
                key={brand.id}
                className="tilt-card reveal glass-card"
                style={{ ...styles.card, transitionDelay: `${i * 100}ms` }}
                onClick={() => { setSelectedBrand(brand); setSearchQuery(''); }}
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
    </div>
  );
}

export default Scan;
