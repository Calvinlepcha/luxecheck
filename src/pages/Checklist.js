import React, { useState, useCallback, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { getBag } from '../data/bags';
import BagImage from '../components/BagImage';

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

  return (
    <div style={s.page}>
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

      {/* Progress bar */}
      <div style={s.progressTrack}>
        <div
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
          style={{
            ...s.card,
            ...getSlideStyle(),
            transition: 'transform 0.25s ease, opacity 0.2s ease',
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

          {/* Reference photo */}
          <BagImage
            src={bag.image}
            alt={`${bag.brand} ${bag.model}`}
            fallbackText={`${bag.brand} ${bag.model}`}
            style={s.referencePhoto}
          />

          {/* Auth vs Fake sections */}
          <div style={s.comparisonGrid}>
            <div style={s.authSection}>
              <div style={s.sectionHeader}>
                <span style={s.passIcon}>{'\u2713'}</span> Authentic
              </div>
              <p style={s.sectionText}>{checkpoint.passDescription}</p>
            </div>
            <div style={s.fakeSection}>
              <div style={s.sectionHeader}>
                <span style={s.failIcon}>{'\u2717'}</span> Fake
              </div>
              <p style={s.sectionText}>{checkpoint.failDescription}</p>
            </div>
          </div>

          {/* Answer buttons */}
          <div style={s.buttonGroup}>
            <button
              style={{
                ...s.answerBtn,
                ...s.passBtn,
                ...(currentAnswer === ANSWER.pass ? s.passBtnActive : {}),
              }}
              onClick={() => handleAnswer(ANSWER.pass)}
            >
              {'\u2713'} Matches Real
            </button>
            <button
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

  progressTrack: {
    width: '100%',
    height: '3px',
    backgroundColor: 'var(--color-surface)',
    borderRadius: '2px',
    marginBottom: '20px',
    overflow: 'hidden',
  },

  progressFill: {
    height: '100%',
    backgroundColor: 'var(--color-gold)',
    borderRadius: '2px',
    transition: 'width 0.4s ease',
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
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
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
  },

  description: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.9rem',
    lineHeight: 1.65,
    color: 'var(--color-cream-muted)',
    marginBottom: '20px',
  },

  referencePhoto: {
    width: '100%',
    height: '200px',
    objectFit: 'cover',
    borderRadius: '4px',
    marginBottom: '24px',
    background: 'var(--color-surface)',
    border: '1px solid var(--color-border)',
  },

  comparisonGrid: {
    display: 'grid',
    gridTemplateColumns: '1fr 1fr',
    gap: '12px',
    marginBottom: '28px',
  },

  authSection: {
    padding: '16px',
    background: 'rgba(72, 187, 120, 0.06)',
    border: '1px solid rgba(72, 187, 120, 0.15)',
  },

  fakeSection: {
    padding: '16px',
    background: 'rgba(245, 101, 101, 0.06)',
    border: '1px solid rgba(245, 101, 101, 0.15)',
  },

  sectionHeader: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.75rem',
    fontWeight: 700,
    letterSpacing: '0.1em',
    textTransform: 'uppercase',
    marginBottom: '8px',
    color: 'var(--color-cream)',
  },

  passIcon: {
    color: '#48BB78',
    marginRight: '4px',
  },

  failIcon: {
    color: '#F56565',
    marginRight: '4px',
  },

  sectionText: {
    fontFamily: 'var(--font-body)',
    fontSize: '0.8rem',
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
    border: '2px solid',
    cursor: 'pointer',
    transition: 'all 0.2s ease',
    letterSpacing: '0.02em',
    WebkitTapHighlightColor: 'transparent',
  },

  passBtn: {
    background: 'rgba(72, 187, 120, 0.08)',
    borderColor: 'rgba(72, 187, 120, 0.3)',
    color: '#48BB78',
  },

  passBtnActive: {
    background: 'rgba(72, 187, 120, 0.2)',
    borderColor: '#48BB78',
  },

  failBtn: {
    background: 'rgba(245, 101, 101, 0.08)',
    borderColor: 'rgba(245, 101, 101, 0.3)',
    color: '#F56565',
  },

  failBtnActive: {
    background: 'rgba(245, 101, 101, 0.2)',
    borderColor: '#F56565',
  },

  unsureBtn: {
    background: 'rgba(160, 160, 160, 0.08)',
    borderColor: 'rgba(160, 160, 160, 0.3)',
    color: '#A0A0A0',
    gridColumn: '1 / -1',
  },

  unsureBtnActive: {
    background: 'rgba(160, 160, 160, 0.2)',
    borderColor: '#A0A0A0',
  },
};

export default Checklist;
