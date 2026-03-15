import React, { useEffect } from 'react';

function ImageModal({ src, alt, onClose }) {
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const handler = (e) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', handler);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', handler);
    };
  }, [onClose]);

  return (
    <div className="glass-modal-backdrop" style={styles.backdrop} onClick={onClose}>
      <button className="glass-btn-secondary" style={styles.closeBtn} onClick={onClose}>{'\u00d7'}</button>
      <img
        src={src}
        alt={alt}
        style={styles.image}
        onClick={(e) => e.stopPropagation()}
      />
    </div>
  );
}

const styles = {
  backdrop: {
    position: 'fixed',
    inset: 0,
    zIndex: 9999,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: '20px',
    cursor: 'pointer',
  },
  closeBtn: {
    position: 'absolute',
    top: '16px',
    right: '16px',
    color: '#fff',
    fontSize: '1.5rem',
    width: '44px',
    height: '44px',
    borderRadius: '50%',
    cursor: 'pointer',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10000,
    lineHeight: 1,
    fontFamily: 'var(--font-body)',
  },
  image: {
    maxWidth: '100%',
    maxHeight: '85vh',
    objectFit: 'contain',
    borderRadius: '12px',
    cursor: 'default',
  },
};

export default ImageModal;
