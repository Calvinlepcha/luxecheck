import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { brands, getBrandModels } from '../data/bags';
import BackgroundImage from '../components/BackgroundImage';
import BagImage from '../components/BagImage';

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
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
    padding: '28px 24px',
    cursor: 'pointer',
    transition: 'all 0.25s ease',
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    gap: '16px',
  },

  cardImage: {
    width: '64px',
    height: '64px',
    borderRadius: '4px',
    objectFit: 'cover',
    flexShrink: 0,
    background: 'var(--color-border)',
  },

  cardContent: {
    flex: 1,
    minWidth: 0,
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
    color: 'var(--color-cream-muted)',
    lineHeight: 1.5,
    marginTop: '4px',
  },

  cardArrow: {
    position: 'absolute',
    right: '24px',
    top: '50%',
    transform: 'translateY(-50%)',
    fontFamily: 'var(--font-body)',
    fontSize: '1.25rem',
    color: 'var(--color-gold)',
    opacity: 0.5,
    transition: 'all 0.25s ease',
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
};

function Scan() {
  const navigate = useNavigate();
  const [selectedBrand, setSelectedBrand] = useState(null);
  const models = selectedBrand ? getBrandModels(selectedBrand.id) : [];

  const handleCardHover = (e, enter) => {
    e.currentTarget.style.borderColor = enter
      ? 'var(--color-gold)'
      : 'var(--color-border)';
    e.currentTarget.style.transform = enter ? 'translateX(4px)' : 'translateX(0)';
    const arrow = e.currentTarget.querySelector('[data-arrow]');
    if (arrow) {
      arrow.style.opacity = enter ? '1' : '0.5';
      arrow.style.right = enter ? '20px' : '24px';
    }
  };

  return (
    <div style={styles.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=1920" opacity={0.08} />
      {selectedBrand ? (
        <>
          <button
            style={styles.backButton}
            onClick={() => setSelectedBrand(null)}
          >
            &larr; All Brands
          </button>
          <h1 style={styles.heading}>{selectedBrand.name}</h1>
          <p style={{ ...styles.sectionLabel, marginBottom: '24px' }}>
            Select a model
          </p>
          <div style={styles.grid}>
            {models.map((bag) => (
              <div
                key={bag.id}
                style={styles.card}
                onClick={() => navigate(`/checklist/${bag.brandId}/${bag.modelId}`)}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') navigate(`/checklist/${bag.brandId}/${bag.modelId}`);
                }}
              >
                <BagImage
                  src={bag.image}
                  alt={bag.model}
                  fallbackText={bag.model}
                  style={styles.cardImage}
                />
                <div style={styles.cardContent}>
                  <div style={styles.cardName}>{bag.model}</div>
                  <div style={styles.cardDescription}>{bag.description}</div>
                  <div style={styles.checkpointCount}>
                    {bag.checkpoints.length} checkpoints
                  </div>
                </div>
                <span data-arrow style={styles.cardArrow}>&rsaquo;</span>
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
          <div style={styles.sectionLabel}>Available brands</div>
          <div style={styles.grid}>
            {brands.map((brand) => (
              <div
                key={brand.id}
                style={styles.card}
                onClick={() => setSelectedBrand(brand)}
                onMouseEnter={(e) => handleCardHover(e, true)}
                onMouseLeave={(e) => handleCardHover(e, false)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === 'Enter') setSelectedBrand(brand);
                }}
              >
                <BagImage
                  src={brand.image}
                  alt={brand.name}
                  fallbackText={brand.name}
                  style={styles.cardImage}
                />
                <div style={styles.cardContent}>
                  <div style={styles.cardName}>{brand.name}</div>
                  <div style={styles.cardTagline}>{brand.tagline}</div>
                </div>
                <span data-arrow style={styles.cardArrow}>&rsaquo;</span>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Scan;
