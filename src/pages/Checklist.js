import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBag } from '../data/bags';
import BagImage from '../components/BagImage';
import ImageModal from '../components/ImageModal';
import ChecklistBackground from '../components/ChecklistBackground';
import BackgroundImage from '../components/BackgroundImage';

const categoryIcons = {
  stitching: '\u2704',
  hardware: '\u2699',
  leather: '\u25C8',
  logo: '\u2606',
  interior: '\u25A3',
  serial: '#',
  construction: '\u25B3',
};

const ANSWER = { pass: 'pass', fail: 'fail', unsure: 'unsure' };

function Checklist() {
  const { brandId, modelId } = useParams();
  const navigate = useNavigate();
  const bag = getBag(brandId, modelId);

  const [currentIndex, setCurrentIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [animDir, setAnimDir] = useState(null); // 'left' | 'right' | null
  const [animating, setAnimating] = useState(false);
  const [modalImage, setModalImage] = useState(null);

  const total = bag ? bag.checkpoints.length : 0;
  const checkpoint = bag ? bag.checkpoints[currentIndex] : null;

  const animateTo = useCallback((nextIndex, direction) => {
    if (animating) return;
    setAnimating(true);
    setAnimDir(direction);
    setTimeout(() => {
      setCurrentIndex(nextIndex);
      setAnimDir(direction === 'left' ? 'enter-right' : 'enter-left');
      setTimeout(() => {
        setAnimDir(null);
        setAnimating(false);
      }, 250);
    }, 250);
  }, [animating]);

  const handleAnswer = useCallback((value) => {
    if (animating) return;
    setAnswers((prev) => ({ ...prev, [checkpoint.id]: value }));

    if (currentIndex < total - 1) {
      animateTo(currentIndex + 1, 'left');
    } else {
      // Last checkpoint — calculate and go to results
      const finalAnswers = { ...answers, [checkpoint.id]: value };
      let earned = 0;
      let max = 0;
      const details = bag.checkpoints.map((cp) => {
        max += cp.weight;
        const ans = finalAnswers[cp.id];
        let points = 0;
        if (ans === ANSWER.pass) points = cp.weight;
        else if (ans === ANSWER.unsure) points = cp.weight * 0.5;
        earned += points;
        return { ...cp, answer: ans, points };
      });
      const percentage = max > 0 ? Math.round((earned / max) * 100) : 0;
      navigate('/results', {
        state: {
          bag: {
            brand: bag.brand,
            model: bag.model,
            brandId: bag.brandId,
            modelId: bag.modelId,
            image: bag.image,
            commonFakes: bag.commonFakes,
            yearVariations: bag.yearVariations,
            resaleRange: bag.resaleRange,
          },
          details,
          earned,
          max,
          percentage,
        },
      });
    }
  }, [animating, answers, bag, checkpoint, currentIndex, total, navigate, animateTo]);

  const handleBack = useCallback(() => {
    if (currentIndex > 0 && !animating) {
      animateTo(currentIndex - 1, 'right');
    }
  }, [currentIndex, animating, animateTo]);

  // Keyboard nav
  useEffect(() => {
    const handler = (e) => {
      if (e.key === 'ArrowLeft' || e.key === 'Backspace') handleBack();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleBack]);

  if (!bag) {
    return (
      <div style={s.page}>
        <div style={{ textAlign: 'center', paddingTop: '120px' }}>
          <h1 style={s.heading}>Bag Not Found</h1>
          <button style={s.backBtn} onClick={() => navigate('/scan')}>
            &larr; Back to Brands
          </button>
        </div>
      </div>
    );
  }

  const getSlideStyle = () => {
    if (animDir === 'left') return { transform: 'translateX(-110%)', opacity: 0 };
    if (animDir === 'right') return { transform: 'translateX(110%)', opacity: 0 };
    if (animDir === 'enter-right') return { transform: 'translateX(0)', opacity: 1 };
    if (animDir === 'enter-left') return { transform: 'translateX(0)', opacity: 1 };
    return { transform: 'translateX(0)', opacity: 1 };
  };

  const currentAnswer = answers[checkpoint.id];
  const refImage = checkpoint.image || bag.image;

  const checklistProgress = total > 0 ? (currentIndex + 1) / total : 0;

  return (
    <div style={s.page}>
      <BackgroundImage url="https://images.unsplash.com/photo-1564842505181-8862a3b9b173?w=1920&q=80" opacity={0.12} />
      <ChecklistBackground progress={checklistProgress} />
      {modalImage && (
        <ImageModal src={modalImage.src} alt={modalImage.alt} onClose={() => setModalImage(null)} />
      )}
      {/* Header */}
      <div style={s.header}>
        <button style={s.backBtn} onClick={() => currentIndex === 0 ? navigate(`/scan`) : handleBack()}>
          &larr; {currentIndex === 0 ? 'Back' : 'Previous'}
        </button>
        <div style={s.headerRight}>
          <span style={s.stepLabel}>
            Checkpoint {currentIndex + 1} of {total}
          </span>
        </div>
      </div>

      {/* AI info card — show only on first checkpoint */}
      {currentIndex === 0 && (
        <div className="glass-card" style={s.aiInfoCard}>
          <span style={s.aiInfoTitle}>LuxeCheck AI</span>
          <p style={s.aiInfoText}>
            You're using an intelligent authentication guide that walks you through the same checkpoints professional authenticators use. Your visual inspection combined with our AI knowledge base gives you a detailed authenticity assessment.
          </p>
        </div>
      )}

      {/* Progress bar */}
      <div className="glass-progress-track" style={{ ...s.progressTrack, overflow: 'visible' }}>
        <div
          className="progress-sparkle"
          style={{
            ...s.progressFill,
            width: `${((currentIndex + 1) / total) * 100}%`,
          }}
        />
      </div>

      {/* Brand / Model subtitle */}
      <div style={s.subtitle}>
        {bag.brand} &middot; {bag.model}
      </div>

      {/* Checkpoint card */}
      <div style={s.cardWrapper}>
        <div
          className="glass-card"
          style={{
            ...s.card,
            ...getSlideStyle(),
            transition: 'transform 0.25s ease, opacity 0.4s ease',
          }}
        >
          {/* Category + Name */}
          <div style={s.categoryRow}>
            <span style={s.categoryIcon}>
              {categoryIcons[checkpoint.category] || '\u25CF'}
            </span>
            <span style={s.categoryName}>{checkpoint.category}</span>
          </div>
          <h2 style={s.checkpointName}>{checkpoint.name}</h2>

          {/* What to look for */}
          <p style={s.description}>{checkpoint.description}</p>

          {/* Reference photo — large, tappable */}
          <div
            style={s.refPhotoWrap}
            onClick={() => setModalImage({ src: refImage, alt: `${bag.brand} ${bag.model} — ${checkpoint.name}` })}
            role="button"
            tabIndex={0}
          >
            <BagImage
              src={refImage}
              alt={`${bag.brand} ${bag.model} — ${checkpoint.name}`}
              fallbackText={`${bag.brand} ${bag.model}`}
              style={s.referencePhoto}
              className="checklist-ref-img"
            />
            <span style={s.tapHint}>Tap to enlarge</span>
          </div>

          {/* Auth vs Fake comparison with images */}
          <div style={s.comparisonGrid} data-comparison-grid="">
            <div style={s.authSection}>
              <div style={s.sectionHeader}>
                <span style={s.passIcon}>{'\u2713'}</span> Authentic
              </div>
              <div
                style={s.compRefWrap}
                onClick={() => setModalImage({ src: refImage, alt: `Authentic — ${checkpoint.name}` })}
                role="button"
                tabIndex={0}
              >
                <BagImage
                  src={refImage}
                  alt={`Authentic — ${checkpoint.name}`}
                  fallbackText="Authentic"
                  style={s.compRefImage}
                  className="comp-ref-img"
                />
              </div>
              <p style={s.sectionText}>{checkpoint.passDescription}</p>
            </div>
            <div style={s.fakeSection}>
              <div style={s.sectionHeader}>
                <span style={s.failIcon}>{'\u2717'}</span> Fake
              </div>
              <div
                style={s.compRefWrap}
                onClick={() => setModalImage({ src: bag.image, alt: `Fake reference — ${checkpoint.name}` })}
                role="button"
                tabIndex={0}
              >
                <BagImage
                  src={bag.image}
                  alt={`Fake reference — ${checkpoint.name}`}
                  fallbackText="Fake"
                  style={s.compRefImage}
                  className="comp-ref-img"
                />
              </div>
              <p style={s.sectionText}>{checkpoint.failDescription}</p>
            </div>
          </div>

          {/* Answer buttons */}
          <div style={s.buttonGroup} data-answer-buttons="">
            <button
              style={{
                ...s.answerBtn,
                ...s.passBtn,
                ...(currentAnswer === ANSWER.pass ? s.passBtnActive : {}),
              }}
              onClick={() => handleAnswer(ANSWER.pass)}
              className="btn-luxe glass-btn-pass"
            >
              {'\u2713'} Matches Real
            </button>
            <button
              className="btn-luxe glass-btn-fail"
              style={{
                ...s.answerBtn,
                ...s.failBtn,
                ...(currentAnswer === ANSWER.fail ? s.failBtnActive : {}),
              }}
              onClick={() => handleAnswer(ANSWER.fail)}
            >
              {'\u2717'} Matches Fake
            </button>
            <button
              className="btn-luxe glass-btn-unsure"
              style={{
                ...s.answerBtn,
                ...s.unsureBtn,
                ...(currentAnswer === ANSWER.unsure ? s.unsureBtnActive : {}),
              }}
              onClick={() => handleAnswer(ANSWER.unsure)}
            >
              ? Not Sure
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// ─── Styles ──────────────────────────────────────────────────
const s = {
  page: {
    minHeight: '100vh',
    padding: '24px 16px 40px',
    maxWidth: '600px',
    margin: '0 auto',
    overflow: 'hidden',
    position: 'relative',
    zIndex: 1,
  },

  header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: '16px',
  },

  backBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.875rem',
    color: 'var(--color-gold)',
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px 0',
    letterSpacing: '0.03em',
  },

  headerRight: {
    textAlign: 'right',
  },

  stepLabel: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    color: 'var(--color-cream-muted)',
    letterSpacing: '0.05em',
  },

  aiInfoCard: {
    padding: '16px 20px',
    marginBottom: '16px',
    borderRadius: '12px',
    border: '1px solid rgba(184, 148, 95, 0.12)',
  },
  aiInfoTitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '11px',
    fontWeight: 600,
    letterSpacing: '0.12em',
    textTransform: 'uppercase',
    color: '#D4B978',
    display: 'block',
    marginBottom: '6px',
  },
  aiInfoText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    lineHeight: 1.7,
    color: 'var(--color-cream-muted)',
    margin: 0,
  },

  progressTrack: {
    width: '100%',
    height: '4px',
    marginBottom: '20px',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: 'var(--color-gold)',
    borderRadius: '6px',
    transition: 'width 0.4s ease',
    boxShadow: 'inset 0 0 4px rgba(184, 148, 95, 0.3), 0 0 8px rgba(184, 148, 95, 0.15)',
    opacity: 0.9,
  },

  subtitle: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.2em',
    textTransform: 'uppercase',
    color: 'var(--color-cream-muted)',
    marginBottom: '20px',
    opacity: 0.6,
  },

  heading: {
    fontFamily: 'var(--font-heading)',
    fontSize: '2rem',
    color: 'var(--color-cream)',
  },

  cardWrapper: {
    overflow: 'hidden',
    position: 'relative',
  },

  card: {
    padding: '28px 24px 32px',
  },

  categoryRow: {
    display: 'flex',
    alignItems: 'center',
    gap: '8px',
    marginBottom: '8px',
  },

  categoryIcon: {
    fontSize: '1rem',
    color: 'var(--color-gold)',
    width: '20px',
    textAlign: 'center',
  },

  categoryName: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.7rem',
    fontWeight: 500,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    color: 'var(--color-gold)',
    opacity: 0.8,
  },

  checkpointName: {
    fontFamily: 'var(--font-heading)',
    fontSize: '1.5rem',
    fontWeight: 600,
    color: 'var(--color-cream)',
    marginBottom: '16px',
    lineHeight: 1.2,
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
  },

  description: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 300,
    lineHeight: 1.65,
    color: 'var(--color-cream-muted)',
    marginBottom: '20px',
  },

  refPhotoWrap: {
    position: 'relative',
    cursor: 'pointer',
    marginBottom: '24px',
    borderRadius: '12px',
    overflow: 'hidden',
  },

  referencePhoto: {
    width: '100%',
    height: '250px',
    objectFit: 'cover',
    display: 'block',
    background: 'var(--color-surface)',
    border: '1px solid rgba(184, 148, 95, 0.1)',
    borderRadius: '12px',
  },

  tapHint: {
    position: 'absolute',
    bottom: '10px',
    right: '10px',
    fontFamily: 'var(--font-body)',
    fontSize: '0.65rem',
    color: 'rgba(255,255,255,0.7)',
    background: 'rgba(0,0,0,0.55)',
    padding: '4px 10px',
    borderRadius: '3px',
    letterSpacing: '0.04em',
    pointerEvents: 'none',
  },

  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '28px',
  },

  authSection: {
    padding: '16px',
    background: 'rgba(34, 197, 94, 0.04)',
    border: '1px solid rgba(34, 197, 94, 0.12)',
    borderRadius: '12px',
  },

  fakeSection: {
    padding: '16px',
    background: 'rgba(239, 68, 68, 0.04)',
    border: '1px solid rgba(239, 68, 68, 0.12)',
    borderRadius: '12px',
  },

  sectionHeader: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '10px',
    color: 'var(--color-cream)',
  },

  passIcon: {
    color: '#5B8C6A',
    marginRight: '4px',
  },

  failIcon: {
    color: '#A65D5D',
    marginRight: '4px',
  },

  compRefWrap: {
    cursor: 'pointer',
    marginBottom: '10px',
    borderRadius: '8px',
    overflow: 'hidden',
  },

  compRefImage: {
    width: '100%',
    height: '120px',
    objectFit: 'cover',
    display: 'block',
    background: 'var(--color-surface)',
    border: '1px solid rgba(184, 148, 95, 0.08)',
    borderRadius: '8px',
  },

  sectionText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
    fontWeight: 300,
    lineHeight: 1.55,
    color: 'var(--color-cream-muted)',
  },

  buttonGroup: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
  },

  answerBtn: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    fontWeight: 600,
    padding: '16px 12px',
    border: '2px solid transparent',
    borderRadius: 'var(--glass-radius)',
    cursor: 'pointer',
    transition: 'all 0.4s ease',
    letterSpacing: '0.02em',
    WebkitTapHighlightColor: 'transparent',
  },

  passBtn: {
    color: '#5B8C6A',
  },

  passBtnActive: {
    background: 'rgba(34, 197, 94, 0.25)',
    borderColor: '#5B8C6A',
    boxShadow: '0 0 16px rgba(34, 197, 94, 0.15)',
  },

  failBtn: {
    color: '#A65D5D',
  },

  failBtnActive: {
    background: 'rgba(239, 68, 68, 0.25)',
    borderColor: '#A65D5D',
    boxShadow: '0 0 16px rgba(239, 68, 68, 0.15)',
  },

  unsureBtn: {
    color: '#A0A0A0',
    gridColumn: '1 / -1',
  },

  unsureBtnActive: {
    background: 'rgba(156, 163, 175, 0.2)',
    borderColor: '#A0A0A0',
  },
};

export default Checklist;
