import React, { useState } from 'react';

/**
 * Atmospheric background image layer with dark overlay.
 * Three visual layers: dark base → image → dark gradient overlay.
 * Falls back to a luxury CSS gradient if the image fails to load.
 */
function BackgroundImage({ url, opacity = 0.2 }) {
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
      {/* Layer 1: Dark base */}
      <div
        style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'var(--color-bg)',
        }}
      />

      {/* Layer 2: Image or CSS fallback */}
      {!failed && url ? (
        <img
          src={url}
          alt=""
          loading="lazy"
          onError={() => setFailed(true)}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            opacity,
            filter: 'saturate(0.3) brightness(0.9)',
          }}
        />
      ) : (
        <>
          {/* Warm radial gradients mimicking a luxury texture */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: opacity * 1.2,
              background: `
                radial-gradient(ellipse at 20% 50%, rgba(184, 148, 95, 0.12) 0%, transparent 50%),
                radial-gradient(ellipse at 80% 20%, rgba(184, 148, 95, 0.08) 0%, transparent 40%),
                radial-gradient(ellipse at 60% 80%, rgba(237, 230, 219, 0.05) 0%, transparent 40%),
                linear-gradient(160deg, #0A0A0A 0%, #111 40%, #0D0B08 100%)
              `,
            }}
          />
          {/* Subtle diamond grid pattern */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.03,
              backgroundImage: `
                linear-gradient(45deg, rgba(184, 148, 95, 0.3) 1px, transparent 1px),
                linear-gradient(-45deg, rgba(184, 148, 95, 0.3) 1px, transparent 1px)
              `,
              backgroundSize: '60px 60px',
            }}
          />
          {/* Gold noise grain */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.04,
              mixBlendMode: 'overlay',
              backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.75' numOctaves='4' stitchTiles='stitch'/%3E%3CfeColorMatrix values='0 0 0 0 0.79 0 0 0 0 0.66 0 0 0 0 0.3 0 0 0 1 0'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
              backgroundSize: '200px 200px',
            }}
          />
        </>
      )}

      {/* Layer 3: Soft vignette overlay (blends edges into dark theme) */}
      {!failed && url && (
        <div
          style={{
            position: 'absolute',
            inset: 0,
            background: `
              radial-gradient(ellipse at center, transparent 30%, rgba(10, 9, 8, 0.4) 100%)
            `,
          }}
        />
      )}
    </div>
  );
}

export default BackgroundImage;
