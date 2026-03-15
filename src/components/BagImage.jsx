import React, { useState } from 'react';

/**
 * Bag image with fallback.
 * Shows the bag name in gold Playfair Display on dark background if the image fails to load.
 */
function BagImage({ src, alt, style, fallbackText, className }) {
  const [failed, setFailed] = useState(false);

  if (failed || !src) {
    return (
      <div
        className={className}
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          backgroundColor: 'var(--color-surface)',
          border: '1px solid var(--color-border)',
          ...style,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-heading)',
            fontSize: '0.7rem',
            fontWeight: 600,
            color: 'var(--color-gold)',
            textAlign: 'center',
            padding: '4px',
            lineHeight: 1.2,
            overflow: 'hidden',
          }}
        >
          {fallbackText || alt || 'No image'}
        </span>
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      loading="lazy"
      onError={() => setFailed(true)}
      style={style}
      className={className}
    />
  );
}

export default BagImage;
