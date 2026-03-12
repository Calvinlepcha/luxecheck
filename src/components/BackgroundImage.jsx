import React, { useState } from 'react';

/**
 * Atmospheric background image layer.
 * Renders a fixed, full-screen image at very low opacity behind content.
 * Falls back to a subtle CSS gradient if the image fails to load.
 */
function BackgroundImage({ url, opacity = 0.1 }) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: -1,
        pointerEvents: 'none',
        overflow: 'hidden',
      }}
    >
      {/* Dark base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--color-bg)',
        }}
      />

      {/* Image or gradient fallback */}
      {!failed && url ? (
        <img
          src={url}
          alt=""
          onError={() => setFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity,
            filter: 'saturate(0.3)',
          }}
        />
      ) : (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            opacity: opacity * 0.7,
            background: `
              radial-gradient(ellipse at 20% 50%, rgba(201, 168, 76, 0.08) 0%, transparent 50%),
              radial-gradient(ellipse at 80% 20%, rgba(201, 168, 76, 0.05) 0%, transparent 40%),
              radial-gradient(ellipse at 60% 80%, rgba(245, 240, 232, 0.03) 0%, transparent 40%)
            `,
          }}
        />
      )}
    </div>
  );
}

export default BackgroundImage;
